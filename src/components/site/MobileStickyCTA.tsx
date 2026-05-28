import { Phone, CalendarClock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { t } from "@/lib/i18n";

export function MobileStickyCTA() {
  const c = siteConfig;
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={`tel:${c.mainPhoneTel}`}
          className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold rounded-lg py-3 text-sm"
        >
          <Phone className="w-4 h-4" />
          {t("common.callNow")}
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold rounded-lg py-3 text-sm"
        >
          <CalendarClock className="w-4 h-4" />
          {t("common.scheduleNow")}
        </Link>
      </div>
    </div>
  );
}
