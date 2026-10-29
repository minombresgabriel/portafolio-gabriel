/**
 * GABRIEL RAMÍREZ: THE GAME — single source of truth for every piece of text.
 * Components must read from here; never hardcode copy inside a component.
 */

export type Lang = 'en' | 'es';
export const DEFAULT_LANG: Lang = 'en';

// ---------------------------------------------------------------------------
// IDs
// ---------------------------------------------------------------------------

export type MenuItemId =
  | 'story'
  | 'player-card'
  | 'achievements'
  | 'inventory'
  | 'multiplayer'
  | 'download';

export const MENU_ORDER: readonly MenuItemId[] = [
  'story',
  'player-card',
  'achievements',
  'inventory',
  'multiplayer',
  'download',
];

export type WorldId = 'w1' | 'w2' | 'w3' | 'w4' | 'w5' | 'w6' | 'w7';
export const WORLD_ORDER: readonly WorldId[] = ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7'];

export type BossId = 'boss-400' | 'boss-ghost' | 'boss-3ds' | 'boss-hydra' | 'quest-ai';
export const BOSS_ORDER: readonly BossId[] = [
  'boss-400',
  'boss-ghost',
  'boss-3ds',
  'boss-hydra',
  'quest-ai',
];

export type StatId = 'backend' | 'payments' | 'frontend' | 'ai' | 'debugging' | 'coffee';
export const STAT_ORDER: readonly StatId[] = [
  'backend',
  'payments',
  'frontend',
  'ai',
  'debugging',
  'coffee',
];

export type AchievementId =
  | 'payment-wizard'
  | 'api-master'
  | 'bug-hunter'
  | 'ghostbuster'
  | 'ai-sales'
  | 'permissions'
  | 'telegram'
  | 'analytics'
  | 'module-builder'
  | 'front-redesign'
  | 'bilingual-boss'
  | 'locked';

export const ACHIEVEMENT_ORDER: readonly AchievementId[] = [
  'payment-wizard',
  'api-master',
  'bug-hunter',
  'ghostbuster',
  'ai-sales',
  'permissions',
  'telegram',
  'analytics',
  'module-builder',
  'front-redesign',
  'bilingual-boss',
  'locked',
];

export type InventoryTabId = 'weapons' | 'armor' | 'magic' | 'spells';
export const INVENTORY_TAB_ORDER: readonly InventoryTabId[] = ['weapons', 'armor', 'magic', 'spells'];

export type ItemId =
  | 'nestjs'
  | 'nodejs'
  | 'typescript'
  | 'prisma'
  | 'postgresql'
  | 'redis'
  | 'react'
  | 'nextjs'
  | 'redux'
  | 'tailwind'
  | 'wordpress'
  | 'stripe'
  | 'paypal'
  | 'klarna'
  | 'mercadopago'
  | 'bizum'
  | 'santander'
  | 'revolut'
  | 'fliinow'
  | 'inespay'
  | '3ds'
  | 'bnpl'
  | 'llms'
  | 'n8n'
  | 'github'
  | 'cursor'
  | 'claude'
  | 'dbeaver';

// ---------------------------------------------------------------------------
// Language-independent data
// ---------------------------------------------------------------------------

export const shared = {
  name: 'Gabriel Ramírez',
  email: 'minombresgabriel@gmail.com',
  linkedin: { label: 'linkedin.com/in/gabriel-ramirez-soto', url: 'https://linkedin.com/in/gabriel-ramirez-soto' },
  github: { label: 'github.com/minombresgabriel', url: 'https://github.com/minombresgabriel' },
  worldLinks: {
    w7: 'https://krality.vercel.app/',
  } satisfies Partial<Record<WorldId, string>>,
  age: 25,
  stats: {
    backend: 90,
    payments: 94,
    frontend: 84,
    ai: 80,
    debugging: 91,
    coffee: 99,
  } satisfies Record<StatId, number>,
  worldYears: {
    w1: '2019',
    w2: '2020–2022',
    w3: '2022',
    w4: '2023–2024',
    w5: '2023–2025',
    w6: '2025–NOW',
    w7: 'KRALITY',
  } satisfies Record<WorldId, string>,
  worldKind: {
    w1: 'education',
    w2: 'education',
    w3: 'work',
    w4: 'work',
    w5: 'education',
    w6: 'work',
    w7: 'future',
  } satisfies Record<WorldId, 'work' | 'education' | 'future'>,
  /** Tool icons on a level card (sprites in public/sprites/items/). */
  worldTools: {
    w2: [
      { sprite: 'html', name: 'HTML' },
      { sprite: 'css', name: 'CSS' },
      { sprite: 'javascript', name: 'JavaScript' },
      { sprite: 'mysql', name: 'MySQL' },
      { sprite: 'postgresql', name: 'PostgreSQL' },
    ],
    w4: [
      { sprite: 'wordpress', name: 'WordPress' },
      { sprite: 'elementor', name: 'Elementor' },
      { sprite: 'seo', name: 'SEO' },
      { sprite: 'speed', name: 'PageSpeed' },
      { sprite: 'server', name: 'Hosting' },
    ],
    w5: [
      { sprite: 'react', name: 'React' },
      { sprite: 'vite', name: 'Vite' },
      { sprite: 'tailwind', name: 'Tailwind CSS' },
      { sprite: 'nestjs', name: 'NestJS' },
    ],
    w6: [
      { sprite: 'react', name: 'React' },
      { sprite: 'nestjs', name: 'NestJS' },
      { sprite: 'postgresql', name: 'PostgreSQL' },
      { sprite: 'prisma', name: 'Prisma' },
    ],
  } satisfies Partial<Record<WorldId, { sprite: string; name: string }[]>>,
  inventory: {
    weapons: ['nestjs', 'nodejs', 'typescript', 'prisma', 'postgresql', 'redis', 'github', 'cursor', 'claude', 'dbeaver'],
    armor: ['react', 'nextjs', 'redux', 'tailwind', 'wordpress'],
    magic: ['mercadopago', 'stripe', 'klarna', 'paypal', 'bizum', 'santander', 'revolut', 'fliinow', 'inespay', '3ds', 'bnpl'],
    spells: ['llms', 'n8n'],
  } satisfies Record<InventoryTabId, ItemId[]>,
  itemNames: {
    nestjs: 'NestJS',
    nodejs: 'Node.js',
    typescript: 'TypeScript',
    prisma: 'Prisma',
    postgresql: 'PostgreSQL',
    redis: 'Redis',
    react: 'React',
    nextjs: 'Next.js',
    redux: 'Redux Toolkit',
    tailwind: 'Tailwind',
    wordpress: 'WordPress',
    stripe: 'Stripe',
    paypal: 'PayPal',
    klarna: 'Klarna',
    mercadopago: 'Mercado Pago',
    bizum: 'Bizum',
    santander: 'Santander',
    revolut: 'Revolut',
    fliinow: 'Fliinow',
    inespay: 'Inespay',
    '3ds': '3D Secure',
    bnpl: 'BNPL',
    llms: 'LLMs',
    n8n: 'n8n',
    github: 'GitHub',
    cursor: 'Cursor',
    claude: 'Claude',
    dbeaver: 'DBeaver',
  } satisfies Record<ItemId, string>,
  gateways: [
    'Stripe EU/US',
    'PayPal',
    'Klarna',
    'Redsys/Bizum',
    'Revolut',
    'Inespay',
    'MercadoPago',
    'Scalapay',
    'Fliinow',
    'Addi',
  ],
  currencies: ['EUR', 'USD', 'COP', 'VES', 'ARS'],
  rewardXp: 500,
} as const;

