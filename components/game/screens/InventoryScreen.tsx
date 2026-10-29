'use client';

import { useEffect, useRef, useState } from 'react';
import { INVENTORY_TAB_ORDER, shared, type InventoryTabId } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGameControls } from '@/lib/game/useGameControls';
import { useHandheld } from '@/lib/game/useHandheld';
import ControlHints from '../ui/ControlHints';
import PixelIcon from '../ui/PixelIcon';

/** Tabs shown in-game; Spells is hidden for now (still listed on the resume). */
const TABS = INVENTORY_TAB_ORDER.filter((id) => id !== 'spells');

/**
 * RPG inventory. Two focus zones: the tab bar (←→ switch tabs, ↓ enters the grid)
 * and the item grid (arrows move, ↑ from the first row returns to the tabs).
 */
export default function InventoryScreen() {
  const { c } = useLanguage();
  const inv = c.inventory;
  const [tab, setTab] = useState<InventoryTabId>('weapons');
  const [item, setItem] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = shared.inventory[tab];
  // Big tabs get a fourth column so every item fits without scrolling; phones always use three.
  const handheld = useHandheld();
  const columns = !handheld && items.length > 9 ? 4 : 3;
  const tabIndex = TABS.indexOf(tab);
  const selected = items[Math.min(item, items.length - 1)];

  useEffect(() => {
    itemRefs.current[0]?.focus();
  }, []);

  const zone = (): 'tabs' | 'grid' =>
    tabRefs.current.some((el) => el === document.activeElement) ? 'tabs' : 'grid';

  const selectTab = (i: number) => {
    const next = TABS[(i + TABS.length) % TABS.length];
    setTab(next);
    setItem(0);
    tabRefs.current[TABS.indexOf(next)]?.focus();
  };

  const focusItem = (i: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    setItem(clamped);
    itemRefs.current[clamped]?.focus();
  };

  useGameControls({
    left: () => (zone() === 'tabs' ? selectTab(tabIndex - 1) : focusItem(item - 1)),
    right: () => (zone() === 'tabs' ? selectTab(tabIndex + 1) : focusItem(item + 1)),
    up: () => {
      if (zone() === 'tabs') return;
      if (item < columns) tabRefs.current[tabIndex]?.focus();
      else focusItem(item - columns);
    },
    down: () => (zone() === 'tabs' ? focusItem(0) : focusItem(item + columns)),
  });

  return (
    <div className="absolute inset-0 flex flex-col gap-[3cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh] hh:overflow-y-auto hh:pt-[46px] hh:gap-[18px]">
      <h1 className="sr-only">{inv.heading}</h1>

      <div role="tablist" aria-label={inv.heading} className="flex flex-wrap gap-[1.5cqw]">
        {TABS.map((id, i) => {
          const active = id === tab;
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`inv-tab-${id}`}
              aria-selected={active}
              aria-controls="inv-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => selectTab(i)}
              className={`px-[1em] py-[0.6em] font-pixel text-[length:var(--fs-small)] ${
                active
                  ? 'bg-sunset text-night-950 shadow-[0_0_0_2px_#07041a,0_0_0_4px_#ffd23f]'
                  : 'bg-night-800 text-muted shadow-[0_0_0_2px_#07041a,0_0_0_4px_#3d2b80] hover:text-cream'
              }`}
            >
              {inv.tabs[id].label}
            </button>
          );
        })}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_36%] gap-[3cqw] hh:flex-none hh:grid-cols-1 hh:gap-[18px]">
        <div
          id="inv-panel"
          role="tabpanel"
          aria-labelledby={`inv-tab-${tab}`}
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          className="pixel-panel grid min-h-0 auto-rows-min content-start gap-[2.5cqh_2cqw] p-[1.2em]"
        >
          {items.map((id, i) => {
            const active = id === selected;
            return (
              <button
                key={id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                type="button"
                tabIndex={active ? 0 : -1}
                aria-describedby="inv-tooltip"
                onMouseEnter={() => setItem(i)}
                onFocus={() => setItem(i)}
                onClick={() => focusItem(i)}
                className={`flex flex-col items-center gap-[0.5em] bg-night-950 px-[0.4em] py-[0.8em] ${
                  active ? 'shadow-[0_0_0_2px_#ffd23f]' : 'shadow-[0_0_0_2px_#2a1d5e] hover:shadow-[0_0_0_2px_#7b3fa8]'
                }`}
              >
                <PixelIcon src={`/sprites/items/${id}.svg`} className="h-[7cqh] w-auto" />
                <span className="font-vt text-[length:var(--fs-body)] leading-none text-cream hh:text-[length:var(--fs-story)]">{shared.itemNames[id]}</span>
              </button>
            );
          })}
        </div>

        <aside id="inv-tooltip" aria-live="polite" className="pixel-panel flex min-h-0 flex-col gap-[1em] p-[1.2em] hh:order-first">
          {selected && (
            <>
              <div className="flex items-center gap-[0.8em]">
                <PixelIcon src={`/sprites/items/${selected}.svg`} className="h-[6cqh] w-auto" />
                <div>
                  <p className="font-pixel text-[length:var(--fs-small)] text-gold">{shared.itemNames[selected]}</p>
                  <p className="font-vt text-[length:var(--fs-body)] leading-none text-muted">{inv.tabs[tab].subtitle}</p>
                </div>
              </div>
              <p className="font-vt text-[length:var(--fs-body)] text-cream">{inv.items[selected]}</p>
            </>
          )}
        </aside>
      </div>

      <ControlHints
        hints={[
          { keys: '↑↓←→', label: c.ui.hintSelect },
          { keys: 'Ⓑ / ESC', label: c.ui.hintBack },
        ]}
      />
    </div>
  );
}
