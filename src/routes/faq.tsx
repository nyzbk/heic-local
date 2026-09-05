import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ITEMS = [
  {
    q: "Do HEIC files leave this device?",
    a: "No. Decode and encode run in this browser tab with JavaScript. Hosting may log that you requested the page (IP, user-agent). That is ordinary HTTPS traffic. It is not the photo bytes. We do not provide an upload API for conversion, we do not store the roll, and closing the tab discards the decoded pixels. That is the difference from typical “free HEIC converter” sites, which send the file to a machine you do not control.",
  },
  {
    q: "Do I need an account?",
    a: "No. Sign-in on this site is optional and never blocks Convert or Download. There is no quota tied to a profile because conversion does not need a profile. You can finish a batch of iPhone stills and leave without creating an account. If a future optional feature ever needed sign-in, it would not gate the converter on this page.",
  },
  {
    q: "Is there a watermark or daily cap?",
    a: "No watermark on the pixels. No paid daily cap. Soft memory guards sit around 40 MB per photo, 50 files, and 200 MB per batch so a phone tab survives the job. Those numbers are RAM limits, not a pricing tier. If a batch is too heavy, do fewer files per pass or use a laptop.",
  },
  {
    q: "Does it work in iPhone Safari?",
    a: "Yes. Safari often decodes HEIC natively. If it cannot, a WebAssembly decoder runs on the phone. Keep the tab in the foreground until the download starts. Backgrounded Safari can drop the decoder. Chrome on iOS is still WebKit; treat it like Safari. A desktop browser usually has more RAM, so a 40-file batch is more likely to finish on a laptop than on an old phone.",
  },
  {
    q: "JPG or PNG?",
    a: "JPG for chat, email, Teams, and sites that only accept JPEG. Default quality is 90 and is adjustable. PNG when you want lossless pixels of the decoded frame — screenshots, type, hard edges, or a next step that hates JPEG blocking. PNG is usually larger. WhatsApp desktop prefers JPEG. Print kiosks usually accept both; JPG at 90 or higher is the safer attach.",
  },
  {
    q: "Will JPEG quality destroy the shot?",
    a: "Any JPEG is lossy. At 90 most phone stills look fine for sharing. If you will edit again, stay high or use PNG. We do not run an extra “enhance” filter, we do not upsample, and we do not pretend HDR looks identical after sRGB JPEG. Wide-gamut Display P3 shots can shift slightly. That is the JPEG path, not a server filter.",
  },
  {
    q: "What happens to EXIF and GPS?",
    a: "The tool’s job is pixels. Do not assume every metadata field survives every encoder path (native Safari vs WASM). If you must strip GPS before a public post, use a dedicated metadata stripper after you have the JPG. If you must keep a full-fidelity master, keep the original HEIC in Photos. The download is a sharing copy.",
  },
  {
    q: "Live Photo and Portrait depth?",
    a: "You get the still. The short Live Photo video is not exported. Portrait depth maps are not a separate file here. Keep the original in Photos if you still need those extras. Burst or multi-image HEIF sequences may need the key still exported from Photos first. A video renamed to .heic will fail on purpose — this page is for photos.",
  },
  {
    q: "Why convert if iPhone can already “Most Compatible”?",
    a: "Camera setting “Most Compatible” writes JPEG going forward. It does not rewrite the years of HEIC already on the roll. It also wastes space on every future shot. This page is for the files you already have, and for one-off shares, without changing the system default.",
  },
  {
    q: "Can I use it after the first load with the network off?",
    a: "Conversion itself does not need the network once the page and decoder are loaded. The first visit does, and ads will. If you reload a cold tab offline, the decoder may be gone. That is the script, not an upload of your pictures.",
  },
  {
    q: "Windows shows a blank icon. Is the file broken?",
    a: "Usually not. Explorer needs a HEIC/HEVC decoder that Windows does not ship by default. Microsoft’s store pack can teach Explorer to preview. For a one-off share, convert to JPG here and send that. Do not rename .heic to .jpg. Longer notes: the Windows guide.",
  },
  {
    q: "WhatsApp desktop says unsupported. What do I send?",
    a: "Send the JPEG from this tab, not the original HEIC. WhatsApp on iPhone may look fine while the desktop client never learned the container. Keep Camera on High Efficiency. Convert the three files that matter. Longer notes: the WhatsApp guide.",
  },
  {
    q: "Gmail or Outlook will not preview the photo.",
    a: "Many desktop mail clients preview JPEG and PNG, not HEIC. Convert, attach the JPG, leave the HEIC on the phone. If the problem is file size, not type, lower JPEG quality. This site does not email the file for you.",
  },
  {
    q: "Why a vercel.app URL? Is that safe?",
    a: "It is the production host. HTTPS is valid. There is no login wall on Convert. The converter still runs in your tab; the host serves HTML, JavaScript, fonts, and the decoder script. A custom domain can come later. It would not change the local-processing model.",
  },
  {
    q: "When do ads show?",
    a: "Placeholders sit between actions (mid / after a successful convert / footer). They never replace the Convert or Download control. Until Google marks the site Ready they are not live ads. We do not pay you to click, we do not instruct you to click. Please do not click ads as a favour — that violates Google policy.",
  },
  {
    q: "Who runs this?",
    a: "An independent publisher that ships local-first free tools. Contact: ultaultimatum@gmail.com. Include the page URL, the browser, and what you expected. Do not email the photos unless asked. There is no phone support and no chat overlay on the drop zone.",
  },
  {
    q: "The thumbnail is blank or the job stalls.",
    a: "Check the file is a still, not a renamed video. Stay under the size guards. Keep Safari in the foreground. If it is a multi-image HEIF sequence, export the key still from Photos first. If a work PC blocks JavaScript, the decoder cannot run — allow scripts for this origin or use another browser for the batch.",
  },
];

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "HEIC Local FAQ — upload, Safari, Live Photo, Windows, WhatsApp" },
      {
        name: "description",
        content:
          "Answers for HEIC Local: files stay on device, Safari and WASM decode, Live Photo stills, JPG vs PNG, Windows blank icons, WhatsApp desktop, ads placement.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
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
          {ITEMS.map((item) => (
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