// ---------------------------------------------------------------------------
// Translatable content
// ---------------------------------------------------------------------------

export type WorldContent = {
  label: string;
  title: string;
  place?: string;
  tagline: string;
  details?: string[];
  /** Longer in-game story for the level card. */
  summary?: string;
  /** "Skills unlocked" list on the level card. */
  learned?: string[];
  /** Pixel badges shown on the level card (sprites live in public/sprites/worlds/). */
  badges?: { sprite: string; caption: string }[];
  /** A short code listing shown in a retro editor window; the file extension picks the highlighting. */
  snippet?: { file: string; code: string };
  /** A process drawn as linked steps (e.g. an ERP document flow). */
  flow?: { title: string; steps: string[] };
  /** A parent company and the brands it runs, drawn as a small tree in the header. */
  family?: { parent: { sprite: string; caption: string }; children: { sprite: string; caption: string }[] };
  /** Call-to-action button text; the URL lives in `shared.worldLinks`. */
  linkLabel?: string;
  /** Sites built for clients, shown as link cards; logos live in public/sprites/worlds/. */
  projects?: { sprite: string; name: string; url: string; description: string }[];
  locked?: boolean;
  /** Plain-language line for the /resume page (the tagline is in-game flavor). */
  resumeLine?: string;
};

export type BossContent = {
  kind: 'boss' | 'side-quest';
  name: string;
  /** Plain case-study title for the /resume page. */
  resumeTitle: string;
  intro: string;
  story: string;
  unlocked: string[];
};

export type GameContent = {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    skipToResume: string;
    skipToResumeShort: string;
    gameTitleLine1: string;
    gameTitleLine2: string;
    gameSubtitle: string;
    pressStart: string;
    titleFooter: string;
    bootLogo: string;
    bootSystem: string;
    bootSkip: string;
    hintSelect: string;
    hintConfirm: string;
    hintBack: string;
    hintMove: string;
    power: string;
    consoleBrand: string;
    langToggle: string;
    langToggleAria: string;
    fxOn: string;
    fxOff: string;
    fxAria: string;
    footerControls: string;
    footerSkip: string;
    footerBuilt: string;
    underConstruction: string;
    underConstructionBody: string;
    back: string;
    menuAria: string;
  };
  menu: Record<MenuItemId, string>;
  cvFile: string;
  playerCard: {
    heading: string;
    role: string;
    nationality: string;
    english: string;
    ageLabel: string;
    stats: Record<StatId, string>;
    specialMoveLabel: string;
    specialMove: string;
    bio: string;
  };
  story: {
    heading: string;
    hint: string;
    mapLegendHome: string;
    mapLegendAbroad: string;
    worlds: Record<WorldId, WorldContent>;
    bossSelect: string;
    learnedLabel: string;
    projectsLabel: string;
    projectVisit: string;
    toolsLabel: string;
    familyLabel: string;
    lockedNotice: string;
    /** Replaces "NOW" in year ranges on the map. */
    now: string;
  };
  bosses: Record<BossId, BossContent>;
  level: {
    bossLabel: string;
    sideQuestLabel: string;
    defeated: string;
    completed: string;
    unlockedLabel: string;
    reward: string;
    continue: string;
  };
  achievements: {
    heading: string;
    items: Record<AchievementId, { title: string; description: string }>;
  };
  inventory: {
    heading: string;
    tabs: Record<InventoryTabId, { label: string; subtitle: string }>;
    items: Record<ItemId, string>;
  };
  resume: {
    metaTitle: string;
    metaDescription: string;
    role: string;
    location: string;
    english: string;
    playGame: string;
    download: string;
    langToggle: string;
    langToggleAria: string;
    sections: {
      about: string;
      highlights: string;
      caseStudies: string;
      experience: string;
      education: string;
      skills: string;
      contact: string;
    };
    highlights: { value: string; label: string }[];
    present: string;
    contactBody: string;
  };
  multiplayer: {
    heading: string;
    nameLabel: string;
    namePlaceholder: string;
    replyLabel: string;
    replyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    error: string;
    connectVia: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    sent: string;
    continuePrompt: string;
    thanks: string;
  };
};

