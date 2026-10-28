export const profile = {
  name: "Gabriel Ramírez",
  role: "Full-Stack Developer",
  stackLine: "NestJS · React · TypeScript",
  location: "Caracas, Venezuela",
  availability: "Open to remote roles",
  english: "English C1",
  tagline: "I build the systems where money moves.",
  cv: "/Gabriel_Ramirez_CV_EN.pdf",
  email: "minombresgabriel@gmail.com",
  linkedin: "https://linkedin.com/in/gabriel-ramirez-soto",
  github: "https://github.com/minombresgabriel",
};

export type PlanetId = "engine" | "shield" | "crystal" | "station" | "signal";

export type Metric = { value: string; label: string };

export type Planet = {
  id: PlanetId;
  name: string;
  subtitle: string;
  /** One plain-language sentence: what this is, for someone skimming. */
  hook: string;
  /** Headline numbers; the first one is the key result. */
  metrics: Metric[];
  /** How it works, as a left-to-right flow of steps. */
  flow: string[];
  color: string;
  challenge: string;
  approach: string;
  result: string[];
  tech: string[];
};

export const planets: Planet[] = [
  {
    id: "engine",
    flow: ["Booking", "Rule from data", "1 of 7 formula types", "Currency conversion", "Commission"],
    name: "The Engine",
    subtitle: "Commission Engine",
    hook: "A configurable commission engine: the business changes pricing without touching code.",
    metrics: [
      { value: "400 → 7", label: "switch/case lines → formula types" },
      { value: "5", label: "currencies, from day one" },
      { value: "0", label: "deploys per pricing change" },
    ],
    color: "#f2a650",
    challenge:
      "Commission logic lived in a 400-line switch/case. Every pricing rule meant a code change, a review and a deploy — and every change risked breaking the others.",
    approach:
      "Replaced the switch with 7 configurable formula types resolved from data at runtime, multi-currency from the ground up.",
    result: [
      "Pricing changes ship without a deploy",
      "Multi-currency: EUR / USD / COP / VES / ARS",
      "One tested engine instead of 400 lines of branches",
    ],
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    id: "shield",
    flow: ["Checkout", "Stripe · PayPal · Klarna", "3DS challenge, only if required", "Authenticated payment"],
    name: "The Shield",
    subtitle: "3D Secure",
    hook: "Strong Customer Authentication for European cards, across three providers, behind one checkout.",
    metrics: [
      { value: "3", label: "providers: Stripe, PayPal, Klarna" },
      { value: "SCA", label: "compliant 3D Secure" },
      { value: "1", label: "consistent checkout flow" },
    ],
    color: "#62d6f2",
    challenge:
      "European cards require Strong Customer Authentication. Payments needed 3D Secure across three very different providers, without adding friction where it wasn't needed.",
    approach:
      "Implemented 3D Secure across Stripe, PayPal and Klarna behind one consistent checkout. When customers hit unexpected challenges, traced the friction to its root cause.",
    result: [
      "SCA-compliant 3DS on Stripe, PayPal and Klarna",
      "Unexpected friction root-caused to issuer enrollment gaps",
      "One consistent authentication flow",
    ],
    tech: ["Stripe", "PayPal", "Klarna", "3D Secure", "NestJS", "React"],
  },
  {
    id: "crystal",
    flow: ["Provider webhook", "Idempotency check", "Atomic transfer", "Ledger entry", "Balances in sync"],
    name: "The Crystal",
    subtitle: "Ledger",
    hook: "A webhook-driven ledger that keeps money correct, even when networks fail and providers retry.",
    metrics: [
      { value: "0", label: "double-charges from retries" },
      { value: "Atomic", label: "transfers, never half-updated" },
      { value: "Safe", label: "retries via idempotent fees" },
    ],
    color: "#a98cff",
    challenge:
      "Providers retry webhooks, networks fail halfway and users double-click. Any of these can charge a customer twice or leave balances out of sync.",
    approach:
      "Built a webhook-driven ledger where every movement is an atomic transfer and every fee is idempotent: the same event, processed twice, has a single effect.",
    result: [
      "Webhook-driven ledger as the source of truth",
      "Atomic transfers — balances are never half-updated",
      "Idempotent fees — retries are safe by design",
    ],
    tech: ["NestJS", "PostgreSQL", "Prisma", "Redis", "Webhooks"],
  },
  {
    id: "station",
    flow: ["10+ gateways", "Unified integration layer", "One operational view", "Payment links API"],
    name: "The Station",
    subtitle: "Gateways",
    hook: "Ten-plus payment gateways in production, unified into a single operational view.",
    metrics: [
      { value: "10+", label: "gateways live in production" },
      { value: "8", label: "unified into one view" },
      { value: "1", label: "payment links API for partners" },
    ],
    color: "#45e0a8",
    challenge:
      "Every market needs its own payment methods. Every new gateway meant a new integration, a new dashboard and a new way for things to fail.",
    approach:
      "Integrated Stripe, PayPal, Klarna, Redsys/Bizum, Revolut, Inespay, MercadoPago, Scalapay, Fliinow and Addi in production, then unified 8 of them into a single operational view.",
    result: [
      "10+ gateways live in production",
      "8 unified into one view",
      "Payment links API for third-party apps",
    ],
    tech: ["NestJS", "TypeScript", "PostgreSQL", "React", "Redux Toolkit"],
  },
  {
    id: "signal",
    flow: ["Customer message", "AI suggests a reply", "Agent reviews & edits", "Reply on WhatsApp"],
    name: "The Signal",
    subtitle: "AI",
    hook: "An AI copilot for sales agents inside WhatsApp chats, with the human in control of every message.",
    metrics: [
      { value: "AI", label: "assistance inside customer chats" },
      { value: "Human", label: "in control of every message" },
    ],
    color: "#e9edf5",
    challenge:
      "Sales agents handle many customer conversations on WhatsApp at once, and every minute of response time matters.",
    approach:
      "Built an AI module that assists sales agents inside customer chats, keeping the human in control of every message.",
    result: [
      "AI assistance inside the agent's workflow",
      "Conversations augmented, not automated away",
    ],
    tech: ["LLMs", "n8n", "NestJS", "TypeScript"],
  },
];

export const experience = [
  {
    company: "Arcadia Viajes",
    role: "Full-Stack Developer",
    period: "Aug 2025 – present",
    summary:
      "Multi-tenant travel SaaS (Punto Aéreo, Turisto, Viajes Nova). Modules: RBAC permissions, ticket issuance, benefits, payment links, eSIM marketplace, exchange-rate calculator, third-party APIs.",
  },
  {
    company: "Hatel Studio",
    role: "Web Developer",
    period: "Nov 2023 – Mar 2024",
    summary: "WordPress + SEO.",
  },
  {
    company: "Rubicon Software (Spain, remote)",
    role: "Software Developer",
    period: "May – Jul 2022",
    summary: "ERP and warehouse software.",
  },
];

export const stack = [
  { group: "Backend", items: ["NestJS", "Node.js", "TypeScript", "Prisma", "PostgreSQL", "Redis"] },
  { group: "Frontend", items: ["React", "Next.js", "Redux Toolkit", "Tailwind"] },
  { group: "Payments", items: ["Stripe", "PayPal", "Klarna", "3D Secure"] },
  { group: "AI & Automation", items: ["LLMs", "n8n"] },
];

// Camera stops: home, the five planets, then contact.
export const STOPS = ["home", ...planets.map((p) => p.id), "contact"] as const;
export type StopId = (typeof STOPS)[number];
export const CONTACT_STOP = STOPS.length - 1;
