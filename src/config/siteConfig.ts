// SINGLE SOURCE OF TRUTH for all business-specific data.
// To re-skin this template, edit ONLY this file + src/locales/*.json.

export type ServiceCategory =
  | "cooling" | "heating" | "iaq" | "maintenance" | "commercial" | "installation" | "other";

export interface FaqItem { question: string; answer: string; }

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  longDescription: string;
  icon: string;
  priceFrom: number | null;
  priceDisplay: string | null;
  emergency: boolean;
  featured: boolean;
  keywords: string[];
  faqItems: FaqItem[];
}

export interface ServiceCity { name: string; slug: string; zip: string[]; population?: number; }
export interface Brand { name: string; logoPath?: string; tier?: "premium" | "standard" | "value"; }
export interface Special { title: string; description: string; validUntil: string; legalDisclaimer: string; }
export interface Testimonial { author: string; city: string; rating: number; text: string; service?: string; date: string; }
export interface TrustPillar { icon: string; title: string; description: string; }
export interface DayHours { open: string; close: string; closed?: boolean; }

export interface SiteConfig {
  businessName: string; legalName: string; tagline: string;
  logoPath: string; logoAlt: string; foundedYear: number;
  licenseNumbers: string[]; bbbAccreditation: { accredited: boolean; rating: string };
  certifications: string[]; insuranceCarrier: string; awardsList: string[];

  mainPhone: string; mainPhoneTel: string;
  emergencyPhone: string; emergencyPhoneTel: string;
  generalEmail: string; serviceRequestEmail: string; smsTextNumber: string;

  street: string; city: string; state: string; stateAbbr: string; zip: string;
  geoLat: number; geoLng: number;
  googleMapsEmbedUrl: string; googleBusinessProfileUrl: string;

  primaryCity: string; serviceCities: ServiceCity[]; serviceRadiusMiles: number;

  regularHours: Record<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun", DayHours>;
  emergencyAvailable: boolean; emergencyHoursText: string;
  holidayClosures: string[]; timezone: string;

  familyOwned: boolean; veteranOwned: boolean; womanOwned: boolean;
  hispanicOwned: boolean; blackOwned: boolean;
  localFamily: string; spanishSpoken: boolean;

  colorPrimary: string; colorAccent: string;
  colorDarkBg: string; colorLightBg: string;
  colorTextDark: string; colorTextLight: string;
  fontHeadline: string; fontBody: string;

  services: Service[];
  brandsServiced: Brand[]; brandsInstalled: Brand[];

  currentSpecials: Special[];
  financingPartner: string; financingDetails: string;
  membershipProgram: { name: string; monthlyPrice: number; benefits: string[] };
  seniorDiscount: { enabled: boolean; percentage: number };
  militaryDiscount: { enabled: boolean; percentage: number };
  firstTimeCustomerOffer: { description: string; amount: string };
  taxCreditCallout: string;

  googleReviewCount: number; googleAverageRating: number;
  completedJobs: number; technicianCount: number;
  trustPillars: TrustPillar[]; testimonials: Testimonial[];

  siteUrl: string; siteTitleTemplate: string;
  defaultDescription: string; defaultOgImagePath: string;
  twitterHandle: string; jsonLdLocalBusinessType: string;

  googleAnalyticsId?: string; googleTagManagerId?: string;
  facebookPixelId?: string; googleAdsConversionId?: string;
  callTrackingNumbers?: Record<string, string>;

  leadFormEndpoint: string;
  leadFormFields: Array<{ name: string; label: string; type: "text" | "email" | "tel" | "select" | "textarea"; required: boolean; options?: string[] }>;
  leadFormSuccessMessage: string; leadFormSlaPromise: string;

  facebookUrl?: string; instagramUrl?: string; youtubeUrl?: string; tiktokUrl?: string;
  googleBusinessUrl?: string; yelpUrl?: string; angiUrl?: string; nextdoorUrl?: string;

  footerLinks: Array<{ label: string; href: string }>;
  footerDisclaimers: string[];

  defaultLanguage: string; supportedLanguages: string[];
}

