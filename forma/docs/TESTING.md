# FORMA Testing Guide

This document describes the automated responsive, interaction, and cold-load performance checks for FORMA. It records the exact commands, test coverage, simulated device conditions, pass criteria, artifacts, and troubleshooting steps used to verify the site.

## Quick Commands

Install project dependencies:

```bash
npm install
```

Create and validate the production build:

```bash
npm run build
```

Run the functional and responsive browser suite:

```bash
npm test
```

Run the cold-cache performance suite:

```bash
npm run test:performance
```

The functional suite excludes `performance.spec.js`. The performance command explicitly selects only the performance test file through `playwright.performance.config.js`.

## Requirements

- Node.js and npm
- Project dependencies installed with `npm install`
- Playwright Chromium installed locally
- A clean or controlled local port for the Vite test server

If Chromium is not installed, run:

```bash
npx playwright install chromium
```

## Functional Test Configuration

The default functional configuration is `playwright.config.js`:

```js
import { defineConfig } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT || 5175);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  testIgnore: 'performance.spec.js',
  use: {
    baseURL,
    headless: true,
  },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
  },
  reporter: 'list',
});
```

The test runner starts an isolated Vite development server on port `5175` by default and uses that address as the base URL. Set `PLAYWRIGHT_PORT` to use another free port. Existing servers are not reused, which prevents a different local project from being tested accidentally.

## Functional Coverage

The functional tests are in `tests/site.spec.js`.

### Project exploration and inquiry

The test opens the hero project dialog for The Courtyard House, verifies the dialog heading, closes it with the Escape key, opens the inquiry flow, fills the form, submits it, and verifies the downloaded filename and success status.

The test verifies:

- Project dialog opening through the visible project action
- Dialog close behavior through Escape
- Inquiry form labels and native form interaction
- Local project brief generation
- Download filename `forma-project-brief.txt`
- Success status text

### Responsive composition and mobile navigation

The page is loaded at each of these viewport widths:

```text
320, 360, 390, 768, 1024, 1440, 1920 pixels
```

At each width, the test verifies that the document does not create horizontal overflow and that the primary heading remains visible. At `390px`, it opens the mobile menu, verifies `aria-expanded="true"`, activates Selected Work, verifies that the menu closes, and checks that the URL ends in `#work`.

### Keyboard baseline, image loading, and process content

The test begins with keyboard focus on the skip link, activates it, verifies the `#main` destination, checks that the hero image is visible and decoded, and exercises the second approach step. Page errors, failed requests, and error responses are collected and the test fails if the browser reports any of them.

### Desktop and mobile visual captures

The visual capture test uses a `1440px` desktop viewport and a `390px` mobile viewport. Before capturing, it waits for fonts and decodes the hero, project, and Material Atelier images, including the mobile hero after the viewport changes. The resulting artifacts are written to:

```text
test-results/desktop.png
test-results/mobile.png
```

These screenshots are review artifacts rather than pixel-diff assertions. They should be inspected after substantial layout, typography, image, or animation changes.

### Material Atelier selection and inquiry brief

The test selects Forest & warmth and verifies:

- The selected palette button has `aria-pressed="true"`
- The palette heading updates
- The swatch name updates to Walnut
- The image source changes to `/images/stillwater-800.webp`
- The inquiry form receives Forest & warmth as its editable material direction
- The generated brief contains the selected direction
- Keyboard activation also works for Stone & stillness

### Material image failure and touch recovery

The test runs at `390px` with touch enabled and deliberately aborts the Stillwater image request. It verifies that the failure message appears, that the visitor can recover by selecting Earth & light, that the loading state clears, that the palette can still open the inquiry form, and that the page remains free of horizontal overflow.

### Phone touch targets, validation, and landscape

The test runs with a `390px` touch viewport, device scale factor `2`, and reduced motion enabled. It verifies:

- The mobile hero selects `hero-mobile-800.webp`
- The hero project control is at least `44px` wide and tall
- The inquiry dialog opens through touch
- Form inputs remain `16px` to avoid mobile browser zoom
- Native required-field validation remains active
- The page does not overflow at `844px` wide in phone landscape mode
- The inquiry dialog can close through touch

## Performance Configuration

