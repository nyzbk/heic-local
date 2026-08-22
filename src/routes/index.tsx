import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/converter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AdUnit } from "@/components/ad-unit";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      {
        title: "Free HEIC to JPG Converter — No Upload, No Signup, No Watermark | HEIC Local",
      },
      {
        name: "description",
        content:
          "Convert HEIC to JPG or PNG free in your browser. Private (no upload), unlimited, works on iPhone Safari. Batch + ZIP. No watermark, no daily limit.",
      },
      { name: "keywords", content: "heic to jpg, convert heic to jpg, heic converter free, heic to png, iphone heic converter, private heic converter" },
      { property: "og:title", content: "Free HEIC to JPG Converter — No Upload | HEIC Local" },
      {
        property: "og:description",
        content: "Convert HEIC photos to JPG/PNG in the browser. Files never leave your device.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              name: "HEIC Local",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              description:
                "Free browser-based HEIC to JPG/PNG converter. Files stay on your device. No signup, no watermark.",
              featureList: [
                "Client-side conversion",
                "No upload",
                "Batch convert",
                "ZIP download",
                "JPG and PNG output",
                "Works on iPhone Safari",
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Are my photos uploaded to a server?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Conversion happens entirely in this browser tab. Your HEIC files never leave your device.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a daily limit or watermark?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No daily quota and no watermark. Soft browser-memory guards apply: about 40 MB per photo, 50 files, 200 MB per batch.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does HEIC Local work on iPhone Safari?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. Safari can often decode HEIC natively; if not, a WebAssembly decoder runs locally on the phone.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to create an account?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Sign-in is optional and never required to convert or download.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between HEIC and JPG?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "HEIC is Apple’s efficient photo format (smaller files, more detail). JPG is widely compatible. Converting HEIC to JPG makes photos easy to share and open on any device.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

const STEPS = [
  {
    n: "01",
    title: "Drop HEIC photos",
    body: "Choose from your camera roll or drop a batch. Nothing is uploaded to any server.",
  },
  {
    n: "02",
    title: "Convert in this tab",
    body: "JPG or PNG, with quality you control. Decoding stays on this device.",
  },
  {
    n: "03",
    title: "Download",
    body: "Grab files one by one or as a ZIP. No watermark, no daily cap.",
  },
];

const FAQ = [
  {
    q: "Are my photos uploaded to a server?",
    a: "No. Conversion happens entirely in this tab. You can confirm it in DevTools: the Network panel stays quiet while files convert.",
  },
  {
    q: "Is there a file size or daily limit?",
    a: "No daily quota and no watermark. Soft browser-memory guards: about 40 MB per photo, 50 files, 200 MB per batch — so phones do not run out of memory.",
  },
  {
    q: "Does it work on iPhone Safari?",
    a: "Yes. Safari can often decode HEIC natively; if not, a WebAssembly decoder runs locally on the phone. Works on modern Chrome, Firefox, Edge too.",
  },
  {
    q: "Do I need to sign up or pay?",
    a: "No. The converter is free, unlimited for normal use, and does not require an account. Sign-in is optional only.",
  },
  {
    q: "Will the JPG have a watermark?",
    a: "No. Output is a clean JPG or PNG. No branding burned into the image.",
  },
  {
    q: "What is HEIC and why convert it?",
    a: "HEIC is Apple’s default photo format on iPhone (efficient storage). Many apps, websites and Windows tools still prefer JPG or PNG. Converting makes sharing and editing easier.",
  },
  {
    q: "Can I convert many photos at once?",
    a: "Yes. Drop a batch, convert, then download one file or a single ZIP of everything that succeeded.",
  },
  {
    q: "Does quality drop when converting to JPG?",
    a: "You control JPEG quality with the slider (default 90%). Higher quality = larger file. PNG is lossless for the decoded pixels.",
  },
  {
    q: "Is the tool offline-capable?",
    a: "After the page and decoder load, conversion itself does not need a network. The initial page load and optional ads do.",
  },
  {
    q: "Why is this free if there are ads?",
    a: "Ads appear only between actions (never covering Convert or Download). That funds the free, private tool so we do not need a paywall or upload-based monetization.",
  },
];

function Home() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8">
        <p className="text-xs font-semibold tracking-[var(--tracking-label)] text-accent uppercase">
          No upload. No signup. No watermark.
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight text-ink sm:text-5xl">
          Free HEIC to JPG converter — private, in your browser
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Convert iPhone HEIC photos to JPG or PNG without uploading them. Files stay on your device. Batch convert,
          quality control, ZIP download — free and unlimited for normal use.
        </p>

        <div className="mt-8 pb-6">
          <Converter />
        </div>

        <AdUnit slot="mid" className="my-8" />

        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="rounded-[var(--radius-md)] bg-surface px-4 py-4 shadow-[var(--shadow-card)]"
            >
              <p className="text-xs font-semibold tracking-[var(--tracking-label)] text-accent uppercase">
                {step.n}
              </p>
              <p className="mt-2 font-display text-base font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <section className="mt-14" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-display text-2xl font-semibold tracking-tight text-ink">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-muted">
            Short answers so you know exactly what happens to your photos.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-display text-base font-semibold text-ink">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
