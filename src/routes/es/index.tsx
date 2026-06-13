import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { pageTitle } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { Home } from "@/routes/index";

// Spanish homepage (/es). LocaleProvider pins "es" from the path, so <Home/>
// renders fully translated server-side. Replaces the former flat es.tsx.
export const Route = createFileRoute("/es/")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.home") },
      { name: "description", content: siteConfig.defaultDescription },
      { property: "og:title", content: pageTitle("nav.home") },
      { property: "og:description", content: siteConfig.defaultDescription },
      { property: "og:url", content: "/es" },
    ],
    links: altLinks("/", "es"),
  }),
  component: Home,
});
