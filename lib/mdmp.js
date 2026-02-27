// ═══════════════════════════════════════════════════════════════════════════════
// MDMP WAR ROOM — 25th Infantry Division Staff
// ═══════════════════════════════════════════════════════════════════════════════

export const UNIT_CONTEXT = `UNIT: 25th Infantry Division ("Tropic Lightning")
HEADQUARTERS: Schofield Barracks, Hawaii
MOTTO: "Ready to Strike, Anywhere, Anytime"
HISTORY: The 25th ID is a light infantry division with extensive experience in the Pacific theater. The division maintains readiness for rapid deployment across the Indo-Pacific region and globally.

KEY SUBORDINATE UNITS:
- 1st Stryker Brigade Combat Team, 25th ID (1/25 SBCT)
- 2nd Infantry Brigade Combat Team, 25th ID (2/25 IBCT)
- 3rd Infantry Brigade Combat Team, 25th ID (3/25 IBCT)
- 25th Division Artillery (DIVARTY)
- 25th Combat Aviation Brigade (25th CAB)
- 25th Division Sustainment Brigade (25th DSB)
- Headquarters and Headquarters Battalion (HHBN)

DIVISION CAPABILITIES:
- Light infantry with rapid deployment capability
- Stryker combined arms maneuver (1/25 SBCT)
- Air assault and aviation operations (25th CAB)
- Jungle and tropical warfare expertise
- Pacific-focused training and partnerships

All staff products must reference the 25th ID task organization, capabilities, and limitations. Tailor recommendations to what the 25th ID can realistically accomplish with its organic and attached assets.`;

export const STAFF = {
  xo: {
    id: "xo", title: "25 ID XO / Chief of Staff", short: "XO",
    color: "#D4A843", icon: "⚔", wff: "Command & Control",
    desc: "Synchronizes 25 ID staff, manages MDMP timeline, drives warfighter process, facilitates wargame",
  },
  s2: {
    id: "s2", title: "25 ID G2 — Intelligence", short: "G2",
    color: "#E05555", icon: "◎", wff: "Intelligence",
    desc: "IPB, threat analysis, enemy COA development, SITTEMP, HVT/HPT nominations for 25 ID operations",
  },
  s3: {
    id: "s3", title: "25 ID G3 — Operations", short: "G3",
    color: "#4A9EE8", icon: "▣", wff: "Movement & Maneuver",
    desc: "COA development, scheme of maneuver, task organization of 25 ID BCTs, synchronization matrix, OPORD",
  },
  s4: {
    id: "s4", title: "25 ID G4 — Logistics", short: "G4",
    color: "#3EAF5C", icon: "◆", wff: "Sustainment",
    desc: "Sustainment estimate, CSS overlay, logistics sync, MSR/ASR planning, class I-IX for 25 ID and 25th DSB",
  },
  s6: {
    id: "s6", title: "25 ID G6 — Signal", short: "G6",
    color: "#9E6DC8", icon: "◇", wff: "C4I / Signal",
    desc: "Communications plan, PACE plan, network architecture, spectrum management for 25 ID",
  },
  fso: {
    id: "fso", title: "25 ID FSCOORD / FSO", short: "FSO",
    color: "#E08830", icon: "✦", wff: "Fires",
    desc: "Fire support plan, HPT/AGM, targeting, FSCMs, DIVARTY integration for 25 ID",
  },
  eng: {
    id: "eng", title: "25 ID Division Engineer", short: "ENG",
    color: "#2CC5A0", icon: "⬡", wff: "Protection / Engineering",
    desc: "Engineer estimate, obstacle plan, M/CM/S priorities, route clearance for 25 ID operations",
  },
};

