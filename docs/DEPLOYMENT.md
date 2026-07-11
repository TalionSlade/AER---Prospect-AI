# Deployment Guide — AER Prospect Assist AI

## Free Hosting on Vercel (Recommended)

Vercel is the fastest, free, zero-config deployment for React/Vite apps.  
**No credit card. No server. URL in under 60 seconds.**

---

## Option A — Vercel CLI (Fastest)

### Prerequisites
- Node.js installed (already have it — you ran `npm run dev`)
- Git repository (optional, but recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy from the prototype directory
```bash
cd "/Users/premasai09/Developer/IDBI Hackathon/AER---Prospect-AI/aer-prototype"
vercel
```

### Step 3: Answer the prompts
```
? Set up and deploy "./aer-prototype"? → Yes
? Which scope? → (your account)
? Link to existing project? → No
? What is your project name? → aer-prospect-ai
? In which directory is your code located? → ./
? Want to override settings? → No
```

### Step 4: Get your URL
Vercel will output:
```
✅  Production: https://aer-prospect-ai.vercel.app [5s]
```

**That URL is your submission URL for the judges.**

---

## Option B — Vercel Dashboard (No CLI)

1. Go to [vercel.com](https://vercel.com) → Sign up free
2. Click **"Add New Project"**
3. Import from GitHub (push the `aer-prototype` folder to a GitHub repo first)
4. Vercel auto-detects Vite — zero config needed
5. Click **Deploy** → Done

---

## Option C — GitHub Pages (Alternative)

```bash
cd "/Users/premasai09/Developer/IDBI Hackathon/AER---Prospect-AI/aer-prototype"
# 1. Build
npm run build

# 2. Install gh-pages
npm install -D gh-pages

# 3. Add to package.json scripts:
#    "deploy": "gh-pages -d dist"
# Then:
npm run deploy
```

URL: `https://<your-github-username>.github.io/aer-prospect-ai/`

---

## Option D — Netlify Drop (Fastest no-account option)

```bash
npm run build
```
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `dist/` folder into the browser
3. Done — you get a URL like `https://random-name-12345.netlify.app`

---

## After Deployment: Update the README

Replace the placeholder URL in `README.md`:
```
https://aer-prospect-ai.vercel.app
```
with your actual deployed URL.

---

## Custom Domain (Optional, Free on Vercel)

If you have a domain (even a free one from Freenom):
1. Go to Vercel project settings → Domains
2. Add your domain
3. Update DNS records as instructed

---

## Environment Variables

This prototype requires **zero environment variables** — all logic runs client-side. No API keys, no backend, no database. Scores are computed in the browser from the TypeScript engine.

This is a deliberate architectural choice for the hackathon prototype — the production AWS version would use Lambda + DynamoDB, but the prototype is 100% self-contained.

---

## Build Verification

Before deploying, verify the build locally:
```bash
cd aer-prototype
npm run build
npm run preview
# Opens at http://localhost:4173
```

If the preview works, Vercel deployment will work identically.

---

## Sharing with Judges

Send judges this URL structure:
- **Home (Officer Cockpit):** `https://your-url.vercel.app/`
- **Prospect Detail:** Click any green row in the cockpit
- **Benchmarks:** `https://your-url.vercel.app/benchmarks`
- **Import Data:** `https://your-url.vercel.app/import`

---

*AER — Prospect Assist AI · IDBI Innovate 2026*
