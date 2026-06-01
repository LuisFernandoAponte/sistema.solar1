import { useState } from "react";
import { SHOWERS } from "@/data/meteorShowers";
import { useSimStore } from "@/store/useSimStore";
import { Sparkles, Star, Zap, Clock, Eye, Telescope, Wind, MapPin, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

function intensityMeter(thz: number) {
  if (thz >= 100) return { label: "Tormenta", color: "from-yellow-400 to-orange-500", bg: "bg-orange-500/20", text: "text-orange-400", bars: 5 };
  if (thz >= 50) return { label: "Muy activa", color: "from-cyan-400 to-blue-500", bg: "bg-blue-500/20", text: "text-cyan-400", bars: 4 };
  if (thz >= 20) return { label: "Moderada", color: "from-blue-400 to-purple-500", bg: "bg-purple-500/20", text: "text-blue-400", bars: 3 };
  return { label: "Suave", color: "from-gray-400 to-gray-500", bg: "bg-gray-500/20", text: "text-gray-400", bars: 2 };
}

function MeteorCard({ shower, active, onClick }: { shower: typeof SHOWERS[0]; active: boolean; onClick: () => void }) {
  const intensity = intensityMeter(shower.thz);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative text-left w-full p-4 rounded-xl border transition-all duration-300 overflow-hidden",
        active
          ? "bg-white/[0.06] border-solar/40 shadow-[0_0_20px_rgba(253,184,19,0.06)]"
          : "bg-white/[0.03] border-white/5 hover:border-white/20",
      )}
    >
      {/* Active glow background */}
      {active && (
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(ellipse at 50% 0%, ${shower.color}22, transparent)` }} />
      )}

      {/* Hover decorative ring */}
      {hovered && !active && (
        <div className="absolute -top-12 -right-12 size-32 rounded-full border border-white/[0.03] transition-all duration-700" />
      )}

      <div className="relative z-10">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className={cn(
              "size-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 border",
              active ? "border-solar/40 scale-110" : "border-transparent",
              hovered && !active && "scale-105",
            )}
            style={{
              background: active
                ? `linear-gradient(135deg, ${shower.color}33, ${shower.color}11)`
                : `${shower.color}15`,
              color: shower.color,
              boxShadow: active ? `0 0 20px ${shower.color}44` : "none",
            }}
          >
            <Sparkles className={cn("size-5", active && "animate-pulse-soft")} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Name + THZ badge */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="text-sm font-semibold text-foreground truncate group-hover:text-solar transition-colors">{shower.name}</div>
              <div className={cn(
                "text-[10px] font-bold font-mono-data px-2 py-0.5 rounded-full shrink-0 border",
                active ? "bg-solar/15 border-solar/30 text-solar" : "bg-white/5 border-white/10 text-muted-foreground",
              )}>
                THZ {shower.thz}
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground font-mono-data mb-1.5">
              <span className="flex items-center gap-1">
                <Clock className="size-2.5" />
                {shower.peak}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-1">
                <Wind className="size-2.5" />
                {shower.velocity} km/s
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="size-2.5" />
                {shower.radiant}
              </span>
            </div>

            {/* Intensity meter */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 flex-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-300",
                      i < intensity.bars
                        ? intensity.bg
                        : "bg-white/5",
                    )}
                    style={i < intensity.bars ? { background: `linear-gradient(90deg, ${shower.color}66, ${shower.color}33)` } : undefined}
                  />
                ))}
              </div>
              <span className={cn("text-[9px] font-medium font-mono-data", intensity.text)}>
                {intensity.label}
              </span>
            </div>

            {/* Expanded info when active */}
            {active && (
              <div className="mt-3 pt-3 border-t border-white/5 animate-slide-in-up">
                <p className="text-[11px] text-foreground/70 leading-relaxed mb-2">{shower.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-muted-foreground flex items-center gap-1">
                    <Layers className="size-2.5" />
                    Origen: {shower.origin}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-muted-foreground flex items-center gap-1">
                    <Star className="size-2.5" />
                    Radiante: {shower.radiant}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

export function MeteorsPanel() {
  const { activeMeteorShower, setActiveMeteorShower, showMeteors, toggleMeteors } = useSimStore();

  return (
    <div className="panel-glass rounded-xl p-4 sm:p-5 w-full max-w-full md:max-w-[26rem] max-h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden scrollbar-invisible animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/5 border border-yellow-500/20 flex items-center justify-center">
            <Sparkles className="size-4 text-yellow-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground">Lluvias de Meteoros</h3>
            <p className="text-[10px] text-muted-foreground font-mono-data">{SHOWERS.length} lluvias activas este año</p>
          </div>
        </div>

        <button
          onClick={toggleMeteors}
          className={cn(
            "text-[10px] px-3 py-1.5 rounded-lg border font-medium transition-all duration-300 flex items-center gap-1.5",
            showMeteors
              ? "bg-solar/15 border-solar/30 text-solar shadow-[0_0_10px_rgba(253,184,19,0.06)]"
              : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10",
          )}
        >
          <Eye className={cn("size-3", showMeteors && "animate-pulse-soft")} />
          {showMeteors ? "Visible en simulador" : "Oculto"}
        </button>
      </div>

      {/* Info banner */}
      <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10">
        <div className="flex items-start gap-2.5">
          <Telescope className="size-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] text-foreground/60 leading-relaxed">
              Selecciona una lluvia para visualizarla en el simulador 3D.
              Las más activas tienen barras de intensidad más largas.
            </p>
          </div>
        </div>
      </div>

      {/* Shower cards */}
      <div className="space-y-2">
        {SHOWERS.map((s) => (
          <MeteorCard
            key={s.id}
            shower={s}
            active={activeMeteorShower === s.id}
            onClick={() => setActiveMeteorShower(s.id)}
          />
        ))}
      </div>

      {/* Active indicator */}
      {activeMeteorShower && (
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-solar/10 to-transparent border border-solar/10">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-solar animate-pulse-soft" />
            <div className="flex-1">
              <div className="text-[10px] font-medium text-solar">
                {SHOWERS.find((s) => s.id === activeMeteorShower)?.name} activa
              </div>
              <div className="text-[9px] text-muted-foreground/60">
                Visible en el simulador · Haz clic de nuevo para desactivar
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
