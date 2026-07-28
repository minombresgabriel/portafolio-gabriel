import type { CaseStudyId, ArchiveId } from '@/data/projects';

export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
  },
  hero: {
    typeSequence: [
      'Full Stack Developer',
      'Payment Systems & Fintech',
      'Backend Architect — NestJS & PostgreSQL',
    ],
    subtitle:
      'Full Stack Developer specializing in payment integrations and financial systems. I build robust, production-ready platforms for real businesses.',
    cta_projects: 'See my projects',
    cta_contact: 'Contact me',
    ticker: [
      '6+ payment gateways live in production',
      '8 providers unified into one view',
      '0 double-charges — idempotent by design',
      '400 → 7 commission rules, zero-deploy pricing',
      '3DS/SCA compliant checkout',
    ],
  },
  about: {
    heading: 'About Me',
    p1: 'I am <strong>Gabriel Ramírez</strong>, a full-stack developer currently leading the financial and operational modules at <strong class="cyan">Arcadia Group</strong>, a travel agency platform in production, since August 2025.',
    p2: 'I specialize in <strong class="cyan">payment system integrations</strong> — I have shipped 6+ gateways in production (Stripe EU/US, PayPal Advanced Checkout, Revolut, Klarna, Scalapay, Inespay, Fliinow), handling webhooks, HMAC-SHA256 signature verification, 3DS/SCA compliance, and automated reconciliation.',
    p3: 'Beyond payments, I designed the platform\'s role/permission system, conducted a security audit that uncovered real route-guard bypass vulnerabilities, and manage production database migrations. My stack is <strong class="cyan">NestJS · Prisma · PostgreSQL · React · TypeScript</strong>.',
    p4: 'Self-taught by nature — I pick up new tools fast and integrate AI into my workflow. My focus is always on shipping solutions that hold up in production.',
    cv_label: 'Download CV',
    cv_file: '/Gabriel_Ramirez_CV_EN.pdf',
  },
  skills: {
    heading: 'Technical Skills',
    groups: {
      frontend: 'Frontend & UI',
      backend: 'Backend & APIs',
      payments: 'Payments & Fintech',
      infra: 'Infra & Deployment',
      generalist: 'I also work with',
    } satisfies Record<'frontend' | 'backend' | 'payments' | 'infra' | 'generalist', string>,
  },
  dualOwnership: {
    heading: 'One Developer, Two Sides of the Stack',
    financialLabel: 'Financial Core',
    financialItems: [
      'Commission engine: 7 configurable formula types replacing a 400-line switch/case',
      '3DS/SCA compliance across Stripe, PayPal, and Klarna',
      'Webhook-driven ledger with idempotent, atomic transfers',
      '8 payment providers unified into a single operational view',
    ],
    platformLabel: 'Platform Architecture',
    platformItems: [
      'Role & permission system designed from scratch',
      'Security audit — found and patched real route-guard bypass vulnerabilities',
      'Prisma migrations managed across dev, staging, and production',
      'Supporting infra: cron jobs, B2B subdomain migration',
    ],
    closing: 'Most payments developers only touch one side of this. I own both.',
  },
  caseStudies: {
    heading: 'Selected Case Studies',
    items: {
      'commissions-engine': {
        title: 'Dynamic Payment Commissions Engine',
        description:
          'Replaced a 400-line hardcoded switch/case with a configurable commission engine supporting 7 formula types, driven entirely from an admin UI — no deploy required to change pricing.',
        achievements: [
          '7 configurable formula types covering every commission scenario in production',
          'Admin-UI driven — pricing changes ship without a code deploy',
          'Eliminated a 400-line hardcoded switch/case',
        ],
        shortTitle: 'Commissions',
        figureWord: '400 → 7',
      },
      '3ds-enforcement': {
        title: '3D Secure Enforcement — and Its Real-World Limits',
        description:
          "Implemented 3DS/SCA compliance across Stripe, PayPal, and Klarna. When friction rates didn't match expectations after launch, I investigated root cause and traced it to real issuer enrollment gaps — not application bugs.",
        achievements: [
          '3DS/SCA compliance shipped across 3 payment gateways',
          'Root-caused unexpected friction rates post-launch',
          'Diagnosis pointed to issuer-side enrollment gaps, not code defects',
        ],
        shortTitle: '3DS',
        figureWord: '3DS',
      },
      'accounts-ledger': {
        title: 'Automated Accounts Ledger',
        description:
          'Built a webhook-driven balance ledger with atomic transfers and idempotent fee handling — engineered so a retried or duplicate webhook can never produce a double-charge or leave an account in a half-updated state.',
        achievements: [
          'Webhook-driven balance updates, no manual reconciliation',
          'Atomic transfers — no partial or half-applied states',
          'Idempotent fee handling — duplicate webhooks never double-charge',
        ],
        shortTitle: 'Ledger',
        figureWord: 'ATOMIC',
      },
      'unified-payments-view': {
        title: 'Unified Multi-Provider Payments View',
        description:
          'Consolidated 8 separate payment providers into a single operational screen, giving the finance team one place to reconcile transactions instead of switching between eight dashboards.',
        achievements: [
          '8 payment providers consolidated into one screen',
          'Built with React, Next.js, and Redux Toolkit / RTK Query',
          "Cut the finance team's reconciliation workflow from 8 tools to 1",
        ],
        shortTitle: 'Unified View',
        statLabel: 'payment providers, one screen',
      },
    } satisfies Record<
      CaseStudyId,
      {
        title: string;
        description: string;
        achievements: string[];
        shortTitle: string;
        figureWord?: string;
        statLabel?: string;
      }
    >,
  },
  archive: {
    heading: 'Before Arcadia',
    github_label: 'See code on GitHub',
    items: {
      unicasa: {
        title: 'Supplier System — Unicasa',
        description:
          "An earlier role: a .NET Core/React supplier portal built for Unicasa's vendors (including Coca-Cola) to check accounts payable. 500+ requests/day, sub-100ms responses, deployed on IIS.",
      },
    } satisfies Record<ArchiveId, { title: string; description: string }>,
  },
  contact: {
    heading: "Let's Solve It Together",
    subheading:
      "A payments integration, a security audit, or a migration that can't go wrong — that's exactly the kind of problem I solve.",
    availability: 'Open to remote roles · Caracas, Venezuela · English C1',
    directLabel: 'Or reach out directly',
    emailEndpoint: 'Email',
    linkedinEndpoint: 'LinkedIn',
    githubEndpoint: 'GitHub',
    name: 'Name',
    email: 'Email',
    message: 'Your message...',
    submit: 'Send Message',
  },
  footer: {
    rights: 'All rights reserved.',
    built_with: 'Developed with',
  },
};

export type Translations = typeof en;
