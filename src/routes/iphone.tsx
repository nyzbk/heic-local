import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/iphone")({
  component: IphonePage,
  head: () => ({
    meta: [
      { title: "Convert HEIC to JPG on iPhone Safari — HEIC Local" },
      {
        name: "description",
        content:
          "Convert a HEIC still to JPG in Safari on the same iPhone that shot it. Native decode, WASM fallback, share sheet. No upload.",
      },
    ],
  }),
});

function IphonePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4 space-y-5 text-sm leading-relaxed text-muted">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">iPhone</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          HEIC to JPG on iPhone (Safari)
        </h1>
        <p className="text-ink">
          You do not need a separate App Store converter. Safari on the same iPhone that shot the
          still can decode many HEIC files natively. Open{" "}
          <a href="https://heic-local.vercel.app/" className="text-accent underline-offset-2 hover:underline">
            https://heic-local.vercel.app
          </a>{" "}
          in Safari — not inside Instagram’s in-app browser, not inside Gmail’s preview, not inside
          a MDM “secure browser” that strips downloads. Those shells often block the blob download
          or kill WASM. If you arrived from a chat preview, tap Open in Safari, then convert.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Photos picker</h2>
        <p>
          The picker should offer the camera roll. A HEIC still from Camera, Portrait, or a
          screenshot saved as HEIC is in scope. Live Photo: you get the key still, not the 3-second
          MOV. Burst: export the frame you care about from Photos first; a multi-image HEIF may fail
          as one tile. ProRAW saved beside HEIC is a different file — this page does not develop RAW.
          A video you renamed to .heic is refused on purpose.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Stay in the tab</h2>
        <p>
          iOS Safari discards heavy pages that sit in the background. Convert, wait for the
          thumbnail, then Download. The share sheet can save to Files, Mail, or WhatsApp. If the
          sheet never appears, check that From-the-tool errors are not sitting under the button
          (oversize file, not a still). Tap Convert again; a popup blocker or an IT profile can
          swallow the first blob. Keep the phone unlocked and Safari in front until the sheet
          appears. Pocketing the phone mid-WASM is how a 12 MP still dies.
        </p>
        <p>
          Low Power Mode does not always kill WASM, but a locked screen often does. If Convert
          freezes after you pocket the phone, unlock, keep Safari in front, and run that one file
          again. A batch of 50 is the documented ceiling so a tab does not die; on a 3 GB iPhone
          treat 10 as a practical batch. Concurrency on iPhone is 1 — one frame at a time.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Share sheet is the save button</h2>
        <p>
          Safari’s download sheet is the save button. There is no “email me the JPEG” on this
          origin, because that would be an upload. If Mail is your next step, attach the file you
          just saved, not the HEIC in Photos, unless the recipient is also on iOS and you already
          know they can open it. Desktop WhatsApp is the usual reason people convert on the phone
          before they sit at a PC. Longer notes:{" "}
          <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">HEIC in WhatsApp</Link>.
        </p>
        <p>
          Huge 48 MP stills starve an old phone. Soft guard is about 40 MB per file. Compress is
          not this product — if you already have a JPEG, Crush lives on another hostname.
          localStorage on iPhone is this Safari profile, not iCloud of every device. We do not push
          the JPEG into Files.app for you; that is the share sheet after download.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-ink">In-app browsers</h2>
        <p>
          In-app browsers (Telegram, Slack, Facebook, Instagram, Gmail) inherit WebKit with download
          quirks. If Choose photos works but Download does not, copy the URL into Safari and repeat.
          We cannot patch those shells. Chrome on iOS is WebKit underneath, so behaviour is close to
          Safari; still prefer Safari when a download fails once. A work MDM profile that blocks
          blob URLs will fail every converter in a tab, not only this one.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Do not email the original</h2>
        <p>
          Do not email the original HEIC to ultaultimatum@gmail.com for “us to convert.” That
          defeats the tool. The{" "}
          <Link to="/contact" className="text-accent underline-offset-2 hover:underline">contact page</Link>{" "}
          explains the triad we actually need: page URL, browser, what failed — never the picture.
        </p>
        <p>
          This page is not a tutorial for turning off HEIC in Camera. “Most Compatible” only changes
          future shots and uses more space. The roll you already have still needs a decode. That is
          this tab. Step-by-step that is not Safari-specific:{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">how to convert without uploading</Link>
          . Short answers:{" "}
          <Link to="/faq" className="text-accent underline-offset-2 hover:underline">FAQ</Link>.
        </p>
        <p>
          If Files.app shows the JPEG but Photos does not, that is expected: Photos is a camera
          library, Files is a document tree. Save to Files when a print shop asked for a file, not
          a camera roll screenshot. A screenshot of the converted preview is a new JPEG of the
          screen, not the decoded frame — do not send that to a printer and call it the export.
          Native createImageBitmap on current iOS often finishes before you notice a spinner. The
          WASM path is the same tab on older builds; it is slower, still local, still not an upload.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
