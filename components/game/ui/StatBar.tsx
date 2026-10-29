'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  label: string;
  value: number;
  delay?: number;
};

/** Segmented pixel stat bar that fills on mount. */
export default function StatBar({ label, value, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const color = value >= 90 ? 'bg-mint' : value >= 85 ? 'bg-gold' : 'bg-sunset';

  return (
    <div className="grid grid-cols-[9.5em_1fr_2.5em] items-center gap-[1em] text-[length:var(--fs-small)]">
      <dt className="font-pixel text-[length:var(--fs-small)] text-cream">{label}</dt>
      <dd className="contents">
        <span
          className="stat-track relative h-[1.3em] bg-night-950 shadow-[0_0_0_2px_#07041a,0_0_0_3px_#3d2b80]"
          role="meter"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        >
          <motion.span
            className={`absolute inset-y-0 left-0 ${color}`}
            initial={reduce ? false : { width: '0%' }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </span>
        <span className="text-right font-pixel text-[length:var(--fs-small)] text-gold">{value}</span>
      </dd>
    </div>
  );
}
