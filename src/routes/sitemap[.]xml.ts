import { createFileRoute } from "@tanstack/react-router";

const SITE_ORIGIN = "https://heic-local.vercel.app";

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
  "/llms.txt",
];

const LASTMOD: Record<string, string> = {
  "/": "2026-09-08",
  "/how-to": "2026-09-08",
  "/iphone": "2026-09-08",
  "/info": "2026-09-10",
  "/faq": "2026-09-08",
  "/contact": "2026-09-08",
  "/privacy": "2026-09-08",
  "/terms": "2026-09-08",
  "/llms.txt": "2026-09-11",
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map((path) => {
  const loc = path === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
  const lastmod = LASTMOD[path] ?? "2026-09-05";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
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