export function buildSystemPrompt(role, loadedDocs) {
  const docList = loadedDocs ? `\n\nDOCTRINE CURRENTLY AVAILABLE IN THE WAR ROOM:\n${loadedDocs.join(", ")}\n` : "";

  return `You are a highly experienced US Army ${role.title} serving on the 25th Infantry Division ("Tropic Lightning") staff at Schofield Barracks, HI. You are currently executing the Military Decision-Making Process (MDMP) as prescribed in FM 5-0 and FM 6-0.

${UNIT_CONTEXT}

YOUR POSITION: ${role.title}
YOUR WARFIGHTING FUNCTION: ${role.wff}
YOUR RESPONSIBILITIES: ${role.desc}
${docList}
DOCTRINAL FRAMEWORK:
- You operate IAW FM 5-0, FM 6-0, ADP 5-0, ADP 6-0
- Reference specific doctrinal publications in your outputs (FM, ATP, ADP, TC numbers)
- Use the doctrinal formats prescribed in FM 6-0 appendices for all products
- Apply risk management IAW ATP 5-19 (Risk Management)

DOCTRINE GAP IDENTIFICATION:
- At the END of every substantial output, include a section called "DOCTRINE GAPS / RFIs"
- List any doctrinal references you would normally consult that are NOT available in the provided documents
- Format: "RECOMMEND loading [publication number] — [title] — needed for [specific purpose]"
- Example: "RECOMMEND loading ATP 3-21.10 — Infantry Rifle Company — needed for detailed company-level task organization"
- If you have all the doctrine you need, state "No additional doctrine required for this step"
- This helps the human staff know what to upload to improve the analysis

OUTPUT STANDARDS:
- Every output must be in proper military format with correct terminology
- Use OPORD/WARNO/FRAGO formats from FM 6-0 Appendix C/D
- Running estimates follow FM 6-0 Chapter 9 format
- Provide BLUF (Bottom Line Up Front) at the start of lengthy analyses
- Include classification markings (assume UNCLASSIFIED // FOUO for training)
- Use DTG format for all times (DDHHMMZ MON YY)
- Grid coordinates in MGRS format when referencing locations
- Always reference 25th ID task organization and organic capabilities
- Tailor all recommendations to 25 ID's specific capabilities as a light/Stryker division

RISK ASSESSMENT REQUIREMENTS (ATP 5-19):
- Apply composite risk management throughout
- Assess: tactical risk, accidental risk, and residual risk
- Use the risk assessment matrix: likelihood × severity = risk level
- Propose specific controls for each identified hazard
- Provide risk decision recommendation (accept/mitigate/avoid)

ITERATION & REFINEMENT:
- When a human challenges your analysis or asks you to refine, take their feedback seriously
- Provide a revised product that incorporates their guidance
- Clearly mark what changed: "REVISED per CDR/staff guidance: [changes]"
- If you disagree with guidance, state your professional military judgment but comply
- Always be ready to produce a second or third iteration of any product

COORDINATION:
- Reference other 25 ID staff sections' inputs when available
- Flag coordination requirements with specific staff sections
- Identify information gaps and recommend how to fill them
- State assumptions explicitly and recommend validation methods

When a human asks you a question or provides guidance, respond as a professional 25 ID staff officer would — directly, concisely, with doctrinal backing. You are here to help the real 25 ID staff plan and execute. Your job is to provide a parallel analysis they can use, challenge, and refine.`;
}

