# HEIC Local

Convert HEIC / HEIF photos to JPG or PNG **in the browser**. Files never leave the device. No signup, no watermark, no daily quota.

**Live path (after Vercel):** deploy this repo → set env from `.env.example` → keep `VITE_ADSENSE_LIVE=false` until AdSense Site Ready.

## Use

1. Drop `.heic` / `.heif` photos, or tap **Choose photos**.
2. Pick JPG or PNG (JPEG quality slider for JPG).
3. Convert, then download one file or a ZIP.

Safari on iPhone often decodes HEIC natively. Other browsers fall back to a local WebAssembly decoder.

## Day 0 / AdSense readiness

- `public/ads.txt` — publisher `pub-7636435144500691`
- `/privacy` `/terms` `/about` — required for review
- Ad slots (framework 97): `mid` · `after-success` · `footer` — never covering Convert/Download
- Soft agency CTA is **not** an ad
- Env: see `.env.example` (`VITE_ADSENSE_LIVE=false` until Ready)

## Run locally

```bash
npm install
cp .env.example .env   # optional
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Sign-in (Google / X) is optional and never required to convert.

## Notes

- Conversion is 100% client-side (`heic-to` + native `createImageBitmap` when available).
- Soft memory guards: ~40 MB per photo, 50 files, 200 MB per batch.
- SEO: expanded FAQ (10), WebApplication + FAQPage schema, on-page primary keywords.
