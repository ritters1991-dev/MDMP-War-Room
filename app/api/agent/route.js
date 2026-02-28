import { NextResponse } from "next/server";

// Edge runtime + streaming = no timeout (streams can run for minutes)
export const runtime = "edge";

const MAX_PROMPT_CHARS = 180000;

function truncatePrompt(text, maxChars) {
  if (text.length <= maxChars) return text;
  const half = Math.floor(maxChars / 2);
  return text.slice(0, half) + "\n\n[... DOCUMENT TRUNCATED ...]\n\n" + text.slice(-half);
}

export async function POST(req) {
  try {
    const { systemPrompt, userPrompt, model, maxTokens } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured. Add it in Vercel Environment Variables." }, { status: 500 });
    }

    const safeSystem = truncatePrompt(systemPrompt || "", MAX_PROMPT_CHARS / 3);
    const safeUser = truncatePrompt(userPrompt || "", MAX_PROMPT_CHARS);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: model || "claude-sonnet-4-20250514",
        max_tokens: maxTokens || 1500,
        stream: true, // STREAMING — prevents Vercel Edge 25s timeout
        system: safeSystem,
        messages: [{ role: "user", content: safeUser }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Anthropic API error ${response.status}:`, errText.slice(0, 500));
      if (response.status === 413 || errText.includes("too large")) {
        return NextResponse.json({ error: "Request too large. Try selecting fewer documents." }, { status: 413 });
      }
      if (response.status === 429) {
        return NextResponse.json({ error: "Rate limited. Wait a moment and try again." }, { status: 429 });
      }
      if (response.status === 401) {
        return NextResponse.json({ error: "Invalid API key. Check ANTHROPIC_API_KEY in Vercel settings." }, { status: 401 });
      }
      if (response.status === 400 && errText.includes("credit")) {
        return NextResponse.json({ error: "Insufficient credits. Add funds at console.anthropic.com." }, { status: 400 });
      }
      return NextResponse.json({ error: `API error ${response.status}: ${errText.slice(0, 200)}` }, { status: response.status });
    }

    // Stream Anthropic's SSE response — accumulate text, send heartbeats to keep alive
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";
        let buffer = "";

        try {
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
                if (evt.type === "error") {
                  controller.enqueue(encoder.encode(JSON.stringify({ error: evt.error?.message || "Stream error" })));
                  controller.close();
                  return;
                }
              } catch {}
            }
            // Heartbeat — keeps Edge function alive
            controller.enqueue(encoder.encode(" "));
          }

          // Final payload — the accumulated full response as JSON
          controller.enqueue(encoder.encode(JSON.stringify({ text: fullText || "No response generated." })));
          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(JSON.stringify({ error: `Stream error: ${err.message}` })));
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
