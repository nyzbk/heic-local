import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Download,
  FileImage,
  ImageDown,
  Loader2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import JSZip from "jszip";
import { AdSlot } from "@/components/ad-slot";
import {
  convertHeicFile,
  isLikelyHeic,
  LIMITS,
  preferredConcurrency,
  type OutputMime,
} from "@/lib/heic-convert";
import { cn, formatBytes, swapExtension, todayStamp } from "@/lib/utils";

type OutputKind = "jpg" | "png";
type Status = "queued" | "converting" | "done" | "error";

type Item = {
  id: string;
  file: File;
  status: Status;
  error?: string;
  resultUrl?: string;
  resultBlob?: Blob;
  resultName?: string;
  resultSize?: number;
};

function outputMime(kind: OutputKind): OutputMime {
  return kind === "jpg" ? "image/jpeg" : "image/png";
}

function extFor(kind: OutputKind): string {
  return kind === "jpg" ? "jpg" : "png";
}

export function Converter() {
  const [items, setItems] = useState<Item[]>([]);
  const [dragging, setDragging] = useState(false);
  const [kind, setKind] = useState<OutputKind>("jpg");
  const [quality, setQuality] = useState(90);
  const [busy, setBusy] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [sampleBusy, setSampleBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      }
    };
  }, []);

  const doneCount = items.filter((i) => i.status === "done").length;
  const convertingCount = items.filter((i) => i.status === "converting").length;
  const errorCount = items.filter((i) => i.status === "error").length;
  const totalBytes = items.reduce((sum, i) => sum + i.file.size, 0);

  const addFiles = useCallback(async (list: FileList | File[]) => {
    setBanner(null);
    const incoming = Array.from(list);
    const current = itemsRef.current;
    const remainingSlots = LIMITS.maxFiles - current.length;
    if (remainingSlots <= 0) {
      setBanner(`Batch cap is ${LIMITS.maxFiles} files to keep phones from running out of memory.`);
      return;
    }

    const accepted: Item[] = [];
    let batchBytes = current.reduce((s, i) => s + i.file.size, 0);
    let skipped = 0;

    for (const file of incoming) {
      if (accepted.length >= remainingSlots) {
        skipped += 1;
        continue;
      }
      if (file.size > LIMITS.maxFileBytes) {
        skipped += 1;
        continue;
      }
      if (batchBytes + file.size > LIMITS.maxBatchBytes) {
        skipped += 1;
        continue;
      }
      const heic = await isLikelyHeic(file);
      if (!heic) {
        skipped += 1;
        continue;
      }
      batchBytes += file.size;
      accepted.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        status: "queued",
      });
    }

    if (accepted.length === 0) {
      setBanner(
        skipped
          ? "Those files were skipped — drop HEIC/HEIF photos under 40 MB."
          : "Drop .heic or .heif photos to convert.",
      );
      return;
    }
    if (skipped) {
      setBanner(`${accepted.length} added, ${skipped} skipped (not HEIC, too large, or batch full).`);
    }
    setItems((prev) => [...prev, ...accepted]);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(false);
      if (event.dataTransfer.files?.length) {
        void addFiles(event.dataTransfer.files);
      }
    },
    [addFiles],
  );

  const loadSample = async () => {
    setSampleBusy(true);
    setBanner(null);
    try {
      const res = await fetch("/samples/sample.heic");
      if (!res.ok) throw new Error("missing");
      const blob = await res.blob();
      const file = new File([blob], "iphone-photo.heic", {
        type: "image/heic",
        lastModified: Date.now(),
      });
      await addFiles([file]);
    } catch {
      setBanner("Could not load the sample photo.");
    } finally {
      setSampleBusy(false);
    }
  };

  const clearAll = () => {
    setItems((prev) => {
      for (const item of prev) {
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      }
      return [];
    });
    setBanner(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      const gone = prev.find((i) => i.id === id);
      if (gone?.resultUrl) URL.revokeObjectURL(gone.resultUrl);
      return next;
    });
  };

  const convertAll = async () => {
    const pending = items.filter((i) => i.status === "queued" || i.status === "error");
    if (!pending.length) return;
    setBusy(true);
    setBanner(null);
    const quality01 = quality / 100;
    const mime = outputMime(kind);
    const ext = extFor(kind);
    const limit = preferredConcurrency();
    let cursor = 0;

    const runOne = async (item: Item) => {
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "converting", error: undefined } : i)),
      );
      try {
        const blob = await convertHeicFile(item.file, mime, quality01);
        const name = swapExtension(item.file.name, ext);
        const url = URL.createObjectURL(blob);
        setItems((prev) =>
          prev.map((i) => {
            if (i.id !== item.id) return i;
            if (i.resultUrl) URL.revokeObjectURL(i.resultUrl);
            return {
              ...i,
              status: "done",
              resultBlob: blob,
              resultUrl: url,
              resultName: name,
              resultSize: blob.size,
            };
          }),
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "This photo could not be decoded on this device.";
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "error", error: message } : i)),
        );
      }
    };

    const workers = Array.from({ length: Math.min(limit, pending.length) }, async () => {
      while (cursor < pending.length) {
        const index = cursor;
        cursor += 1;
        const item = pending[index];
        if (item) await runOne(item);
      }
    });

    await Promise.all(workers);
    setBusy(false);
  };

  const downloadZip = async () => {
    const ready = items.filter((i) => i.status === "done" && i.resultBlob && i.resultName);
    if (!ready.length) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      const used = new Set<string>();
      for (const item of ready) {
        let name = item.resultName ?? "photo.jpg";
        if (used.has(name)) {
          const stem = name.replace(/\.[^.]+$/, "");
          const extension = name.split(".").pop() ?? "jpg";
          let n = 2;
          while (used.has(`${stem}-${n}.${extension}`)) n += 1;
          name = `${stem}-${n}.${extension}`;
        }
        used.add(name);
        zip.file(name, item.resultBlob as Blob);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `heic-converted-${todayStamp()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
    }
  };

  const empty = items.length === 0;
  const hasResults = doneCount > 0;

  const summary = useMemo(() => {
    if (empty) return null;
    return `${items.length} photo${items.length === 1 ? "" : "s"} · ${formatBytes(totalBytes)}`;
  }, [empty, items.length, totalBytes]);

  return (
    <div className="space-y-6">
      <AdSlot position="above-dropzone" />

      <section
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-8",
          dragging && "ring-2 ring-accent ring-offset-4 ring-offset-bg",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".heic,.heif,image/heic,image/heif"
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files) void addFiles(e.target.files);
          }}
        />

        {empty ? (
          <div className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-[var(--radius-md)] border border-dashed border-line bg-bg/50 px-4 py-10 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
              <Upload className="size-6" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-ink">Drop HEIC photos here</p>
              <p className="mt-1 text-sm text-muted">iPhone camera-roll files — they never leave this tab</p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-bg transition-colors duration-150 hover:bg-accent-hover sm:flex-none"
              >
                Choose photos
              </button>
              <button
                type="button"
                disabled={sampleBusy}
                onClick={() => void loadSample()}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-bg disabled:opacity-50 sm:flex-none"
              >
                {sampleBusy ? "Loading sample…" : "Try a sample"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-ink">{summary}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 text-sm font-medium text-ink hover:bg-bg"
                >
                  <Upload className="size-4" />
                  Add more
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-muted hover:text-danger"
                >
                  <Trash2 className="size-4" />
                  Clear
                </button>
              </div>
            </div>
            <ul className="divide-y divide-line/80">
              {items.map((item) => (
                <FileRow key={item.id} item={item} onRemove={() => removeItem(item.id)} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold tracking-[var(--tracking-label)] text-muted uppercase">
              Format
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["jpg", "png"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setKind(option)}
                  className={cn(
                    "min-h-12 rounded-md border text-sm font-semibold uppercase tracking-wide transition-colors duration-150",
                    kind === option
                      ? "border-ink bg-ink text-bg"
                      : "border-line bg-bg text-ink hover:border-ink/40",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {kind === "jpg" && (
            <label className="block">
              <span className="flex items-center justify-between text-xs font-semibold tracking-[var(--tracking-label)] text-muted uppercase">
                JPEG quality
                <span className="tabular-nums text-ink">{quality}%</span>
              </span>
              <input
                type="range"
                min={60}
                max={100}
                step={1}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="mt-3 h-11 w-full accent-accent"
              />
            </label>
          )}

          <button
            type="button"
            disabled={empty || busy}
            onClick={() => void convertAll()}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-base font-semibold text-bg transition-colors duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? <Loader2 className="size-5 animate-spin" /> : <ImageDown className="size-5" />}
            {busy ? "Converting…" : "Convert"}
          </button>

          {banner && <p className="text-sm text-danger">{banner}</p>}
          {(convertingCount > 0 || doneCount > 0 || errorCount > 0) && (
            <p className="text-sm text-muted tabular-nums">
              {doneCount} ready
              {convertingCount ? ` · ${convertingCount} working` : ""}
              {errorCount ? ` · ${errorCount} failed` : ""}
            </p>
          )}
        </div>
      </section>

      <AdSlot position="between-controls-and-results" />

      {hasResults && (
        <section className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold">Ready to download</h2>
            <button
              type="button"
              disabled={zipping}
              onClick={() => void downloadZip()}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-bg hover:opacity-90 disabled:opacity-50"
            >
              {zipping ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
              Download all as ZIP
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {items
              .filter((i) => i.status === "done")
              .map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-md bg-bg px-3 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {item.resultUrl ? (
                      <img
                        src={item.resultUrl}
                        alt=""
                        className="size-12 shrink-0 rounded object-cover"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{item.resultName}</p>
                      <p className="text-xs text-muted tabular-nums">
                        {item.resultSize ? formatBytes(item.resultSize) : ""}
                      </p>
                    </div>
                  </div>
                  <a
                    href={item.resultUrl}
                    download={item.resultName}
                    className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-semibold text-bg no-underline hover:bg-accent-hover"
                  >
                    <Download className="size-4" />
                    Download
                  </a>
                </li>
              ))}
          </ul>
        </section>
      )}

      <AdSlot position="near-download" />
    </div>
  );
}

function FileRow({ item, onRemove }: { item: Item; onRemove: () => void }) {
  return (
    <li className="flex items-center gap-3 py-3">
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md bg-bg text-muted">
        {item.status === "done" && item.resultUrl ? (
          <img src={item.resultUrl} alt="" className="size-10 object-cover" />
        ) : item.status === "converting" ? (
          <Loader2 className="size-4 animate-spin text-accent" />
        ) : item.status === "error" ? (
          <X className="size-4 text-danger" />
        ) : item.status === "done" ? (
          <Check className="size-4 text-ok" />
        ) : (
          <FileImage className="size-4" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.file.name}</p>
        <p className="text-xs text-muted tabular-nums">
          {formatBytes(item.file.size)}
          {item.status === "converting" ? " · converting" : ""}
          {item.status === "error" && item.error ? ` · ${item.error}` : ""}
          {item.status === "done" && item.resultSize ? ` → ${formatBytes(item.resultSize)}` : ""}
        </p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="grid size-11 shrink-0 place-items-center rounded-full text-muted hover:bg-bg hover:text-ink"
        aria-label={`Remove ${item.file.name}`}
      >
        <X className="size-4" />
      </button>
    </li>
  );
}
