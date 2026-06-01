export interface PlanetData {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  emissive?: string;
  radius: number;
  realDiameter: number;
  distance: number;
  realDistance: number;
  au: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  temperature: { min: number; mean: number; max: number };
  mass: number;
  gravity: number;
  moons: number;
  axialTilt: number;
  hasRings?: boolean;
  description: string;
  facts: string[];
  satellites?: { name: string; radius: number; distance: number; color: string; period: number }[];
  density?: number;
  escapeVelocity?: number;
  albedo?: number;
  apparentMagnitude?: string;
  composition?: string;
  exploration?: string;
  atmosphericComposition?: string;
  atmosphericPressure?: string;
}

export const SUN: PlanetData = {
  id: "sun",
  name: "Sol",
  nameEn: "Sun",
  color: "#FDB813",
  emissive: "#F59E0B",
  radius: 4.5,
  realDiameter: 1392700,
  distance: 0,
  realDistance: 0,
  au: 0,
  orbitalPeriod: 0,
  rotationPeriod: 648,
  temperature: { min: 5500, mean: 5500, max: 15000000 },
  mass: 333000,
  gravity: 274,
  moons: 8,
  axialTilt: 7.25,
  density: 1.41,
  escapeVelocity: 617.6,
  albedo: 0.0,
  apparentMagnitude: "-26.74",
  composition: "73% Hidrógeno, 25% Helio, 2% Elementos más pesados",
  exploration: "Observado por: SOHO, Solar Dynamics Observatory, Parker Solar Probe, Solar Orbiter",
  atmosphericComposition: "73% H₂, 25% He, trazas de O, C, Fe",
  atmosphericPressure: "~250 mil millones de bar (núcleo)",
  description: "Estrella enana amarilla tipo G2V que contiene el 99.86% de la masa del Sistema Solar.",
  facts: [
    "Temperatura superficial: 5,500°C, núcleo: 15 millones °C",
    "Diámetro: 1,392,700 km (109 veces la Tierra)",
    "Se necesitarían 1.3 millones de Tierras para llenar el Sol",
  ],
};

