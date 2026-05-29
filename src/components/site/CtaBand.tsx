import { Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  const c = siteConfig;
  return (
    <section className="hero-gradient text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("homepage.finalCta.heading")}
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            {t("homepage.finalCta.subheading")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
          <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white text-base font-semibold h-14 px-8">
            <Link to="/contact">{t("nav.scheduleService")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/0 border-white/40 text-white hover:bg-white/10 text-base font-semibold h-14 px-8">
            <a href={`tel:${c.mainPhoneTel}`}>
              <Phone className="w-4 h-4 mr-2" />
              {c.mainPhone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
