'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/** Always-visible escape hatch to the plain resume, top-right of every screen. */
export default function SkipToResume() {
  const { c } = useLanguage();
  return (
    <Link
      href="/resume"
      className="skip-resume absolute top-[2.4cqh] right-[2.4cqw] z-50 font-pixel text-[length:var(--fs-small)] text-cyan underline decoration-cyan/40 underline-offset-4 hover:text-cream"
    >
      {c.ui.skipToResume}
    </Link>
  );
}
