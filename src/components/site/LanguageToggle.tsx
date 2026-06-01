import { useLocale } from "@/lib/locale";

// Obvious EN | ES segmented toggle. Renders nothing when only one language is
// configured (siteConfig.supportedLanguages), so it's safe on every fork.
const LABELS: Record<string, string> = { en: "EN", es: "ES" };

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale, locales } = useLocale();
  if (locales.length < 2) return null;

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={`inline-flex items-center overflow-hidden rounded-full border border-slate-300 text-xs font-bold leading-none ${className}`}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            aria-label={l === "es" ? "Español" : "English"}
            className={`px-3 py-1.5 transition-colors ${
              active
                ? "bg-brand-primary text-white"
                : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {LABELS[l] ?? l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
