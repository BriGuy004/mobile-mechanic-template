import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { CtaBand } from "@/components/site/CtaBand";
import { breadcrumbJsonLd } from "@/components/site/Seo";

export const Route = createFileRoute("/service-area/")({
  head: () => ({
    meta: [
      { title: pageTitle("serviceArea.indexTitle") },
      { name: "description", content: t("serviceArea.indexDescription") },
      { property: "og:title", content: pageTitle("serviceArea.indexTitle") },
      { property: "og:description", content: t("serviceArea.indexDescription") },
      { property: "og:url", content: "/service-area" },
    ],
    links: [{ rel: "canonical", href: "/service-area" }],
    scripts: [{
      type: "application/ld+json",
      children: breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Service Area", url: "/service-area" },
      ]),
    }],
  }),
  component: ServiceAreaIndex,
});

function ServiceAreaIndex() {
  const c = siteConfig;
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">Service Area</div>
          <h1 className="text-4xl md:text-5xl font-bold">HVAC service across {c.primaryCity} & beyond</h1>
          <p className="mt-3 text-slate-600 text-lg max-w-2xl">{t("serviceArea.indexDescription")}</p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-slate-200 card-shadow aspect-[4/3]">
            <iframe
              title="Service area"
              src={c.googleMapsEmbedUrl}
              width="100%" height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Cities we serve</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {c.serviceCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    to="/service-area/$citySlug"
                    params={{ citySlug: city.slug }}
                    className="flex items-center justify-between gap-2 p-3 rounded-lg border border-slate-200 hover:border-brand-primary hover:bg-brand-light transition-colors"
                  >
                    <span className="inline-flex items-center gap-2 font-medium text-brand-dark">
                      <MapPin className="w-4 h-4 text-brand-primary" /> {city.name}, {c.stateAbbr}
                    </span>
                    <span className="text-xs text-slate-500">{city.zip[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
