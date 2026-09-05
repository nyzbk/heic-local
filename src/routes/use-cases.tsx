import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/use-cases")({
  component: UseCasesPage,
  head: () => ({
    meta: [
      { title: "When to convert HEIC locally — WhatsApp, Windows, print, CMS" },
      {
        name: "description",
        content:
          "Real jobs for HEIC Local: desktop WhatsApp, Windows without HEVC, print labs, CMS uploaders, and sending a still without changing iPhone camera defaults.",
      },
    ],
  }),
});

function UseCasesPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4 space-y-5 text-sm leading-relaxed text-muted">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Use cases</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          When a local HEIC convert is the right move
        </h1>
        <p className="text-ink">
          Five jobs that match this converter. If you need Live Photo motion, a cloud gallery, or a PDF packet, this is
          the wrong site.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Desktop WhatsApp still shows “unsupported”</h2>
        <p>
          The phone sent a HEIC. The desktop client never learned the container. Convert the still here, send the JPG,
          leave Camera on High Efficiency. You are not fighting the default for one chat. Group threads get noisy when
          iPhone users swear the photo is fine and one Windows user sees a grey box. Both are right about their app.
          JPEG is the common file.
        </p>
        <p>
          Do not rename .heic to .jpg. Do not ask the laptop user to install a codec pack for a chat photo. Check the
          extension before you attach. Longer notes:{" "}
          <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">
            HEIC in WhatsApp
          </Link>
          .
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Windows PC without the HEVC pack</h2>
        <p>
          Explorer shows an empty icon. Paint will not open it. Outlook will not preview it. Installing a codec pack is
          a poor ask for a colleague who only needs three product shots. Give them JPEGs. Keep HEIC masters on the
          phone. A locked-down work laptop may not be allowed to install Store extensions anyway.
        </p>
        <p>
          If you yourself open hundreds of HEIC files a day, the Microsoft pack can be worth it. This page is the
          one-off before lunch. Longer notes:{" "}
          <Link to="/windows" className="text-accent underline-offset-2 hover:underline">
            HEIC on Windows
          </Link>
          .
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">A CMS or print lab rejects HEIC</h2>
        <p>
          Many upload fields still whitelist jpg/png/webp. A print kiosk is worse: it lists three extensions and dies on
          a fourth. Convert at 90 or higher so the lab does not add a second generation of compression on a tiny file.
          This tool does not produce a press ICC profile. It produces a still the kiosk already knows.
        </p>
        <p>
          If the CMS also has a file-size cap, lower JPEG quality after you confirm the type was the only problem. Type
          first, size second. A HEIC that “fails validation” is often the whitelist, not the megabytes.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">You do not want the roll on a random website</h2>
        <p>
          Family photos and workplace shots do not belong on a “free converter” that stores the upload to bill you later.
          This page never takes that copy. After the page and decoder load, the Network panel should stay quiet while
          frames are written to JPG or PNG. That is the whole product.
        </p>
        <p>
          Hosting may log that you requested the HTML. That is not the picture. Do not email us the photos unless we
          ask. There is no gallery of past jobs, because we do not keep one.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">You need a batch tonight, not a new camera setting</h2>
        <p>
          Switching iOS to “Most Compatible” helps future shots and wastes space going forward. It does not touch last
          year’s roll. Drop the batch here, ZIP the JPEGs, leave the setting alone. Soft guards: about 40 MB per photo,
          50 files, 200 MB per batch. If the phone tab dies, do fewer files or use a laptop.
        </p>
        <p>
          Live Photo motion is not in the ZIP. Portrait depth is not a separate file. Keep originals in Photos if you
          still need those extras. The ZIP is for sharing.
        </p>

        <p className="pt-2">
          Walkthrough:{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            how to convert
          </Link>
          . Converter:{" "}
          <Link to="/" className="text-accent underline-offset-2 hover:underline">
            home
          </Link>
          . Short answers:{" "}
          <Link to="/faq" className="text-accent underline-offset-2 hover:underline">
            FAQ
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
