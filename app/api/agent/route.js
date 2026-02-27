import { NextResponse } from "next/server";

// Vercel Pro allows 60s, Hobby allows 10s for serverless.
// Use edge runtime for longer timeout on Hobby.
export const runtime = "edge";

const MAX_PROMPT_CHARS = 180000; // ~45K tokens, safe for Claude's context

function truncatePrompt(text, maxChars) {
  if (text.length <= maxChars) return text;
  const half = Math.floor(maxChars / 2);
  return text.slice(0, half) + "\n\n[... DOCUMENT TRUNCATED — TOO LARGE FOR SINGLE PASS ...]\n\n" + text.slice(-half);
}

export async function POST(req) {
  try {
    const { systemPrompt, userPrompt, model } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured. Add it in Vercel Environment Variables." }, { status: 500 });
    }

    // Truncate if needed
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
        max_tokens: 4096,
        system: safeSystem,
        messages: [{ role: "user", content: safeUser }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Anthropic API error ${response.status}:`, errText.slice(0, 500));
      
      // Parse common errors
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

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("\n") || "No response generated.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Agent route error:", err);
    return NextResponse.json({ error: `Server error: ${err.message}` }, { status: 500 });
  }
}