export const MOON: PlanetData = {
  id: "moon",
  name: "Luna", nameEn: "Moon",
  color: "#C0C0C0",
  emissive: "#FFFFFF",
  radius: 0.22, realDiameter: 3474,
  distance: 18, realDistance: 149.6, au: 1,
  orbitalPeriod: 27.3, rotationPeriod: 655.7,
  temperature: { min: -233, mean: -20, max: 123 },
  mass: 0.0123, gravity: 1.62, moons: 0, axialTilt: 1.5424,
  density: 3.34, escapeVelocity: 2.38, albedo: 0.12, apparentMagnitude: "-12.74",
  composition: "Corteza de silicato, manto rocoso, pequeño núcleo de hierro",
  exploration: "Visitado por: Programa Apollo, Luna, Chang'e, Surveyor, Ranger, Lunar Orbiter",
  atmosphericComposition: "Exósfera tenue (He, Ar, Na, K, H)",
  atmosphericPressure: "10⁻¹⁴ bar",
  description: "El único satélite natural de la Tierra y el quinto más grande del sistema solar. Es el único cuerpo celeste fuera de la Tierra que ha sido visitado por seres humanos.",
  facts: [
    "Es el único cuerpo celeste al que los humanos han viajado y caminado sobre su superficie",
    "La Luna se está alejando de la Tierra unos 3.8 cm cada año",
    "Una misma cara de la Luna siempre apunta hacia la Tierra (rotación sincrónica)",
  ],
};

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercurio", nameEn: "Mercury",
    color: "#8C8C8C",
    radius: 0.45, realDiameter: 4879,
    distance: 9, realDistance: 57.9, au: 0.39,
    orbitalPeriod: 88, rotationPeriod: 1408,
    temperature: { min: -173, mean: 167, max: 427 },
    mass: 0.055, gravity: 3.7, moons: 0, axialTilt: 0.034,
    density: 5.43, escapeVelocity: 4.25, albedo: 0.11, apparentMagnitude: "-0.4 a 5.5",
    composition: "Núcleo de hierro, manto de silicato",
    exploration: "Visitado por: Mariner 10, MESSENGER, BepiColombo",
    atmosphericComposition: "Prácticamente inexistente (exósfera)",
    atmosphericPressure: "10⁻¹⁵ bar",
    description: "El planeta más pequeño y cercano al Sol. Sin atmósfera, sufre temperaturas extremas.",
    facts: ["Un año dura 88 días", "Un día solar dura 176 días terrestres", "Tiene una débil exósfera"],
  },
  {
    id: "venus",
    name: "Venus", nameEn: "Venus",
    color: "#E6C87A",
    radius: 0.75, realDiameter: 12104,
    distance: 13, realDistance: 108.2, au: 0.72,
    orbitalPeriod: 225, rotationPeriod: -5832,
    temperature: { min: 462, mean: 462, max: 482 },
    mass: 0.815, gravity: 8.87, moons: 0, axialTilt: 177.4,
    density: 5.24, escapeVelocity: 10.36, albedo: 0.75, apparentMagnitude: "-4.6",
    composition: "Núcleo de hierro, manto rocoso",
    exploration: "Visitado por: Venera, Magellan, Venus Express, Akatsuki",
    atmosphericComposition: "96% CO₂, 3.5% Nitrógeno",
    atmosphericPressure: "92 bar",
    description: "El planeta más caliente del sistema solar debido a un efecto invernadero descontrolado.",
    facts: ["Rotación retrógrada", "Atmósfera 96% CO₂", "Presión 92x la terrestre"],
  },
  {
    id: "earth",
    name: "Tierra", nameEn: "Earth",
    color: "#4A90D9",
    radius: 0.8, realDiameter: 12742,
    distance: 18, realDistance: 149.6, au: 1,
    orbitalPeriod: 365.25, rotationPeriod: 24,
    temperature: { min: -89, mean: 15, max: 58 },
    mass: 1, gravity: 9.807, moons: 1, axialTilt: 23.44,
    density: 5.51, escapeVelocity: 11.19, albedo: 0.31, apparentMagnitude: "-2.5 a -3.0",
    composition: "Núcleo de hierro-níquel, manto de silicato, corteza",
    exploration: "N/A (nuestro hogar)",
    atmosphericComposition: "78% Nitrógeno, 21% Oxígeno, 1% Argón",
    atmosphericPressure: "1.013 bar",
    description: "El único planeta conocido con vida. Posee agua líquida, atmósfera respirable y un campo magnético protector.",
    facts: ["71% de la superficie es agua", "Atmósfera con 21% oxígeno", "Edad: 4.54 mil millones de años"],
    satellites: [{ name: "Luna", radius: 0.22, distance: 1.6, color: "#C0C0C0", period: 27.3 }],
  },
  {
    id: "mars",
    name: "Marte", nameEn: "Mars",
    color: "#C1440E",
    radius: 0.55, realDiameter: 6779,
    distance: 24, realDistance: 227.9, au: 1.52,
    orbitalPeriod: 687, rotationPeriod: 24.6,
    temperature: { min: -143, mean: -63, max: 35 },
    mass: 0.107, gravity: 3.71, moons: 2, axialTilt: 25.19,
    density: 3.93, escapeVelocity: 5.03, albedo: 0.15, apparentMagnitude: "-2.9",
    composition: "Núcleo de hierro, manto rocoso",
    exploration: "Visitado por: Mariner, Viking, Pathfinder, Spirit, Opportunity, Curiosity, Perseverance, Ingenuity",
    atmosphericComposition: "95% CO₂, 2.7% Nitrógeno, 1.6% Argón",
    atmosphericPressure: "0.006 bar",
    description: "El planeta rojo. Alberga el volcán más grande del sistema solar (Olympus Mons) y el cañón Valles Marineris.",
    facts: ["Olympus Mons: 22 km de altura", "Casquetes polares de hielo", "Día marciano: 24h 37min"],
    satellites: [
      { name: "Fobos", radius: 0.08, distance: 0.9, color: "#7A6A5A", period: 0.32 },
      { name: "Deimos", radius: 0.05, distance: 1.4, color: "#8A7A6A", period: 1.26 },
    ],
  },
  {
    id: "jupiter",
    name: "Júpiter", nameEn: "Jupiter",
    color: "#C88B3A",
    radius: 2.2, realDiameter: 139820,
    distance: 36, realDistance: 778.5, au: 5.2,
    orbitalPeriod: 4333, rotationPeriod: 9.9,
    temperature: { min: -145, mean: -108, max: -108 },
    mass: 317.8, gravity: 24.79, moons: 95, axialTilt: 3.13,
    density: 1.33, escapeVelocity: 59.5, albedo: 0.52, apparentMagnitude: "-2.9",
    composition: "90% Hidrógeno, 10% Helio (gigante gaseoso)",
    exploration: "Visitado por: Pioneer, Voyager, Galileo, Juno, Cassini",
    atmosphericComposition: "90% H₂, 10% He",
    atmosphericPressure: ">1,000 bar (en el interior)",
    description: "El gigante gaseoso. Su Gran Mancha Roja es una tormenta que lleva activa más de 350 años.",
    facts: ["Más masa que todos los planetas juntos", "95 lunas conocidas", "Día más corto: 9.9 horas"],
    satellites: [
      { name: "Io", radius: 0.12, distance: 3.0, color: "#E8D070", period: 1.77 },
      { name: "Europa", radius: 0.11, distance: 3.6, color: "#D0B090", period: 3.55 },
      { name: "Ganímedes", radius: 0.17, distance: 4.4, color: "#A89070", period: 7.15 },
      { name: "Calisto", radius: 0.15, distance: 5.2, color: "#605040", period: 16.7 },
    ],
  },
  {
    id: "saturn",
    name: "Saturno", nameEn: "Saturn",
    color: "#EAD6B8",
    radius: 1.9, realDiameter: 116460,
    distance: 48, realDistance: 1434, au: 9.5,
    orbitalPeriod: 10759, rotationPeriod: 10.7,
    temperature: { min: -178, mean: -139, max: -139 },
    mass: 95.16, gravity: 10.44, moons: 146, axialTilt: 26.73, hasRings: true,
    density: 0.69, escapeVelocity: 35.5, albedo: 0.47, apparentMagnitude: "-0.2 a 1.6",
    composition: "96% Hidrógeno, 3% Helio (gigante gaseoso)",
    exploration: "Visitado por: Pioneer, Voyager, Cassini-Huygens",
    atmosphericComposition: "96% H₂, 3% He",
    atmosphericPressure: ">1,000 bar (en el interior)",
    description: "Famoso por su sistema de anillos compuesto principalmente de hielo y roca.",
    facts: ["Densidad menor que el agua", "Anillos descubiertos por Galileo", "Titán tiene atmósfera densa"],
    satellites: [
      { name: "Titán", radius: 0.14, distance: 3.5, color: "#D89050", period: 15.95 },
      { name: "Encélado", radius: 0.06, distance: 2.7, color: "#FFFFFF", period: 1.37 },
    ],
  },
  {
    id: "uranus",
    name: "Urano", nameEn: "Uranus",
    color: "#73C2D0",
    radius: 1.3, realDiameter: 50724,
    distance: 60, realDistance: 2871, au: 19.2,
    orbitalPeriod: 30687, rotationPeriod: -17.2,
    temperature: { min: -224, mean: -197, max: -197 },
    mass: 14.54, gravity: 8.87, moons: 27, axialTilt: 97.77, hasRings: true,
    density: 1.27, escapeVelocity: 21.3, albedo: 0.49, apparentMagnitude: "5.3",
    composition: "Agua, metano, amoníaco (gigante de hielo)",
    exploration: "Visitado por: Voyager 2",
    atmosphericComposition: "83% H₂, 15% He, 2% Metano",
    atmosphericPressure: ">1,000 bar (en el interior)",
    description: "El gigante de hielo que rota de lado, con un eje inclinado 98° respecto a su órbita.",
    facts: ["Rotación de lado", "Atmósfera con metano", "Anillos verticales"],
  },
  {
    id: "neptune",
    name: "Neptuno", nameEn: "Neptune",
    color: "#3F54BA",
    radius: 1.25, realDiameter: 49244,
    distance: 70, realDistance: 4495, au: 30.1,
    orbitalPeriod: 60190, rotationPeriod: 16.1,
    temperature: { min: -218, mean: -201, max: -201 },
    mass: 17.15, gravity: 11.15, moons: 14, axialTilt: 28.32,
    density: 1.64, escapeVelocity: 23.5, albedo: 0.41, apparentMagnitude: "7.7",
    composition: "Agua, metano, amoníaco (gigante de hielo)",
    exploration: "Visitado por: Voyager 2",
    atmosphericComposition: "80% H₂, 19% He, 1% Metano",
    atmosphericPressure: ">1,000 bar (en el interior)",
    description: "El planeta más lejano. Tiene los vientos más rápidos del sistema solar, hasta 2,100 km/h.",
    facts: ["Vientos de 2,100 km/h", "Gran Mancha Oscura", "Descubierto en 1846"],
  },
  {
    id: "ceres",
    name: "Ceres", nameEn: "Ceres",
    color: "#9C9C8C",
    radius: 0.25, realDiameter: 939,
    distance: 30, realDistance: 414, au: 2.77,
    orbitalPeriod: 1682, rotationPeriod: 9.07,
    temperature: { min: -143, mean: -105, max: -38 },
    mass: 0.00016, gravity: 0.27, moons: 0, axialTilt: 4,
    density: 2.09, escapeVelocity: 0.51, albedo: 0.09, apparentMagnitude: "6.7 a 9.3",
    composition: "Núcleo rocoso, manto de hielo de agua",
    exploration: "Visitado por: Dawn",
    description: "El planeta enano más cercano al Sol y el más grande del cinturón de asteroides.",
    facts: ["Es el único planeta enano en el cinturón de asteroides", "Contiene más agua dulce que la Tierra (en forma de hielo)", "Su nombre es la diosa romana de la agricultura"],
  },
];
