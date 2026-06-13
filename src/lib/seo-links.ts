import { siteConfig } from "@/config/siteConfig";

// Per-page hreflang + canonical, as ABSOLUTE URLs (hreflang requires absolute).
//
// Bilingual discoverability (Phase 0): every real page has an EN URL and an
// `/es`-prefixed Spanish twin with the SAME (English) slug. Both the EN page and
// its ES twin emit the identical alternate set — en → EN url, es-mx → ES url,
// x-default → EN url — and a self-referential canonical. This replaces the old
// root-only hreflang in __root.tsx (which wrongly pointed every page's ES
// alternate at the homepage).
//
// Usage in a route head():  links: altLinks("/services")            // EN page
//                           links: altLinks("/services", "es")      // ES twin
export function altLinks(enPath: string, current: "en" | "es" = "en") {
  const base = siteConfig.siteUrl.replace(/\/+$/, "");
  const esPath = enPath === "/" ? "/es" : `/es${enPath}`;
  const enUrl = `${base}${enPath}`;
  const esUrl = `${base}${esPath}`;
  return [
    { rel: "canonical", href: current === "es" ? esUrl : enUrl },
    { rel: "alternate", hrefLang: "en", href: enUrl },
    { rel: "alternate", hrefLang: "es-mx", href: esUrl },
    { rel: "alternate", hrefLang: "x-default", href: enUrl },
  ];
}

/** The `/es`-prefixed twin of an EN path (e.g. "/services" → "/es/services"). */
export function esPath(enPath: string): string {
  return enPath === "/" ? "/es" : `/es${enPath}`;
}
