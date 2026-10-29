'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { hashToScreen, parentOf, sameScreen, screenToHash, TITLE, type Screen } from './screens';

type HistoryState = { grFrom: string | null };

type Navigation = {
  screen: Screen;
  /** The screen shown just before the current one (used to restore menu cursors). */
  previous: Screen | null;
  go: (screen: Screen) => void;
  back: () => void;
};

const NavigationContext = createContext<Navigation | null>(null);

function urlFor(screen: Screen): string {
  const hash = screenToHash(screen);
  return hash ? `#${hash}` : window.location.pathname + window.location.search;
}

function readHistoryState(): HistoryState | null {
  const state: unknown = window.history.state;
  if (state && typeof state === 'object' && 'grFrom' in state) {
    const from = (state as { grFrom: unknown }).grFrom;
    return { grFrom: typeof from === 'string' ? from : null };
  }
  return null;
}

/**
 * Screen state machine synced to the URL hash.
 * Forward moves push a history entry, so the browser Back button walks back
 * through screens; Esc goes to the logical parent screen.
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>(TITLE);
  const [previous, setPrevious] = useState<Screen | null>(null);
  const screenRef = useRef(screen);
  screenRef.current = screen;

  const show = useCallback((next: Screen) => {
    if (sameScreen(next, screenRef.current)) return;
    setPrevious(screenRef.current);
    setScreen(next);
  }, []);

  useEffect(() => {
    const sync = () => show(hashToScreen(window.location.hash));
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, [show]);

  const go = useCallback(
    (next: Screen) => {
      if (sameScreen(next, screenRef.current)) return;
      const state: HistoryState = { grFrom: screenToHash(screenRef.current) };
      window.history.pushState(state, '', urlFor(next));
      show(next);
    },
    [show],
  );

  const back = useCallback(() => {
    const parent = parentOf(screenRef.current);
    if (!parent) return;
    // If we arrived here from the parent, a real history step keeps Back/Forward tidy.
    if (readHistoryState()?.grFrom === screenToHash(parent)) {
      window.history.back();
      return;
    }
    window.history.replaceState(window.history.state, '', urlFor(parent));
    show(parent);
  }, [show]);

  return (
    <NavigationContext.Provider value={{ screen, previous, go, back }}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
