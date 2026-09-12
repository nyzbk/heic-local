import { createFileRoute, Link } from "@tanstack/react-router";
import { Converter } from "@/components/converter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AdUnit } from "@/components/ad-unit";
import { HomeContent } from "@/components/home-content";
import { FAQ_ITEMS } from "@/content/faq";
import { toolHead } from "@/lib/seo";

const HOME_TITLE = "Free HEIC to JPG Converter — No Upload, No Signup, No Watermark | HEIC Local";
const HOME_DESC =
  "Convert iPhone HEIC photos to JPG or PNG in this browser tab. No upload, no signup, no watermark. Works on iPhone Safari and Windows. Batch + ZIP.";
const HOME_STEPS = [
  "Open HEIC Local on the phone or computer that holds the photos.",
  "Drop HEIC stills. Nothing is uploaded to a conversion server.",
  "Pick JPG or PNG. Default JPEG quality is 90.",
  "Download one file or a ZIP. Closing the tab discards the pixels.",
];

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    toolHead({
      title: HOME_TITLE,
      description: HOME_DESC,
      path: "/",
      appName: "HEIC Local",
      faqs: FAQ_ITEMS.slice(0, 4),
      howToName: "How to convert HEIC to JPG in the browser",
      howToSteps: HOME_STEPS,
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
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          HEIC is Apple’s still format (usually HEVC inside). WhatsApp on desktop, Windows without the HEVC pack, and
          many CMS uploaders still want JPEG. This page decodes the still in the tab so you do not hand the roll to a
          cloud form. Full walkthrough on{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            how to convert HEIC
          </Link>
          .
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

        <HomeContent />
      </main>
      <SiteFooter />
    </div>
  );
}
