import { useState } from "react";
import { PLANETS } from "@/data/planets";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useSimStore } from "@/store/useSimStore";

const tooltipStyle = {
  background: "rgba(8,8,14,0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  fontSize: 12,
  fontFamily: "JetBrains Mono, monospace",
};

export function ChartsPanel() {
  const [unit, setUnit] = useState<"au" | "km">("au");
  const setSelectedPlanet = useSimStore((s) => s.setSelectedPlanet);

  const distData = PLANETS.map((p) => ({
    name: p.name, value: unit === "au" ? p.au : p.realDistance, color: p.color, id: p.id,
  }));
  const massData = PLANETS.map((p) => ({ name: p.name, value: p.mass, color: p.color, id: p.id }));
  const gravData = PLANETS.map((p) => ({ name: p.name, value: p.gravity, color: p.color, id: p.id }));
  const tempData = PLANETS.map((p) => ({ name: p.name, value: p.temperature.mean, color: p.color, id: p.id }));

  return (
    <div className="panel-glass rounded-xl p-4 w-full max-w-full md:max-w-[28rem] max-h-[calc(100vh-180px)] overflow-y-auto overflow-x-hidden scrollbar-invisible animate-slide-in-right">
      <h3 className="font-display font-semibold text-sm mb-3 text-space">Datos comparativos</h3>
      <Tabs defaultValue="distance">
        <TabsList className="grid grid-cols-4 w-full h-8 bg-white/5 border border-white/10">
          <TabsTrigger value="distance" className="text-[11px] data-[state=active]:bg-solar data-[state=active]:text-black transition-colors">Distancia</TabsTrigger>
          <TabsTrigger value="mass" className="text-[11px] data-[state=active]:bg-solar data-[state=active]:text-black transition-colors">Masa</TabsTrigger>
          <TabsTrigger value="gravity" className="text-[11px] data-[state=active]:bg-solar data-[state=active]:text-black transition-colors">Gravedad</TabsTrigger>
          <TabsTrigger value="temp" className="text-[11px] data-[state=active]:bg-solar data-[state=active]:text-black transition-colors">Temp.</TabsTrigger>
        </TabsList>

        <TabsContent value="distance" className="mt-3 animate-fade-in">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setUnit(unit === "au" ? "km" : "au")}
              className="text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 font-mono-data hover:bg-white/10 hover:border-white/20 transition-all btn-solar"
            >
              {unit === "au" ? "AU" : "M km"}
            </button>
          </div>
          <ChartBlock data={distData} onSelect={setSelectedPlanet} suffix={unit === "au" ? " AU" : " M km"} log />
        </TabsContent>

        <TabsContent value="mass" className="mt-3 animate-fade-in">
          <p className="text-[10px] text-muted-foreground mb-2">Masa relativa (Tierra = 1) · escala logarítmica</p>
          <ChartBlock data={massData} onSelect={setSelectedPlanet} suffix=" ⊕" log />
        </TabsContent>

        <TabsContent value="gravity" className="mt-3 animate-fade-in">
          <p className="text-[10px] text-muted-foreground mb-2">Gravedad superficial (m/s²) · Tierra = 9.8</p>
          <ChartBlock data={gravData} onSelect={setSelectedPlanet} suffix=" m/s²" />
        </TabsContent>

        <TabsContent value="temp" className="mt-3 animate-fade-in">
          <p className="text-[10px] text-muted-foreground mb-2">Temperatura media superficial (°C)</p>
          <ChartBlock data={tempData} onSelect={setSelectedPlanet} suffix="°C" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChartBlock({
  data, onSelect, suffix, log,
}: { data: { name: string; value: number; color: string; id: string }[]; onSelect: (id: string) => void; suffix: string; log?: boolean }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
          <XAxis
            type="number"
            scale={log ? "log" : "linear"}
            domain={log ? ["auto", "auto"] : undefined}
            tick={{ fill: "#888", fontSize: 10 }}
            stroke="rgba(255,255,255,0.1)"
          />
          <YAxis type="category" dataKey="name" tick={{ fill: "#ccc", fontSize: 11 }} width={70} stroke="rgba(255,255,255,0.1)" />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v: number) => [`${v.toLocaleString()}${suffix}`, ""]}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} onClick={(d) => onSelect(d.id)} style={{ cursor: "pointer" }}>
            {data.map((d) => <Cell key={d.id} fill={d.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
