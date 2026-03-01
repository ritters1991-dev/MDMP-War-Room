"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { db, ref, push, onValue, set, get, remove, off, onDisconnect } from "../lib/firebase";
import { STAFF, MDMP_STEPS, buildSystemPrompt } from "../lib/mdmp";

// Built-in documents — hardcoded into every agent's system prompt (no upload needed)
const BUILT_IN_SCENARIO = [
  { name: "W500 — Operation Pacific Pugilist (Full OPORD)", tag: "CODED" },
];
const BUILT_IN_DOCTRINE = [
  { name: "FM 5-0 — Planning & Orders Production", tag: "CODED" },
  { name: "FM 6-0 — Commander & Staff Organization", tag: "CODED" },
  { name: "FM 3-0 / ADP 3-0 — Operations", tag: "CODED" },
  { name: "FM 3-94 — Theater Army, Corps, Division Ops", tag: "CODED" },
  { name: "FM 2-0 / ATP 2-01.3 — Intelligence", tag: "CODED" },
  { name: "FM 3-09 / FM 3-60 — Fires", tag: "CODED" },
  { name: "FM 4-0 / ATP 4-90 — Sustainment", tag: "CODED" },
  { name: "ADP 3-37 / FM 3-01 — Protection", tag: "CODED" },
  { name: "FM 6-02 / ADP 6-0 — Signal & Mission Cmd", tag: "CODED" },
  { name: "JP 5-0 — Joint Planning", tag: "CODED" },
  { name: "ATP 5-19 — Risk Management", tag: "CODED" },
];

const ts = () => new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const sanitizeKey = (s) => s.replace(/[.#$[\]\/]/g, "_");
const MAX_DOC_SIZE = 8 * 1024 * 1024; // 8MB text limit for Firebase

const readFileAsText = (file) => new Promise((res, rej) => {
  // Reject PDFs and binary files — they need to be converted to .txt first
  if (file.name.toLowerCase().endsWith(".pdf")) {
    rej(new Error(`PDF files must be converted to .txt before uploading. "${file.name}" is a PDF. Use a PDF-to-text tool or copy/paste the content into a .txt file.`));
    return;
  }
  const r = new FileReader();
  r.onload = () => {
    const text = r.result;
    if (typeof text !== "string") { rej(new Error(`"${file.name}" appears to be a binary file. Convert to .txt first.`)); return; }
    // Check if content looks like binary garbage
    const binaryChars = (text.match(/[\x00-\x08\x0E-\x1F]/g) || []).length;
    if (binaryChars > text.length * 0.1) { rej(new Error(`"${file.name}" contains binary data. Convert to .txt first.`)); return; }
    if (text.length > MAX_DOC_SIZE) { rej(new Error(`"${file.name}" is too large (${(text.length / 1024 / 1024).toFixed(1)}MB). Max is 8MB text. Try splitting the file.`)); return; }
    res(text);
  };
  r.onerror = () => rej(new Error(`Failed to read "${file.name}"`));
  r.readAsText(file);
});

async function callAgent(roleId, userPrompt, { systemOverride, model, maxTokens, retries = 2 } = {}) {
  const role = STAFF[roleId];
  const sysPrompt = systemOverride || (role ? buildSystemPrompt(role) : "You are a military staff coordinator.");
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const body = { systemPrompt: sysPrompt, userPrompt };
      if (model) body.model = model;
      if (maxTokens) body.maxTokens = maxTokens;
      const res = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const rawText = await res.text();
      // Streaming response: spaces (heartbeats) + JSON at the end. Trim to get just the JSON.
      const trimmed = rawText.trim();
      let data;
      try { data = JSON.parse(trimmed); } catch { return `⚠ ERROR: Server returned non-JSON (possible timeout). Try again.`; }
      if (data.error && data.error.includes("Rate limited") && attempt < retries) {
        await new Promise(r => setTimeout(r, 5000 * (attempt + 1))); // Back off: 5s, 10s
        continue;
      }
      return data.error ? `⚠ ERROR: ${data.error}` : data.text;
    } catch (err) {
      if (attempt < retries) { await new Promise(r => setTimeout(r, 5000 * (attempt + 1))); continue; }
      return `⚠ ERROR: ${err.message}`;
    }
  }
}

function Spinner() {
  return <span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid #D4A84355", borderTop: "2px solid #D4A843", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginRight: 6, verticalAlign: "middle" }} />;
}

