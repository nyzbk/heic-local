import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { legalHead } from "@/lib/seo";

const EMAIL = "ultaultimatum@gmail.com";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    legalHead({
      title: "Contact HEIC Local — in-browser HEIC converter",
      description:
        "Email the operator of HEIC Local about decode bugs. Do not attach photos. Conversion stays in your browser tab.",
      path: "/contact",
    }),
});

function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Contact</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
          Contact HEIC Local
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Write to{" "}
          <a href={`mailto:${EMAIL}`} className="text-accent underline-offset-2 hover:underline">
            {EMAIL}
          </a>
          . That inbox is read by a person at Ultimatum, not a queue that accepts a camera roll and
          returns a ZIP of JPEGs. There is no upload form on this page on purpose: a form that
          accepted a HEIC, a Live Photo pair, or a folder of faces would break the only promise this
          hostname makes — those bytes stay in the tab that opened the converter.
        </p>
        <h2 className="pt-6 font-display text-xl font-semibold text-ink">What to include</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Include three things, and only three things, unless we ask for more. First, the page URL
          on this site (
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">/how-to</Link>,{" "}
          <Link to="/windows" className="text-accent underline-offset-2 hover:underline">/windows</Link>,{" "}
          <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">/whatsapp</Link>,{" "}
          <Link to="/iphone" className="text-accent underline-offset-2 hover:underline">/iphone</Link>
          — not a screenshot of the finished JPEG, and not a dump of the original). Second, the
          browser and device in one line: Safari on iOS 18, Chrome 129 on Windows, Firefox on a cheap
          Android. Third, what failed: native decode threw, the WASM path spun until the tab died, a
          file above the 40 MB guard, a burst HEIF that Photos still shows as one tile, Download that
          did nothing after Convert looked done. That triad is enough to reproduce a decode bug
          without ever seeing a face.
        </p>
        <h2 className="pt-6 font-display text-xl font-semibold text-ink">What we will not accept</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          We do not accept HEIC files, JPEG exports, passports, school photos, workplace badges, or a
          ZIP of a roll by email. If a file will not convert, send the size in megabytes and whether
          the name ends in .heic or .heif — not the picture. Do not paste GPS, a child’s name, or a
          street in the message. Those values are why the converter runs on-device in the first
          place. An attachment is the first time an operator could see a face. We do not want that
          inbox to become a drop box.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          HEIC Local is not a photo helpdesk that “fixes the file for you.” We cannot AirDrop from
          our side, we cannot reach your iCloud library, we cannot install Microsoft’s HEVC pack on
          your PC, and we cannot teach WhatsApp to love a container it already rejected. We can tell
          you that Safari often decodes with createImageBitmap, that a WASM fallback stays in the
          same tab, that a video renamed to .heic is refused on purpose, and that closing the tab
          drops the pixels. If a font or layout on this site broke, say so; we will not take a
          custom decoder build by email.
        </p>
        <h2 className="pt-6 font-display text-xl font-semibold text-ink">How to show a layout bug</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          If you want to show a layout without leaking a life, convert a dummy still you shot of a
          wall or a keyboard, download that JPEG yourself, and describe how your real file differs:
          48 MP, Portrait, ProRAW you saved as HEIC, a burst. A paragraph of differences is more
          useful than a redacted thumbnail that still contains metadata. Do not ask us to run the
          decode on a server and mail the JPEG back. That would be a different product with a
          different threat model, and it would put this domain into a class of sites Google
          Publisher Policies treat as low-value inventory: a form that takes a file and emails a
          sheet or an image back. HEIC Local is the opposite of that form. You press Convert. You
          save the file through the browser download sheet.
        </p>
        <h2 className="pt-6 font-display text-xl font-semibold text-ink">What this inbox is not</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          There is no phone number, no WhatsApp business line, and no “priority support” unlock.
          Ads, when Google eventually marks the site Ready, are not a support channel — do not click
          them to get a reply. Soft agency contact in the footer, if it exists, is a separate
          sentence from the ad slot. We do not ask anyone to click ads. Clicking ads to “support the
          tool” violates the AdSense program policies and can burn the whole publisher account, not
          this one hostname.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Nearby tools from the same workshop live on other domains. Crush compresses a JPEG you
          already have. Strip removes metadata. Folio merges PDFs. Nota draws an invoice. Do not
          send those files to this inbox. Do not ask this page to grow a compress button or a PDF
          merge. The job here is a HEIC still to JPG or PNG in the tab.
        </p>
        <h2 className="pt-6 font-display text-xl font-semibold text-ink">Response</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          We read English. A useful bug report is answered; a photo attachment is deleted unread. If
          you sent a real still by mistake, assume it is gone from our side because we do not open
          unsolicited camera rolls, and change nothing in iCloud just because an email bounced. For
          the legal wording see{" "}
          <Link to="/privacy" className="text-accent underline-offset-2 hover:underline">Privacy</Link>{" "}
          and{" "}
          <Link to="/terms" className="text-accent underline-offset-2 hover:underline">Terms</Link>
          . Operator: Ultimatum.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          This page exists so AdsBot and a human reviewer can see a real operator, a real address,
          and a real reason the contact surface refuses the very file the tool is built around. A
          three-line “email us” stub is the pattern help articles call a page with little content.
          The rule here is the same as the product: talk about decode paths and limits, never about
          the people in the frame. Soft guards on the converter stay at about 40 MB per still, 50
          files, and 200 MB per batch — those are memory ceilings, not a paid quota, and they are
          not something we raise by email.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          If Convert finishes and Download never starts, say whether you were inside Safari, an
          in-app browser (Instagram, Gmail, Slack), or a desktop. In-app shells often swallow the
          blob. Copy the URL into Safari and run the same still again before you write. If the
          still is a Live Photo, you should expect the key frame, not the three-second MOV — this
          inbox will not export the motion pair for you. If Explorer on Windows shows a blank icon
          on the original HEIC, that is usually a missing HEVC pack, not a corrupt file; convert
          here and send the JPEG to the colleague. None of those paths require you to attach the
          photo to this address.
        </p>
        <p className="mt-10 text-sm">
          <Link to="/" className="text-accent underline-offset-2 hover:underline">
            ← Back to converter
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