const en: GameContent = {
  meta: {
    title: 'Gabriel Ramírez: The Game | Full-Stack Developer',
    description:
      'Play through the portfolio of Gabriel Ramírez, Full-Stack Developer from Caracas, Venezuela: production SaaS, 10+ payment gateways, integrations and applied AI.',
  },
  ui: {
    skipToResume: 'Skip to resume',
    skipToResumeShort: 'Resume',
    gameTitleLine1: 'GABRIEL',
    gameTitleLine2: 'RAMÍREZ',
    gameSubtitle: 'FULL-STACK DEVELOPER',
    pressStart: 'PRESS START',
    titleFooter: '© 2026 · 1 PLAYER · HIRE MODE',
    bootLogo: 'GR',
    bootSystem: 'SYSTEM 16',
    bootSkip: 'PRESS ANY KEY',
    hintSelect: 'SELECT',
    hintConfirm: 'CONFIRM',
    hintBack: 'BACK',
    hintMove: 'MOVE',
    power: 'POWER',
    consoleBrand: 'GR SYSTEM 16',
    langToggle: 'ES',
    langToggleAria: 'Cambiar a español',
    fxOn: 'CRT ON',
    fxOff: 'CRT OFF',
    fxAria: 'Toggle CRT scanlines and flicker',
    footerControls: 'CONTROLS: ARROWS + ENTER + ESC · MOUSE · TOUCH',
    footerSkip: 'SKIP TO RESUME (PLAIN VERSION)',
    footerBuilt: 'BUILT WITH CODE AND PIXELS',
    underConstruction: 'UNDER CONSTRUCTION',
    underConstructionBody: 'This level is still being built. Come back in the next patch!',
    back: 'BACK',
    menuAria: 'Main menu',
  },
  menu: {
    story: 'STORY MODE',
    'player-card': 'PLAYER CARD',
    achievements: 'ACHIEVEMENTS',
    inventory: 'INVENTORY',
    multiplayer: 'MULTIPLAYER',
    download: 'DOWNLOAD SAVE FILE',
  },
  cvFile: '/Gabriel_Ramirez_CV_EN.pdf',
  playerCard: {
    heading: 'PLAYER CARD',
    role: 'FULL-STACK',
    nationality: 'Venezuela',
    english: 'English C1',
    ageLabel: 'AGE',
    stats: {
      backend: 'BACKEND',
      payments: 'PAYMENTS',
      frontend: 'FRONTEND',
      ai: 'AI',
      debugging: 'DEBUGGING',
      coffee: 'COFFEE',
    },
    specialMoveLabel: 'SPECIAL MOVE',
    specialMove: 'Turbo learning: I master a new technology in days.',
    bio: "Hi! I'm Gabriel, Full-Stack Developer from Caracas, Venezuela. I build and run production SaaS, specialized in payments, integrations and applied AI.",
  },
  story: {
    heading: 'STORY MODE',
    hint: 'MOVE',
    mapLegendHome: 'CARACAS',
    mapLegendAbroad: 'SPAIN',
    worlds: {
      w1: {
        label: 'WORLD 1',
        title: 'UCV Programming Diploma',
        place: 'Universidad Central de Venezuela · Caracas',
        tagline: 'A new hero discovers code.',
        summary:
          'This is where it all began. At the Universidad Central de Venezuela I wrote my first lines of code in Pascal, a strict language that taught me to think before typing: turn any problem into a step-by-step algorithm. I still build on that foundation in every system I ship.',
        learned: [
          'Logic and algorithms',
          'Pseudocode',
          'Variables and data types',
          'Conditionals (if / case)',
          'Loops (for / while / repeat)',
          'Arrays and records',
          'Procedures and functions',
          'Step-by-step debugging',
        ],
        badges: [
          { sprite: 'ucv', caption: 'UCV' },
          { sprite: 'pascal', caption: 'Pascal' },
        ],
        snippet: {
          file: 'HELLO.PAS',
          code: "program Hello;\nbegin\n  writeln('Hello, world!');\nend.",
        },
        resumeLine:
          'Introduction to programming with Pascal: algorithms, control structures, arrays and records, procedures and functions.',
      },
      w2: {
        label: 'WORLD 2',
        title: 'UNEWEB',
        place: 'Caracas, Venezuela',
        tagline: 'Training arc.',
        summary:
          'At UNEWEB I went back over the fundamentals of programming and completed the Web Master program. I jumped from the console to the browser: building web pages with HTML, CSS and JavaScript, and learning to store and query data with MySQL and PostgreSQL. This is where the full-stack developer was born.',
        learned: [
          'Intro to programming',
          'Page structure with HTML',
          'Styling and layout with CSS',
          'Interactivity with JavaScript',
          'Database design',
          'SQL queries',
          'Complete websites',
        ],
        badges: [{ sprite: 'uneweb', caption: 'UNEWEB' }],
        snippet: {
          file: 'index.html',
          code: "<h1>Hello, web!</h1>\n<script>\n  alert('My first page');\n</script>",
        },
        resumeLine: 'Intro to programming and the Web Master program: HTML, CSS, JavaScript, MySQL and PostgreSQL.',
      },
      w3: {
        label: 'WORLD 3',
        title: 'Rubicon Software',
        place: 'Tarragona, Spain (remote)',
        tagline: 'First mission abroad: ERP and warehouse software.',
        summary:
          'My first job as a developer, working remotely for a company in Tarragona. In a 3-month trial period I learned Velneo, their ERP platform: how code and data flow, how the database is modeled, and how a real team organizes workflows and tasks. Short, but I learned how an ERP works from the inside.',
        learned: [
          'Velneo ERP platform',
          'Code and data flow',
          'Relational databases',
          'Workflows and tasks',
          'ERP and warehouse processes',
          'Remote work with a team in Spain',
        ],
        badges: [
          { sprite: 'velneo', caption: 'Velneo' },
          { sprite: 'spain', caption: 'Remote' },
        ],
        flow: { title: 'ERP FLOW', steps: ['Order', 'Stock', 'Delivery note', 'Invoice'] },
        resumeLine: 'ERP and warehouse software for a company in Tarragona, Spain, working remotely. Learned the Velneo ERP platform: code and data flow, databases and team workflows.',
      },
      w4: {
        label: 'WORLD 4',
        title: 'Hatel Studio',
        place: 'Digital marketing agency',
        tagline: 'Building websites with WordPress + SEO, blogs and news portals.',
        summary:
          'Five months at a digital marketing agency, building websites, blogs and digital content for clients with WordPress and Elementor. Here I learned that a website does not just have to look good: it has to show up on Google and load fast. I worked on SEO, page-speed optimization and server and hosting setup.',
        learned: [
          'WordPress websites',
          'Layouts with Elementor',
          'WordPress plugins',
          'On-page SEO',
          'Page-speed optimization',
          'Servers and hosting',
          'Blogs and digital content',
        ],
        badges: [{ sprite: 'hatel', caption: 'Hatel Studio' }],
        flow: { title: 'WEB FLOW', steps: ['Design', 'WordPress', 'SEO', 'Speed', 'Launch'] },
        resumeLine: 'Five months at a digital marketing agency: websites, blogs and news portals with WordPress and Elementor, plus SEO, page-speed optimization and hosting.',
      },
      w5: {
        label: 'WORLD 5',
        title: 'TSU in Informatics, ISUM',
        place: 'University degree · Advanced Technician in Informatics',
        tagline: 'Level up: degree unlocked.',
        summary:
          'My university degree: I graduated as an Advanced University Technician (TSU) in Informatics at ISUM. I strengthened the computing fundamentals and made the jump to modern frameworks: React, Vite, Tailwind and NestJS. Alongside my studies I started building my own projects to gain experience, and selling them to clients: my first income as a developer.',
        learned: [
          'Computing fundamentals',
          'React',
          'Vite',
          'Tailwind CSS',
          'NestJS',
          'Personal projects',
          'Freelance: selling and billing projects',
        ],
        badges: [
          { sprite: 'isum', caption: 'ISUM' },
          { sprite: 'tsu', caption: 'TSU' },
        ],
        flow: { title: 'FREELANCE MODE', steps: ['Idea', 'Project', 'Client', 'Payment'] },
        resumeLine: 'Advanced University Technician (TSU) in Informatics. Modern frameworks (React, Vite, Tailwind, NestJS) and my first freelance projects sold to clients.',
      },
      w6: {
        label: 'WORLD 6',
        title: 'Arcadia Viajes',
        tagline: 'One SaaS, three agencies, one team.',
        summary:
          'My current mission. At Arcadia Viajes I work with three travel agencies, Turisto, Punto Aéreo and Viajes Nova, all running on one multi-tenant SaaS. I build and support all three at the same time, above all their flight system: ticket issuance, payments and the integrations that connect everything.',
        family: {
          parent: { sprite: 'arcadia', caption: 'Arcadia' },
          children: [
            { sprite: 'turisto', caption: 'Turisto' },
            { sprite: 'puntoaereo', caption: 'Punto Aéreo' },
            { sprite: 'viajesnova', caption: 'Viajes Nova' },
          ],
        },
        resumeLine: 'Multi-tenant travel SaaS powering Punto Aéreo, Turisto and Viajes Nova. Specialized in payments, integrations and applied AI.',
        details: [
          'RBAC permissions',
          'Ticket issuance',
          'Benefits',
          'Payment links',
          'eSIM marketplace',
          'Exchange-rate calculator',
          'APIs for third-party apps',
        ],
      },
      w7: {
        label: 'WORLD 7',
        title: 'KRALITY',
        place: 'My own company · Websites, SaaS & custom software',
        tagline: 'Next level: my own studio, building for others.',
        summary:
          'Krality is my company and my plan for what comes next. Everything I learned along the way now goes into building websites, SaaS platforms and custom software for other businesses, from design to production.',
        badges: [{ sprite: 'krality', caption: 'Krality' }],
        details: ['Websites', 'SaaS', 'Custom software'],
        linkLabel: 'VISIT KRALITY',
        projects: [
          {
            sprite: 'asalazar',
            name: 'A. Salazar Ink',
            url: 'https://asalazarink.vercel.app/',
            description: 'Website for a tattoo artist in Charlotte, USA.',
          },
          {
            sprite: 'myswimwear',
            name: 'My Swimwears',
            url: 'https://myswimwears-landing.vercel.app/',
            description: 'Landing page for a fashion designer who creates swimwear.',
          },
        ],
        resumeLine: 'Founder of Krality: websites, SaaS and custom software for businesses.',
      },
    },
    bossSelect: 'BOSS SELECT',
    learnedLabel: 'SKILLS UNLOCKED',
    projectsLabel: 'KRALITY PROJECTS',
    projectVisit: 'VIEW SITE',
    toolsLabel: 'Tools',
    familyLabel: 'Agencies in the group',
    lockedNotice: 'LOCKED',
    now: 'NOW',
  },
  bosses: {
    'boss-400': {
      kind: 'boss',
      name: 'THE 400-LINE SWITCH',
      resumeTitle: 'Configurable commissions engine',
      intro: 'A monster of complexity. One change, 400 lines. Time to refactor!',
      story: 'A 400-line switch/case controlled every commission on the platform.',
      unlocked: [
        '7 configurable formula types',
        'Multi-currency: EUR / USD / COP / VES / ARS',
        'Pricing changes without a deploy',
      ],
    },
    'boss-ghost': {
      kind: 'boss',
      name: 'THE DOUBLE-CHARGE GHOST',
      resumeTitle: 'Webhook-driven ledger with zero double-charges',
      intro: 'It haunts payment systems through duplicate webhooks.',
      story: 'Duplicate webhooks threatened to charge customers twice.',
      unlocked: ['Webhook-driven ledger', 'Atomic transfers', 'Idempotent fees', '0 double-charges'],
    },
    'boss-3ds': {
      kind: 'boss',
      name: 'THE 3D SECURE GATE',
      resumeTitle: '3D Secure / SCA across three gateways',
      intro: 'A gate of authentication that guards every card payment.',
      story:
        '3DS/SCA across Stripe, PayPal and Klarna. When unexpected friction appeared, I traced it to issuer enrollment gaps, not code bugs.',
      unlocked: ['3DS/SCA on Stripe, PayPal and Klarna', 'Root cause found: issuer enrollment gaps'],
    },
    'boss-hydra': {
      kind: 'boss',
      name: 'THE 10-HEADED GATEWAY HYDRA',
      resumeTitle: '10+ payment gateways in production',
      intro: 'Cut one head, another payment provider appears.',
      story: `10+ payment providers in production: ${shared.gateways.join(', ')}.`,
      unlocked: ['10+ providers in production', '8 unified into one operational view'],
    },
    'quest-ai': {
      kind: 'side-quest',
      name: 'AI FOR WHATSAPP',
      resumeTitle: 'AI assistant for WhatsApp sales chats',
      intro: 'A side quest in the land of customer chats.',
      story: 'An AI module that assists sales agents in their customer chats.',
      unlocked: ['AI assistance for sales agents'],
    },
  },
  level: {
    bossLabel: 'BOSS',
    sideQuestLabel: 'SIDE QUEST',
    defeated: 'DEFEATED!',
    completed: 'COMPLETED!',
    unlockedLabel: 'Unlocked:',
    reward: 'REWARD',
    continue: 'CONTINUE',
  },
  achievements: {
    heading: 'ACHIEVEMENTS',
    items: {
      'payment-wizard': { title: 'Payment Wizard', description: '10+ gateways integrated' },
      'api-master': { title: 'API Architect', description: 'Own APIs and external integrations' },
      'bug-hunter': { title: 'Bug Hunter', description: 'Finds and fixes bugs' },
      ghostbuster: { title: 'Ghostbuster', description: 'Zero double-charges in production' },
      'ai-sales': { title: 'AI Closer', description: 'AI built into the system to boost sales' },
      permissions: { title: 'Gatekeeper', description: 'Module-based permission system' },
      telegram: { title: 'Red Alert', description: 'Telegram alerts integrated' },
      analytics: { title: 'Data Oracle', description: 'Business analytics and reports' },
      'module-builder': { title: 'Builder', description: 'New modules created' },
      'front-redesign': { title: 'Pixel Perfect', description: 'Front-end redesigns and new mockups' },
      'bilingual-boss': { title: 'Bilingual Boss', description: 'English C1' },
      locked: { title: '???', description: 'Hire me to unlock' },
    },
  },
  inventory: {
    heading: 'INVENTORY',
    tabs: {
      weapons: { label: 'WEAPONS', subtitle: 'Backend & tools' },
      armor: { label: 'ARMOR', subtitle: 'Frontend' },
      magic: { label: 'MAGIC', subtitle: 'Payments' },
      spells: { label: 'SPELLS', subtitle: 'AI' },
    },
    items: {
      nestjs: 'Structured Node.js framework for scalable backends.',
      nodejs: 'JavaScript runtime for servers and APIs.',
      typescript: 'Typed JavaScript superset that scales with your code.',
      prisma: 'Type-safe ORM and database migrations.',
      postgresql: 'Reliable relational database.',
      redis: 'In-memory store for caching and queues.',
      react: 'Component-based UI library.',
      nextjs: 'React framework for production web apps.',
      redux: 'Predictable state management for React.',
      tailwind: 'Utility-first CSS framework.',
      wordpress: 'CMS for websites, blogs and news portals.',
      stripe: 'Card payments, EU and US accounts.',
      paypal: 'PayPal checkout integration.',
      klarna: 'Buy-now-pay-later checkout.',
      mercadopago: 'Payments across Latin America.',
      bizum: 'Instant mobile payments in Spain.',
      santander: 'Card payments through the Santander gateway.',
      revolut: 'Revolut payment gateway integration.',
      fliinow: 'Travel now, pay later financing.',
      inespay: 'Bank transfer payments via open banking.',
      '3ds': '3DS/SCA strong customer authentication.',
      bnpl: 'Buy-now-pay-later providers.',
      llms: 'Large language models applied to real products.',
      n8n: 'Workflow automation.',
      github: 'Version control, code reviews and CI for every project.',
      cursor: 'AI-powered code editor, my daily driver.',
      claude: 'AI pair programmer for code, debugging and design.',
      dbeaver: 'Database client to explore and query PostgreSQL and MySQL.',
    },
  },
  resume: {
    metaTitle: 'Gabriel Ramírez — Resume | Full-Stack Developer',
    metaDescription:
      'Resume of Gabriel Ramírez, Full-Stack Developer from Caracas, Venezuela. Production SaaS, 10+ payment gateways, integrations and applied AI.',
    role: 'Full-Stack Developer',
    location: 'Caracas, Venezuela',
    english: 'English C1',
    playGame: 'Play the game version',
    download: 'Download CV (PDF)',
    langToggle: 'ES',
    langToggleAria: 'Cambiar a español',
    sections: {
      about: 'About',
      highlights: 'Highlights',
      caseStudies: 'Case studies',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      contact: 'Contact',
    },
    highlights: [
      { value: '10+', label: 'payment gateways in production' },
      { value: '8', label: 'providers unified into one operational view' },
      { value: '0', label: 'double-charges in production' },
      { value: '400 → 7', label: 'a 400-line switch replaced by 7 configurable formula types' },
    ],
    present: 'Present',
    contactBody: 'Reach me through any of these channels.',
  },
  multiplayer: {
    heading: 'PLAYER 2, JOIN THE GAME?',
    nameLabel: 'YOUR NAME',
    namePlaceholder: 'Type your name...',
    replyLabel: 'YOUR EMAIL',
    replyPlaceholder: 'So I can reply...',
    messageLabel: 'MESSAGE',
    messagePlaceholder: 'Write your message...',
    send: 'SEND MESSAGE',
    sending: 'SENDING...',
    error: 'CONNECTION LOST. TRY AGAIN.',
    connectVia: 'OR CONNECT VIA',
    emailLabel: 'EMAIL',
    linkedinLabel: 'LINKEDIN',
    githubLabel: 'GITHUB',
    sent: 'MESSAGE SENT',
    continuePrompt: 'CONTINUE?',
    thanks: 'THANK YOU FOR PLAYING',
  },
};

