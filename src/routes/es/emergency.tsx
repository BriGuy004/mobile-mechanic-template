import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { Emergency } from "@/routes/emergency";

// Spanish mirror of /emergency — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/emergency")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.emergency") },
      { name: "description", content: t("emergency.description") },
      { property: "og:title", content: pageTitle("nav.emergency") },
      { property: "og:description", content: t("emergency.description") },
      { property: "og:url", content: "/es/emergency" },
    ],
    links: altLinks("/emergency", "es"),
  }),
  component: Emergency,
});
