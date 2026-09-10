import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "footer" | "after-success";
};

const HUB = "https://ultimatum-hub.vercel.app/";

function hubUrl(): string {
  const raw = String(import.meta.env.VITE_AGENCY_URL || "").trim();
  if (!raw || raw === "#") return HUB;
  return raw;
}

function hubLabel(): string {
  const raw = String(import.meta.env.VITE_AGENCY_NAME || "").trim();
  if (!raw || raw === "Agency") return "Ultimatum hub";
  return raw;
}

/**
 * Soft agency CTA — NOT an ad. Keep separate from AdSense units.
 * Default target is the Ultimatum hub. Env "#" is treated as empty.
 */
export function SoftAgencyCta({ className, variant = "footer" }: Props) {
  const url = hubUrl();
  const name = hubLabel();

  if (variant === "after-success") {
    return (
      <p className={cn("mt-4 text-sm text-muted", className)}>
        Need a custom site or brand system?{" "}
        <a
          href={url}
          className="font-medium text-ink underline-offset-2 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          See {name}
        </a>
        .
      </p>
    );
  }

  return (
    <p className={cn("max-w-xl text-sm leading-relaxed text-ink", className)}>
      Built by {name} — we create $10k websites & brand systems.{" "}
      <a
        href={url}
        className="font-medium underline-offset-2 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        Ultimatum hub
      </a>
    </p>
  );
}
