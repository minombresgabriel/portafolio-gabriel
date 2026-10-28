'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en, type Translations } from './en';
import { es } from './es';
import { content, DEFAULT_LANG, type GameContent, type Lang } from '@/content/game';
import { readStorage, writeStorage } from '@/lib/game/safeStorage';

interface LanguageContextType {
  lang: Lang;
  /** Legacy translations, used by the old section components until /resume replaces them. */
  t: Translations;
  /** Game content for the current language. */
  c: GameContent;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const saved = readStorage('lang');
    if (saved === 'en' || saved === 'es') setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => {
    const next: Lang = lang === 'en' ? 'es' : 'en';
    setLang(next);
    writeStorage('lang', next);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: lang === 'en' ? en : es, c: content[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
