import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "footer" | "after-success";
};

/**
 * Soft agency CTA — NOT an ad. Keep separate from AdSense units.
 * Env: VITE_AGENCY_URL, VITE_AGENCY_NAME
 */
export function SoftAgencyCta({ className, variant = "footer" }: Props) {
  const url = (import.meta.env.VITE_AGENCY_URL as string) || "#";
  const name = (import.meta.env.VITE_AGENCY_NAME as string) || "Agency";

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
      Built by {name} — we create $10k websites &amp; brand systems.{" "}
      <a
        href={url}
        className="font-medium underline-offset-2 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        Portfolio
      </a>
    </p>
  );
}
