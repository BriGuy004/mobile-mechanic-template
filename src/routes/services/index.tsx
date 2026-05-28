import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaBand } from "@/components/site/CtaBand";
import { breadcrumbJsonLd } from "@/components/site/Seo";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: pageTitle("services.indexTitle") },
      { name: "description", content: t("services.indexDescription") },
      { property: "og:title", content: pageTitle("services.indexTitle") },
      { property: "og:description", content: t("services.indexDescription") },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [{
      type: "application/ld+json",
      children: breadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]),
    }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const cats = Array.from(new Set(siteConfig.services.map((s) => s.category)));
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">Services</div>
          <h1 className="text-4xl md:text-5xl font-bold">{t("services.indexTitle")}</h1>
          <p className="mt-3 text-slate-600 text-lg max-w-2xl">{t("services.indexDescription")}</p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-12">
          {cats.map((cat) => {
            const items = siteConfig.services.filter((s) => s.category === cat);
            return (
              <div key={cat}>
                <h2 className="text-2xl font-bold mb-5 capitalize">{cat === "iaq" ? "Indoor Air Quality" : cat.replace(/-/g, " ")}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((s) => <ServiceCard key={s.slug} service={s} />)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
