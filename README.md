# Claude Code Prompt — DenAI MVP

---

## ⚠️ PLANNING MODE: READ THIS FIRST

Before writing a single line of code or creating any files, enter full planning mode. Ask me the following questions one section at a time and wait for my answers before proceeding:

**Section 1 — Aesthetics**
1. What primary color should anchor the brand? (e.g. deep navy, teal, slate blue, white-dominant)
2. Should the typography feel more clinical/technical (e.g. Inter, DM Sans) or more approachable/warm (e.g. Lato, Nunito)?
3. Should UI components lean toward rounded/soft cards or sharp/structured layouts?
4. Any reference sites or products whose design you admire? (e.g. Stripe, Linear, Oscar Health, Hims)

**Section 2 — Functionality & Flow**
5. On the appeal letter demo flow: should the user type/paste denial text, upload a mock file, or both?
6. Should the "generated appeal letter" output be a static mock result or simulate a loading/processing step before revealing?
7. Should user type switching (Employee / HR Admin / Provider) live in a top nav toggle, a landing page section, or a dedicated "Who it's for" selector?
8. Do you want any form of authentication UI (login/signup screens), even if it's purely cosmetic with no backend?
9. Should the pricing page be part of the landing homepage or a separate route?

Do not proceed until all questions above have been answered.

---

## Project Overview

You are building a **functional MVP website** for **DenAI** — an AI-powered insurance denial appeal platform. This is a **demo-quality marketing and product site**, not a live AI system. There is no real AI backend. All AI outputs should be **simulated with realistic, hardcoded or templated mock data** that clearly conveys what the product would theoretically do in production.

The goal is a polished, credible site that could be shown to pilot employers, provider practices, or investors to validate the concept and generate interest.

---

## Brand & Business Context

**DenAI** closes the gap where 80% of insurance denial appeals win, but fewer than 1% of people ever file one. The product automates the creation of personalized, evidence-backed appeal letters in minutes — replacing a process that takes patients and billing staff days.

**Two customer segments:**
- **Employers (500–5,000 employees):** Buy as a benefits tool for their workforce. HR admins manage it; employees use it.
- **Small Provider Practices (1–50 providers):** Billing staff use it to fight claim denials and recover revenue.

**Core value props:**
- Upload a denial letter → get a complete, personalized appeal letter in minutes
- Pre-submission fact-check to prevent denials before they happen
- Plain-English insurance Q&A (Phase 2, show as "coming soon")
- Data-backed: 80%+ appeal success rate when people actually fight back

---

## Visual Design Direction

- **Style:** Clean, clinical healthcare SaaS — think Oscar Health meets Stripe. White-dominant with structured layouts, precise spacing, and professional data density.
- **Tone:** Confident and trustworthy. This is a tool that fights on your behalf — it should feel powerful but not aggressive.
- **No:** Generic stock photo collages, overly bubbly rounded UI, cheap gradients.
- **Yes:** Subtle data visualizations, clear information hierarchy, badge/stat callouts, deliberate use of accent color.

---

## Tech Stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **No external backend, no database, no real AI calls.** All data is mocked/static.

---

## Site Architecture

Build the following routes. Each route should have its own page file and feel complete — not placeholder-y.

### `/` — Landing Homepage

The primary marketing page. Must include:

1. **Hero Section**
   - Headline: something like *"Fight Back. 80% of Appeals Win. Almost Nobody Files."*
   - Subheadline explaining what DenAI does in 1–2 sentences
   - Two CTAs: "Request Access" (employer) and "Try the Demo" (scrolls to or links to appeal demo)
   - A stat bar with three data points: `19% of in-network claims are denied` / `<1% of patients appeal` / `80%+ win when they do`

2. **How It Works Section** (3-step visual flow)
   - Step 1: Upload your denial letter
   - Step 2: DenAI analyzes the reason, cross-references policy and clinical evidence
   - Step 3: Receive a complete, personalized appeal letter in minutes

3. **Who It's For Section** — Three distinct cards or tabs for:
   - **Employees** — "Your employer covers you. Now let DenAI fight for you."
   - **HR / Benefits Admins** — "Give your team a benefit that actually saves money."
   - **Provider Billing Staff** — "Stop leaving denied claims on the table."
   Each card should show 2–3 bullets of persona-specific value props pulled from the business plan.

4. **Social Proof / Stats Section**
   - Pull from the business plan: $19.7B spent by hospitals fighting denials, 41% of providers hit with 10%+ denial rates, 83.2% of prior auth appeals overturned, etc.
   - Display as a clean stat grid or alternating highlight blocks.

