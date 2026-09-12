import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { InfoTool } from "@/components/info-tool";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/info")({
  component: InfoPage,
  head: () =>
    articleHead({
      title: "Is this actually HEIC? — inspect ftyp in the browser | HEIC Local",
      description:
        "Check whether a file is really HEIC/HEIF: isLikelyHeic, MIME, size, and ftyp brands from the first 64 bytes. No JPG, no upload, no decode.",
      path: "/info",
      appName: "HEIC inspect",
    }),
});

function InfoPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Inspect</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">
          Is this actually HEIC?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink">
          A <code>.heic</code> name is not a decoder. Some files are JPEG with a lie on the end. Some
          are HEIF sequences. This page reads the first 64 bytes in the tab and prints the{" "}
          <code>ftyp</code> brands. It does not convert, it does not call <code>heicTo</code>, and it
          does not write a JPG.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Use it when Windows, WhatsApp, or a CMS rejected a file and you need to know whether the
          container is HEIC-family before you{" "}
          <Link to="/" className="text-accent underline-offset-2 hover:underline">
            open the converter
          </Link>
          .
        </p>

        <div className="mt-8">
          <InfoTool />
        </div>

        <article className="mt-12 space-y-4 text-sm leading-relaxed text-muted">
          <h2 className="font-display text-xl font-semibold text-ink">What the table means</h2>
          <p>
            <strong className="font-medium text-ink">isLikelyHeic</strong> is the same gate the
            converter uses: extension, MIME, then a header sniff. It can say yes on a real HEIC even
            if the name is wrong. It can say yes on a sequence still. It does not mean the file will
            convert — that is a different click, on a different page.
          </p>
          <p>
            <strong className="font-medium text-ink">MIME</strong> is what the OS put on the{" "}
            <code>File</code> object. Browsers often leave it empty for HEIC. Empty is not a
            verdict.
          </p>
          <p>
            <strong className="font-medium text-ink">ftyp brands</strong> are the ISO-BMFF labels in
            the header. Common still brands: <code>heic</code>, <code>heix</code>, <code>mif1</code>.
            <code>msf1</code> marks a sequence. A JPEG starts <code>FF D8 FF</code> and has no ftyp —
            renaming it to <code>.heic</code> does not invent one. This page will say sniff: jpeg.
          </p>
          <h2 className="pt-2 font-display text-xl font-semibold text-ink">What this page will not do</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>It will not decode HEVC or emit JPEG/PNG. No canvas, no toBlob, no ZIP.</li>
            <li>It will not unpack a Live Photo motion pair. Sequence brand is a hint, not an export.</li>
            <li>It will not upload the 64 bytes. Closing the tab drops the table.</li>
            <li>It is not a Windows codec tutorial. That lives on the Windows guide.</li>
          </ul>
          <p>
            Convert the still:{" "}
            <Link to="/" className="text-accent underline-offset-2 hover:underline">
              Open converter
            </Link>
            . Windows blank icons:{" "}
            <Link to="/windows" className="text-accent underline-offset-2 hover:underline">
              HEIC on Windows
            </Link>
            . Desktop chat:{" "}
            <Link to="/whatsapp" className="text-accent underline-offset-2 hover:underline">
              HEIC in WhatsApp
            </Link>
            .
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
