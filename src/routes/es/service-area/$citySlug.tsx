import { createFileRoute, notFound } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { altLinks } from "@/lib/seo-links";
import { breadcrumbJsonLd } from "@/components/site/Seo";
import { CityPageView } from "@/routes/service-area/$citySlug";

// Spanish mirror of /service-area/$citySlug — English slug kept; reuses the EN
// view. City names are proper nouns (not translated); title/intro come from the
// ES locale dict via t(). LocaleProvider pins "es" from the /es path.
export const Route = createFileRoute("/es/service-area/$citySlug")({
  loader: ({ params }) => {
    const city = siteConfig.serviceCities.find((c) => c.slug === params.citySlug);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    if (!city) {
      return { meta: [{ title: pageTitle("serviceArea.notFound") }, { name: "robots", content: "noindex, follow" }] };
    }
    const url = `/service-area/${city.slug}`;
    const title = t("serviceArea.cityTitle", { city: city.name });
    const desc = t("serviceArea.cityIntro", { city: city.name });
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/es${url}` },
        { property: "og:type", content: "website" },
      ],
      links: altLinks(url, "es"),
      scripts: [{
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Inicio", url: "/es" },
          { name: "Área de Servicio", url: "/es/service-area" },
          { name: city.name, url: `/es${url}` },
        ]),
      }],
    };
  },
  component: () => {
    const { city } = Route.useLoaderData();
    return <CityPageView city={city} />;
  },
});
