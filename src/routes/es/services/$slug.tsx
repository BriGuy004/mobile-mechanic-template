import { createFileRoute, notFound } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { pageTitle } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { breadcrumbJsonLd } from "@/components/site/Seo";
import { ServiceDetailView } from "@/routes/services/$slug";

// Spanish mirror of /services/$slug — English slug kept; reuses the EN view.
// Service name/desc fall back to English until a per-service `es` overlay lands
// (batch-3 Spanish content); LocaleProvider still pins "es" for chrome copy.
export const Route = createFileRoute("/es/services/$slug")({
  loader: ({ params }) => {
    const service = siteConfig.services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) {
      return { meta: [{ title: pageTitle("services.notFound") }, { name: "robots", content: "noindex, follow" }] };
    }
    const url = `/services/${service.slug}`;
    return {
      meta: [
        { title: pageTitle("services.indexTitle") + " — " + service.name },
        { name: "description", content: service.shortDescription },
        { property: "og:title", content: `${service.name} | ${siteConfig.businessName}` },
        { property: "og:description", content: service.shortDescription },
        { property: "og:url", content: `/es${url}` },
        { property: "og:type", content: "website" },
      ],
      links: altLinks(url, "es"),
      scripts: [{
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Inicio", url: "/es" },
          { name: "Servicios", url: "/es/services" },
          { name: service.name, url: `/es${url}` },
        ]),
      }],
    };
  },
  component: () => {
    const { service } = Route.useLoaderData();
    return <ServiceDetailView service={service} />;
  },
});