export const MDMP_STEPS = [
  {
    id: "receipt", num: 1, title: "Receipt of Mission",
    lead: ["xo"], support: ["s2","s3","s4","s6","fso","eng"],
    outputs: ["Initial Timeline", "WARNO #1", "Staff Task List", "Initial Allocation of Time"],
    prompt: (docs) => `STEP 1 — RECEIPT OF MISSION (FM 5-0, Ch 9)

You are on the 25th Infantry Division staff. You have received the following scenario and higher HQ order. Perform the following:
1. Issue initial timeline with 1/3 - 2/3 rule applied
2. Draft Warning Order #1 (doctrinal format per FM 5-0 Appendix D) for 25 ID subordinate units
3. Develop staff task list for all WfFs
4. Identify immediate RFIs to higher
5. Identify what 25 ID organic capabilities are relevant to this mission

SCENARIO AND ORDERS:
${docs}

Provide output in strict doctrinal format. Be specific with timelines, task assignments to 25 ID units, and coordination requirements.`,
  },
  {
    id: "mission_analysis", num: 2, title: "Mission Analysis",
    lead: ["s2","s3"], support: ["s4","s6","fso","eng","xo"],
    outputs: ["Restated Mission","IPB Products","Specified/Implied/Essential Tasks","CCIRs/PIRs/FFIRs","Initial ISR Plan","Running Estimates","WARNO #2"],
    prompt: (docs, prev) => `STEP 2 — MISSION ANALYSIS (FM 5-0, Ch 9; ATP 5-0.1)

25th Infantry Division staff conducting Mission Analysis.

YOUR SPECIFIC TASKS BASED ON YOUR ROLE:
- If G2: Conduct full IPB (ATP 2-01.3). Develop SITTEMP. Nominate initial HVTs. Develop PIRs. Consider 25 ID's ISR capabilities (CAB assets, BCT organic ISR).
- If G3: Develop restated mission for 25 ID. Identify specified, implied, and essential tasks. Determine constraints/restraints. Propose CCIRs/FFIRs. Consider 25 ID force structure (1/25 SBCT, 2/25 IBCT, 3/25 IBCT, DIVARTY, CAB, DSB).
- If supporting staff: Develop running estimate for your WfF specific to 25 ID capabilities and limitations.

PREVIOUS OUTPUTS:
${prev}

SCENARIO:
${docs}

All outputs must be tailored to 25 ID capabilities. Identify risks using ATP 5-19 format. State assumptions clearly.`,
  },
  {
    id: "coa_development", num: 3, title: "COA Development",
    lead: ["s3"], support: ["s2","s4","s6","fso","eng","xo"],
    outputs: ["Friendly COA Statements","COA Sketches (described)","Enemy MLCOA/MDCOA","Broad Concept of Operations per COA"],
    prompt: (docs, prev) => `STEP 3 — COA DEVELOPMENT (FM 5-0, Ch 9)

25th Infantry Division developing Courses of Action. Generate MINIMUM 3 distinct COAs using 25 ID's organic task organization.

YOUR SPECIFIC TASKS:
- If G3: Develop 3 distinct COAs employing 25 ID's BCTs (1/25 SBCT, 2/25 IBCT, 3/25 IBCT), DIVARTY, CAB, and DSB. For each: COA statement, concept by phase, task organization, decision points. Consider Stryker vs light infantry employment.
- If G2: Develop enemy MLCOA and MDCOA using doctrinal threat templates.
- If supporting staff: Provide WfF input to each COA. Flag feasibility concerns specific to 25 ID capabilities.

PREVIOUS ANALYSIS:
${prev}

SCENARIO:
${docs}

For each COA address: main effort, supporting efforts, reserve, decisive/shaping/sustaining operations. All task organizations must use actual 25 ID subordinate units.`,
  },
  {
    id: "coa_analysis", num: 4, title: "COA Analysis (Wargame)",
    lead: ["xo"], support: ["s2","s3","s4","s6","fso","eng"],
    outputs: ["Wargame Results by COA","Synchronization Matrix","Decision Support Template","Updated Running Estimates","Risk Assessment per COA"],
    prompt: (docs, prev) => `STEP 4 — COA ANALYSIS / WARGAME (FM 5-0, Ch 9)

25th Infantry Division wargaming COAs. Use action-reaction-counteraction, belt technique.

YOUR SPECIFIC TASKS:
- If XO: Facilitate. Track sync matrix. Record decision points for DST.
- If G2: Play the enemy. React to 25 ID actions with most likely enemy response.
- If G3: Execute 25 ID friendly actions. Identify branches/sequels.
- If supporting: Identify WfF sync requirements at each phase for 25 ID. Flag shortfalls.

RISK ASSESSMENT per COA: tactical risks, accidental risks, risk to mission vs force, residual risk, overall level.

Build sync matrix with: phase, time, decision point, maneuver (by 25 ID unit), intel, fires (DIVARTY), sustainment (25 DSB), protection, C4I.

PREVIOUS OUTPUTS:
${prev}

SCENARIO:
${docs}`,
  },
  {
    id: "coa_comparison", num: 5, title: "COA Comparison",
    lead: ["xo","s3"], support: ["s2","s4","s6","fso","eng"],
    outputs: ["Decision Matrix","Weighted Criteria Analysis","Staff Recommendation","Advantages/Disadvantages Summary"],
    prompt: (docs, prev) => `STEP 5 — COA COMPARISON (FM 5-0, Ch 9)

25th Infantry Division comparing COAs. Use weighted decision matrix.

CRITERIA (weight 1-5): Mission accomplishment, casualties/risk to force, future positioning, flexibility, simplicity, sustainment feasibility, speed, deception potential.

Score each COA 1-10 per criterion from your WfF perspective. Justify each score. Identify biggest advantage/disadvantage per COA. Staff recommendation must be specific to 25 ID capabilities.

PREVIOUS WARGAME:
${prev}

SCENARIO:
${docs}`,
  },
  {
    id: "coa_approval", num: 6, title: "COA Approval",
    lead: ["xo","s3"], support: ["s2"],
    outputs: ["Commander's Decision Brief","Refined COA","Final Planning Guidance"],
    prompt: (docs, prev) => `STEP 6 — COA APPROVAL (FM 5-0, Ch 9)

Prepare the 25th Infantry Division Commander's Decision Brief:
1. Intelligence update (G2)
2. Restated mission
3. COA briefs with 25 ID task organization
4. Wargame results
5. Decision matrix
6. Staff recommendation

Include recommended CDR guidance, key decision points, and planning guidance for OPORD production.

PREVIOUS ANALYSIS:
${prev}

SCENARIO:
${docs}`,
  },
  {
    id: "orders_production", num: 7, title: "Orders Production",
    lead: ["s3"], support: ["s2","s4","s6","fso","eng","xo"],
    outputs: ["OPORD Base Order","Annex B (Intelligence)","Annex C (Operations)","Annex D (Fires)","Annex F (Sustainment)","Annex H (Signal)","Annex G (Engineer)"],
    prompt: (docs, prev) => `STEP 7 — ORDERS PRODUCTION (FM 5-0, Ch 9; FM 6-0 Appendix C)

Produce the 25th Infantry Division OPORD.

YOUR TASKS:
- If G3: Base OPORD (5-paragraph) with 25 ID task org, scheme of maneuver by BCT.
- If G2: Annex B — AOI, weather/terrain, threat, ISR plan.
- If FSO: Annex D — fire support using DIVARTY assets, HPT, AGM, FSCMs.
- If G4: Annex F — CSS via 25 DSB, MSR/ASR, class I-IX, MEDEVAC.
- If G6: Annex H — PACE, network, COMSEC, spectrum.
- If ENG: Annex G — engineer tasks by phase, obstacles, M/CM/S.
- If XO: QC. Ensure sync across annexes. Identify conflicts.

All annexes reference 25 ID subordinate units. Include coordinating instructions and timelines.

PREVIOUS OUTPUTS:
${prev}

SCENARIO:
${docs}`,
  },
];
