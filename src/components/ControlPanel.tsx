import { useState } from "react";
import { useSimStore } from "@/store/useSimStore";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RecentPlanetsWidget } from "@/components/RecentPlanetsWidget";
import { Pause, Play, Orbit, Tag, Sparkles, RotateCcw, Focus, Columns, HelpCircle, Clock, Layers, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

export function ControlPanel() {
  const s = useSimStore();
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg font-display font-bold text-solar">
            <Sparkles className="size-5" /> Simulación
          </h2>
          <button
            aria-label="Ayuda"
            onClick={() => setHelpOpen(!helpOpen)}
            className="p-2 rounded-md hover:bg-white/5"
          >
            <HelpCircle className="size-5 text-white/90" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Controla velocidad y visibilidad</p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Clock className="size-4" /> Velocidad Temporal</div>
            <div className="font-mono-data text-solar text-base">{s.timeScale.toFixed(1)}×</div>
          </div>
          <div className="mt-3">
            <Slider
              value={[s.timeScale]}
              min={0.1}
              max={20}
              step={0.1}
              onValueChange={([v]) => s.setTimeScale(v)}
            />
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="btn-solar" onClick={() => s.setTimeScale(0.1)}>⏮ 0.1x</Button>
              <Button size="sm" variant="secondary" className="btn-solar" onClick={s.togglePaused}>{s.paused ? 'Reanudar' : 'Pausa'}</Button>
              <Button size="sm" variant="outline" className="btn-solar" onClick={() => s.setTimeScale(10)}>⏭ 10x</Button>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Layers className="size-4" /> Capas</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground"><Orbit className="size-4" /> Órbitas</div>
              <Switch id="orbits" checked={s.showOrbits} onCheckedChange={s.toggleOrbits} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground"><Tag className="size-4" /> Etiquetas</div>
              <Switch id="labels" checked={s.showLabels} onCheckedChange={s.toggleLabels} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground"><Sparkles className="size-4" /> Lluvia</div>
              <Switch id="meteors" checked={s.showMeteors} onCheckedChange={s.toggleMeteors} />
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Volume2 className="size-4" /> Sonido Espacial</div>
            <Switch id="sound" checked={s.soundEnabled} onCheckedChange={s.toggleSound} />
          </div>
          {s.soundEnabled && (
            <div className="mt-2">
              <Slider
                value={[s.soundVolume]}
                min={0}
                max={1}
                step={0.05}
                onValueChange={([v]) => s.setSoundVolume(v)}
              />
              <div className="text-[11px] text-muted-foreground mt-1">Volumen: {Math.round(s.soundVolume * 100)}%</div>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Columns className="size-4" /> Herramientas</div>
          </div>
          <div className="flex flex-col gap-3">
            <Button size="sm" variant="outline" className="w-full justify-center" onClick={s.toggleFocusMode}><Focus className="size-4" /> Modo Enfoque</Button>
            <Button size="sm" variant="outline" className="w-full justify-center" onClick={s.toggleCompareMode}><Columns className="size-4" /> Comparar</Button>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">Vistos Recientemente</div>
          </div>
          <RecentPlanetsWidget />
        </div>
      </div>

      <div className="mt-auto p-4 text-[11px] text-muted-foreground border-t border-white/5">
        <button className="text-xs text-muted-foreground" onClick={() => setHelpOpen(!helpOpen)}>Controles sin mouse · ?</button>
        {helpOpen && (
          <div className="mt-2 text-[12px] text-white/90">
            <div>Flechas: rotar</div>
            <div>Shift + Flechas: mover</div>
            <div>+ / -: zoom</div>
            <div>Pellizca o scroll táctil: zoom</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-80 md:z-30 md:flex md:flex-col">
        <div className="glass h-full w-80 border-r border-white/10 backdrop-blur-lg">
          {content}
        </div>
      </aside>

      {/* Mobile bottom sheet */}
      <div className="md:hidden">
        <button
          className="fixed bottom-6 right-6 z-40 bg-solar text-black p-3 rounded-full shadow-lg"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir panel"
        >
          <Columns />
        </button>

        {mobileOpen && (
          <div className="fixed inset-x-0 bottom-0 z-50 h-3/4">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="h-full"
          >
            <div className="glass h-full rounded-t-2xl p-0">
              <div className="p-4 flex justify-end">
                <button className="px-3 py-1 rounded-md" onClick={() => setMobileOpen(false)}>Cerrar</button>
              </div>
              <div className="h-full overflow-y-auto">{content}</div>
            </div>
          </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
