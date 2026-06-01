import { siteConfig, formatHours } from "@/config/siteConfig";

// Returns a JSON-LD LocalBusiness object as a string for <script> children.
export const localBusinessJsonLd = (): string => {
  const c = siteConfig;
  const dayMap: Record<string, string> = {
    mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
    fri: "Friday", sat: "Saturday", sun: "Sunday",
  };
  const openingHoursSpecification = Object.entries(c.regularHours)
    .filter(([, h]) => !h.closed)
    .map(([d, h]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[d],
      opens: h.open,
      closes: h.close,
    }));

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": c.jsonLdLocalBusinessType,
    name: c.businessName,
    legalName: c.legalName,
    description: c.defaultDescription,
    telephone: c.mainPhone,
    ...(c.generalEmail && !c.generalEmail.includes("[EDITOR") ? { email: c.generalEmail } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.city,
      addressRegion: c.stateAbbr,
      postalCode: c.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: c.geoLat,
      longitude: c.geoLng,
    },
    areaServed: c.serviceCities.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    openingHoursSpecification,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: c.googleAverageRating,
      reviewCount: c.googleReviewCount,
    },
    priceRange: "$$",
  });
};

export const breadcrumbJsonLd = (items: Array<{ name: string; url: string }>): string =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  });

export const serviceJsonLd = (slug: string, name: string, description: string): string =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": siteConfig.jsonLdLocalBusinessType,
      name: siteConfig.businessName,
      telephone: siteConfig.mainPhone,
    },
    areaServed: siteConfig.serviceCities.map((c) => c.name),
    description,
    url: `/services/${slug}`,
  });

export const faqJsonLd = (items: Array<{ question: string; answer: string }>): string =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  });

// Debug-only export to satisfy linter if needed
export const _formatHoursHelper = formatHours;
