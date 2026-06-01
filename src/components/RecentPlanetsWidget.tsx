import { useSimStore } from "@/store/useSimStore";
import { PLANETS } from "@/data/planets";
import { Clock } from "lucide-react";

export function RecentPlanetsWidget() {
  const { recentPlanets, setSelectedPlanet } = useSimStore();

  if (recentPlanets.length === 0) return null;

  return (
    <div className="glass rounded-lg px-3 py-2 space-y-2">
      <div className="flex items-center gap-1.5">
        <Clock className="size-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Recientes</span>
      </div>
      <div className="flex gap-1.5">
        {recentPlanets.map((planetId) => {
          const planet = PLANETS.find((p) => p.id === planetId);
          if (!planet) return null;
          return (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet.id)}
              className="size-7 rounded-full hover:scale-110 transition-transform hover:shadow-[0_0_12px_rgba(253,184,19,0.3)]"
              style={{ background: planet.color }}
              title={planet.name}
            />
          );
        })}
      </div>
    </div>
  );
}
