// SHARED vertical-default imagery for the mobile-mechanic template.
//
// These are license-clean Pexels photos (commercial use, no attribution),
// downloaded + optimized to WebP and self-hosted under /public/images — NEVER
// hotlinked, and NEVER Google Places / scraped photos. Source + license:
// specs/auto-repair-photo-library.md (jumpstart-ops). Mobile mechanic is the
// same automotive domain, so the auto-repair photo library is appropriate.
//
// This is a TEMPLATE-LEVEL default, NOT a siteConfig field. Every fork inherits
// the same safe per-service / hero image with zero config. A shop's own real
// photos always win: set `heroImage` in siteConfig to override the hero, and
// (future) per-service overrides can layer on top. Slots with no default here
// fall back to <ImagePlaceholder/> at the call site.
//
// Alt text: service name prepended for SEO, then a NEUTRAL description of what
// the photo depicts (true for any shop). We do NOT claim the stock photo was
// taken "at {businessName}" (that would be a fabricated-premises claim). The
// generator/editor can localize alt text when a shop supplies its own photos.

const SERVICE_IMAGE_ALT: Record<string, string> = {
  "mobile-diagnostics": "Mobile diagnostics — technician using an automotive diagnostic scan tool",
  "brake-service": "Brake service — close-up of a car brake caliper and disc rotor",
  "mobile-oil-change": "Mobile oil change — fresh engine oil being poured during a service",
  "battery-service": "Battery service — close-up of a car battery in the engine bay",
  "alternator-replacement": "Alternator replacement — battery with jumper cables in the engine bay",
  "starter-replacement": "Starter replacement — close-up of a car battery in the engine bay",
  "tune-up": "Tune-up — clean automotive engine bay being serviced",
  "pre-purchase-inspection": "Pre-purchase inspection — technician using an automotive diagnostic scan tool",
  "fluid-service": "Fluid service — coolant being added to a vehicle's cooling system",
  "belts-hoses": "Belts & hoses — engine cooling system components under the hood",
};

/** Default hero photo (a working shop) when a fork hasn't set its own heroImage. */
export const DEFAULT_HERO_IMAGE = "/images/hero.webp";

/**
 * Local path to the vertical-default photo for a service slug, or `undefined`
 * if this service has no default image (caller should render <ImagePlaceholder/>).
 */
export function getServiceImage(slug: string): string | undefined {
  return slug in SERVICE_IMAGE_ALT ? `/images/services/${slug}.webp` : undefined;
}

/** Neutral alt text for a service's default photo (undefined if no default). */
export function getServiceImageAlt(slug: string): string | undefined {
  return SERVICE_IMAGE_ALT[slug];
}
