export interface Bio {
  id: string;
  name: string;
  type: "astronaut" | "scientist";
  nationality: string;
  birth: number;
  death?: number;
  initials: string;
  color: string;
  image?: string;
  achievements: string[];
  quote?: string;
  bio: string;
}

const c = ["#FDB813", "#4A90D9", "#C1440E", "#73C2D0", "#E6C87A", "#8B5CF6", "#10B981"];

export const BIOS: Bio[] = [
  { id: "gagarin", name: "Yuri Gagarin", type: "astronaut", nationality: "URSS", birth: 1934, death: 1968, initials: "YG", color: c[1],
    image: "/images/biographies/Yuri gagarin jpg.jpg",
    achievements: ["Primer humano en el espacio (12 abril 1961)", "Vostok 1, 108 minutos", "Héroe de la Unión Soviética"],
    quote: "Veo la Tierra. ¡Es tan hermosa!", bio: "Cosmonauta soviético que se convirtió en el primer ser humano en viajar al espacio exterior y orbitar la Tierra." },
  { id: "armstrong", name: "Neil Armstrong", type: "astronaut", nationality: "USA", birth: 1930, death: 2012, initials: "NA", color: c[0],
    image: "/images/biographies/neil.jpg",
    achievements: ["Primer hombre en la Luna (20 julio 1969)", "Comandante del Apolo 11", "Piloto de pruebas de X-15"],
    quote: "Un pequeño paso para el hombre, un gran salto para la humanidad.", bio: "Astronauta estadounidense, primer ser humano en pisar la Luna." },
  { id: "tereshkova", name: "Valentina Tereshkova", type: "astronaut", nationality: "URSS", birth: 1937, initials: "VT", color: c[5],
    image: "/images/biographies/tereshkova.jpg",
    achievements: ["Primera mujer en el espacio (16 junio 1963)", "Vostok 6, 70 horas en órbita", "48 vueltas a la Tierra"],
    bio: "Cosmonauta soviética, primera mujer en viajar al espacio." },
  { id: "aldrin", name: "Buzz Aldrin", type: "astronaut", nationality: "USA", birth: 1930, initials: "BA", color: c[1],
    image: "/images/biographies/aldrin.jpg",
    achievements: ["Segundo hombre en la Luna", "Apolo 11", "Doctor en Astronáutica del MIT"],
    quote: "Magnífica desolación.", bio: "Astronauta y doctor en astronáutica, segundo ser humano en pisar la Luna." },
  { id: "ride", name: "Sally Ride", type: "astronaut", nationality: "USA", birth: 1951, death: 2012, initials: "SR", color: c[3],
    image: "/images/biographies/ride.jpg",
    achievements: ["Primera mujer estadounidense en el espacio (1983)", "STS-7 Challenger", "Física y educadora"],
    bio: "Astronauta y física estadounidense." },
  { id: "hadfield", name: "Chris Hadfield", type: "astronaut", nationality: "Canadá", birth: 1959, initials: "CH", color: c[1],
    image: "/images/biographies/hadfield.jpg",
    achievements: ["Comandante de la ISS", "Divulgador científico viral", "Tres misiones espaciales"],
    bio: "Astronauta canadiense conocido por sus videos educativos desde la ISS." },
  { id: "jemison", name: "Mae Jemison", type: "astronaut", nationality: "USA", birth: 1956, initials: "MJ", color: c[2],
    image: "/images/biographies/jemison.jpg",
    achievements: ["Primera mujer afroamericana en el espacio (1992)", "STS-47 Endeavour", "Médica e ingeniera"],
    bio: "Médica, ingeniera y astronauta de la NASA." },
  { id: "leonov", name: "Alexei Leonov", type: "astronaut", nationality: "URSS", birth: 1934, death: 2019, initials: "AL", color: c[1],
    image: "/images/biographies/leonov.jpg",
    achievements: ["Primer paseo espacial (1965)", "12 minutos EVA", "Misión Apolo-Soyuz 1975"],
    bio: "Cosmonauta soviético, primer humano en realizar una actividad extravehicular." },
  { id: "johnson", name: "Katherine Johnson", type: "scientist", nationality: "USA", birth: 1918, death: 2020, initials: "KJ", color: c[2],
    image: "/images/biographies/johnson.jpg",
    achievements: ["Matemática de la NASA", "Cálculos del Apolo 11", "Medalla Presidencial de la Libertad"],
    bio: "Matemática que calculó las trayectorias para misiones tripuladas de la NASA." },
  { id: "newton", name: "Isaac Newton", type: "scientist", nationality: "Inglaterra", birth: 1643, death: 1727, initials: "IN", color: c[0],
    image: "/images/biographies/newton.jpg",
    achievements: ["Leyes del movimiento y gravitación universal", "Principia Mathematica (1687)", "Cálculo infinitesimal"],
    bio: "Físico y matemático inglés, padre de la mecánica clásica." },
  { id: "galileo", name: "Galileo Galilei", type: "scientist", nationality: "Italia", birth: 1564, death: 1642, initials: "GG", color: c[4],
    image: "/images/biographies/galileo.jpg",
    achievements: ["Mejoró el telescopio", "Descubrió las lunas de Júpiter (1610)", "Defensor del heliocentrismo"],
    quote: "Y sin embargo, se mueve.", bio: "Astrónomo, físico e ingeniero italiano, considerado padre de la ciencia moderna." },
  { id: "kepler", name: "Johannes Kepler", type: "scientist", nationality: "Alemania", birth: 1571, death: 1630, initials: "JK", color: c[3],
    image: "/images/biographies/kepler.jpg",
    achievements: ["Tres leyes del movimiento planetario", "Astronomia Nova (1609)", "Estableció órbitas elípticas"],
    bio: "Astrónomo y matemático alemán, descubrió las leyes de las órbitas planetarias." },
  { id: "einstein", name: "Albert Einstein", type: "scientist", nationality: "Alemania", birth: 1879, death: 1955, initials: "AE", color: c[1],
    image: "/images/biographies/einstein.jpg",
    achievements: ["Teoría de la Relatividad", "E = mc²", "Premio Nobel de Física 1921"],
    quote: "La imaginación es más importante que el conocimiento.", bio: "Físico teórico alemán, desarrolló la teoría de la relatividad." },
  { id: "sagan", name: "Carl Sagan", type: "scientist", nationality: "USA", birth: 1934, death: 1996, initials: "CS", color: c[5],
    image: "/images/biographies/sagan.jpg",
    achievements: ["Serie Cosmos", "Voyager Golden Record", "Pionero de la exobiología"],
    quote: "Estamos hechos de polvo de estrellas.", bio: "Astrónomo y divulgador científico estadounidense." },
  { id: "hawking", name: "Stephen Hawking", type: "scientist", nationality: "Reino Unido", birth: 1942, death: 2018, initials: "SH", color: c[3],
    image: "/images/biographies/hawking.jpg",
    achievements: ["Radiación de Hawking", "Breve Historia del Tiempo", "Teorema de la singularidad"],
    bio: "Físico teórico, cosmólogo y autor británico, referente en agujeros negros." },
  { id: "rubin", name: "Vera Rubin", type: "scientist", nationality: "USA", birth: 1928, death: 2016, initials: "VR", color: c[5],
    image: "/images/biographies/rubin.jpg",
    achievements: ["Evidencia de materia oscura", "Curvas de rotación galáctica", "Medalla Nacional de Ciencia"],
    bio: "Astrónoma estadounidense, pionera en el estudio de la materia oscura." },
  { id: "curie", name: "Marie Curie", type: "scientist", nationality: "Polonia/Francia", birth: 1867, death: 1934, initials: "MC", color: c[2],
    image: "/images/biographies/curie.jpg",
    achievements: ["Descubrimiento del polonio y radio", "Dos Premios Nobel (Física y Química)", "Pionera de la radiactividad"],
    bio: "Física y química, primera persona en ganar dos premios Nobel en distintas disciplinas." },
  { id: "hubble", name: "Edwin Hubble", type: "scientist", nationality: "USA", birth: 1889, death: 1953, initials: "EH", color: c[1],
    image: "/images/biographies/hubble.jpg",
    achievements: ["Demostró la expansión del Universo", "Ley de Hubble", "Galaxias más allá de la Vía Láctea"],
    bio: "Astrónomo estadounidense, transformó nuestra comprensión del cosmos." },
];
