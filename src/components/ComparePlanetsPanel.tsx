import { useSimStore } from "@/store/useSimStore";
import { PLANETS } from "@/data/planets";
import { X, Columns } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ComparePlanetsPanel() {
  const { selectedPlanet, comparePlanet, setComparePlanet, compareMode } = useSimStore();
  
  if (!compareMode || !selectedPlanet) {
    return null;
  }

  const planet1 = PLANETS.find((p) => p.id === selectedPlanet);
  const planet2 = PLANETS.find((p) => p.id === comparePlanet);

  if (!planet1) return null;

  return (
    <div className="glass rounded-xl p-4 sm:p-5 w-full max-w-full md:max-w-[32rem] max-h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden scrollbar-thin animate-slide-in-right">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Columns className="size-4 text-solar" />
          <h3 className="font-display font-semibold text-sm">Comparar Planetas</h3>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="size-7"
          onClick={() => {
            useSimStore.getState().toggleCompareMode();
          }}
        >
          <X className="size-4" />
        </Button>
      </div>

      {!planet2 ? (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-3">Selecciona un planeta para comparar con <span className="text-solar font-medium">{planet1.name}</span></p>
          <div className="grid grid-cols-3 gap-2">
            {PLANETS.filter((p) => p.id !== selectedPlanet).map((p) => (
              <button
                key={p.id}
                onClick={() => setComparePlanet(p.id)}
                className="p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all group"
              >
                <div className="size-8 rounded-full mb-2 mx-auto" style={{ background: p.color }} />
                <div className="text-[11px] font-medium group-hover:text-solar transition-colors">{p.name}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ComparisonTable planet1={planet1} planet2={planet2} />
      )}
    </div>
  );
}

function ComparisonTable({ planet1, planet2 }: { planet1: typeof PLANETS[0]; planet2: typeof PLANETS[0] }) {
  const metrics = [
    { label: "Diámetro (km)", key: "realDiameter", format: (v: number) => v.toLocaleString() },
    { label: "Masa (⊕)", key: "mass", format: (v: number) => v.toFixed(3) },
    { label: "Distancia AU", key: "au", format: (v: number) => v.toFixed(2) },
    { label: "Gravedad (m/s²)", key: "gravity", format: (v: number) => v.toFixed(2) },
    { label: "Temperatura (°C)", key: "temperature", format: (v: { mean: number }) => `${v.mean}°C` },
    { label: "Período orbital (días)", key: "orbitalPeriod", format: (v: number) => v.toFixed(1) },
    { label: "Período rotación (h)", key: "rotationPeriod", format: (v: number) => Math.abs(v).toFixed(1) },
    { label: "Lunas", key: "moons", format: (v: number) => v.toString() },
    { label: "Inclinación axial (°)", key: "axialTilt", format: (v: number) => v.toFixed(1) },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Métrica</div>
        </div>
        <div className="text-center">
          <div className="size-8 rounded-full mx-auto mb-1" style={{ background: planet1.color }} />
          <div className="text-xs font-medium">{planet1.name}</div>
        </div>
        <div className="text-center">
          <div className="size-8 rounded-full mx-auto mb-1" style={{ background: planet2.color }} />
          <div className="text-xs font-medium">{planet2.name}</div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-3 space-y-2">
        {metrics.map((metric) => {
          const value1 = (planet1 as any)[metric.key];
          const value2 = (planet2 as any)[metric.key];
          const formatted1 = metric.format(value1);
          const formatted2 = metric.format(value2);

          return (
            <div key={metric.label} className="grid grid-cols-3 gap-3 text-[11px]">
              <div className="text-muted-foreground">{metric.label}</div>
              <div className="text-center font-mono-data">{formatted1}</div>
              <div className="text-center font-mono-data">{formatted2}</div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-white/5">
        <button
          onClick={() => useSimStore.getState().setComparePlanet(null)}
          className="w-full text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          Cambiar planeta de comparación
        </button>
      </div>
    </div>
  );
}
