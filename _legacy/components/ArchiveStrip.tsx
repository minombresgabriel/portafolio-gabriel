'use client';

import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import { archiveProjects } from '@/data/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const ArchiveStrip = () => {
  const { t } = useLanguage();
  const a = t.archive;

  return (
    <section id="archive" className="scroll-mt-24 bg-gray-950 px-6 py-14 md:px-20">
      <div className="mx-auto max-w-6xl border-t border-white/10 pt-10">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-gray-500">
          {a.heading}
        </p>

        {archiveProjects.map((proj) => {
          const text = a.items[proj.id];
          return (
            <div key={proj.id} className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              {proj.image && (
                <Image
                  src={proj.image}
                  alt={text.title}
                  width={96}
                  height={72}
                  className="w-24 flex-none rounded object-cover opacity-80"
                />
              )}
              <div className="flex-1">
                <h4 className="text-base font-semibold text-white">{text.title}</h4>
                <p className="mt-1 max-w-[60ch] text-sm text-gray-500">{text.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {proj.tech.map((tech) => (
                    <span key={tech} className="font-mono text-xs text-gray-600">
                      {tech}
                    </span>
                  ))}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-cyan-400"
                    >
                      <FaGithub /> {a.github_label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArchiveStrip;
