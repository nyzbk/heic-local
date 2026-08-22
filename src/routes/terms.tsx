import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Use — HEIC Local" },
      {
        name: "description",
        content: "Terms of use for the free HEIC Local browser converter. No warranty, acceptable use, advertising notice.",
      },
    ],
  }),
});

function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-16 pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 22 August 2026</p>

        <section className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <h2 className="font-display text-lg font-semibold">Service</h2>
          <p className="text-muted">
            HEIC Local is a free browser-based tool to convert HEIC/HEIF images to JPG or PNG. The service is provided
            “as is”.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">Acceptable use</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>Use the tool for lawful purposes only.</li>
            <li>
              Do not attempt to disrupt the service, probe other users, or abuse advertising systems (including invalid
              clicks on ads).
            </li>
            <li>Do not upload or process content you are not allowed to process.</li>
          </ul>

          <h2 className="font-display text-lg font-semibold pt-4">No warranty</h2>
          <p className="text-muted">
            Conversion quality and compatibility depend on your device and browser. We do not guarantee that every HEIC
            file will convert on every device.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">Limitation of liability</h2>
          <p className="text-muted">
            To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from
            use of the tool.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">Advertising</h2>
          <p className="text-muted">
            The site may display third-party ads (e.g. Google AdSense). Ad content is controlled by the ad network, not
            by us.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">Agency services</h2>
          <p className="text-muted">
            Links to brand-marketing agency services are optional offers. Free tool use does not create a client
            contract.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">Contact</h2>
          <p className="text-muted">See the footer link to the agency / portfolio site.</p>
        </section>

        <p className="mt-10 text-sm">
          <Link to="/" className="text-accent underline-offset-2 hover:underline">
            ← Back to converter
          </Link>
        </p>
      </main>
    </div>
  );
}
