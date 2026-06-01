interface QA {
  keywords: string[];
  mustContain?: string[];
  cannotContain?: string[];
  answer: string;
}

const KB: QA[] = [
  // ══════════════════════════════════════════════════
  // ☀️  EL SOL
  // ══════════════════════════════════════════════════
  { keywords: ["sol", "estrella", "temperatura sol", "hablame del sol", "sol información", "que es el sol", "dime del sol"], answer: "El Sol es nuestra estrella, una enana amarilla de tipo G2 que está en el centro de todo. Sin ella, sencillamente no estaríamos aquí: su gravedad mantiene a los planetas en órbita y su energía hace posible la vida en la Tierra. ¿Sabías que contiene el 99.86% de toda la masa del Sistema Solar? El resto (planetas, lunas, asteroides...) solo somos el 0.14%." },
  { keywords: ["sol", "compuesto", "composición", "de que esta hecho", "hidrógeno", "helio"], answer: "El Sol es básicamente una gigantesca bola de gas ardiente! Está compuesto por hidrógeno (~74%) y helio (~24%), con solo un poquito de oxígeno, carbono, neón y hierro. En su núcleo ocurre la magia: la fusión nuclear convierte hidrógeno en helio, liberando la energía que vemos como luz y calor. Es como un reactor nuclear natural, pero a escala astronómica." },
  { keywords: ["sol", "temperatura", "cuantos grados", "caliente", "núcleo", "superficie"], answer: "En el núcleo del Sol alcanza unos 15 millones de °C, mientras que en la superficie (fotosfera) tiene aproximadamente 5,500 °C. La corona solar puede superar el millón de grados, un misterio que los científicos aún estudian." },
  { keywords: ["sol", "erupción", "erupcion solar", "llamarada", "tormenta solar", "afecta"], answer: "Una erupción solar es una explosión intensa de radiación causada por la liberación de energía magnética. Puede afectar satélites, comunicaciones y redes eléctricas, pero la atmósfera terrestre nos protege de sus efectos más dañinos." },
  { keywords: ["sol", "luz", "tarda", "cuanto tarda", "llegar a la tierra", "8 minutos"], answer: "La luz del Sol tarda aproximadamente 8 minutos y 20 segundos en llegar a la Tierra, ya que la luz viaja a 300,000 km/s y la Tierra está a unos 150 millones de km del Sol." },
  { keywords: ["sol", "mueve", "se mueve", "fijo", "órbita", "galaxia", "via lactea", "rotación"], answer: "Sí, el Sol se mueve. Orbita alrededor del centro de la Vía Láctea a unos 220 km/s, completando una vuelta cada 230 millones de años. También rota sobre su eje cada 27 días aproximadamente." },
  { keywords: ["sol", "agote", "morirá", "muerte", "gigante roja", "enana blanca", "futuro", "5 mil millones", "5,000 millones"], answer: "En unos 5,000 millones de años, el Sol agotará su hidrógeno, se expandirá como gigante roja (posiblemente tragando a Mercurio, Venus y la Tierra), y luego colapsará en una enana blanca que se enfriará lentamente." },
  { keywords: ["sol", "mirar", "ojos", "retina", "peligro", "ciego", "radiación", "filtro"], answer: "No podemos mirar directamente al Sol porque su radiación ultravioleta e infrarroja puede dañar irreversiblemente la retina, causando ceguera temporal o permanente. Siempre usa filtros solares certificados para observarlo." },
  { keywords: ["sol", "diámetro", "tamaño", "grande es el sol"], answer: "El Sol tiene un diámetro de 1,392,700 km, unas 109 veces el de la Tierra. Podrían caber 1.3 millones de Tierras dentro del Sol." },
  { keywords: ["sol", "muera", "morirá", "fin del sol", "muerte del sol"], answer: "En ~5,000 millones de años, el Sol agotará su hidrógeno, se expandirá como gigante roja (tragándose Mercurio y Venus) y terminará como enana blanca." },

  // ══════════════════════════════════════════════════
  // 🪐  LOS 8 PLANETAS — General
  // ══════════════════════════════════════════════════
  { keywords: ["planetas", "que son los planetas", "hablame de los planetas", "informacion planetas", "dime sobre los planetas"], cannotContain: ["sol", "mercurio", "venus", "tierra", "marte", "jupiter", "saturno", "urano", "neptuno", "luna", "eclipse", "agua", "aire", "tamaño", "grande", "pequeño", "caliente", "frío", "vida", "lunas", "gravedad", "día", "año", "órbita", "rocoso", "gaseoso", "cinturón", "cometa", "asteroide", "formación", "orden"], answer: "Los planetas son cuerpos celestes que orbitan alrededor del Sol. Hay 8 en nuestro Sistema Solar, divididos en rocosos (Mercurio, Venus, Tierra, Marte) y gigantes gaseosos o de hielo (Júpiter, Saturno, Urano, Neptuno). Cada uno es fascinante: hay enormes tormentas, anillos, lunas, volcanes... ¿Sobre cuál te gustaría saber más?" },
  { keywords: ["8 planetas", "orden", "orden de los planetas", "cuales son los planetas", "que son los planetas", "lista planetas", "mercurio venus tierra", "planetas en orden", "como se llaman los planetas"], answer: "Los 8 planetas del Sistema Solar en orden del más cercano al más lejano del Sol son: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno." },
  { keywords: ["plutón", "pluton", "planeta enano", "por que ya no", "reclasificado", "2006", "iau"], answer: "En 2006, la Unión Astronómica Internacional reclasificó a Plutón como 'planeta enano' porque no ha 'despejado su órbita' de otros objetos, uno de los tres criterios para ser considerado planeta." },
  { keywords: ["diferencia", "rocosos", "gaseosos", "rocoso gaseoso", "planetas rocosos", "gigantes"], answer: "Los planetas rocosos (Mercurio, Venus, Tierra, Marte) tienen superficie sólida de roca y metal. Los gaseosos (Júpiter, Saturno) y helados (Urano, Neptuno) están compuestos principalmente de gases y líquidos, sin superficie sólida definida." },
  { keywords: ["formación", "formaron", "como se formaron", "origen", "nube", "acreción"], answer: "Hace ~4,600 millones de años, una nube de gas y polvo colapsó por gravedad formando el Sol. El material restante giró en un disco donde las partículas se unieron por acreción, formando los planetas." },

  // ══════════════════════════════════════════════════
  // ☿  MERCURIO
  // ══════════════════════════════════════════════════
  { keywords: ["mercurio", "pequeño", "mercurio informacion", "hablame de mercurio", "dime de mercurio", "cuentame de mercurio", "planeta mercurio"], answer: "Mercurio es el planeta más pequeño del Sistema Solar con 4,879 km de diámetro. Su año dura 88 días terrestres y carece casi por completo de atmósfera. Las temperaturas oscilan entre -173°C de noche y 427°C de día — ¡el mayor contraste térmico del sistema solar!" },
  { keywords: ["mercurio", "temperatura", "extremas", "calor", "frio", "por que"], answer: "Mercurio tiene temperaturas tan extremas porque casi no tiene atmósfera para retener calor: de día alcanza 430°C y de noche baja a -180°C. Además, su rotación lenta y proximidad al Sol intensifican estos cambios." },
  { keywords: ["mercurio", "año", "orbita", "cuanto tarda", "88 dias"], answer: "Mercurio tarda 88 días terrestres en dar una vuelta al Sol (año mercuriano). Sin embargo, su día solar (de amanecer a amanecer) dura 176 días terrestres debido a su lenta rotación." },
  { keywords: ["mercurio", "lunas", "atmósfera", "exosfera", "tiene lunas"], answer: "Mercurio no tiene lunas. Posee una exosfera muy delgada compuesta de oxígeno, sodio, hidrógeno y potasio, pero es tan tenue que no se considera una atmósfera real." },
  { keywords: ["mercurio", "agua", "hielo", "mercurio tiene agua"], answer: "Mercurio tiene hielo de agua en sus cráteres polares permanentemente sombreados, a pesar de ser el planeta más cercano al Sol. ¡El hielo sobrevive porque esos cráteres nunca reciben luz solar!" },
  { keywords: ["mercurio", "día", "rotación", "cuanto dura"], answer: "Un día solar en Mercurio dura 176 días terrestres — el doble que su año (88 días). Esto se debe a su lenta rotación." },
  { keywords: ["mercurio", "atmósfera", "aire", "mercurio atmósfera"], answer: "Mercurio prácticamente no tiene atmósfera, solo una exósfera extremadamente delgada. Por eso las temperaturas varían tanto: sin aire que retenga el calor, de día hace 427°C y de noche -173°C." },
  { keywords: ["mercurio", "gravedad", "peso"], answer: "En Mercurio pesarías solo el 38% de tu peso en la Tierra. Una persona de 70 kg pesaría allí solo 26.5 kg." },

  // ══════════════════════════════════════════════════
  // ♀  VENUS
  // ══════════════════════════════════════════════════
  { keywords: ["venus", "caliente", "temperatura", "venus informacion", "hablame de venus", "dime de venus", "cuentame de venus", "planeta venus"], answer: "Venus es el planeta más caliente del Sistema Solar con 462°C de temperatura media, debido a su densa atmósfera de CO₂ y un efecto invernadero descontrolado. ¡Es más caliente que Mercurio aunque está el doble de lejos del Sol!" },
  { keywords: ["venus", "por que", "mas caliente", "mercurio", "efecto invernadero", "atmósfera", "co2"], answer: "Venus es el planeta más caliente (465°C) por su densa atmósfera de CO₂ que genera un efecto invernadero extremo, atrapando calor y elevando la temperatura superficial más que Mercurio, a pesar de estar más lejos del Sol." },
  { keywords: ["venus", "gemelo", "tierra", "parecido", "tamaño", "composición"], answer: "Venus es llamado el 'gemelo' de la Tierra porque tienen tamaño, masa y composición similares. Sin embargo, Venus tiene una atmósfera tóxica, presión 90 veces mayor y temperaturas infernales, lo que lo hace muy diferente en condiciones." },
  { keywords: ["venus", "ver", "visible", "sin telescopio", "estrella de la mañana", "estrella de la tarde"], answer: "Sí, Venus es el tercer objeto más brillante del cielo (tras el Sol y la Luna). Se ve al amanecer o atardecer, por lo que se le llama 'Estrella de la Mañana' o 'Estrella de la Tarde'." },
  { keywords: ["venus", "agua", "océano", "tuvo agua"], answer: "Venus pudo tener océanos de agua en el pasado, pero el efecto invernadero descontrolado evaporó toda el agua hace unos 700 millones de años." },
  { keywords: ["venus", "oxígeno", "atmósfera", "respirar", "venus respirar"], answer: "No, la atmósfera de Venus es 96% CO₂ con solo 3.5% de nitrógeno. No se puede respirar, la presión es aplastante (92 veces la terrestre) y la temperatura derretiría plomo." },
  { keywords: ["venus", "rotación", "retrógrado", "día", "venus gira"], answer: "Venus rota en sentido contrario a la mayoría de planetas (rotación retrógrada). Un día venusino dura 243 días terrestres, más que su año (225 días). Allí el Sol sale por el oeste." },
  { keywords: ["venus", "tamaño", "parecido", "gemelo"], answer: "Venus es llamado el 'gemelo de la Tierra' porque tiene un tamaño y masa similares (12,104 km de diámetro vs 12,742 km de la Tierra). Pero las condiciones son radicalmente distintas." },
  { keywords: ["venus", "gravedad", "peso"], answer: "En Venus pesarías el 91% de tu peso terrestre. Una persona de 70 kg pesaría allí 63.5 kg." },
  { keywords: ["venus", "aire", "atmósfera espesa"], answer: "Venus tiene una atmósfera increíblemente densa y pesada. El 96% es dióxido de carbono, con nubes de ácido sulfúrico. La presión en la superficie es 92 veces la de la Tierra — como estar a 900 metros bajo el mar." },

  // ══════════════════════════════════════════════════
  // 🌍  TIERRA
  // ══════════════════════════════════════════════════
  { keywords: ["tierra", "único", "especial", "vida", "agua líquida", "oxígeno", "placas tectónicas"], answer: "La Tierra es el único planeta conocido con vida, agua líquida en superficie, una atmósfera rica en oxígeno y placas tectónicas activas. Su distancia al Sol permite temperaturas habitables." },
  { keywords: ["tierra", "luna", "cuantas lunas", "satélite"], answer: "La Tierra tiene una Luna. Es la quinta luna más grande del Sistema Solar y la única que orbita un planeta rocoso con tal tamaño relativo." },
  { keywords: ["tierra", "oxígeno", "respirar", "tierra atmósfera"], answer: "La atmósfera terrestre tiene 21% de oxígeno, 78% de nitrógeno y 1% de argón. Es la única atmósfera conocida en el universo que permite respirar a los humanos." },
  { keywords: ["tierra", "agua", "océano", "tierra agua"], answer: "El 71% de la superficie terrestre está cubierta por agua líquida, de la cual el 97% es agua salada y solo el 3% es dulce. ¡La Tierra es el único planeta con agua líquida en su superficie!" },
  { keywords: ["tierra", "edad", "años", "formación"], answer: "La Tierra tiene aproximadamente 4,540 millones de años. Se formó a partir del polvo y gas que orbitaban al joven Sol." },
  { keywords: ["tierra", "luna", "formación", "como se formo la luna"], answer: "La Luna se formó hace ~4,500 millones de años cuando un objeto del tamaño de Marte (Tea) chocó contra la Tierra, arrojando material que se fusionó en la Luna." },
  { keywords: ["tierra", "campo magnético", "protección"], answer: "El campo magnético terrestre lo genera el núcleo de hierro fundido en rotación. Nos protege del viento solar y los rayos cósmicos. Sin él, la vida no sería posible." },
  { keywords: ["tierra", "gravedad", "gravedad terrestre"], answer: "La gravedad en la Tierra es de 9.807 m/s². Se usa como referencia para medir la gravedad de otros planetas." },
  { keywords: ["tierra", "informacion", "hablame de la tierra", "planeta tierra", "dime de la tierra"], answer: "La Tierra es el tercer planeta del Sistema Solar, el único con vida conocida. Tiene 12,742 km de diámetro, un 71% de agua superficial, una atmósfera respirable y un campo magnético que nos protege." },

  // ══════════════════════════════════════════════════
  // ♂  MARTE
  // ══════════════════════════════════════════════════
  { keywords: ["marte", "color rojo", "por que es rojo", "óxido de hierro", "herrumbre"], answer: "Marte es de color rojo por el óxido de hierro (herrumbre) en su superficie. El polvo rico en hierro se oxida con el tiempo, dando al planeta su característico tono rojizo." },
  { keywords: ["marte", "agua", "hielo", "líquida", "marte agua"], answer: "Marte tiene agua principalmente en forma de hielo en los polos y bajo la superficie. En el pasado tuvo ríos y lagos líquidos, y hoy se busca evidencia de agua salada estacional." },
  { keywords: ["marte", "día", "sol", "cuanto dura", "24 horas", "39 minutos"], answer: "Un día marciano (sol) dura 24 horas, 39 minutos y 35 segundos, muy similar al día terrestre, lo que facilita las operaciones de los rovers." },
  { keywords: ["marte", "oxígeno", "respirar", "marte oxigeno"], answer: "La atmósfera de Marte es 95% CO₂ y solo 0.13% oxígeno. No se puede respirar, pero la NASA ha logrado extraer oxígeno del CO₂ marciano con el experimento MOXIE." },
  { keywords: ["marte", "atmósfera", "aire", "marte aire"], answer: "La atmósfera marciana es extremadamente delgada (0.006 bar, menos del 1% de la terrestre) compuesta principalmente de CO₂. Es tan fina que el agua líquida se evapora al instante." },
  { keywords: ["marte", "tamaño", "diámetro", "marte tamaño"], answer: "Marte tiene un diámetro de 6,779 km, aproximadamente la mitad del tamaño de la Tierra. Su superficie equivale al área de todos los continentes terrestres juntos." },
  { keywords: ["marte", "gravedad", "peso"], answer: "La gravedad en Marte es de 3.71 m/s², aproximadamente el 38% de la gravedad terrestre. Una persona de 70 kg pesaría solo 26.5 kg." },
  { keywords: ["marte", "lunas", "fobos", "deimos"], answer: "Marte tiene dos lunas pequeñas e irregulares: Fobos (que orbita tan cerca que se está desintegrando lentamente) y Deimos (más pequeña y alejada, parece una patata)." },
  { keywords: ["marte", "colonizar", "colonia", "vivir", "vida en marte"], answer: "Marte es frío (promedio -63°C), la atmósfera no es respirable y la radiación es alta. Se necesitarían hábitats presurizados y protección radiológica. Pero es el candidato más viable para una colonia." },
  { keywords: ["marte", "informacion", "hablame de marte", "planeta marte", "dime de marte", "cuentame de marte"], answer: "Marte es el cuarto planeta, conocido como el Planeta Rojo. Tiene el volcán más grande (Olympus Mons, 22 km) y el cañón más extenso (Valles Marineris, 4,000 km) del Sistema Solar." },
  { keywords: ["marte", "montaña", "olimpo", "olympus mons", "volcán", "mas alta"], answer: "Marte tiene la montaña más alta del Sistema Solar: el Monte Olimpo (Olympus Mons) mide ~22 km de alto (casi 3 veces el Everest) y 600 km de ancho." },
  { keywords: ["perseverance"], answer: "El rover Perseverance aterrizó en Marte el 18 de febrero de 2021. Busca signos de vida microbiana antigua, recolecta muestras para traer a la Tierra y probó con éxito el helicóptero Ingenuity." },
  { keywords: ["ingenuity", "helicóptero marte"], answer: "El helicóptero Ingenuity fue el primer vehículo en volar en otro mundo. Realizó 72 vuelos en Marte antes de sufrir daños en su rotor en enero de 2024." },

  // ══════════════════════════════════════════════════
  // ♃  JÚPITER
  // ══════════════════════════════════════════════════
  { keywords: ["júpiter", "jupiter", "mancha roja", "jupiter informacion", "hablame de jupiter", "dime de jupiter", "planeta jupiter", "cuentame de jupiter"], answer: "Júpiter es el mayor planeta del Sistema Solar con 139,820 km de diámetro. Es un gigante gaseoso compuesto 90% de hidrógeno y 10% de helio. Su Gran Mancha Roja es una tormenta más grande que la Tierra, activa desde hace más de 350 años." },
  { keywords: ["júpiter", "gran mancha roja", "tormenta", "que es"], answer: "La Gran Mancha Roja de Júpiter es una tormenta anticiclónica gigante, más grande que la Tierra, que lleva activa al menos 400 años. Sus vientos alcanzan 430 km/h y su color rojizo podría deberse a compuestos químicos como fósforo o azufre." },
  { keywords: ["júpiter", "jupiter", "lunas", "europa", "io", "ganímedes", "calisto", "jupiter lunas", "galileanas", "cuantas lunas"], answer: "Júpiter tiene más de 95 lunas confirmadas. Las cuatro más grandes, llamadas galileanas, son Ío, Europa, Ganímedes y Calisto. Ganímedes es la luna más grande del Sistema Solar." },
  { keywords: ["júpiter", "anillos", "tiene anillos"], answer: "Sí, Júpiter tiene anillos, pero son muy tenues y oscuros, compuestos de polvo fino. Fueron descubiertos por la Voyager 1 en 1979 y son difíciles de ver desde la Tierra." },
  { keywords: ["júpiter", "europa", "océano", "vida", "europa luna"], answer: "Europa, luna de Júpiter, tiene un océano de agua líquida bajo su corteza de hielo. Es uno de los mejores candidatos para buscar vida extraterrestre. La NASA lanzará la misión Europa Clipper para estudiarla." },
  { keywords: ["júpiter", "gravedad", "peso"], answer: "La gravedad en Júpiter es de 24.79 m/s², más de 2.5 veces la gravedad terrestre. Una persona de 70 kg pesaría allí 177 kg." },
  { keywords: ["júpiter", "día", "rotación", "dia mas corto"], answer: "Júpiter tiene el día más corto del Sistema Solar: solo 9.9 horas, a pesar de ser el planeta más grande. Su rápida rotación lo hace visiblemente achatado en los polos." },
  { keywords: ["júpiter", "masa", "pesado"], answer: "Júpiter tiene más masa que todos los demás planetas del Sistema Solar juntos (317.8 veces la masa terrestre). Si hubiera sido 80 veces más masivo, se habría convertido en una estrella." },
  { keywords: ["júpiter", "atmósfera", "aire", "jupiter aire"], answer: "Júpiter no tiene una superficie sólida — es todo atmósfera. Está compuesto de 90% hidrógeno y 10% helio, con nubes de amoníaco. No hay oxígeno para respirar." },

  // ══════════════════════════════════════════════════
  // ♄  SATURNO
  // ══════════════════════════════════════════════════
  { keywords: ["saturno", "anillos", "saturno informacion", "hablame de saturno", "dime de saturno", "planeta saturno", "cuentame de saturno"], answer: "Saturno es famoso por sus impresionantes anillos compuestos de hielo y roca. Se extienden hasta 282,000 km pero tienen solo 10 metros de grosor. Es el segundo planeta más grande (116,460 km de diámetro)." },
  { keywords: ["saturno", "anillos", "de que estan hechos", "hielo", "partículas"], answer: "Los anillos de Saturno están hechos principalmente de partículas de hielo de agua (desde granos de polvo hasta bloques de varios metros), con algo de polvo rocoso. Son extremadamente delgados: solo ~10 metros de grosor en promedio." },
  { keywords: ["saturno", "flotar", "agua", "flotaria", "densidad"], answer: "Teóricamente Saturno podría flotar en el agua porque su densidad promedio (0.69 g/cm³) es menor que la del agua (1 g/cm³). ¡Pero necesitarías un océano gigantesco!" },
  { keywords: ["saturno", "titan", "atmósfera", "luna"], answer: "Titán, la luna más grande de Saturno, es única: tiene una atmósfera densa (nitrógeno y metano) y lagos de metano líquido en su superficie. Es candidata para buscar vida extraterrestre." },
  { keywords: ["saturno", "encélado"], answer: "Encélado, luna de Saturno, expulsa géiseres de agua desde un océano subterráneo a través de su corteza helada. Contiene moléculas orgánicas: ¡ingredientes para la vida!" },
  { keywords: ["saturno", "lunas", "satélites", "mas lunas", "cuantas lunas"], answer: "Saturno tiene más de 146 lunas confirmadas. Titán es la más grande y la única luna del Sistema Solar con atmósfera densa y lagos de metano líquido." },
  { keywords: ["cassini"], answer: "La misión Cassini-Huygens estudió Saturno y sus lunas de 2004 a 2017. Descubrió océanos subterráneos en Encélado y Titán. Finalizó sumergiéndose en la atmósfera de Saturno." },
  { keywords: ["saturno", "gravedad", "peso"], answer: "En Saturno pesarías aproximadamente lo mismo que en la Tierra (10.44 m/s²). Una persona de 70 kg pesaría 74.5 kg." },

  // ══════════════════════════════════════════════════
  // ♅  URANO
  // ══════════════════════════════════════════════════
  { keywords: ["urano", "inclinado", "lado", "rotación", "eje", "98", "urano informacion", "hablame de urano", "dime de urano", "planeta urano", "cuentame de urano"], answer: "Urano es el único planeta que rota 'de lado' — su eje está inclinado ~98°, probablemente por un impacto gigante con un cuerpo del tamaño de la Tierra en sus inicios. Esto hace que sus polos apunten hacia el Sol en distintos momentos de su órbita." },
  { keywords: ["urano", "color", "azul", "verde", "cian", "metano"], answer: "Urano es de color azul verdoso, debido al metano en su atmósfera que absorbe la luz roja y refleja la azul y verde." },
  { keywords: ["urano", "anillos", "cuantos anillos"], answer: "Sí, Urano tiene 13 anillos oscuros y delgados, descubiertos en 1977. Están compuestos de partículas oscuras, posiblemente hielo irradiado y material orgánico." },
  { keywords: ["urano", "anillos", "verticales"], answer: "Urano tiene anillos verticales debido a su extrema inclinación axial. Fue el primer planeta descubierto con telescopio (1781, por William Herschel). Tiene 27 lunas conocidas." },
  { keywords: ["urano", "temperatura", "frio"], answer: "Urano tiene la temperatura más baja del Sistema Solar: -224°C, incluso más frío que Neptuno que está más lejos. Es el lugar más frío del sistema solar." },

  // ══════════════════════════════════════════════════
  // ♆  NEPTUNO
  // ══════════════════════════════════════════════════
  { keywords: ["neptuno", "viento", "vientos", "neptuno informacion", "hablame de neptuno", "dime de neptuno", "planeta neptuno", "cuentame de neptuno"], answer: "Neptuno es el planeta más lejano del Sol, a 4,500 millones de km. Tiene los vientos más rápidos del Sistema Solar: ¡hasta 2,100 km/h! Es un gigante de hielo de color azul intenso." },
  { keywords: ["neptuno", "azul", "mas azul", "urano", "diferencia", "color"], answer: "Neptuno es más azul que Urano porque su atmósfera tiene menos neblina de metano condensado, permitiendo que el color azul del metano se vea más intenso. También podría haber otros compuestos desconocidos." },
  { keywords: ["neptuno", "viento", "mas rápido", "2100", "2,100 km/h"], answer: "Neptuno tiene los vientos más rápidos del Sistema Solar, superando los 2,100 km/h. Se deben a su intenso calor interno y rápida rotación." },
  { keywords: ["neptuno", "año", "orbita", "165 años", "cuanto tarda"], answer: "Neptuno tarda 165 años terrestres en orbitar el Sol. Desde su descubrimiento en 1846, completó su primera órbita observada en 2011." },
  { keywords: ["neptuno", "descubrimiento", "matemáticas", "como descubrieron"], answer: "Neptuno fue el primer planeta descubierto mediante cálculos matemáticos. En 1846, Urbain Le Verrier predijo su existencia basándose en irregularidades en la órbita de Urano." },
  { keywords: ["neptuno", "lunas", "tritón"], answer: "Neptuno tiene 14 lunas conocidas. Tritón, la más grande, orbita en dirección opuesta al planeta (órbita retrógrada), lo que sugiere que fue un objeto capturado del cinturón de Kuiper." },
  { keywords: ["neptuno", "temperatura", "frio"], answer: "Neptuno tiene una temperatura promedio de -201°C. Aunque está más lejos del Sol que Urano, Neptuno es ligeramente más cálido porque genera calor interno." },
  { keywords: ["neptuno", "gravedad", "peso"], answer: "En Neptuno pesarías un 14% más que en la Tierra. Una persona de 70 kg pesaría allí 79.5 kg." },

  // ══════════════════════════════════════════════════
  // 🏆  PREGUNTAS ADICIONALES / RÉCORDS
  // ══════════════════════════════════════════════════
  { keywords: ["planeta", "lunas", "más lunas", "cual tiene mas lunas", "planeta con más lunas"], answer: "Saturno tiene más lunas, con más de 146 confirmadas (superando a Júpiter en 2023 gracias a nuevos descubrimientos)." },
  { keywords: ["planeta", "grande", "mayor", "más grande", "cual es el mas grande"], answer: "Júpiter es el planeta más grande con 139,820 km de diámetro, más de 11 veces el diámetro de la Tierra. Le siguen Saturno (116,460 km), Urano y Neptuno. Mercurio es el más pequeño." },
  { keywords: ["planeta", "pequeño", "más pequeño", "cual es el mas pequeño"], answer: "Mercurio es el planeta más pequeño: diámetro de 4,880 km, ligeramente más grande que la Luna terrestre." },
  { keywords: ["planeta", "día", "largo", "dia mas largo"], answer: "Venus tiene el día más largo: un día solar dura 243 días terrestres, más que su año (225 días). Además, rota en sentido retrógrado (al revés que la mayoría)." },
  { keywords: ["planeta", "año", "corto", "año mas corto"], answer: "Mercurio tiene el año más corto: solo 88 días terrestres para completar una órbita alrededor del Sol." },
  { keywords: ["planeta", "denso", "densidad", "mas denso"], answer: "La Tierra es el planeta más denso: 5.52 g/cm³, debido a su núcleo metálico grande y composición rocosa." },
  { keywords: ["planeta", "caminar", "superficie sólida", "jupiter caminar"], answer: "No se puede caminar en Júpiter porque es un gigante gaseoso sin superficie sólida. Si intentaras 'aterrizar', te hundirías en capas de gas cada vez más densas y calientes hasta ser destruido." },
  { keywords: ["planeta", "chocar", "colision", "por que no chocan", "orbitas estables"], answer: "Los planetas no chocan entre sí porque orbitan en trayectorias estables determinadas por la gravedad del Sol y las leyes de Kepler. Sus órbitas están bien separadas y son predecibles a largo plazo." },
  { keywords: ["cinturón", "asteroides", "cinturón de asteroides", "entre marte y jupiter"], answer: "El cinturón de asteroides es una región entre Marte y Júpiter con millones de objetos rocosos sobrantes de la formación del Sistema Solar. No es tan denso como en las películas: las naves pueden cruzarlo sin peligro." },
  { keywords: ["planeta", "agua", "no tiene agua", "planeta sin agua", "sin agua", "cual planeta no tiene agua"], answer: "Si hablamos de agua líquida en superficie, Mercurio y Venus prácticamente no tienen: Mercurio apenas conserva algo de hielo en cráteres polares y Venus perdió toda el agua por el efecto invernadero. Los gigantes gaseosos (Júpiter, Saturno, Urano, Neptuno) no tienen superficie sólida ni agua líquida visible. Marte tiene hielo en los polos, y la Tierra es el único con agua líquida abundante." },
  { keywords: ["planeta", "tiene agua", "con agua", "agua líquida", "cual planeta tiene agua"], answer: "Varios planetas tienen agua en distintas formas. La Tierra es el rey indiscutible con océanos superficiales. Marte tiene hielo en los polos y bajo tierra. Mercurio tiene hielo en cráteres sombríos. Venus pudo tener agua pero la perdió. Gigantes gaseosos tienen agua en su interior. ¡Y si contamos lunas, Europa y Encélado tienen océanos subterráneos!" },

  // ══════════════════════════════════════════════════
  // 🌙  LAS LUNAS
  // ══════════════════════════════════════════════════
  { keywords: ["luna", "satélite natural", "satelite natural", "que es una luna", "definición luna"], answer: "Una luna o satélite natural es un cuerpo celeste que orbita alrededor de un planeta. Pueden ser rocosas, heladas o una mezcla, y varían desde pequeños asteroides capturados hasta mundos complejos con atmósfera." },
  { keywords: ["luna", "fases", "fases lunares", "por que tiene fases", "creciente", "menguante", "llena", "nueva"], answer: "La Luna tiene fases por su posición relativa respecto a la Tierra y el Sol. La parte iluminada que vemos cambia a lo largo de ~29.5 días (mes sinódico), creando las fases: nueva, creciente, llena y menguante." },
  { keywords: ["luna", "misma cara", "cara oculta", "cara visible", "acoplamiento de marea", "rotación sincrónica"], answer: "Siempre vemos la misma cara de la Luna por acoplamiento de marea: la Luna tarda lo mismo en rotar sobre sí misma que en orbitar la Tierra (~27.3 días). Esto hace que siempre muestre la misma cara hacia nosotros." },
  { keywords: ["marea", "mareas", "causa", "luna gravedad", "por que hay mareas", "océano"], answer: "Las mareas en la Tierra son causadas principalmente por la gravedad de la Luna (y en menor medida, del Sol). Atrae el agua de los océanos, creando dos abultamientos: uno hacia la Luna y otro en el lado opuesto." },
  { keywords: ["luna", "atmósfera", "lunas con atmósfera", "titán", "atmósfera lunar"], answer: "Sí, hay lunas con atmósfera. Titán (luna de Saturno) tiene una atmósfera densa de nitrógeno y metano. Ío (Júpiter) tiene una tenue atmósfera de dióxido de azufre. Otras tienen exosferas muy delgadas." },
  { keywords: ["luna", "subluna", "luna de luna", "puede tener lunas"], answer: "Teóricamente una luna podría tener lunas (se llamarían 'sublunas'), pero en la práctica es muy inestable debido a las fuerzas gravitatorias del planeta principal. Hasta ahora no se ha confirmado ninguna." },
  { keywords: ["luna", "más grande", "mayor luna", "ganímedes", "cual es la luna mas grande"], answer: "Ganímedes, luna de Júpiter, es la más grande del Sistema Solar: diámetro de 5,268 km (más grande que Mercurio). Es la única luna conocida con campo magnético propio." },
  { keywords: ["luna", "agua", "hielo", "europa", "encélado", "océano subterráneo", "lunas con agua"], answer: "Sí, hay agua en lunas. Europa (Júpiter) y Encélado (Saturno) tienen océanos de agua líquida bajo su corteza helada. La Luna terrestre tiene hielo en cráteres polares en sombra permanente." },

  // ══════════════════════════════════════════════════
  // 🌑  ECLIPSES
  // ══════════════════════════════════════════════════
  { keywords: ["eclipse", "que es un eclipse", "explicar eclipse", "dime sobre eclipses", "información eclipse"], cannotContain: ["solar", "lunar", "roja", "sangre", "mirar", "seguro", "gafas", "cuanto dura", "totalidad", "predecir", "saros"], answer: "Un eclipse es un fenómeno astronómico fascinante donde un cuerpo celeste se interpone entre otros dos, ocultándolo total o parcialmente. Hay dos tipos principales: el eclipse solar (la Luna tapa al Sol) y el eclipse lunar (la Tierra proyecta su sombra en la Luna). ¿Quieres saber más sobre algún tipo en concreto?" },
  { keywords: ["eclipse", "solar", "eclipse solar", "que es", "luna entre sol y tierra"], answer: "¡Buena pregunta! Un eclipse solar ocurre cuando la Luna se pone justo entre el Sol y la Tierra, como si se 'interpusiera' y proyectara su sombra sobre nosotros. Es un espectáculo increíble, pero solo sucede en Luna nueva y cuando los tres cuerpos están perfectamente alineados. ¿Sabías que hay diferentes tipos? Total, parcial y anular. Cada uno es único." },
  { keywords: ["eclipse", "lunar", "eclipse lunar", "que es", "tierra entre sol y luna"], answer: "Me encanta explicar esto! Un eclipse lunar pasa cuando la Tierra se coloca entre el Sol y la Luna, y nuestro planeta proyecta su sombra sobre la Luna. Es como si la Tierra le hiciera una sombra gigante a la Luna. Solo ocurre en Luna llena y con una alineación muy precisa. ¡Y lo mejor es que se ve desde todo un hemisferio!" },
  { keywords: ["eclipse", "por que no", "cada mes", "inclinación", "5 grados", "nodos", "temporada"], answer: "Es una pregunta muy común! Si la Luna orbita la Tierra cada mes, ¿por qué no tenemos eclipses todos los meses? La respuesta está en la inclinación: la órbita de la Luna está inclinada unos 5° respecto a la de la Tierra. Es como si estuviera ligeramente 'descarrilada'. Los eclipses solo ocurren cuando la Luna cruza ese plano imaginario (los nodos), y eso pasa en 'temporadas de eclipses' dos veces al año." },
  { keywords: ["eclipse", "luna roja", "sangre", "luna de sangre", "por que roja", "refracción", "atmósfera"], answer: "Ah, la famosa Luna de Sangre! No te preocupes, no es nada siniestro. Durante un eclipse lunar total, la luz del Sol pasa a través de la atmósfera terrestre, y esta filtra los tonos azules dejando pasar solo los rojos. Es el mismo efecto que hace que los atardeceres sean rojizos. La atmósfera de la Tierra actúa como un lente que proyecta luz roja sobre la Luna. ¡Pura poesía cósmica!" },
  { keywords: ["eclipse", "mirar", "seguro", "protección", "gafas", "iso", "peligro"], answer: "Ojo, esto es muy importante! Mirar un eclipse solar sin protección es peligrosísimo. Solo durante la fase total (y brevemente) puedes mirar sin filtros. En fases parciales o anulares, NUNCA mires directamente sin gafas certificadas ISO 12312-2. Y ojo: las cámaras, telescopios o filtros caseros NO sirven. Tu vista vale mucho, no te la juegues!" },
  { keywords: ["eclipse", "cuanto dura", "totalidad", "7 minutos", "duración máxima"], answer: "La totalidad (cuando la Luna tapa completamente el Sol) es un momento mágico pero muy corto: como máximo dura unos 7 minutos y medio, aunque lo normal son 2-4 minutos. El eclipse completo, desde que la Luna empieza a 'morder' el Sol hasta que termina, puede alargarse hasta 3 horas. Por eso la gente viaja al otro lado del mundo para vivirlo!" },
  { keywords: ["eclipse", "predecir", "predicción", "saros", "anticipación"], answer: "Sí! Los astrónomos pueden predecir eclipses con una precisión asombrosa, incluso con siglos de anticipación. Usan un ciclo llamado Saros que dura unos 18 años, donde los eclipses se repiten en patrones muy similares. Es gracias a las leyes de la mecánica celeste, que son tan precisas como un reloj suizo." },

  // ══════════════════════════════════════════════════
  // 🌌  GALAXIA Y UNIVERSO
  // ══════════════════════════════════════════════════
  { keywords: ["vía láctea", "via lactea", "galaxia", "nuestra galaxia", "espiral barrada"], answer: "La Vía Láctea es nuestra galaxia: una espiral barrada con ~100-400 mil millones de estrellas, diámetro de ~100,000 años luz. El Sistema Solar está en uno de sus brazos, a ~27,000 años luz del centro." },
  { keywords: ["galaxias", "cuantas", "universo observable", "hubble", "billones", "200 mil millones"], answer: "Se estiman entre 200,000 millones y 2 billones de galaxias en el universo observable, según datos del telescopio Hubble y modelos cosmológicos." },
  { keywords: ["centro", "vía láctea", "sagitario", "agujero negro", "sagitario a*", "supermasivo"], answer: "En el centro de la Vía Láctea hay un agujero negro supermasivo llamado Sagitario A*, con una masa de ~4 millones de soles. Está rodeado de estrellas que orbitan a altísimas velocidades." },
  { keywords: ["sistema solar", "mueve", "galaxia", "órbita galáctica", "año galáctico", "220 km/s"], answer: "Sí, el Sistema Solar orbita el centro galáctico a ~220 km/s, completando una vuelta cada ~230 millones de años (un 'año galáctico')." },
  { keywords: ["año luz", "luz", "distancia luz", "que es un año luz"], answer: "Un año luz es la distancia que recorre la luz en un año: ~9.46 billones de km. Se usa para medir distancias astronómicas. Ejemplo: la estrella más cercana (Próxima Centauri) está a 4.24 años luz." },

  // ── EXISTENTE: AIRE / ATMÓSFERA ──
  { keywords: ["aire", "atmósfera", "menos aire", "no tiene aire", "sin aire", "planeta sin atmósfera", "cual planeta no tiene aire"], cannotContain: ["agua", "luna", "lunas", "vida", "tamaño", "grande", "pequeño", "caliente", "frío", "rojo", "día", "año", "gravedad", "luz", "óxido", "volcán", "montaña", "anillos", "viento", "eclipse", "galaxia"], answer: "Mercurio es el planeta con menos aire: prácticamente no tiene atmósfera. Le sigue Marte con una atmósfera muy delgada (1% de la terrestre). Venus tiene atmósfera pero es tóxica (CO₂), y los gigantes gaseosos tienen hidrógeno y helio. Solo la Tierra tiene aire respirable." },
  { keywords: ["aire", "respirar", "cual planeta se puede respirar"], answer: "El único planeta con aire respirable es la Tierra (21% oxígeno, 78% nitrógeno). En los demás no se puede respirar: Venus y Marte tienen CO₂, los gigantes gaseosos tienen hidrógeno y helio." },
  { keywords: ["atmósfera", "más espesa", "atmósfera densa", "presión"], answer: "Venus tiene la atmósfera más densa del Sistema Solar, con una presión 92 veces la terrestre. Mercurio tiene la más tenue. La Tierra tiene el equilibrio perfecto para la vida." },

  // ── EXISTENTE: COMPARACIONES ──
  { keywords: ["planeta", "caliente", "más caliente", "cual es el mas caliente"], answer: "Venus es el planeta más caliente con 462°C de temperatura media, ¡incluso más que Mercurio que está más cerca del Sol! Esto se debe al efecto invernadero descontrolado de su densa atmósfera." },
  { keywords: ["planeta", "frío", "más frío", "cual es el mas frio"], answer: "Urano ostenta el récord de temperatura más baja con -224°C, superando incluso a Neptuno que está más lejos. Neptuno tiene -201°C de temperatura media." },
  { keywords: ["agua", "quien", "tiene más", "mas agua", "planeta con agua", "agua líquida"], mustContain: ["más", "quien", "cuál"], cannotContain: ["no tiene", "sin agua"], answer: "La Tierra es el único planeta con agua líquida superficial abundante (71% de su superficie). Marte tiene hielo en los polos. Pero si contamos lunas, Europa (Júpiter) tiene un océano subterráneo masivo con más agua que toda la Tierra." },
  { keywords: ["oxígeno", "quien", "tiene más", "mas oxigeno", "planeta oxigeno", "respirar"], answer: "Solo la Tierra tiene oxígeno libre en su atmósfera (21%). Venus y Marte tienen principalmente CO₂ (96-95%). Los gigantes gaseosos (Júpiter, Saturno, Urano, Neptuno) son hidrógeno y helio." },
  { keywords: ["gravedad", "menor", "mayor", "cual", "mas gravedad"], answer: "Júpiter tiene la mayor gravedad (24.79 m/s² — 2.5× la terrestre). Mercurio tiene la menor (3.7 m/s² — 38% de la terrestre). En Mercurio una persona de 70 kg pesaría solo 26.5 kg." },
  { keywords: ["día", "corto", "largo", "dia mas largo", "dia mas corto"], answer: "Júpiter tiene el día más corto (solo 9.9 horas). Venus tiene el día más largo (243 días terrestres — ¡más que su año de 225 días!)." },
  { keywords: ["planeta", "tamaño", "orden", "como se ordenan"], answer: "Orden de tamaño (diámetro): 1° Júpiter (139,820 km), 2° Saturno (116,460 km), 3° Urano (50,724 km), 4° Neptuno (49,244 km), 5° Tierra (12,742 km), 6° Venus (12,104 km), 7° Marte (6,779 km), 8° Mercurio (4,879 km)." },
  { keywords: ["planeta", "lejano", "distancia", "mas lejano", "cual es el mas lejano"], answer: "Neptuno es el planeta más lejano del Sol, a 4,495 millones de km (30.1 UA). La luz solar tarda más de 4 horas en llegar hasta él. Plutón solía ser el noveno pero fue reclasificado." },
  { keywords: ["más pequeño", "planeta pequeño", "cual es el mas pequeño"], answer: "Mercurio es el planeta más pequeño con solo 4,879 km de diámetro. ¡Es incluso más pequeño que Ganímedes (luna de Júpiter) y Titán (luna de Saturno)!" },
  { keywords: ["planeta", "cercano", "mas cercano", "cerca del sol"], answer: "Mercurio es el planeta más cercano al Sol (57.9 millones de km). Venus está a 108 millones, la Tierra a 150 millones y Marte a 228 millones de km." },
  { keywords: ["planeta", "velocidad", "orbita", "rapido"], answer: "Mercurio viaja alrededor del Sol a 47.9 km/s — ¡el más rápido! Neptuno es el más lento a 5.4 km/s. La Tierra viaja a 29.8 km/s." },
  { keywords: ["gigante", "gaseoso", "gigantes gaseosos"], answer: "Los gigantes gaseosos son Júpiter, Saturno, Urano y Neptuno. No tienen superficie sólida: son enormes bolas de gas (principalmente hidrógeno y helio). Urano y Neptuno son 'gigantes de hielo'." },

  // ── EXISTENTE: COMPARACIONES PLANETAS ESPECÍFICAS ──
  { keywords: ["tierra", "marte", "diferencia", "parecido", "comparar"], answer: "La Tierra y Marte son muy diferentes: la Tierra es casi el doble de grande (12,742 km vs 6,779 km), tiene agua líquida, atmósfera respirable y campo magnético. Marte es frío (-63°C), seco y con atmósfera muy delgada. ¡Pero ambos tienen aproximadamente la misma cantidad de superficie continental!" },
  { keywords: ["venus", "tierra", "gemelo", "parecido", "comparar"], answer: "Venus es llamado el 'gemelo malvado' de la Tierra: tienen tamaño y masa similares, pero Venus tiene una atmósfera tóxica 92 veces más densa, temperatura de 462°C y rota al revés. Un infierno comparado con la Tierra." },
  { keywords: ["júpiter", "saturno", "diferencias"], answer: "Júpiter y Saturno son los dos gigantes gaseosos más grandes. Júpiter es mayor (139,820 km vs 116,460 km), más masivo (317.8 vs 95.16 Tierras) y tiene 95 lunas vs 146 de Saturno. Saturno destaca por sus espectaculares anillos." },
  { keywords: ["marte", "tierra", "gravedad", "cuanto pesaria"], answer: "En Marte pesarías solo el 38% de tu peso terrestre. Una persona de 70 kg pesaría 26.5 kg en Marte, 63.5 kg en Venus, 177 kg en Júpiter y 26.5 kg en Mercurio." },

  // ── EXISTENTE: COMETAS ──
  { keywords: ["halley", "cometa halley", "halley cometa"], answer: "El cometa Halley orbita el Sol cada 75-76 años. Pasó por última vez en 1986 y regresará en 2061. Es famoso porque es el único cometa periódico visible a simple vista desde la Tierra. ¡Fue documentado desde el 240 a.C.!" },
  { keywords: ["halebopp", "hale-bopp"], answer: "El cometa Hale-Bopp (1997) fue uno de los más brillantes del siglo XX. Su núcleo de 60 km es enorme (4 veces el del Halley) y su período orbital es de 2,533 años." },
  { keywords: ["neowise"], answer: "Neowise fue un cometa espectacular visible a simple vista en julio de 2020. Su núcleo de 5 km desprendía gas y polvo formando una cola visible incluso desde ciudades." },
  { keywords: ["cometa", "partes", "coma", "núcleo", "cola", "que es un cometa"], answer: "Un cometa está formado por: núcleo (hielo y polvo, el 'cuerpo'), coma (nube de gas que lo rodea al acercarse al Sol) y cola (polvo curvo amarillento y cola iónica recta azulada que siempre apunta opuesta al Sol)." },

  // ── EXISTENTE: ASTEROIDES ──
  { keywords: ["apophis", "asteroide apophis"], answer: "Apophis es un asteroide de 370 metros que pasará a solo 31,000 km de la Tierra el 13 de abril de 2029 — más cerca que los satélites geoestacionarios. No representa ningún riesgo de impacto." },
  { keywords: ["bennu", "osiris", "osiris-rex"], answer: "Bennu es un asteroide de 490 m. La misión OSIRIS-REx de la NASA trajo muestras de su superficie a la Tierra en 2023. Tiene una probabilidad de impacto de 1 en 2,700 para 2182." },
  { keywords: ["asteroide", "cinturón", "cinturón de asteroides"], answer: "El cinturón de asteroides entre Marte y Júpiter contiene millones de rocas espaciales. El más grande es Ceres (940 km de diámetro), clasificado como planeta enano." },
  { keywords: ["didymos", "dart", "desviar", "defensa planetaria"], answer: "La misión DART (2022) impactó contra Dimorphos, la luna del asteroide Didymos, logrando desviar exitosamente su órbita. Fue la primera prueba de defensa planetaria de la humanidad." },
  { keywords: ["asteroide", "peligro", "tierra", "chocar", "impacto"], answer: "La NASA monitorea continuamente objetos cercanos. Actualmente ningún asteroide conocido tiene probabilidad significativa de impactar la Tierra en los próximos 100 años." },

  // ── EXISTENTE: IMPACTOS ──
  { keywords: ["tunguska"], answer: "El evento de Tunguska (30 junio 1908) fue una explosión aérea sobre Siberia equivalente a 10-15 megatones de TNT. Derribó 80 millones de árboles en 2,150 km². No dejó cráter porque el objeto explotó en el aire." },
  { keywords: ["chelyabinsk"], answer: "El meteorito de Chelyabinsk (15 febrero 2013) explotó sobre Rusia con 500 kilotones de energía. Hirió a 1,500 personas (mayormente por vidrios rotos). No fue detectado antes porque venía del lado del Sol." },
  { keywords: ["chicxulub", "dinosaurios", "extinción", "extincion", "extincion dinosaurios"], answer: "El impacto de Chicxulub hace 66 millones de años fue causado por un asteroide de 10-15 km. Provocó la extinción del 75% de las especies, incluidos los dinosaurios. El cráter en Yucatán mide 180 km de diámetro." },

  // ── EXISTENTE: LLUVIAS DE METEOROS ──
  { keywords: ["perseidas", "lágrimas de san lorenzo", "lagrimas"], answer: "Las Perseidas o 'Lágrimas de San Lorenzo' alcanzan su pico el 12-13 de agosto con hasta 100 meteoros por hora. Provienen del cometa Swift-Tuttle. ¡Son la lluvia más popular del año!" },
  { keywords: ["gemínidas", "geminidas"], answer: "Las Gemínidas (13-14 diciembre) son la única gran lluvia de meteoros de origen asteroidal (del 3200 Phaethon). Producen meteoros multicolores y brillantes." },
  { keywords: ["cuadrántidas", "quadrantidas"], answer: "Las Cuadrántidas (3-4 enero) tienen un pico intenso pero muy corto (solo 6 horas), con hasta 120 meteoros por hora." },
  { keywords: ["leónidas", "leonidas", "tormenta", "lluvia intensa"], answer: "Las Leónidas (17-18 noviembre) cada 33 años producen tormentas espectaculares con miles de meteoros por hora, como ocurrió en 1833 y 1966." },
  { keywords: ["oriónidas", "orionidas"], answer: "Las Oriónidas (20-22 octubre) son restos del cometa Halley. Producen meteoros rápidos (66 km/s) y brillantes." },
  { keywords: ["lluvia", "meteoros", "ver", "como ver meteoros"], answer: "Para ver una lluvia de meteoros busca un lugar oscuro, sin contaminación lumínica, acuéstate mirando al cielo y ten paciencia. No necesitas telescopio. La mejor hora suele ser después de la medianoche." },

  // ── EXISTENTE: MISIONES ──
  { keywords: ["apolo", "apollo", "apollo 11", "llegada a la luna", "hombre en la luna"], answer: "El Apolo 11 fue la primera misión en llegar a la Luna (20 julio 1969) con Neil Armstrong y Buzz Aldrin. En total, 12 astronautas caminaron sobre la Luna entre 1969 y 1972 en 6 misiones exitosas." },
  { keywords: ["voyager", "sondas", "espacio interestelar"], answer: "Las Voyager 1 y 2 (lanzadas en 1977) son los objetos humanos más lejanos. Voyager 1 entró al espacio interestelar en 2012. Ambas llevan el famoso Disco de Oro con sonidos y música de la Tierra." },
  { keywords: ["curiosity", "rover", "curiosity marte"], answer: "El rover Curiosity aterrizó en Marte en 2012. Ha recorrido más de 30 km y descubrió que Marte tuvo las condiciones químicas para albergar vida microbiana." },
  { keywords: ["hubble", "telescopio espacial", "hubble telescopio"], answer: "El telescopio espacial Hubble (lanzado en 1990) ha revolucionado la astronomía. Sus imágenes más famosas: los Pilares de la Creación, el Campo Profundo, y galaxias en colisión." },
  { keywords: ["webb", "jwst", "james webb", "telescopio james webb"], answer: "El telescopio James Webb (lanzado en 2021) observa el universo en infrarrojo. Ha revelado galaxias del universo primitivo, atmósferas de exoplanetas y nuevas regiones de formación estelar." },
  { keywords: ["juno", "misión júpiter", "sonda juno"], answer: "La sonda Juno (NASA) orbita Júpiter desde 2016. Estudia su composición, campo magnético y auroras. Ha revelado que el interior de Júpiter es mucho más complejo de lo que se pensaba." },
  { keywords: ["iss", "estación espacial", "estacion espacial"], answer: "La Estación Espacial Internacional (ISS) orbita a 408 km de altura a 28,000 km/h. Da una vuelta a la Tierra cada 90 minutos. Ha tenido ocupación continua desde el año 2000." },
  { keywords: ["artemis", "regreso a la luna", "nasa luna"], answer: "Artemis es el programa de la NASA para regresar humanos a la Luna, incluyendo la primera mujer. Artemis I (2022) orbitó la Luna. Artemis III planea alunizar en 2027." },
  { keywords: ["apolo", "13", "houston tenemos un problema"], answer: "El Apolo 13 (1970) sufrió una explosión en el módulo de servicio que puso en peligro la vida de los 3 astronautas. La famosa frase 'Houston, tenemos un problema' y el increíble rescate lo convirtieron en la 'falla exitosa' de la NASA." },

  // ── EXISTENTE: ASTRONAUTAS ──
  { keywords: ["gagarin", "yuri", "primer humano"], answer: "Yuri Gagarin (URSS) fue el primer ser humano en el espacio el 12 de abril de 1961. Su misión Vostok 1 duró 108 minutos. Su frase al ver la Tierra: '¡Es tan hermosa!'." },
  { keywords: ["armstrong", "neil", "primer hombre", "luna primero"], answer: "Neil Armstrong fue el primer humano en pisar la Luna el 20 de julio de 1969 (Apolo 11). Su famosa frase: 'Un pequeño paso para el hombre, un gran salto para la humanidad'." },
  { keywords: ["tereshkova", "valentina", "primera mujer", "mujer espacio"], answer: "Valentina Tereshkova fue la primera mujer en el espacio (16 junio 1963). Pasó 70 horas en órbita dando 48 vueltas a la Tierra en la Vostok 6." },
  { keywords: ["aldrin", "buzz"], answer: "Buzz Aldrin fue el segundo hombre en pisar la Luna (Apolo 11). Al ver el paisaje lunar dijo: 'Magnífica desolación'. Es doctor en astronáutica del MIT." },
  { keywords: ["sagan", "carl", "cosmos", "polvo de estrellas"], answer: "Carl Sagan fue un brillante astrónomo y divulgador. Creó la serie Cosmos, diseñó el Disco de Oro de las Voyager y acuñó la frase: 'Estamos hechos de polvo de estrellas'." },
  { keywords: ["hawking", "stephen", "agujero negro", "radiación"], answer: "Stephen Hawking revolucionó la física con su teoría de la radiación de Hawking sobre agujeros negros. Escribió el bestseller 'Breve Historia del Tiempo'." },
  { keywords: ["einstein", "albert", "relatividad", "e mc2"], answer: "Albert Einstein desarrolló la Teoría de la Relatividad (E=mc²), demostrando que espacio y tiempo son relativos. Predijo las ondas gravitacionales y los agujeros negros." },
  { keywords: ["kepler", "johannes", "leyes de kepler", "orbitas"], answer: "Johannes Kepler descubrió que los planetas orbitan en elipses (no círculos). Sus tres leyes explican cómo se mueven los planetas alrededor del Sol." },
  { keywords: ["galileo", "galilei", "telescopio", "telescopio galileo"], answer: "Galileo Galilei mejoró el telescopio en 1609 y descubrió las lunas de Júpiter, las fases de Venus y las manchas solares. La Iglesia lo condenó por defender que la Tierra no era el centro del universo." },
  { keywords: ["newton", "isaac", "gravedad", "manzana"], answer: "Isaac Newton formuló la Ley de Gravitación Universal cuando (según la leyenda) vio caer una manzana. Sus tres leyes del movimiento y su obra 'Principia Mathematica' son la base de la física." },

  // ── EXISTENTE: FENÓMENOS ──
  { keywords: ["agujero negro", "agujeros negros"], answer: "Un agujero negro es una región del espacio donde la gravedad es tan intensa que ni la luz escapa. El primero fotografiado fue M87* en 2019. El centro de nuestra galaxia tiene uno llamado Sagitario A*." },
  { keywords: ["año luz", "luz", "distancia luz"], answer: "Un año luz son 9.46 billones de kilómetros. La estrella más cercana (Próxima Centauri) está a 4.24 años luz. La luz del Sol tarda 8 minutos en llegar a la Tierra." },

  { keywords: ["materia oscura", "energía oscura"], answer: "La materia oscura constituye el 27% del universo — no la vemos pero sabemos que existe por su gravedad. La energía oscura (68%) está acelerando la expansión del universo. Lo que conocemos es solo el 5%." },
  { keywords: ["big bang", "origen del universo", "como se creo"], answer: "El Big Bang ocurrió hace 13.8 mil millones de años. El universo comenzó como una singularidad infinitamente densa y caliente, y desde entonces se expande y enfría." },
  { keywords: ["exoplaneta", "exoplanetas", "planeta fuera", "otros mundos"], answer: "Se han descubierto más de 5,500 exoplanetas en nuestra galaxia. El primero confirmado fue 51 Pegasi b en 1995. Algunos están en la 'zona habitable' de sus estrellas." },
  { keywords: ["vida extraterrestre", "aliens", "vida en otros planetas"], answer: "Aún no hay evidencia confirmada de vida extraterrestre, pero hay candidatos prometedores: Europa (luna de Júpiter) y Encélado (luna de Saturno) tienen océanos subterráneos con potencial para vida microbiana." },
  { keywords: ["gravedad cero", "ingravidez", "microgravedad", "flotar"], answer: "En realidad no existe gravedad cero. Los astronautas flotan porque caen constantemente hacia la Tierra en una trayectoria orbital. Se llama microgravedad." },
  { keywords: ["cinturón", "kuiper", "nube de oort"], answer: "El cinturón de Kuiper (más allá de Neptuno) contiene objetos helados como Plutón. La nube de Oort, una esfera de cometas a 1 año luz del Sol, envuelve todo el Sistema Solar." },
  { keywords: ["plutón", "pluton", "planeta enano"], answer: "Plutón fue reclasificado como planeta enano en 2006 por la IAU. Tiene 5 lunas (Caronte, Estigia, Nix, Cerbero e Hidra) y un corazón de hielo de nitrógeno (la región Tombaugh)." },
  { keywords: ["ceres", "asteroide", "cinturón de asteroides"], answer: "Ceres es el planeta enano más cercano al Sol, ubicado en el cinturón de asteroides entre Marte y Júpiter. Tiene 940 km de diámetro y la sonda Dawn descubrió puntos brillantes de carbonato de sodio en su superficie." },

  // ── EXISTENTE: GENÉRICAS ──
  { keywords: ["espacio", "universo", "sistema solar", "hablame del espacio", "que es el espacio", "cuentame del universo", "informacion espacio"], answer: "El espacio es sencillamente fascinante! Nuestro Sistema Solar tiene 8 planetas (Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno), 5 planetas enanos (Plutón, Ceres, Eris, Makemake, Haumea), y millones de asteroides, cometas y meteoros. El Sol es solo una estrella entre miles de millones en la Vía Láctea. ¿Sobre qué te gustaría profundizar? Planeta, misión, astronauta... ¡tú eliges!" },
  { keywords: ["gracias", "gracias bot", "eres genial", "buen trabajo"], answer: "¡De nada, un placer! Me alegra poder ayudarte 🚀✨ Si tienes más dudas, aquí me tienes. La astronomía es fascinante y siempre hay algo nuevo que descubrir. ¿Qué más te gustaría saber?" },
  { keywords: ["hola", "buenas", "como estas", "qué tal", "hey"], answer: "¡Hola, hola! Encantado de verte por aquí 😊 Soy tu guía de Preguntas Frecuentes sobre el espacio. Pregúntame lo que quieras: planetas, estrellas, lunas, eclipses, misiones espaciales... ¡lo que se te ocurra! ¿Por dónde empezamos?" },
  { keywords: ["cuantos planetas", "planetas hay", "planetas sistema solar"], answer: "El Sistema Solar tiene 8 planetas oficiales: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Antes era 9 pero Plutón fue reclasificado como planeta enano en 2006." },
  { keywords: ["planeta", "rocoso", "rocosos", "interiores"], answer: "Los planetas rocosos o interiores son Mercurio, Venus, Tierra y Marte. Tienen superficie sólida, son más pequeños y están más cerca del Sol. Los gigantes gaseosos son Júpiter, Saturno, Urano y Neptuno." },
  { keywords: ["curiosidad", "dato curioso", "sabias que", "dato interesante"], answer: "¡Claro que sí! Aquí va una joyita: Saturno es tan ligero que su densidad es menor que la del agua. Si existiera una piscina cósmica lo suficientemente grande, ¡Saturno flotaría! Increíble, ¿verdad? Quieres otro dato curioso? Pregúntame por cualquier planeta y te sorprendo." },
];

