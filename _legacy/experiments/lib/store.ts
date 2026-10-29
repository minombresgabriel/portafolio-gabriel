import { create } from "zustand";
import { STOPS } from "@/data/portfolio";

export type Mode = "pending" | "experience" | "quick";
export type Panel = "experience" | "stack" | null;

type State = {
  mode: Mode;
  introDone: boolean;
  sceneReady: boolean;
  /** Stop the camera is travelling to (or resting at). */
  stop: number;
  /** Stop the camera has fully arrived at; null while travelling. */
  arrived: number | null;
  menuOpen: boolean;
  panel: Panel;
  /** Incremented every time a message is sent, to launch the light. */
  messageLaunches: number;

  setMode: (mode: Mode) => void;
  finishIntro: () => void;
  setSceneReady: () => void;
  goTo: (stop: number) => void;
  step: (dir: 1 | -1) => void;
  setArrived: (stop: number | null) => void;
  setMenu: (open: boolean) => void;
  setPanel: (panel: Panel) => void;
  launchMessage: () => void;
};

const clampStop = (i: number) => Math.max(0, Math.min(STOPS.length - 1, i));

export const useSpace = create<State>((set, get) => ({
  mode: "pending",
  introDone: false,
  sceneReady: false,
  stop: 0,
  arrived: 0,
  menuOpen: false,
  panel: null,
  messageLaunches: 0,

  setMode: (mode) => set({ mode }),
  finishIntro: () => set({ introDone: true }),
  setSceneReady: () => set({ sceneReady: true }),
  goTo: (stop) => {
    const next = clampStop(stop);
    set({ menuOpen: false, panel: null });
    if (next !== get().stop) set({ stop: next, arrived: null });
  },
  step: (dir) => {
    const { stop, arrived, menuOpen, panel } = get();
    // Ignore input while travelling or while an overlay owns the screen.
    if (arrived === null || menuOpen || panel) return;
    get().goTo(stop + dir);
  },
  setArrived: (arrived) => set({ arrived }),
  setMenu: (menuOpen) => set({ menuOpen, panel: null }),
  setPanel: (panel) => set({ panel, menuOpen: false }),
  launchMessage: () => set((s) => ({ messageLaunches: s.messageLaunches + 1 })),
}));
