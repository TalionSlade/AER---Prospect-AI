# Deployment Guide — AER Prospect Assist AI
### IDBI Innovate 2026 · Team Expeditioners

---

## Current Deployment

**Live Production URL:** `https://aer-prospect-ai.vercel.app`  
**Vercel Project:** `expeditioners/aer-prospect-ai`  
**GitHub:** `https://github.com/TalionSlade/AER---Prospect-AI`

The application is already deployed and live. Vercel auto-deploys on every push to `main`.

---

## Re-deploying After Changes

```bash
# 1. Build and verify locally
npm run build

# 2. Commit all changes
git add -A
git commit -m "feat: update for submission"
git push origin main

# 3. Vercel auto-deploys in ~30s (check vercel.com dashboard)
# OR deploy manually:
npx vercel --prod --yes
```

---

## First-time Deployment (New Machine)

### Option A — Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login (opens browser)
vercel login

# 3. Deploy to production
vercel --prod --yes
```

Vercel will detect Vite automatically. No config changes needed — `vercel.json` is already configured.

### Option B — Netlify Drop (No Account)

```bash
npm run build
```
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `dist/` folder into the browser
3. Done — URL appears in ~10 seconds

### Option C — GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

---

## Environment Variables

This prototype requires **zero environment variables** — all scoring logic runs client-side in the browser. No API keys, no backend, no database.

This is deliberate for the hackathon prototype. The production AWS version uses Lambda + DynamoDB with secrets managed via AWS Secrets Manager.

---

## Vercel Configuration (vercel.json)

```json
{
  "name": "aer-prospect-ai",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

The `rewrites` rule is critical — it ensures React Router handles all routes (e.g. `/prospect/P-1039`) without a 404 from Vercel's edge.

---

## Judge Navigation Guide

Share these specific URLs with judges for a guided demo:

| Page | URL |
|---|---|
| Officer Cockpit | `https://aer-prospect-ai.vercel.app/` |
| Prospect Detail (P-1039) | `https://aer-prospect-ai.vercel.app/prospect/P-1039` |
| Model Benchmarks | `https://aer-prospect-ai.vercel.app/benchmarks` |
| Import Data | `https://aer-prospect-ai.vercel.app/import` |

**Recommended judge walkthrough:**
1. Open `/` — point out the 2×2 scatter plot and the Convert-Now queue (green rows)
2. Click any green row — show the SHAP waterfall, affordability gauge, and call script
3. Click Approve — show the Human-in-the-Loop decision gate
4. Go to `/benchmarks` — show reproducible accuracy numbers
5. Go to `/import` — show the CSV template and drag-and-drop import

---

## Production AWS Deployment (Phase 2)

The scoring engine formulas are identical in the TypeScript prototype and the planned Python Lambda functions. Deployment steps:

1. `aws cloudformation deploy` — provisions Step Functions, Lambda, DynamoDB, Aurora
2. `aws codepipeline start-pipeline-execution` — runs CI/CD for Lambda agents
3. `aws bedrock put-model` — registers Claude 3.5 Sonnet endpoint
4. `vercel env add` — sets `VITE_API_GATEWAY_URL` for the React app to call API Gateway

---

*AER — Prospect Assist AI · IDBI Innovate 2026 · Team Expeditioners*
