import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FAQ_ITEMS } from "@/content/faq";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () =>
    articleHead({
      title: "HEIC Local FAQ — upload, Safari, Live Photo, Windows, WhatsApp",
      description:
        "Answers for HEIC Local: files stay on device, Safari and WASM decode, Live Photo stills, JPG vs PNG, Windows blank icons, WhatsApp desktop, ads placement.",
      path: "/faq",
      appName: "HEIC Local FAQ",
      faqs: FAQ_ITEMS,
    }),
});

function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">FAQ</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">HEIC Local questions</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          These answers are about this converter, not about Apple Camera settings in general. For the long walkthrough
          see{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            how to convert HEIC
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
        <div className="mt-10 space-y-8">
          {FAQ_ITEMS.map((item) => (
            <section key={item.q}>
              <h2 className="font-display text-base font-semibold text-ink">{item.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
