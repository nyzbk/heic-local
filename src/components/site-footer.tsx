export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line pt-10 pb-28">
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        Everything runs in your browser. Your photos never leave your device.
      </p>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink">
        Built by Agency — we create $10k websites & brand systems.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        <Faq
          q="Are my photos uploaded to a server?"
          a="No. Conversion happens entirely in this tab. You can confirm it in DevTools: the Network panel stays quiet while files convert."
        />
        <Faq
          q="Is there a file size limit?"
          a="No daily quota and no watermark. There is a soft browser-memory guard: about 40 MB per photo, 50 files, 200 MB per batch."
        />
        <Faq
          q="Does it work on iPhone?"
          a="Yes. Safari can often decode HEIC natively; if not, a WebAssembly decoder runs locally on the phone."
        />
      </div>
    </footer>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h2 className="font-display text-base font-semibold text-ink">{q}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
    </div>
  );
}
