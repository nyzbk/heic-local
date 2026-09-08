import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — HEIC Local" },
      {
        name: "description",
        content:
          "HEIC Local converts HEIC photos entirely in your browser. Your files are not uploaded for conversion. Full privacy policy.",
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-16 pt-4 prose-like">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">Legal</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 8 September 2026</p>

        <section className="mt-8 space-y-4 text-sm leading-relaxed text-ink">
          <h2 className="font-display text-lg font-semibold">Summary</h2>
          <p>
            HEIC Local converts HEIC/HEIF images to JPG or PNG <strong>entirely in your browser</strong>. Your photos
            are not uploaded to our servers for conversion.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">What we process</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>
              <strong className="text-ink">Files you select</strong> stay on your device. Conversion uses client-side
              code (native decode and/or WebAssembly). We do not receive the image bytes on a server as part of the
              conversion flow.
            </li>
            <li>
              <strong className="text-ink">Technical logs</strong>: standard web hosting / CDN may log IP, user-agent,
              and request paths for security and reliability.
            </li>
            <li>
              <strong className="text-ink">Advertising</strong>: if Google AdSense is enabled on this site, Google may
              use cookies or similar technologies as described in{" "}
              <a href="https://policies.google.com/privacy" className="underline" rel="noopener noreferrer" target="_blank">
                Google Privacy &amp; Terms
              </a>
              .
            </li>
          </ul>

          <h2 className="font-display text-lg font-semibold pt-4">What we do not do</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>We do not sell your photos.</li>
            <li>We do not require an account to convert files.</li>
            <li>We do not use conversion files to train models.</li>
          </ul>

          <h2 className="font-display text-lg font-semibold pt-4">Optional sign-in</h2>
          <p className="text-muted">
            If sign-in is offered, it is optional and not required for conversion. Account data is handled only for
            authentication features you choose to use.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">Third parties</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>Hosting / CDN (e.g. Vercel or equivalent)</li>
            <li>Google AdSense (when live ads are enabled)</li>
            <li>Analytics only if explicitly added later (will be listed here)</li>
          </ul>

          <h2 className="font-display text-lg font-semibold pt-4">Your choices</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted">
            <li>Do not select files you do not want processed in the browser tab.</li>
            <li>Use browser controls to clear site data.</li>
            <li>
              Use{" "}
              <a href="https://adssettings.google.com/" className="underline" rel="noopener noreferrer" target="_blank">
                Google Ad Settings
              </a>{" "}
              if ads are shown.
            </li>
          </ul>

          <h2 className="font-display text-lg font-semibold pt-4">Contact</h2>
          <p className="text-muted">
            For privacy questions related to this tool, contact via the agency site linked in the footer.
          </p>

          <h2 className="font-display text-lg font-semibold pt-4">What the host actually sees</h2>
          <p className="text-muted">
            Hosting on HTTPS at heic-local.vercel.app is not custody of your camera roll and is not
            an upload of the HEIC. Vercel may see that a browser requested the page, the script, and
            the WASM chunk — ordinary static assets. Vercel does not receive the File object of a
            photo beyond the moment your tab reads it, and it never receives the JPEG bytes you
            download. There is no multipart “convert” form posted to our origin, no presigned
            bucket, and no “processing queue” email.
          </p>
          <p className="text-muted">
            Google ads, if they ever fill the mid / footer placeholders, receive the page URL and
            ordinary ad signals. They do not receive the pixels. Until Site Ready those placeholders
            stay empty. We do not run analytics that log filenames.
          </p>
          <h2 className="font-display text-lg font-semibold pt-4">Email is not an upload slot</h2>
          <p className="text-muted">
            If you email ultaultimatum@gmail.com, that message is ordinary email. That is why this
            policy and the contact page both say: do not attach a photo. An attachment would be the
            first time the operator could see a face. We do not want that inbox to become a drop
            box. Closing the tab drops the in-memory bitmap. Downloads you saved to disk are yours
            to delete. We cannot remotely wipe a file we never held.
          </p>
          <h2 className="font-display text-lg font-semibold pt-4">Changes</h2>
          <p className="text-muted">We may update this page. The “Last updated” date will change when we do.</p>
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
