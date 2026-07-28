export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  placeholder?: { gradient: string; icon: 'payment' | 'security' };
  link?: string;
  github?: string;
  achievements: string[];
}

export const projects: Project[] = [
  {
    title: "Payment Infrastructure — Travel Agency Platform",
    description:
      "Designed and implemented the payment infrastructure for a production travel agency platform, integrating 6+ international gateways (Stripe EU/US, PayPal Advanced Checkout, Revolut, Klarna, Scalapay, Inespay, Fliinow) with webhook handling, HMAC-SHA256 signature verification, and 3DS/SCA compliance.",
    tech: ["NestJS", "PostgreSQL", "Prisma", "Stripe API", "PayPal SDK", "TypeScript"],
    placeholder: {
      gradient: "from-cyan-950 via-emerald-950 to-blue-950",
      icon: "payment",
    },
    achievements: [
      "Replaced a hardcoded commission system with a configurable dynamic engine supporting 7 formula types",
      "Built an automated account ledger triggered by payment webhooks",
      "6+ gateways in production with full reconciliation and audit trail",
    ],
  },
  {
    title: "Roles & Permissions System",
    description:
      "Designed a granular, module-level permission system with dynamic menu rendering based on role. Conducted a security audit that identified and patched real route-guard bypass vulnerabilities in the platform.",
    tech: ["NestJS", "PostgreSQL", "Prisma", "TypeScript"],
    placeholder: {
      gradient: "from-purple-950 via-indigo-950 to-gray-950",
      icon: "security",
    },
    achievements: [
      "Granular permissions per module with dynamic UI rendering per role",
      "Security audit uncovered and resolved real authorization bypass vulnerabilities",
    ],
  },
  {
    title: "Supplier System for Unicasa",
    description:
      "Complete web application developed for Unicasa suppliers (such as Coca-Cola) to check accounts payable. Includes backend in .NET Core and frontend in React, with SQL Server database.",
    tech: [".NET Core", "React", "TypeScript", "Vite", "SQL Server", "IIS", "Bootstrap"],
    image: "/images/proyectos/sistema-proveedores.png",
    github: "https://github.com/minombresgabriel/sistema-proveedores",
    achievements: [
      "Processed 500+ requests/day with less than 100ms response time",
      "Deployed on IIS and used by real providers",
      "Secure authentication and real-time queries",
    ],
  },
];
