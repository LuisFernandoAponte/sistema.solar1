import { createFileRoute } from "@tanstack/react-router";
import { SolarSystem } from "@/components/SolarSystem";
import { ControlPanel } from "@/components/ControlPanel";

import { ChartsPanel } from "@/components/ChartsPanel";
import { BiographiesPanel } from "@/components/BiographiesPanel";
import { EventsPanel } from "@/components/EventsPanel";
import { MeteorsPanel } from "@/components/MeteorsPanel";
import { InfoPanel } from "@/components/InfoPanel";
import { ComparePlanetsPanel } from "@/components/ComparePlanetsPanel";
import { FaqPanel } from "@/components/FaqPanel";
import { useSimStore } from "@/store/useSimStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useSpatialAudio } from "@/hooks/useSpatialAudio";
import { BarChart3, Users, Sparkles, Flame, Keyboard, X, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cosmos · Simulador del Sistema Solar" },
      { name: "description", content: "Simulador 3D científico del Sistema Solar con datos reales, biografías, eventos espaciales y lluvias de meteoros." },
      { property: "og:title", content: "Cosmos · Simulador del Sistema Solar" },
      { property: "og:description", content: "Explora planetas, cometas, asteroides y lluvias de meteoros con datos científicos reales." },
    ],
  }),
  component: Index,
});

