import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { siteConfig } from "@/config/siteConfig";

const BASE_URL = ""; // TODO: set once project URL is assigned

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/", "/services", "/service-area", "/about", "/reviews",
          "/specials", "/contact", "/financing", "/maintenance-plan",
        ];
        if (siteConfig.emergencyAvailable) staticPaths.push("/emergency");

        const servicePaths = siteConfig.services.map((s) => `/services/${s.slug}`);
        const cityPaths = siteConfig.serviceCities.map((c) => `/service-area/${c.slug}`);

        const urls = [...staticPaths, ...servicePaths, ...cityPaths]
          .map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`)
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
