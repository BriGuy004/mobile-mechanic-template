import { createFileRoute } from "@tanstack/react-router";
import { pageTitle, t } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { Contact } from "@/routes/contact";

// Spanish mirror of /contact — same English slug; ES content via LocaleProvider
// (it pins "es" from the /es path). Reuses the EN route's component.
export const Route = createFileRoute("/es/contact")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.contact") },
      { name: "description", content: t("contact.description") },
      { property: "og:title", content: pageTitle("nav.contact") },
      { property: "og:description", content: t("contact.description") },
      { property: "og:url", content: "/es/contact" },
    ],
    links: altLinks("/contact", "es"),
  }),
  component: Contact,
});
