'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = {
  text: string;
  /** Characters per second. */
  speed?: number;
  /** Set to true to reveal the full text immediately (e.g. on Enter). */
  complete?: boolean;
  onDone?: () => void;
  className?: string;
};

/**
 * Types text out like a game dialog. Screen readers get the full text at once;
 * the animated copy is hidden from them. Reduced motion shows everything instantly.
 */
export default function Typewriter({ text, speed = 45, complete = false, onDone, className }: Props) {
  const reduce = useReducedMotion();
  const instant = reduce || complete;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (instant) {
      setCount(text.length);
      return;
    }
    if (count >= text.length) return;
    const timer = window.setTimeout(() => setCount((n) => n + 1), 1000 / speed);
    return () => window.clearTimeout(timer);
  }, [count, instant, speed, text.length]);

  const done = count >= text.length;
  useEffect(() => {
    if (done) onDone?.();
  }, [done, onDone]);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="blink">_</span>
      </span>
    </p>
  );
}
