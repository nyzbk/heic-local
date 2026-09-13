export const SITE_ORIGIN = "https://heic-local.vercel.app";
export const SITE_NAME = "HEIC Local";
export const ADSENSE_CLIENT = "ca-pub-7636435144500691";
export const CONTACT_EMAIL = "ultaultimatum@gmail.com";
export const CONTENT_LASTMOD = "2026-09-13";
export const HUB_URL = "https://ultimatum-hub.vercel.app/";
export const HOME_TITLE =
  "Free HEIC to JPG Converter — No Upload, No Signup, No Watermark | HEIC Local";
export const HOME_DESCRIPTION =
  "Convert iPhone HEIC photos to JPG or PNG in this browser tab. No upload, no signup, no watermark. Works on iPhone Safari and Windows. Batch + ZIP.";

export function absUrl(path: string): string {
  if (!path || path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
