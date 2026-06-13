import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { ServicesIndex } from "@/routes/services/index";

// Spanish mirror of /services — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/services/")({
  head: () => ({
    meta: [
      { title: pageTitle("services.indexTitle") },
      { name: "description", content: t("services.indexDescription") },
      { property: "og:title", content: pageTitle("services.indexTitle") },
      { property: "og:description", content: t("services.indexDescription") },
      { property: "og:url", content: "/es/services" },
    ],
    links: altLinks("/services", "es"),
  }),
  component: ServicesIndex,
});
