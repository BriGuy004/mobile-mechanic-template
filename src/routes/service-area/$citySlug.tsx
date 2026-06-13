import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { altLinks } from "@/lib/seo-links";
import { MapPin, Phone, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon } from "@/components/site/Icon";
import { breadcrumbJsonLd } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/service-area/$citySlug")({
  loader: ({ params }) => {
    const city = siteConfig.serviceCities.find((c) => c.slug === params.citySlug);
    if (!city) throw notFound();
    return { city };
  },
  notFoundComponent: CityNotFound,
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    if (!city) {
      return {
        meta: [
          { title: pageTitle("serviceArea.notFound") },
          { name: "description", content: t("serviceArea.notFoundBody") },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const url = `/service-area/${city.slug}`;
    const title = t("serviceArea.cityTitle", { city: city.name });
    const desc = t("serviceArea.cityIntro", { city: city.name });
    // City-scoped LocalBusiness schema (narrows areaServed to this specific city)
    const cityLocalBusinessJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": siteConfig.jsonLdLocalBusinessType,
      name: `${siteConfig.businessName} — ${city.name}`,
      telephone: siteConfig.mainPhone,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: siteConfig.stateAbbr,
        addressCountry: "US",
      },
      areaServed: { "@type": "City", name: `${city.name}, ${siteConfig.stateAbbr}` },
      url,
    });
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: altLinks(url),
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Service Area", url: "/service-area" },
            { name: city.name, url },
          ]),
        },
        {
          type: "application/ld+json",
          children: cityLocalBusinessJsonLd,
        },
      ],
    };
  },
  component: CityPage,
});

function CityNotFound() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="text-3xl font-bold mb-3">{t("serviceArea.notFound")}</h1>
        <p className="text-slate-600 mb-6">{t("serviceArea.notFoundBody")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/service-area">{t("serviceArea.indexTitle")}</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={`tel:${siteConfig.mainPhoneTel}`}>
              <Phone className="w-4 h-4 mr-2" /> {siteConfig.mainPhone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CityPage() {
  const { city } = Route.useLoaderData();
  return <CityPageView city={city} />;
}

// Exported so the /es/service-area/$citySlug twin can reuse it (locale by path).
export function CityPageView({ city }: { city: (typeof siteConfig.serviceCities)[number] }) {
  const c = siteConfig;
  const featuredServices = c.services.filter((s) => s.featured).slice(0, 6);
  const fallbackServices = featuredServices.length ? featuredServices : c.services.slice(0, 6);
  const nearby = c.serviceCities.filter((x) => x.slug !== city.slug).slice(0, 6);
  const cityTestimonials = c.testimonials.filter((tm) => tm.city === city.name).slice(0, 3);
  const testimonialsToShow = cityTestimonials.length ? cityTestimonials : c.testimonials.slice(0, 3);

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-slate-200" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-primary">{t("nav.home")}</Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link to="/service-area" className="hover:text-brand-primary">{t("nav.serviceArea")}</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700 font-medium">{city.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">
            <MapPin className="w-3 h-3 inline-block mr-1" /> {t("nav.serviceArea")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">
            {t("serviceArea.cityTitle", { city: city.name })}
          </h1>
          <p className="mt-3 text-slate-700 text-lg max-w-2xl">
            {t("serviceArea.cityIntro", { city: city.name })}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link to="/contact">{t("nav.getFreeEstimate")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${c.mainPhoneTel}`}>
                <Phone className="w-4 h-4 mr-2" /> {c.mainPhone}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services in this city */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-6">
            {t("serviceArea.servicesInCity", { city: city.name })}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fallbackServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      {c.trustPillars.length > 0 && (
        <section className="bg-brand-light py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3">
              {t("serviceArea.whyHeading", { city: city.name })}
            </h2>
            <p className="text-slate-700 text-lg max-w-3xl mb-8">
              {t("serviceArea.whyBody", {
                city: city.name,
                technicianCount: c.technicianCount,
              })}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {c.trustPillars.slice(0, 4).map((tp) => (
                <div key={tp.title} className="bg-white rounded-xl p-5 border border-slate-200 card-shadow">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary grid place-items-center mb-3">
                    <Icon name={tp.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-dark mb-1">{tp.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{tp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ZIPs + nearby cities */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10">
          {city.zip.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                {t("serviceArea.zipsHeading", { city: city.name })}
              </h2>
              <div className="flex flex-wrap gap-2">
                {city.zip.map((z) => (
                  <span
                    key={z}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-brand-light text-brand-dark text-sm font-medium border border-slate-200"
                  >
                    {z}
                  </span>
                ))}
              </div>
            </div>
          )}

          {nearby.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-brand-dark mb-4">
                {t("serviceArea.nearbyHeading")}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link
                      to="/service-area/$citySlug"
                      params={{ citySlug: n.slug }}
                      className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 hover:border-brand-primary hover:bg-brand-light transition-colors text-sm"
                    >
                      <MapPin className="w-4 h-4 text-brand-primary" /> {n.name}, {c.stateAbbr}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      {testimonialsToShow.length > 0 && (
        <section className="bg-brand-light py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-6">
              {cityTestimonials.length
                ? `What ${city.name} customers say`
                : t("homepage.reviews.heading")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonialsToShow.map((tm, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 card-shadow">
                  <div className="flex items-center gap-0.5 mb-3" aria-label={`Rating: ${tm.rating} out of 5 stars`}>
                    {Array.from({ length: tm.rating }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic leading-relaxed">"{tm.text}"</p>
                  <p className="mt-3 text-sm font-semibold text-brand-dark">
                    — {tm.author}, {tm.city}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
