import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { articleHead } from "@/lib/seo";

const HOW_TO_STEPS = [
  "Open heic-local.vercel.app on the phone or computer that holds the photos.",
  "Pick files from the camera roll or drop a batch. Stay in this tab.",
  "JPG with a quality slider for sharing. PNG when you need lossless pixels.",
  "Save one file or a ZIP. No watermark is written into the pixels.",
];

export const Route = createFileRoute("/how-to")({
  component: HowToPage,
  head: () =>
    articleHead({
      title: "How to convert HEIC to JPG on iPhone or Windows — without uploading | HEIC Local",
      description:
        "Step-by-step: convert iPhone HEIC photos to JPG or PNG in the browser. What breaks on Windows and WhatsApp, Safari decode vs WASM, limits, and how to tell nothing was uploaded.",
      path: "/how-to",
      appName: "How to convert HEIC",
      howToName: "Convert HEIC to JPG in the browser",
      howToSteps: HOW_TO_STEPS,
    }),
});

function HowToPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4 space-y-5 text-sm leading-relaxed text-muted">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Guide</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          How to convert HEIC to JPG without uploading the photo
        </h1>
        <p className="text-ink">
          iPhone has saved stills as HEIC by default since iOS 11. The file is smaller than a same-resolution JPEG, which
          is why the Camera roll fills more slowly. The cost shows up the moment you leave Apple’s stack: WhatsApp on
          some desktops, Windows Explorer without the HEVC extension, older CMS uploaders, and printers that only list
          JPG/PNG will refuse the file or show a blank thumbnail.
        </p>
        <p>
          Cloud converters solve that by taking the bytes. That is the wrong trade if the roll has faces, documents, or
          anything you would not post publicly. HEIC Local decodes in this tab. After the page and decoder load, the
          Network panel should stay quiet while frames are written to JPG or PNG.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">What HEIC actually is</h2>
        <p>
          HEIC is a container. The still inside is usually HEVC (H.265). That is why a Windows PC without the HEVC Video
          Extensions package cannot preview the file, and why a random “rename to .jpg” trick does nothing useful — the
          bitstream is not JPEG. A real conversion decodes HEVC to pixels, then encodes JPEG or PNG.
        </p>
        <p>
          Live Photo is a still plus a short video. This tool converts the still. It does not export the motion pair as
          a separate MOV. If you needed the motion, keep the original in Photos and export the still here only for
          sharing.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Steps</h2>
        <ol className="list-decimal space-y-3 pl-5 text-ink">
          <li>
            Open this site on the same device that holds the HEIC files. AirDrop or a cable is fine; the conversion still
            happens locally after the files are on the device.
          </li>
          <li>
            Use the picker or drop a batch. Soft guards: about 40 MB per photo, 50 files, 200 MB per batch. Those caps
            exist so a phone tab does not die mid-decode. They are not a paid quota.
          </li>
          <li>
            Pick JPG when the next app wants a photo that “just opens.” Default quality is 90. Raise it if you will edit
            again; lower it for email. Pick PNG when you need lossless pixels of the decoded frame (screenshots, graphics
            with type, or a next step that hates JPEG blocking).
          </li>
          <li>
            Wait until the thumbnail looks right. If Safari can decode HEIC natively it will. If not, a WebAssembly
            decoder runs on-device. Either path stays in the tab.
          </li>
          <li>Download one file or a ZIP of the batch. Nothing is branded into the pixels.</li>
        </ol>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Windows and WhatsApp</h2>
        <p>
          On Windows 10/11 a HEIC file often shows a blank icon until you install Microsoft’s HEVC extension. Even then,
          some chat apps still reject the container. Convert to JPG here, then attach the JPG. Longer notes:{" "}
          <Link to="/windows" className="text-accent underline-offset-2 hover:underline">HEIC on Windows</Link>.
        </p>
        <p>
          WhatsApp on iPhone may recompress on send. If the receiver on desktop sees “unsupported,” send the JPG from
          this tool instead of the original HEIC. Longer notes:{" "}
          <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">HEIC in WhatsApp</Link>.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">If conversion fails</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>File is a burst or a multi-image HEIF sequence this build does not flatten — export the key still from Photos first.</li>
          <li>File is larger than the per-photo guard. Split the batch or use a computer with more RAM.</li>
          <li>Tab was backgrounded on iOS and Safari discarded the decoder. Keep the tab visible until download starts.</li>
          <li>The file is not a still (plain HEVC video renamed to .heic). This page is for photos.</li>
          <li>Display P3 wide-gamut shots can look slightly different after JPEG encode into sRGB. That is the JPEG path, not a server filter.</li>
        </ul>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">What happens when you close the tab</h2>
        <p>
          Decoded pixels live in memory for this session. Closing the tab drops them. We do not keep a gallery, and we
          do not have your originals on a disk we control. If you need the JPG tomorrow, download it now.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Compared with Photos.app and upload sites</h2>
        <p>
          Photos on Mac can export JPEG. That helps if you already sit at the Mac with iCloud Photos downloaded. It does
          not help a Windows colleague, and it does not help when you do not want the original in a third-party web
          form. Upload sites also keep a copy long enough to decode on their GPU. This page never takes that copy.
        </p>
        <h2 className="pt-4 font-display text-xl font-semibold text-ink">
          Native decode versus WASM in this tab
        </h2>
        <p>
          The first successful decode on a given file usually goes through the browser’s own
          createImageBitmap. Safari on current iOS often knows HEIC natively; the tab never needs a
          second library for that still. When native decode throws — older Chrome on Windows,
          Firefox, a HEIF flavour the OS skipped — the page loads heic-to and runs a WebAssembly
          decoder in the same origin. Both paths write pixels to a canvas in this process. Neither
          path POSTs the File to our server. If you watch the Network panel after the page and the
          decoder chunk have loaded, conversion traffic should stay local. A spinner that lasts
          minutes on a 12 MP still is memory and CPU, not an upload bar.
        </p>
        <p>
          Concurrency is 1 on iPhone and Android so one 12 MP frame does not fight another for RAM.
          A desktop may run 2. That is why a 40-file batch feels slower on a phone than on a laptop,
          and why backgrounding Safari mid-batch is how people lose the decoder. Keep the tab
          visible until the ZIP or the single JPEG appears in the share sheet. A renamed .mp4 is
          not a still; the converter refuses it so a video does not sit in memory as a fake photo.
          Burst or multi-image HEIF may need the key still exported from Photos first — that is a
          Photos export, not a second trip to our origin.
        </p>
        <p>
          JPEG quality 90 is a default for sharing, not a watermark and not a daily cap. PNG is the
          lossless dump of the decoded frame when the next tool hates JPEG blocking. Neither encoder
          writes a brand into the pixels. Closing the tab drops the bitmap. If you need the JPG
          tomorrow, download it now — we do not keep a gallery.
        </p>
        <p>
          First visit still needs the network: HTML, CSS, and the decoder chunk. After those land,
          turning the radio off does not upload a photo, because there is nothing to upload. Reloading
          a cold tab offline may lose the decoder script — that is the script, not custody of your
          roll. Wide-gamut Display P3 shots can shift slightly when JPEG lands in sRGB. That is the
          JPEG path, not a server filter, and not a reason to email the original.
        </p>
        <p>
          More detail on real tasks:{" "}
          <Link to="/use-cases" className="text-accent underline-offset-2 hover:underline">use cases</Link>
          . Short answers:{" "}
          <Link to="/faq" className="text-accent underline-offset-2 hover:underline">FAQ</Link>.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
