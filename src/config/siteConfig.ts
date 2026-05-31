// SINGLE SOURCE OF TRUTH for all business-specific data.
// To re-skin this template, edit ONLY this file + src/locales/*.json.

export type ServiceCategory =
  | "diagnostics" | "repair" | "maintenance" | "emergency";

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
  // Vertical noun used in route-level page titles / H1s where the vertical
  // appears as plain text (e.g. "Mobile Mechanic Service in Plano").
  // Per-fork: "HVAC", "Plumbing", "Mobile Mechanic", "Roofing", etc.
  verticalNoun: string;
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
  businessName: "DFW Mobile Mechanic",
  legalName: "DFW Mobile Mechanic LLC",
  tagline: "Mobile Auto Repair — We Come to Your Driveway",
  verticalNoun: "Mobile Mechanic",
  logoPath: "/logo.svg",
  logoAlt: "DFW Mobile Mechanic logo",
  foundedYear: 2018,
  licenseNumbers: [],
  bbbAccreditation: { accredited: true, rating: "A+" },
  certifications: ["ASE Certified Master Technician"],
  insuranceCarrier: "Fully insured & bonded",
  awardsList: ["Best of Dallas — Home Services 2024", "Angi Super Service Award 2023"],

  mainPhone: "(972) 555-0142",
  mainPhoneTel: "+19725550142",
  emergencyPhone: "(972) 555-0142",
  emergencyPhoneTel: "+19725550142",
  generalEmail: "[EDITOR: insert real general email]",
  serviceRequestEmail: "[EDITOR: insert real service request email]",
  smsTextNumber: "+19725550142",

  // Mobile service — no fixed street. ZIP 75201 = Dallas central (used for
  // LocalBusiness schema only; we serve the whole DFW metro).
  street: "",
  city: "Dallas",
  state: "Texas",
  stateAbbr: "TX",
  zip: "75201",
  geoLat: 32.7767,
  geoLng: -96.797,
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107473!2d-96.87!3d32.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e99c1cd92a553%3A0x6b4c3b50e8e1f5b!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000",
  googleBusinessProfileUrl: "[EDITOR: paste real GBP shortlink from GBP > Share]",

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
    mon: { open: "07:00", close: "21:00" },
    tue: { open: "07:00", close: "21:00" },
    wed: { open: "07:00", close: "21:00" },
    thu: { open: "07:00", close: "21:00" },
    fri: { open: "07:00", close: "21:00" },
    sat: { open: "08:00", close: "18:00" },
    sun: { open: "09:00", close: "17:00" },
  },
  emergencyAvailable: true,
  emergencyHoursText: "On-call evenings and weekends across DFW metro",
  holidayClosures: ["Thanksgiving Day", "Christmas Day"],
  timezone: "America/Chicago",

  familyOwned: true,
  veteranOwned: false,
  womanOwned: false,
  hispanicOwned: false,
  blackOwned: false,
  localFamily: "Family owned & operated",
  // Set to true ONLY when /es/ Spanish routes are actually shipped; the
  // TopBar conditionally renders the "Se Habla Español" badge on this flag.
  // Today: en.json + es.json exist but no /es/ URL surface or LanguageToggle
  // component — flipping false keeps the badge from lying.
  spanishSpoken: false,

  colorPrimary: "#991B1B",
  colorAccent: "#EF4444",
  colorDarkBg: "#0B1B3F",
  colorLightBg: "#F8FAFC",
  colorTextDark: "#0F172A",
  colorTextLight: "#FFFFFF",
  fontHeadline: "'Inter', system-ui, sans-serif",
  fontBody: "'Inter', system-ui, sans-serif",

  services: [
    {
      slug: "mobile-diagnostics",
      name: "Mobile Diagnostics",
      category: "diagnostics",
      shortDescription: "We come to your driveway with a pro-grade scan tool.",
      longDescription: "Check engine light on? Misfire? Transmission code? We bring an OEM-level scan tool (not a $30 OBD reader) to your driveway and pull live data, freeze-frame, and diagnostic trouble codes from every module — engine, transmission, ABS, airbag, body. You get a written diagnosis and a repair quote on the spot. No tow, no shop wait.",
      icon: "GaugeCircle",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: true,
      keywords: ["mobile diagnostics", "check engine light", "obd2 scan", "mobile scan tool"],
      faqItems: [
        { question: "Why not just use a parts-store scanner?", answer: "Parts-store scanners read generic OBD-II codes from the engine module only. They miss transmission, ABS, airbag, and body-control codes — which is where the expensive problems hide. Our tool reads everything." },
        { question: "How much is the diagnostic?", answer: "$89 flat. Waived when you approve the repair we quote." },
        { question: "Can you fix it after the diagnosis?", answer: "Most things, yes — same visit. Brakes, alternator, starter, battery, sensors, belts, hoses. Major engine work or anything requiring a lift we'll refer to a shop." },
      ],
    },
    {
      slug: "brake-service",
      name: "Brake Pads & Rotors",
      category: "repair",
      shortDescription: "Brake pads, rotors, and calipers — done in your driveway.",
      longDescription: "Most brake jobs are 2-hour driveway repairs: pads, rotors, hardware, and a brake-fluid bleed. We carry pads and rotors for every common make on the truck. You skip the shop wait, skip the loaner-car hassle, and skip the upsell — we replace what's worn, not what isn't.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: true,
      keywords: ["mobile brake repair", "brake pads", "brake rotors", "brake job"],
      faqItems: [
        { question: "How do I know if I need brakes?", answer: "Squealing on stop, longer stopping distance, or pulsing brake pedal. We measure pad thickness on every visit — replace at 3mm or less." },
        { question: "Do you do brake fluid flushes?", answer: "Yes — recommended every 3 years or any time pads/rotors are replaced. Old fluid absorbs water and corrodes lines." },
        { question: "Will you turn rotors instead of replacing?", answer: "Almost never — modern rotors are thin to begin with, and turning past minimum thickness is unsafe. Replacement is usually cheaper than the machining anyway." },
      ],
    },
    {
      slug: "mobile-oil-change",
      name: "Mobile Oil Change",
      category: "maintenance",
      shortDescription: "Full-synthetic oil change in your driveway in 30 minutes.",
      longDescription: "We carry full-synthetic, conventional, and high-mileage oils on the truck plus filters for every common make. Oil change is the most overpriced shop service — quick-lube places upsell air filters, cabin filters, wiper blades, and engine flushes. We change the oil, top off fluids, set tire pressures, and leave. Done in 30 minutes in your driveway.",
      icon: "Droplet",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: true,
      keywords: ["mobile oil change", "synthetic oil change", "at home oil change", "driveway oil change"],
      faqItems: [
        { question: "What oil weight do I need?", answer: "Whatever's on your oil cap — usually 0W-20 or 5W-30. We bring the right weight." },
        { question: "Do you take the old oil?", answer: "Yes — we recycle every drop. You won't have a jug of black oil sitting in the garage." },
        { question: "How often should I change oil?", answer: "Full synthetic: every 7,500–10,000 miles. Conventional: every 3,000–5,000. Modern oil-life monitors are surprisingly accurate — trust them." },
      ],
    },
    {
      slug: "battery-service",
      name: "Battery Test & Replacement",
      category: "repair",
      shortDescription: "Battery test, jump-start, or replacement at your driveway.",
      longDescription: "Dead battery in the morning? We come to you, test the charging system to confirm it's actually the battery (not the alternator), and swap it on the spot. We carry common Group 24/35/47/48/65 batteries — most vehicles covered. Old battery hauled away and recycled.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: true,
      keywords: ["mobile battery replacement", "car battery", "battery test", "jump start dallas"],
      faqItems: [
        { question: "How do I know if it's the battery or the alternator?", answer: "If it cranks slowly and dies, usually battery. If it dies while driving, usually alternator. We test both before we swap anything." },
        { question: "How long should a battery last?", answer: "3–5 years in Texas heat. Extreme heat is harder on batteries than extreme cold — Dallas summers shorten battery life significantly." },
        { question: "Do you handle hybrid or EV batteries?", answer: "12V auxiliary batteries on hybrids/EVs, yes. The main traction battery is dealer-only work." },
      ],
    },
    {
      slug: "alternator-replacement",
      name: "Alternator Replacement",
      category: "repair",
      shortDescription: "Replace a failed alternator in your driveway — same day.",
      longDescription: "Battery light on while driving? Dying battery despite a recent replacement? Usually the alternator. We test charging output to confirm, then replace the alternator on-site. Belt and tensioner inspected as part of the job — both often need attention at the same time.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["alternator replacement", "charging system", "battery light", "mobile alternator"],
      faqItems: [
        { question: "How long does the job take?", answer: "Most vehicles 1.5–2.5 hours in the driveway. Some imports with tight engine bays take longer." },
        { question: "Do you rebuild or replace?", answer: "Replace, with a quality reman or new unit. Rebuilt alternators with 90-day warranty are usually cheaper than the labor to do it twice." },
      ],
    },
    {
      slug: "starter-replacement",
      name: "Starter Replacement",
      category: "repair",
      shortDescription: "Clicks and won't crank? Mobile starter replacement.",
      longDescription: "When you turn the key and get a single click — or nothing at all — and the battery tests good, it's the starter. We test the starter circuit to confirm (not just throw parts at it), then replace it in your driveway. Most jobs done in 2 hours.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["starter replacement", "won't crank", "clicking sound", "mobile starter"],
      faqItems: [
        { question: "Could it be the starter solenoid only?", answer: "Sometimes — on older vehicles it's a separate part. On most modern cars the solenoid is integrated and the whole assembly gets replaced together." },
        { question: "Why does tapping the starter make it work?", answer: "Brushes inside the starter are worn down — tapping briefly restores contact. It's a sign the starter is on its last legs. Plan replacement before it strands you." },
      ],
    },
    {
      slug: "tune-up",
      name: "Tune-Up & Spark Plugs",
      category: "maintenance",
      shortDescription: "Spark plugs, ignition coils, and air filter — driveway tune-up.",
      longDescription: "Modern tune-ups are mostly spark plugs (every 60K–100K miles depending on plug type) and air filter. We replace plugs, inspect coil packs, swap air filter, and clean throttle body if it's dirty. Cars run noticeably better — better fuel economy, smoother idle, lost power restored.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["spark plug replacement", "tune up", "mobile tune up", "ignition service"],
      faqItems: [
        { question: "When do I need new plugs?", answer: "Iridium plugs: 100K miles. Platinum: 60K. Copper: 30K. Check what's in your engine — modern Toyotas, Hondas, Fords typically iridium." },
        { question: "Do you do coil packs too?", answer: "If they're failing — usually presents as a misfire code on a specific cylinder. We test coils before recommending replacement." },
      ],
    },
    {
      slug: "pre-purchase-inspection",
      name: "Pre-Purchase Inspection",
      category: "diagnostics",
      shortDescription: "We inspect the used car at the seller's location — protect your buy.",
      longDescription: "Buying a used car from a private seller or auction? We meet you at the seller's location, scan all modules for codes (including codes a dealer may have temporarily cleared), test drive, inspect brakes/tires/suspension/leaks, and give you a written report and verbal verdict. $150 saves a $5,000 mistake. We've turned more buyers away from cars than green-lit them — that's the point.",
      icon: "Camera",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: true,
      keywords: ["pre purchase inspection", "used car inspection", "ppi", "buying used car"],
      faqItems: [
        { question: "Will the seller let you scan their car?", answer: "Reputable sellers welcome it. If they refuse, walk away — that's information." },
        { question: "Do you check for accident damage?", answer: "Yes — frame inspection, panel-gap measurement, paint thickness gauge for repaint detection. We pair that with a Carfax or AutoCheck if you have one." },
        { question: "How long does the inspection take?", answer: "60–90 minutes. We schedule with the seller in advance so they expect us." },
      ],
    },
    {
      slug: "fluid-service",
      name: "Fluid Service (Coolant, Brake, Trans)",
      category: "maintenance",
      shortDescription: "Flush and replace coolant, brake fluid, power steering, and transmission fluid.",
      longDescription: "Every fluid in your car degrades over time — coolant gets acidic, brake fluid absorbs water, transmission fluid burns up. We service all of them at your driveway. Most fluid services are 45–90 minutes. Saves the most expensive repair: a $5,000 transmission rebuild that a $200 fluid service would have prevented.",
      icon: "Droplet",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["coolant flush", "brake fluid flush", "transmission fluid", "mobile fluid service"],
      faqItems: [
        { question: "How often for transmission fluid?", answer: "Every 30K–60K miles for traditional automatics. CVTs and DCTs follow their own schedule — we check yours and recommend per the manufacturer." },
        { question: "Coolant every how long?", answer: "Every 5 years or 100K miles for modern long-life coolant. Texas heat shortens that — every 3 years is safer." },
      ],
    },
    {
      slug: "belts-hoses",
      name: "Belts & Hoses",
      category: "repair",
      shortDescription: "Serpentine belt, timing belt (where applicable), and coolant hoses.",
      longDescription: "Serpentine belts crack and squeal — replace at 60K–100K miles. Timing belts (only on certain engines) are the most important maintenance item in the car; failure = bent valves and a totaled engine. We inspect, replace, and verify proper tension. Cooling system hoses are inspected at every visit and replaced as needed.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["serpentine belt", "timing belt", "radiator hose", "mobile belt replacement"],
      faqItems: [
        { question: "How do I know if I have a timing belt or chain?", answer: "Most modern cars use timing chains (lifetime). Older Hondas, Acuras, some Subarus and Volkswagens use belts. We confirm before quoting — chain = no service needed; belt = critical interval." },
        { question: "What's the belt-squeal noise on cold mornings?", answer: "Usually a worn serpentine belt or a bad tensioner. We'll diagnose at the visit." },
      ],
    },
    {
      slug: "wiper-replacement",
      name: "Wiper Blade Replacement",
      category: "maintenance",
      shortDescription: "Quality wiper blades installed in your driveway — fits any vehicle.",
      longDescription: "Wipers should be replaced annually — they're $20 parts that save your windshield and your visibility. We carry quality beam-style blades for every common vehicle. Add it to any other service for free; standalone visit is also available.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["wiper blade replacement", "wiper installation", "windshield wipers"],
      faqItems: [
        { question: "What's the difference between beam blades and traditional?", answer: "Beam blades have no metal frame — they don't streak in heat or freeze up in cold. Worth the extra $5 per blade." },
        { question: "Do you do rear wipers too?", answer: "Yes, and we carry the awkward shapes most parts stores don't stock." },
      ],
    },
    {
      slug: "light-bulb-replacement",
      name: "Headlight & Tail Light Service",
      category: "maintenance",
      shortDescription: "Headlight, tail light, turn signal, and brake light replacement.",
      longDescription: "Burnt-out headlight or tail light is a fix-it ticket waiting to happen. Some modern vehicles require partial bumper or fender liner removal to access — we have the tools and the patience. LED upgrades available for older halogen vehicles.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["headlight replacement", "tail light", "brake light", "mobile bulb replacement"],
      faqItems: [
        { question: "My headlight just went out — is it always the bulb?", answer: "Usually, yes. Sometimes it's the connector or harness — we'll diagnose if a new bulb doesn't fix it. Modern HID and LED headlights are a different repair entirely." },
        { question: "Can you upgrade my old halogens to LED?", answer: "Yes for many vehicles. Some require additional load resistors to prevent flicker — we know which ones." },
      ],
    },
    {
      slug: "emergency-roadside",
      name: "Emergency Roadside Service",
      category: "emergency",
      shortDescription: "Stranded? We come to you — usually faster than a tow truck.",
      longDescription: "Won't start in a parking lot? Dead battery in the office garage? Flat tire on the school run? We dispatch the closest mobile mechanic and get you running. Often faster than a tow truck, and usually cheaper than a tow + shop diagnostic. Most no-start calls resolved on-site within 60 minutes inside our DFW service area.",
      icon: "ShieldAlert",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: true,
      featured: true,
      keywords: ["roadside assistance", "stranded mechanic", "mobile mechanic emergency", "won't start"],
      faqItems: [
        { question: "How fast can you get to me?", answer: "Most calls inside our primary DFW area are on-site within 60 minutes. We dispatch the closest available technician." },
        { question: "Is it cheaper than a tow?", answer: "Almost always. A tow + shop diagnostic typically runs $200–400 before anything's fixed. Our roadside trip is $99 and applies toward the repair." },
        { question: "What if it's something you can't fix at the roadside?", answer: "Then we honestly tell you, get you to a safe location if needed, and refer to a shop. We don't charge for a no-fix unless the diagnosis itself was the value (e.g., you needed to know whether to tow or not)." },
      ],
    },
    {
      slug: "mobile-tire-repair",
      name: "Mobile Tire Repair (Flat Patch)",
      category: "emergency",
      shortDescription: "Flat tire patched at your driveway — no spare needed.",
      longDescription: "Picked up a nail? We come to your driveway (or your office parking lot), dismount the tire, plug-patch from the inside per industry standard, remount and balance. Done in 45 minutes. Cheaper and safer than driving on the donut spare to a tire shop, and we save the tire if it's repairable.",
      icon: "Wrench",
      priceFrom: null,
      priceDisplay: "Free Quote",
      emergency: false,
      featured: false,
      keywords: ["mobile tire repair", "flat tire", "tire patch", "nail in tire"],
      faqItems: [
        { question: "Is my tire repairable?", answer: "Usually yes if the puncture is in the tread (not the sidewall or shoulder) and the hole is under 1/4 inch. We assess and tell you straight." },
        { question: "Do you replace tires too?", answer: "We don't carry new tires on the truck — that's a tire-shop service. But for a slow leak in an otherwise good tire, a proper plug-patch is the right repair." },
      ],
    },
  ],

  brandsServiced: [
    { name: "Honda", tier: "premium" },
    { name: "Toyota", tier: "premium" },
    { name: "Ford", tier: "premium" },
    { name: "Chevrolet", tier: "premium" },
    { name: "Nissan", tier: "standard" },
    { name: "Hyundai", tier: "standard" },
    { name: "Kia", tier: "standard" },
    { name: "Subaru", tier: "standard" },
    { name: "Lexus", tier: "premium" },
    { name: "Acura", tier: "premium" },
    { name: "BMW", tier: "premium" },
    { name: "Mercedes-Benz", tier: "premium" },
  ],
  brandsInstalled: [
    { name: "Honda", tier: "premium" },
    { name: "Toyota", tier: "premium" },
    { name: "Ford", tier: "premium" },
    { name: "Chevrolet", tier: "premium" },
  ],

  currentSpecials: [
    { title: "Free Mobile Diagnostic with Any Repair Over $200", description: "Our $89 mobile diagnostic is on us when you approve any repair $200 or more. No tow, no shop visit.", validUntil: "2026-12-31", legalDisclaimer: "One per household. Standard diagnostic; advanced electrical or hybrid diagnostics may incur additional fees." },
    { title: "$25 off Mobile Oil Change", description: "Full-synthetic oil change in your driveway. Filter, fluid top-off, and tire-pressure check included.", validUntil: "2026-12-31", legalDisclaimer: "Most cars and light trucks. Diesel and some imports may incur additional cost." },
    { title: "Free Pre-Purchase Inspection Quote", description: "Buying used? We'll quote the inspection upfront, no obligation, and meet you at the seller's location.", validUntil: "2026-12-31", legalDisclaimer: "Inspection itself is $150 — typical 60–90 minutes on-site." },
  ],
  financingPartner: "Synchrony / Sunbit",
  financingDetails: "Flexible monthly payments with approved credit. 0% APR options on qualifying repairs $300+.",
  membershipProgram: {
    name: "Mobile Maintenance Club",
    monthlyPrice: 19,
    benefits: [
      "2 annual full-service inspections in your driveway",
      "15% off all repairs",
      "Priority scheduling",
      "No travel fee inside service area",
      "Free top-offs on routine fluids",
      "Transferable to family vehicles",
    ],
  },
  seniorDiscount: { enabled: true, percentage: 10 },
  militaryDiscount: { enabled: true, percentage: 10 },
  firstTimeCustomerOffer: { description: "$25 off your first mobile service call", amount: "$25" },
  taxCreditCallout: "",

  googleReviewCount: 287,
  googleAverageRating: 4.9,
  completedJobs: 4200,
  technicianCount: 14,

  trustPillars: [
    { icon: "Award", title: "ASE Master Certified", description: "ASE-certified master technicians with the same diagnostic tools dealers use — at your driveway." },
    { icon: "Clock", title: "We Come To You", description: "No tow, no shop wait. Most jobs done in your driveway in under 90 minutes." },
    { icon: "Heart", title: "Family Owned", description: "Locally owned and operated — your neighbors, not a national chain." },
    { icon: "ThumbsUp", title: "Upfront Pricing", description: "Flat-rate pricing approved before any work begins. No surprises." },
  ],

  testimonials: [
    // [EDITOR: replace with real GBP reviews before the client ships.
    //  Plausible-but-placeholder reviews kept here for the demo.]
    { author: "Sarah M.", city: "Plano", rating: 5, text: "Dead battery in the office parking lot at 5 p.m. They were there in 40 minutes, confirmed it was the battery (not the alternator), and swapped it on the spot. Old battery hauled away. Less than I'd have paid AAA + a shop diagnostic.", service: "Battery Replacement", date: "2025-07-18" },
    { author: "Mike R.", city: "Dallas", rating: 5, text: "Brake pedal was pulsing at 60 mph. Tech came to the house, pulled the front wheels, measured the rotors, and replaced pads + rotors in the driveway in under 2 hours. No tow, no Saturday shop wait, and he showed me the worn parts.", service: "Brake Pads & Rotors", date: "2025-06-02" },
    { author: "Jennifer K.", city: "Frisco", rating: 5, text: "Mobile Maintenance Club member — two annual driveway inspections caught a slow oil leak before it became a real problem. Priority scheduling saved me when my starter died right before a road trip.", service: "Maintenance Plan", date: "2025-05-14" },
    { author: "David L.", city: "McKinney", rating: 5, text: "Bought a used Tacoma from a private seller. Met the mechanic at the seller's driveway — full scan tool diagnosis, frame inspection, test drive. Found a transmission code the seller had cleared. Walked away from a $14k mistake. Best $150 I've spent.", service: "Pre-Purchase Inspection", date: "2025-10-22" },
    { author: "Maria G.", city: "Garland", rating: 5, text: "Check engine light, weird idle. Tech brought a real OEM-level scan tool to my driveway, not a parts-store reader. Found a failing mass-airflow sensor, replaced it the same visit. Honest, fast, no upsell.", service: "Mobile Diagnostics", date: "2025-08-09" },
    { author: "Tom B.", city: "Richardson", rating: 5, text: "Stranded with a flat in a Kroger parking lot on a Saturday. They were there in 45 minutes, plug-patched the tire from the inside (proper repair, not just a plug), remounted and balanced. Way cheaper than a tow + tire shop visit.", service: "Mobile Tire Repair", date: "2025-04-30" },
  ],

  siteUrl: "",
  siteTitleTemplate: "{pageTitle} | {businessName} | {primaryCity} Mobile Mechanic",
  defaultDescription: "Mobile auto repair across Dallas-Fort Worth. ASE master technicians come to your driveway for diagnostics, brakes, batteries, oil, and emergency roadside service. No tow, no shop wait.",
  defaultOgImagePath: "/og-image.jpg",
  twitterHandle: "",
  jsonLdLocalBusinessType: "AutoRepair",

  leadFormEndpoint: "",
  leadFormFields: [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "city", label: "City", type: "text", required: true },
    { name: "service", label: "Service Needed", type: "select", required: true, options: ["Mobile Diagnostics", "Brake Pads & Rotors", "Battery / Won't Start", "Mobile Oil Change", "Alternator or Starter", "Roadside / Stranded", "Pre-Purchase Inspection", "Other"] },
    { name: "message", label: "Tell us about the issue", type: "textarea", required: false },
  ],
  leadFormSuccessMessage: "Thanks — we'll be in touch within one business hour.",
  leadFormSlaPromise: "We respond to every request within 60 minutes during business hours.",

  facebookUrl: "[EDITOR: paste real Facebook URL]",
  instagramUrl: "[EDITOR: paste real Instagram URL]",
  googleBusinessUrl: "[EDITOR: paste real GBP shortlink]",
  yelpUrl: "[EDITOR: paste real Yelp URL]",

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
