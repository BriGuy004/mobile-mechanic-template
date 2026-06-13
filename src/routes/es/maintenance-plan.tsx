import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { Membership } from "@/routes/maintenance-plan";

// Spanish mirror of /maintenance-plan — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/maintenance-plan")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.membership") },
      { name: "description", content: t("membership.description") },
      { property: "og:title", content: pageTitle("nav.membership") },
      { property: "og:description", content: t("membership.description") },
      { property: "og:url", content: "/es/maintenance-plan" },
    ],
    links: altLinks("/maintenance-plan", "es"),
  }),
  component: Membership,
});
