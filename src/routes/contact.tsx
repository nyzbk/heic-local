import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const EMAIL = "ultaultimatum@gmail.com";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact HEIC Local — in-browser HEIC converter" },
      {
        name: "description",
        content:
          "Email the operator of HEIC Local. Do not attach photos unless asked. Conversion stays in your browser.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Contact</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Contact HEIC Local</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Questions about the converter, a broken decode on a specific iPhone/Safari build, or this site — write to{" "}
          <a href={`mailto:${EMAIL}`} className="text-accent underline-offset-2 hover:underline">
            {EMAIL}
          </a>
          .
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Include the page URL, browser and OS, and the file type (HEIC / HEIF). Do not attach the photo unless we ask.
          Uploading a private picture to email defeats the point of a local converter.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          This address is not a drop box for batches. We do not convert files for you on a server.
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
