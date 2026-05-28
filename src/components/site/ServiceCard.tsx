import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/siteConfig";
import { Icon } from "./Icon";
import { t } from "@/lib/i18n";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group relative block bg-white border border-slate-200 rounded-xl p-6 card-shadow hover:card-shadow-lg hover:-translate-y-0.5 transition-all"
    >
      {service.emergency && (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-bold bg-brand-accent text-white px-2 py-0.5 rounded-full">
          {t("services.emergencyBadge")}
        </span>
      )}
      <div className="w-12 h-12 rounded-lg bg-brand-primary/10 text-brand-primary grid place-items-center mb-4">
        <Icon name={service.icon} className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-brand-dark text-lg mb-2">{service.name}</h3>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">{service.shortDescription}</p>
      <div className="flex items-center justify-between mt-auto">
        {service.priceDisplay && (
          <span className="text-xs font-semibold text-brand-primary">{service.priceDisplay}</span>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary group-hover:gap-2 transition-all">
          {t("services.learnMore")} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
