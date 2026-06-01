import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { pageTitle } from "@/lib/i18n";
import { Home } from "@/routes/index";

// Spanish homepage. The locale itself is pinned to "es" by LocaleProvider
// (it sees the /es path), so rendering <Home /> here produces the fully
// translated page server-side — the hreflang target for es-mx.
export const Route = createFileRoute("/es")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.home") },
      { name: "description", content: siteConfig.defaultDescription },
      { property: "og:title", content: pageTitle("nav.home") },
      { property: "og:url", content: "/es" },
    ],
    links: [{ rel: "canonical", href: "/es" }],
  }),
  component: Home,
});
