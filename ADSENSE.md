# AdSense — HEIC Local

Production origin: https://heic-local.vercel.app
Publisher: ca-pub-7636435144500691
ads.txt: google.com, pub-7636435144500691, DIRECT, f08c47fec0942fa0

## Gate C content layer — 8 September 2026

Production origin: https://heic-local.vercel.app
HEAD before layer: e0e25cef27fb9735b62cf721d06072ea38b444a6

What changed
- /contact SSR article (operator refuses photos; no file input)
- /how-to extra: native createImageBitmap vs heic-to WASM, concurrency 1 on phone
- / home-content extra below converter (converter not cut)
- NEW /iphone Safari / Photos / share sheet (not a second HowTo)
- /faq +3 (upload-for-a-second? Safari vs Chrome Windows? email the HEIC?)
- /privacy /terms extra; last updated 8 September 2026
- /login robots noindex,nofollow (not in sitemap)
- sitemap SITE_ORIGIN hardcoded https://heic-local.vercel.app; 11 loc; lastmod 2026-09-08 on changed URLs

What did not change
- src/lib/heic-convert.ts SHA f48538a246fe208e89fabbae7fc429250101b1a8
- src/components/converter.tsx SHA cd7d2caa6d5ed5a53c682c335be625844cfc999d
- src/components/ad-unit.tsx SHA 8c115747375c1b44718edbadd91860aa98ea3cfc
- VITE_ADSENSE_LIVE is not true
- Auto ads OFF
- ads.txt one canon line, no comment
- pagead2 + meta in __root
- No Request review on deploy day
- No Add site
- 7-day pause before owner Request review (187 §7)

Owner after deploy: GSC URL-prefix sitemap Success + Inspection / /how-to /contact /iphone.
Ready ≠ ads.txt Authorized (12170222). LIVE only after Ready of THIS url + real slot IDs.
