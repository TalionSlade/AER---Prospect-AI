# AER — Prospect Assist AI
### IDBI Innovate 2026 · Track 2 · Team Expeditioners

> **Live Demo:** [https://aer-prospect-ai.vercel.app](https://aer-prospect-ai.vercel.app)  
> **GitHub:** [https://github.com/TalionSlade/AER---Prospect-AI](https://github.com/TalionSlade/AER---Prospect-AI)

---

## What is AER?

AER (**Assess · Engage · Recommend**) is an AI-powered Loan Officer Co-Pilot that replaces blind cold-calling with precision-targeted, intent-driven lead prioritisation for IDBI Bank.

**The Problem:** Loan officers call ~100 random leads to close just 1 loan — a 99% waste of effort.

**The Solution:** AER scores every prospect on two independent axes:
1. **Repayment Capacity** — Can they actually afford the loan? (transaction behavioural analysis)
2. **Genuine Intent** — Are they actively ready to buy? (digital footprint + decay clock)

Only prospects high on **both** axes surface in the officer's *Convert-Now* queue. The result: **3.1× conversion lift** with 73% fewer calls.

---

## Key Features

| Feature | Description |
|---|---|
| **11-Agent Scoring Pipeline** | Income, Cashflow, Fraud, Intent, Capacity, Affordability, SHAP, Recommendation, Script agents |
| **2×2 Quadrant Dashboard** | Live scatter plot of all prospects colour-coded by RAG status |
| **Intent Decay Clock** | Half-life countdown (8d/14d/21d) prevents stale signals from misdirecting officers |
| **Explainable AI (SHAP)** | Waterfall bars show exactly why each score was given — RBI audit ready |
| **AI Call Script** | Personalised opening for each prospect, generated at scoring time |
| **Human-in-the-Loop** | Officer always Approves / Snoozes / Rejects — no automated lending decision |
| **CSV Import** | Drag-and-drop with live validation and 8-row preview |
| **Benchmark Dashboard** | Confusion matrix, Precision/Recall/F1, Conversion Lift — fully reproducible |

---

## Application Pages

| Page | URL | Description |
|---|---|---|
| Officer Cockpit | `/` | Main dashboard — quadrant scatter + priority queue |
| Prospect Detail | `/prospect/:id` | Deep-dive — SHAP waterfall, affordability gauge, call script, decision |
| Model Benchmarks | `/benchmarks` | Live benchmark metrics with confusion matrix |
| Import Data | `/import` | CSV upload with template download |

---

## Architecture Overview

```
Data Sources          AI Pipeline (AWS)              Serving
─────────────         ─────────────────              ──────
CBS Transactions  →   Step Functions (11 Agents)  →  DynamoDB (Officer Queue)
Digital Footprint →   ├─ Income Agent              →  Aurora (Audit Trail)
CBS/CRM Records   →   ├─ Cashflow Agent            →  Cognito (Auth)
                      ├─ Fraud Agent               →  CloudFront (CDN)
                      ├─ Intent Agent
                      ├─ Capacity Agent
                      ├─ Affordability Agent
                      ├─ Explainability (SHAP)
                      └─ Bedrock Claude 3.5 Sonnet (Call Script)
```

---

## Quick Start (Local Development)

```bash
# Clone the repo
git clone https://github.com/TalionSlade/AER---Prospect-AI.git
cd AER---Prospect-AI

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build
```

**Requirements:** Node.js 18+ (no other dependencies — fully client-side)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 8, Recharts, TailwindCSS v3 |
| Routing | React Router v7 |
| Fonts | Montserrat (IDBI official font) |
| Deployment | Vercel (free tier, serverless edge) |
| AWS Production | Step Functions, Lambda, DynamoDB, Aurora, Bedrock, Kinesis, S3 |
| AI/GenAI | Amazon Bedrock Claude 3.5 Sonnet, XGBoost/SageMaker (Phase 3) |
| Compliance | DPDP 2023, RBI AI Framework, S3 Object Lock (7-year WORM) |

---

## Performance Benchmarks

| Metric | Value |
|---|---|
| Capacity Classifier Accuracy | 91.7% |
| Capacity Precision | 96.7% |
| Intent Classifier Accuracy | 95.0% |
| Intent Recall | 100.0% |
| **Conversion Lift** | **3.1×** |
| Officer Call Reduction | ~73% |

*All numbers use fixed seed 2026 — reload the app and nothing changes.*

---

## Repository Structure

```
AER---Prospect-AI/
├── src/
│   ├── engine/          # 11-agent scoring engine (score.ts, benchmark.ts)
│   ├── pages/           # Cockpit, ProspectDetail, Benchmarks, ImportData
│   ├── components/      # BrandHeader, ui.tsx (shared primitives)
│   ├── data/            # types.ts, prospects.ts, csvImport.ts
│   ├── state/           # Zustand store
│   └── lib/             # format.ts utilities
├── docs/
│   ├── Expeditioners_AER_Submission_Final.pptx   # Submission deck
│   ├── SCORING_METHODOLOGY.md                    # Engine math reference
│   └── DEPLOYMENT.md                             # Deployment guide
├── public/              # Static assets
├── vercel.json          # Vercel routing config
└── README.md
```

---

## Submission Details

| | |
|---|---|
| **Team Name** | Expeditioners |
| **Team Leader** | Prema Sai |
| **Problem Statement** | 2 — Prospect Assist AI |
| **Live URL** | https://aer-prospect-ai.vercel.app |

---

*AER — Prospect Assist AI · IDBI Innovate 2026 · Built with ❤️ by Team Expeditioners*
