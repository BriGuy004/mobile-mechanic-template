import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { t } from "@/lib/i18n";

const AUTO_ADVANCE_MS = 5000;

// A GBP URL is "real" when it's an absolute http(s) URL and not an [EDITOR:]
// placeholder. Forks that haven't filled in the URL yet still render — just
// without the clickable view-on-google link.
function isValidGbpUrl(url: string): boolean {
  return (
    typeof url === "string" &&
    /^https?:\/\//i.test(url) &&
    !url.includes("[EDITOR")
  );
}

export function TestimonialCarousel() {
  const items = siteConfig.testimonials;
  const gbpUrl = siteConfig.googleBusinessProfileUrl;
  const hasGbp = isValidGbpUrl(gbpUrl);

  const [i, setI] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Increment on manual nav to reset the auto-advance timer cleanly.
  const [resetTick, setResetTick] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const advance = useCallback(
    (dir: 1 | -1) => {
      setI((p) => {
        if (dir === 1) return (p + 1) % items.length;
        return p === 0 ? items.length - 1 : p - 1;
      });
    },
    [items.length],
  );

  const prev = useCallback(() => {
    advance(-1);
    setResetTick((x) => x + 1);
  }, [advance]);

  const next = useCallback(() => {
    advance(1);
    setResetTick((x) => x + 1);
  }, [advance]);

  const jumpTo = useCallback((k: number) => {
    setI(k);
    setResetTick((x) => x + 1);
  }, []);

  // Auto-advance every AUTO_ADVANCE_MS unless paused (hover/focus inside the
  // carousel) or the user prefers reduced motion. Re-runs (clearing the old
  // interval, scheduling a new one) when items.length, isPaused, or
  // resetTick changes.
  useEffect(() => {
    if (items.length < 2) return;
    if (isPaused) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      advance(1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [items.length, isPaused, resetTick, advance]);

  const it = items[i];

  return (
    <div
      ref={containerRef}
      className="relative bg-white border border-slate-200 rounded-xl p-6 md:p-10 card-shadow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        // Only resume when focus actually leaves the carousel, not when it
        // moves between internal buttons.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: it.rating }).map((_, k) => (
          <Star key={k} className="w-5 h-5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote
        className="text-lg md:text-xl text-brand-dark leading-relaxed min-h-[140px]"
        aria-live="polite"
      >
        “{it.text}”
      </blockquote>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <div className="font-semibold text-brand-dark">{it.author}</div>
          <div className="text-sm text-slate-500">
            {it.city}, {siteConfig.stateAbbr}
            {it.service ? ` • ${it.service}` : ""}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label={t("homepage.reviews.prevReview")}
            className="w-10 h-10 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label={t("homepage.reviews.nextReview")}
            className="w-10 h-10 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-1">
          {items.map((_, k) => (
            <button
              key={k}
              onClick={() => jumpTo(k)}
              aria-label={t("homepage.reviews.goToReview", { n: k + 1 })}
              aria-current={k === i ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-brand-primary" : "w-2 bg-slate-300"}`}
            />
          ))}
        </div>
        {hasGbp && (
          <a
            href={gbpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline"
          >
            {t("homepage.reviews.viewOnGoogle")}
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
