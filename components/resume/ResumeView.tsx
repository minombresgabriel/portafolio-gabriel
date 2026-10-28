'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiDownload, FiPlay } from 'react-icons/fi';
import { BOSS_ORDER, INVENTORY_TAB_ORDER, shared, WORLD_ORDER, type WorldId } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-white/10 py-10 print:break-inside-avoid print:border-gray-300 print:py-5">
      <h2 id={`${id}-title`} className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-cyan print:text-gray-600">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** "2025–NOW" → "2025 – Present", localized. */
function formatYears(years: string, present: string) {
  return years.replace('NOW', present).replace('–', ' – ');
}

export default function ResumeView() {
  const { c, toggle } = useLanguage();
  const r = c.resume;

  const byKind = (kind: 'work' | 'education') =>
    WORLD_ORDER.filter((w): w is WorldId => shared.worldKind[w] === kind).reverse();

  const contacts = [
    { icon: FaEnvelope, label: shared.email, href: `mailto:${shared.email}` },
    { icon: FaLinkedin, label: shared.linkedin.label, href: shared.linkedin.url },
    { icon: FaGithub, label: shared.github.label, href: shared.github.url },
  ];

  return (
    <div className="min-h-screen bg-[#0b0817] font-sans text-gray-200 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Top bar */}
        <nav className="mb-12 flex flex-wrap items-center justify-between gap-3 text-sm print:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-cream">
            <FiPlay aria-hidden="true" /> {r.playGame}
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              aria-label={r.langToggleAria}
              className="rounded border border-white/15 px-3 py-1.5 font-mono text-xs hover:border-cyan hover:text-cyan"
            >
              {r.langToggle}
            </button>
            <a
              href={c.cvFile}
              download
              className="inline-flex items-center gap-2 rounded bg-cyan px-3 py-1.5 font-medium text-night-950 hover:bg-cream"
            >
              <FiDownload aria-hidden="true" /> {r.download}
            </a>
          </div>
        </nav>

        {/* Header */}
        <header className="pb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl print:text-black">{shared.name}</h1>
          <p className="mt-2 text-xl text-cyan print:text-gray-700">{r.role}</p>
          <p className="mt-3 text-sm text-gray-400">
            {r.location} · {r.english}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={href}>
                <a href={href} className="inline-flex items-center gap-2 text-gray-300 hover:text-cyan print:text-black" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <Icon aria-hidden="true" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Section id="about" title={r.sections.about}>
          <p className="text-lg leading-relaxed text-gray-300 print:text-black">{c.playerCard.bio}</p>
        </Section>

        <Section id="highlights" title={r.sections.highlights}>
          <dl className="grid gap-4 sm:grid-cols-2">
            {r.highlights.map((h) => (
              <div key={h.label} className="flex flex-col rounded border border-white/10 bg-white/[0.02] p-4 print:border-gray-300">
                <dt className="text-sm text-gray-400 print:text-gray-700">{h.label}</dt>
                <dd className="order-first text-3xl font-bold text-gold print:text-black">{h.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="case-studies" title={r.sections.caseStudies}>
          <div className="space-y-8">
            {BOSS_ORDER.map((id) => {
              const b = c.bosses[id];
              return (
                <article key={id}>
                  <h3 className="text-lg font-semibold text-white print:text-black">{b.resumeTitle}</h3>
                  <p className="mt-1 text-gray-300 print:text-black">{b.story}</p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-400 print:text-gray-700">
                    {b.unlocked.map((u) => (
                      <li key={u} className="flex gap-2">
                        <span aria-hidden="true" className="text-mint">
                          ▸
                        </span>
                        {u}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="experience" title={r.sections.experience}>
          <ol className="space-y-8">
            {byKind('work').map((id) => {
              const w = c.story.worlds[id];
              return (
                <li key={id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-lg font-semibold text-white print:text-black">{w.title}</h3>
                    <span className="font-mono text-sm text-gray-500">{formatYears(shared.worldYears[id], r.present)}</span>
                  </div>
                  {w.resumeLine && <p className="mt-1 text-gray-300 print:text-black">{w.resumeLine}</p>}
                  {w.details && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {w.details.map((d) => (
                        <li key={d} className="rounded border border-white/10 px-2 py-0.5 text-xs text-gray-400 print:border-gray-300 print:text-gray-700">
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </Section>

        <Section id="education" title={r.sections.education}>
          <ol className="space-y-4">
            {byKind('education').map((id) => {
              const w = c.story.worlds[id];
              return (
                <li key={id} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold text-white print:text-black">{w.title}</h3>
                  <span className="font-mono text-sm text-gray-500">{formatYears(shared.worldYears[id], r.present)}</span>
                </li>
              );
            })}
          </ol>
        </Section>

        <Section id="skills" title={r.sections.skills}>
          <dl className="grid gap-5 sm:grid-cols-2">
            {INVENTORY_TAB_ORDER.map((tab) => (
              <div key={tab}>
                <dt className="mb-2 text-sm font-semibold text-white print:text-black">{c.inventory.tabs[tab].subtitle}</dt>
                <dd className="flex flex-wrap gap-2">
                  {shared.inventory[tab].map((item) => (
                    <span key={item} className="rounded bg-white/5 px-2 py-1 text-sm text-gray-300 print:bg-transparent print:px-0 print:text-black">
                      {shared.itemNames[item]}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title={r.sections.contact}>
          <p className="mb-4 text-gray-300 print:text-black">{r.contactBody}</p>
          <ul className="space-y-2">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={href}>
                <a href={href} className="inline-flex items-center gap-3 text-lg text-white hover:text-cyan print:text-black" target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <Icon aria-hidden="true" className="text-cyan" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <footer className="border-t border-white/10 pt-6 text-xs text-gray-500 print:hidden">
          © 2026 {shared.name}
        </footer>
      </div>
    </div>
  );
}
