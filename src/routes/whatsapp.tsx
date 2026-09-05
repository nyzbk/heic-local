import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const STEPS = [
  "Keep iPhone Camera on High Efficiency. You do not need to waste space on every future shot for one chat.",
  "Open HEIC Local on the phone or on the PC that holds the file.",
  "Convert the still to JPG. Quality 90 is the default for chat.",
  "Attach that JPEG in WhatsApp. Leave the HEIC in Photos.",
];

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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Send an iPhone HEIC photo through WhatsApp desktop",
          description:
            "Convert HEIC to JPG in the browser so WhatsApp desktop can open the attachment. No upload. Camera stays on High Efficiency.",
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
          iPhone Camera still writes HEIC when High Efficiency is on. WhatsApp on iOS may recompress on send, which is
          why some threads look fine on phones and fail only when someone opens the same message on a laptop. Other
          times the incoming file is a raw HEIC from Files, email, or a side load — and the desktop build chokes. JPEG
          is the format that client already knows.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Phone vs desktop is the usual split</h2>
        <p>
          WhatsApp on iPhone has years of HEIC traffic. It can transcode on the way out. WhatsApp Desktop (the store
          app and the browser-like wrapper) and WhatsApp for Windows are a different codebase. They preview JPEG, PNG,
          GIF, and a short list of documents. HEIC is often not on that list. The result is “unsupported,” a grey box,
          or a file chip that downloads and then fails to open in the built-in viewer.
        </p>
        <p>
          Telegram, Signal, and iMessage have their own rules. This page is WhatsApp. If the same HEIC also fails in
          Explorer, that is a Windows codec problem — see{" "}
          <Link to="/windows" className="text-accent underline-offset-2 hover:underline">
            HEIC on Windows
          </Link>
          . If only WhatsApp desktop fails, convert the still to JPG and send that. You do not need to change Camera for
          the rest of your life.
        </p>
        <p>
          Group chats make it worse: one Windows user reports a broken photo, and people on iPhone insist it is fine.
          Both are telling the truth about their client. JPEG is the common language. Convert once on your side rather
          than arguing about codecs in the thread.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Send a JPEG without changing Camera</h2>
        <ol className="list-decimal space-y-3 pl-5 text-ink">
          <li>
            Keep Camera on High Efficiency. “Most Compatible” writes JPEG going forward. It does not rewrite last year’s
            roll, and it wastes space on every future shot. This page is for the files you already have, and for one-off
            shares.
          </li>
          <li>
            Open{" "}
            <Link to="/" className="text-accent underline-offset-2 hover:underline">
              the converter
            </Link>{" "}
            on the phone or on the PC that holds the file. JavaScript on. Stay in the tab until download starts. Safari
            on iPhone can often decode HEIC natively; if it cannot, a WebAssembly decoder runs on the same device.
          </li>
          <li>
            Convert the still to JPG. Default quality 90 is meant for chat. Lower it if the file is huge and the send
            keeps failing on mobile data. Raise it if the shot will be printed. PNG is usually larger than WhatsApp
            wants; pick JPG unless you have a reason.
          </li>
          <li>
            Attach that JPEG in WhatsApp. Check the extension before you send. Leave the HEIC in Photos. Closing this
            tab discards the decoded pixels. We do not keep a copy, and we do not send into WhatsApp for you.
          </li>
        </ol>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Live Photo, Portrait, and bursts</h2>
        <p>
          Live Photo is a still plus a short video. This tool exports the still only. If you expected the motion, keep
          the original in Photos and send a screen recording or the Live Photo from the iPhone app, which WhatsApp on
          iOS sometimes flattens itself. Desktop still wants a JPEG for a reliable still.
        </p>
        <p>
          Portrait depth maps are not a separate file here. You get the flattened still. Burst or multi-image HEIF
          sequences may need the key frame exported from Photos first. A video renamed to .heic will fail on purpose.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">If it still fails</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>You attached the original HEIC again. Check the extension on the file you picked from Downloads.</li>
          <li>The chat app compressed the JPEG a second time into something tiny. Send one photo, not a burst of twenty.</li>
          <li>The file is still huge after quality 90. Drop quality a step, or crop on the phone before convert.</li>
          <li>The other person is on an old WhatsApp for Windows build. JPEG should still open; if it does not, the issue is not HEIC anymore.</li>
          <li>Corporate desktop blocks downloads. That is their IT policy, not this converter.</li>
        </ul>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">What not to do</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Do not rename .heic to .jpg and send it. Desktop will still fail; the bytes are HEVC.</li>
          <li>
            Do not upload the family roll to a random web converter “because WhatsApp is urgent.” Decode in this tab.
            After the page and decoder load, the photo does not need a second trip across the network.
          </li>
          <li>
            Do not switch the whole camera roll to JPEG for one stubborn laptop. Convert the three files that matter.
          </li>
          <li>Do not ask the other person to install a Windows HEVC pack just to see a chat photo. Send JPEG.</li>
        </ul>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Status, documents, and stickers are different jobs</h2>
        <p>
          WhatsApp Status often recompresses hard. A converted JPG at quality 90 is still a photo file; Status may crush
          it again. That is their pipeline. We do not promise a Status-perfect encode. For a document-style still (a
          whiteboard, a passport page you should not send in the first place), remember this is a photo converter, not a
          PDF tool and not a place to park IDs.
        </p>
        <p>
          Stickers and voice notes are unrelated. If the failure is “couldn’t send” with a red clock, that can be
          network or a file cap, not HEIC. WhatsApp document sends have their own size ceiling. If the JPEG is still
          over that ceiling, lower quality or send fewer pixels — this site does not resize as a separate product, but
          a lower JPEG quality often drops enough for chat.
        </p>

        <h2 className="pt-4 font-display text-xl font-semibold text-ink">Privacy of the convert</h2>
        <p>
          Decode and encode run in this browser tab. Hosting may log that you requested the page. It does not receive
          the photo bytes for conversion. Ads, when they eventually go live after Google review, load from Google and
          do not get the picture. Placeholders sit after a successful convert and in the footer. They never replace
          Convert or Download. Do not click them as a test.
        </p>
        <p>
          Sign-in on this site is optional and never blocks the convert. You can finish a batch and leave without a
          profile. There is no gallery of past jobs to breach, because we do not keep one.
        </p>

        <p>
          Same pain on a PC with no preview:{" "}
          <Link to="/windows" className="text-accent underline-offset-2 hover:underline">
            HEIC on Windows
          </Link>
          . Full walkthrough:{" "}
          <Link to="/how-to" className="text-accent underline-offset-2 hover:underline">
            how to convert
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
