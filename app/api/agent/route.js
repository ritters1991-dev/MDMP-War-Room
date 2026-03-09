import { NextResponse } from "next/server";

// Edge runtime + streaming = no timeout (streams can run for minutes)
export const runtime = "edge";

// Claude Sonnet 4 context = 200K tokens (~800K chars). System prompt must fit ALL
// hardcoded data: scenario, doctrine, COA 1/2 products, wargaming package.
// mdmp.js is ~220K chars — system prompt needs room for all of it.
const MAX_SYSTEM_CHARS = 500000;
const MAX_USER_CHARS = 200000;
const MAX_CONTINUATIONS = 3; // Auto-continue up to 3 times if model hits token limit

function truncatePrompt(text, maxChars) {
  if (text.length <= maxChars) return text;
  const half = Math.floor(maxChars / 2);
  return text.slice(0, half) + "\n\n[... DOCUMENT TRUNCATED ...]\n\n" + text.slice(-half);
}

// Stream a single Anthropic API call, accumulate text, return { text, stopReason }
async function streamAnthropicCall(apiKey, model, maxTokens, system, messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: model || "claude-sonnet-4-20250514",
      max_tokens: maxTokens || 16000,
      stream: true,
      system,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw { status: response.status, body: errText };
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let stopReason = "end_turn";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === "content_block_delta" && evt.delta?.text) {
          fullText += evt.delta.text;
        }
        if (evt.type === "message_delta" && evt.delta?.stop_reason) {
          stopReason = evt.delta.stop_reason;
        }
        if (evt.type === "error") {
          throw new Error(evt.error?.message || "Stream error");
        }
      } catch (e) {
        if (e.message) throw e; // Re-throw intentional errors
      }
    }
  }

  return { text: fullText, stopReason };
}

export async function POST(req) {
  try {
    const { systemPrompt, userPrompt, model, maxTokens } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured. Add it in Vercel Environment Variables." }, { status: 500 });
    }

    const safeSystem = truncatePrompt(systemPrompt || "", MAX_SYSTEM_CHARS);
    const safeUser = truncatePrompt(userPrompt || "", MAX_USER_CHARS);
    const resolvedMaxTokens = maxTokens || 16000;

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // First call
          let messages = [{ role: "user", content: safeUser }];
          let result = await streamAnthropicCall(apiKey, model, resolvedMaxTokens, safeSystem, messages);
          controller.enqueue(encoder.encode(" ")); // heartbeat

          let fullText = result.text;
          let continuations = 0;

          // Auto-continue if model hit token limit (stop_reason = "max_tokens")
          while (result.stopReason === "max_tokens" && continuations < MAX_CONTINUATIONS) {
            continuations++;
            // Build continuation messages: original user prompt + assistant's partial response + "continue"
            messages = [
              { role: "user", content: safeUser },
              { role: "assistant", content: fullText },
              { role: "user", content: "Continue exactly where you left off. Do not repeat any content already written. Do not add preamble — pick up mid-sentence if needed." },
            ];
            result = await streamAnthropicCall(apiKey, model, resolvedMaxTokens, safeSystem, messages);
            fullText += result.text;
            controller.enqueue(encoder.encode(" ")); // heartbeat
          }

          controller.enqueue(encoder.encode(JSON.stringify({ text: fullText || "No response generated." })));
          controller.close();
        } catch (err) {
          if (err.status) {
            // Anthropic API error
            const errText = err.body || "";
            console.error(`Anthropic API error ${err.status}:`, errText.slice(0, 500));
            let msg = `API error ${err.status}: ${errText.slice(0, 200)}`;
            if (err.status === 413 || errText.includes("too large")) msg = "Request too large. Try selecting fewer documents.";
            if (err.status === 429) msg = "Rate limited. Wait a moment and try again.";
            if (err.status === 401) msg = "Invalid API key. Check ANTHROPIC_API_KEY in Vercel settings.";
            if (err.status === 400 && errText.includes("credit")) msg = "Insufficient credits. Add funds at console.anthropic.com.";
            controller.enqueue(encoder.encode(JSON.stringify({ error: msg })));
          } else {
            controller.enqueue(encoder.encode(JSON.stringify({ error: `Stream error: ${err.message}` })));
          }
          controller.close();
        }
      }
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Agent route error:", err);
    return NextResponse.json({ error: `Server error: ${err.message}` }, { status: 500 });
  }
}
