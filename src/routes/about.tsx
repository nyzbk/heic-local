import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SoftAgencyCta } from "@/components/soft-agency-cta";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — HEIC Local" },
      {
        name: "description",
        content:
          "HEIC Local is a free, private, in-browser HEIC to JPG/PNG converter. Built by a brand-marketing agency.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-16 pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">About</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">About HEIC Local</h1>

        <section className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <p>
            HEIC Local is a free utility that converts iPhone HEIC photos to JPG or PNG <strong>in the browser</strong>.
          </p>

          <h2 className="font-display text-lg font-semibold pt-2">Why it exists</h2>
          <p className="text-muted">
            Many converters force uploads, watermarks, or signups. This tool keeps files on your device and stays free —
            no daily quota, no paywall.
          </p>

          <h2 className="font-display text-lg font-semibold pt-2">How it works</h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted">
            <li>You choose HEIC/HEIF files in this tab.</li>
            <li>The browser decodes them (native path when available, otherwise local WebAssembly).</li>
            <li>You download JPG/PNG or a ZIP.</li>
          </ol>

          <h2 className="font-display text-lg font-semibold pt-2">Built by</h2>
          <p className="text-muted">
            A brand-marketing agency that also designs $10k websites, brand systems, and web apps. Soft links in the
            footer lead to the portfolio if you need custom work.
          </p>

          <div className="pt-4">
            <SoftAgencyCta variant="footer" />
          </div>

          <h2 className="font-display text-lg font-semibold pt-4">Free Tools</h2>
          <p className="text-muted">
            More free tools may appear under the agency Free Tools section. Same rule: useful, no forced signup, ads only
            between actions.
          </p>
        </section>

        <p className="mt-10 text-sm">
          <Link to="/" className="text-accent underline-offset-2 hover:underline">
            ← Back to converter
          </Link>
        </p>
      </main>
    </div>
  );
}
