import {
  createContext, useCallback, useContext, useEffect, useState,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { setActiveLocale } from "@/lib/i18n";

// Runtime locale state for the EN/ES toggle. Strategy: locale-state swap (not
// a duplicated /es route tree). `t()` reads the module-level active locale
// (set here during render), and a key={locale} wrapper in __root remounts the
// tree on change so every t() re-evaluates. Choice is persisted to a cookie +
// localStorage; the /es path pins Spanish for SSR/SEO.

type LocaleCtx = { locale: string; setLocale: (l: string) => void; locales: string[] };
const Ctx = createContext<LocaleCtx | null>(null);

const KEY = "lang";

function persist(loc: string): void {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${KEY}=${loc};path=/;max-age=31536000;samesite=lax`;
    window.localStorage.setItem(KEY, loc);
  } catch {
    /* storage blocked — non-fatal */
  }
}

function readPersisted(): string | null {
  if (typeof document === "undefined") return null;
  try {
    const m = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
    if (m) return decodeURIComponent(m[1]);
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const supported = siteConfig.supportedLanguages;

  // Initial locale is derived from the URL only (same on server + client), so
  // the first client render matches SSR — no hydration mismatch. A persisted
  // cookie choice is applied after mount (below).
  const pathLocale = pathname.startsWith("/es") ? "es" : siteConfig.defaultLanguage;
  const [locale, setLocaleState] = useState(pathLocale);

  // Keep the module-level locale in sync DURING render so any t() call in the
  // children below resolves to the active language on the server and client.
  setActiveLocale(locale);

  const setLocale = useCallback(
    (l: string) => {
      if (!supported.includes(l)) return;
      setActiveLocale(l);
      persist(l);
      if (typeof document !== "undefined") document.documentElement.lang = l;
      setLocaleState(l);
    },
    [supported],
  );

  // After hydration, honor a previously persisted choice — unless the URL
  // pins a locale (/es). One-frame switch, no hydration mismatch.
  useEffect(() => {
    if (pathname.startsWith("/es")) return;
    const saved = readPersisted();
    if (saved && supported.includes(saved) && saved !== locale) setLocale(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Follow client-side navigation into /es.
  useEffect(() => {
    if (pathname.startsWith("/es") && locale !== "es") setLocale("es");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale;
  }, [locale]);

  return <Ctx.Provider value={{ locale, setLocale, locales: supported }}>{children}</Ctx.Provider>;
}

export function useLocale(): LocaleCtx {
  const ctx = useContext(Ctx);
  if (ctx) return ctx;
  return {
    locale: siteConfig.defaultLanguage,
    setLocale: () => {},
    locales: siteConfig.supportedLanguages,
  };
}
