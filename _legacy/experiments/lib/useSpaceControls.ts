"use client";

import { useEffect } from "react";
import { useSpace } from "@/lib/store";
import { CONTACT_STOP, STOPS } from "@/data/portfolio";

export const stopFromHash = (hash: string) => {
  const i = STOPS.indexOf(hash.replace("#", "") as (typeof STOPS)[number]);
  return i < 0 ? 0 : i;
};

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

const insideScrollable = (el: EventTarget | null) => el instanceof Element && !!el.closest("[data-scrollable]");

/** True while a panel under the pointer can still scroll in this direction. */
const canScroll = (el: EventTarget | null, dy: number) => {
  const box = el instanceof Element ? el.closest("[data-scrollable]") : null;
  if (!box || box.scrollHeight <= box.clientHeight + 1) return false;
  return dy > 0 ? box.scrollTop + box.clientHeight < box.scrollHeight - 1 : box.scrollTop > 0;
};

/** Scroll, swipe, keyboard and URL-hash navigation between stops. */
export function useSpaceControls(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const { step, goTo } = useSpace.getState();

    // Trackpads emit long momentum tails: after a hop, wait for a quiet gap
    // in wheel events before accepting the next gesture.
    let accumulated = 0;
    let lastWheel = 0;
    let blocked = false;
    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      // Scroll the panel first; travel only on a fresh gesture once it hits the end.
      if (canScroll(e.target, e.deltaY)) {
        blocked = true;
        accumulated = 0;
        return;
      }
      const { arrived, introDone } = useSpace.getState();
      if (!introDone) return;
      if (blocked) {
        if (gap > 220 && arrived !== null) blocked = false;
        else return;
      }
      if (gap > 220) accumulated = 0;
      accumulated += e.deltaY;
      if (Math.abs(accumulated) > 35) {
        step(accumulated > 0 ? 1 : -1);
        accumulated = 0;
        blocked = true;
      }
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = insideScrollable(e.target) ? null : e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) step(dy > 0 ? 1 : -1);
      touchY = null;
    };

    const onKey = (e: KeyboardEvent) => {
      const s = useSpace.getState();
      if (e.key === "Escape") {
        if (s.menuOpen) s.setMenu(false);
        else if (s.panel) s.setPanel(null);
        return;
      }
      if (isTyping(e.target) || !s.introDone) return;
      const onButton = e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key) || (e.key === " " && !onButton)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") {
        goTo(0);
      } else if (e.key === "End") {
        goTo(CONTACT_STOP);
      }
    };

    const onHash = () => goTo(stopFromHash(window.location.hash));

    // Mirror the current stop into the URL without adding history entries.
    const unsub = useSpace.subscribe((s, prev) => {
      if (s.stop === prev.stop) return;
      const url = s.stop === 0 ? window.location.pathname + window.location.search : `#${STOPS[s.stop]}`;
      history.replaceState(null, "", url);
    });

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      unsub();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [enabled]);
}
