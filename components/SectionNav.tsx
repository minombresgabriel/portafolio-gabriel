'use client';

import { useEffect, useState } from 'react';
import { caseStudies } from '@/data/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const SectionNav = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState('home');

  const sections = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'dual-ownership', label: t.nav.projects },
    ...caseStudies.map((cs) => ({
      id: `case-study-${cs.id}`,
      label: t.caseStudies.items[cs.id].shortTitle,
    })),
    { id: 'archive', label: t.archive.heading },
    { id: 'contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 min-[760px]:flex"
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center justify-end gap-2 rounded p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
        >
          <span className="pointer-events-none whitespace-nowrap font-mono text-[0.65rem] tracking-wide text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {s.label}
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full border transition-all duration-200 ${
              active === s.id
                ? 'scale-125 border-[#ff3d6e] bg-[#ff3d6e]'
                : 'border-gray-500 bg-transparent'
            }`}
          />
        </a>
      ))}
    </nav>
  );
};

export default SectionNav;
