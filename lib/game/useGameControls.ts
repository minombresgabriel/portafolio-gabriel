'use client';

import { useEffect, useRef } from 'react';

export type Control = 'up' | 'down' | 'left' | 'right' | 'confirm' | 'back';
export type ControlHandlers = Partial<Record<Control, () => void>>;

const CONTROL_EVENT = 'gr-control';

const KEY_MAP: Record<string, Control> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'confirm',
  Escape: 'back',
};

/** Fire a control from anywhere (on-screen D-pad, A/B buttons). */
export function pressControl(control: Control) {
  // The A button on a focused element behaves like a real Enter press on it.
  if (control === 'confirm') {
    const active = document.activeElement;
    if (active instanceof HTMLButtonElement || active instanceof HTMLAnchorElement) {
      active.click();
      return;
    }
  }
  window.dispatchEvent(new CustomEvent<Control>(CONTROL_EVENT, { detail: control }));
}

function isTextField(el: Element | null): boolean {
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;
}

/** Elements that already activate natively on Enter; we must not fire confirm twice. */
function activatesNatively(el: Element | null): boolean {
  return el instanceof HTMLButtonElement || el instanceof HTMLAnchorElement || isTextField(el);
}

/**
 * Keyboard + virtual-pad controls. Arrows move, Enter confirms, Esc goes back.
 * While typing in a form field only Esc is handled.
 */
export function useGameControls(handlers: ControlHandlers, enabled = true) {
  const ref = useRef(handlers);
  ref.current = handlers;

  useEffect(() => {
    if (!enabled) return;

    const run = (control: Control): boolean => {
      const handler = ref.current[control];
      if (!handler) return false;
      handler();
      return true;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const control = KEY_MAP[e.key];
      if (!control) return;
      const active = document.activeElement;
      if (control !== 'back' && isTextField(active)) return;
      if (control === 'confirm' && activatesNatively(active)) return;
      if (run(control)) e.preventDefault();
    };

    const onVirtual = (e: Event) => {
      if (!(e instanceof CustomEvent)) return;
      run(e.detail as Control);
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener(CONTROL_EVENT, onVirtual);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(CONTROL_EVENT, onVirtual);
    };
  }, [enabled]);
}
