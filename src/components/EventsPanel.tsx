import { useState } from "react";
import { EVENTS, type SpaceEvent } from "@/data/events";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Sparkles, Mountain, Flame, Calendar, Clock, Orbit, Zap, Globe, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryConfig = {
  comet: {
    icon: Sparkles, label: "Cometa", gradient: "from-cyan-500/10 to-blue-500/5",
    border: "border-cyan-500/20", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400",
    glow: "shadow-cyan-500/5",
  },
  asteroid: {
    icon: Mountain, label: "Asteroide", gradient: "from-amber-500/10 to-orange-500/5",
    border: "border-amber-500/20", iconBg: "bg-amber-500/10", iconColor: "text-amber-400",
    glow: "shadow-amber-500/5",
  },
  impact: {
    icon: Flame, label: "Impacto", gradient: "from-red-500/10 to-rose-500/5",
    border: "border-red-500/20", iconBg: "bg-red-500/10", iconColor: "text-red-400",
    glow: "shadow-red-500/5",
  },
};

const dangerConfig: Record<string, { label: string; color: string; bg: string; pulse: string }> = {
  none: { label: "Sin riesgo", color: "text-muted-foreground", bg: "bg-muted-foreground/10", pulse: "" },
  low: { label: "Riesgo bajo", color: "text-emerald-400", bg: "bg-emerald-500/10", pulse: "animate-pulse-soft" },
  moderate: { label: "Riesgo moderado", color: "text-amber-400", bg: "bg-amber-500/10", pulse: "animate-pulse-soft" },
  high: { label: "Riesgo alto", color: "text-orange-500", bg: "bg-orange-500/10", pulse: "animate-pulse-soft" },
  extinction: { label: "Extinción", color: "text-red-500", bg: "bg-red-500/10", pulse: "animate-pulse-soft" },
};

const statusConfig = {
  past: { label: "Pasado", icon: Calendar, color: "text-blue-400/60" },
  future: { label: "Futuro", icon: Clock, color: "text-emerald-400/60" },
  recurring: { label: "Recurrente", icon: Orbit, color: "text-purple-400/60" },
};