const es: GameContent = {
  meta: {
    title: 'Gabriel Ramírez: The Game | Desarrollador Full-Stack',
    description:
      'Juega el portafolio de Gabriel Ramírez, Desarrollador Full-Stack de Caracas, Venezuela: SaaS en producción, 10+ pasarelas de pago, integraciones e IA aplicada.',
  },
  ui: {
    skipToResume: 'Ir al currículum',
    skipToResumeShort: 'CV',
    gameTitleLine1: 'GABRIEL',
    gameTitleLine2: 'RAMÍREZ',
    gameSubtitle: 'DESARROLLADOR FULL-STACK',
    pressStart: 'PULSA START',
    titleFooter: '© 2026 · 1 JUGADOR · MODO CONTRATAR',
    bootLogo: 'GR',
    bootSystem: 'SYSTEM 16',
    bootSkip: 'PULSA CUALQUIER TECLA',
    hintSelect: 'ELEGIR',
    hintConfirm: 'ACEPTAR',
    hintBack: 'VOLVER',
    hintMove: 'MOVER',
    power: 'POWER',
    consoleBrand: 'GR SYSTEM 16',
    langToggle: 'EN',
    langToggleAria: 'Switch to English',
    fxOn: 'CRT ON',
    fxOff: 'CRT OFF',
    fxAria: 'Activar o desactivar efectos CRT',
    footerControls: 'CONTROLES: FLECHAS + ENTER + ESC · RATÓN · TÁCTIL',
    footerSkip: 'IR AL CURRÍCULUM (VERSIÓN SIMPLE)',
    footerBuilt: 'HECHO CON CÓDIGO Y PÍXELES',
    underConstruction: 'EN CONSTRUCCIÓN',
    underConstructionBody: 'Este nivel aún se está construyendo. ¡Vuelve en el próximo parche!',
    back: 'VOLVER',
    menuAria: 'Menú principal',
  },
  menu: {
    story: 'MODO HISTORIA',
    'player-card': 'FICHA DE JUGADOR',
    achievements: 'LOGROS',
    inventory: 'INVENTARIO',
    multiplayer: 'MULTIJUGADOR',
    download: 'DESCARGAR PARTIDA',
  },
  cvFile: '/Gabriel_Ramirez_CV_ES.pdf',
  playerCard: {
    heading: 'FICHA DE JUGADOR',
    role: 'FULL-STACK',
    nationality: 'Venezuela',
    english: 'Inglés C1',
    ageLabel: 'EDAD',
    stats: {
      backend: 'BACKEND',
      payments: 'PAGOS',
      frontend: 'FRONTEND',
      ai: 'IA',
      debugging: 'DEBUGGING',
      coffee: 'CAFÉ',
    },
    specialMoveLabel: 'MOVIMIENTO ESPECIAL',
    specialMove: 'Aprendizaje turbo: domino una tecnología nueva en días.',
    bio: '¡Hola! Soy Gabriel, Desarrollador Full-Stack de Caracas, Venezuela. Construyo y opero SaaS en producción, especializado en pagos, integraciones e IA aplicada.',
  },
  story: {
    heading: 'MODO HISTORIA',
    hint: 'MOVER',
    mapLegendHome: 'CARACAS',
    mapLegendAbroad: 'ESPAÑA',
    worlds: {
      w1: {
        label: 'MUNDO 1',
        title: 'Diplomado de Programación UCV',
        place: 'Universidad Central de Venezuela · Caracas',
        tagline: 'Un nuevo héroe descubre el código.',
        summary:
          'Aquí empezó todo. En la Universidad Central de Venezuela escribí mis primeras líneas de código en Pascal, un lenguaje estricto que me enseñó a pensar antes de teclear: convertir cualquier problema en un algoritmo paso a paso. Esa base la sigo usando en cada sistema que construyo.',
        learned: [
          'Lógica y algoritmos',
          'Pseudocódigo',
          'Variables y tipos de datos',
          'Condicionales (if / case)',
          'Ciclos (for / while / repeat)',
          'Arreglos y registros',
          'Procedimientos y funciones',
          'Depuración paso a paso',
        ],
        badges: [
          { sprite: 'ucv', caption: 'UCV' },
          { sprite: 'pascal', caption: 'Pascal' },
        ],
        snippet: {
          file: 'HOLA.PAS',
          code: "program Hola;\nbegin\n  writeln('¡Hola, mundo!');\nend.",
        },
        resumeLine:
          'Introducción a la programación con Pascal: algoritmos, estructuras de control, arreglos y registros, procedimientos y funciones.',
      },
      w2: {
        label: 'MUNDO 2',
        title: 'UNEWEB',
        place: 'Caracas, Venezuela',
        tagline: 'Arco de entrenamiento.',
        summary:
          'En UNEWEB repasé la introducción a la programación y completé el Máster Web. Pasé de la consola al navegador: construí páginas web con HTML, CSS y JavaScript, y aprendí a guardar y consultar datos con MySQL y PostgreSQL. Aquí nació el desarrollador full-stack.',
        learned: [
          'Introducción a la programación',
          'Estructura de páginas con HTML',
          'Estilos y maquetación con CSS',
          'Interactividad con JavaScript',
          'Diseño de bases de datos',
          'Consultas SQL',
          'Sitios web completos',
        ],
        badges: [{ sprite: 'uneweb', caption: 'UNEWEB' }],
        snippet: {
          file: 'index.html',
          code: "<h1>¡Hola, web!</h1>\n<script>\n  alert('Mi primera página');\n</script>",
        },
        resumeLine: 'Introducción a la programación y Máster Web: HTML, CSS, JavaScript, MySQL y PostgreSQL.',
      },
      w3: {
        label: 'MUNDO 3',
        title: 'Rubicon Software',
        place: 'Tarragona, España (remoto)',
        tagline: 'Primera misión en el extranjero: software de ERP y almacenes.',
        summary:
          'Mi primer trabajo como programador, en remoto para una empresa de Tarragona. En 3 meses de periodo de prueba aprendí Velneo, su plataforma ERP: cómo fluyen el código y los datos, cómo se modela la base de datos y cómo un equipo real organiza flujos de trabajo y tareas. Poco tiempo, pero entendí cómo funciona un ERP por dentro.',
        learned: [
          'Plataforma ERP Velneo',
          'Flujo de código y datos',
          'Bases de datos relacionales',
          'Flujos de trabajo y tareas',
          'Procesos de ERP y almacén',
          'Trabajo remoto con un equipo en España',
        ],
        badges: [
          { sprite: 'velneo', caption: 'Velneo' },
          { sprite: 'spain', caption: 'Remoto' },
        ],
        flow: { title: 'FLUJO ERP', steps: ['Pedido', 'Stock', 'Albarán', 'Factura'] },
        resumeLine: 'Software de ERP y almacenes para una empresa de Tarragona, España, en remoto. Aprendí la plataforma ERP Velneo: flujo de código y datos, bases de datos y flujos de trabajo en equipo.',
      },
      w4: {
        label: 'MUNDO 4',
        title: 'Hatel Studio',
        place: 'Agencia de marketing digital',
        tagline: 'Creando sitios web con WordPress + SEO, blogs y portales de noticias.',
        summary:
          'Cinco meses en una agencia de marketing digital, creando webs, blogs y contenido digital para clientes con WordPress y Elementor. Aquí aprendí que una web no solo tiene que verse bien: tiene que aparecer en Google y cargar rápido. Trabajé SEO, optimización de la velocidad de carga y configuración de servidores y hosting.',
        learned: [
          'Sitios web con WordPress',
          'Maquetación con Elementor',
          'Plugins de WordPress',
          'SEO on-page',
          'Velocidad de carga',
          'Servidores y hosting',
          'Blogs y contenido digital',
        ],
        badges: [{ sprite: 'hatel', caption: 'Hatel Studio' }],
        flow: { title: 'FLUJO WEB', steps: ['Diseño', 'WordPress', 'SEO', 'Velocidad', 'Publicación'] },
        resumeLine: 'Cinco meses en una agencia de marketing digital: webs, blogs y portales de noticias con WordPress y Elementor, además de SEO, optimización de velocidad de carga y hosting.',
      },
      w5: {
        label: 'MUNDO 5',
        title: 'TSU en Informática, ISUM',
        place: 'Carrera universitaria · Técnico Superior Universitario',
        tagline: 'Subida de nivel: título desbloqueado.',
        summary:
          'Mi carrera universitaria: me gradué como Técnico Superior Universitario en Informática en el ISUM. Consolidé las bases de la informática y di el salto a los frameworks modernos: React, Vite, Tailwind y NestJS. En paralelo empecé a crear mis propios proyectos para ganar experiencia, y a venderlos a clientes: mis primeros ingresos como desarrollador.',
        learned: [
          'Fundamentos de informática',
          'React',
          'Vite',
          'Tailwind CSS',
          'NestJS',
          'Proyectos propios',
          'Freelance: vender y cobrar proyectos',
        ],
        badges: [
          { sprite: 'isum', caption: 'ISUM' },
          { sprite: 'tsu', caption: 'TSU' },
        ],
        flow: { title: 'MODO FREELANCE', steps: ['Idea', 'Proyecto', 'Cliente', 'Cobro'] },
        resumeLine: 'Técnico Superior Universitario en Informática. Frameworks modernos (React, Vite, Tailwind, NestJS) y mis primeros proyectos freelance vendidos a clientes.',
      },
      w6: {
        label: 'MUNDO 6',
        title: 'Arcadia Viajes',
        tagline: 'Un SaaS, tres agencias, un mismo equipo.',
        summary:
          'Mi misión actual. En Arcadia Viajes trabajo con tres agencias de viajes, Turisto, Punto Aéreo y Viajes Nova, que funcionan sobre un mismo SaaS multi-tenant. Desarrollo y doy soporte a las tres al mismo tiempo, sobre todo en su sistema de vuelos: emisión de boletos, pagos y las integraciones que lo conectan todo.',
        family: {
          parent: { sprite: 'arcadia', caption: 'Arcadia' },
          children: [
            { sprite: 'turisto', caption: 'Turisto' },
            { sprite: 'puntoaereo', caption: 'Punto Aéreo' },
            { sprite: 'viajesnova', caption: 'Viajes Nova' },
          ],
        },
        resumeLine: 'SaaS de viajes multi-tenant detrás de Punto Aéreo, Turisto y Viajes Nova. Especializado en pagos, integraciones e IA aplicada.',
        details: [
          'Permisos RBAC',
          'Emisión de boletos',
          'Beneficios',
          'Links de pago',
          'Marketplace de eSIM',
          'Calculadora de tasas de cambio',
          'APIs para apps de terceros',
        ],
      },
      w7: {
        label: 'MUNDO 7',
        title: 'KRALITY',
        place: 'Mi empresa · Páginas web, SaaS y software a medida',
        tagline: 'El siguiente nivel: mi propio estudio, construyendo para otros.',
        summary:
          'Krality es mi empresa y mi plan a futuro. Todo lo que aprendí en el camino ahora lo uso para crear páginas web, plataformas SaaS y software a medida para otros negocios, del diseño a producción.',
        badges: [{ sprite: 'krality', caption: 'Krality' }],
        details: ['Páginas web', 'SaaS', 'Software a medida'],
        linkLabel: 'VISITAR KRALITY',
        projects: [
          {
            sprite: 'asalazar',
            name: 'A. Salazar Ink',
            url: 'https://asalazarink.vercel.app/',
            description: 'Página web para un tatuador de Charlotte, Estados Unidos.',
          },
          {
            sprite: 'myswimwear',
            name: 'My Swimwears',
            url: 'https://myswimwears-landing.vercel.app/',
            description: 'Landing para una diseñadora de moda que crea trajes de baño.',
          },
        ],
        resumeLine: 'Fundador de Krality: páginas web, SaaS y software a medida para empresas.',
      },
    },
    bossSelect: 'ELIGE JEFE',
    learnedLabel: 'HABILIDADES DESBLOQUEADAS',
    projectsLabel: 'PROYECTOS KRALITY',
    projectVisit: 'VER WEB',
    toolsLabel: 'Herramientas',
    familyLabel: 'Agencias del grupo',
    lockedNotice: 'BLOQUEADO',
    now: 'HOY',
  },
  bosses: {
    'boss-400': {
      kind: 'boss',
      name: 'EL SWITCH DE 400 LÍNEAS',
      resumeTitle: 'Motor de comisiones configurable',
      intro: 'Un monstruo de complejidad. Un cambio, 400 líneas. ¡Hora de refactorizar!',
      story: 'Un switch/case de 400 líneas controlaba todas las comisiones de la plataforma.',
      unlocked: [
        '7 tipos de fórmula configurables',
        'Multi-moneda: EUR / USD / COP / VES / ARS',
        'Cambios de precios sin deploy',
      ],
    },
    'boss-ghost': {
      kind: 'boss',
      name: 'EL FANTASMA DEL DOBLE COBRO',
      resumeTitle: 'Ledger por webhooks con cero dobles cobros',
      intro: 'Acecha los sistemas de pago a través de webhooks duplicados.',
      story: 'Los webhooks duplicados amenazaban con cobrar dos veces a los clientes.',
      unlocked: ['Ledger dirigido por webhooks', 'Transferencias atómicas', 'Comisiones idempotentes', '0 dobles cobros'],
    },
    'boss-3ds': {
      kind: 'boss',
      name: 'LA PUERTA 3D SECURE',
      resumeTitle: '3D Secure / SCA en tres pasarelas',
      intro: 'Una puerta de autenticación que protege cada pago con tarjeta.',
      story:
        '3DS/SCA en Stripe, PayPal y Klarna. Cuando apareció fricción inesperada, la rastreé hasta fallos de enrolamiento de los bancos emisores, no bugs del código.',
      unlocked: ['3DS/SCA en Stripe, PayPal y Klarna', 'Causa raíz: enrolamiento de los emisores'],
    },
    'boss-hydra': {
      kind: 'boss',
      name: 'LA HIDRA DE 10 PASARELAS',
      resumeTitle: '10+ pasarelas de pago en producción',
      intro: 'Cortas una cabeza y aparece otro proveedor de pagos.',
      story: `10+ proveedores de pago en producción: ${shared.gateways.join(', ')}.`,
      unlocked: ['10+ proveedores en producción', '8 unificados en una sola vista operativa'],
    },
    'quest-ai': {
      kind: 'side-quest',
      name: 'IA PARA WHATSAPP',
      resumeTitle: 'Asistente de IA para chats de venta en WhatsApp',
      intro: 'Una misión secundaria en la tierra de los chats con clientes.',
      story: 'Un módulo de IA que asiste a los agentes de ventas en sus chats con clientes.',
      unlocked: ['Asistencia con IA para agentes de ventas'],
    },
  },
  level: {
    bossLabel: 'JEFE',
    sideQuestLabel: 'MISIÓN SECUNDARIA',
    defeated: '¡DERROTADO!',
    completed: '¡COMPLETADA!',
    unlockedLabel: 'Desbloqueado:',
    reward: 'RECOMPENSA',
    continue: 'CONTINUAR',
  },
  achievements: {
    heading: 'LOGROS',
    items: {
      'payment-wizard': { title: 'Mago de los Pagos', description: '10+ pasarelas integradas' },
      'api-master': { title: 'Arquitecto de APIs', description: 'APIs propias e integraciones externas' },
      'bug-hunter': { title: 'Cazador de Bugs', description: 'Identifica y resuelve bugs' },
      ghostbuster: { title: 'Cazafantasmas', description: 'Cero dobles cobros en producción' },
      'ai-sales': { title: 'IA Vendedora', description: 'IA integrada en el sistema para vender más' },
      permissions: { title: 'Guardián', description: 'Sistema de permisos por módulos' },
      telegram: { title: 'Alerta Roja', description: 'Alertas por Telegram integradas' },
      analytics: { title: 'Oráculo de Datos', description: 'Analíticas y reportes empresariales' },
      'module-builder': { title: 'Constructor', description: 'Creación de módulos nuevos' },
      'front-redesign': { title: 'Pixel Perfect', description: 'Rediseño de front y bocetos nuevos' },
      'bilingual-boss': { title: 'Jefe Bilingüe', description: 'Inglés C1' },
      locked: { title: '???', description: 'Contrátame para desbloquearlo' },
    },
  },
  inventory: {
    heading: 'INVENTARIO',
    tabs: {
      weapons: { label: 'ARMAS', subtitle: 'Backend y herramientas' },
      armor: { label: 'ARMADURA', subtitle: 'Frontend' },
      magic: { label: 'MAGIA', subtitle: 'Pagos' },
      spells: { label: 'HECHIZOS', subtitle: 'IA' },
    },
    items: {
      nestjs: 'Framework de Node.js estructurado para backends escalables.',
      nodejs: 'Runtime de JavaScript para servidores y APIs.',
      typescript: 'Superset tipado de JavaScript que escala con tu código.',
      prisma: 'ORM con tipos seguros y migraciones de base de datos.',
      postgresql: 'Base de datos relacional confiable.',
      redis: 'Almacén en memoria para caché y colas.',
      react: 'Librería de UI basada en componentes.',
      nextjs: 'Framework de React para apps web en producción.',
      redux: 'Manejo de estado predecible para React.',
      tailwind: 'Framework CSS utility-first.',
      wordpress: 'CMS para sitios web, blogs y portales de noticias.',
      stripe: 'Pagos con tarjeta, cuentas UE y EE. UU.',
      paypal: 'Integración del checkout de PayPal.',
      klarna: 'Checkout de compra ahora, paga después.',
      mercadopago: 'Pagos en toda Latinoamérica.',
      bizum: 'Pagos móviles instantáneos en España.',
      santander: 'Pagos con tarjeta por la pasarela de Santander.',
      revolut: 'Integración de la pasarela de pago de Revolut.',
      fliinow: 'Financiación de viajes: viaja ahora, paga después.',
      inespay: 'Pagos por transferencia bancaria con open banking.',
      '3ds': 'Autenticación reforzada 3DS/SCA.',
      bnpl: 'Proveedores de compra ahora, paga después.',
      llms: 'Modelos de lenguaje aplicados a productos reales.',
      n8n: 'Automatización de flujos de trabajo.',
      github: 'Control de versiones, revisiones de código y CI en cada proyecto.',
      cursor: 'Editor de código con IA, mi herramienta de cada día.',
      claude: 'Compañero de programación con IA para código, debugging y diseño.',
      dbeaver: 'Cliente de bases de datos para explorar y consultar PostgreSQL y MySQL.',
    },
  },
  resume: {
    metaTitle: 'Gabriel Ramírez — Currículum | Desarrollador Full-Stack',
    metaDescription:
      'Currículum de Gabriel Ramírez, Desarrollador Full-Stack de Caracas, Venezuela. SaaS en producción, 10+ pasarelas de pago, integraciones e IA aplicada.',
    role: 'Desarrollador Full-Stack',
    location: 'Caracas, Venezuela',
    english: 'Inglés C1',
    playGame: 'Jugar la versión juego',
    download: 'Descargar CV (PDF)',
    langToggle: 'EN',
    langToggleAria: 'Switch to English',
    sections: {
      about: 'Sobre mí',
      highlights: 'Logros clave',
      caseStudies: 'Casos de estudio',
      experience: 'Experiencia',
      education: 'Formación',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    highlights: [
      { value: '10+', label: 'pasarelas de pago en producción' },
      { value: '8', label: 'proveedores unificados en una sola vista operativa' },
      { value: '0', label: 'dobles cobros en producción' },
      { value: '400 → 7', label: 'un switch de 400 líneas reemplazado por 7 tipos de fórmula configurables' },
    ],
    present: 'Actualidad',
    contactBody: 'Escríbeme por cualquiera de estos canales.',
  },
  multiplayer: {
    heading: 'JUGADOR 2, ¿TE UNES?',
    nameLabel: 'TU NOMBRE',
    namePlaceholder: 'Escribe tu nombre...',
    replyLabel: 'TU EMAIL',
    replyPlaceholder: 'Para poder responderte...',
    messageLabel: 'MENSAJE',
    messagePlaceholder: 'Escribe tu mensaje...',
    send: 'ENVIAR MENSAJE',
    sending: 'ENVIANDO...',
    error: 'CONEXIÓN PERDIDA. INTÉNTALO DE NUEVO.',
    connectVia: 'O CONECTA POR',
    emailLabel: 'EMAIL',
    linkedinLabel: 'LINKEDIN',
    githubLabel: 'GITHUB',
    sent: 'MENSAJE ENVIADO',
    continuePrompt: '¿CONTINUAR?',
    thanks: 'GRACIAS POR JUGAR',
  },
};

export const content: Record<Lang, GameContent> = { en, es };
