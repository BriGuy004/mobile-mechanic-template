import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { Specials } from "@/routes/specials";

// Spanish mirror of /specials — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/specials")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.specials") },
      { name: "description", content: t("specials.description") },
      { property: "og:title", content: pageTitle("nav.specials") },
      { property: "og:description", content: t("specials.description") },
      { property: "og:url", content: "/es/specials" },
    ],
    links: altLinks("/specials", "es"),
  }),
  component: Specials,
});
