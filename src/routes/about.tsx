import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SoftAgencyCta } from "@/components/soft-agency-cta";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About HEIC Local — local-first iPhone photo converter" },
      {
        name: "description",
        content:
          "HEIC Local converts iPhone HEIC stills to JPG or PNG in the browser. No upload for conversion, no watermark, optional account.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4 space-y-4 text-sm leading-relaxed text-muted">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">About</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">About HEIC Local</h1>
        <p className="text-ink">
          HEIC Local is a free utility that turns iPhone HEIC stills into JPG or PNG in this browser tab. It exists
          because the default iPhone format is efficient to store and awkward to hand to software that never learned HEVC
          stills.
        </p>
        <p>
          The job is narrow on purpose. We decode the still you picked. We do not run a cloud gallery, we do not keep
          your roll, we do not sell an “unlimited pro” tier that unlocks the same button. Soft memory guards exist so a
          phone tab survives a batch. They are not a paywall in disguise.
        </p>
        <p>
          What we refuse: required signup before Convert, watermark on the pixels, uploading the file “so our servers can
          do it faster,” and turning the homepage into a catalogue of every other tool we ship. One mention is enough —
          this site is the HEIC converter.
        </p>
        <p>
          Operator contact is{" "}
          <Link to="/contact" className="text-accent underline-offset-2 hover:underline">
            on the contact page
          </Link>
          . Privacy details live on{" "}
          <Link to="/privacy" className="text-accent underline-offset-2 hover:underline">
            Privacy
          </Link>
          .
        </p>
        <div className="pt-4">
          <SoftAgencyCta variant="footer" />
        </div>
        <p className="pt-4">
          <Link to="/" className="text-accent underline-offset-2 hover:underline">
            ← Back to converter
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
