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
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">When a local HEIC convert is the right move</h1>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Desktop WhatsApp still shows “unsupported”</h2>
        <p>
          The phone sent a HEIC. The desktop client never learned the container. Convert the still here, send the JPG,
          leave Camera on High Efficiency. You are not fighting the default for one chat.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Windows PC without the HEVC pack</h2>
        <p>
          Explorer shows an empty icon. Installing a codec pack is a poor ask for a colleague who only needs three
          product shots. Give them JPEGs. Keep HEIC masters on the phone.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">A CMS or print lab rejects HEIC</h2>
        <p>
          Many upload fields still whitelist jpg/png/webp. A print kiosk is worse. Convert at 90 or higher so the lab
          does not add a second generation of compression on a tiny file.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">You do not want the roll on a random website</h2>
        <p>
          Family photos and workplace shots do not belong on a “free converter” that stores the upload to bill you later.
          This page never takes that copy. That is the whole product.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">You need a batch tonight, not a new camera setting</h2>
        <p>
          Switching iOS to “Most Compatible” helps future shots and wastes space going forward. It does not touch last
          year’s roll. Drop the batch here, ZIP the JPEGs, leave the setting alone.
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
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
