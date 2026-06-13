import { createFileRoute, Link } from "@tanstack/react-router";
import { altLinks } from "@/lib/seo-links";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t, isEs, pageTitle } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/maintenance-plan")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.membership") },
      { name: "description", content: t("membership.description") },
      { property: "og:url", content: "/maintenance-plan" },
    ],
    links: altLinks("/maintenance-plan"),
  }),
  component: Membership,
});

export function Membership() {
  const m = siteConfig.membershipProgram;
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("nav.membership")}</div>
          <h1 className="text-4xl md:text-5xl font-bold">{t("membership.heading")}</h1>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold mb-5">{t("membership.benefitsHeading")}</h2>
          <ul className="space-y-3">
            {(isEs() && m.es?.benefits?.length ? m.es.benefits : m.benefits).map((b) => (
              <li key={b} className="flex items-start gap-2 text-slate-700">
                <Check className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" /> <span>{b}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8 bg-brand-accent hover:bg-brand-accent/90 text-white h-12 px-6 font-semibold">
            <Link to="/contact">{t("membership.joinCta")}</Link>
          </Button>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
