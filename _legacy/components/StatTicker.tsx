'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

const StatTicker = () => {
  const { t } = useLanguage();
  const items = [...t.hero.ticker, ...t.hero.ticker];

  return (
    <div className="relative mt-10 overflow-hidden border-y border-white/10 bg-black/30 py-3 backdrop-blur-sm">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center px-6 font-mono text-xs tracking-wide text-gray-400 after:ml-6 after:content-['·'] after:text-cyan-400"
          >
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        .ticker-track {
          animation: tickerScroll 26s linear infinite;
        }
        @keyframes tickerScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
            flex-wrap: wrap;
            white-space: normal;
          }
          .ticker-track > span:nth-child(n + ${items.length / 2 + 1}) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default StatTicker;
