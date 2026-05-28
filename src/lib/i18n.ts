import en from "@/locales/en.json";
import { siteConfig, yearsInBusiness } from "@/config/siteConfig";

type LocaleDict = Record<string, unknown>;
const dicts: Record<string, LocaleDict> = { en: en as LocaleDict };

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
  const lang = siteConfig.defaultLanguage;
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
