/** Read the first 64 bytes of an ISO-BMFF file and parse `ftyp` if present.
 *  No decode, no heicTo, no canvas. */

export type FtypInfo = {
  found: boolean;
  boxSize: number | null;
  majorBrand: string | null;
  minorVersion: number | null;
  compatible: string[];
  headerHex: string;
  looksLike: "heic-family" | "jpeg" | "png" | "webp" | "gif" | "unknown";
  sequenceHint: string | null;
};

const HEIC_FAMILY = new Set([
  "heic",
  "heix",
  "hevc",
  "hevx",
  "heim",
  "heis",
  "hevm",
  "hevs",
  "mif1",
  "msf1",
]);

function fourcc(bytes: Uint8Array, offset: number): string {
  if (offset + 4 > bytes.length) return "";
  return String.fromCharCode(bytes[offset]!, bytes[offset + 1]!, bytes[offset + 2]!, bytes[offset + 3]!);
}

function u32(bytes: Uint8Array, offset: number): number {
  if (offset + 4 > bytes.length) return 0;
  return (
    ((bytes[offset]! << 24) | (bytes[offset + 1]! << 16) | (bytes[offset + 2]! << 8) | bytes[offset + 3]!) >>> 0
  );
}

function toHex(bytes: Uint8Array, max = 16): string {
  const n = Math.min(bytes.length, max);
  const parts: string[] = [];
  for (let i = 0; i < n; i++) parts.push(bytes[i]!.toString(16).padStart(2, "0"));
  return parts.join(" ").toUpperCase();
}

function sniff(bytes: Uint8Array): FtypInfo["looksLike"] {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }
  if (bytes.length >= 12 && fourcc(bytes, 0) === "RIFF" && fourcc(bytes, 8) === "WEBP") return "webp";
  if (bytes.length >= 6 && fourcc(bytes, 0).startsWith("GIF8")) return "gif";
  return "unknown";
}

function sequenceHint(brands: string[]): string | null {
  const set = new Set(brands.map((b) => b.toLowerCase()));
  if (set.has("msf1")) {
    return "msf1 — sequence container. May be a burst or a Live Photo still. This page does not unpack the movie.";
  }
  if (set.has("heim") || set.has("heis") || set.has("hevm") || set.has("hevs")) {
    return "Sequence-related HEIF brand. Not a single still for sure. This page does not unpack frames.";
  }
  return null;
}

export function parseFtyp(bytes: Uint8Array): FtypInfo {
  const headerHex = toHex(bytes, 16);
  const looksLike = sniff(bytes);
  const empty: FtypInfo = {
    found: false,
    boxSize: null,
    majorBrand: null,
    minorVersion: null,
    compatible: [],
    headerHex,
    looksLike,
    sequenceHint: null,
  };
  if (bytes.length < 12) return empty;

  let offset = 0;
  // First box is usually ftyp. If not, scan the 64-byte window for "ftyp".
  let type = fourcc(bytes, 4);
  if (type !== "ftyp") {
    const asStr = Array.from(bytes)
      .map((b) => String.fromCharCode(b))
      .join("");
    const idx = asStr.indexOf("ftyp");
    if (idx < 4) return empty;
    offset = idx - 4;
    type = fourcc(bytes, offset + 4);
    if (type !== "ftyp") return empty;
  }

  const boxSize = u32(bytes, offset);
  if (boxSize < 16) return empty;
  const majorBrand = fourcc(bytes, offset + 8);
  const minorVersion = u32(bytes, offset + 12);
  const compatible: string[] = [];
  let cursor = offset + 16;
  const end = Math.min(bytes.length, offset + boxSize);
  while (cursor + 4 <= end) {
    const brand = fourcc(bytes, cursor);
    if (brand.trim()) compatible.push(brand);
    cursor += 4;
  }

  const brands = [majorBrand, ...compatible].filter(Boolean);
  const heicFamily = brands.some((b) => HEIC_FAMILY.has(b.toLowerCase()));

  return {
    found: true,
    boxSize,
    majorBrand,
    minorVersion,
    compatible,
    headerHex,
    looksLike: heicFamily ? "heic-family" : looksLike,
    sequenceHint: sequenceHint(brands),
  };
}

export async function readHeader64(file: File): Promise<Uint8Array> {
  const slice = file.slice(0, 64);
  const buf = await slice.arrayBuffer();
  return new Uint8Array(buf);
}
