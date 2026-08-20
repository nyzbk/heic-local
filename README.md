# HEIC Local

Convert HEIC / HEIF photos to JPG or PNG **in the browser**. Files never leave the device. No signup, no watermark, no daily quota.

## Use

1. Drop `.heic` / `.heif` photos, or tap **Choose photos**.
2. Pick JPG or PNG (JPEG quality slider for JPG).
3. Convert, then download one file or a ZIP.

Safari on iPhone often decodes HEIC natively. Other browsers fall back to a local WebAssembly decoder.

## Run locally

```bash
npm install
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
- Ad slots in the UI are placeholders — wire AdSense later, between actions only.
