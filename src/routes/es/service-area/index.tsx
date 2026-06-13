import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { ServiceAreaIndex } from "@/routes/service-area/index";

// Spanish mirror of /service-area — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/service-area/")({
  head: () => ({
    meta: [
      { title: pageTitle("serviceArea.indexTitle") },
      { name: "description", content: t("serviceArea.indexDescription") },
      { property: "og:title", content: pageTitle("serviceArea.indexTitle") },
      { property: "og:description", content: t("serviceArea.indexDescription") },
      { property: "og:url", content: "/es/service-area" },
    ],
    links: altLinks("/service-area", "es"),
  }),
  component: ServiceAreaIndex,
});