function EventCard({ event, onClick, index }: { event: SpaceEvent; onClick: () => void; index: number }) {
  const cat = categoryConfig[event.category];
  const Icon = cat.icon;
  const danger = event.danger ? dangerConfig[event.danger] : null;
  const st = statusConfig[event.status];
  const SIcon = st.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative text-left w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl",
          cat.gradient,
        )}
      />

      {/* Decorative orbital ring on hover */}
      <div
        className={cn(
          "absolute -top-20 -right-20 size-40 rounded-full border border-white/5 opacity-0 group-hover:opacity-30 transition-all duration-700",
          hovered && "rotate-45",
        )}
        style={{ borderColor: `${event.danger === "extinction" ? "#EF4444" : event.danger === "high" ? "#F97316" : "rgba(255,255,255,0.05)"}` }}
      />

      <div className="relative z-10">
        <div className="flex items-start gap-3">
          {/* Category icon */}
          <div className={cn(
            "size-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 border",
            cat.border,
            hovered && "scale-110",
          )}>
            <Icon className={cn("size-5", cat.iconColor)} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Title row */}
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="text-sm font-semibold text-foreground truncate group-hover:text-solar transition-colors">{event.name}</div>
                {danger && event.danger !== "none" && (
                  <span className={cn("inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full shrink-0", danger.bg, danger.color)}>
                    <AlertTriangle className={cn("size-2.5", danger.pulse)} />
                    {danger.label}
                  </span>
                )}
              </div>
              <ChevronRight className={cn(
                "size-3.5 text-muted-foreground/30 shrink-0 transition-all duration-300",
                hovered && "translate-x-0.5 text-solar/50",
              )} />
            </div>

            {/* Meta row */}
            <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground font-mono-data mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="size-2.5" />
                {event.date}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className={cn("flex items-center gap-1", st.color)}>
                <SIcon className="size-2.5" />
                {st.label}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span>{event.size}</span>
            </div>

            {/* Description preview */}
            <p className="text-[11px] text-muted-foreground/60 leading-relaxed mt-1.5 line-clamp-1">{event.description}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function EventDialog({ event, open, onClose }: { event: SpaceEvent; open: boolean; onClose: () => void }) {
  const [activeDetail, setActiveDetail] = useState<number | null>(null);

  if (!event) return null;

  const cat = categoryConfig[event.category];
  const Icon = cat.icon;
  const danger = event.danger ? dangerConfig[event.danger] : null;
  const st = statusConfig[event.status];
  const SIcon = st.icon;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="modal-bg max-w-lg p-0 overflow-hidden">
        {/* Hero header */}
        <div
          className="relative p-6 pb-16 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${event.danger === "extinction" ? "#EF4444" : event.danger === "high" ? "#F97316" : event.danger === "moderate" ? "#F59E0B" : event.danger === "low" ? "#10B981" : "#6366F1"}22, transparent 60%)`,
          }}
        >
          {/* Decorative orbs */}
          <div className="absolute -top-16 -right-16 size-48 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${event.danger === "extinction" ? "#EF4444" : "#FDB813"}, transparent)` }} />
          <div className="absolute -bottom-16 -left-16 size-36 rounded-full opacity-5" style={{ background: `radial-gradient(circle, ${event.danger === "extinction" ? "#EF4444" : "#FDB813"}, transparent)` }} />

          <div className="flex items-center gap-4 relative z-10">
            <div className={cn(
              "size-14 rounded-2xl flex items-center justify-center shrink-0 border",
              cat.border,
            )}>
              <Icon className={cn("size-7", cat.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold text-foreground">{event.name}</DialogTitle>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs text-muted-foreground font-mono-data mt-0.5">
                <Calendar className="size-3" />
                <span>{event.date}</span>
                <span>·</span>
                <span className={cn("flex items-center gap-1", st.color)}>
                  <SIcon className="size-3" />
                  {st.label}
                </span>
                <span>·</span>
                <span>{event.size}</span>
              </div>
              {danger && event.danger !== "none" && (
                <div className={cn("mt-2 inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full", danger.bg, danger.color)}>
                  <AlertTriangle className={cn("size-3", danger.pulse)} />
                  {danger.label}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Description */}
          <DialogDescription className="text-sm text-foreground/70 leading-relaxed">{event.description}</DialogDescription>

          {/* Details grid */}
          {event.details.length > 0 && (
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                <Zap className="size-3 text-solar" />
                Datos técnicos
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {event.details.map((d, i) => (
                  <div
                    key={d.label}
                    className={cn(
                      "rounded-xl bg-white/[0.03] border border-white/5 p-3 transition-all duration-300 cursor-default",
                      activeDetail === i && "bg-white/[0.06] border-white/10",
                    )}
                    onMouseEnter={() => setActiveDetail(i)}
                    onMouseLeave={() => setActiveDetail(null)}
                  >
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground/60 mb-0.5">{d.label}</div>
                    <div className={cn(
                      "text-xs font-mono-data text-foreground transition-all",
                      activeDetail === i && "text-solar",
                    )}>{d.value}</div>
                    {activeDetail === i && (
                      <div className="mt-1 h-0.5 rounded-full bg-gradient-to-r from-solar to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EventsPanel() {
  const [filter, setFilter] = useState<"all" | "past" | "future">("all");
  const [active, setActive] = useState<SpaceEvent | null>(null);

  const filtered = EVENTS.filter((e) => filter === "all" || e.status === filter || (filter === "past" && e.status === "recurring"));

  const filterBtns = [
    { id: "all" as const, label: "Todos los eventos", icon: Orbit },
    { id: "future" as const, label: "Próximos", icon: Clock },
    { id: "past" as const, label: "Históricos", icon: Calendar },
  ];

  return (
    <div className="panel-glass rounded-xl p-4 sm:p-5 w-full max-w-full md:max-w-[30rem] max-h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden scrollbar-invisible animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-gradient-to-br from-red-500/20 to-amber-500/5 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="size-4 text-red-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm text-foreground">Eventos Espaciales</h3>
            <p className="text-[10px] text-muted-foreground font-mono-data">{EVENTS.length} eventos · {EVENTS.filter(e => e.danger === "extinction" || e.danger === "high").length} de alto riesgo</p>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 mb-4 p-1 rounded-xl bg-white/[0.03] border border-white/5">
        {filterBtns.map((f) => {
          const FIcon = f.icon;
          const isActive = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 text-[10px] py-1.5 rounded-lg font-medium transition-all duration-300",
                isActive
                  ? "bg-solar/15 text-solar shadow-[0_0_12px_rgba(253,184,19,0.08)]"
                  : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-white/[0.03]",
              )}
            >
              <FIcon className={cn("size-3", isActive && "animate-pulse-soft")} />
              {f.label}
              {isActive && <span className="size-1 rounded-full bg-solar animate-pulse-soft" />}
            </button>
          );
        })}
      </div>

      {/* Event list */}
      <div className="space-y-2">
        {filtered.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} onClick={() => setActive(e)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="size-8 mx-auto text-muted-foreground/20 mb-2" />
          <p className="text-xs text-muted-foreground/50">No hay eventos en esta categoría</p>
        </div>
      )}

      {/* Dialog */}
      <EventDialog event={active!} open={!!active} onClose={() => setActive(null)} />
    </div>
  );
}
