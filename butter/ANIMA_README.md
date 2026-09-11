# Anima Production Export

This project was exported by Anima Production Full Project Exporter v5.0.0.

## Run locally

```bash
npm install
npm run dev
```

Vite may choose another port if 5173 is already in use.

## Production build

```bash
npm run build
```

The production files will be written to:

```
dist/
```

## Tailwind

This export uses the normal production build pipeline:

- Vite
- PostCSS
- Tailwind CSS
- Autoprefixer

There is no browser Tailwind CDN/runtime dependency.

## Assets

Downloaded images, fonts and other static project resources are stored under:

```
public/assets/remote/
```

and are referenced from the application using:

```
/assets/remote/...
```
