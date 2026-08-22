import { Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/ad-unit";
import { SoftAgencyCta } from "@/components/soft-agency-cta";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line pt-10 pb-28">
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        Everything runs in your browser. Your photos never leave your device.
      </p>

      <div className="mt-4">
        <SoftAgencyCta variant="footer" />
      </div>

      <AdUnit slot="footer" className="mt-10" />

      <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Legal and about">
        <Link to="/privacy" className="text-muted no-underline hover:text-ink">
          Privacy
        </Link>
        <Link to="/terms" className="text-muted no-underline hover:text-ink">
          Terms
        </Link>
        <Link to="/about" className="text-muted no-underline hover:text-ink">
          About
        </Link>
      </nav>

      <p className="mt-6 text-xs text-muted">© {new Date().getFullYear()} HEIC Local</p>
    </footer>
  );
}
