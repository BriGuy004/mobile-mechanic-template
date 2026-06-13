import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { About } from "@/routes/about";

// Spanish mirror of /about — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/about")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.about") },
      { name: "description", content: t("about.description") },
      { property: "og:title", content: pageTitle("nav.about") },
      { property: "og:description", content: t("about.description") },
      { property: "og:url", content: "/es/about" },
    ],
    links: altLinks("/about", "es"),
  }),
  component: About,
});
