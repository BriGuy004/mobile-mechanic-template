import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/specials")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.specials") },
      { name: "description", content: t("specials.description") },
      { property: "og:title", content: pageTitle("nav.specials") },
      { property: "og:description", content: t("specials.description") },
      { property: "og:url", content: "/specials" },
    ],
    links: [{ rel: "canonical", href: "/specials" }],
  }),
  component: Specials,
});

function Specials() {
  const c = siteConfig;
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">Specials</div>
          <h1 className="text-4xl md:text-5xl font-bold">{t("specials.heading")}</h1>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          {c.currentSpecials.length === 0 ? (
            <p className="text-slate-600">{t("specials.noOffers")}</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {c.currentSpecials.map((sp) => (
                <div key={sp.title} className="relative bg-gradient-to-br from-brand-primary to-brand-dark text-white rounded-2xl p-7 overflow-hidden card-shadow">
                  <Tag className="absolute -top-3 -right-3 w-24 h-24 text-white/5" />
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">Limited Offer</div>
                  <h3 className="text-2xl font-extrabold mb-2">{sp.title}</h3>
                  <p className="text-white/85 text-sm mb-4">{sp.description}</p>
                  <div className="text-[11px] text-white/60 mb-2">Valid through {sp.validUntil}</div>
                  <div className="text-[10px] text-white/40 mb-4">{sp.legalDisclaimer}</div>
                  <Link to="/contact" className="inline-flex items-center gap-1 text-brand-accent font-semibold text-sm">
                    Claim offer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {c.seniorDiscount.enabled && (
              <div className="bg-brand-light rounded-xl p-6">
                <div className="font-bold mb-1">Senior discount</div>
                <div className="text-slate-600 text-sm">{c.seniorDiscount.percentage}% off all services for customers 65+.</div>
              </div>
            )}
            {c.militaryDiscount.enabled && (
              <div className="bg-brand-light rounded-xl p-6">
                <div className="font-bold mb-1">Military discount</div>
                <div className="text-slate-600 text-sm">{c.militaryDiscount.percentage}% off for active duty and veterans.</div>
              </div>
            )}
          </div>
          <div className="mt-6 bg-brand-light rounded-xl p-6">
            <div className="font-bold mb-1">Federal tax credits</div>
            <div className="text-slate-600 text-sm">{c.taxCreditCallout}</div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
