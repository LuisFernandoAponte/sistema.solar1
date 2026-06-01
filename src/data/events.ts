export interface SpaceEvent {
  id: string;
  name: string;
  category: "comet" | "asteroid" | "impact";
  date: string;
  status: "past" | "future" | "recurring";
  size: string;
  details: { label: string; value: string }[];
  description: string;
  danger?: "none" | "low" | "moderate" | "high" | "extinction";
}

export const EVENTS: SpaceEvent[] = [
  { id: "halley", name: "Cometa Halley", category: "comet", date: "1986 / 2061", status: "recurring", size: "15 × 8 km",
    details: [
      { label: "Período", value: "75-76 años" }, { label: "Último paso", value: "1986" },
      { label: "Próximo paso", value: "2061" }, { label: "Velocidad", value: "70.6 km/s" },
    ], description: "Cometa periódico más famoso, visible desde la Tierra cada 75-76 años. Documentado desde 240 a.C." },
  { id: "halebopp", name: "Cometa Hale-Bopp", category: "comet", date: "1997", status: "past", size: "60 km núcleo",
    details: [
      { label: "Descubierto", value: "1995" }, { label: "Visible", value: "Marzo-Abril 1997" },
      { label: "Período", value: "2,533 años" }, { label: "Brillo", value: "Visible 18 meses" },
    ], description: "Uno de los cometas más brillantes del siglo XX, visible a simple vista durante 18 meses." },
  { id: "neowise", name: "Cometa NEOWISE", category: "comet", date: "2020", status: "past", size: "5 km núcleo",
    details: [
      { label: "Descubierto", value: "Marzo 2020" }, { label: "Visible", value: "Julio 2020" },
      { label: "Período", value: "6,800 años" }, { label: "Cola", value: "10+ grados" },
    ], description: "Cometa brillante visible en 2020, mejor vista desde el hemisferio norte." },
  { id: "apophis", name: "Asteroide Apophis", category: "asteroid", date: "13 abril 2029", status: "future", size: "370 m",
    danger: "low",
    details: [
      { label: "Aproximación", value: "31,000 km" }, { label: "Velocidad", value: "5.87 km/s" },
      { label: "Probabilidad 2029", value: "0%" }, { label: "Escala Torino", value: "0" },
    ], description: "Pasará más cerca que los satélites geoestacionarios el 13 de abril de 2029. Sin riesgo de impacto." },
  { id: "bennu", name: "Asteroide Bennu", category: "asteroid", date: "2182", status: "future", size: "490 m",
    danger: "low",
    details: [
      { label: "Probabilidad impacto", value: "1 en 2,700" }, { label: "Año posible", value: "2182" },
      { label: "Misión", value: "OSIRIS-REx (muestras 2023)" }, { label: "Escala Torino", value: "1" },
    ], description: "Asteroide cercano a la Tierra. OSIRIS-REx trajo muestras a la Tierra en 2023." },
  { id: "1950da", name: "Asteroide 1950 DA", category: "asteroid", date: "2880", status: "future", size: "1.3 km",
    danger: "moderate",
    details: [
      { label: "Probabilidad", value: "1 en 8,300" }, { label: "Año", value: "16 marzo 2880" },
      { label: "Energía potencial", value: "~75,000 megatones" },
    ], description: "Asteroide con la mayor probabilidad de impacto conocida, aunque muy lejana en el tiempo." },
  { id: "tunguska", name: "Evento de Tunguska", category: "impact", date: "30 junio 1908", status: "past", size: "50-80 m",
    danger: "high",
    details: [
      { label: "Ubicación", value: "Siberia, Rusia" }, { label: "Energía", value: "10-15 megatones TNT" },
      { label: "Área destruida", value: "2,150 km²" }, { label: "Árboles caídos", value: "80 millones" },
    ], description: "Mayor evento de impacto de la historia reciente. Explosión aérea a 5-10 km de altura." },
  { id: "chelyabinsk", name: "Meteorito Chelyabinsk", category: "impact", date: "15 febrero 2013", status: "past", size: "20 m",
    danger: "moderate",
    details: [
      { label: "Ubicación", value: "Chelyabinsk, Rusia" }, { label: "Energía", value: "500 kilotones TNT" },
      { label: "Heridos", value: "1,500" }, { label: "Velocidad", value: "19 km/s" },
    ], description: "Bólido no detectado por entrar por el lado diurno. Rompió ventanas en toda la región." },
  { id: "chicxulub", name: "Cráter Chicxulub", category: "impact", date: "Hace 66 M años", status: "past", size: "10-15 km",
    danger: "extinction",
    details: [
      { label: "Ubicación", value: "Yucatán, México" }, { label: "Energía", value: "100 M megatones" },
      { label: "Cráter", value: "180 km diámetro" }, { label: "Extinción", value: "75% de especies" },
    ], description: "Impacto que terminó con los dinosaurios no avianos y causó la extinción del Cretácico-Paleógeno." },
];
