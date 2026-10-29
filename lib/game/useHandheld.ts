'use client';

import { useSyncExternalStore } from 'react';

/** Same query as the `hh` CSS variant in globals.css: a phone held upright. */
const QUERY = '(max-width: 767px) and (orientation: portrait)';

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

/** True when the game is shown as a portrait handheld (single-column layouts). */
export function useHandheld(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
