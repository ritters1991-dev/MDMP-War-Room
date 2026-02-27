import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { stepOutputs, completedSteps, type } = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });

    let prompt = "";
    if (type === "decision_brief") {
      prompt = `You are a senior military staff officer preparing a formal Commander's Decision Brief for the 25th Infantry Division Commander.

Using the following MDMP outputs from all staff sections, produce a COMPLETE, PRINT-READY Commander's Decision Brief in proper military format.

FORMAT:
1. CLASSIFICATION: UNCLASSIFIED // FOUO
2. HEADER: 25th Infantry Division — Commander's Decision Brief
3. DATE/TIME
4. BRIEFER: Division Staff

SECTIONS:
I. PURPOSE
II. INTELLIGENCE UPDATE (from G2 outputs)
III. RESTATED MISSION
IV. SPECIFIED, IMPLIED, AND ESSENTIAL TASKS
V. COURSE OF ACTION BRIEFS (each COA with concept, task org, sketch description)
VI. WARGAME RESULTS SUMMARY
VII. DECISION MATRIX
VIII. STAFF RECOMMENDATION
IX. CCIR/PIR STATUS
X. KEY DECISION POINTS
XI. RISK ASSESSMENT SUMMARY
XII. RECOMMENDED CDR GUIDANCE

MDMP OUTPUTS:
${JSON.stringify(stepOutputs, null, 2)}

Make this brief comprehensive, specific, and ready to print. Use proper military formatting throughout. This will be presented to a real commander.`;
    } else if (type === "opord_summary") {
      prompt = `Compile a complete OPORD EXECUTIVE SUMMARY for the 25th Infantry Division from these MDMP outputs. Include: situation, mission, execution concept, task organization, sustainment concept, C2, and key coordinating instructions. Format for print.

MDMP OUTPUTS:
${JSON.stringify(stepOutputs, null, 2)}`;
    } else {
      prompt = `Compile a comprehensive STAFF SUMMARY REPORT of all MDMP work completed by the 25th Infantry Division staff. Organize by MDMP step, summarize key outputs, risks, and recommendations. Format for print.

MDMP OUTPUTS:
${JSON.stringify(stepOutputs, null, 2)}`;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("\n") || "No output.";
    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
