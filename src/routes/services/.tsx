import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Phone, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { siteConfig, getServiceBySlug } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { Icon } from "@/components/site/Icon";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaBand } from "@/components/site/CtaBand";
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from "@/components/site/Seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const svc = getServiceBySlug(params.slug);
    if (!svc) throw notFound();
    return svc;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const svc = loaderData;
    const title = pageTitle("nav.services", {}).replace(/^[^|]+/, `${svc.name} `);
    const desc = svc.shortDescription;
    return {
      meta: [
        { title: `${svc.name} | ${siteConfig.businessName} | ${siteConfig.primaryCity} HVAC` },
        { name: "description", content: desc },
        { name: "keywords", content: svc.keywords.join(", ") },
        { property: "og:title", content: `${svc.name} | ${siteConfig.businessName}` },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/services/${svc.slug}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/services/${svc.slug}` }],
      scripts: [
        { type: "application/ld+json", children: serviceJsonLd(svc.slug, svc.name, svc.longDescription) },
        { type: "application/ld+json", children: faqJsonLd(svc.faqItems) },
        { type: "application/ld+json", children: breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: svc.name, url: `/services/${svc.slug}` },
        ]) },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold mb-2">Service not found</h1>
      <Link to="/services" className="text-brand-primary font-semibold">View all services →</Link>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const svc = Route.useLoaderData();
  const c = siteConfig;
  const related = c.services.filter((s) => s.category === svc.category && s.slug !== svc.slug).slice(0, 3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <Link to="/services" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-brand-primary mb-4">
            <ArrowLeft className="w-4 h-4" /> All services
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-brand-primary text-white grid place-items-center">
                  <Icon name={svc.icon} className="w-6 h-6" />
                </div>
                {svc.emergency && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-brand-accent text-white px-3 py-1 rounded-full">
                    24/7 Emergency
                  </span>
                )}
                {svc.priceDisplay && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white border border-slate-200 text-brand-dark px-3 py-1 rounded-full">
                    {svc.priceDisplay}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{svc.name} in {c.primaryCity}, {c.stateAbbr}</h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">{svc.longDescription}</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white h-12 font-semibold">
                  <Link to="/contact">{t("services.scheduleThis")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 font-semibold border-brand-primary text-brand-primary">
                  <a href={`tel:${c.mainPhoneTel}`}><Phone className="w-4 h-4 mr-2" />{c.mainPhone}</a>
                </Button>
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">What's included</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              "Licensed, NATE-certified technicians",
              "Upfront flat-rate pricing",
              "All major brands serviced",
              "Workmanship warranty",
              "Same-day service available",
              "Clean, courteous, on-time",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2 text-slate-700">
                <Check className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" /> <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {svc.faqItems.length > 0 && (
        <section className="bg-brand-light py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("services.faqHeading")}</h2>
            <div className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {svc.faqItems.map((f, i) => (
                <button
                  key={f.question}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 hover:bg-slate-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-brand-dark">{f.question}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </div>
                  {openFaq === i && (
                    <p className="mt-3 text-slate-600 leading-relaxed">{f.answer}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("services.relatedHeading")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => <ServiceCard key={r.slug} service={r} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