function normalize(s: string): string {
  return s.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function keywordIn(keyword: string, nq: string): boolean {
  return nq.includes(keyword) || nq.includes(normalize(keyword));
}

function qaScore(nq: string, qa: QA): { match: boolean; matchedCount: number; totalLength: number } {
  const cannot = qa.cannotContain?.some((c) => keywordIn(c, nq));
  if (cannot) return { match: false, matchedCount: 0, totalLength: 0 };
  const must = qa.mustContain;
  if (must && !must.some((c) => keywordIn(c, nq))) {
    return { match: false, matchedCount: 0, totalLength: 0 };
  }
  const matchedKeywords = qa.keywords.filter((k) => keywordIn(k, nq));
  const totalLength = matchedKeywords.reduce((s, k) => s + k.length, 0);
  return { match: matchedKeywords.length > 0, matchedCount: matchedKeywords.length, totalLength };
}

export function askAstronomer(question: string): string {
  const q = question.toLowerCase().trim();
  if (!q) return "¡Hey! Escríbeme una pregunta y te responderé encantado 😊";
  const nq = normalize(q);

  const scored = KB
    .map((entry) => ({ entry, ...qaScore(nq, entry) }))
    .filter((s) => s.match)
    .sort((a, b) => {
      if (b.matchedCount !== a.matchedCount) return b.matchedCount - a.matchedCount;
      if (b.totalLength !== a.totalLength) return b.totalLength - a.totalLength;
      if ((b.entry.mustContain?.length ?? 0) !== (a.entry.mustContain?.length ?? 0))
        return (b.entry.mustContain?.length ?? 0) - (a.entry.mustContain?.length ?? 0);
      return b.entry.keywords.length - a.entry.keywords.length;
    });

  if (scored.length > 0) return scored[0].entry.answer;

  const words = q.split(/\s+/).filter((w) => w.length > 3);
  const byWord = words
    .map((w) => KB.find((qa) => qa.keywords.some((k) => keywordIn(k, nq))))
    .filter(Boolean);
  if (byWord.length > 0) return byWord[0]!.answer;

  return `Ufff, esa no me la esperaba! No tengo una respuesta preparada para eso, pero prueba con estas preguntas que tengo bien ensayadas:\n\n• ☀️ El Sol: "¿Qué es el Sol?", "¿De qué está compuesto?", "¿Cuál es su temperatura?"\n• 🪐 Planetas: "Háblame de Marte", "¿Cuál es el más grande?", "¿Marte tiene agua?"\n• 🌙 Lunas: "¿Por qué la Luna tiene fases?", "¿Qué son las mareas?"\n• 🌑 Eclipses: "¿Qué es un eclipse solar?", "¿Por qué la Luna se ve roja?"\n• 🌌 Galaxia: "¿Qué es la Vía Láctea?", "¿Qué hay en el centro?"\n• 🚀 Misiones: "El Apolo 11", "¿Qué es la Voyager?"\n• 👨‍🚀 Astronautas: "¿Quién fue Carl Sagan?"\n\n¡Seguro que alguna te interesa! 😊`;
}

export const SUGGESTED = [
  "¿Qué es el Sol?",
  "¿De qué está compuesto el Sol?",
  "¿Cuál es la temperatura del Sol?",
  "¿Qué es una erupción solar?",
  "¿Cuánto tarda la luz del Sol en llegar?",
  "¿Qué pasará cuando el Sol se agote?",
  "¿Cuáles son los 8 planetas en orden?",
  "¿Por qué Plutón ya no es planeta?",
  "¿Cuál es la diferencia entre rocosos y gaseosos?",
  "¿Por qué Mercurio tiene temperaturas extremas?",
  "¿Por qué Venus es el más caliente?",
  "¿Qué hace única a la Tierra?",
  "¿Por qué Marte es rojo?",
  "¿Marte tiene agua?",
  "¿Qué es la Gran Mancha Roja?",
  "¿Cuántas lunas tiene Júpiter?",
  "¿De qué están hechos los anillos de Saturno?",
  "¿Por qué Urano rota de lado?",
  "¿Cuál es el viento más rápido?",
  "¿Qué planeta tiene más lunas?",
  "¿Cuál es el planeta más grande?",
  "¿Qué planeta tiene el día más largo?",
  "¿Qué es un eclipse solar?",
  "¿Qué es un eclipse lunar?",
  "¿Por qué la Luna se ve roja?",
  "¿Qué es la Vía Láctea?",
  "¿Qué hay en el centro de la galaxia?",
  "¿Qué es un año luz?",
  "Háblame de Júpiter",
  "¿Quién fue Carl Sagan?",
  "¿Cómo se formó la Luna?",
  "¿Qué son las Perseidas?",
  "¿Por qué no podemos mirar al Sol?",
  "¿Se puede caminar en Júpiter?",
  "¿Qué son las fases de la Luna?",
  "¿Por qué siempre vemos la misma cara de la Luna?",
];
