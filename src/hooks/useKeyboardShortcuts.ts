import { useEffect } from "react";
import { useSimStore } from "@/store/useSimStore";
import { PLANETS } from "@/data/planets";

type KeyBinding = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
};

export function useKeyboardShortcuts() {
  const store = useSimStore();

  const shortcuts: KeyBinding[] = [
    {
      key: " ",
      action: () => store.togglePaused(),
      description: "Play/Pause simulation",
    },
    {
      key: "o",
      action: () => store.toggleOrbits(),
      description: "Toggle orbits visibility",
    },
    {
      key: "l",
      action: () => store.toggleLabels(),
      description: "Toggle labels visibility",
    },
    {
      key: "m",
      action: () => store.toggleMeteors(),
      description: "Toggle meteor showers",
    },
    {
      key: "f",
      action: () => store.toggleFocusMode(),
      description: "Focus mode (hide UI)",
    },
    {
      key: "c",
      action: () => store.toggleCompareMode(),
      description: "Compare planets mode",
    },
    {
      key: "s",
      action: () => store.toggleSound(),
      description: "Toggle spatial sound",
    },
    {
      key: "r",
      action: () => store.resetSimulation(),
      description: "Reset simulation",
    },
    {
      key: "Escape",
      action: () => {
        store.setSelectedPlanet(null);
        store.setActivePanel(null);
      },
      description: "Clear selection",
    },
    {
      key: "1",
      action: () => PLANETS[0]?.id && store.setSelectedPlanet(PLANETS[0].id),
      description: "Select first planet",
    },
    {
      key: "2",
      action: () => PLANETS[1]?.id && store.setSelectedPlanet(PLANETS[1].id),
      description: "Select second planet",
    },
    {
      key: "3",
      action: () => PLANETS[2]?.id && store.setSelectedPlanet(PLANETS[2].id),
      description: "Select third planet",
    },
    {
      key: "?",
      shift: true,
      action: () => {
        // Show keyboard shortcuts help
        if (typeof window !== "undefined") {
          const msg = shortcuts.map((s) => `${s.key}: ${s.description}`).join("\n");
          console.log("Keyboard Shortcuts:\n" + msg);
        }
      },
      description: "Show keyboard shortcuts",
    },
  ];

  useEffect(() => {
    if (!store.keyboardEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const isInput = !!tag?.match(/INPUT|TEXTAREA|SELECT/);
      for (const binding of shortcuts) {
        const keyMatch = e.key === binding.key || e.code === binding.key;
        const ctrlMatch = binding.ctrl ? e.ctrlKey || e.metaKey : true;
        const shiftMatch = binding.shift ? e.shiftKey : true;
        const altMatch = binding.alt ? e.altKey : true;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          if (!isInput || e.key === "Escape") {
            e.preventDefault();
            binding.action();
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [store.keyboardEnabled, store]);

  return shortcuts;
}

export function getKeyboardShortcuts() {
  return [
    { key: "Space", action: "Play/Pause" },
    { key: "O", action: "Toggle Orbits" },
    { key: "L", action: "Toggle Labels" },
    { key: "M", action: "Toggle Meteors" },
    { key: "F", action: "Focus Mode" },
    { key: "C", action: "Compare Mode" },
    { key: "S", action: "Toggle Sound" },
    { key: "R", action: "Reset" },
    { key: "Esc", action: "Clear Selection" },
    { key: "1-3", action: "Select Planet" },
    { key: "Shift+?", action: "Help" },
  ];
}