The cold-load configuration is `playwright.performance.config.js`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'performance.spec.js',
  timeout: 120000,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4173',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
  reporter: 'list',
});
```

The performance suite builds the production site first, serves the resulting `dist` directory through Vite preview, and always starts a fresh preview server. It does not measure the development server.

## Performance Profiles

The profiles are defined in `tests/performance.spec.js`.

### Desktop fast

```text
Viewport: 1440 x 1000
Network latency: 20ms
Download throughput: 20 Mbps
CPU slowdown: 1x
Device scale factor: 1
```

### Mobile fast

```text
Viewport: 390 x 844
Network latency: 40ms
Download throughput: 10 Mbps
CPU slowdown: 4x
Device scale factor: 2
```

### Mobile slow 4G

```text
Viewport: 390 x 844
Network latency: 150ms
Download throughput: 1.6 Mbps
CPU slowdown: 4x
Device scale factor: 2
```

## Performance Method

Each profile runs three times. Every run creates a new browser context, disables the browser cache through the Chrome DevTools Protocol, applies the network profile, and applies CPU throttling.

The test observes Largest Contentful Paint through the `largest-contentful-paint` PerformanceObserver. It also observes Cumulative Layout Shift and reads the navigation load event timing. After the hero image is decoded and fonts are ready, the test waits briefly before collecting metrics.

The following values are collected for every run:

- LCP in milliseconds
- CLS as a rounded decimal
- Load event end in milliseconds
- Total transferred resource size in kilobytes
- Count of resources loaded from outside the local origin

The performance run also fails on failed requests or HTTP error responses, so a passing budget cannot hide a broken local asset.

## Performance Pass Criteria

Every individual run must satisfy all of these assertions:

```text
CLS < 0.1
External resource count = 0
LCP < 1000ms
Load event < 1000ms
```

The sub-one-second result is a controlled synthetic budget. It is not a guarantee for every deployed server, device, connection, cache state, or geographic location. Deployment verification should use field data and real-user Core Web Vitals in addition to this local suite.

## Optimization Implementation Record

This section records the concrete loading and mobile UI work that supports the budgets above. These are implementation details, not assumptions about a production CDN or real-user network conditions.

### Font loading

- Removed the unused Italiana package and replaced the display face with regular-weight EB Garamond.
- Kept DM Sans for body copy, controls, labels, form fields, and utility text.
- Added `@fontsource/eb-garamond` as the source package and retained its SIL Open Font License.
- Generated `public/fonts/eb-garamond-latin-subset.woff2` from the Fontsource Latin file.
- Reduced the display subset to ASCII plus the punctuation used by the page, including curly quotes, em dash, en dash, ellipsis, copyright, registered-mark, middle-dot, and multiplication characters.
- The final subset is approximately 16 KB instead of shipping the complete Latin font file.
- Added the license copy at `public/fonts/OFL.txt`.
- Set EB Garamond to `font-display: optional` so a slow connection does not delay or late-swap the hero's largest contentful text.
- Removed the EB Garamond preload hint after performance runs showed that preloading it competed with the hero image on slow 4G.
- Kept the DM Sans regular file preloaded because it is used throughout the initial interface and form controls.
- The font fallback chain remains `EB Garamond, Georgia, serif`, so the heading remains stable if the optional display font is not available immediately.
- Added a short stale-while-revalidate cache policy for the self-hosted font in `public/_headers`.

Relevant files:

```text
src/tokens.css
index.html
package.json
package-lock.json
public/fonts/eb-garamond-latin-subset.woff2
public/fonts/OFL.txt
public/_headers
```

### Image loading and transfer control

- All production images are served locally from `public/images`; the page does not request Unsplash or another remote image host at runtime.
- The hero uses a `<picture>` element with a dedicated mobile crop.
- Desktop hero candidates are `640w`, `960w`, `1440w`, and `1920w` WebP derivatives.
- Mobile hero candidates are `480w` and `800w` WebP derivatives.
- Project and Material Atelier images use `480w`, `800w`, and `1200w` WebP candidates.
- `srcset` and `sizes` allow the browser to choose an image close to the rendered width instead of always downloading the largest file.
- The hero image uses `fetchpriority="high"` because it is the primary LCP candidate.
- The hero reserves space with explicit `width` and `height` attributes to avoid layout shift while the image loads.
- Project and Material Atelier images use `loading="lazy"` and `decoding="async"` because they are below the fold.
- Image derivatives are generated by `scripts/prepare-images.mjs` with Sharp and served as WebP.
- The Material Atelier waits for `image.decode()` before clearing its loading state, handles failed images, and preserves palette and inquiry functionality when a photo cannot load.
- Palette selection uses request ordering so a slower previous image response cannot overwrite a newer selection.

Relevant files:

```text
index.html
src/atelier.js
scripts/prepare-images.mjs
public/images/*
```

### JavaScript and CSS loading safeguards

- The site uses no UI framework, animation package, icon library, video, tracking script, or third-party runtime request.
- The initial page is useful without JavaScript: navigation links, content, the initial palette, and the process copy remain present in the HTML.
- JavaScript enhances the mobile menu, project dialogs, Material Atelier selection, inquiry brief download, and approach progress rail.
- The approach rail uses `IntersectionObserver` to update the active step and progress value instead of a continuous scroll handler.
- The marquee is CSS-based and does not require a runtime animation library.
- CTA motion uses short CSS transitions for hover lift, press settle, and shadow changes.
- `prefers-reduced-motion: reduce` disables marquee movement, process transitions, rail transitions, and CTA transitions.
- Image dimensions and reserved layout frames are kept in place so lazy loading does not move later sections.

Relevant files:

```text
src/main.js
src/atelier.js
src/style.css
src/responsive.css
src/atmosphere.css
src/forma-revision.css
```

### Mobile UI implementation

- The responsive test set explicitly includes `320px`, `360px`, `390px`, `768px`, `1024px`, `1440px`, and `1920px` widths.
- At widths below `700px`, navigation becomes a native button-controlled menu with a visible expanded state and Escape handling.
- The hero switches to the portrait mobile image source and recomposes the supporting copy and action vertically.
- Text inputs, selects, and textareas use `16px` font size on mobile to prevent iOS focus zoom.
- Hero image actions, project title buttons, image controls, text links, and footer actions retain approximately `44px` minimum touch height where practical.
- The Selected Work grid becomes one column on mobile, while desktop keeps the three studies in a diagonal vertical sequence.
- The mobile project `Explore study` action is positioned inside the image with a `12px` bottom and right inset, a higher stacking order, and no hover transform so it cannot be clipped by the image edge.
- The Material Atelier stacks the image above full-width palette controls on phones.
- The palette controls preserve `aria-pressed` selection state and remain usable by touch and keyboard.
- The approach progress rail moves into a left gutter on mobile so its line and dots never pass through the process headings or descriptions.
- Phone landscape is explicitly tested at `844px` wide by `390px` high for overflow and dialog behavior.
- Dialogs remain native `<dialog>` elements and are tested through keyboard, mouse, and touch flows.
- Mobile screenshots are captured after fonts and relevant images are ready so visual review does not mistake an unloaded state for the final layout.

Relevant files:

```text
src/responsive.css
src/atmosphere.css
src/forma-revision.css
tests/site.spec.js
```

## What The Suite Protects

The tests collectively protect the following FORMA behaviors:

- Local font and image loading with no third-party requests
- Fast hero rendering on desktop and mobile
- No layout shift beyond the configured CLS budget
- No horizontal overflow at the tested widths
- Responsive recomposition rather than a desktop-only layout
- Keyboard access to skip navigation, dialogs, forms, and controls
- Touch-sized project and inquiry actions
- Native form validation and local brief download behavior
- Material Atelier selection, loading, failure, and recovery states
- Mobile navigation open and close behavior
- Reduced-motion compatibility for the process rail and marquee
- Project screenshot composition at representative wide and narrow widths

## Port Conflict Troubleshooting

The functional configuration uses the isolated port `5175` by default. If another process is already listening there, the test server cannot start. A page snapshot showing another brand is a test-environment problem, not a FORMA assertion failure.

Check the process listening on Windows PowerShell:

```powershell
$connections = Get-NetTCPConnection -LocalPort 5175 -State Listen -ErrorAction SilentlyContinue
$connections | ForEach-Object {
  Get-CimInstance Win32_Process -Filter "ProcessId = $($_.OwningProcess)" |
    Select-Object ProcessId, CommandLine
}
```

If the process is known to be stale and safe to stop, stop only that process. Do not terminate an unrelated user-owned development server without confirming it first.

For an isolated FORMA run on another port, set `PLAYWRIGHT_PORT` for the command. In PowerShell:

```powershell
$env:PLAYWRIGHT_PORT = '5174'
npx playwright test
Remove-Item Env:PLAYWRIGHT_PORT
```

The production performance suite uses port `4173` and always starts a fresh preview server.

## Recommended Verification Order

Run the checks in this order after a significant change:

```bash
npm run build
npm test
npm run test:performance
```

If the functional suite reports missing FORMA elements, resolve the port conflict before diagnosing application code. If only the performance suite fails, inspect the printed LCP, load, transferred kilobytes, external request count, font loading, hero image selection, and layout shift values before changing the performance budget.

## Related Files

```text
playwright.config.js
playwright.performance.config.js
src/main.js
src/atelier.js
src/style.css
src/responsive.css
src/atmosphere.css
src/forma-revision.css
```
