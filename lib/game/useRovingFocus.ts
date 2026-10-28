'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Roving focus over a grid of elements: one cursor index that also owns DOM focus.
 * `columns` = 1 gives a vertical list.
 */
export function useRovingFocus<T extends HTMLElement>(count: number, columns: number, initial = 0, autoFocus = true) {
  const [index, setIndex] = useState(Math.min(initial, Math.max(0, count - 1)));
  const refs = useRef<(T | null)[]>([]);

  const focusAt = useCallback(
    (next: number, focus = true) => {
      if (count === 0) return;
      const clamped = Math.max(0, Math.min(count - 1, next));
      setIndex(clamped);
      if (focus) refs.current[clamped]?.focus();
    },
    [count],
  );

  useEffect(() => {
    if (autoFocus) refs.current[index]?.focus();
    // Only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRef = useCallback(
    (i: number) => (el: T | null) => {
      refs.current[i] = el;
    },
    [],
  );

  return {
    index,
    setIndex: focusAt,
    setRef,
    move: {
      up: () => focusAt(index - columns),
      down: () => focusAt(index + columns),
      left: () => focusAt(index - 1),
      right: () => focusAt(index + 1),
    },
  };
}
