# Website Collection

This directory contains five independent website projects. Each website is in
its own folder and has its own `package.json`, development server, and build
script.

## Websites

### 1. Flow

- **Folder:** `butter/`
- **Website name:** Flow
- **Vercel:** https://butter-topaz.vercel.app
- **What it is about:** A CRM and customer-relationship workspace that keeps
  customer context, conversations, follow-ups, tasks, and next steps together
  in one place.
- **Notable features:** Product overview, customer-work use cases, workflow
  templates, testimonials, FAQ, responsive navigation, and signup calls to
  action.

### 2. FORMA

- **Folder:** `forma/`
- **Website name:** FORMA
- **Vercel:** https://forma-seven-sable.vercel.app
- **What it is about:** An architectural studio concept focused on thoughtful
  homes, natural materials, quieter living, and spaces shaped around everyday
  life.
- **Notable features:** Architectural project studies, material palettes, an
  interactive Material Atelier, design approach/process sections, project
  dialogs, and a locally generated project brief.

### 3. Auralis

- **Folder:** `auralia/`
- **Website name:** Auralis
- **Vercel:** https://auralia-tau.vercel.app
- **What it is about:** A premium product launch and ecommerce-style website
  for wireless headphones. It presents high-resolution audio, active noise
  cancellation, spatial audio, product specifications, selected product work,
  customer reviews, product editions, and pricing.
- **Notable features:** Animated product presentation, responsive navigation,
  feature and review sections, pricing selection, order dialog, privacy policy,
  and terms of service pages.

### 4. Sitecraft

- **Folder:** `webmaker/`
- **Website name:** Sitecraft
- **Vercel:** https://sitecraft-topaz.vercel.app
- **What it is about:** A storefront for browsing and selecting ready-made
  website packages for businesses, portfolios, and ecommerce stores.
- **Notable features:** Package filtering and sorting, package detail dialogs,
  cart state saved in local storage, sample pricing, downloadable order briefs,
  FAQs, and responsive navigation.

### 5. Nexora

- **Folder:** `growth/`
- **Website name:** Nexora
- **Vercel:** https://nexora-nu-khaki-88.vercel.app
- **What it is about:** An SEO growth intelligence product that turns search
  data into practical actions. It helps users compare competitors, identify
  keyword gaps, analyze backlink profiles, and prioritize ranking opportunities.
- **Notable features:** SEO product hero, backlink profile analysis, shared
  keyword comparison, ranking opportunity insights, FAQ, domain analysis CTA,
  and responsive navigation.

## Running a website

Run commands from the website's folder:

```bash
npm install
npm run dev
```

To create a production build, run:

```bash
npm run build
```

## Deploying to Vercel

Create one Vercel project per website folder and set that folder as the
project's **Root Directory**. Each folder includes its own `vercel.json`.

- Static Vite sites deploy from `dist`: `butter`, `forma`, `growth`, and
  `webmaker`.
- `auralia` uses TanStack Start with Nitro's Vercel preset and deploys its
  generated server function and static assets from `.vercel/output`.

Vercel can use the default install and build settings. The usual deployment
flow is:

```bash
cd <website-folder>
vercel
```
