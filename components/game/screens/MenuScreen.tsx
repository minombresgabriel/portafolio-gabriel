'use client';

import { MENU_ORDER, type MenuItemId } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import type { Screen } from '@/lib/game/screens';
import Skyline from '../art/Skyline';
import ControlHints from '../ui/ControlHints';
import MenuList, { type MenuItem } from '../ui/MenuList';

const TARGETS: Record<Exclude<MenuItemId, 'download'>, Screen> = {
  story: { id: 'story-map' },
  'player-card': { id: 'player-card' },
  achievements: { id: 'achievements' },
  inventory: { id: 'inventory' },
  multiplayer: { id: 'multiplayer' },
};

/** Which menu entry a screen belongs to, so the cursor returns where you left it. */
function menuIndexFor(screen: Screen | null): number {
  if (!screen) return 0;
  const id: MenuItemId | undefined =
    screen.id === 'world' || screen.id === 'boss' || screen.id === 'story-map'
      ? 'story'
      : (Object.keys(TARGETS) as (keyof typeof TARGETS)[]).find((k) => TARGETS[k].id === screen.id);
  return id ? MENU_ORDER.indexOf(id) : 0;
}

export default function MenuScreen() {
  const { c } = useLanguage();
  const { go, previous } = useNavigation();

  const items: MenuItem[] = MENU_ORDER.map((id) =>
    id === 'download'
      ? { id, label: c.menu[id], href: c.cvFile, download: true }
      : { id, label: c.menu[id], onSelect: () => go(TARGETS[id]) },
  );

  return (
    <div className="absolute inset-0">
      <Skyline variant="night" className="pixelated absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/85 to-transparent" />

      <div className="relative flex h-full flex-col px-[var(--gutter)] pt-[14cqh] pb-[5cqh]">
        <h1 className="sr-only">{c.ui.menuAria}</h1>
        <MenuList
          items={items}
          label={c.ui.menuAria}
          initialIndex={menuIndexFor(previous)}
          className="text-[length:var(--fs-menu)]"
        />
        <ControlHints
          className="mt-auto"
          hints={[
            { keys: '↑↓', label: c.ui.hintSelect },
            { keys: 'Ⓐ', label: c.ui.hintConfirm },
            { keys: 'Ⓑ', label: c.ui.hintBack },
          ]}
        />
      </div>
    </div>
  );
}
