import type { Translations } from './en';

export const es: Translations = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    blog: 'Blog',
    contact: 'Contacto',
  },
  hero: {
    typeSequence: [
      'Desarrollador Full Stack',
      'Sistemas de Pago & Fintech',
      'Arquitectura Backend — NestJS & PostgreSQL',
    ],
    subtitle:
      'Desarrollador Full Stack especializado en integraciones de pago y sistemas financieros. Construyo plataformas robustas y listas para producción.',
    cta_projects: 'Ver mis proyectos',
    cta_contact: 'Contactarme',
    ticker: [
      '6+ pasarelas de pago en producción',
      '8 proveedores unificados en una vista',
      '0 dobles cobros — idempotente por diseño',
      '400 → 7 reglas de comisión, precios sin deploy',
      'checkout con cumplimiento 3DS/SCA',
    ],
  },
  about: {
    heading: 'Sobre mí',
    p1: 'Soy <strong>Gabriel Ramírez</strong>, desarrollador full-stack actualmente a cargo de los módulos financieros y operativos de <strong class="cyan">Arcadia Group</strong>, una plataforma de agencia de viajes en producción, desde agosto de 2025.',
    p2: 'Me especializo en <strong class="cyan">integraciones de sistemas de pago</strong> — tengo 6+ pasarelas en producción (Stripe EU/US, PayPal Advanced Checkout, Revolut, Klarna, Scalapay, Inespay, Fliinow), con manejo de webhooks, verificación de firmas HMAC-SHA256, cumplimiento 3DS/SCA y reconciliación automatizada.',
    p3: 'Más allá de los pagos, diseñé el sistema de roles y permisos de la plataforma, realicé una auditoría de seguridad que detectó vulnerabilidades reales de bypass en los guards de rutas, y gestiono migraciones de base de datos en producción. Mi stack es <strong class="cyan">NestJS · Prisma · PostgreSQL · React · TypeScript</strong>.',
    p4: 'Autodidacta por naturaleza — aprendo herramientas nuevas rápido e integro IA en mi flujo de trabajo. Mi foco siempre está en entregar soluciones que funcionen en producción.',
    cv_label: 'Descargar CV',
    cv_file: '/Gabriel_Ramirez_CV_ES.pdf',
  },
  skills: {
    heading: 'Habilidades Técnicas',
    groups: {
      frontend: 'Frontend & UI',
      backend: 'Backend & APIs',
      payments: 'Pagos & Fintech',
      infra: 'Infraestructura & Deploy',
      generalist: 'También trabajo con',
    },
  },
  dualOwnership: {
    heading: 'Un Solo Desarrollador, Dos Caras del Stack',
    financialLabel: 'Núcleo Financiero',
    financialItems: [
      'Motor de comisiones: 7 tipos de fórmula configurables reemplazando un switch/case de 400 líneas',
      'Cumplimiento 3DS/SCA en Stripe, PayPal y Klarna',
      'Ledger disparado por webhooks con transferencias idempotentes y atómicas',
      '8 pasarelas de pago unificadas en una sola vista operativa',
    ],
    platformLabel: 'Arquitectura de Plataforma',
    platformItems: [
      'Sistema de roles y permisos diseñado desde cero',
      'Auditoría de seguridad — encontré y corregí vulnerabilidades reales de bypass en guards de rutas',
      'Migraciones de Prisma gestionadas en dev, staging y producción',
      'Infraestructura de soporte: cron jobs, migración de subdominio B2B',
    ],
    closing: 'La mayoría de los devs de pagos solo tocan un lado de esto. Yo manejo los dos.',
  },
  caseStudies: {
    heading: 'Casos de Estudio Seleccionados',
    items: {
      'commissions-engine': {
        title: 'Motor Dinámico de Comisiones de Pago',
        description:
          'Reemplacé un switch/case hardcodeado de 400 líneas por un motor de comisiones configurable con 7 tipos de fórmula, gestionado completamente desde un panel de administración — sin necesidad de deploy para cambiar precios.',
        achievements: [
          '7 tipos de fórmula configurables que cubren todos los escenarios de comisión en producción',
          'Gestionado desde el panel de administración — los cambios de precio no requieren deploy',
          'Eliminé un switch/case hardcodeado de 400 líneas',
        ],
        shortTitle: 'Comisiones',
        figureWord: '400 → 7',
      },
      '3ds-enforcement': {
        title: 'Cumplimiento 3D Secure — y sus Límites en el Mundo Real',
        description:
          'Implementé el cumplimiento 3DS/SCA en Stripe, PayPal y Klarna. Cuando las tasas de fricción no coincidían con lo esperado tras el lanzamiento, investigué la causa raíz y la rastreé hasta brechas reales de enrolamiento del emisor — no bugs de la aplicación.',
        achievements: [
          'Cumplimiento 3DS/SCA implementado en 3 pasarelas de pago',
          'Investigué la causa raíz de tasas de fricción inesperadas post-lanzamiento',
          'El diagnóstico apuntó a brechas de enrolamiento del emisor, no a defectos de código',
        ],
        shortTitle: '3DS',
        figureWord: '3DS',
      },
      'accounts-ledger': {
        title: 'Ledger de Cuentas Automatizado',
        description:
          'Construí un ledger de saldos disparado por webhooks, con transferencias atómicas y manejo idempotente de comisiones — diseñado para que un webhook duplicado o reintentado nunca genere un doble cobro ni deje una cuenta a medio actualizar.',
        achievements: [
          'Actualización de saldos disparada por webhooks, sin reconciliación manual',
          'Transferencias atómicas — sin estados parciales o a medio aplicar',
          'Manejo idempotente de comisiones — los webhooks duplicados nunca generan doble cobro',
        ],
        shortTitle: 'Ledger',
        figureWord: 'ATÓMICO',
      },
      'unified-payments-view': {
        title: 'Vista Unificada de Pagos Multi-Proveedor',
        description:
          'Consolidé 8 pasarelas de pago separadas en una sola pantalla operativa, dándole al equipo de finanzas un único lugar para reconciliar transacciones en vez de alternar entre ocho dashboards.',
        achievements: [
          '8 pasarelas de pago consolidadas en una sola pantalla',
          'Construida con React, Next.js y Redux Toolkit / RTK Query',
          'Redujo el flujo de reconciliación del equipo de finanzas de 8 herramientas a 1',
        ],
        shortTitle: 'Vista Unificada',
        statLabel: 'pasarelas de pago, una sola pantalla',
      },
    },
  },
  archive: {
    heading: 'Antes de Arcadia',
    github_label: 'Ver código en GitHub',
    items: {
      unicasa: {
        title: 'Sistema de Proveedores — Unicasa',
        description:
          'Un rol anterior: un portal de proveedores en .NET Core/React construido para los proveedores de Unicasa (incluyendo Coca-Cola) para consultar cuentas por pagar. 500+ solicitudes/día, respuestas menores a 100ms, desplegado en IIS.',
      },
    },
  },
  contact: {
    heading: 'Resolvámoslo Juntos',
    subheading:
      'Una integración de pagos, una auditoría de seguridad, o una migración que no puede fallar — esa es justo la clase de problema que resuelvo.',
    availability: 'Disponible para roles remotos · Caracas, Venezuela · Inglés C1',
    directLabel: 'O escríbeme directamente',
    emailEndpoint: 'Email',
    linkedinEndpoint: 'LinkedIn',
    githubEndpoint: 'GitHub',
    name: 'Nombre',
    email: 'Email',
    message: 'Tu mensaje...',
    submit: 'Enviar mensaje',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    built_with: 'Desarrollado con',
  },
};
