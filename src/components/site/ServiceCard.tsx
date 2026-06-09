import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/config/siteConfig";
import { Icon } from "./Icon";
import { t, tx } from "@/lib/i18n";
import { getServiceImage, getServiceImageAlt } from "@/lib/serviceImages";

export function ServiceCard({ service }: { service: Service }) {
  const img = getServiceImage(service.slug);
  const imgAlt = getServiceImageAlt(service.slug) ?? "";
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group relative flex h-full flex-col overflow-hidden bg-white border border-slate-200 rounded-xl card-shadow hover:card-shadow-lg hover:-translate-y-0.5 transition-all"
    >
      {/* Photo header — the per-service vertical default. Falls back to the
          service icon on a brand-tinted panel when no default image exists. */}
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-primary/5">
        {img ? (
          <img
            src={img}
            alt={imgAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
            width={1100}
            height={688}
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-brand-primary/70">
            <Icon name={service.icon} className="w-10 h-10" />
          </div>
        )}
        {service.emergency && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold bg-brand-accent text-white px-2 py-0.5 rounded-full shadow">
            {t("services.emergencyBadge")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-bold text-brand-dark text-lg mb-2">{tx(service.name, service.es?.name)}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{tx(service.shortDescription, service.es?.shortDescription)}</p>
        <div className="flex items-center justify-between mt-auto pt-1">
          {service.priceDisplay && (
            <span className="text-xs font-semibold text-brand-primary">{service.priceDisplay}</span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-primary group-hover:gap-2 transition-all">
            {t("services.learnMore")} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
