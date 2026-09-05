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
          stills. WhatsApp desktop, Windows Explorer without a codec pack, print kiosks, and older CMS fields still want
          JPEG. The usual “fix” is an upload form. That is the wrong bargain for family photos, workplace shots, and
          documents.
        </p>
        <p>
          The job is narrow on purpose. We decode the still you picked. We do not run a cloud gallery, we do not keep
          your roll, we do not sell an “unlimited pro” tier that unlocks the same button. Soft memory guards exist so a
          phone tab survives a batch — about 40 MB per photo, 50 files, 200 MB per batch. They are not a paywall in
          disguise. Downloads are not stamped with a logo or a URL.
        </p>
        <p>
          What we refuse: required signup before Convert, watermark on the pixels, uploading the file “so our servers can
          do it faster,” Live Photo motion export, OCR, PDF, background removal, and turning the homepage into a
          catalogue of every other tool we ship. One mention is enough — this site is the HEIC converter. Other local
          utilities live on other hostnames. They are not a toolkit inside this header.
        </p>
        <p>
          Safari on iPhone can often decode HEIC natively. If it cannot, a WebAssembly decoder runs on the same device.
          Either path stays in the tab. After the page and decoder have loaded, the photo does not need a second trip
          across the network to become a JPEG. First visit still needs the network. That is the script, not your
          pictures.
        </p>
        <p>
          Guides on this hostname stay on the same pain:{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            how to convert without uploading
          </Link>
          ,{" "}
          <Link to="/windows" className="text-accent underline-offset-2 hover:underline">
            HEIC on Windows
          </Link>
          ,{" "}
          <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">
            HEIC in WhatsApp
          </Link>
          ,{" "}
          <Link to="/use-cases" className="text-accent underline-offset-2 hover:underline">
            use cases
          </Link>
          , and the{" "}
          <Link to="/faq" className="text-accent underline-offset-2 hover:underline">
            FAQ
          </Link>
          . If a page cannot be about converting an iPhone still in this tab, it does not belong here.
        </p>
        <p>
          Ads, when Google marks the site Ready, will sit after a successful convert, mid-page under the how-it-works
          block, and in the footer. They will not cover Convert or Download. Until then the slots are placeholders.
          Please do not click them as a favour. That violates Google policy and can close the account.
        </p>
        <p>
          Operator contact is{" "}
          <Link to="/contact" className="text-accent underline-offset-2 hover:underline">
            on the contact page
          </Link>
          . The inbox is ultaultimatum@gmail.com. Write the URL, the browser, and what you expected. Do not attach the
          photos unless we ask. Privacy details live on{" "}
          <Link to="/privacy" className="text-accent underline-offset-2 hover:underline">
            Privacy
          </Link>
          . There is no phone line and no chat widget on the drop zone.
        </p>
        <p>
          The live operation is convert. There is no hidden AI suite, no promised cloud sync, and no “coming soon” wall.
          If a file is a video renamed to .heic, over the size guard, or not a still, the tab tells you and stops. That
          refusal is part of the product.
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
