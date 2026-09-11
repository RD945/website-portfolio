# Website Collection

This directory contains seven independent website projects. Each website is in
its own folder and has its own `package.json`, development server, and build
script.

## Websites

### 1. Auralis

- **Folder:** `auralia/`
- **Website name:** Auralis
- **What it is about:** A premium product launch and ecommerce-style website
  for wireless headphones. It presents high-resolution audio, active noise
  cancellation, spatial audio, product specifications, selected product work,
  customer reviews, product editions, and pricing.
- **Notable features:** Animated product presentation, responsive navigation,
  feature and review sections, pricing selection, order dialog, privacy policy,
  and terms of service pages.

### 2. Flow

- **Folder:** `butter/`
- **Website name:** Flow
- **What it is about:** A CRM and customer-relationship workspace that keeps
  customer context, conversations, follow-ups, tasks, and next steps together
  in one place.
- **Notable features:** Product overview, customer-work use cases, workflow
  templates, testimonials, FAQ, responsive navigation, and signup calls to
  action.

### 3. Framehouse Films

- **Folder:** `design_studio/`
- **Website name:** Framehouse Films
- **What it is about:** A film production house for commercial films, narrative
  films, music videos, documentaries, and post-production work.
- **Notable features:** Selected film portfolio, expandable service list, crew
  profiles, responsive navigation, reveal animations, and a contact CTA.

### 4. FORMA

- **Folder:** `forma/`
- **Website name:** FORMA
- **What it is about:** An architectural studio concept focused on thoughtful
  homes, natural materials, quieter living, and spaces shaped around everyday
  life.
- **Notable features:** Architectural project studies, material palettes, an
  interactive Material Atelier, design approach/process sections, project
  dialogs, and a locally generated project brief.
- **Important note:** FORMA is explicitly a concept identity. The projects and
  photography are illustrative and should be replaced with approved commercial
  content before launch.

### 5. Nexora

- **Folder:** `growth/`
- **Website name:** Nexora
- **What it is about:** An SEO growth intelligence product that turns search
  data into practical actions. It helps users compare competitors, identify
  keyword gaps, analyze backlink profiles, and prioritize ranking opportunities.
- **Notable features:** SEO product hero, backlink profile analysis, shared
  keyword comparison, ranking opportunity insights, FAQ, domain analysis CTA,
  and responsive navigation.

### 6. Experience Welcome

- **Folder:** `portfolio/`
- **Website name:** Experience Welcome / Welcome
- **What it is about:** A marketing website for Welcome, a webinar platform for
  marketers who want to host engaging virtual experiences that drive revenue.
- **Notable features:** Interactive overlays, polls, Q&A, chat, HD video,
  Welcome Studio tools, integrations, customer stories, performance metrics,
  articles, events, newsletter signup, and demo CTAs.

### 7. Sitecraft

- **Folder:** `webmaker/`
- **Website name:** Sitecraft
- **What it is about:** A storefront for browsing and selecting ready-made
  website packages for businesses, portfolios, and ecommerce stores.
- **Notable features:** Package filtering and sorting, package detail dialogs,
  cart state saved in local storage, sample pricing, downloadable order briefs,
  FAQs, and responsive navigation.
- **Important note:** Sitecraft is a storefront preview. It does not process
  payments or submit live orders; prices and package scope are samples.

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

- Static Vite sites deploy from `dist`: `butter`, `design_studio`, `forma`,
  `growth`, `portfolio`, and `webmaker`.
- `auralia` uses TanStack Start with Nitro's Vercel preset and deploys its
  generated server function and static assets from `.vercel/output`.

Vercel can use the default install and build settings. The usual deployment
flow is:

```bash
cd <website-folder>
vercel
```
