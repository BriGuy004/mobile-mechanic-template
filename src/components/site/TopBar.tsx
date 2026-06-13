import { Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

// Mobile-only (lg:hidden) slim tap-to-call strip. On desktop the phone lives
// large in the Header nav, so there is NO desktop utility bar at all. Slimmed
// to just the phone — the reviews badge lives in the hero + JSON-LD.
export function TopBar() {
  const c = siteConfig;
  return (
    <a
      href={`tel:${c.mainPhoneTel}`}
      className="lg:hidden flex items-center justify-center gap-2 bg-brand-dark text-white text-sm font-semibold py-2"
    >
      <Phone className="w-4 h-4" /> {c.mainPhone}
    </a>
  );
}
