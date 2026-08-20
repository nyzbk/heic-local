import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/converter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

const STEPS = [
  {
    n: "01",
    title: "Drop HEIC photos",
    body: "Choose from your camera roll or drop a batch. Nothing is uploaded.",
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
          Convert HEIC photos to JPG or PNG in this browser.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          iPhone photos stay on your device. Convert one file or a whole camera
          roll, then download — nothing is sent to a server.
        </p>

        <div className="mt-8 pb-10">
          <Converter />
        </div>

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
      </main>
      <SiteFooter />
    </div>
  );
}
