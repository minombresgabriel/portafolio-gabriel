'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSpotlight } from '@/lib/useSpotlight';

const DualOwnership = () => {
  const { t } = useLanguage();
  const d = t.dualOwnership;
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <section
      id="dual-ownership"
      className="scroll-mt-24 relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 px-6 py-24 md:px-20"
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="group relative mx-auto max-w-6xl"
      >
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(560px circle at var(--x, 50%) var(--y, 30%), rgba(0,240,255,0.08), transparent 62%)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400"
        >
          {d.heading}
        </motion.p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-400">
              {d.financialLabel}
            </h3>
            <ul className="space-y-3">
              {d.financialItems.map((item, i) => (
                <li key={i} className="relative pl-5 text-gray-300">
                  <span className="absolute left-0 text-gray-500">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-400">
              {d.platformLabel}
            </h3>
            <ul className="space-y-3">
              {d.platformItems.map((item, i) => (
                <li key={i} className="relative pl-5 text-gray-300">
                  <span className="absolute left-0 text-gray-500">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 max-w-[32ch] text-2xl font-bold leading-snug text-[#ff3d6e] md:text-3xl"
        >
          {d.closing}
        </motion.p>
      </div>
    </section>
  );
};

export default DualOwnership;
