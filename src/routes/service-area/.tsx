import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Phone, Star } from "lucide-react";
import { siteConfig, getCityBySlug, yearsInBusiness } from "@/config/siteConfig";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/site/ServiceCard";
import { LeadForm } from "@/components/site/LeadForm";
import { CtaBand } from "@/components/site/CtaBand";
import { breadcrumbJsonLd } from "@/components/site/Seo";

export const Route = createFileRoute("/service-area/$citySlug")({
  loader: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    if (!city) throw notFound();
    return city;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const city = loaderData;
    const title = `${siteConfig.verticalNoun} Service in ${city.name}, ${siteConfig.stateAbbr} | ${siteConfig.businessName}`;
    const desc = t("serviceArea.cityIntro", { city: city.name });
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/service-area/${city.slug}` },
      ],
      links: [{ rel: "canonical", href: `/service-area/${city.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Service Area", url: "/service-area" },
          { name: city.name, url: `/service-area/${city.slug}` },
        ]),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-2">City not found</h1>
      <Link to="/service-area" className="text-brand-primary font-semibold">View all service areas →</Link>
    </div>
  ),
  component: CityPage,
});

function CityPage() {
  const city = Route.useLoaderData();
  const c = siteConfig;
  const featured = c.services.filter((s) => s.featured);

  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <Link to="/service-area" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-brand-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> All service areas
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                <MapPin className="w-3.5 h-3.5" /> ZIP codes: {city.zip.join(", ")}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {t("serviceArea.cityTitle", { city: city.name })}
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {t("serviceArea.cityIntro", { city: city.name })}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white h-12 font-semibold">
                  <Link to="/contact">{t("common.scheduleNow")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 font-semibold border-brand-primary text-brand-primary">
                  <a href={`tel:${c.mainPhoneTel}`}><Phone className="w-4 h-4 mr-2" />{c.mainPhone}</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  {Array.from({length:5}).map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  {c.googleAverageRating} ({c.googleReviewCount}+)
                </span>
                <span>•</span>
                <span>{yearsInBusiness()}+ years serving {city.name}</span>
              </div>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{siteConfig.verticalNoun} services in {city.name}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
