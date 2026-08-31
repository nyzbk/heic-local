# HEIC Local

**Convert HEIC / HEIF to JPG or PNG in the browser. The file never leaves the device.**

[Use it → https://heic-local.vercel.app](https://heic-local.vercel.app)

No upload. No signup. No watermark. No daily quota. Batch + ZIP.

## Why

iPhone saves photos as HEIC. WhatsApp, Windows, most websites and email still want JPG.

Most online converters upload the photo to a server. This one decodes it in your tab.

## Use

1. Open [heic-local.vercel.app](https://heic-local.vercel.app)
2. Drop `.heic` / `.heif` files, or tap **Choose photos**
3. Pick JPG or PNG
4. Convert, then download one file or a ZIP

Safari on iPhone often decodes HEIC natively. Other browsers use a local WebAssembly decoder.

## What stays on the device

| | |
|---|---|
| Upload to a server | No |
| Account | No |
| Watermark | No |
| Daily limit | No |
| Batch + ZIP | Yes |
| License | MIT |

Soft limits so the tab does not die: ~40 MB per photo, 50 files, 200 MB per batch.

## Run locally

```bash
git clone https://github.com/nyzbk/heic-local.git
cd heic-local
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## How it works

Client-side conversion with `heic-to` and native `createImageBitmap` when the browser can decode HEIC itself.

## Other local tools

- [Folio](https://folio-pdf-toolkit.vercel.app) — split / compress PDF in the browser
- [Nota](https://folio-invoice.vercel.app) — invoice PDF
- [Mark](https://qr-local.vercel.app) — QR codes
- [Fit](https://fit-local-six.vercel.app) — resize / crop
- [Crush](https://crush-local.vercel.app) — compress images

## License

MIT. See `LICENSE`.
