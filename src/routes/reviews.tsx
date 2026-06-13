import { createFileRoute } from "@tanstack/react-router";
import { altLinks } from "@/lib/seo-links";
import { Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.reviews") },
      { name: "description", content: t("reviews.description") },
      { property: "og:title", content: pageTitle("nav.reviews") },
      { property: "og:description", content: t("reviews.description") },
      { property: "og:url", content: "/reviews" },
    ],
    links: altLinks("/reviews"),
  }),
  component: Reviews,
});

export function Reviews() {
  const c = siteConfig;
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("nav.reviews")}</div>
          <h1 className="text-4xl md:text-5xl font-bold">{t("reviews.heading")}</h1>
          {c.googleReviewCount > 0 && (
          <div className="mt-4 flex items-center justify-center gap-1">
            {Array.from({length:5}).map((_,i) => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
          </div>
          )}
        </div>
      </section>
      {c.testimonials.length > 0 && (
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-5">
          {c.testimonials.map((tst, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 card-shadow">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({length: tst.rating}).map((_,i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-slate-700 leading-relaxed">"{tst.text}"</p>
              <div className="mt-4 text-sm">
                <div className="font-semibold text-brand-dark">{tst.author}</div>
                <div className="text-slate-500">{tst.city}, {c.stateAbbr}{tst.service && ` • ${tst.service}`}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}
      <CtaBand />
    </>
  );
}
