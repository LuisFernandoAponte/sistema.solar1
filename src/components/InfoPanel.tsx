import { useState } from "react";
import { useSimStore } from "@/store/useSimStore";
import { PLANETS, SUN, MOON } from "@/data/planets";
import {
  X, Ruler, Weight, Globe2, Thermometer, Orbit, Clock, Sun,
  Wind, Rocket, BarChart3, Compass, Telescope, Copy, Share2,
  Sparkles, Layers, Eye, Moon, Info, Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const EARTH = PLANETS.find((p) => p.id === "earth")!;

function fmt(n: number, decimals = 2): string {
  return n.toLocaleString("es-ES", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
}

function tempColor(temp: number): string {
  if (temp > 100) return "text-orange-400";
  if (temp > 50) return "text-yellow-300";
  if (temp < -100) return "text-cyan-300";
  if (temp < -50) return "text-blue-300";
  return "text-foreground";
}

function tempIcon(temp: number): string {
  if (temp > 100) return "🔥";
  if (temp > 50) return "☀️";
  if (temp < -100) return "❄️";
  if (temp < -50) return "🧊";
  return "🌡️";
}

function ratioToEarth(value: number, earthValue: number): number {
  if (earthValue === 0) return 0;
  return value / earthValue;
}

function ComparisonBar({ ratio, color = "var(--color-solar)" }: { ratio: number; color?: string }) {
  const pct = Math.min(Math.abs(ratio) * 100, 100);
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div
        className="h-full rounded-full comparison-bar"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

const tooltipExplanations: Record<string, string> = {
  "Diámetro Ecuatorial": "Distancia de un lado al otro del planeta pasando por el ecuador",
  "Masa (vs Tierra)": "Cuántas veces es más masivo que la Tierra",
  "Gravedad Superficial": "Fuerza de gravedad en la superficie del planeta",
  Densidad: "Masa por unidad de volumen del planeta",
  "Velocidad de Escape": "Velocidad mínima necesaria para escapar de la atracción gravitatoria",
  "Distancia al Sol": "Distancia promedio entre el planeta y el Sol",
  "Período Orbital": "Tiempo que tarda en completar una vuelta alrededor del Sol",
  "Día (Rotación)": "Tiempo que tarda en girar una vez sobre su propio eje",
  "Inclinación Axial": "Ángulo de inclinación del eje de rotación respecto al plano orbital",
  "Temperatura Media": "Temperatura promedio en la superficie del planeta",
  "Temperatura Mínima": "Temperatura más baja registrada en la superficie",
  "Temperatura Máxima": "Temperatura más alta registrada en la superficie",
  "Composición Atmosférica": "Gases que componen la atmósfera del planeta",
  "Presión Atmosférica": "Presión ejercida por la atmósfera sobre la superficie",
  "Número de Lunas": "Cantidad de satélites naturales conocidos orbitando el planeta",
  Albedo: "Porcentaje de luz solar que refleja el planeta (0 = absorbe toda, 1 = refleja toda)",
  "Magnitud Aparente": "Brillo aparente del planeta visto desde la Tierra",
  Composición: "Materiales que constituyen el interior del planeta",
  Exploración: "Misiones espaciales que han visitado este planeta",
};

function StatCard({
  icon: Icon,
  label,
  value,
  comparison,
  tooltip,
  className,
  color,
  barValue,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  comparison?: string;
  tooltip?: string;
  className?: string;
  color?: string;
  barValue?: number;
}) {
  const content = (
    <div
      className={cn(
        "rounded-xl bg-white/[0.03] border border-white/5 p-3 hover:border-white/15 hover:bg-white/[0.06] transition-all cursor-default group relative overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">
        <Icon className="size-3.5 shrink-0" />
        <span className="truncate">{label}</span>
        {tooltip && (
          <Info className="size-3 shrink-0 opacity-30 group-hover:opacity-70 transition-opacity ml-auto" />
        )}
      </div>
      <div className="font-mono-data text-sm font-medium leading-tight">{value}</div>
      {comparison && (
        <div className="text-[10px] text-muted-foreground/70 mt-0.5">{comparison}</div>
      )}
      {barValue !== undefined && <ComparisonBar ratio={barValue} color={color} />}
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="left" className="max-w-64 text-xs leading-relaxed">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
}

function FactCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3 hover:border-white/15 hover:bg-white/[0.06] transition-all group">
      <div className="flex items-start gap-2.5">
        <span className="text-lg shrink-0 mt-0.5">{icon}</span>
        <div>
          <div className="text-xs font-semibold text-foreground mb-0.5">{title}</div>
          <div className="text-[11px] text-muted-foreground leading-relaxed">{description}</div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{icon}</span>
        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/80">{title}</h3>
      </div>
      <div className="border-t border-white/5 pt-3 space-y-2">
        {children}
      </div>
    </div>
  );
}

export function InfoPanel() {
  const { selectedPlanet, setSelectedPlanet } = useSimStore();
  const [expertMode, setExpertMode] = useState(false);

  if (selectedPlanet === "solar-eclipse") {
    return <EclipseInfoPanel />;
  }

  const planet = selectedPlanet === "moon" ? MOON : PLANETS.find((p) => p.id === selectedPlanet) ?? (selectedPlanet === "sun" ? SUN : null);

  if (!planet) return null;

  const diamRatio = ratioToEarth(planet.realDiameter, EARTH.realDiameter);
  const massRatio = ratioToEarth(planet.mass, EARTH.mass);
  const gravRatio = ratioToEarth(planet.gravity, EARTH.gravity);
  const distAU = planet.au;
  const tempMean = planet.temperature.mean;
  const tempMin = planet.temperature.min;
  const tempMax = planet.temperature.max;
  const orbitalYears = (planet.orbitalPeriod / 365.25);
  const dayHours = Math.abs(planet.rotationPeriod);

  const copyAllData = () => {
    const lines = [
      `🪐 ${planet.name} (${planet.nameEn})`,
      planet.description,
      "",
      "📐 CARACTERÍSTICAS FÍSICAS",
      `  Diámetro Ecuatorial: ${fmt(planet.realDiameter)} km (${(diamRatio * 100).toFixed(0)}% Tierra)`,
      `  Masa: ${planet.mass < 1 ? planet.mass.toFixed(3) : planet.mass.toFixed(2)} Tierras`,
      `  Gravedad Superficial: ${planet.gravity} m/s² (${(gravRatio * 100).toFixed(0)}% Tierra)`,
      `  Densidad: ${planet.density} g/cm³`,
      ...(expertMode && planet.escapeVelocity ? [`  Velocidad de Escape: ${planet.escapeVelocity} km/s`] : []),
      "",
      "🌍 ÓRBITA Y ROTACIÓN",
      `  Distancia al Sol: ${planet.realDistance} millones km (${planet.au} UA)`,
      `  Período Orbital: ${planet.orbitalPeriod} días (${orbitalYears.toFixed(2)} años)`,
      `  Día (Rotación): ${dayHours.toFixed(1)} horas`,
      ...(expertMode ? [`  Inclinación Axial: ${planet.axialTilt}°`] : []),
      "",
      "🌡️ CLIMA Y ATMÓSFERA",
      `  Temperatura Media: ${tempMean}°C`,
      ...(expertMode ? [
        `  Temperatura Mínima: ${tempMin}°C`,
        `  Temperatura Máxima: ${tempMax}°C`,
        ...(planet.atmosphericComposition ? [`  Composición Atmosférica: ${planet.atmosphericComposition}`] : []),
        ...(planet.atmosphericPressure ? [`  Presión Atmosférica: ${planet.atmosphericPressure}`] : []),
      ] : []),
      "",
      `🛰️ SATÉLITES: ${planet.moons} lunas`,
      ...(planet.satellites ? planet.satellites.map((s) => `  - ${s.name}`) : []),
      ...(expertMode && planet.exploration ? [`🔬 Exploración: ${planet.exploration}`] : []),
    ];
    navigator.clipboard.writeText(lines.join("\n"));
  };

  const sharePlanet = () => {
    const url = `${window.location.origin}?planet=${planet.id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="modal-bg rounded-xl p-4 sm:p-5 w-full max-w-full md:max-w-[28rem] max-h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden scrollbar-invisible animate-slide-in-right relative">
        {/* Close button */}
        <button onClick={() => setSelectedPlanet(null)} className="btn-close-modal" aria-label="Cerrar panel">
          <X />
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-full ring-2 ring-white/10 shrink-0" style={{ background: `radial-gradient(circle at 30% 30%, ${planet.color}, #000)` }} />
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight">{planet.name}</h2>
              <div className="text-xs text-muted-foreground">{planet.nameEn}</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={sharePlanet} className="size-7 btn-solar" aria-label="Compartir planeta">
                  <Share2 className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copiar enlace del planeta</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={copyAllData} className="size-7 btn-solar" aria-label="Copiar datos">
                  <Copy className="size-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copiar todos los datos</TooltipContent>
            </Tooltip>
        </div>
        </div>

        {/* Expert/Basic Toggle */}
        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-white/[0.03] border border-white/5">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {expertMode ? "🔬 Experto" : "📖 Básico"}
          </span>
          <button
            onClick={() => setExpertMode(!expertMode)}
            className={cn(
              "relative w-10 h-5 rounded-full transition-colors duration-300",
              expertMode ? "bg-solar" : "bg-white/20",
            )}
            aria-label={expertMode ? "Cambiar a modo básico" : "Cambiar a modo experto"}
            role="switch"
            aria-checked={expertMode}
          >
            <div
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300",
                expertMode ? "translate-x-5" : "translate-x-0.5",
              )}
            />
          </button>
          <span className="text-[10px] text-muted-foreground">{expertMode ? "Datos técnicos completos" : "Solo lo esencial"}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-foreground/80 leading-relaxed mb-5 italic border-l-2 border-solar/40 pl-3">
          {planet.description}
        </p>

        {/* CARACTERÍSTICAS FÍSICAS */}
        <Section icon="📐" title="CARACTERÍSTICAS FÍSICAS">
          <StatCard
            icon={Ruler}
            label="Diámetro Ecuatorial"
            value={`${fmt(planet.realDiameter)} km`}
            comparison={`${(diamRatio * 100).toFixed(0)}% del tamaño de la Tierra`}
            tooltip={tooltipExplanations["Diámetro Ecuatorial"]}
            barValue={diamRatio}
            color={planet.color}
          />
          <StatCard
            icon={Weight}
            label="Masa (vs Tierra)"
            value={planet.mass < 0.01 ? `${(planet.mass * 1000).toFixed(1)} × 10⁻³ Tierras` : planet.id === "earth" ? "1 Tierra" : `${planet.mass.toFixed(massRatio < 1 ? 3 : 2)} Tierras`}
            comparison={planet.id !== "earth" ? `${(massRatio * 100).toFixed(1)}% de la masa terrestre` : "Referencia"}
            tooltip={tooltipExplanations["Masa (vs Tierra)"]}
            barValue={massRatio > 1 ? 1 : massRatio}
            color={planet.color}
          />
          <StatCard
            icon={Globe2}
            label="Gravedad Superficial"
            value={`${planet.gravity} m/s²`}
            comparison={`${(gravRatio * 100).toFixed(0)}% de la gravedad terrestre`}
            tooltip={tooltipExplanations["Gravedad Superficial"]}
            barValue={gravRatio > 1.5 ? 1 : gravRatio}
            color={planet.color}
          />
          {planet.density && (
            <StatCard
              icon={BarChart3}
              label="Densidad"
              value={`${planet.density} g/cm³`}
              comparison={planet.density < 1 ? "¡Menos denso que el agua! (1 g/cm³)" : planet.density > 5 ? "Muy denso (rocoso)" : "Densidad media"}
              tooltip={tooltipExplanations["Densidad"]}
              barValue={planet.density / 5.51}
              color={planet.color}
            />
          )}
          {expertMode && planet.escapeVelocity && (
            <StatCard
              icon={Rocket}
              label="Velocidad de Escape"
              value={`${planet.escapeVelocity} km/s`}
              comparison={planet.escapeVelocity > 20 ? "Muy difícil escapar" : planet.id === "earth" ? "11.19 km/s para salir de la Tierra" : "Más fácil que en la Tierra"}
              tooltip={tooltipExplanations["Velocidad de Escape"]}
              barValue={planet.escapeVelocity / 11.19}
              color={planet.color}
            />
          )}
        </Section>

        {/* ÓRBITA Y ROTACIÓN */}
        <Section icon="🌍" title="ÓRBITA Y ROTACIÓN">
          <StatCard
            icon={Sun}
            label="Distancia al Sol"
            value={`${fmt(planet.realDistance)} millones km`}
            comparison={`${planet.au} UA (Unidades Astronómicas)`}
            tooltip={tooltipExplanations["Distancia al Sol"]}
            barValue={distAU > 5 ? 1 : distAU}
            color={planet.color}
          />
          <StatCard
            icon={Orbit}
            label="Período Orbital (Año)"
            value={planet.orbitalPeriod < 100 ? `${planet.orbitalPeriod} días terrestres` : `${fmt(planet.orbitalPeriod)} días`}
            comparison={planet.id !== "earth" ? `${orbitalYears.toFixed(2)} años terrestres` : "365.25 días"}
            tooltip={tooltipExplanations["Período Orbital"]}
            barValue={orbitalYears > 10 ? 0.3 : orbitalYears}
            color={planet.color}
          />
          <StatCard
            icon={Clock}
            label="Día (Rotación)"
            value={dayHours >= 1000 ? `${fmt(dayHours / 24, 1)} días terrestres` : `${fmt(dayHours, 1)} horas`}
            comparison={
              planet.rotationPeriod < 0
                ? "Rotación retrógrada (gira al revés)"
                : dayHours > 24
                  ? "Más largo que un día terrestre (24h)"
                  : "Más corto que un día terrestre"
            }
            tooltip={tooltipExplanations["Día (Rotación)"]}
            barValue={dayHours > 48 ? 0.4 : dayHours / 24}
            color={planet.color}
          />
          {expertMode && (
            <StatCard
              icon={Compass}
              label="Inclinación Axial"
              value={`${planet.axialTilt}°`}
              comparison={
                planet.axialTilt > 90
                  ? "¡Casi de lado! Rotación retrógrada"
                  : planet.axialTilt > 45
                    ? "Muy inclinado"
                    : planet.id === "earth"
                      ? "23.44° (estaciones)"
                      : "Inclinación moderada"
              }
              tooltip={tooltipExplanations["Inclinación Axial"]}
              barValue={0}
              color={planet.color}
            />
          )}
        </Section>

        {/* CLIMA Y ATMÓSFERA */}
        <Section icon="🌡️" title="CLIMA Y ATMÓSFERA">
          <StatCard
            icon={Thermometer}
            label="Temperatura Media"
            value={
              <span className={cn(tempColor(tempMean))}>
                {tempIcon(tempMean)} {tempMean}°C
              </span>
            }
            comparison={
              tempMean > 100
                ? "Suficiente para derretir plomo (327°C)"
                : tempMean > 50
                  ? "Más caliente que un horno"
                  : tempMean < -150
                    ? "Más frío que el hielo seco"
                    : tempMean < -50
                      ? "Extremadamente frío"
                      : planet.id === "earth"
                        ? "Temperatura ideal para la vida"
                        : "Temperatura moderada"
            }
            tooltip={tooltipExplanations["Temperatura Media"]}
          />
          {expertMode && (
            <>
              <StatCard
                icon={Thermometer}
                label="Temperatura Mínima"
                value={<span className={cn(tempColor(tempMin))}>{tempMin}°C</span>}
                comparison={tempMin < -150 ? "Más frío que la superficie de Plutón" : "Temperatura mínima"}
                tooltip={tooltipExplanations["Temperatura Mínima"]}
              />
              <StatCard
                icon={Thermometer}
                label="Temperatura Máxima"
                value={<span className={cn(tempColor(tempMax))}>{tempMax}°C</span>}
                comparison={tempMax > 400 ? "¡Suficiente para derretir plomo!" : "Temperatura máxima"}
                tooltip={tooltipExplanations["Temperatura Máxima"]}
              />
            </>
          )}
          {planet.atmosphericComposition && (
            <StatCard
              icon={Wind}
              label="Composición Atmosférica"
              value={planet.atmosphericComposition}
              tooltip={tooltipExplanations["Composición Atmosférica"]}
            />
          )}
          {planet.atmosphericPressure && (
            <StatCard
              icon={Gauge}
              label="Presión Atmosférica"
              value={planet.atmosphericPressure}
              comparison={
                planet.id === "earth"
                  ? "Presión normal al nivel del mar"
                  : planet.atmosphericPressure.includes("92")
                    ? "¡92 veces la presión terrestre!"
                    : planet.atmosphericPressure.includes("0.006")
                      ? "Menos del 1% de la presión terrestre"
                      : planet.atmosphericPressure.includes("10⁻¹⁵")
                        ? "Prácticamente vacío"
                        : undefined
              }
              tooltip={tooltipExplanations["Presión Atmosférica"]}
            />
          )}
          {expertMode && planet.albedo && (
            <StatCard
              icon={Eye}
              label="Albedo (Reflectividad)"
              value={`${planet.albedo.toFixed(2)}`}
              comparison={
                planet.albedo > 0.7
                  ? "Muy brillante (refleja mucha luz)"
                  : planet.albedo < 0.15
                    ? "Muy oscuro (absorbe casi toda la luz)"
                    : "Reflectividad moderada"
              }
              tooltip={tooltipExplanations["Albedo"]}
              barValue={planet.albedo}
              color={planet.color}
            />
          )}
          {expertMode && planet.apparentMagnitude && (
            <StatCard
              icon={Eye}
              label="Magnitud Aparente"
              value={planet.apparentMagnitude}
              comparison={
                planet.apparentMagnitude.includes("-4")
                  ? "Muy brillante, visible incluso de día"
                  : planet.apparentMagnitude.includes("7")
                    ? "Requiere telescopio para verlo"
                    : "Brillo moderado"
              }
              tooltip={tooltipExplanations["Magnitud Aparente"]}
            />
          )}
        </Section>

        {/* SATÉLITES */}
        <Section icon="🛰️" title="SATÉLITES">
          <StatCard
            icon={Moon}
            label="Número de Lunas"
            value={`${planet.moons} ${planet.moons === 1 ? "luna" : "lunas"}`}
            comparison={
              planet.moons === 0
                ? "Sin satélites naturales"
                : planet.moons === 1
                  ? "1 satélite natural"
                  : planet.moons > 50
                    ? "¡Muchas lunas!"
                    : `${planet.moons} satélites conocidos`
            }
            tooltip={tooltipExplanations["Número de Lunas"]}
            barValue={planet.moons > 50 ? 0.5 : planet.moons / EARTH.moons}
            color={planet.color}
          />
          {planet.satellites && planet.satellites.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {planet.satellites.map((s) => (
                <span
                  key={s.name}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-default"
                >
                  🌙 {s.name}
                </span>
              ))}
            </div>
          )}
        </Section>

        {/* Exploración (expert only) */}
        {expertMode && planet.exploration && (
          <Section icon="🔬" title="EXPLORACIÓN">
            <StatCard
              icon={Telescope}
              label="Misiones Visitantes"
              value={planet.exploration}
              tooltip={tooltipExplanations["Exploración"]}
            />
            {planet.composition && (
              <StatCard
                icon={Layers}
                label="Composición Interna"
                value={planet.composition}
                tooltip={tooltipExplanations["Composición"]}
              />
            )}
          </Section>
        )}

        {/* Datos curiosos mejorados */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="size-4 text-solar" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/80">Datos Curiosos</h3>
          </div>
          <div className="border-t border-white/5 pt-3 space-y-2">
            {factCards[planet.id]?.map((fact, i) => (
              <FactCard key={i} {...fact} />
            )) || planet.facts.map((f) => (
              <FactCard key={f} icon="💡" title="Dato curioso" description={f} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="text-[10px] text-muted-foreground/50 text-center font-mono-data">
            {planet.name} · {planet.nameEn} · Datos actualizados 2026
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

const factCards: Record<string, { icon: string; title: string; description: string }[]> = {
  mercury: [
    { icon: "⏱️", title: "Año muy corto", description: "Un año en Mercurio dura solo 88 días terrestres. ¡Cumplirías 4 años en la Tierra por cada año mercuriano!" },
    { icon: "🌡️", title: "Temperaturas extremas", description: "Puede pasar de -173°C de noche a 427°C de día. El mayor contraste térmico del sistema solar." },
    { icon: "🪨", title: "Exósfera tenue", description: "No tiene atmósfera real, solo una exósfera de átomos desprendidos de su superficie por el viento solar." },
  ],
  venus: [
    { icon: "🔥", title: "El planeta más caliente", description: "Con 462°C, es más caliente que Mercurio a pesar de estar el doble de lejos del Sol." },
    { icon: "🔄", title: "Rotación retrógrada", description: "Gira en dirección opuesta a la mayoría de planetas (de este a oeste). Allí el Sol sale por el oeste." },
    { icon: "💨", title: "Atmósfera densa", description: "96% dióxido de carbono con presión 92 veces mayor que la Tierra. ¡El efecto invernadero más extremo!" },
  ],
  earth: [
    { icon: "🌊", title: "El planeta azul", description: "71% de su superficie está cubierta por agua líquida. El único lugar conocido con vida en el universo." },
    { icon: "🛡️", title: "Campo magnético protector", description: "El núcleo de hierro fundido genera un campo magnético que nos protege del viento solar y los rayos cósmicos." },
    { icon: "🌱", title: "Atmósfera única", description: "21% oxígeno, 78% nitrógeno. Esta combinación permite la respiración de los seres vivos." },
  ],
  mars: [
    { icon: "🏔️", title: "La montaña más alta", description: "Olympus Mons tiene 22 km de altura, casi 3 veces el Monte Everest. ¡Es el volcán más grande del sistema solar!" },
    { icon: "🕳️", title: "El cañón más grande", description: "Valles Marineris se extiende por 4,000 km, casi el ancho de Estados Unidos." },
    { icon: "🧊", title: "Casquetes polares", description: "Tiene casquetes de hielo de agua y CO₂ congelado que cambian de tamaño con las estaciones." },
  ],
  jupiter: [
    { icon: "🌀", title: "La Gran Mancha Roja", description: "Una tormenta anticiclónica más grande que la Tierra que lleva activa más de 350 años." },
    { icon: "⚖️", title: "El gigante del sistema", description: "Tiene más masa que todos los demás planetas juntos (2.5× la masa combinada de todos ellos)." },
    { icon: "⏰", title: "El día más corto", description: "Gira tan rápido que un día dura solo 9.9 horas, a pesar de ser el planeta más grande." },
  ],
  saturn: [
    { icon: "💧", title: "Menos denso que el agua", description: "Su densidad es 0.69 g/cm³, menor que la del agua (1 g/cm³). ¡Flotaría en una piscina gigante!" },
    { icon: "💍", title: "Anillos espectaculares", description: "Compuestos de hielo y roca, se extienden hasta 282,000 km pero tienen solo 10 metros de grosor." },
    { icon: "🌑", title: "Titán, una luna especial", description: "Su luna Titán tiene atmósfera densa y lagos de metano líquido. Es candidata para buscar vida." },
  ],
  uranus: [
    { icon: "🌀", title: "Rotación de lado", description: "Su eje está inclinado 98°, prácticamente rodando mientras orbita. Es el único planeta que orbita 'de costado'." },
    { icon: "💎", title: "Gigante de hielo", description: "Su interior contiene agua, metano y amoníaco en forma de hielo a altísima presión." },
    { icon: "🧪", title: "Atmósfera de metano", description: "El metano en su atmósfera absorbe la luz roja y refleja la azul, dándole su característico color turquesa." },
  ],
  neptune: [
    { icon: "💨", title: "Los vientos más rápidos", description: "Vientos de hasta 2,100 km/h, los más rápidos del sistema solar. ¡Casi 3× la velocidad de un huracán categoría 5!" },
    { icon: "🔵", title: "El planeta más lejano", description: "Está a 4,500 millones de km del Sol. La luz solar tarda más de 4 horas en llegar hasta él." },
    { icon: "🔭", title: "Descubrimiento matemático", description: "Fue el primer planeta descubierto mediante cálculos matemáticos antes de ser observado directamente (1846)." },
  ],
  moon: [
    { icon: "👣", title: "Visitada por humanos", description: "La Luna es el único cuerpo celeste fuera de la Tierra donde seres humanos han caminado. 12 astronautas del programa Apollo (11-17) pisaron su superficie entre 1969 y 1972." },
    { icon: "📏", title: "Se aleja cada año", description: "La Luna se aleja de la Tierra aproximadamente 3.8 cm por año. Dentro de miles de millones de años, dejará de verse un eclipse solar total desde la Tierra." },
    { icon: "🌑", title: "Siempre la misma cara", description: "La Luna tarda 27.3 días en orbitar la Tierra y también 27.3 días en girar sobre sí misma, por eso siempre vemos la misma cara. El lado oscuro no es 'oscuro', simplemente nunca mira hacia nosotros." },
  ],
  ceres: [
    { icon: "🥇", title: "El más grande del cinturón", description: "Ceres contiene aproximadamente un tercio de la masa total del cinturón de asteroides entre Marte y Júpiter." },
    { icon: "💧", title: "Mundo oceánico", description: "Se cree que Ceres tiene un océano subsuperficial de agua líquida, y en su superficie hay criovolcanes que expulsan hielo." },
    { icon: "⚪", title: "Puntos brillantes", description: "La sonda Dawn descubrió misteriosos puntos blancos brillantes en el cráter Occator, compuestos de carbonato de sodio." },
  ],
};

function EclipseInfoPanel() {
  const { setSelectedPlanet } = useSimStore();
  return (
    <TooltipProvider delayDuration={0}>
      <div className="modal-bg rounded-xl p-4 sm:p-5 w-full max-w-full md:max-w-[28rem] max-h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden scrollbar-invisible animate-slide-in-right relative">
        {/* Close button */}
        <button onClick={() => setSelectedPlanet(null)} className="btn-close-modal" aria-label="Cerrar">
          <X />
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-full ring-2 ring-solar/30 shrink-0 flex items-center justify-center text-3xl bg-gradient-to-br from-solar/20 to-black">
              🌑
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight">Eclipse Solar</h2>
              <div className="text-xs text-muted-foreground">Solar Eclipse</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-foreground/80 leading-relaxed mb-5 italic border-l-2 border-solar/40 pl-3">
          Un eclipse solar ocurre cuando la Luna se interpone entre la Tierra y el Sol, bloqueando total o parcialmente la luz solar. Desde la Tierra, el Sol parece oscurecerse durante unos minutos mientras la Luna cubre su disco.
        </p>

        {/* INFO */}
        <Section icon="🌑" title="TIPOS DE ECLIPSE SOLAR">
          <FactCard icon="⚫" title="Total" description="La Luna cubre completamente el Sol. Solo se ve la corona solar. Ocurre cuando el tamaño aparente de la Luna es mayor que el del Sol." />
          <FactCard icon="◐" title="Parcial" description="La Luna solo cubre una parte del Sol. Se ve como un 'mordisco' en el disco solar." />
          <FactCard icon="⭕" title="Anular" description="La Luna está más lejos de la Tierra y no cubre todo el Sol, dejando un anillo de luz visible ('anillo de fuego')." />
          <FactCard icon="🌅" title="Híbrido" description="Un eclipse que cambia de total a anular a lo largo de su trayectoria. Es el tipo más raro." />
        </Section>

        <Section icon="🔬" title="DATOS CURIOSOS">
          <FactCard icon="🕐" title="Duración máxima" description="Un eclipse solar total puede durar hasta 7 minutos y 32 segundos en su punto máximo. La mayoría duran entre 2 y 4 minutos." />
          <FactCard icon="🌏" title="Trayectoria estrecha" description="La sombra de la Luna proyecta un camino de totalidad de solo unos 150-270 km de ancho. Fuera de esa franja, solo se ve un eclipse parcial." />
          <FactCard icon="📅" title="Frecuencia" description="Ocurren entre 2 y 5 eclipses solares al año en todo el mundo, pero un lugar específico solo ve un eclipse total cada ~375 años en promedio." />
          <FactCard icon="🛡️" title="Seguridad" description="Nunca mires directamente al Sol sin protección certificada. Usa gafas especiales para eclipses con filtro ISO 12312-2." />
        </Section>

        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="text-[10px] text-muted-foreground/50 text-center font-mono-data">
            Eclipse Solar · Simulación en vivo · 2026
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
