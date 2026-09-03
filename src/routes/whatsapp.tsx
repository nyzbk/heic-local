import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/whatsapp")({
  component: WhatsAppPage,
  head: () => ({
    meta: [
      {
        title: "Fix unsupported iPhone HEIC photos in WhatsApp desktop | HEIC Local",
      },
      {
        name: "description",
        content:
          "Desktop WhatsApp often rejects iPhone HEIC attachments. Convert the still to JPG in this tab and send the JPEG. No upload. Camera can stay on High Efficiency.",
      },
    ],
  }),
});

function WhatsAppPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
      <SiteHeader />
      <main className="pb-8 pt-4 space-y-5 text-sm leading-relaxed text-muted">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">WhatsApp</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Why WhatsApp desktop rejects an iPhone HEIC photo
        </h1>
        <p className="text-ink">
          You sent a photo from an iPhone. On the phone it looks fine. On WhatsApp desktop the other person sees
          unsupported or a blank tile. The chat is not broken. The desktop client never learned the HEIC container.
        </p>
        <p>
          iPhone Camera still writes HEIC when High Efficiency is on. WhatsApp on iOS may recompress on send. Some
          desktop builds still choke if the incoming file is a raw HEIC from Files, email, or a side load. JPEG is the
          format that client already knows.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Send a JPEG without changing Camera</h2>
        <ol className="list-decimal space-y-3 pl-5 text-ink">
          <li>Keep Camera on High Efficiency. You do not need to waste space on every future shot for one chat.</li>
          <li>
            Open{" "}
            <Link to="/" className="text-accent underline-offset-2 hover:underline">
              the converter
            </Link>{" "}
            on the phone or on the PC that holds the file.
          </li>
          <li>Convert the still to JPG. Attach that file in WhatsApp. Leave the HEIC in Photos.</li>
        </ol>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">If it still fails</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>You attached the original HEIC again. Check the extension on the file you picked.</li>
          <li>The item was a Live Photo and you expected the motion. This tool exports the still only.</li>
          <li>The file is huge. Drop quality a step or send one photo at a time.</li>
        </ul>

        <p>
          Same pain on a PC with no preview:{" "}
          <Link to="/windows" className="text-accent underline-offset-2 hover:underline">
            HEIC on Windows
          </Link>
          . Full walkthrough:{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            how to convert
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
