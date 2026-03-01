import { NextResponse } from "next/server";

// Edge runtime + streaming = no timeout
export const runtime = "edge";

export async function POST(req) {
  try {
    const { stepOutputs, knowledgeBase, completedSteps, type } = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });

    // Build a condensed version of outputs to avoid massive prompts
    // Prefer knowledgeBase (synced from Firebase) over stepOutputs (local only)
    let outputsText = "";
    if (knowledgeBase && Object.keys(knowledgeBase).length > 0) {
      Object.entries(knowledgeBase).forEach(([stepId, agents]) => {
        const stepNum = agents[Object.keys(agents)[0]]?.stepNum || stepId;
        outputsText += `\n═══ STEP ${stepNum} ═══\n`;
        Object.entries(agents).forEach(([agentId, data]) => {
          if (agentId === "xo_synthesis") {
            outputsText += `\n── XO SYNTHESIS ──\n${data.summary || ""}\n`;
          } else {
            outputsText += `\n── ${data.agentShort || agentId} (${data.agentTitle || ""}) ──\n${data.summary || ""}\n`;
          }
        });
      });
    } else if (stepOutputs) {
      // Fallback to local stepOutputs — truncate each to 800 chars
      Object.entries(stepOutputs).forEach(([stepId, agents]) => {
        outputsText += `\n═══ ${stepId.toUpperCase()} ═══\n`;
        Object.entries(agents).forEach(([agentId, text]) => {
          const truncated = typeof text === "string" ? text.slice(0, 800) : "";
          outputsText += `\n── ${agentId} ──\n${truncated}\n`;
        });
      });
    }

    if (!outputsText.trim()) {
      return NextResponse.json({ error: "No MDMP outputs available to export. Run at least one step first." }, { status: 400 });
    }

    let prompt = "";
    if (type === "decision_brief") {
      prompt = `You are a senior military staff officer preparing a Commander's Decision Brief for the 25th Infantry Division Commander.

Using the following MDMP staff outputs, produce a Commander's Decision Brief in proper military format.

FORMAT: UNCLASSIFIED // FOUO — 25th Infantry Division — Commander's Decision Brief

SECTIONS:
I. PURPOSE
II. INTELLIGENCE UPDATE (from G2)
III. RESTATED MISSION
IV. KEY TASKS (Specified, Implied, Essential)
V. COURSE OF ACTION SUMMARY (if available)
VI. STAFF RECOMMENDATION
VII. CCIR/PIR STATUS
VIII. RISK ASSESSMENT SUMMARY
IX. RECOMMENDED CDR GUIDANCE

STAFF OUTPUTS:
${outputsText}

Be comprehensive but concise. Use proper military formatting. Under 2000 words.`;
    } else if (type === "opord_summary") {
      prompt = `Compile an OPORD EXECUTIVE SUMMARY for the 25th Infantry Division from these MDMP outputs. Include: situation, mission, execution concept, task organization, sustainment concept, C2, and key coordinating instructions.

STAFF OUTPUTS:
${outputsText}

Be comprehensive but concise. Under 2000 words.`;
    } else {
      prompt = `Compile a STAFF SUMMARY REPORT of all MDMP work completed by the 25th Infantry Division staff. Organize by step, summarize key outputs, risks, and recommendations.

STAFF OUTPUTS:
${outputsText}

Be comprehensive but concise. Under 2000 words.`;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        stream: true, // Streaming prevents Edge timeout
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      if (response.status === 429) return NextResponse.json({ error: "Rate limited. Wait a moment and try again." }, { status: 429 });
      return NextResponse.json({ error: `API error ${response.status}: ${err.slice(0, 200)}` }, { status: response.status });
    }

    // Stream response with heartbeats (same pattern as agent route)
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
            controller.enqueue(encoder.encode(" ")); // heartbeat
          }
          controller.enqueue(encoder.encode(JSON.stringify({ text: fullText || "No output generated." })));
          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(JSON.stringify({ error: `Stream error: ${err.message}` })));
          controller.close();
        }
      }
    });

    return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
