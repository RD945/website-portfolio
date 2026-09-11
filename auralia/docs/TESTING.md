# Auralis Testing Guide

This guide records the automated responsive, interaction, and cold-load checks for Auralis.

## Quick Commands

```bash
npm install
npx playwright install chromium
npm run typecheck
npm run build
npm run test:e2e
npm run test:performance
```

`npm run build` runs `npm run prepare:images` first. The image script regenerates the responsive WebP files in `public/images` from the source files in `src/assets`.

## Test Configuration

- `playwright.config.js` runs the functional suite against a fresh Vite server on `127.0.0.1:5175`.
- `playwright.performance.config.js` builds the production output and runs a fresh Wrangler Cloudflare worker on `127.0.0.1:4175`.
- `tests/site.spec.js` contains the functional and responsive checks.
- `tests/performance.spec.js` contains the cold-load metrics suite.
- Chromium is the required browser because the performance suite uses Chrome DevTools Protocol throttling.

## Functional Coverage

The functional suite verifies:

- SSR status, title, content, and skip navigation on `/`, `/privacy`, and `/terms`.
- No browser JavaScript errors during every test.
- No horizontal overflow at 320, 360, 390, 768, 1024, 1440, or 1920 pixels.
- Keyboard skip navigation to `#main-content`.
- Mobile navigation open state, dialog rendering, section navigation, and close behavior.
- Primary hero image decoding, responsive source selection, caption, and alt text.
- Edition radio selection, order dialog content, cancel behavior, confirmation toast, and dynamic plan state.
- Marquee pause/resume state and reduced-motion CSS behavior.
- Portrait touch targets at 390 x 844 and landscape overflow at 844 x 390.
- Desktop and mobile screenshots at 1440 x 1000 and 390 x 844.
- Zero third-party runtime requests. Fonts, images, styles, and scripts must load locally.

Review screenshots are written to:

```text
test-results/desktop.png
test-results/mobile.png
```

They are visual review artifacts, not pixel-diff assertions.

## Performance Profiles

Each profile runs three times with a new browser context, disabled cache, network throttling, and CPU throttling.

### Desktop fast

```text
Viewport: 1440 x 1000
Latency: 20ms
Download: 20 Mbps
CPU slowdown: 1x
Device scale factor: 1
```

### Mobile fast

```text
Viewport: 390 x 844
Latency: 40ms
Download: 10 Mbps
CPU slowdown: 4x
Device scale factor: 2
```

### Mobile slow 4G

```text
Viewport: 390 x 844
Latency: 150ms
Download: 1.6 Mbps
CPU slowdown: 4x
Device scale factor: 2
```

## Collected Metrics

Every run records:

- Largest Contentful Paint.
- Cumulative Layout Shift.
- Navigation load-event end.
- Total transferred resource size.
- External resource count and origins.

Fast desktop and mobile budgets are:

```text
CLS < 0.1
External resource count = 0
LCP < 1000ms
Load event < 1000ms
```

The controlled slow-4G budgets are `CLS < 0.1`, zero external resources, `LCP < 1800ms`, and load event `< 2500ms`. The wider slow-4G budget reflects the complete SSR route payload over a 1.6 Mbps connection; it is not a field-data guarantee.

## Optimization Record

### Fonts

- Archivo and DM Sans are self-hosted through Fontsource.
- Google Fonts preconnects and stylesheet requests were removed.
- Only the weights used by the landing page are loaded: Archivo 300/400 and DM Sans 300/400.
- The fallback stacks remain in `src/styles.css`.

### Images

- Runtime images are local WebP derivatives in `public/images`.
- Hero, feature, work, and dialog images use `srcset`, `sizes`, explicit dimensions, async decoding, and appropriate fetch priority.
- The hero uses high fetch priority; below-fold images use lazy loading and low fetch priority.
- `scripts/prepare-images.mjs` creates 15 derivatives from the source PNG/JPEG assets.

### Interaction and rendering

- The hero heading and primary image are visible on the first render instead of beginning hidden behind an entrance animation.
- A root `data-app-ready` marker makes hydration timing observable to browser tests.
- The native skip link targets a focusable `main` element.
- Mobile navigation uses Radix `SheetTrigger` so opening is not immediately interpreted as an outside click.
- The marquee control provides a 44px touch target.
- Reduced motion disables marquee and CTA movement and shortens dialog transitions.

## Port Troubleshooting

The functional suite owns port `5175` and does not reuse an existing server. The performance suite owns port `4175` and always builds a fresh worker.

If a stale process occupies either port, inspect it before stopping anything:

```powershell
$connections = Get-NetTCPConnection -LocalPort 5175,4175 -State Listen -ErrorAction SilentlyContinue
$connections | ForEach-Object {
  Get-CimInstance Win32_Process -Filter "ProcessId = $($_.OwningProcess)" |
    Select-Object ProcessId, CommandLine
}
```

Do not terminate an unrelated user-owned development server.
