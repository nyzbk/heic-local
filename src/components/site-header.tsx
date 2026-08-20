import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function SiteHeader() {
  const { user } = useCurrentUserState();

  return (
    <header className="flex items-center justify-between gap-4 py-5">
      <Link to="/" className="flex min-h-11 items-center gap-2.5 no-underline">
        <span className="grid size-8 place-items-center rounded-md bg-accent text-bg" aria-hidden>
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <circle cx="12" cy="12.5" r="3.2" />
            <rect x="16" y="8" width="2.4" height="1.4" rx="0.4" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="font-display text-lg font-semibold tracking-tight text-ink">HEIC Local</span>
      </Link>

      <div className="flex min-h-11 items-center">
        {user ? (
          <UserButton />
        ) : (
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted no-underline hover:text-ink"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
