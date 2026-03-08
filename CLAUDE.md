# MDMP Virtual War Room — Development Standards

## Project
- **25th Infantry Division MDMP Virtual War Room**
- **Stack**: Next.js 14.2 + React 18 + Firebase RTDB + Anthropic Claude Sonnet 4
- **Deploy**: Vercel (auto-deploy on push to `main`)
- **Dev server**: port 3002

## Session Memory
- **Throughout every session**, proactively save work-in-progress context to auto-memory files
- **Always save**: what we're working on, key decisions made, where we left off, and next steps
- **Save incrementally** — don't wait until the end of the session; update memory as major progress happens
- **On session end / RTB**: always write a final summary to memory so the next session can pick up exactly where we stopped
- **Memory location**: `C:\Users\shita\.claude\projects\C--Users-shita-mdmp-warroom\memory\MEMORY.md`

## Command Phrases

| Phrase | Meaning |
|--------|---------|
| **Send it** | Commit, push to origin/main, and trigger Vercel deploy |
| **RTB** | Save everything to memory, make sure all work is committed — done for the day |
| **Sitrep** | Show current status — git branch, uncommitted changes, running servers, deploy status, Firebase state |
| **Save to memory** | Write current session context to auto-memory files NOW — what we worked on, decisions made, current state, next steps |
| **Clean rooms** | Delete contaminated Step 5 KB data from specified rooms and reset completedSteps |

## CDR's COA Evaluation Criteria (DO NOT CHANGE)
The Commander approved EXACTLY 4 criteria for COA comparison. Never add, remove, or modify these:
1. **WGX Speed** (Weight: 2) — Time to move entire Division across WGX
2. **Tempo** (Weight: 1) — Time to seize both OBJ Broncos and OBJ Seahawks
3. **Force Attrition** (Weight: 3) — Attrition of combat power
4. **Concentration** (Weight: 3) — Convergence of military capability in time/space for decisive effects

Total Weight: 9. NO other criteria. These are defined in 3 places in `lib/mdmp.js` — keep all 3 in sync.

## Git & Workflow
- Always push to remote after commits
- Branch: `main` (single branch)
- Vercel auto-deploys on push — if deploy doesn't trigger, use empty commit: `git commit --allow-empty -m "Trigger Vercel deploy"`

## Firebase
- **URL**: `https://mdmp-virtual-war-room---500-default-rtdb.firebaseio.com`
- Use REST API for data cleanup/inspection (curl commands in memory file)

## Architecture Notes
- System prompt is MASSIVE (~200K+ chars) — criteria instructions must go at END of system prompt for Step 5 to prevent model defaulting to generic FM 5-0 criteria
- Red rooms (REDCELL1, REDCELL2) are hidden from UI but their wargaming data is preserved and pulled into OVERALL fusion
- STOP button halts step execution between agent calls via `stopRef`
