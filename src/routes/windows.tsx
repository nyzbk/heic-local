import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
          not open it. Outlook will not preview it. The file is not broken. Windows simply does not ship a HEIC decoder
          the way Photos on iPhone does.
        </p>
        <p>
          HEIC is a container. The still inside is usually HEVC (H.265). Microsoft sells that codec as an optional
          store pack. Asking a colleague to install a codec so they can see three product shots is a poor request.
          Giving them JPEG is the shorter path.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Do this instead of a codec pack</h2>
        <ol className="list-decimal space-y-3 pl-5 text-ink">
          <li>
            Put the HEIC files on the same machine that will run the browser — USB, AirDrop to a nearby Mac then copy,
            or the phone’s Files app if you convert on the phone first.
          </li>
          <li>
            Open{" "}
            <Link to="/" className="text-accent underline-offset-2 hover:underline">
              HEIC Local
            </Link>{" "}
            and drop the files. Conversion stays in the tab.
          </li>
          <li>Download JPG. Attach that file to mail, Telegram, or the CMS. Leave the HEIC master on the phone.</li>
        </ol>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">What not to do</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not rename .heic to .jpg. The bytes are still HEVC. The new name only confuses the next app.</li>
          <li>Do not upload the roll to a random “free converter” if the shots include people, interiors, or documents.</li>
          <li>Do not switch the whole iPhone to “Most Compatible” just to send three files today. That setting does not rewrite old photos and it wastes space going forward.</li>
        </ul>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">When a codec pack still makes sense</h2>
        <p>
          If you live in Explorer all day and open hundreds of HEIC files, Microsoft’s HEVC extension can be worth it.
          This page is not that job. This page is the one-off: a client sent five iPhone stills, Windows shrugs, you
          need JPEGs before lunch.
        </p>
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
