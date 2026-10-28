'use client';

import { motion } from 'framer-motion';
import { caseStudies, type CaseStudy } from '@/data/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSpotlight } from '@/lib/useSpotlight';
import GiantFigure from './GiantFigure';

interface CaseStudyItemProps {
  cs: CaseStudy;
  index: number;
  text: {
    title: string;
    description: string;
    achievements: string[];
    figureWord?: string;
    statLabel?: string;
  };
}

const CaseStudyItem = ({ cs, index, text }: CaseStudyItemProps) => {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();
  const reversed = index % 2 === 1;

  return (
    <section
      id={`case-study-${cs.id}`}
      className="scroll-mt-24 border-b border-white/10 bg-gray-950/60 px-6 py-20 md:px-20"
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className={`group relative mx-auto flex max-w-6xl flex-col gap-10 md:gap-16 ${
          reversed ? 'md:flex-row-reverse' : 'md:flex-row'
        } md:items-center`}
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(560px circle at var(--x, 50%) var(--y, 30%), rgba(0,240,255,0.08), transparent 62%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="md:flex-[1.1]"
        >
          <span className="mb-4 block font-mono text-xs tracking-widest text-gray-500">
            {String(index + 1).padStart(2, '0')} / {String(caseStudies.length).padStart(2, '0')}
          </span>
          <h3 className="mb-5 max-w-[22ch] text-2xl font-bold text-white md:text-4xl">
            {text.title}
          </h3>
          <p className="mb-6 max-w-[56ch] text-gray-300">{text.description}</p>

          <div className="mb-5 flex flex-wrap gap-2">
            {cs.tech.map((tech) => (
              <span
                key={tech}
                className="border border-white/10 px-3 py-1 font-mono text-xs text-gray-400 transition-colors duration-200 hover:border-cyan-400 hover:text-cyan-400"
              >
                {tech}
              </span>
            ))}
          </div>

          <ul className="space-y-1.5 font-mono text-xs uppercase tracking-wide text-cyan-400">
            {text.achievements.map((a, i) => (
              <li key={i}>· {a}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="md:flex-1"
        >
          <GiantFigure figure={cs.figure} word={text.figureWord} statLabel={text.statLabel} />
        </motion.div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="bg-gray-950 pt-20 text-center text-4xl font-extrabold text-white md:text-5xl">
        {t.caseStudies.heading}
      </h2>
      <div className="bg-gray-950 pb-4 pt-10">
        {caseStudies.map((cs, index) => (
          <CaseStudyItem key={cs.id} cs={cs} index={index} text={t.caseStudies.items[cs.id]} />
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
