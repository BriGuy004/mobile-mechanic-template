import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function TestimonialCarousel() {
  const items = siteConfig.testimonials;
  const [i, setI] = useState(0);
  const prev = () => setI((p) => (p === 0 ? items.length - 1 : p - 1));
  const next = () => setI((p) => (p + 1) % items.length);
  const it = items[i];

  return (
    <div className="relative bg-white border border-slate-200 rounded-2xl p-6 md:p-10 card-shadow">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: it.rating }).map((_, k) => (
          <Star key={k} className="w-5 h-5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote className="text-lg md:text-xl text-brand-dark leading-relaxed min-h-[140px]">
        “{it.text}”
      </blockquote>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <div className="font-semibold text-brand-dark">{it.author}</div>
          <div className="text-sm text-slate-500">{it.city}, {siteConfig.stateAbbr}{it.service ? ` • ${it.service}` : ""}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={prev} aria-label="Previous review" className="w-10 h-10 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} aria-label="Next review" className="w-10 h-10 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {items.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Go to review ${k + 1}`}
            className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-brand-primary" : "w-2 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
