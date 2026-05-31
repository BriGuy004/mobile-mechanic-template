import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon } from "@/components/site/Icon";
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/components/site/Seo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = siteConfig.services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  notFoundComponent: ServiceNotFound,
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) {
      return {
        meta: [
          { title: pageTitle("services.notFound") },
          { name: "description", content: t("services.notFoundBody") },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const url = `/services/${service.slug}`;
    return {
      meta: [
        { title: pageTitle("services.indexTitle") + " — " + service.name },
        { name: "description", content: service.shortDescription },
        { property: "og:title", content: `${service.name} | ${siteConfig.businessName}` },
        { property: "og:description", content: service.shortDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.name, url },
          ]),
        },
        {
          type: "application/ld+json",
          children: serviceJsonLd(service.slug, service.name, service.longDescription),
        },
        ...(service.faqItems.length
          ? [{ type: "application/ld+json", children: faqJsonLd(service.faqItems) }]
          : []),
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceNotFound() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="text-3xl font-bold mb-3">{t("services.notFound")}</h1>
        <p className="text-slate-600 mb-6">{t("services.notFoundBody")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/services">{t("services.indexTitle")}</Link>
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

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const related = siteConfig.services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-slate-200" aria-label="Breadcrumb">
        <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-primary">{t("nav.home")}</Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link to="/services" className="hover:text-brand-primary">{t("nav.services")}</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700 font-medium">{service.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">
              {t("nav.services")}
              {service.emergency && (
                <span className="ml-3 inline-flex items-center gap-1 text-[10px] font-bold bg-brand-accent text-white px-2 py-0.5 rounded-full normal-case">
                  {t("services.emergencyBadge")}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">{service.name}</h1>
            <p className="mt-3 text-slate-700 text-lg max-w-2xl">{service.shortDescription}</p>
            {service.priceDisplay && (
              <p className="mt-2 text-brand-primary font-semibold">{service.priceDisplay}</p>
            )}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link to="/contact">{t("services.scheduleThis")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${siteConfig.mainPhoneTel}`}>
                  <Phone className="w-4 h-4 mr-2" /> {siteConfig.mainPhone}
                </a>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex w-32 h-32 rounded-xl bg-brand-primary/10 text-brand-primary items-center justify-center">
            <Icon name={service.icon} className="w-16 h-16" />
          </div>
        </div>
      </section>

      {/* Long description / what's included */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
            {t("services.detailIncludedHeading")}
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
            {service.longDescription}
          </p>
        </div>
      </section>

      {/* Why us — trust pillars */}
      {siteConfig.trustPillars.length > 0 && (
        <section className="bg-brand-light py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-8">
              {t("services.detailWhyHeading")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {siteConfig.trustPillars.slice(0, 4).map((tp) => (
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

      {/* FAQ */}
      {service.faqItems.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-6">
              {t("services.faqHeading")}
            </h2>
            <div className="space-y-3">
              {service.faqItems.map((f, i) => (
                <details key={i} className="group rounded-xl border border-slate-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-brand-dark flex items-start gap-2">
                    <Check className="w-5 h-5 text-brand-primary flex-none mt-0.5" />
                    <span>{f.question}</span>
                  </summary>
                  <p className="mt-3 ml-7 text-slate-700 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-brand-light py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-6">
              {t("services.relatedHeading")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:gap-2 transition-all"
              >
                {t("nav.services")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