function Index() {
  const { activePanel, setActivePanel, focusMode, selectedPlanet, soundEnabled, toggleSound } = useSimStore();
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  useKeyboardShortcuts();
  useSpatialAudio();

  const panels = [
    { id: "charts" as const, icon: BarChart3, label: "Datos" },
    { id: "bios" as const, icon: Users, label: "Biografías" },
    { id: "events" as const, icon: Flame, label: "Eventos" },
    { id: "meteors" as const, icon: Sparkles, label: "Meteoros" },
  ];

  return (
    <div className={`fixed inset-0 overflow-hidden ${focusMode ? "cursor-none" : ""}`}>
      {/* Control sidebar (fixed) */}
      {!focusMode && <ControlPanel />}

      {/* 3D Canvas - padded on desktop to leave space for sidebar */}
      <div className="absolute inset-0 md:pl-80">
        <SolarSystem />
      </div>

      {/* Header - hide in focus mode */}
      {!focusMode && (
        <header className="absolute top-0 inset-x-0 z-10 p-2 sm:p-4 pointer-events-none animate-fade-in">
          <div className="flex items-center justify-between gap-2">
            <div className="glass rounded-xl px-3 sm:px-4 py-2 pointer-events-auto hover:shadow-lg transition-shadow shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="size-7 sm:size-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "radial-gradient(circle, #FDB813, #EF4444)" }}>
                  <Sparkles className="size-3 sm:size-4 text-black" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-display font-bold text-sm leading-none">COSMOS</h1>
                  <p className="text-[10px] text-muted-foreground font-mono-data leading-none mt-0.5">Solar System Simulator</p>
                </div>
              </div>
            </div>

            <nav className="glass rounded-xl p-1 flex gap-1 pointer-events-auto overflow-x-auto flex-1 sm:flex-none max-w-[calc(100vw-12rem)] sm:max-w-none shrink min-w-0">
              {panels.map((p) => {
                const Icon = p.icon;
                const active = activePanel === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePanel(active ? null : p.id)}
                    title={`${p.label} (${panels.indexOf(p) + 1})`}
                    className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 sm:gap-1.5 transition-all btn-solar shrink-0 ${
                      active ? "bg-solar text-black font-medium" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="hidden sm:inline">{p.label}</span>
                  </button>
                );
              })}
              
              <button
                onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                title="Keyboard shortcuts (Shift+?)"
                className="px-2 sm:px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 sm:gap-1.5 transition-all text-muted-foreground hover:text-foreground hover:bg-white/5 btn-solar shrink-0"
              >
                <Keyboard className="size-3.5 shrink-0" />
              </button>
            </nav>
          </div>
        </header>
      )}

      

      {/* Right side panels */}
      {!focusMode && (
        <aside className="absolute top-20 right-0 md:right-8 z-10 pointer-events-auto w-auto max-w-[calc(100vw-1rem)] md:max-w-[28rem] lg:max-w-[32rem] overflow-y-auto max-h-[calc(100vh-100px)] px-3 md:px-0">
          <div className="flex flex-col items-end gap-2 min-w-0">
            {activePanel === "charts" && (
              <div className="panel-enter relative w-full max-w-full md:max-w-md">
                <button
                  onClick={() => setActivePanel(null)}
                  className="btn-close-modal"
                  title="Cerrar"
                >
                  <X />
                </button>
                <ChartsPanel />
              </div>
            )}
            {activePanel === "bios" && (
              <div className="panel-enter relative w-full max-w-full md:max-w-md">
                <button
                  onClick={() => setActivePanel(null)}
                  className="btn-close-modal"
                  title="Cerrar"
                >
                  <X />
                </button>
                <BiographiesPanel />
              </div>
            )}
            {activePanel === "events" && (
              <div className="panel-enter relative w-full max-w-full md:max-w-md">
                <button
                  onClick={() => setActivePanel(null)}
                  className="btn-close-modal"
                  title="Cerrar"
                >
                  <X />
                </button>
                <EventsPanel />
              </div>
            )}
            {activePanel === "meteors" && (
              <div className="panel-enter relative w-full max-w-full md:max-w-md">
                <button
                  onClick={() => setActivePanel(null)}
                  className="btn-close-modal"
                  title="Cerrar"
                >
                  <X />
                </button>
                <MeteorsPanel />
              </div>
            )}
            {selectedPlanet && (
              <div className="panel-enter relative w-full max-w-full md:max-w-md">
                <InfoPanel />
              </div>
            )}
            <div className="w-full max-w-full md:max-w-lg">
              <ComparePlanetsPanel />
            </div>
          </div>
        </aside>
      )}

      {/* Footer */}
      {!focusMode && (
        <footer className="absolute bottom-4 left-2 sm:left-4 right-2 sm:right-auto z-10 pointer-events-none animate-slide-in-up">
          <div className="glass rounded-lg px-2 sm:px-3 py-1.5 text-[9px] sm:text-[10px] text-muted-foreground font-mono-data pointer-events-auto hover:shadow-lg transition-shadow leading-tight sm:leading-normal">
            <span className="hidden sm:inline">Arrastra o toca para rotar · Shift+flechas para mover · + / - para zoom · Click/tap en planetas</span>
            <span className="sm:hidden">Arrastra · +/− zoom · Toca planetas</span>
          </div>
        </footer>
      )}

      {/* Keyboard Help Modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowKeyboardHelp(false)}
          />
          <div className="relative glass rounded-2xl p-6 max-w-md max-h-96 overflow-y-auto">
            <h2 className="text-lg font-display font-bold text-solar mb-4">Atajos de Teclado</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">Espacio</span> <span>Play/Pause</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">O</span> <span>Toggle órbitas</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">L</span> <span>Toggle etiquetas</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">M</span> <span>Toggle meteoros</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">S</span> <span>Sonido espacial</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">F</span> <span>Modo enfoque</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">C</span> <span>Comparar planetas</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">R</span> <span>Resetear simulación</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">Esc</span> <span>Limpiar selección</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">1-3</span> <span>Seleccionar planeta</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">Flechas</span> <span>Rotar</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">Shift + Flechas</span> <span>Mover cámara</span></div>
              <div className="flex justify-between"><span className="font-mono-data text-xs bg-white/5 px-2 py-1 rounded">+ / -</span> <span>Zoom</span></div>
            </div>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="mt-4 w-full px-4 py-2 rounded-lg bg-solar text-black font-medium hover:bg-solar/90 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Floating mute button */}
      {!focusMode && (
        <button
          onClick={toggleSound}
          title={soundEnabled ? "Silenciar (S)" : "Activar sonido (S)"}
          className="fixed bottom-6 left-6 z-40 size-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
        >
          {soundEnabled ? <Volume2 className="size-5 text-solar" /> : <VolumeX className="size-5 text-muted-foreground" />}
        </button>
      )}

      <FaqPanel />
    </div>
  );
}
