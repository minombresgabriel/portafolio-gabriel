'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { NavigationProvider, useNavigation } from '@/lib/game/navigation';
import { SettingsProvider } from '@/lib/game/settings';
import { readStorage, writeStorage } from '@/lib/game/safeStorage';
import { useGameControls } from '@/lib/game/useGameControls';
import { screenToHash, type Screen } from '@/lib/game/screens';
import CrtTv from './frame/CrtTv';
import SkipToResume from './frame/SkipToResume';
import BootScreen from './screens/BootScreen';
import TitleScreen from './screens/TitleScreen';
import MenuScreen from './screens/MenuScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import PlayerCardScreen from './screens/PlayerCardScreen';
import AchievementsScreen from './screens/AchievementsScreen';
import InventoryScreen from './screens/InventoryScreen';
import StoryMapScreen from './screens/StoryMapScreen';
import WorldScreen from './screens/WorldScreen';
import BossScreen from './screens/BossScreen';

const BOOT_KEY = 'gr-booted';

/** `pending` = not decided yet (server render / first paint), shown as a dark tube. */
type BootState = 'pending' | 'playing' | 'done';

function ScreenView({ screen, titleActive }: { screen: Screen; titleActive: boolean }) {
  const { c } = useLanguage();
  switch (screen.id) {
    case 'title':
      return <TitleScreen active={titleActive} />;
    case 'menu':
      return <MenuScreen />;
    case 'player-card':
      return <PlayerCardScreen />;
    case 'story-map':
      return <StoryMapScreen />;
    case 'world':
      return <WorldScreen world={screen.world} />;
    case 'boss':
      return <BossScreen boss={screen.boss} />;
    case 'achievements':
      return <AchievementsScreen />;
    case 'inventory':
      return <InventoryScreen />;
    case 'multiplayer':
      return <PlaceholderScreen title={c.menu.multiplayer} />;
  }
}

function Game() {
  const { screen, back } = useNavigation();
  const reduce = useReducedMotion();
  const [boot, setBoot] = useState<BootState>('pending');

  // Boot plays once per session, and never over a deep link.
  useEffect(() => {
    const deepLink = window.location.hash.length > 1;
    setBoot(deepLink || readStorage(BOOT_KEY, 'session') ? 'done' : 'playing');
  }, []);

  const finishBoot = useCallback(() => {
    writeStorage(BOOT_KEY, '1', 'session');
    setBoot('done');
  }, []);

  useGameControls({ back }, boot === 'done');

  return (
    <>
      <SkipToResume />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screenToHash(screen) || 'title'}
          className="crt-content absolute inset-0"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18, ease: 'linear' }}
        >
          <ScreenView screen={screen} titleActive={boot === 'done'} />
        </motion.div>
      </AnimatePresence>
      {boot === 'pending' && <div className="absolute inset-0 z-30 bg-[#030208]" />}
      {boot === 'playing' && <BootScreen onDone={finishBoot} durationMs={reduce ? 900 : 2200} />}
    </>
  );
}

export default function GameShell() {
  return (
    <SettingsProvider>
      <NavigationProvider>
        <CrtTv>
          <Game />
        </CrtTv>
      </NavigationProvider>
    </SettingsProvider>
  );
}
