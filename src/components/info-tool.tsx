import { useCallback, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileSearch, Trash2, Upload, X } from "lucide-react";
import { isLikelyHeic } from "@/lib/heic-convert";
import { parseFtyp, readHeader64, type FtypInfo } from "@/lib/heic-ftyp";
import { cn, formatBytes } from "@/lib/utils";

type Row = {
  id: string;
  name: string;
  size: number;
  mime: string;
  likely: boolean;
  ftyp: FtypInfo;
};

function yn(v: boolean): string {
  return v ? "yes" : "no";
}

export function InfoTool() {
  const [rows, setRows] = useState<Row[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const inspect = useCallback(async (list: FileList | File[]) => {
    setBanner(null);
    const incoming = Array.from(list).slice(0, 20);
    if (!incoming.length) return;
    setBusy(true);
    try {
      const next: Row[] = [];
      for (const file of incoming) {
        const header = await readHeader64(file);
        const ftyp = parseFtyp(header);
        const likely = await isLikelyHeic(file);
        next.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
          name: file.name,
          size: file.size,
          mime: file.type || "(empty)",
          likely,
          ftyp,
        });
      }
      setRows((prev) => [...next, ...prev].slice(0, 20));
    } catch {
      setBanner("Could not read the file header in this tab.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, []);

  return (
    <div className="space-y-6">
      <section
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files?.length) void inspect(e.dataTransfer.files);
        }}
        className={cn(
          "rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-8",
          dragging && "ring-2 ring-accent ring-offset-4 ring-offset-bg",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files) void inspect(e.target.files);
          }}
        />
        <div className="flex min-h-40 flex-col items-center justify-center gap-4 rounded-[var(--radius-md)] border border-dashed border-line bg-bg/50 px-4 py-10 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
            <FileSearch className="size-6" />
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-ink">Drop a file to inspect</p>
            <p className="mt-1 text-sm text-muted">
              Reads 64 bytes in this tab. No JPG, no upload, no decode.
            </p>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-bg hover:bg-accent-hover disabled:opacity-50"
          >
            <Upload className="size-4" />
            {busy ? "Reading…" : "Choose files"}
          </button>
        </div>
        {banner ? <p className="mt-3 text-sm text-danger">{banner}</p> : null}
      </section>

      {rows.length > 0 ? (
        <section className="rounded-[var(--radius-lg)] bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-ink">Header table</h2>
            <button
              type="button"
              onClick={() => setRows([])}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-muted hover:text-danger"
            >
              <Trash2 className="size-4" />
              Clear
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold tracking-[var(--tracking-label)] text-muted uppercase">
                  <th className="py-2 pr-3">File</th>
                  <th className="py-2 pr-3">Size</th>
                  <th className="py-2 pr-3">MIME</th>
                  <th className="py-2 pr-3">isLikelyHeic</th>
                  <th className="py-2 pr-3">ftyp</th>
                  <th className="py-2">Brands</th>
                  <th className="w-10 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-line/70 align-top">
                    <td className="py-3 pr-3">
                      <p className="max-w-[12rem] truncate font-medium text-ink" title={row.name}>
                        {row.name}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-muted">{row.ftyp.headerHex}</p>
                    </td>
                    <td className="py-3 pr-3 tabular-nums text-muted">{formatBytes(row.size)}</td>
                    <td className="py-3 pr-3 text-muted">{row.mime}</td>
                    <td className="py-3 pr-3 font-medium text-ink">{yn(row.likely)}</td>
                    <td className="py-3 pr-3 text-muted">
                      {row.ftyp.found ? `yes · ${row.ftyp.majorBrand}` : "no"}
                      {row.ftyp.looksLike !== "unknown" && row.ftyp.looksLike !== "heic-family" ? (
                        <span className="block text-xs">sniff: {row.ftyp.looksLike}</span>
                      ) : null}
                    </td>
                    <td className="py-3 text-muted">
                      {row.ftyp.compatible.length
                        ? row.ftyp.compatible.join(", ")
                        : "—"}
                      {row.ftyp.sequenceHint ? (
                        <p className="mt-1 text-xs text-ink">{row.ftyp.sequenceHint}</p>
                      ) : null}
                    </td>
                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
                        className="grid size-11 place-items-center rounded-full text-muted hover:bg-bg hover:text-ink"
                        aria-label={`Remove ${row.name}`}
                      >
                        <X className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">
            Need a JPEG?{" "}
            <Link to="/" className="text-accent underline-offset-2 hover:underline">
              Open converter
            </Link>
            . This page never writes one.
          </p>
        </section>
      ) : null}
    </div>
  );
}
