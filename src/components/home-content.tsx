import { Link } from "@tanstack/react-router";

export function HomeContent() {
  return (
    <article className="mt-14 space-y-4 text-sm leading-relaxed text-muted">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
        Why people convert HEIC here
      </h2>
      <p>
        Since iOS 11 the Camera app writes HEIC to save space. That is fine inside Photos. It breaks the moment the
        file leaves Apple’s stack. A Windows PC without the HEVC extension shows a blank icon. Some desktop WhatsApp
        builds say the attachment is unsupported. Print kiosks and older CMS fields only whitelist JPG or PNG. Renaming{" "}
        <code>.heic</code> to <code>.jpg</code> does nothing — the bitstream is still HEVC.
      </p>
      <p>
        Most “free converters” fix that by taking the bytes onto a server. Family photos, workplace shots, and
        documents do not belong there. HEIC Local decodes in this tab. After the page and decoder have loaded, the
        photo does not need a second trip across the network to become a JPEG.
      </p>
      <p>
        Switching iPhone Camera to “Most Compatible” only helps future shots and wastes space going forward. It does
        not rewrite last year’s roll. This page is for the files you already have, and for one-off shares, without
        changing the system default.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-tight text-ink">How the converter works</h2>
      <p>
        You pick one still or a batch. Safari on iPhone can often decode HEIC natively. If it cannot, a WebAssembly
        decoder runs on the same device. Pixels are then encoded as JPEG (default quality 90) or PNG. You download one
        file or a ZIP. Soft guards sit around 40 MB per photo, 50 files, and 200 MB per batch so a phone tab survives
        the job. Those numbers are memory limits, not a paid quota.
      </p>
      <p>
        Live Photo motion is not exported. You get the still. Portrait depth maps are not a separate file. GPS and
        other EXIF fields are not the product — do not assume every tag survives every encoder path. If you must strip
        location before a public post, do that as a second step after you have the JPG.
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-tight text-ink">What this site is not</h2>
      <p>
        It is not a cloud gallery. It is not an editor with filters. It is not a catalogue of every other file tool we
        ship. The job is narrow: HEIC still in, JPG or PNG out, in this tab. Guides on the same domain stay on that job
        —{" "}
        <Link to="/windows" className="text-accent underline-offset-2 hover:underline">
          HEIC on Windows
        </Link>
        ,{" "}
        <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">
          HEIC in WhatsApp
        </Link>
        , the{" "}
        <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
          step-by-step
        </Link>
        , and the{" "}
        <Link to="/faq" className="text-accent underline-offset-2 hover:underline">
          FAQ
        </Link>
        .
      </p>

      <h2 className="pt-4 font-display text-2xl font-semibold tracking-tight text-ink">Limits you should know</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Stills only. A video renamed to .heic will fail on purpose.</li>
        <li>Burst or multi-image HEIF sequences may need the key still exported from Photos first.</li>
        <li>Keep the tab in the foreground on iPhone until the download starts. Backgrounded Safari can drop the decoder.</li>
        <li>Wide-gamut Display P3 shots can shift slightly when JPEG lands in sRGB. That is the JPEG path, not a server filter.</li>
        <li>First visit needs the network to load the page and decoder. Conversion itself does not upload the photo.</li>
      </ul>

      <p className="pt-2">
        <Link to="/faq" className="text-accent underline-offset-2 hover:underline">
          FAQ
        </Link>
        {" · "}
        <Link to="/use-cases" className="text-accent underline-offset-2 hover:underline">
          Use cases
        </Link>
        {" · "}
        <Link to="/about" className="text-accent underline-offset-2 hover:underline">
          About
        </Link>
        {" · "}
        <Link to="/contact" className="text-accent underline-offset-2 hover:underline">
          Contact
        </Link>
      </p>
    </article>
  );
}