function UploadProgress({ progress }) {
  if (!progress) return null;
  const pct = Math.round((progress.current / progress.total) * 100);
  return (
    <div style={{ padding: "8px 12px", background: "#0A0E14", borderRadius: 4, border: "1px solid #1E2A3A", marginTop: 8, marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 10, color: "#D4A843", fontWeight: 600 }}>
          <Spinner /> Uploading {progress.current}/{progress.total}
        </span>
        <span style={{ fontSize: 10, color: "#566A80" }}>{pct}%</span>
      </div>
      <div style={{ fontSize: 10, color: "#7A8A9E", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {progress.fileName}
      </div>
      <div style={{ height: 4, background: "#1E2A3A", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #D4A843, #E08830)", borderRadius: 2, transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function WarRoom() {
  const [phase, setPhase] = useState("setup");
  const [callsign, setCallsign] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [savedSession, setSavedSession] = useState(null); // { roomId, callsign } from localStorage

  const [library, setLibrary] = useState({ doctrine: {}, scenario: {} });
  const [docFiles, setDocFiles] = useState([]);
  const [docTexts, setDocTexts] = useState({});
  const [scenarioFiles, setScenarioFiles] = useState([]);
  const [scenarioTexts, setScenarioTexts] = useState({});

  const [messages, setMessages] = useState({});
  const [activeChannel, setActiveChannel] = useState("cop");
  const [knowledgeBase, setKnowledgeBase] = useState({}); // { stepId: { agentId: { summary, agentTitle, ... } } }
  const [inputText, setInputText] = useState("");

  const [currentStep, setCurrentStep] = useState(-1);
  const [stepOutputs, setStepOutputs] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [participants, setParticipants] = useState([]);
  const [sessionId] = useState(() => uid());

  const [selectedDocs, setSelectedDocs] = useState(new Set());
  const [selectedScenarios, setSelectedScenarios] = useState(new Set());

  // Collapsible panels
  const [scenarioOpen, setScenarioOpen] = useState(true);
  const [doctrineOpen, setDoctrineOpen] = useState(false);
  const [outputsOpen, setOutputsOpen] = useState(true);
  const [kbOpen, setKbOpen] = useState(true); // Knowledge Base panel
  const [kbExpandedSteps, setKbExpandedSteps] = useState(new Set()); // Which steps are expanded in KB
  const [kbViewAgent, setKbViewAgent] = useState(null); // { stepId, agentId } — full output modal

  // Upload progress
  const [uploadProgress, setUploadProgress] = useState(null); // { current, total, fileName }

  // Export
  const [exporting, setExporting] = useState(false);
  const [exportText, setExportText] = useState("");
  const [showExport, setShowExport] = useState(false);

  const messagesEndRef = useRef(null);

  const channelList = [
    { id: "cop", name: "■ Main COP", color: "#D4A843" },
    { id: "cdr", name: "★ Commander", color: "#FFD700" },
    ...Object.values(STAFF).map((r) => ({ id: r.id, name: `${r.icon} ${r.short}`, color: r.color, wff: r.wff })),
  ];

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages[activeChannel]?.length]);

  // Check for saved session on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mdmp_session");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.roomId && parsed.callsign) setSavedSession(parsed);
      }
    } catch {}
  }, []);

  // Load library
  useEffect(() => {
    const libRef = ref(db, "library");
    onValue(libRef, (snap) => {
      const val = snap.val();
      if (val) setLibrary({ doctrine: val.doctrine || {}, scenario: val.scenario || {} });
    });
    return () => off(libRef);
  }, []);

  // Upload to library with DUPLICATE CHECK + PROGRESS
  const uploadToLibrary = useCallback(async (e, type) => {
    const files = Array.from(e.target.files);
    const existing = type === "doctrine" ? library.doctrine : library.scenario;
    const existingNames = new Set(Object.values(existing).map((d) => d.name));
    let dupes = [], errors = [];
    const validFiles = files.filter((f) => { if (existingNames.has(f.name)) { dupes.push(f.name); return false; } return true; });

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadProgress({ current: i + 1, total: validFiles.length, fileName: file.name });
      try {
        const text = await readFileAsText(file);
        const key = sanitizeKey(file.name);
        await set(ref(db, `library/${type}/${key}`), { name: file.name, text, size: file.size, uploadedAt: Date.now(), uploadedBy: callsign || "unknown" });
      } catch (err) {
        console.error("Upload error:", err);
        errors.push(`${file.name}: ${err.message}`);
      }
    }
    setUploadProgress(null);
    let msg = "";
    if (dupes.length > 0) msg += `Duplicates skipped:\n${dupes.join("\n")}\n\n`;
    if (errors.length > 0) msg += `Errors:\n${errors.join("\n")}`;
    if (msg) alert(msg.trim());
    e.target.value = "";
  }, [callsign, library]);

  const deleteFromLibrary = useCallback(async (type, key) => {
    try { await remove(ref(db, `library/${type}/${key}`)); } catch (e) {}
  }, []);

  const loadSelectedDocs = useCallback(() => {
    const dF = [], dT = {}, sF = [], sT = {};
    selectedDocs.forEach((k) => { const d = library.doctrine[k]; if (d) { dF.push(d.name); dT[sanitizeKey(d.name)] = d.text; } });
    selectedScenarios.forEach((k) => { const d = library.scenario[k]; if (d) { sF.push(d.name); sT[sanitizeKey(d.name)] = d.text; } });
    setDocFiles(dF); setDocTexts(dT); setScenarioFiles(sF); setScenarioTexts(sT);
    return { dF, dT, sF, sT };
  }, [selectedDocs, selectedScenarios, library]);

  const toggleDoc = (key, type) => {
    const setter = type === "doctrine" ? setSelectedDocs : setSelectedScenarios;
    setter((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  };
  const selectAll = (type) => {
    if (type === "doctrine") setSelectedDocs(new Set(Object.keys(library.doctrine)));
    else setSelectedScenarios(new Set(Object.keys(library.scenario)));
  };

  const createRoom = useCallback(() => {
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    setRoomId(id);
    set(ref(db, `rooms/${id}`), { created: Date.now(), status: "active" });
    // Persist session for rejoin
    try { localStorage.setItem("mdmp_session", JSON.stringify({ roomId: id, callsign })); } catch {}
    return id;
  }, [callsign]);

  const joinRoom = useCallback((id) => {
    setRoomId(id);
    // Persist session for rejoin
    try { localStorage.setItem("mdmp_session", JSON.stringify({ roomId: id, callsign })); } catch {}
    const presRef = ref(db, `rooms/${id}/participants/${sessionId}`);
    set(presRef, { callsign, joinedAt: Date.now(), lastSeen: Date.now() });
    const hb = setInterval(() => set(ref(db, `rooms/${id}/participants/${sessionId}/lastSeen`), Date.now()), 10000);
    onDisconnect(presRef).remove();
    onValue(ref(db, `rooms/${id}/participants`), (s) => { const v = s.val(); if (v) setParticipants(Object.entries(v).filter(([_, p]) => Date.now() - p.lastSeen < 60000).map(([sid, p]) => ({ ...p, sessionId: sid }))); });
    onValue(ref(db, `rooms/${id}/messages`), (s) => { const v = s.val(); if (!v) return; const g = {}; Object.values(v).forEach((m) => { if (!g[m.channel]) g[m.channel] = []; g[m.channel].push(m); }); Object.keys(g).forEach((c) => g[c].sort((a, b) => a.timestamp - b.timestamp)); setMessages(g); });
    onValue(ref(db, `rooms/${id}/mdmpState`), (s) => { const v = s.val(); if (v) { if (v.currentStep !== undefined) setCurrentStep(v.currentStep); if (v.isRunning !== undefined) setIsRunning(v.isRunning); if (v.completedSteps) setCompletedSteps(new Set(v.completedSteps)); if (v.stepOutputs) setStepOutputs(v.stepOutputs); } });
    onValue(ref(db, `rooms/${id}/documents`), (s) => { const v = s.val(); if (v) { if (v.docFiles) setDocFiles(v.docFiles); if (v.scenarioFiles) setScenarioFiles(v.scenarioFiles); } });
    // Knowledge Base listener — syncs condensed outputs from all participants
    onValue(ref(db, `rooms/${id}/knowledge`), (s) => { const v = s.val(); if (v) setKnowledgeBase(v); });
    return () => clearInterval(hb);
  }, [callsign, sessionId]);

  const postMsg = useCallback((ch, sender, color, text, isAgent = false) => {
    if (!roomId) return;
    // Truncate messages to 6K chars max to avoid Firebase "Write too large" errors
    const MAX_MSG = 6000;
    const truncText = text.length > MAX_MSG ? text.slice(0, MAX_MSG) + "\n\n[... Full output in staff channel ...]" : text;
    push(ref(db, `rooms/${roomId}/messages`), { id: uid(), channel: ch, sender, senderColor: color, text: truncText, time: ts(), isAgent, isHuman: !isAgent, timestamp: Date.now(), sessionId }).catch((err) => console.warn("Firebase write warning:", err.message?.slice(0, 100)));
  }, [roomId, sessionId]);

  const syncMdmpState = useCallback((u) => {
    if (!roomId) return;
    // Only sync metadata to Firebase — stepOutputs stay in local state to avoid "Write too large"
    set(ref(db, `rooms/${roomId}/mdmpState`), { currentStep: u.currentStep ?? currentStep, isRunning: u.isRunning ?? isRunning, completedSteps: u.completedSteps ? [...u.completedSteps] : [...completedSteps] }).catch((err) => console.warn("Firebase state sync warning:", err.message?.slice(0, 100)));
  }, [roomId, currentStep, isRunning, completedSteps]);

  // Knowledge Base — save each agent output individually to Firebase (small writes, ~1-2KB each)
  const saveToKnowledgeBase = useCallback((stepId, stepNum, agentId, fullText) => {
    if (!roomId || !fullText || fullText.startsWith("⚠")) return;
    const agent = STAFF[agentId];
    const KB_SUMMARY_LEN = 600; // chars for the condensed summary
    const summary = fullText.length > KB_SUMMARY_LEN ? fullText.slice(0, KB_SUMMARY_LEN) + "..." : fullText;
    set(ref(db, `rooms/${roomId}/knowledge/${stepId}/${agentId}`), {
      agentTitle: agent?.title || agentId,
      agentShort: agent?.short || agentId,
      agentColor: agent?.color || "#7A8A9E",
      agentIcon: agent?.icon || "?",
      stepNum,
      summary,
      timestamp: Date.now(),
    }).catch((err) => console.warn("KB write warning:", err.message?.slice(0, 100)));
  }, [roomId]);

  const handleUpload = useCallback(async (e, type) => {
    const files = Array.from(e.target.files);
    const existing = type === "doctrine" ? library.doctrine : library.scenario;
    const existingNames = new Set(Object.values(existing).map((d) => d.name));
    const nDF = [...docFiles], nDT = { ...docTexts }, nSF = [...scenarioFiles], nST = { ...scenarioTexts };
    let dupes = [], errors = [];
    const validFiles = files.filter((f) => { if (existingNames.has(f.name)) { dupes.push(f.name); return false; } return true; });
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      setUploadProgress({ current: i + 1, total: validFiles.length, fileName: file.name });
      try {
        const text = await readFileAsText(file);
        const key = sanitizeKey(file.name);
        await set(ref(db, `library/${type}/${key}`), { name: file.name, text, size: file.size, uploadedAt: Date.now(), uploadedBy: callsign || "unknown" });
        if (type === "doctrine") { if (!nDF.includes(file.name)) nDF.push(file.name); nDT[sanitizeKey(file.name)] = text; }
        else { if (!nSF.includes(file.name)) nSF.push(file.name); nST[sanitizeKey(file.name)] = text; }
      } catch (err) { errors.push(`${file.name}: ${err.message}`); }
    }
    setUploadProgress(null);
    let msg = "";
    if (dupes.length > 0) msg += `Duplicates skipped:\n${dupes.join("\n")}\n\n`;
    if (errors.length > 0) msg += `Errors:\n${errors.join("\n")}`;
    if (msg) alert(msg.trim());
    setDocFiles(nDF); setDocTexts(nDT); setScenarioFiles(nSF); setScenarioTexts(nST);
    // Only sync file names to Firebase (not full text) to avoid "Write too large"
    if (roomId) set(ref(db, `rooms/${roomId}/documents`), { docFiles: nDF, scenarioFiles: nSF });
    e.target.value = "";
  }, [docFiles, docTexts, scenarioFiles, scenarioTexts, roomId, callsign, library]);

  const getDocContext = useCallback(() => {
    // Scenario files are ALREADY hardcoded in SCENARIO_PACKAGE — skip them to avoid doubling prompt size
    // Only include user-uploaded doctrine references (if any)
    let c = "";
    if (Object.keys(scenarioTexts).length > 0) { c += `[${Object.keys(scenarioTexts).length} scenario documents loaded — content provided via SCENARIO_PACKAGE in prompt]\n\n`; }
    if (Object.keys(docTexts).length > 0) { c += "══ DOCTRINE REFERENCES ══\n\n"; Object.entries(docTexts).forEach(([n, t]) => { c += `── ${n} ──\n${t}\n\n`; }); }
    return c;
  }, [docTexts, scenarioTexts]);

  const getPrevOutputs = useCallback(() => {
    let p = "";
    Object.entries(stepOutputs).forEach(([sid, outs]) => { const st = MDMP_STEPS.find((s) => s.id === sid); if (st) { p += `\n══ STEP ${st.num}: ${st.title} ══\n`; Object.entries(outs).forEach(([rid, txt]) => { const r = STAFF[rid]; if (r) p += `\n── ${r.title} ──\n${txt}\n`; }); } });
    return p;
  }, [stepOutputs]);

  const runStep = useCallback(async (si) => {
    const step = MDMP_STEPS[si]; if (!step) return;
    setIsRunning(true); setCurrentStep(si); syncMdmpState({ isRunning: true, currentStep: si });
    const docs = getDocContext(), prev = getPrevOutputs(), prompt = step.prompt(docs, prev);
    postMsg("cop", "SYSTEM", "#D4A843", `═══════════════════════════════════════\n  25 ID STAFF: STEP ${step.num} — ${step.title.toUpperCase()}\n═══════════════════════════════════════\n\nLead: ${step.lead.map((l) => STAFF[l]?.short).join(", ")}\nSupporting: ${step.support.map((s) => STAFF[s]?.short).join(", ")}\nOutputs: ${step.outputs.join(", ")}\n\nAll sections working...`, true);
    const allAgents = [...step.lead, ...step.support], results = {};
    for (const a of allAgents) postMsg(a, STAFF[a].title, STAFF[a].color, `Roger. Working Step ${step.num}...`, true);
    // Run agents ONE AT A TIME — 1500 token cap + 2s gaps to stay within Tier 1 output token limit (8K/min)
    for (const a of allAgents) {
      const agent = STAFF[a];
      const result = await callAgent(a, `${prompt}\n\nYou are the ${agent.title}. Provide YOUR specific outputs for this step. Be concise — focus on actionable items, under 800 words.`, { maxTokens: 1500 });
      results[a] = result;
      postMsg(a, agent.title, agent.color, result, true);
      postMsg("cop", agent.title, agent.color, `── ${agent.short} ──\n\n${result.length > 400 ? result.slice(0, 400) + "\n\n[... Full in " + agent.short + " channel ...]" : result}`, true);
      saveToKnowledgeBase(step.id, step.num, a, result); // Persist to KB
      await new Promise(r => setTimeout(r, 2000)); // 2s gap between agents
    }
    // XO synthesis — 15s delay for rate limit recovery, aggressive truncation, graceful fallback
    postMsg("cop", "SYSTEM", "#D4A843", "All sections reported. XO synthesizing...", true);
    await new Promise(r => setTimeout(r, 15000)); // 15s gap — lets output token rate limit window slide
    const xoInputs = Object.entries(results)
      .filter(([_, t]) => typeof t === "string" && !t.startsWith("⚠"))
      .map(([i, t]) => `${STAFF[i]?.short || i}: ${t.slice(0, 400)}`)
      .join("\n\n");
    let xo;
    try {
      xo = await callAgent("xo", `XO: Synthesize Step ${step.num}.\n\n${xoInputs}\n\nBLUF, key issues, gaps, risks. Under 400 words.`, { maxTokens: 800, retries: 1 });
    } catch (e) { xo = null; }
    // Graceful fallback if XO fails (timeout, rate limit, etc.)
    if (xo && !xo.startsWith("⚠")) {
      postMsg("cop", "25 ID XO", "#D4A843", `══ STEP ${step.num} SYNTHESIS ══\n\n${xo}`, true);
      saveToKnowledgeBase(step.id, step.num, "xo_synthesis", `STEP ${step.num} XO SYNTHESIS:\n${xo}`);
    } else {
      const completed = Object.entries(results).filter(([_, t]) => typeof t === "string" && !t.startsWith("⚠")).map(([id]) => STAFF[id]?.short || id);
      const failed = Object.entries(results).filter(([_, t]) => typeof t === "string" && t.startsWith("⚠")).map(([id]) => STAFF[id]?.short || id);
      let fallback = `══ STEP ${step.num} SUMMARY ══\n\n✓ Sections reported: ${completed.join(", ")}`;
      if (failed.length > 0) fallback += `\n⚠ Errors: ${failed.join(", ")}`;
      fallback += `\n\nXO synthesis unavailable (API cooldown). Review individual staff channels for full outputs.`;
      postMsg("cop", "25 ID XO", "#D4A843", fallback, true);
    }
    postMsg("cop", "SYSTEM", "#D4A843", `✓ Step ${step.num} COMPLETE\n${step.outputs.map((o) => `  ✓ ${o}`).join("\n")}\n\nReview outputs, interact with any section, or proceed.`, true);
    const nO = { ...stepOutputs, [step.id]: results }, nC = new Set([...completedSteps, si]);
    setStepOutputs(nO); setCompletedSteps(nC); setIsRunning(false);
    syncMdmpState({ isRunning: false, completedSteps: nC, stepOutputs: nO });
  }, [getDocContext, getPrevOutputs, postMsg, syncMdmpState, saveToKnowledgeBase, stepOutputs, completedSteps]);

  const sendMessage = useCallback(async () => {
    const text = inputText.trim(); if (!text || isRunning) return; setInputText("");
    const sn = callsign || "OPERATOR";
    postMsg(activeChannel, sn, "#4A9EE8", text, false);
    if (STAFF[activeChannel]) {
      const agent = STAFF[activeChannel];
      postMsg(activeChannel, agent.title, agent.color, "Processing...", true);
      const recent = (messages[activeChannel] || []).slice(-20).map((m) => `${m.sender}: ${m.text}`).join("\n\n");
      const resp = await callAgent(activeChannel, `CONVERSATION:\n${recent}\n\nDOCS:\n${getDocContext()}\n\nPREV OUTPUTS:\n${getPrevOutputs()}\n\n${sn} says: "${text}"\n\nRespond as ${agent.title}. If this is a request for revision, clearly mark changes as "REVISED per guidance." Be specific, use doctrine.`);
      postMsg(activeChannel, agent.title, agent.color, resp, true);
    } else if (activeChannel === "cop") {
      const resp = await callAgent("xo", `CDR (${sn}) posted to COP: "${text}"\n\nRecent COP:\n${(messages.cop || []).slice(-10).map((m) => `${m.sender}: ${m.text.slice(0, 200)}`).join("\n")}\n\nDocs:\n${getDocContext()}\n\nPrev:\n${getPrevOutputs()}\n\nAs 25 ID XO, respond.`);
      postMsg("cop", "25 ID XO", "#D4A843", resp, true);
    } else if (activeChannel === "cdr") {
      postMsg("cdr", "SYSTEM", "#FFD700", "CDR guidance recorded. Staff notified.", true);
      postMsg("cop", "SYSTEM", "#D4A843", `⚡ CDR GUIDANCE: "${text.slice(0, 300)}"`, true);
    }
  }, [inputText, activeChannel, callsign, messages, isRunning, getDocContext, getPrevOutputs, postMsg]);

  // Export brief — streaming response (same pattern as callAgent)
  const exportBrief = useCallback(async (type) => {
    setExporting(true); setShowExport(true); setExportText("Generating brief...");
    try {
      const res = await fetch("/api/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stepOutputs, knowledgeBase, completedSteps: [...completedSteps], type }) });
      const rawText = await res.text();
      const trimmed = rawText.trim();
      let data;
      try { data = JSON.parse(trimmed); } catch { setExportText("Error: Server returned non-JSON (possible timeout). Try again."); setExporting(false); return; }
      setExportText(data.error ? `Error: ${data.error}` : data.text);
    } catch (e) { setExportText(`Error: ${e.message}`); }
    setExporting(false);
  }, [stepOutputs, knowledgeBase, completedSteps]);

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  // ═════════ SETUP ═════════
  if (phase === "setup") {
    return (<div style={S.root}><div style={S.over}><div style={S.box}>
      <div style={S.logo}>⚔ 25 ID MDMP WAR ROOM</div>
      <div style={S.sub}>25th Infantry Division "Tropic Lightning" — Virtual Staff Platform</div>
      {savedSession && (
        <div style={{ padding: "12px", background: "rgba(74, 158, 232, 0.08)", borderRadius: 6, border: "1px solid rgba(74, 158, 232, 0.3)", marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: "#4A9EE8", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PREVIOUS SESSION FOUND</div>
          <div style={{ fontSize: 12, color: "#C0CCD8", marginBottom: 8 }}>Room <span style={{ color: "#D4A843", fontWeight: 700 }}>{savedSession.roomId}</span> as <span style={{ color: "#4A9EE8", fontWeight: 700 }}>{savedSession.callsign}</span></div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ ...S.btn("#4A9EE8", false), flex: 1 }} onClick={() => { setCallsign(savedSession.callsign); joinRoom(savedSession.roomId); setPhase("lobby"); }}>RESUME SESSION</button>
            <button style={{ flex: 0, padding: "8px 12px", background: "transparent", border: "1px solid #2A3A4A", borderRadius: 4, color: "#566A80", fontSize: 10, cursor: "pointer" }} onClick={() => { try { localStorage.removeItem("mdmp_session"); } catch {} setSavedSession(null); }}>DISMISS</button>
          </div>
        </div>
      )}
      <label style={S.label}>YOUR CALLSIGN</label>
      <input style={S.ti} placeholder="e.g. LIGHTNING 6, MAJ Smith" value={callsign} onChange={(e) => setCallsign(e.target.value)} />
      {(Object.keys(library.doctrine).length > 0 || Object.keys(library.scenario).length > 0) && (
        <div style={{ padding: "8px 12px", background: "#0A0E14", borderRadius: 4, border: "1px solid #1E2A3A", marginBottom: 12, fontSize: 11, color: "#7A8A9E" }}>
          📚 Library: <span style={{ color: "#4A9EE8" }}>{Object.keys(library.doctrine).length} doctrine</span> + <span style={{ color: "#E05555" }}>{Object.keys(library.scenario).length} scenario</span>
        </div>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ ...S.btn("#D4A843", !callsign), flex: 1 }} disabled={!callsign} onClick={() => { const id = createRoom(); joinRoom(id); setPhase("lobby"); }}>CREATE NEW ROOM</button>
      </div>
      <div style={S.div}><span style={{ background: "#131920", padding: "0 12px", color: "#566A80", fontSize: 10 }}>OR JOIN EXISTING</span></div>
      <div style={{ display: "flex", gap: 8 }}>
        <input style={{ ...S.ti, flex: 1, marginBottom: 0 }} placeholder="Room code" value={joinRoomId} onChange={(e) => setJoinRoomId(e.target.value.toUpperCase())} />
        <button style={S.btn("#4A9EE8", !callsign || !joinRoomId)} disabled={!callsign || !joinRoomId} onClick={() => { setRoomId(joinRoomId); joinRoom(joinRoomId); setPhase("lobby"); }}>JOIN</button>
      </div>
      <button style={{ ...S.btn("#2A3A4A", !callsign), width: "100%", marginTop: 16, color: "#7A8A9E", background: "#131920", border: "1px solid #1E2A3A" }} disabled={!callsign} onClick={() => setPhase("library")}>📚 MANAGE DOCUMENT LIBRARY</button>
    </div></div></div>);
  }

  // ═════════ LIBRARY ═════════
  if (phase === "library") {
    return (<div style={S.root}><div style={S.over}><div style={{ ...S.box, maxWidth: 640 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={S.logo}>📚 DOCUMENT LIBRARY</div>
        <button style={{ ...S.btn("#566A80", false), padding: "6px 12px", fontSize: 10 }} onClick={() => setPhase("setup")}>← BACK</button>
      </div>
      <div style={{ fontSize: 11, color: "#566A80", marginBottom: 16 }}>Upload once, use forever. Duplicates are automatically blocked.</div>
      {["doctrine", "scenario"].map((type) => (
        <div key={type} style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: type === "doctrine" ? "#4A9EE8" : "#E05555", textTransform: "uppercase" }}>{type} ({Object.keys(library[type]).length})</span>
          {Object.entries(library[type]).map(([key, doc]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#0A0E14", borderRadius: 4, marginBottom: 4, marginTop: 4, border: "1px solid #1E2A3A" }}>
              <span style={{ fontSize: 12 }}>{type === "doctrine" ? "📄" : "📋"}</span>
              <span style={{ flex: 1, fontSize: 11, color: "#B8C4D4" }}>{doc.name}</span>
              <span style={{ fontSize: 9, color: "#566A80" }}>{(doc.size / 1024).toFixed(0)}KB</span>
              <button style={{ background: "none", border: "none", color: "#E05555", cursor: "pointer", fontSize: 11, fontFamily: "inherit" }} onClick={() => deleteFromLibrary(type, key)}>✕</button>
            </div>
          ))}
          <div style={{ position: "relative", marginTop: 6 }}>
            <input type="file" multiple accept=".txt,.md,.doc,.docx,.pdf" onChange={(e) => uploadToLibrary(e, type)} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 1 }} />
            <div style={S.ub}>+ Upload {type === "doctrine" ? "Doctrine" : "Scenario Docs"}</div>
          </div>
        </div>
      ))}
      <UploadProgress progress={uploadProgress} />
      <button style={{ ...S.btn("#D4A843", !!uploadProgress), width: "100%", padding: 12 }} disabled={!!uploadProgress} onClick={() => setPhase("setup")}>DONE</button>
    </div></div></div>);
  }

  // ═════════ LOBBY ═════════
  if (phase === "lobby") {
    return (<div style={S.root}><div style={S.over}><div style={{ ...S.box, maxWidth: 600 }}>
      <div style={S.logo}>⚔ 25 ID WAR ROOM: {roomId}</div>
      <div style={S.sub}>Share code with team</div>
      <div style={S.rcb}><span style={S.rc}>{roomId}</span><button style={{ ...S.btn("#2A3A4A", false), padding: "6px 12px", fontSize: 10 }} onClick={() => navigator.clipboard?.writeText(roomId)}>COPY</button></div>
      <div style={{ margin: "12px 0 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>{participants.map((p) => <span key={p.sessionId} style={S.pt}><span style={S.dot} /> {p.callsign}</span>)}</div>

      {/* Built-in documents — native to the staff */}
      <div style={{ margin: "16px 0 8px", padding: "12px", background: "#0A0E14", borderRadius: 6, border: "1px solid #1E2A3A" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#3EAF5C", textTransform: "uppercase", marginBottom: 8 }}>NATIVE STAFF DOCUMENTS</div>
        <div style={{ fontSize: 10, color: "#566A80", marginBottom: 10 }}>Scenario and doctrine are coded into the virtual staff. No upload required.</div>
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 9, color: "#E05555", fontWeight: 700, letterSpacing: 1 }}>SCENARIO</span>
          {BUILT_IN_SCENARIO.map((d) => <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 8px", fontSize: 10, color: "#7A8A9E" }}><span style={{ color: "#3EAF5C", fontSize: 8, fontWeight: 700, background: "#3EAF5C18", padding: "1px 4px", borderRadius: 2, letterSpacing: 0.5 }}>{d.tag}</span> {d.name}</div>)}
        </div>
        <div>
          <span style={{ fontSize: 9, color: "#4A9EE8", fontWeight: 700, letterSpacing: 1 }}>DOCTRINE ({BUILT_IN_DOCTRINE.length} publications)</span>
          {BUILT_IN_DOCTRINE.map((d) => <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "2px 8px", fontSize: 10, color: "#7A8A9E" }}><span style={{ color: "#3EAF5C", fontSize: 8, fontWeight: 700, background: "#3EAF5C18", padding: "1px 4px", borderRadius: 2, letterSpacing: 0.5 }}>{d.tag}</span> {d.name}</div>)}
        </div>
      </div>

      <div style={{ fontSize: 10, color: "#566A80", textAlign: "center", margin: "8px 0" }}>Additional documents (SIGACTs, SITREPs, etc.) can be uploaded during the exercise.</div>

      <button style={{ ...S.btn("#D4A843", false), width: "100%", marginTop: 12, padding: 14 }}
        onClick={() => {
          try {
            setPhase("warroom");
            setTimeout(() => {
              postMsg("cop", "SYSTEM", "#D4A843", `25th Infantry Division War Room ACTIVE\nRoom: ${roomId}\nScenario: W500 — Operation Pacific Pugilist (CODED)\nDoctrine: ${BUILT_IN_DOCTRINE.length} publications (CODED)\n\n▸ RUN STEP 1 to begin MDMP\n▸ Chat any staff section to interact\n▸ Upload SIGACTs/SITREPs during exercise to update the staff`, true);
            }, 500);
          } catch (err) {
            console.error("Enter war room error:", err);
            setPhase("warroom");
          }
        }}>ENTER WAR ROOM →</button>
    </div></div></div>);
  }

  // ═════════ EXPORT MODAL ═════════
  const ExportModal = () => showExport ? (
    <div style={{ position: "fixed", inset: 0, background: "#0A0E14DD", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => !exporting && setShowExport(false)}>
      <div style={{ background: "#131920", border: "1px solid #1E2A3A", borderRadius: 8, padding: 24, width: "80vw", maxWidth: 800, maxHeight: "80vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: "#D4A843", fontWeight: 700, fontSize: 14 }}>📄 EXPORTED BRIEF</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ ...S.btn("#4A9EE8", false), padding: "4px 10px", fontSize: 9 }} onClick={() => { navigator.clipboard?.writeText(exportText); }}>COPY</button>
            <button style={{ ...S.btn("#3EAF5C", false), padding: "4px 10px", fontSize: 9 }} onClick={() => { const b = new Blob([exportText], { type: "text/plain" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = "25ID_Brief.txt"; a.click(); }}>DOWNLOAD</button>
            <button style={{ background: "none", border: "none", color: "#566A80", cursor: "pointer", fontSize: 14 }} onClick={() => setShowExport(false)}>✕</button>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", background: "#0A0E14", borderRadius: 4, padding: 16, fontSize: 12, color: "#B8C4D4", whiteSpace: "pre-wrap", lineHeight: 1.6, fontFamily: "inherit" }}>
          {exporting ? <><Spinner /> Generating brief from MDMP outputs...</> : exportText}
        </div>
      </div>
    </div>
  ) : null;

  // ═════════ WAR ROOM ═════════
  const chMsgs = messages[activeChannel] || [];
  const aStaff = STAFF[activeChannel];

  return (
    <div style={S.root}>
      <ExportModal />
      <div style={S.hdr}>
        <div style={S.hdrL}><span style={S.hdrLogo}>⚔ 25 ID WAR ROOM</span><span style={S.hdrM}>ROOM: {roomId}</span></div>
        <div style={S.hdrR}>{participants.map((p) => <span key={p.sessionId} style={S.pt}><span style={S.dot} /> {p.callsign}</span>)}</div>
      </div>
      <div style={S.body}>
        {/* SIDEBAR */}
        <div style={S.sb}>
          <div style={S.sl}>MAIN CHANNELS</div>
          {channelList.slice(0, 2).map((c) => <button key={c.id} style={S.cb(activeChannel === c.id, c.color)} onClick={() => setActiveChannel(c.id)}><span style={{ color: c.color, fontSize: 11, width: 16, textAlign: "center" }}>{c.id === "cop" ? "■" : "★"}</span>{c.name}</button>)}
          <div style={S.sl}>STAFF SECTIONS</div>
          {channelList.slice(2).map((c) => <button key={c.id} style={S.cb(activeChannel === c.id, c.color)} onClick={() => setActiveChannel(c.id)}><span style={{ color: c.color, fontSize: 11, width: 16, textAlign: "center" }}>{STAFF[c.id]?.icon}</span>{STAFF[c.id]?.short} — {c.wff?.split("/")[0]}</button>)}
          <div style={{ flex: 1 }} />
        </div>

        {/* MAIN CHAT */}
        <div style={S.main}>
          <div style={S.tb}>
            <span style={S.ct}>{aStaff ? `${aStaff.icon} ${aStaff.title}` : channelList.find((c) => c.id === activeChannel)?.name}</span>
            {aStaff && <span style={{ fontSize: 11, color: "#566A80", marginLeft: 12 }}>{aStaff.desc}</span>}
          </div>
          <div style={S.ma}>
            {chMsgs.map((m) => (
              <div key={m.id} style={S.msg(m.isHuman, m.senderColor)}>
                <div style={S.av(m.senderColor)}>{m.isHuman ? "👤" : m.sender.slice(0, 2).toUpperCase()}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div><span style={{ fontSize: 11, fontWeight: 700, color: m.senderColor }}>{m.sender}</span><span style={{ fontSize: 10, color: "#566A80", marginLeft: 8 }}>{m.time}</span></div>
                  <div style={S.mt}>{m.text}</div>
                </div>
              </div>
            ))}
            {isRunning && activeChannel === "cop" && <div style={{ padding: "8px 12px", color: "#D4A843", fontSize: 12, animation: "pulse 1.5s infinite" }}><Spinner /> 25 ID staff working...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div style={S.ib}>
            <textarea style={S.inf} placeholder={`Message as ${callsign}... (Shift+Enter for newline)`} value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} rows={1} />
            <button style={S.btn("#4A9EE8", !inputText.trim() || isRunning)} disabled={!inputText.trim() || isRunning} onClick={sendMessage}>SEND</button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={S.rp}>
          <div style={S.rps}>
            <div style={S.rpt}>MDMP PROGRESS</div>
            {MDMP_STEPS.map((step, i) => (
              <button key={step.id} style={S.stb(currentStep === i, completedSteps.has(i))} onClick={() => !isRunning && setCurrentStep(i)}>
                <span style={S.stn(currentStep === i, completedSteps.has(i))}>{completedSteps.has(i) ? "✓" : step.num}</span>
                <span style={{ flex: 1 }}>{step.title}</span>
              </button>
            ))}
            <button style={{ ...S.btn("#D4A843", isRunning), width: "100%", marginTop: 8, padding: 8 }} disabled={isRunning}
              onClick={() => runStep(completedSteps.size === 0 ? 0 : Math.min(completedSteps.size, MDMP_STEPS.length - 1))}>
              {isRunning ? <><Spinner /> RUNNING...</> : completedSteps.size === 0 ? "▶ RUN STEP 1" : completedSteps.size >= MDMP_STEPS.length ? "✓ COMPLETE" : `▶ RUN STEP ${completedSteps.size + 1}`}
            </button>
            {completedSteps.size > 0 && completedSteps.size < MDMP_STEPS.length && (
              <button style={{ ...S.btn("#566A80", isRunning), width: "100%", marginTop: 4, padding: 6, fontSize: 9 }} disabled={isRunning} onClick={() => runStep(currentStep >= 0 ? currentStep : 0)}>↺ RERUN STEP</button>
            )}
          </div>

          {/* COLLAPSIBLE FILE TREES */}
          <div style={{ ...S.rps, flex: 1, overflowY: "auto" }}>
            <div style={S.rpt}>SESSION DOCUMENTS</div>

            {/* BUILT-IN SCENARIO - collapsible */}
            <button onClick={() => setScenarioOpen(!scenarioOpen)} style={S.collapseBtn}>
              <span style={{ color: "#E05555", fontSize: 10 }}>{scenarioOpen ? "▼" : "▶"}</span>
              <span style={{ fontSize: 9, color: "#E05555", fontWeight: 700, letterSpacing: 1 }}>SCENARIO ({BUILT_IN_SCENARIO.length})</span>
            </button>
            {scenarioOpen && BUILT_IN_SCENARIO.map((d) => (
              <div key={d.name} style={{ ...S.ft, gap: 4 }}>
                <span style={{ color: "#3EAF5C", fontSize: 7, fontWeight: 700, background: "#3EAF5C18", padding: "1px 3px", borderRadius: 2, letterSpacing: 0.5, flexShrink: 0 }}>{d.tag}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</span>
              </div>
            ))}

            {/* BUILT-IN DOCTRINE - collapsible */}
            <button onClick={() => setDoctrineOpen(!doctrineOpen)} style={{ ...S.collapseBtn, marginTop: 6 }}>
              <span style={{ color: "#4A9EE8", fontSize: 10 }}>{doctrineOpen ? "▼" : "▶"}</span>
              <span style={{ fontSize: 9, color: "#4A9EE8", fontWeight: 700, letterSpacing: 1 }}>DOCTRINE ({BUILT_IN_DOCTRINE.length})</span>
            </button>
            {doctrineOpen && BUILT_IN_DOCTRINE.map((d) => (
              <div key={d.name} style={{ ...S.ft, gap: 4 }}>
                <span style={{ color: "#3EAF5C", fontSize: 7, fontWeight: 700, background: "#3EAF5C18", padding: "1px 3px", borderRadius: 2, letterSpacing: 0.5, flexShrink: 0 }}>{d.tag}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</span>
              </div>
            ))}

            {/* UPLOADED DOCUMENTS — SIGACTs, SITREPs, etc. added during exercise */}
            {(docFiles.length > 0 || scenarioFiles.length > 0) && (
              <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #1E2A3A" }}>
                <span style={{ fontSize: 9, color: "#D4A843", fontWeight: 700, letterSpacing: 1 }}>UPLOADED ({docFiles.length + scenarioFiles.length})</span>
                {scenarioFiles.map((f) => <div key={f} style={S.ft}>📋 {f}</div>)}
                {docFiles.map((f) => <div key={f} style={S.ft}>📄 {f}</div>)}
              </div>
            )}

            <div style={{ position: "relative", marginTop: 8 }}>
              <input type="file" multiple accept=".txt,.md,.doc,.docx,.pdf" onChange={(e) => handleUpload(e, "doctrine")} style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 1 }} />
              <div style={S.ub}>+ Upload SIGACTs / SITREPs / Updates</div>
            </div>
            <UploadProgress progress={uploadProgress} />
          </div>

          {/* KNOWLEDGE BASE — persistent record of all staff due outs */}
          {(completedSteps.size > 0 || Object.keys(knowledgeBase).length > 0) && (
            <div style={{ ...S.rps, borderTop: "1px solid #1E2A3A", flex: 1, overflowY: "auto" }}>
              <button onClick={() => setKbOpen(!kbOpen)} style={S.collapseBtn}>
                <span style={{ color: "#D4A843", fontSize: 10 }}>{kbOpen ? "▼" : "▶"}</span>
                <span style={S.rpt}>KNOWLEDGE BASE ({Object.keys(knowledgeBase).length} steps)</span>
              </button>
              {kbOpen && (() => {
                // Merge local stepOutputs with Firebase knowledgeBase
                const allStepIds = new Set([...Object.keys(stepOutputs), ...Object.keys(knowledgeBase)]);
                const sortedSteps = MDMP_STEPS.filter((s) => allStepIds.has(s.id));
                return sortedSteps.map((step) => {
                  const kbStep = knowledgeBase[step.id] || {};
                  const localStep = stepOutputs[step.id] || {};
                  const agentIds = new Set([...Object.keys(kbStep), ...Object.keys(localStep)]);
                  const isExpanded = kbExpandedSteps.has(step.id);
                  return (
                    <div key={step.id} style={{ marginBottom: 6 }}>
                      <button
                        onClick={() => setKbExpandedSteps((prev) => { const n = new Set(prev); n.has(step.id) ? n.delete(step.id) : n.add(step.id); return n; })}
                        style={{ ...S.collapseBtn, padding: "3px 0", background: isExpanded ? "#1A233222" : "transparent" }}
                      >
                        <span style={{ color: "#D4A843", fontSize: 9 }}>{isExpanded ? "▼" : "▶"}</span>
                        <span style={{ fontSize: 10, color: "#D4A843", fontWeight: 600 }}>Step {step.num}: {step.title}</span>
                        <span style={{ fontSize: 8, color: "#566A80", marginLeft: "auto" }}>{agentIds.size} entries</span>
                      </button>
                      {isExpanded && (
                        <div style={{ paddingLeft: 8, borderLeft: "2px solid #1E2A3A", marginLeft: 4 }}>
                          {/* Step outputs checklist */}
                          <div style={{ marginBottom: 4 }}>
                            {step.outputs.map((o) => (
                              <div key={o} style={{ fontSize: 8, color: completedSteps.has(MDMP_STEPS.indexOf(step)) ? "#3EAF5C" : "#566A80", paddingLeft: 4 }}>
                                {completedSteps.has(MDMP_STEPS.indexOf(step)) ? "✓" : "○"} {o}
                              </div>
                            ))}
                          </div>
                          {/* Agent entries */}
                          {[...agentIds].filter((aid) => aid !== "xo_synthesis").map((agentId) => {
                            const kb = kbStep[agentId];
                            const local = localStep[agentId];
                            const agent = STAFF[agentId];
                            if (!agent) return null;
                            const preview = kb?.summary || (typeof local === "string" ? (local.length > 150 ? local.slice(0, 150) + "..." : local) : "");
                            if (!preview || preview.startsWith("⚠")) return null;
                            return (
                              <button
                                key={agentId}
                                onClick={() => setActiveChannel(agentId)}
                                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "4px 4px", borderRadius: 3, fontFamily: "inherit", marginBottom: 2, transition: "background 0.15s" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#1A2332"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                                title={`Click to open ${agent.short} channel`}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                                  <span style={{ color: agent.color, fontSize: 9 }}>{agent.icon}</span>
                                  <span style={{ fontSize: 9, fontWeight: 700, color: agent.color }}>{agent.short}</span>
                                  <span style={{ fontSize: 8, color: "#566A80" }}>— {agent.wff?.split("/")[0]}</span>
                                </div>
                                <div style={{ fontSize: 8, color: "#7A8A9E", lineHeight: 1.4, paddingLeft: 13, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                  {preview.slice(0, 200)}
                                </div>
                              </button>
                            );
                          })}
                          {/* XO Synthesis entry */}
                          {kbStep.xo_synthesis && (
                            <div style={{ marginTop: 4, padding: "4px 4px", borderTop: "1px dashed #1E2A3A" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                                <span style={{ color: "#D4A843", fontSize: 9 }}>⚔</span>
                                <span style={{ fontSize: 9, fontWeight: 700, color: "#D4A843" }}>XO SYNTHESIS</span>
                              </div>
                              <div style={{ fontSize: 8, color: "#B8C4D4", lineHeight: 1.4, paddingLeft: 13, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                {kbStep.xo_synthesis.summary?.slice(0, 200) || ""}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}

              {/* Export Brief buttons */}
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#566A80", textTransform: "uppercase", marginTop: 8, marginBottom: 4 }}>EXPORT BRIEF</div>
              <button style={{ ...S.btn("#D4A843", exporting), width: "100%", padding: 6, fontSize: 9, marginBottom: 4 }} disabled={exporting} onClick={() => exportBrief("decision_brief")}>📄 CDR Decision Brief</button>
              <button style={{ ...S.btn("#4A9EE8", exporting), width: "100%", padding: 6, fontSize: 9, marginBottom: 4 }} disabled={exporting} onClick={() => exportBrief("opord_summary")}>📋 OPORD Summary</button>
              <button style={{ ...S.btn("#3EAF5C", exporting), width: "100%", padding: 6, fontSize: 9 }} disabled={exporting} onClick={() => exportBrief("staff_summary")}>📊 Staff Summary</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═════════ STYLES ═════════
const S = {
  root: { height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", fontSize: 13, lineHeight: 1.5 },
  over: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0E14" },
  box: { background: "#131920", border: "1px solid #1E2A3A", borderRadius: 8, padding: 28, width: 440, maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" },
  logo: { color: "#D4A843", fontSize: 20, fontWeight: 700, letterSpacing: 2, textAlign: "center" },
  sub: { color: "#566A80", fontSize: 11, textAlign: "center", marginBottom: 20 },
  rcb: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: 12, background: "#0A0E14", borderRadius: 6, border: "1px solid #1E2A3A" },
  rc: { fontSize: 28, fontWeight: 700, color: "#D4A843", letterSpacing: 6 },
  div: { textAlign: "center", borderBottom: "1px solid #1E2A3A", lineHeight: "0.1em", margin: "20px 0" },
  ub: { background: "#131920", border: "1px dashed #1E2A3A", borderRadius: 4, padding: "8px 10px", fontSize: 10, color: "#566A80", textAlign: "center", cursor: "pointer" },
  hdr: { background: "linear-gradient(180deg,#131920,#0D1117)", borderBottom: "1px solid #1E2A3A", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 },
  hdrL: { display: "flex", alignItems: "center", gap: 12 },
  hdrLogo: { color: "#D4A843", fontSize: 16, fontWeight: 700, letterSpacing: 2 },
  hdrM: { color: "#566A80", fontSize: 11 },
  hdrR: { display: "flex", alignItems: "center", gap: 6 },
  pt: { display: "flex", alignItems: "center", gap: 4, background: "#131920", padding: "3px 8px", borderRadius: 3, fontSize: 10, color: "#7A8A9E" },
  dot: { display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#3EAF5C", boxShadow: "0 0 4px #3EAF5C88" },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sb: { width: 230, background: "#0D1117", borderRight: "1px solid #1E2A3A", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" },
  sl: { padding: "10px 12px 6px", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#566A80", textTransform: "uppercase" },
  cb: (a, c) => ({ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", cursor: "pointer", background: a ? "#1A2332" : "transparent", color: a ? "#E8ECF2" : "#7A8A9E", fontSize: 12, fontWeight: a ? 600 : 400, border: "none", width: "100%", textAlign: "left", fontFamily: "inherit", borderLeft: `2px solid ${a ? c : "transparent"}` }),
  main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  tb: { background: "#0D1117", borderBottom: "1px solid #1E2A3A", padding: "8px 16px", flexShrink: 0 },
  ct: { fontSize: 14, fontWeight: 600, color: "#E8ECF2" },
  ma: { flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 },
  msg: (h, c) => ({ display: "flex", gap: 10, padding: "8px 12px", borderRadius: 4, background: h ? "#131D2A" : "#0F1520", borderLeft: `3px solid ${h ? "#4A9EE8" : c}`, animation: "fadeIn 0.3s ease" }),
  av: (c) => ({ width: 28, height: 28, borderRadius: 4, background: c + "22", border: `1px solid ${c}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, color: c, fontWeight: 700 }),
  mt: { fontSize: 12.5, color: "#B8C4D4", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.6 },
  ib: { borderTop: "1px solid #1E2A3A", padding: "10px 16px", background: "#0D1117", display: "flex", gap: 8, flexShrink: 0 },
  inf: { flex: 1, background: "#131920", border: "1px solid #1E2A3A", borderRadius: 4, padding: "8px 12px", color: "#E8ECF2", fontSize: 12.5, fontFamily: "inherit", resize: "none", minHeight: 36, maxHeight: 120 },
  rp: { width: 270, background: "#0D1117", borderLeft: "1px solid #1E2A3A", display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" },
  rps: { padding: "10px 12px", borderBottom: "1px solid #1E2A3A" },
  rpt: { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#566A80", textTransform: "uppercase", marginBottom: 4 },
  stb: (a, d) => ({ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", borderRadius: 3, background: a ? "#1A2332" : "transparent", cursor: "pointer", border: "none", width: "100%", textAlign: "left", fontFamily: "inherit", color: d ? "#3EAF5C" : a ? "#D4A843" : "#566A80", fontSize: 11 }),
  stn: (a, d) => ({ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${d ? "#3EAF5C" : a ? "#D4A843" : "#2A3A4A"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, background: d ? "#3EAF5C22" : "transparent", flexShrink: 0 }),
  ft: { display: "flex", alignItems: "center", gap: 6, padding: "3px 8px 3px 16px", background: "#131920", borderRadius: 3, marginBottom: 2, fontSize: 10, color: "#7A8A9E" },
  collapseBtn: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: "4px 0", width: "100%", textAlign: "left", fontFamily: "inherit" },
  label: { fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#566A80", textTransform: "uppercase", marginBottom: 4, display: "block" },
  ti: { width: "100%", background: "#0A0E14", border: "1px solid #1E2A3A", borderRadius: 4, padding: "8px 12px", color: "#E8ECF2", fontSize: 12, fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box" },
  btn: (c, d) => ({ background: d ? "#1A2332" : c, color: d ? "#566A80" : "#0A0E14", border: "none", borderRadius: 4, padding: "8px 14px", fontWeight: 700, fontSize: 11, cursor: d ? "default" : "pointer", fontFamily: "inherit", letterSpacing: 0.5, textTransform: "uppercase", opacity: d ? 0.5 : 1, transition: "all 0.15s", whiteSpace: "nowrap" }),
};
