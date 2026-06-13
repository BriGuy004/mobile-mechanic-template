import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { Reviews } from "@/routes/reviews";

// Spanish mirror of /reviews — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/reviews")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.reviews") },
      { name: "description", content: t("reviews.description") },
      { property: "og:title", content: pageTitle("nav.reviews") },
      { property: "og:description", content: t("reviews.description") },
      { property: "og:url", content: "/es/reviews" },
    ],
    links: altLinks("/reviews", "es"),
  }),
  component: Reviews,
});
