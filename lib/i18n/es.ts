import type { Translations } from './en';

export const es: Translations = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
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
  },
  projects: {
    heading: 'Proyectos Destacados',
    github_label: 'Ver código en GitHub',
    proprietary_label: 'Propietario — sin captura',
    items: [
      {
        title: 'Infraestructura de Pagos — Plataforma de Agencia de Viajes',
        description:
          'Diseñé e implementé la infraestructura de pagos de una plataforma de agencia de viajes en producción, integrando 6+ pasarelas internacionales (Stripe EU/US, PayPal Advanced Checkout, Revolut, Klarna, Scalapay, Inespay, Fliinow) con manejo de webhooks, verificación de firmas HMAC-SHA256 y cumplimiento 3DS/SCA.',
        achievements: [
          'Reemplacé un sistema hardcodeado de comisiones por un motor dinámico configurable con 7 tipos de fórmula',
          'Construí un ledger de cuentas automatizado disparado por webhooks de pago',
          '6+ pasarelas en producción con reconciliación completa y auditoría de transacciones',
        ],
      },
      {
        title: 'Sistema de Roles y Permisos',
        description:
          'Diseñé un sistema de permisos granular por módulo con renderizado dinámico de menús según el rol del usuario. Realicé una auditoría de seguridad que identificó y corrigió vulnerabilidades reales de bypass en los guards de rutas de la plataforma.',
        achievements: [
          'Permisos granulares por módulo con renderizado dinámico de UI según rol',
          'La auditoría de seguridad detectó y resolvió vulnerabilidades reales de bypass de autorización',
        ],
      },
      {
        title: 'Sistema de Proveedores para Unicasa',
        description:
          'Aplicación web completa desarrollada para los proveedores de Unicasa (como Coca-Cola) para consultar cuentas por pagar. Incluye backend en .NET Core y frontend en React con base de datos SQL Server.',
        achievements: [
          'Procesó 500+ solicitudes/día con tiempos de respuesta menores a 100ms',
          'Desplegado en IIS y utilizado por proveedores reales',
          'Autenticación segura y consultas en tiempo real',
        ],
      },
    ],
  },
  contact: {
    heading: 'Trabajemos Juntos',
    subheading: '¿Tenés un proyecto en mente? Escribime y te respondo a la brevedad.',
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
