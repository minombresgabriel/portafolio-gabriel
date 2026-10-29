'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { readStorage, writeStorage } from './safeStorage';

type Settings = {
  crtFx: boolean;
  toggleCrtFx: () => void;
};

const SettingsContext = createContext<Settings | null>(null);

const CRT_KEY = 'gr-crt-fx';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [crtFx, setCrtFx] = useState(true);

  useEffect(() => {
    if (readStorage(CRT_KEY) === 'off') setCrtFx(false);
  }, []);

  const toggleCrtFx = useCallback(() => {
    setCrtFx((prev) => {
      writeStorage(CRT_KEY, prev ? 'off' : 'on');
      return !prev;
    });
  }, []);

  return <SettingsContext.Provider value={{ crtFx, toggleCrtFx }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
