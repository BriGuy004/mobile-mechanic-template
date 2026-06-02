import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/financing")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.financing") },
      { name: "description", content: t("financing.description") },
      { property: "og:url", content: "/financing" },
    ],
    links: [{ rel: "canonical", href: "/financing" }],
  }),
  component: Financing,
});

function Financing() {
  const c = siteConfig;
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("nav.financing")}</div>
          <h1 className="text-4xl md:text-5xl font-bold">{t("financing.heading")}</h1>
          <p className="mt-4 text-lg text-slate-600">{t("financing.body")}</p>
          <p className="mt-3 text-sm text-slate-500">Through {c.financingPartner}.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
