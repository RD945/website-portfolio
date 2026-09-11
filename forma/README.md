# FORMA — Architecture studio concept

A responsive, photograph-led architecture website built with semantic HTML, CSS, and minimal JavaScript. Run `npm install` then `npm run dev`. `npm run build` creates the production site in `dist`.

## Content and design

### Sythra-inspired atmosphere revision

Reference reviewed: https://www.sythra.ai/. The adapted ideas are the landscape-led opening, warm fields of color, contrasting dark sections, and an interactive preview that leads into the primary action. No Sythra code, illustrations, logos, or copy is reused.

The revised palette is clay and sandstone, forest green, sage, and terracotta. EB Garamond now provides the light regular display voice while DM Sans remains the readable interface face. The photographic project layout remains the foundation. The studio section contains an original lightweight SVG proportion study. The Imagine Your Space section uses a reduced-motion-safe marquee, and the approach section uses an animated scroll progress rail rather than a static card stack. Gradients, scroll-jacking, and heavyweight visual libraries are omitted.

The **Material Atelier** is the signature interaction: choose Earth & light, Forest & warmth, or Stone & stillness to change the reference image, concept copy, and labeled color samples. The action transfers that choice to an editable material-direction field in the inquiry and includes it in the downloadable brief. These are illustrative palettes, not product or physical material specifications. Photographs reuse the existing optimized local assets.

Palette controls use native buttons with `aria-pressed`, visible keyboard focus, touch-sized targets, and live copy updates. Image loading, failure, recovery, and rapid-selection request ordering are handled. Reduced motion removes state transitions. On phones the preview sits above full-width palette controls; desktop displays them alongside one another. Without JavaScript, the initial Earth & light concept and all page content remain readable, with an explicit note explaining the interactive requirement.

Verification after this revision: seven functional tests and three production performance profiles pass. Three cold-cache runs per profile measured LCP at 184–192ms desktop, 376–396ms fast mobile, and 924–944ms simulated slow-4G mobile. There were no third-party resource requests. Desktop and phone screenshots were visually reviewed. Results remain local synthetic measurements; deployment needs its own speed check.

FORMA is a proposed identity, not a verified practice. All three projects are explicitly illustrative architectural studies. No client history, locations, awards, or completed commissions are claimed. Replace the concept identity and studies with approved studio content before a commercial launch.

The visual premise is an annotated architectural folio: ivory paper, charcoal type, muted olive, fine rules, and generous photographic spreads. EB Garamond handles the light regular display voice; DM Sans handles compact captions and readable body text. The EB Garamond Latin subset is self-hosted as an optimized WOFF2 derivative under the SIL Open Font License; the license is included in `public/fonts/OFL.txt`. Photography is downloaded from Unsplash and served locally as optimized WebP visual references; confirm individual image provenance and intended usage before production, and replace with commissioned project photography. Source photo identifiers are recorded in `scripts/prepare-images.mjs`. No testimonials or unsupported statistics are included.

## Functionality

- Responsive navigation, in-page studio/work/process/contact links.
- Native, keyboard-accessible project dialogs and process disclosures.
- Inquiry form with native validation and a locally generated downloadable brief. No backend, email delivery, or data collection is configured.
- Visible focus styles, reduced-motion support, responsive image sources, lazy-loaded secondary photography, and reserved image dimensions.
- Native page links and process disclosures work without JavaScript. Project dialogs, mobile menu, and brief generation require JavaScript.

## Performance and responsive design

No UI framework, icon library, animation package, tracking, or video. Only the hero is eagerly loaded. Desktop uses an asymmetric two-column folio; selected work becomes a vertically paced diagonal sequence, while mobile uses a dedicated portrait image crop, a collapsible menu, visible project affordances, and single-column reading order. CTA hover and press motion, the Imagine Your Space marquee, and the approach progress rail all respect reduced-motion preferences. All fonts and photographs are self-hosted: page rendering and project dialogs make no third-party requests. Phone inputs use 16px text to avoid focus-triggered iOS zoom. Critical image and project controls have at least 44px targets.

Run `npm test` for functional and responsive checks (320–1920px, touch, landscape, form validation, keyboard access, and downloads). Run `npm run test:performance` for production cold-cache measurements and sub-second LCP/load-event budgets. The functional server uses isolated port `5175` by default; set `PLAYWRIGHT_PORT` when another free port is needed. Measurements use Chromium, three fresh contexts per profile, no cache, and the following simulated connections:

- Desktop: 20 Mbps, 20ms latency, normal CPU.
- Mobile fast: 10 Mbps, 40ms latency, 4× CPU slowdown, 2× pixel density.
- Mobile slow 4G: 1.6 Mbps, 150ms latency, 4× CPU slowdown, 2× pixel density.

The optimized local production build measured LCP at 168–172ms desktop, 364–384ms fast mobile, and 732–752ms slow-4G mobile. Load events measured 142–150ms, 348–374ms, and 805–810ms respectively. CLS was 0 in every profile. These are local synthetic results, not a universal loading-time guarantee. The load event excludes lazy-loaded below-the-fold images.

Serve `dist` through an HTTPS CDN with Brotli/gzip enabled. `public/_headers` provides caching rules for Netlify/Cloudflare Pages; configure equivalent headers on other hosts. HTML revalidates, content-hashed assets cache immutably, and image filenames use a shorter cache lifetime. Re-measure against the deployed URL because server response time, distance, device, and bandwidth affect the one-second target. Real-user Core Web Vitals and a screen-reader audit are still needed before release.

To regenerate image derivatives, run `node scripts/prepare-images.mjs` (requires network access; not needed for normal builds).
