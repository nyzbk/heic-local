import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-6 py-16">
      <Link to="/" className="mb-10 text-sm font-medium text-muted no-underline hover:text-ink">
        ← Back to converter
      </Link>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Sign in</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Optional. The converter never requires an account — photos still convert
        locally even if you skip this.
      </p>
      <div className="mt-8 space-y-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              className="flex min-h-12 w-full items-center justify-center rounded-full border border-line bg-surface px-4 text-sm font-semibold text-ink shadow-[var(--shadow-card)] hover:bg-bg"
            >
              Continue with {p.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
      </div>
    </main>
  );
}
