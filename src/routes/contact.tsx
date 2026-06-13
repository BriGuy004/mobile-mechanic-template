import { createFileRoute } from "@tanstack/react-router";
import { altLinks } from "@/lib/seo-links";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig, formatHours } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { LeadForm } from "@/components/site/LeadForm";

const dayLabels: Record<string, string> = { mon:"Monday", tue:"Tuesday", wed:"Wednesday", thu:"Thursday", fri:"Friday", sat:"Saturday", sun:"Sunday" };

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.contact") },
      { name: "description", content: t("contact.description") },
      { property: "og:title", content: pageTitle("nav.contact") },
      { property: "og:description", content: t("contact.description") },
      { property: "og:url", content: "/contact" },
    ],
    links: altLinks("/contact"),
  }),
  component: Contact,
});

export function Contact() {
  const c = siteConfig;
  return (
    <>
      <section className="bg-brand-light border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("nav.contact")}</div>
          <h1 className="text-4xl md:text-5xl font-bold">{t("contact.heading")}</h1>
          <p className="mt-3 text-slate-600 text-lg max-w-xl">{t("contact.subheading")}</p>
        </div>
      </section>
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-start">
          <LeadForm />
          <div className="space-y-6">
            <div className="bg-brand-light rounded-xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-primary mt-0.5" />
                <div>
                  <div className="text-xs uppercase text-slate-500">{t("contact.phoneHeading")}</div>
                  <a href={`tel:${c.mainPhoneTel}`} className="font-bold text-brand-dark text-lg">{c.mainPhone}</a>
                </div>
              </div>
              {c.generalEmail && !c.generalEmail.includes("[EDITOR") && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div>
                    <div className="text-xs uppercase text-slate-500">{t("contact.emailHeading")}</div>
                    <a href={`mailto:${c.generalEmail}`} className="font-semibold text-brand-dark break-all">{c.generalEmail}</a>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
                <div>
                  <div className="text-xs uppercase text-slate-500">{t("contact.addressHeading")}</div>
                  <div className="font-semibold text-brand-dark">{c.street}<br />{c.city}, {c.stateAbbr} {c.zip}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-primary mt-0.5" />
                <div className="w-full">
                  <div className="text-xs uppercase text-slate-500 mb-1">{t("contact.hoursHeading")}</div>
                  <ul className="text-sm text-brand-dark space-y-0.5">
                    {Object.entries(c.regularHours).map(([d, h]) => (
                      <li key={d} className="flex justify-between gap-4">
                        <span>{dayLabels[d]}</span><span>{formatHours(h)}</span>
                      </li>
                    ))}
                  </ul>
                  {c.emergencyAvailable && (
                    <div className="mt-3 text-xs text-brand-accent font-semibold">{c.emergencyHoursText}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
              <iframe title="Map" src={c.googleMapsEmbedUrl} width="100%" height="100%" style={{border:0}} loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
