import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const STEPS = [
  "Copy the HEIC files onto the same Windows PC that will run the browser, or convert on the iPhone first and then send the JPEG.",
  "Open HEIC Local in Chrome, Edge, or Firefox. JavaScript must be on.",
  "Drop the stills. Conversion stays in this tab. Nothing is posted to a conversion server.",
  "Download JPG. Attach that file to mail, Teams, or the CMS. Leave the HEIC master on the phone.",
];

export const Route = createFileRoute("/windows")({
  component: WindowsPage,
  head: () => ({
    meta: [
      {
        title: "Open iPhone HEIC photos on Windows without a codec pack | HEIC Local",
      },
      {
        name: "description",
        content:
          "Windows Explorer shows a blank icon for HEIC because the still is usually HEVC. Convert to JPG in this browser tab. No upload. No HEVC store pack required for a one-off share.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Open an iPhone HEIC photo on Windows without a codec pack",
          description:
            "Convert HEIC stills to JPG in the browser so Windows Explorer, Paint, Outlook and Teams can open the file. No upload.",
          step: STEPS.map((text, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            text,
          })),
        }),
      },
    ],
  }),
});

function WindowsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4 space-y-5 text-sm leading-relaxed text-muted">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Windows</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          How to open an iPhone HEIC photo on Windows
        </h1>
        <p className="text-ink">
          You copied a photo from an iPhone to a Windows PC. Explorer shows a blank tile or a generic icon. Paint will
          not open it. Outlook will not preview it. Teams may refuse the attachment. The file is not broken. Windows
          simply does not ship a HEIC decoder the way Photos on iPhone does.
        </p>
        <p>
          HEIC is a container. The still inside is usually HEVC (H.265). Microsoft sells that codec as an optional store
          pack. Asking a colleague to install a codec so they can see three product shots is a poor request. Giving them
          JPEG is the shorter path. This page is that path: decode in the browser tab, download JPG, keep the HEIC
          master on the phone.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Why Explorer shows a blank icon</h2>
        <p>
          File Explorer draws thumbnails with codecs registered on the PC. JPEG, PNG and BMP are there from a clean
          install. HEIC is not. The HEVC Video Extensions package (and, on some builds, a separate HEIF extension) is
          what teaches Explorer to paint a preview. Without it you get a white rectangle, a generic document icon, or a
          “Windows cannot open this file” dialog that lists Paint and Photos as if they could help. They cannot, until a
          decoder exists.
        </p>
        <p>
          Renaming <code>.heic</code> to <code>.jpg</code> does not add that decoder. The bytes are still HEVC. The new
          name only confuses the next app, and some mail filters will still sniff the real type. A real conversion
          decodes HEVC to pixels, then encodes JPEG. That is what this tab does. It is also what Photos on a Mac does
          when you export. The difference is you do not need the Mac, and you do not upload the roll to a website that
          “converts for free.”
        </p>
        <p>
          Older Windows 10 machines and locked-down work laptops are the usual pain. Store installs may be blocked by
          policy. Even when the pack is allowed, it is a paid item in many regions. A one-off share of five iPhone
          stills is not a reason to change a company image. Convert the five files. Leave the PC as it was.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Do this instead of a codec pack</h2>
        <ol className="list-decimal space-y-3 pl-5 text-ink">
          <li>
            Put the HEIC files on the same machine that will run the browser — USB, email to yourself, OneDrive that
            already holds the files, or convert on the iPhone first and send only JPEG. AirDrop to a nearby Mac then
            copy also works. The conversion still happens locally after the files are on the device you opened this
            page on.
          </li>
          <li>
            Open{" "}
            <Link to="/" className="text-accent underline-offset-2 hover:underline">
              HEIC Local
            </Link>{" "}
            in a current Chrome, Edge, or Firefox. JavaScript must be on. Edge is Chromium; it behaves like Chrome for
            this job. Keep the tab in the foreground until download starts.
          </li>
          <li>
            Drop the stills. Soft guards sit around 40 MB per photo, 50 files, and 200 MB per batch so the tab survives.
            Those numbers are memory limits, not a paid quota. A video renamed to .heic will fail on purpose. This page
            is for stills.
          </li>
          <li>
            Wait for the thumbnail. Download JPG at quality 90 unless you will edit again — then raise it or pick PNG.
            Attach the JPG to Outlook, Teams, Telegram, or the CMS. Leave the HEIC master on the phone. Closing this tab
            drops the decoded pixels. We do not keep a gallery.
          </li>
        </ol>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Outlook, Teams, Paint, and print kiosks</h2>
        <p>
          Outlook’s preview pane uses the same codec story as Explorer. A HEIC in the inbox often shows a paperclip and
          no picture. Recipients on Windows then forward the “broken” file. Send JPEG. If you already mailed HEIC, you
          can still convert the copy you kept and send a second message. Do not ask everyone on the thread to install
          Store extensions.
        </p>
        <p>
          Microsoft Teams file previews are similar. Some tenants block unknown types. JPEG is on every allow-list we
          have seen for photo sharing. PNG is the fallback when you need lossless pixels of the decoded frame (a
          screenshot of a UI, type on a slide, a graphic with hard edges).
        </p>
        <p>
          Paint and the Microsoft Photos app will not invent a decoder. A print kiosk at a pharmacy usually whitelists
          jpg/png. Convert at quality 90 or higher so the lab does not add a second generation of compression on a tiny
          file. This tool does not produce a print-shop ICC profile. It produces a still those machines already know.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">What not to do</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not rename .heic to .jpg. The bitstream is still HEVC.</li>
          <li>
            Do not upload the roll to a random “free converter” if the shots include people, interiors, IDs, or
            documents. Those sites take a copy long enough to decode on their GPU. This tab does not.
          </li>
          <li>
            Do not switch the whole iPhone to “Most Compatible” just to send three files today. That setting does not
            rewrite old photos and it wastes space going forward. This page is for the files you already have.
          </li>
          <li>
            Do not expect Live Photo motion in the JPG. You get the still. Keep the original in Photos if you still need
            the clip.
          </li>
          <li>
            Do not convert a 200 MB burst sequence in one drop on a weak laptop. Export the key still from Photos first,
            or do fewer files per pass.
          </li>
        </ul>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">When a codec pack still makes sense</h2>
        <p>
          If you live in Explorer all day and open hundreds of HEIC files, Microsoft’s HEVC extension can be worth it.
          Photographers who ingest iPhone stills into Lightroom on Windows also have their own pipeline. This page is
          not that job. This page is the one-off: a client sent five iPhone stills, Windows shrugs, you need JPEGs
          before lunch.
        </p>
        <p>
          A codec pack still does not help a recipient who is not you. If you email HEIC, they need the pack too. JPEG
          travels. That is why a local convert on your side is the polite default even if your own PC already previews
          HEIC.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Limits of this tab</h2>
        <p>
          Conversion runs in the browser. First visit needs the network to load the page and the decoder. After that,
          the photo bytes do not need a second trip to become JPEG. If the PC is offline and the decoder never loaded,
          the job cannot start. That is not an upload of your pictures — it is the script that knows HEVC.
        </p>
        <p>
          Wide-gamut Display P3 shots can shift slightly when JPEG lands in sRGB. That is the JPEG path, not a server
          filter. GPS and other EXIF fields are not the product. Do not assume every tag survives every encoder path. If
          you must strip location before a public post, do that as a second step after you have the JPG.
        </p>
        <p>
          This domain does not convert PDF, does not strip backgrounds, and does not mint a cloud link. The job is HEIC
          still in, JPG or PNG out. Guides on the same hostname stay on that job.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">If it still fails</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>The file is a video renamed to .heic. This page is for photos.</li>
          <li>The file is a multi-image HEIF sequence. Export the key still from Photos, then drop that still.</li>
          <li>The tab ran out of memory. Do fewer files, or use a machine with more RAM.</li>
          <li>You downloaded PNG and the portal only accepts JPEG. Convert again and pick JPG.</li>
          <li>
            Corporate Edge with scripts blocked. Allow JavaScript for this origin, or use a personal browser for the
            three files.
          </li>
        </ul>

        <p>
          Related:{" "}
          <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">
            HEIC in WhatsApp
          </Link>
          {" · "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            full steps
          </Link>
          {" · "}
          <Link to="/faq" className="text-accent underline-offset-2 hover:underline">
            FAQ
          </Link>
          {" · "}
          <Link to="/" className="text-accent underline-offset-2 hover:underline">
            converter
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
