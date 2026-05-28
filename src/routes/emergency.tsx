import { createFileRoute } from "@tanstack/react-router";
import { Phone, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t, pageTitle } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: pageTitle("nav.emergency") },
      { name: "description", content: t("emergency.description") },
      { property: "og:url", content: "/emergency" },
    ],
    links: [{ rel: "canonical", href: "/emergency" }],
  }),
  component: Emergency,
});

function Emergency() {
  const c = siteConfig;
  return (
    <section className="hero-gradient text-white min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-accent text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6">
          <AlertTriangle className="w-4 h-4" /> 24/7 EMERGENCY
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t("emergency.heading")}</h1>
        <p className="text-lg text-white/85 mb-8">{t("emergency.body")}</p>
        <Button asChild size="lg" className="bg-brand-accent hover:bg-brand-accent/90 text-white text-xl font-bold h-16 px-10">
          <a href={`tel:${c.emergencyPhoneTel}`}><Phone className="w-5 h-5 mr-2" />{c.emergencyPhone}</a>
        </Button>
      </div>
    </section>
  );
}
