import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface SimState {
  selectedPlanet: string | null;
  timeScale: number; // simulation speed multiplier
  paused: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  showMeteors: boolean;
  activeMeteorShower: string | null;
  activePanel: "info" | "charts" | "bios" | "events" | "meteors" | null;
  focusMode: boolean; // distraction-free mode
  compareMode: boolean;
  comparePlanet: string | null;
  recentPlanets: string[];
  keyboardEnabled: boolean;
  showTutorial: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  
  setSelectedPlanet: (id: string | null) => void;
  setTimeScale: (s: number) => void;
  togglePaused: () => void;
  toggleOrbits: () => void;
  toggleLabels: () => void;
  toggleMeteors: () => void;
  setActiveMeteorShower: (id: string | null) => void;
  setActivePanel: (p: SimState["activePanel"]) => void;
  toggleFocusMode: () => void;
  toggleCompareMode: () => void;
  setComparePlanet: (id: string | null) => void;
  addToRecent: (id: string) => void;
  setKeyboardEnabled: (enabled: boolean) => void;
  setShowTutorial: (show: boolean) => void;
  toggleSound: () => void;
  setSoundVolume: (v: number) => void;
  resetSimulation: () => void;
}

export const useSimStore = create<SimState>()(
  subscribeWithSelector((set) => ({
    selectedPlanet: null,
    timeScale: 1,
    paused: false,
    showOrbits: true,
    showLabels: true,
    showMeteors: false,
    activeMeteorShower: null,
    activePanel: "info",
    focusMode: false,
    compareMode: false,
    comparePlanet: null,
    recentPlanets: [],
    keyboardEnabled: true,
    showTutorial: typeof window !== "undefined" ? !localStorage.getItem("cosmos-skip-tutorial") : false,
    soundEnabled: true,
    soundVolume: 0.3,
    
    setSelectedPlanet: (id) => set((s) => ({ 
      selectedPlanet: id, 
      activePanel: id ? "info" : s.activePanel,
      recentPlanets: id ? [id, ...s.recentPlanets.filter(p => p !== id)].slice(0, 5) : s.recentPlanets
    })),
    setTimeScale: (timeScale) => set({ timeScale }),
    togglePaused: () => set((s) => ({ paused: !s.paused })),
    toggleOrbits: () => set((s) => ({ showOrbits: !s.showOrbits })),
    toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
    toggleMeteors: () => set((s) => ({ showMeteors: !s.showMeteors })),
    setActiveMeteorShower: (activeMeteorShower) => set({ activeMeteorShower, showMeteors: true }),
    setActivePanel: (activePanel) => set({ activePanel }),
    toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
    toggleCompareMode: () => set((s) => ({ compareMode: !s.compareMode, comparePlanet: null })),
    setComparePlanet: (id) => set({ comparePlanet: id }),
    addToRecent: (id) => set((s) => ({ recentPlanets: [id, ...s.recentPlanets.filter(p => p !== id)].slice(0, 5) })),
    setKeyboardEnabled: (enabled) => set({ keyboardEnabled: enabled }),
    setShowTutorial: (show) => set({ showTutorial: show }),
    toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
    setSoundVolume: (soundVolume) => set({ soundVolume }),
    resetSimulation: () => set({
      selectedPlanet: null,
      timeScale: 1,
      paused: false,
      showOrbits: true,
      showLabels: true,
      showMeteors: false,
      activeMeteorShower: null,
      activePanel: "info",
      focusMode: false,
      compareMode: false,
      comparePlanet: null,
      soundEnabled: true,
      soundVolume: 0.3,
    }),
  }))
);
