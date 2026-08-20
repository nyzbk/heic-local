export type OutputMime = "image/jpeg" | "image/png";

const MAX_FILE_BYTES = 40 * 1024 * 1024;
const MAX_BATCH_BYTES = 200 * 1024 * 1024;
const MAX_FILES = 50;

export const LIMITS = {
  maxFileBytes: MAX_FILE_BYTES,
  maxBatchBytes: MAX_BATCH_BYTES,
  maxFiles: MAX_FILES,
};

function bitmapToBlob(
  bitmap: ImageBitmap,
  type: OutputMime,
  quality: number,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return Promise.reject(new Error("Canvas is not available in this browser."));
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not encode the image."));
          return;
        }
        resolve(blob);
      },
      type,
      type === "image/jpeg" ? quality : undefined,
    );
  });
}

async function tryNativeDecode(
  file: File,
  type: OutputMime,
  quality: number,
): Promise<Blob | null> {
  if (typeof createImageBitmap !== "function") return null;
  try {
    const bitmap = await createImageBitmap(file);
    if (!bitmap.width || !bitmap.height) {
      bitmap.close();
      return null;
    }
    return await bitmapToBlob(bitmap, type, quality);
  } catch {
    return null;
  }
}

export async function isLikelyHeic(file: File): Promise<boolean> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".heic") || name.endsWith(".heif")) return true;
  const mime = (file.type || "").toLowerCase();
  if (mime === "image/heic" || mime === "image/heif" || mime === "image/heic-sequence") {
    return true;
  }
  try {
    const { isHeic } = await import("heic-to");
    return await isHeic(file);
  } catch {
    return false;
  }
}

export async function convertHeicFile(
  file: File,
  type: OutputMime,
  quality: number,
): Promise<Blob> {
  const native = await tryNativeDecode(file, type, quality);
  if (native) return native;

  const { heicTo } = await import("heic-to");
  return heicTo({
    blob: file,
    type,
    quality: type === "image/jpeg" ? quality : undefined,
  });
}

export function preferredConcurrency(): number {
  if (typeof navigator === "undefined") return 1;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return 1;
  return 2;
}
