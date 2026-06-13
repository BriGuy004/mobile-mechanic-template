import { createFileRoute, Link } from "@tanstack/react-router";
import { altLinks } from "@/lib/seo-links";
import { Phone, Star, MapPin, ShieldCheck, ArrowRight, Tag, Check } from "lucide-react";
import { siteConfig, featuredServices, yearsInBusiness } from "@/config/siteConfig";
import { t, tx, pageTitle } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { CtaBand } from "@/components/site/CtaBand";
import { Icon } from "@/components/site/Icon";
import { DEFAULT_HERO_IMAGE } from "@/lib/serviceImages";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.home") },
      { name: "description", content: siteConfig.defaultDescription },
      { property: "og:title", content: pageTitle("nav.home") },
      { property: "og:description", content: siteConfig.defaultDescription },
      { property: "og:url", content: "/" },
    ],
    links: altLinks("/"),
  }),
  component: Home,
});

// Exported so the /es route can render the same homepage (the LocaleProvider
// pins Spanish for the /es path).
export function Home() {
  const c = siteConfig;
  return (
    <>
      {/* HERO */}
      {(() => {
        // Shop's own hero photo wins; otherwise fall back to the shared
        // vertical-default shop image (license-clean, self-hosted). The
        // gradient branch below stays as a last-resort safety net.
        const configHero =
          typeof c.heroImage === "string" &&
          c.heroImage.length > 0 &&
          !c.heroImage.includes("[EDITOR")
            ? c.heroImage
            : "";
        const heroImg = configHero || DEFAULT_HERO_IMAGE;
        const hasHeroImg = heroImg.length > 0;
        return (
          <section className={`text-white relative overflow-hidden ${hasHeroImg ? "" : "hero-gradient"}`}>
            {hasHeroImg && (
              <>
                {/* Full-bleed background photo. object-position is biased toward
                 * the right so the subject (technician / unit) typically lands
                 * on the right side, leaving the left for the headline + CTAs. */}
                <img
                  src={heroImg}
                  alt={c.heroImageAlt ?? `${c.businessName} — ${c.primaryCity}, ${c.stateAbbr}`}
                  className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-[70%_center]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                {/* Scrim — strong left-side gradient so the headline + subhead +
                 * trust strip stay legible. Heavier on mobile (text overlays the
                 * full image), lighter on desktop where text sits in the left
                 * column and the right shows more photo. */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand-dark-bg)]/95 via-[color:var(--brand-dark-bg)]/75 to-[color:var(--brand-dark-bg)]/35 md:via-[color:var(--brand-dark-bg)]/60 md:to-transparent"
                  aria-hidden
                />
                {/* Subtle warm accent glow top-left for atmosphere */}
                <div
                  className="absolute inset-0 opacity-60 mix-blend-multiply"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse at 10% 20%, color-mix(in oklab, var(--brand-accent) 25%, transparent) 0%, transparent 55%)",
                  }}
                />
              </>
            )}
            {!hasHeroImg && (
              <div
                className="absolute inset-0 opacity-[0.07]"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            )}
            <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:py-32 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
              <MapPin className="w-3.5 h-3.5" /> {t("homepage.hero.eyebrow")}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
              {t("homepage.hero.headline")}
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              {t("homepage.hero.subheadline")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold h-14 px-7 text-base">
                <Link to="/contact">{t("homepage.hero.primaryCta")} <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-brand-primary border-white hover:bg-white/90 font-semibold h-14 px-7 text-base">
                <a href={`tel:${c.mainPhoneTel}`}><Phone className="w-4 h-4 mr-2" />{c.mainPhone}</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              {(() => {
                const gbpUrl = c.googleBusinessProfileUrl;
                const hasGbp =
                  typeof gbpUrl === "string" &&
                  /^https?:\/\//i.test(gbpUrl) &&
                  !gbpUrl.includes("[EDITOR");
                const inner = (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1 font-semibold">{c.googleAverageRating}</span>
                    <span className="text-white/60">
                      {t("homepage.hero.reviewsBadge")}
                    </span>
                  </>
                );
                return hasGbp ? (
                  <a
                    href={gbpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("homepage.reviews.googleBadgeAria")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5">{inner}</div>
                );
              })()}
              <span className="text-white/30">|</span>
              <span>{t("homepage.hero.yearsBadge")}</span>
              {c.licenseNumbers[0] && !c.licenseNumbers[0].includes("[EDITOR") && (
                <>
                  <span className="text-white/30">|</span>
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" />Lic #{c.licenseNumbers[0]}</span>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Offer / trust-stats card. Coexists with the bg photo above —
             * the photo carries the emotional trust (real human, real work),
             * the card carries the proof (numbers + offer) and the second
             * conversion target. */}
            <div className="bg-white text-brand-dark rounded-xl p-6 md:p-7 card-shadow-lg">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-1">{c.firstTimeCustomerOffer.amount} OFF</div>
              <div className="font-bold text-lg mb-1">{tx(c.firstTimeCustomerOffer.description, c.firstTimeCustomerOffer.es?.description)}</div>
              <div className="text-sm text-slate-600 mb-5">{tx(c.leadFormSlaPromise, c.leadFormSlaPromiseEs)}</div>
              {/* Proof stats are config-driven and non-fabricated: Google
                * rating + review count, years in business (from foundedYear),
                * and the number of brands serviced. No invented job/tech
                * counts or BBB fallbacks. */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-2xl font-extrabold text-brand-primary">{c.googleAverageRating}★</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide">{t("homepage.hero.stats.rating")}</div>
                </div>
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-2xl font-extrabold text-brand-primary">{c.googleReviewCount}</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide">{t("homepage.hero.stats.reviews")}</div>
                </div>
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-2xl font-extrabold text-brand-primary">{yearsInBusiness()}+</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide">{t("homepage.hero.stats.years")}</div>
                </div>
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-2xl font-extrabold text-brand-primary">{c.brandsServiced.length}</div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wide">{t("homepage.hero.stats.brands")}</div>
                </div>
              </div>
              <Button asChild className="mt-5 w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold h-12">
                <Link to="/contact">{t("nav.scheduleService")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
        );
      })()}

      {/* SERVICES */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("homepage.services.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("homepage.services.heading")}</h2>
            <p className="mt-3 text-slate-600 text-lg">{t("homepage.services.subheading")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices().map((s) => <ServiceCard key={s.slug} service={s} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:gap-3 transition-all">
              {t("homepage.services.viewAll")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-brand-light py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("homepage.why.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("homepage.why.heading")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.trustPillars.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-brand-primary text-white grid place-items-center mb-4">
                  <Icon name={p.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">{tx(p.title, p.es?.title)}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{tx(p.description, p.es?.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("homepage.serviceArea.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("homepage.serviceArea.heading")}</h2>
            <p className="mt-3 text-slate-600 text-lg">{t("homepage.serviceArea.subheading")}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-[460px] rounded-xl overflow-hidden border border-slate-200 card-shadow">
              <iframe
                title="Service area map"
                src={c.googleMapsEmbedUrl}
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div>
              <div className="text-sm text-slate-500 mb-4">{t("homepage.serviceArea.radiusNote")}</div>
              <div className="flex flex-wrap gap-2">
                {c.serviceCities.map((city) => (
                  <Link
                    key={city.slug}
                    to="/service-area/$citySlug"
                    params={{ citySlug: city.slug }}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-brand-primary hover:text-white text-brand-dark font-medium text-sm px-4 py-2 rounded-full transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" /> {city.name}
                  </Link>
                ))}
              </div>
              <Link to="/service-area" className="mt-6 inline-flex items-center gap-2 text-brand-primary font-semibold">
                {t("homepage.serviceArea.viewAll")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-brand-light py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("homepage.reviews.eyebrow")}</div>
            <h2 className="text-3xl md:text-4xl font-bold">{t("homepage.reviews.heading")}</h2>
          </div>
          <TestimonialCarousel />
          <div className="text-center mt-8">
            <Link to="/reviews" className="inline-flex items-center gap-2 text-brand-primary font-semibold">
              {t("homepage.reviews.readMore")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPECIALS */}
      {c.currentSpecials.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-10">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("homepage.specials.eyebrow")}</div>
              <h2 className="text-3xl md:text-4xl font-bold">{t("homepage.specials.heading")}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {c.currentSpecials.map((sp) => (
                <div key={sp.title} className="relative bg-gradient-to-br from-brand-primary to-brand-dark text-white rounded-xl p-7 overflow-hidden card-shadow">
                  <Tag className="absolute -top-3 -right-3 w-24 h-24 text-white/5" />
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("homepage.specials.badge")}</div>
                  <h3 className="text-2xl font-extrabold mb-2 text-white">{tx(sp.title, sp.es?.title)}</h3>
                  <p className="text-white/85 text-sm mb-4 leading-relaxed">{tx(sp.description, sp.es?.description)}</p>
                  <div className="text-[11px] text-white/60 mb-5">{t("homepage.specials.validThrough", { date: sp.validUntil })}</div>
                  <Link to="/contact" className="inline-flex items-center gap-1 text-brand-accent font-semibold text-sm hover:text-white">
                    {t("homepage.specials.claim")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BRANDS */}
      <section className="bg-brand-light py-12 md:py-16 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">{t("homepage.brands.eyebrow")}</div>
            <h2 className="text-2xl md:text-3xl font-bold">{t("homepage.brands.heading")}</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {c.brandsServiced.map((b) => (
              <div key={b.name} className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold tracking-wide text-sm">
                {b.name}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-slate-500 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {c.certifications.map((cert) => (
              <span key={cert} className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-brand-primary" />{cert}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
