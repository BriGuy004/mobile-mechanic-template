import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Star } from "lucide-react";
import { siteConfig, copyrightYear, formatHours } from "@/config/siteConfig";
import { t, tx } from "@/lib/i18n";

const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export function Footer() {
  const c = siteConfig;
  const socials = [
    { url: c.facebookUrl, Icon: Facebook, label: "Facebook" },
    { url: c.instagramUrl, Icon: Instagram, label: "Instagram" },
    { url: c.youtubeUrl, Icon: Youtube, label: "YouTube" },
    { url: c.googleBusinessUrl, Icon: Star, label: "Google Business" },
  ].filter((s) => Boolean(s.url));

  return (
    <footer className="bg-brand-dark text-white/90 mt-16">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-accent grid place-items-center font-black text-lg">
              {c.businessName.charAt(0)}
            </div>
            <div className="font-bold text-white text-lg">{c.businessName}</div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {t("footer.tagline")}
          </p>
          {c.bbbAccreditation.accredited && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-full">
              BBB Accredited · {c.bbbAccreditation.rating}
            </div>
          )}
          {c.licenseNumbers[0] && !c.licenseNumbers[0].includes("[EDITOR") && (
            <div className="mt-3 text-xs text-white/60">
              License #{c.licenseNumbers[0]}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            {t("footer.servicesHeading")}
          </h3>
          <ul className="space-y-2 text-sm">
            {c.services.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="text-white/70 hover:text-white">
                  {tx(s.name, s.es?.name)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="text-brand-accent font-medium hover:text-white">
                {t("services.indexTitle")} →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            {t("footer.serviceAreaHeading")}
          </h3>
          <ul className="space-y-2 text-sm">
            {c.serviceCities.slice(0, 8).map((city) => (
              <li key={city.slug}>
                <Link to="/service-area/$citySlug" params={{ citySlug: city.slug }} className="text-white/70 hover:text-white">
                  {city.name}, {c.stateAbbr}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            {t("footer.contactHeading")}
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${c.mainPhoneTel}`} className="flex items-start gap-2 text-white/80 hover:text-white">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="font-semibold">{c.mainPhone}</span>
              </a>
            </li>
            {c.generalEmail && !c.generalEmail.includes("[EDITOR") && (
              <li>
                <a href={`mailto:${c.generalEmail}`} className="flex items-start gap-2 text-white/80 hover:text-white break-all">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  {c.generalEmail}
                </a>
              </li>
            )}
            <li className="flex items-start gap-2 text-white/80">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{c.street}<br />{c.city}, {c.stateAbbr} {c.zip}</span>
            </li>
          </ul>

          <h4 className="text-white font-semibold mt-6 mb-2 text-xs uppercase tracking-wider">{t("footer.hoursHeading")}</h4>
          <ul className="text-xs text-white/70 space-y-1">
            {dayKeys.map((d) => (
              <li key={d} className="flex justify-between">
                <span>{t(`days.${d}`)}</span>
                <span>{formatHours(c.regularHours[d])}</span>
              </li>
            ))}
          </ul>

          {socials.length > 0 && (
            <>
              <h4 className="text-white font-semibold mt-6 mb-2 text-xs uppercase tracking-wider">
                {t("footer.followHeading")}
              </h4>
              <div className="flex gap-3">
                {socials.map(({ url, Icon, label }) => (
                  <a key={label} href={url!} aria-label={label} target="_blank" rel="noreferrer"
                     className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-white/60">
          <div>{t("footer.copyright", { year: copyrightYear() })}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {c.footerLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>
            ))}
          </div>
        </div>
        {c.footerDisclaimers.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 pb-6 text-[11px] text-white/40">
            {c.footerDisclaimers.join(" · ")}
          </div>
        )}
      </div>
    </footer>
  );
}
