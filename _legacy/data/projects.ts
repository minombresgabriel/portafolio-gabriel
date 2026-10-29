export type CaseStudyId =
  | 'commissions-engine'
  | '3ds-enforcement'
  | 'accounts-ledger'
  | 'unified-payments-view';

export type ArchiveId = 'unicasa';

export type Figure = { kind: 'stat'; value: number; suffix?: string } | { kind: 'word' };

export interface CaseStudy {
  id: CaseStudyId;
  tech: string[];
  figure: Figure;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'commissions-engine',
    tech: ['NestJS', 'Prisma', 'PostgreSQL'],
    figure: { kind: 'word' },
  },
  {
    id: '3ds-enforcement',
    tech: ['Stripe', 'PayPal', 'Klarna'],
    figure: { kind: 'word' },
  },
  {
    id: 'accounts-ledger',
    tech: ['NestJS', 'PostgreSQL', 'Webhooks'],
    figure: { kind: 'word' },
  },
  {
    id: 'unified-payments-view',
    tech: ['React', 'Next.js', 'Redux Toolkit', 'RTK Query'],
    figure: { kind: 'stat', value: 8 },
  },
];

export interface ArchiveProject {
  id: ArchiveId;
  tech: string[];
  image?: string;
  github?: string;
}

export const archiveProjects: ArchiveProject[] = [
  {
    id: 'unicasa',
    tech: ['.NET Core', 'React', 'SQL Server', 'IIS'],
    image: '/images/proyectos/sistema-proveedores.png',
    github: 'https://github.com/minombresgabriel/sistema-proveedores',
  },
];
