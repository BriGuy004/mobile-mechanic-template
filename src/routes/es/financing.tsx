import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { Financing } from "@/routes/financing";

// Spanish mirror of /financing — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/financing")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.financing") },
      { name: "description", content: t("financing.description") },
      { property: "og:title", content: pageTitle("nav.financing") },
      { property: "og:description", content: t("financing.description") },
      { property: "og:url", content: "/es/financing" },
    ],
    links: altLinks("/financing", "es"),
  }),
  component: Financing,
});
