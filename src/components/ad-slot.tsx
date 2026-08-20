import { cn } from "@/lib/utils";

type AdPosition = "above-dropzone" | "between-controls-and-results" | "near-download";

const LABELS: Record<AdPosition, string> = {
  "above-dropzone": "Ad Slot — above-dropzone",
  "between-controls-and-results": "Ad Slot — between-controls-and-results",
  "near-download": "Ad Slot — near-download",
};

export function AdSlot({ position, className }: { position: AdPosition; className?: string }) {
  return (
    <aside
      data-ad-slot={position}
      aria-label="Advertisement placeholder"
      className={cn(
        "flex min-h-16 items-center justify-center rounded-md border border-dashed border-line bg-surface/60 px-4 py-5 text-center",
        className,
      )}
    >
      <p className="text-xs tracking-wide text-muted uppercase">{LABELS[position]}</p>
    </aside>
  );
}
