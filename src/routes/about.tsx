import { createFileRoute } from "@tanstack/react-router";
import { Award, Star, Users, Wrench } from "lucide-react";
import { siteConfig, yearsInBusiness } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.about") },
      { name: "description", content: t("about.description") },
      { property: "og:title", content: pageTitle("nav.about") },
      { property: "og:description", content: t("about.description") },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const c = siteConfig;
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">About</div>
          <h1 className="text-4xl md:text-5xl font-bold">{t("about.heading")}</h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">{t("about.body")}</p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { Icon: Award, label: "Years in business", value: `${yearsInBusiness()}+` },
            { Icon: Wrench, label: "Jobs completed", value: `${c.completedJobs.toLocaleString()}+` },
            { Icon: Users, label: "Technicians", value: c.technicianCount },
            { Icon: Star, label: "Avg. rating", value: c.googleAverageRating },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="bg-brand-light rounded-xl p-6 text-center">
              <Icon className="w-7 h-7 mx-auto text-brand-primary mb-3" />
              <div className="text-3xl font-extrabold text-brand-dark">{value}</div>
              <div className="text-sm text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-3xl px-6 mt-12">
          <h2 className="text-2xl font-bold mb-4">Credentials</h2>
          <ul className="space-y-2 text-slate-700">
            <li>License: {c.licenseNumbers.join(", ")}</li>
            <li>{c.certifications.join(" · ")}</li>
            <li>{c.insuranceCarrier}</li>
            {c.bbbAccreditation.accredited && <li>BBB Accredited · Rating {c.bbbAccreditation.rating}</li>}
            {c.awardsList.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
