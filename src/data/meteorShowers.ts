export interface MeteorShower {
  id: string;
  name: string;
  peak: string;
  thz: number;
  radiant: string;
  velocity: number;
  origin: string;
  color: string;
  description: string;
}

export const SHOWERS: MeteorShower[] = [
  { id: "quadrantids", name: "Cuadrántidas", peak: "3-4 enero", thz: 120, radiant: "Bootes", velocity: 41, origin: "Asteroide 2003 EH1", color: "#4A90D9",
    description: "Una de las lluvias más intensas pero con pico muy corto (6 horas)." },
  { id: "perseids", name: "Perseidas", peak: "12-13 agosto", thz: 100, radiant: "Perseo", velocity: 59, origin: "Cometa Swift-Tuttle", color: "#FDB813",
    description: "La lluvia más popular del año. Visible en cielo templado del hemisferio norte." },
  { id: "leonids", name: "Leónidas", peak: "17-18 noviembre", thz: 15, radiant: "Leo", velocity: 71, origin: "Cometa Tempel-Tuttle", color: "#C1440E",
    description: "Cada 33 años produce tormentas espectaculares con miles de meteoros por hora." },
  { id: "geminids", name: "Gemínidas", peak: "13-14 diciembre", thz: 120, radiant: "Géminis", velocity: 35, origin: "Asteroide 3200 Phaethon", color: "#73C2D0",
    description: "Meteoros multicolores, lluvia de origen asteroidal (caso único)." },
  { id: "orionids", name: "Oriónidas", peak: "20-22 octubre", thz: 20, radiant: "Orión", velocity: 66, origin: "Cometa Halley", color: "#E6C87A",
    description: "Restos del cometa Halley. Meteoros rápidos y a menudo brillantes." },
];
