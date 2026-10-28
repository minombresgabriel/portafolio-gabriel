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
  | 'ghostbuster'
  | 'printer-master'
  | 'on-screen'
  | 'golazo'
  | 'international'
  | 'bilingual-boss'
  | 'locked';

export const ACHIEVEMENT_ORDER: readonly AchievementId[] = [
  'payment-wizard',
  'ghostbuster',
  'printer-master',
  'on-screen',
  'golazo',
  'international',
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
  | '3ds'
  | 'bnpl'
  | 'llms'
  | 'n8n';

// ---------------------------------------------------------------------------
// Language-independent data
// ---------------------------------------------------------------------------

export const shared = {
  name: 'Gabriel Ramírez',
  email: 'minombresgabriel@gmail.com',
  linkedin: { label: 'linkedin.com/in/gabriel-ramirez-soto', url: 'https://linkedin.com/in/gabriel-ramirez-soto' },
  github: { label: 'github.com/minombresgabriel', url: 'https://github.com/minombresgabriel' },
  ovr: 88,
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
    w7: '???',
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
  inventory: {
    weapons: ['nestjs', 'nodejs', 'typescript', 'prisma', 'postgresql', 'redis'],
    armor: ['react', 'nextjs', 'redux', 'tailwind', 'wordpress'],
    magic: ['stripe', 'paypal', 'klarna', '3ds', 'bnpl'],
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
    '3ds': '3D Secure',
    bnpl: 'BNPL',
    llms: 'LLMs',
    n8n: 'n8n',
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
    ovrLabel: string;
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
    gameSubtitle: 'THE GAME',
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
    ovrLabel: 'OVR',
    stats: {
      backend: 'BACKEND',
      payments: 'PAYMENTS',
      frontend: 'FRONTEND',
      ai: 'AI',
      debugging: 'DEBUGGING',
      coffee: 'COFFEE',
    },
    specialMoveLabel: 'SPECIAL MOVE',
    specialMove: 'Integrate 10+ payment gateways',
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
        place: 'Caracas, Venezuela',
        tagline: 'A new hero discovers code.',
      },
      w2: {
        label: 'WORLD 2',
        title: 'UNEWEB',
        place: 'Caracas, Venezuela',
        tagline: 'Training arc.',
      },
      w3: {
        label: 'WORLD 3',
        title: 'Rubicon Software',
        place: 'Tarragona, Spain (remote)',
        tagline: 'First mission abroad: ERP and warehouse software.',
        resumeLine: 'ERP and warehouse software for a company in Tarragona, Spain, working remotely.',
      },
      w4: {
        label: 'WORLD 4',
        title: 'Hatel Studio',
        tagline: 'Building websites with WordPress + SEO, blogs and news portals.',
        resumeLine: 'Websites built with WordPress + SEO, including blogs and news portals.',
      },
      w5: {
        label: 'WORLD 5',
        title: 'TSU in Informatics, ISUM',
        tagline: 'Level up: degree unlocked.',
      },
      w6: {
        label: 'WORLD 6',
        title: 'Arcadia Viajes',
        tagline: 'Multi-tenant travel SaaS powering Punto Aéreo, Turisto and Viajes Nova.',
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
        title: 'THE TECH EMPIRE',
        tagline: 'Coming soon: my own SaaS dynasty.',
        locked: true,
      },
    },
    bossSelect: 'BOSS SELECT',
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
      ghostbuster: { title: 'Ghostbuster', description: 'Zero double-charges in production' },
      'printer-master': {
        title: 'Printer Master',
        description: 'Owns a 3D printer and designs his own objects',
      },
      'on-screen': { title: 'On Screen', description: 'Worked as a TV extra' },
      golazo: { title: 'Golazo', description: 'EA FC player' },
      international: { title: 'International', description: 'Worked remotely for a company in Spain' },
      'bilingual-boss': { title: 'Bilingual Boss', description: 'English C1' },
      locked: { title: '???', description: 'Hire me to unlock' },
    },
  },
  inventory: {
    heading: 'INVENTORY',
    tabs: {
      weapons: { label: 'WEAPONS', subtitle: 'Backend' },
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
      '3ds': '3DS/SCA strong customer authentication.',
      bnpl: 'Buy-now-pay-later providers.',
      llms: 'Large language models applied to real products.',
      n8n: 'Workflow automation.',
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
    gameSubtitle: 'EL JUEGO',
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
    ovrLabel: 'MED',
    stats: {
      backend: 'BACKEND',
      payments: 'PAGOS',
      frontend: 'FRONTEND',
      ai: 'IA',
      debugging: 'DEBUGGING',
      coffee: 'CAFÉ',
    },
    specialMoveLabel: 'MOVIMIENTO ESPECIAL',
    specialMove: 'Integrar 10+ pasarelas de pago',
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
        place: 'Caracas, Venezuela',
        tagline: 'Un nuevo héroe descubre el código.',
      },
      w2: {
        label: 'MUNDO 2',
        title: 'UNEWEB',
        place: 'Caracas, Venezuela',
        tagline: 'Arco de entrenamiento.',
      },
      w3: {
        label: 'MUNDO 3',
        title: 'Rubicon Software',
        place: 'Tarragona, España (remoto)',
        tagline: 'Primera misión en el extranjero: software de ERP y almacenes.',
        resumeLine: 'Software de ERP y almacenes para una empresa de Tarragona, España, en remoto.',
      },
      w4: {
        label: 'MUNDO 4',
        title: 'Hatel Studio',
        tagline: 'Creando sitios web con WordPress + SEO, blogs y portales de noticias.',
        resumeLine: 'Sitios web con WordPress + SEO, incluyendo blogs y portales de noticias.',
      },
      w5: {
        label: 'MUNDO 5',
        title: 'TSU en Informática, ISUM',
        tagline: 'Subida de nivel: título desbloqueado.',
      },
      w6: {
        label: 'MUNDO 6',
        title: 'Arcadia Viajes',
        tagline: 'SaaS de viajes multi-tenant detrás de Punto Aéreo, Turisto y Viajes Nova.',
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
        title: 'EL IMPERIO TECH',
        tagline: 'Próximamente: mi propia dinastía SaaS.',
        locked: true,
      },
    },
    bossSelect: 'ELIGE JEFE',
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
      ghostbuster: { title: 'Cazafantasmas', description: 'Cero dobles cobros en producción' },
      'printer-master': {
        title: 'Maestro Impresor',
        description: 'Tiene una impresora 3D y diseña sus propios objetos',
      },
      'on-screen': { title: 'En Pantalla', description: 'Trabajó como extra de TV' },
      golazo: { title: 'Golazo', description: 'Jugador de EA FC' },
      international: { title: 'Internacional', description: 'Trabajó en remoto para una empresa de España' },
      'bilingual-boss': { title: 'Jefe Bilingüe', description: 'Inglés C1' },
      locked: { title: '???', description: 'Contrátame para desbloquearlo' },
    },
  },
  inventory: {
    heading: 'INVENTARIO',
    tabs: {
      weapons: { label: 'ARMAS', subtitle: 'Backend' },
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
      '3ds': 'Autenticación reforzada 3DS/SCA.',
      bnpl: 'Proveedores de compra ahora, paga después.',
      llms: 'Modelos de lenguaje aplicados a productos reales.',
      n8n: 'Automatización de flujos de trabajo.',
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
