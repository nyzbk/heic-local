import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ITEMS = [
  {
    q: "Do HEIC files leave this device?",
    a: "No. Decode and encode run in this browser tab. Hosting may log that you requested the page. It does not receive the photo bytes for conversion.",
  },
  {
    q: "Do I need an account?",
    a: "No. Sign-in on this site is optional and never blocks Convert or Download.",
  },
  {
    q: "Is there a watermark or daily cap?",
    a: "No watermark. No paid daily cap. Soft memory guards: about 40 MB per photo, 50 files, 200 MB per batch, so a phone tab survives the job.",
  },
  {
    q: "Does it work in iPhone Safari?",
    a: "Yes. Safari often decodes HEIC natively. If it cannot, a WebAssembly decoder runs on the phone. Keep the tab in the foreground until the download starts.",
  },
  {
    q: "JPG or PNG?",
    a: "JPG for chat, email, and sites that only accept JPEG. PNG when you want lossless pixels of the decoded frame. JPG quality defaults to 90 and is adjustable.",
  },
  {
    q: "Will JPEG quality destroy the shot?",
    a: "Any JPEG is lossy. At 90 most phone stills look fine for sharing. If you will edit again, stay high or use PNG. We do not run an extra ‘enhance’ filter.",
  },
  {
    q: "What happens to EXIF and GPS?",
    a: "The tool’s job is pixels. Do not assume every metadata field survives every encoder path. If you must strip GPS before a public post, use a dedicated metadata stripper after you have the JPG.",
  },
  {
    q: "Live Photo and Portrait depth?",
    a: "You get the still. The short Live Photo video is not exported. Portrait depth maps are not a separate file here. Keep the original in Photos if you still need those extras.",
  },
  {
    q: "Why convert if iPhone can already ‘Most Compatible’?",
    a: "Camera setting ‘Most Compatible’ writes JPEG going forward. It does not rewrite the years of HEIC already on the roll. This page is for those files, and for one-off shares, without changing the system default.",
  },
  {
    q: "Can I use it after the first load with the network off?",
    a: "Conversion itself does not need the network once the page and decoder are loaded. The first visit and ads do.",
  },
  {
    q: "Why a vercel.app URL?",
    a: "It is the production host. HTTPS is valid. The converter still runs in your tab. A custom domain is not required for the files to stay local.",
  },
  {
    q: "When do ads show?",
    a: "Placeholders sit between actions (mid / after a successful convert / footer). They never replace the Convert or Download control. Do not click ads as a ‘test’.",
  },
  {
    q: "Who runs this?",
    a: "A brand-marketing agency that ships local-first free tools. Contact: ultaultimatum@gmail.com. Do not email the photos unless asked.",
  },
  {
    q: "The thumbnail is blank or the job stalls.",
    a: "Check the file is a still, not a renamed video. Stay under the size guards. Keep Safari in the foreground. If it is a multi-image HEIF sequence, export the key still from Photos first.",
  },
];

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "HEIC Local FAQ — upload, Safari, Live Photo, quality" },
      {
        name: "description",
        content:
          "Answers for HEIC Local: files stay on device, Safari and WASM decode, Live Photo stills, JPG vs PNG, limits, ads placement.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
});

function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">FAQ</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">HEIC Local questions</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          These answers are about this converter, not about Apple Camera settings in general. For the long walkthrough see{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            how to convert HEIC
          </Link>
          .
        </p>
        <div className="mt-10 space-y-8">
          {ITEMS.map((item) => (
            <section key={item.q}>
              <h2 className="font-display text-base font-semibold text-ink">{item.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
