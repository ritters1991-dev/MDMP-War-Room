# ⚔ MDMP VIRTUAL WAR ROOM — Deployment Guide

## What You're Deploying

A real-time collaborative web app where multiple humans interact with AI-powered division staff agents (S2, S3, S4, S6, FSO, ENG, XO) to execute the Military Decision-Making Process. Anyone with the room code can join.

**Total cost: $0/month** (hosting + Firebase free tiers). You only pay for Anthropic API usage (~$3-8 per full MDMP run).

---

## STEP 1: Set Up Firebase (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** → name it `mdmp-warroom` → disable Google Analytics (not needed) → Create
3. Once created, click the **gear icon** → **Project Settings**
4. Scroll down to **"Your apps"** → click the **web icon** (`</>`)
5. Register app name: `mdmp-warroom` → click **Register**
6. You'll see a config block like this — **copy these values**, you'll need them:
   ```
   apiKey: "AIza..."
   authDomain: "mdmp-warroom.firebaseapp.com"
   projectId: "mdmp-warroom"
   storageBucket: "mdmp-warroom.appspot.com"
   messagingSenderId: "123..."
   appId: "1:123..."
   ```
7. In the left sidebar, click **"Build"** → **"Realtime Database"**
8. Click **"Create Database"** → choose any location → click **Next**
9. Select **"Start in test mode"** → click **Enable**
   
   > ⚠️ Test mode allows open access for 30 days. For production use, you'll want to add security rules later. This is fine for initial setup and testing.

10. Copy your **database URL** from the top of the Realtime Database page — it looks like:
    ```
    https://mdmp-warroom-default-rtdb.firebaseio.com
    ```

---

## STEP 2: Get Your Anthropic API Key (2 minutes)

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **"API Keys"** in the left sidebar
3. Click **"Create Key"** → name it `mdmp-warroom`
4. Copy the key (starts with `sk-ant-...`)

> Note: API billing is separate from your Claude Max subscription. You'll need credits loaded. A full 7-step MDMP run costs roughly $3-8 depending on document size.

---

## STEP 3: Deploy to Vercel (5 minutes)

### Option A: Deploy via GitHub (recommended)

1. Install Git if you don't have it: https://git-scm.com
2. Create a new repo on GitHub called `mdmp-warroom`
3. In your terminal, navigate to the project folder and run:
   ```bash
   cd mdmp-warroom
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mdmp-warroom.git
   git push -u origin main
   ```
4. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
5. Click **"Add New Project"** → Import your `mdmp-warroom` repo
6. Before clicking Deploy, click **"Environment Variables"** and add:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API key |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `your-project-id` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | Your app ID |
   | `ANTHROPIC_API_KEY` | `sk-ant-...` |

7. Click **Deploy** → Wait ~60 seconds
8. You'll get a URL like `https://mdmp-warroom.vercel.app` — **that's your War Room!**

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
cd mdmp-warroom
vercel
# Follow the prompts, then set env vars:
vercel env add ANTHROPIC_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# ... add all the others
vercel --prod
```

---

## STEP 4: Run It Locally First (optional, for testing)

```bash
cd mdmp-warroom
npm install
cp .env.example .env.local
# Edit .env.local with your Firebase config and Anthropic key
npm run dev
# Open http://localhost:3000
```

---

## How to Use the War Room

### Creating a Session
1. Open your War Room URL
2. Enter your callsign (e.g., "EAGLE 6" or "MAJ Smith")
3. Click **CREATE NEW ROOM** — you'll get a 6-character room code

### Inviting Others
1. Share the **room code** (e.g., `A3F2K9`) with your team
2. They open the same URL, enter their callsign, and click **JOIN**
3. Everyone appears in the participant list

### Uploading Documents
In the lobby, upload:
- **Scenario docs**: The higher HQ OPORD, FRAGOs, INTSUMs, map overlays (as text), OPLANs
- **Doctrine**: FM 5-0, FM 6-0, relevant ATPs, unit SOPs

> **Pro tip**: Convert PDFs to .txt first for best results. The AI can read raw text much better than parsed PDF binary.

### Running MDMP
1. Click **ENTER WAR ROOM**
2. Click **▶ RUN STEP 1** — all 7 agents work in parallel
3. Watch outputs appear in the **Main COP** channel and individual staff channels
4. **Click into any staff channel** (S2, S3, etc.) to talk directly to that agent
5. Ask follow-up questions, challenge assumptions, provide guidance
6. Post commander's guidance in the **★ Commander** channel
7. When satisfied, click **▶ RUN STEP 2** and continue through all 7 steps

### Interacting with Staff
- Click the **S2** channel → ask "What are the gaps in your IPB?"
- Click **S3** → say "COA 2 needs a stronger deception plan"
- Click **FSO** → ask "Can we mass fires in Phase 2 to support the main effort?"
- Post in **Commander** → "My guidance is speed over mass — I want to be at OBJ TIGER in 72 hours"

---

## Architecture Overview

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│  Browser 1   │────▶│  Vercel (Next.js) │────▶│  Anthropic  │
│  (Human 1)   │◀────│  /api/agent       │◀────│  Claude API │
└─────────────┘     └──────────────────┘     └─────────────┘
       │                                            
       │              ┌──────────────────┐          
       └─────────────▶│  Firebase RTDB   │◀─────────┐
                      │  (real-time sync) │          │
                      └──────────────────┘     ┌─────────────┐
                                               │  Browser 2   │
                                               │  (Human 2)   │
                                               └─────────────┘
```

- **Vercel** hosts the web app and the API route (keeps your Anthropic key server-side)
- **Firebase Realtime Database** syncs messages, participants, and MDMP state between all connected browsers
- **Anthropic API** powers the 7 staff agents

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "ANTHROPIC_API_KEY not set" | Add the env var in Vercel dashboard → redeploy |
| Firebase not connecting | Check that Realtime Database (not Firestore) is enabled and in test mode |
| Messages not syncing | Verify all `NEXT_PUBLIC_FIREBASE_*` env vars are correct |
| API errors (429) | You're hitting rate limits — wait a moment or use a higher-tier API plan |
| Blank page | Check browser console for errors; ensure `npm install` completed |

---

## Security Notes for Production

Before sharing broadly:
1. **Firebase rules**: Replace test mode with proper rules that scope access to room participants
2. **API key**: Consider adding authentication so not anyone can burn your API credits
3. **Rate limiting**: Add rate limiting to the `/api/agent` route
4. **OPSEC**: Do NOT upload classified or CUI documents. This is for training scenarios only.

---

## Cost Estimate

| Component | Cost |
|-----------|------|
| Vercel hosting | $0 (free tier: 100GB bandwidth/mo) |
| Firebase RTDB | $0 (free tier: 1GB stored, 10GB/mo transferred) |
| Anthropic API | ~$3-8 per full 7-step MDMP run |
| Custom domain (optional) | ~$10-15/year |

For a team running 2-3 MDMP exercises per week, expect roughly **$25-50/month** in API costs.