5. **Pricing Preview Section** — Three tiers, employer-focused:
   - Starter (500–1,000 employees): Denial appeal engine + pre-submission fact-check
   - Growth (1,000–3,000 employees): Adds insurance Q&A + benefits maximization
   - Enterprise (3,000–5,000+): Full suite + HR analytics dashboard
   - Add a note: "Provider practice plans also available — see all plans."
   - All pricing is "Contact for pricing" — no numbers.

6. **Footer**
   - Logo, tagline, nav links, legal disclaimer: *"DenAI provides decision support and document generation, not legal or medical advice."*

---

### `/demo` — Appeal Letter Demo Flow

This is the core product simulation. It should feel like a real product screen, not a marketing page.

**Layout:** Split-panel or stepped wizard UI. Clean, app-like chrome (sidebar or top nav with DenAI logo and a "← Back to Home" link).

**The flow has three steps:**

**Step 1 — Input**
- A text area where the user can paste a mock denial letter (pre-populate with a realistic example denial from e.g. "BlueCross BlueShield" citing "not medically necessary" for an MRI)
- Optional: a file upload dropzone labeled "Or upload your denial letter (PDF)" — purely cosmetic, no actual parsing
- A secondary text area: "Any additional context? (optional)" — e.g. doctor's notes, prior authorization numbers
- A prominent "Analyze & Generate Appeal →" button

**Step 2 — Processing (Simulated)**
- A loading screen with a multi-step progress indicator that animates through:
  - "Reading denial reason..." ✓
  - "Cross-referencing policy terms..." ✓
  - "Pulling relevant clinical evidence..." ✓
  - "Drafting personalized appeal letter..." ✓
- This should take ~3 seconds total with staggered animations, then auto-advance.

**Step 3 — Output**
- Display a full mock appeal letter in a styled document viewer panel. The letter should:
  - Be addressed to the correct insurer (pulled from the mock input)
  - Reference the specific denial reason
  - Cite 2–3 relevant medical standards or policy terms (use realistic but generic references like "AMA CPT guidelines" or "CMS LCD L33935")
  - Include a professional closing requesting reconsideration within 30 days
- Below the letter, show a confidence badge: e.g. *"Appeal Strength: Strong — similar cases overturned 83% of the time"*
- Action buttons: "Copy Letter", "Download as PDF" (cosmetic — just show a toast notification), "Start New Appeal"

---

### `/dashboard` — (Stub / Preview Page)

A locked/preview page that shows what the HR Admin or Provider dashboard would look like. Show a realistic-looking dashboard screenshot or wireframe-style UI with:
- Summary stats: Appeals Filed, Success Rate, Est. Savings Recovered, Pending Appeals
- A table of recent appeals (mock data: patient initials, insurer, denial reason, status — Won/Pending/In Review)
- A "Request Full Access" CTA overlay or banner

This page is intentionally gated — it exists to show investors and pilots what's coming.

---

### `/pricing` — Full Pricing Page

Expand on the landing page pricing preview. Include both:
- **Employer tiers** (Starter / Growth / Enterprise) with feature comparison table
- **Provider Practice tiers** (Solo/Small / Mid Practice / Large Practice) with feature comparison table
- A "Success-Based" callout for the bill error detection feature (Phase 3, coming soon)
- All tiers end with "Contact Us" or "Request a Demo" — no hard prices

---

## Global Requirements

- **Responsive:** Must work cleanly on mobile, tablet, and desktop.
- **Navigation:** Persistent top nav with: Logo, "How It Works", "Who It's For", "Pricing", "Demo" (highlighted as primary CTA button)
- **No broken links.** Every nav item and CTA must route somewhere — even if it's a stub page or scrolls to a section.
- **Realistic mock data throughout.** Insurer names, denial codes, dollar amounts, and appeal letters should all feel authentic — not lorem ipsum.
- **Disclaimers:** Include the legal disclaimer on any page that shows appeal letter content: *"DenAI generates decision support documents, not legal advice. Always consult a licensed professional for legal matters."*
- **Accessibility:** Proper semantic HTML, ARIA labels on interactive elements, sufficient color contrast.

---

## What This Is NOT

- Do not build a real AI integration or make API calls to any LLM.
- Do not build a real authentication system or database.
- Do not build a real file parser — file upload is cosmetic only.
- Do not use lorem ipsum anywhere on the site.
- Do not build a mobile app — web only.

---

## Final Reminder

Begin in **planning mode**. Ask all aesthetic and functionality questions listed at the top before writing any code. Once I've answered, confirm your full plan in a brief outline, then begin building.