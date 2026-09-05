import { createFileRoute } from "@tanstack/react-router";

const PATHS = [
  "/",
  "/how-to",
  "/windows",
  "/whatsapp",
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
      GET: async ({ request }: { request: Request }) => {
        const origin = new URL(request.url).origin;
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map(
  (path) => `  <url>
    <loc>${origin}${path === "/" ? "" : path}</loc>
    <lastmod>2026-09-05</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
