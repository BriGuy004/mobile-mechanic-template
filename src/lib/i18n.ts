import en from "@/locales/en.json";
import es from "@/locales/es.json";
import { siteConfig, yearsInBusiness } from "@/config/siteConfig";

type LocaleDict = Record<string, unknown>;
// English is the fallback. The `get` helper below falls back to dicts.en when
// a key is missing from the active locale, so any [ES: ...] markers in es.json
// show through verbatim until a translator fills them in, and any truly
// missing es.json key falls back to English silently.
const dicts: Record<string, LocaleDict> = {
  en: en as LocaleDict,
  es: es as LocaleDict,
};

// Runtime active locale. `t()` reads this instead of the static
// siteConfig.defaultLanguage so the header toggle can switch the whole UI at
// runtime. Set per-request (SSR) and per-session (client) by LocaleProvider
// in src/lib/locale.tsx before children render; falls back to the config
// default when unset (e.g. early module eval).
let activeLocale: string | null = null;
export const getActiveLocale = (): string => activeLocale ?? siteConfig.defaultLanguage;
export const setActiveLocale = (loc: string): void => {
  activeLocale = loc;
};
export const supportedLocales = (): string[] => siteConfig.supportedLanguages;

const get = (dict: LocaleDict, path: string): string | undefined => {
  const parts = path.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else return undefined;
  }
  return typeof cur === "string" ? cur : undefined;
};

const defaultVars = (): Record<string, string | number> => ({
  primaryCity: siteConfig.primaryCity,
  businessName: siteConfig.businessName,
  legalName: siteConfig.legalName,
  state: siteConfig.state,
  stateAbbr: siteConfig.stateAbbr,
  phone: siteConfig.mainPhone,
  rating: siteConfig.googleAverageRating,
  reviewCount: siteConfig.googleReviewCount,
  years: yearsInBusiness(),
  license: siteConfig.licenseNumbers[0] ?? "",
  localFamily: siteConfig.localFamily || "local",
  foundedYear: siteConfig.foundedYear,
  year: new Date().getFullYear(),
  radius: siteConfig.serviceRadiusMiles,
  sla: siteConfig.leadFormSlaPromise,
  emergencyText: siteConfig.emergencyHoursText,
  financingDetails: siteConfig.financingDetails,
  membershipName: siteConfig.membershipProgram.name,
  price: siteConfig.membershipProgram.monthlyPrice,
});

const interpolate = (s: string, vars: Record<string, string | number>): string =>
  s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));

export const t = (key: string, vars: Record<string, string | number> = {}): string => {
  const lang = getActiveLocale();
  const dict = dicts[lang] ?? dicts.en;
  const raw = get(dict, key) ?? get(dicts.en, key) ?? key;
  return interpolate(raw, { ...defaultVars(), ...vars });
};

export const pageTitle = (key: string, vars: Record<string, string | number> = {}): string => {
  const pt = t(key, vars);
  return interpolate(siteConfig.siteTitleTemplate, {
    pageTitle: pt,
    businessName: siteConfig.businessName,
    primaryCity: siteConfig.primaryCity,
  });
};
