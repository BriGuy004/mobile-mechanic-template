import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/services", labelKey: "nav.services" },
  { to: "/service-area", labelKey: "nav.serviceArea" },
  { to: "/specials", labelKey: "nav.specials" },
  { to: "/reviews", labelKey: "nav.reviews" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/contact", labelKey: "nav.contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const c = siteConfig;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-brand-primary text-white grid place-items-center font-black text-lg" aria-hidden>
            {c.businessName.charAt(0)}
          </div>
          <div className="leading-tight">
            <div className="font-bold text-brand-dark text-base lg:text-lg">{c.businessName}</div>
            <div className="text-[11px] text-slate-500 hidden sm:block">{c.primaryCity}, {c.stateAbbr} • Licensed</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-primary rounded-md transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-brand-primary rounded-md" }}
            >
              {t(n.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${c.mainPhoneTel}`}
            className="hidden md:inline-flex items-center gap-2 text-brand-primary font-bold text-sm lg:text-base"
          >
            <Phone className="w-4 h-4" />
            {c.mainPhone}
          </a>
          <Button asChild className="hidden sm:inline-flex bg-brand-accent hover:bg-brand-accent/90 text-white font-semibold">
            <Link to="/contact">{t("nav.scheduleService")}</Link>
          </Button>
          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-slate-700"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold">{c.businessName}</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  {t(n.labelKey)}
                </Link>
              ))}
              {c.emergencyAvailable && (
                <Link
                  to="/emergency"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-base font-medium text-brand-accent hover:bg-slate-50 rounded-xl"
                >
                  {t("nav.emergency")}
                </Link>
              )}
            </nav>
            <div className="mt-auto p-4 space-y-3 border-t">
              <a
                href={`tel:${c.mainPhoneTel}`}
                className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white font-semibold rounded-xl py-3"
              >
                <Phone className="w-4 h-4" /> {c.mainPhone}
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-full bg-brand-accent text-white font-semibold rounded-xl py-3"
              >
                {t("nav.scheduleService")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