export const siteConfig: SiteConfig = {
  businessName: "Acme Service Co",
  legalName: "Acme Service Co LLC",
  tagline: "Dallas's Trusted HVAC Specialists",
  logoPath: "/logo.svg",
  logoAlt: "Brian's HVAC logo",
  foundedYear: 2018,
  licenseNumbers: ["TACLA00123456C"],
  bbbAccreditation: { accredited: true, rating: "A+" },
  certifications: ["NATE Certified", "EPA 608 Certified", "ACCA Member"],
  insuranceCarrier: "Fully insured & bonded",
  awardsList: ["Best of Dallas — Home Services 2024", "Angi Super Service Award 2023"],

  mainPhone: "(972) 555-0142",
  mainPhoneTel: "+19725550142",
  emergencyPhone: "(972) 555-0142",
  emergencyPhoneTel: "+19725550142",
  generalEmail: "hello@brianshvac.example",
  serviceRequestEmail: "service@brianshvac.example",
  smsTextNumber: "+19725550142",

  street: "1234 Main Street",
  city: "Dallas",
  state: "Texas",
  stateAbbr: "TX",
  zip: "75201",
  geoLat: 32.7767,
  geoLng: -96.797,
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107473!2d-96.87!3d32.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e99c1cd92a553%3A0x6b4c3b50e8e1f5b!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000",
  googleBusinessProfileUrl: "https://g.page/brianshvac",

  primaryCity: "Dallas",
  serviceCities: [
    { name: "Dallas", slug: "dallas", zip: ["75201", "75202", "75204", "75206"], population: 1300000 },
    { name: "Plano", slug: "plano", zip: ["75023", "75024", "75025", "75093"], population: 285000 },
    { name: "Frisco", slug: "frisco", zip: ["75033", "75034", "75035"], population: 220000 },
    { name: "McKinney", slug: "mckinney", zip: ["75069", "75070", "75071"], population: 200000 },
    { name: "Allen", slug: "allen", zip: ["75002", "75013"], population: 109000 },
    { name: "Richardson", slug: "richardson", zip: ["75080", "75081", "75082"], population: 121000 },
    { name: "Garland", slug: "garland", zip: ["75040", "75041", "75042", "75043"], population: 246000 },
    { name: "Mesquite", slug: "mesquite", zip: ["75149", "75150", "75180"], population: 150000 },
    { name: "Irving", slug: "irving", zip: ["75038", "75039", "75060"], population: 240000 },
    { name: "Carrollton", slug: "carrollton", zip: ["75006", "75007", "75010"], population: 135000 },
  ],
  serviceRadiusMiles: 35,

  regularHours: {
    mon: { open: "07:00", close: "19:00" },
    tue: { open: "07:00", close: "19:00" },
    wed: { open: "07:00", close: "19:00" },
    thu: { open: "07:00", close: "19:00" },
    fri: { open: "07:00", close: "19:00" },
    sat: { open: "08:00", close: "17:00" },
    sun: { open: "00:00", close: "00:00", closed: true },
  },
  emergencyAvailable: true,
  emergencyHoursText: "24/7 emergency service available",
  holidayClosures: ["Thanksgiving Day", "Christmas Day"],
  timezone: "America/Chicago",

  familyOwned: true,
  veteranOwned: false,
  womanOwned: false,
  hispanicOwned: false,
  blackOwned: false,
  localFamily: "Family owned & operated",
  spanishSpoken: true,

  colorPrimary: "#1E3A8A",
  colorAccent: "#EF4444",
  colorDarkBg: "#0B1B3F",
  colorLightBg: "#F8FAFC",
  colorTextDark: "#0F172A",
  colorTextLight: "#FFFFFF",
  fontHeadline: "'Inter', system-ui, sans-serif",
  fontBody: "'Inter', system-ui, sans-serif",

  services: [
    {
      slug: "ac-repair",
      name: "AC Repair",
      category: "cooling",
      shortDescription: "Fast, accurate air conditioning repair for every brand and system.",
      longDescription: "When your AC stops cooling, our NATE-certified technicians diagnose the real issue — capacitor, contactor, refrigerant, compressor, or control board — and repair it the same day in most cases. We carry common parts on every truck so you don't wait days for cool air.",
      icon: "Wrench",
      priceFrom: 89,
      priceDisplay: "$89 diagnostic",
      emergency: true,
      featured: true,
      keywords: ["ac repair", "air conditioning repair", "emergency ac"],
      faqItems: [
        { question: "How quickly can you get to my home?", answer: "Most same-day calls placed before noon are completed the same day. After-hours emergency service is available 24/7." },
        { question: "Do you charge a diagnostic fee?", answer: "We charge a flat $89 diagnostic. It's waived when you approve the repair." },
        { question: "What brands do you service?", answer: "All major brands — Trane, Carrier, Lennox, Goodman, Rheem, American Standard, York, Bryant, and Ruud." },
      ],
    },
    {
      slug: "ac-installation",
      name: "AC Installation",
      category: "installation",
      shortDescription: "New high-efficiency air conditioner installation with manufacturer warranty.",
      longDescription: "Replacing an aging AC? We perform a full Manual J load calculation, recommend the right SEER2 system for your home, and complete most installs in a single day. Every install includes startup verification, performance testing, and a workmanship warranty.",
      icon: "Snowflake",
      priceFrom: null,
      priceDisplay: "Free Estimate",
      emergency: false,
      featured: true,
      keywords: ["ac installation", "new air conditioner", "ac replacement"],
      faqItems: [
        { question: "How long does installation take?", answer: "Most residential AC replacements are completed in 6–8 hours." },
        { question: "Do you offer financing?", answer: "Yes — flexible monthly payments with approved credit through our financing partner." },
        { question: "Are federal tax credits available?", answer: "Many qualifying heat pump systems are eligible for federal Inflation Reduction Act tax credits up to $2,000." },
      ],
    },
    {
      slug: "ac-maintenance",
      name: "AC Maintenance",
      category: "maintenance",
      shortDescription: "Seasonal tune-ups that catch problems early and keep efficiency high.",
      longDescription: "A spring tune-up is the single best way to prevent summer breakdowns. We check refrigerant charge, clean condenser coils, test capacitors, inspect electrical connections, and verify temperature split — 21 checkpoints in total.",
      icon: "ShieldCheck",
      priceFrom: 79,
      priceDisplay: "$79 tune-up",
      emergency: false,
      featured: true,
      keywords: ["ac tune up", "ac maintenance", "ac service"],
      faqItems: [
        { question: "How often should I tune up my AC?", answer: "Once per year, ideally in early spring before peak season." },
        { question: "What's included in a tune-up?", answer: "Our 21-point checklist covers refrigerant, electrical, airflow, controls, and safety." },
      ],
    },
    {
      slug: "furnace-repair",
      name: "Furnace Repair",
      category: "heating",
      shortDescription: "Gas, electric, and high-efficiency furnace repair — fast warm-up guaranteed.",
      longDescription: "Cold house? We repair ignition failures, flame sensor issues, blower problems, gas valves, and control boards on every major brand. Safety is first — we always test for carbon monoxide and cracked heat exchangers.",
      icon: "Flame",
      priceFrom: 89,
      priceDisplay: "$89 diagnostic",
      emergency: true,
      featured: true,
      keywords: ["furnace repair", "heating repair", "no heat"],
      faqItems: [
        { question: "My furnace won't turn on — what should I check first?", answer: "Confirm the thermostat is set to heat, the breaker hasn't tripped, and the furnace door switch is engaged. If those are fine, call us." },
        { question: "Is gas furnace work dangerous to DIY?", answer: "Yes. Gas and combustion repairs should always be done by a licensed technician." },
      ],
    },
    {
      slug: "furnace-installation",
      name: "Furnace Installation",
      category: "installation",
      shortDescription: "High-efficiency furnace installation sized correctly for your home.",
      longDescription: "Modern 95%+ AFUE furnaces dramatically cut winter gas bills. We size every install with a proper load calculation, never just match the old unit. All installs include new venting inspection, gas pressure test, and combustion analysis.",
      icon: "Thermometer",
      priceFrom: null,
      priceDisplay: "Free Estimate",
      emergency: false,
      featured: false,
      keywords: ["furnace installation", "furnace replacement"],
      faqItems: [
        { question: "How long does a furnace last?", answer: "Typically 15–20 years with annual maintenance." },
      ],
    },
    {
      slug: "furnace-maintenance",
      name: "Furnace Maintenance",
      category: "maintenance",
      shortDescription: "Fall tune-ups that prevent winter no-heat calls and keep you safe.",
      longDescription: "Annual furnace maintenance verifies combustion safety, tests carbon monoxide levels, cleans burners, replaces filters, and lubricates moving parts. Most manufacturer warranties require it.",
      icon: "Wind",
      priceFrom: 79,
      priceDisplay: "$79 tune-up",
      emergency: false,
      featured: false,
      keywords: ["furnace tune up", "heating maintenance"],
      faqItems: [
        { question: "When should I schedule a furnace tune-up?", answer: "Early fall — September or October — before the first cold snap." },
      ],
    },
    {
      slug: "heat-pump-repair",
      name: "Heat Pump Repair",
      category: "heating",
      shortDescription: "Expert heat pump diagnostics for split, ducted, and mini-split systems.",
      longDescription: "Heat pumps are more complex than straight-cool ACs. We diagnose reversing valves, defrost controls, refrigerant issues, and auxiliary heat strips on all major brands including modern variable-speed inverter systems.",
      icon: "RefreshCw",
      priceFrom: 89,
      priceDisplay: "$89 diagnostic",
      emergency: true,
      featured: false,
      keywords: ["heat pump repair", "mini split repair"],
      faqItems: [
        { question: "Why is my heat pump running but not heating?", answer: "Common causes: stuck reversing valve, low refrigerant, or failed auxiliary strips. We'll pinpoint it." },
      ],
    },
    {
      slug: "heat-pump-installation",
      name: "Heat Pump Installation",
      category: "installation",
      shortDescription: "High-efficiency heat pumps with up to $2,000 federal tax credit.",
      longDescription: "Modern heat pumps heat and cool more efficiently than ever — and qualifying systems are eligible for federal Inflation Reduction Act tax credits. We install ducted central systems and ductless mini-splits.",
      icon: "Zap",
      priceFrom: null,
      priceDisplay: "Free Estimate",
      emergency: false,
      featured: true,
      keywords: ["heat pump installation", "mini split installation"],
      faqItems: [
        { question: "Do heat pumps work in Texas winters?", answer: "Yes — modern heat pumps work efficiently well below freezing, more than enough for Dallas." },
      ],
    },
    {
      slug: "ductwork-cleaning",
      name: "Ductwork & Duct Cleaning",
      category: "iaq",
      shortDescription: "Duct sealing, repair, and professional cleaning to improve airflow and air quality.",
      longDescription: "Leaky or dirty ductwork can waste 20–30% of your conditioned air. We test duct performance, seal leaks with mastic, and offer professional cleaning that removes years of dust and allergens.",
      icon: "GitBranch",
      priceFrom: null,
      priceDisplay: "Free Estimate",
      emergency: false,
      featured: false,
      keywords: ["duct cleaning", "ductwork repair", "duct sealing"],
      faqItems: [
        { question: "How often should ducts be cleaned?", answer: "Every 5–7 years for most homes, sooner if you have pets, allergies, or recent renovation." },
      ],
    },
    {
      slug: "indoor-air-quality",
      name: "Indoor Air Quality",
      category: "iaq",
      shortDescription: "UV lights, HEPA filtration, humidifiers, and whole-home air purifiers.",
      longDescription: "Indoor air can be 2–5x more polluted than outdoor air. We install UV germicidal lights, media filtration, whole-home humidifiers, and HEPA-grade air purifiers integrated directly into your HVAC system.",
      icon: "Sparkles",
      priceFrom: null,
      priceDisplay: "Free Assessment",
      emergency: false,
      featured: true,
      keywords: ["indoor air quality", "uv light", "air purifier", "humidifier"],
      faqItems: [
        { question: "Will an air purifier help with allergies?", answer: "Yes — whole-home HEPA filtration significantly reduces pollen, dust, and pet dander." },
      ],
    },
    {
      slug: "smart-thermostat",
      name: "Smart Thermostat Installation",
      category: "other",
      shortDescription: "Professional installation of Nest, Ecobee, Honeywell, and other smart thermostats.",
      longDescription: "A smart thermostat can save 10–15% on heating and cooling. We install and configure all major brands, verify HVAC compatibility, and walk you through the app setup before we leave.",
      icon: "Smartphone",
      priceFrom: 149,
      priceDisplay: "From $149 installed",
      emergency: false,
      featured: false,
      keywords: ["smart thermostat", "nest installation", "ecobee installation"],
      faqItems: [
        { question: "Will a smart thermostat work with my system?", answer: "Most do, but some systems need a C-wire. We verify compatibility before installing." },
      ],
    },
    {
      slug: "commercial-hvac",
      name: "Commercial HVAC",
      category: "commercial",
      shortDescription: "Light commercial RTU, split system, and VRF service and installation.",
      longDescription: "We service restaurants, offices, retail, and light industrial spaces across the Dallas metro. Maintenance agreements, emergency response, and capital planning for property managers.",
      icon: "Building2",
      priceFrom: null,
      priceDisplay: "Custom Quote",
      emergency: true,
      featured: false,
      keywords: ["commercial hvac", "rtu repair", "commercial air conditioning"],
      faqItems: [
        { question: "Do you offer maintenance agreements?", answer: "Yes — quarterly and semi-annual plans tailored to your equipment and usage." },
      ],
    },
  ],

  brandsServiced: [
    { name: "Trane", tier: "premium" },
    { name: "Carrier", tier: "premium" },
    { name: "Lennox", tier: "premium" },
    { name: "Goodman", tier: "value" },
    { name: "Rheem", tier: "standard" },
    { name: "American Standard", tier: "premium" },
    { name: "York", tier: "standard" },
    { name: "Bryant", tier: "premium" },
    { name: "Ruud", tier: "standard" },
  ],
  brandsInstalled: [
    { name: "Trane", tier: "premium" },
    { name: "Carrier", tier: "premium" },
    { name: "Lennox", tier: "premium" },
    { name: "Goodman", tier: "value" },
  ],

  currentSpecials: [
    { title: "$79 AC Tune-Up", description: "21-point precision tune-up to keep your system running efficiently all summer.", validUntil: "2026-08-31", legalDisclaimer: "One per household. Standard residential systems only." },
    { title: "$500 Off New HVAC Installation", description: "Save on a qualifying complete heating and cooling system replacement.", validUntil: "2026-12-31", legalDisclaimer: "Not valid with other offers. Minimum system requirements apply." },
    { title: "Free Indoor Air Quality Assessment", description: "Complimentary in-home assessment of air quality, humidity, and filtration.", validUntil: "2026-12-31", legalDisclaimer: "Service area customers only. No purchase required." },
  ],
  financingPartner: "Synchrony / GreenSky",
  financingDetails: "Flexible monthly payments with approved credit. 0% APR options on qualifying systems.",
  membershipProgram: {
    name: "Comfort Club",
    monthlyPrice: 19,
    benefits: [
      "2 annual tune-ups (spring AC + fall furnace)",
      "15% off all repairs",
      "Priority scheduling",
      "No after-hours fees",
      "Equipment lifespan extension",
      "Transferable to new home",
    ],
  },
  seniorDiscount: { enabled: true, percentage: 10 },
  militaryDiscount: { enabled: true, percentage: 10 },
  firstTimeCustomerOffer: { description: "$25 off your first service call", amount: "$25" },
  taxCreditCallout: "Federal tax credits up to $2,000 available for qualifying heat pump installations through the Inflation Reduction Act.",

  googleReviewCount: 287,
  googleAverageRating: 4.9,
  completedJobs: 4200,
  technicianCount: 14,

  trustPillars: [
    { icon: "Award", title: "Licensed & Certified", description: "TACLA-licensed in Texas, NATE-certified technicians, EPA 608 compliant." },
    { icon: "Clock", title: "Same-Day Service", description: "Most repair calls placed before noon are completed the same day." },
    { icon: "Heart", title: "Family Owned", description: "Locally owned and operated — your neighbors, not a national chain." },
    { icon: "ThumbsUp", title: "Upfront Pricing", description: "Flat-rate pricing approved before any work begins. No surprises." },
  ],

  testimonials: [
    { author: "Sarah M.", city: "Plano", rating: 5, text: "AC died on the hottest day of July. A tech was at my door in under three hours and we were cooling by dinnertime. Honest pricing and the tech explained everything.", service: "AC Repair", date: "2025-07-18" },
    { author: "Mike R.", city: "Dallas", rating: 5, text: "Replaced our 22-year-old system. Crew was on time, clean, and respectful of the house. New system runs quieter and our electric bill dropped by a third.", service: "AC Installation", date: "2025-06-02" },
    { author: "Jennifer K.", city: "Frisco", rating: 5, text: "Comfort Club member for two years. Worth every penny — priority scheduling alone has saved me twice during heatwaves.", service: "Maintenance", date: "2025-05-14" },
    { author: "David L.", city: "McKinney", rating: 5, text: "Got three quotes for a new furnace. They weren't the cheapest, but they did a real load calculation while the others just measured the old unit. Glad I went with them.", service: "Furnace Installation", date: "2025-10-22" },
    { author: "Maria G.", city: "Garland", rating: 5, text: "Hablan español, lo cual fue de gran ayuda para mis padres. Servicio profesional y precios justos.", service: "AC Repair", date: "2025-08-09" },
    { author: "Tom B.", city: "Richardson", rating: 5, text: "Installed a UV light and media filter — allergies have noticeably improved. Great recommendation from the tech.", service: "Indoor Air Quality", date: "2025-04-30" },
  ],

  siteUrl: "",
  siteTitleTemplate: "{pageTitle} | {businessName} | {primaryCity} HVAC",
  defaultDescription: "Trusted HVAC repair, installation, and maintenance in Dallas and surrounding cities. Licensed, family-owned, 24/7 emergency service.",
  defaultOgImagePath: "/og-image.jpg",
  twitterHandle: "",
  jsonLdLocalBusinessType: "HVACBusiness",

  leadFormEndpoint: "",
  leadFormFields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "service", label: "Service Needed", type: "select", required: true, options: ["AC Repair", "AC Installation", "Furnace Repair", "Furnace Installation", "Maintenance", "Indoor Air Quality", "Other"] },
    { name: "message", label: "Tell us about the issue", type: "textarea", required: false },
  ],
  leadFormSuccessMessage: "Thanks — we'll be in touch within one business hour.",
  leadFormSlaPromise: "We respond to every request within 60 minutes during business hours.",

  facebookUrl: "https://facebook.com/brianshvac",
  instagramUrl: "https://instagram.com/brianshvac",
  googleBusinessUrl: "https://g.page/brianshvac",
  yelpUrl: "https://yelp.com/biz/brianshvac",

  footerLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Careers", href: "/careers" },
  ],
  footerDisclaimers: ["Licensed in the State of Texas. License numbers available on request."],

  defaultLanguage: "en",
  supportedLanguages: ["en"],
};

export const yearsInBusiness = (): number => new Date().getFullYear() - siteConfig.foundedYear;
export const copyrightYear = (): number => new Date().getFullYear();
export const getServiceBySlug = (slug: string): Service | undefined => siteConfig.services.find((s) => s.slug === slug);
export const getCityBySlug = (slug: string): ServiceCity | undefined => siteConfig.serviceCities.find((c) => c.slug === slug);
export const featuredServices = (): Service[] => siteConfig.services.filter((s) => s.featured);

export const formatHours = (h: DayHours): string => {
  if (h.closed) return "Closed";
  const fmt = (t: string) => {
    const [hh, mm] = t.split(":").map(Number);
    const period = hh >= 12 ? "PM" : "AM";
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    return mm === 0 ? `${h12} ${period}` : `${h12}:${String(mm).padStart(2, "0")} ${period}`;
  };
  return `${fmt(h.open)} – ${fmt(h.close)}`;
};
