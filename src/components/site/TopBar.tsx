import { Phone, MessageCircle, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t } from "@/lib/i18n";

export function TopBar() {
  const c = siteConfig;
  return (
    <div className="hidden md:block bg-brand-dark text-brand-light text-xs">
      <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href={`tel:${c.mainPhoneTel}`} className="inline-flex items-center gap-1.5 hover:text-white/80">
            <Phone className="w-3.5 h-3.5" /> {c.mainPhone}
          </a>
          {c.spanishSpoken && (
            <span className="inline-flex items-center gap-1.5 opacity-90">
              <MessageCircle className="w-3.5 h-3.5" /> {t("topBar.spanishBadge")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {c.emergencyAvailable && (
            <span className="inline-flex items-center gap-1.5 bg-brand-accent text-white px-2.5 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {t("topBar.emergencyPill")}
            </span>
          )}
          <span className="inline-flex items-center gap-1 opacity-80">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {c.googleAverageRating} · {c.googleReviewCount}+ reviews
          </span>
        </div>
      </div>
    </div>
  );
}
