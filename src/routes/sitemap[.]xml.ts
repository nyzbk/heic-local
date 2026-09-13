import { createFileRoute } from "@tanstack/react-router";
import { CONTENT_LASTMOD, SITE_ORIGIN } from "@/lib/site";

/** HTML indexables only. llms.txt stays on disk for AEO; do not list it here. */
const PATHS = [
  "/",
  "/how-to",
  "/windows",
  "/whatsapp",
  "/iphone",
  "/info",
  "/faq",
  "/use-cases",
  "/contact",
  "/about",
  "/privacy",
  "/terms",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map((path) => {
  const loc = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${CONTENT_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`;
}).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
