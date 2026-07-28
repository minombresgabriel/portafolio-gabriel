export const en = {
  nav: {
    home: 'Home',
    about: 'About',
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
  },
  projects: {
    heading: 'Featured Projects',
    github_label: 'See code on GitHub',
    proprietary_label: 'Proprietary — no screenshot',
    items: [
      {
        title: 'Payment Infrastructure — Travel Agency Platform',
        description:
          'Designed and implemented the payment infrastructure for a production travel agency platform, integrating 6+ international gateways (Stripe EU/US, PayPal Advanced Checkout, Revolut, Klarna, Scalapay, Inespay, Fliinow) with webhook handling, HMAC-SHA256 signature verification, and 3DS/SCA compliance.',
        achievements: [
          'Replaced a hardcoded commission system with a configurable dynamic engine supporting 7 formula types',
          'Built an automated account ledger triggered by payment webhooks',
          '6+ gateways in production with full reconciliation and audit trail',
        ],
      },
      {
        title: 'Roles & Permissions System',
        description:
          'Designed a granular, module-level permission system with dynamic menu rendering based on role. Conducted a security audit that identified and patched real route-guard bypass vulnerabilities in the platform.',
        achievements: [
          'Granular permissions per module with dynamic UI rendering per role',
          'Security audit uncovered and resolved real authorization bypass vulnerabilities',
        ],
      },
      {
        title: 'Supplier System for Unicasa',
        description:
          'Complete web application developed for Unicasa suppliers (such as Coca-Cola) to check accounts payable. Includes backend in .NET Core and frontend in React, with SQL Server database.',
        achievements: [
          'Processed 500+ requests/day with less than 100ms response time',
          'Deployed on IIS and used by real providers',
          'Secure authentication and real-time queries',
        ],
      },
    ],
  },
  contact: {
    heading: "Let's Work Together",
    subheading: "Got a project in mind? Drop me a message and I'll get back to you soon.",
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
