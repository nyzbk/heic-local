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

      <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Site">
        <Link to="/how-to" className="text-muted no-underline hover:text-ink">
          How to
        </Link>
        <Link to="/faq" className="text-muted no-underline hover:text-ink">
          FAQ
        </Link>
        <Link to="/use-cases" className="text-muted no-underline hover:text-ink">
          Use cases
        </Link>
        <Link to="/about" className="text-muted no-underline hover:text-ink">
          About
        </Link>
        <Link to="/contact" className="text-muted no-underline hover:text-ink">
          Contact
        </Link>
        <Link to="/privacy" className="text-muted no-underline hover:text-ink">
          Privacy
        </Link>
        <Link to="/terms" className="text-muted no-underline hover:text-ink">
          Terms
        </Link>
      </nav>

      <p className="mt-6 text-xs text-muted">© {new Date().getFullYear()} HEIC Local</p>
    </footer>
  );
}
