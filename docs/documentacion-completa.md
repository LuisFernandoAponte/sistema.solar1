# Documentación Completa — Cosmos: Simulador del Sistema Solar

---

## 1. Resumen del Proyecto

Aplicación web interactiva 3D que simula el Sistema Solar con fines educativos y científicos. Construida con **React 19**, **TypeScript**, **Three.js** y **TanStack Start**.

**Nombre:** Cosmos · Solar System Simulator  
**Idioma UI:** Español  
**URL local:** `http://localhost:5173` (dev)  
**Comando:** `npm run dev`

---

## 2. Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19.2 | UI Framework |
| TypeScript | 5.8 | Tipado estático |
| TanStack Start | 1.167 | SSR Framework (React Router + Vite) |
| TanStack Router | 1.168 | Routing file-based |
| TanStack Query | 5.83 | Estado servidor/caching |
| Three.js | 0.184 | Motor 3D |
| @react-three/fiber | 9.6 | React renderer para Three.js |
| @react-three/drei | 10.7 | Utilidades Three.js para React |
| Zustand | 5.0 | Estado global del cliente |
| Tailwind CSS | 4.2 | Estilos utilitarios |
| Framer Motion | 10.12 | Animaciones declarativas |
| Recharts | 2.15 | Gráficos comparativos |
| Web Audio API | nativa | Síntesis de audio espacial |
| Radix UI (shadcn/ui) | — | Componentes accesibles headless |
| Lucide React | 0.575 | Iconos SVG |
| Vite | 7.3 | Build tool |

---

## 3. Estructura del Proyecto

```
sistema-solar/
├── src/
│   ├── components/           # Componentes React
│   │   ├── SolarSystem.tsx   # Escena 3D principal
│   │   ├── ControlPanel.tsx  # Panel lateral de control
│   │   ├── InfoPanel.tsx     # Información detallada de planetas
│   │   ├── ChartsPanel.tsx   # Gráficos comparativos
│   │   ├── BiographiesPanel.tsx  # Biografías de astronautas/científicos
│   │   ├── EventsPanel.tsx   # Catálogo de eventos espaciales
│   │   ├── EventModal.tsx    # Modal de detalle de evento
│   │   ├── MeteorsPanel.tsx  # Control de lluvias de meteoros
│   │   ├── ComparePlanetsPanel.tsx  # Comparación planetaria
│   │   ├── Chatbot.tsx       # Asistente virtual (astrónomo)
│   │   ├── RecentPlanetsWidget.tsx  # Planetas vistos recientemente
│   │   └── ui/               # Componentes shadcn/ui (Radix)
│   ├── data/                 # Datos estáticos
│   │   ├── planets.ts        # 8 planetas + Sol + Ceres
│   │   ├── biographies.ts    # 18 biografías
│   │   ├── chatbot.ts        # Base de conocimiento (170+ Q&A)
│   │   ├── events.ts         # 9 eventos espaciales
│   │   └── meteorShowers.ts  # 5 lluvias de meteoros
│   ├── hooks/                # Custom hooks
│   │   ├── useKeyboardShortcuts.ts  # Atajos de teclado
│   │   ├── useSpatialAudio.ts       # Audio espacial (Web Audio API)
│   │   └── use-mobile.tsx           # Detección de dispositivo móvil
│   ├── lib/                  # Utilidades
│   │   ├── utils.ts          # cn() — clsx + tailwind-merge
│   │   ├── performance.ts    # Caching, debounce, memoización
│   │   ├── config.server.ts  # Config servidor
│   │   ├── error-capture.ts  # Captura global de errores SSR
│   │   ├── error-page.ts     # HTML de error server-side
│   │   └── api/example.functions.ts  # Ejemplo server function
│   ├── routes/               # TanStack Router routes
│   │   ├── __root.tsx        # Layout raíz (404, error, QueryClient)
│   │   ├── index.tsx         # Página principal (simulador)
│   │   └── README.md
│   ├── store/                # Estado global
│   │   └── useSimStore.ts    # Store Zustand
│   ├── styles.css            # Tailwind + animaciones custom
│   ├── router.tsx            # Configuración del router
│   ├── routeTree.gen.ts      # Generado automáticamente
│   ├── server.ts             # Entry point SSR
│   └── start.ts              # Instancia TanStack Start
├── package.json
├── vite.config.ts
├── tsconfig.json
└── components.json           # Config shadcn/ui
```

---

## 4. Arquitectura de la Aplicación

```
                             ┌─────────────────────────────┐
                             │     TanStack Start (SSR)     │
                             │         src/server.ts         │
                             │          src/start.ts         │
                             └──────────────┬──────────────┘
                                            │
                             ┌──────────────┴──────────────┐
                             │      TanStack Router         │
                             │         src/router.tsx       │
                             │      src/routes/__root.tsx   │── 404, Error, Layout
                             │      src/routes/index.tsx    │── Página principal
                             └──────────────┬──────────────┘
                                            │
              ┌─────────────────────────────┼─────────────────────────────┐
              │                             │                             │
   ┌──────────┴──────────┐     ┌────────────┴────────────┐    ┌─────────┴──────────┐
   │    ControlPanel     │     │      SolarSystem         │    │  Paneles Laterales  │
   │  (sidebar/mobile)   │     │  (Canvas React 3 Fiber)  │    │                     │
   │                     │     │                          │    │  ChartsPanel        │
   │  - Velocidad temporal│    │  - Sol (memoized)        │    │  BiographiesPanel   │
   │  - Pausa/Reanudar   │     │  - 8 Planetas (memoized) │    │  EventsPanel        │
   │  - Capas (órbitas,  │     │  - Lunas (memoized)      │    │  MeteorsPanel       │
   │    etiquetas, lluvia)│    │  - Anillos (Saturno)     │    │  InfoPanel          │
   │  - Sonido espacial  │     │  - Lluvia de meteoros    │    │  ComparePlanets     │
   │  - Herramientas     │     │  - Galaxia de fondo      │    │                     │
   │  - Recientes        │     │  - Orbitas               │    │  Chatbot            │
   └─────────────────────┘     └──────────────────────────┘    └─────────────────────┘
              │                             │                             │
              └─────────────────────────────┼─────────────────────────────┘
                                            │
                              ┌─────────────┴─────────────┐
                              │     Zustand Store          │
                              │    useSimStore.ts          │
                              │                            │
                              │  selectedPlanet            │
                              │  timeScale / paused        │
                              │  showOrbits/Labels/Meteors │
                              │  soundEnabled / soundVolume│
                              │  focusMode / compareMode   │
                              │  recentPlanets             │
                              └────────────────────────────┘
```

---

## 5. Estado Global — useSimStore

**Archivo:** `src/store/useSimStore.ts`

Store Zustand con `subscribeWithSelector` middleware. Contiene todo el estado de la simulación.

### Interfaces

```typescript
interface SimState {
  selectedPlanet: string | null;    // Planeta seleccionado (id)
  timeScale: number;                 // Velocidad (0.1–20)
  paused: boolean;                   // Simulación pausada
  showOrbits: boolean;               // Mostrar órbitas
  showLabels: boolean;               // Mostrar etiquetas
  showMeteors: boolean;              // Mostrar lluvia de meteoros
  activeMeteorShower: string | null; // Lluvia activa
  activePanel: PanelType | null;     // Panel abierto
  focusMode: boolean;                // Modo sin distracciones
  compareMode: boolean;              // Modo comparación
  comparePlanet: string | null;      // Planeta a comparar
  recentPlanets: string[];           // Últimos 5 planetas vistos
  keyboardEnabled: boolean;          // Atajos activos
  showTutorial: boolean;             // Mostrar tutorial
  soundEnabled: boolean;             // Audio activo
  soundVolume: number;               // Volumen (0–1)
}
```

### Acciones principales

| Acción | Descripción |
|---|---|
| `setSelectedPlanet(id)` | Selecciona planeta, abre info, agrega a recientes |
| `setTimeScale(n)` | Cambia velocidad |
| `togglePaused()` | Pausa/reanuda |
| `toggleOrbits/Labels/Meteors()` | Toggle capas visuales |
| `toggleFocusMode()` | Modo enfoque (oculta UI) |
| `toggleCompareMode()` | Modo comparación |
| `toggleSound()` | Silencia/activa audio |
| `setSoundVolume(v)` | Volumen |
| `addToRecent(id)` | Agrega a historial (máx 5) |
| `resetSimulation()` | Restaura valores iniciales |

---

## 6. Sistema 3D — SolarSystem.tsx

**Archivo:** `src/components/SolarSystem.tsx` (616 líneas)

### Canvas (React Three Fiber)

```tsx
<Canvas camera={{ position: [0, 35, 55], fov: 55, near: 0.1, far: 1000 }}>
  <Scene />
  <OrbitControls ... />
</Canvas>
```

### Componentes de la escena

#### Scene
Compositor que monta todos los elementos:

```
Scene
├── ambientLight (intensidad 0.15)
├── GalaxyBackground (6000 estrellas)
├── MemoitzadoSun
├── MemoOrbitRing × 9 (órbitas de cada planeta)
├── MemoPlanet × 9 (planetas memoizados)
└── MeteorShowerFx (partículas)
```

#### Sun
- Esfera con `meshBasicMaterial` color `#FDB813`
- 2 capas de glow externo (escalas 1.15 y 1.4 con opacidad decreciente)
- `pointLight` (intensidad 3, distancia 300)
- Rotación lenta en Y

#### Planet (memoizado con `React.memo` y comparación custom)
- Posición orbital calculada con `cos/sin` según `timeScale`
- Velocidad orbital: `0.15 / sqrt(distancia / 9)` (aproximación Kepleriana)
- Rotación axial según `axialTilt` y `rotationPeriod`
- Atmósfera glow para Earth, Venus, Neptune
- Anillos para Saturno (via `Rings` component)
- Anillo de selección (ring amarillo)
- Label HTML con `drei/Html`
- Lunas (Moon component, memoizado)
- Click → `setSelectedPlanet`, hover → cursor pointer

#### GalaxyBackground
- 6000 puntos (estrellas) distribuidos en 4 zonas:
  - **Background (35%):** radio 50–350, dispersión vertical ±30
  - **Asteroid belt (20%):** radio 27–35, dispersión vertical ±2.5
  - **Kuiper belt (15%):** radio 75–100, dispersión vertical ±6
  - **Outer halo (30%):** radio 120–320, dispersión vertical ±40
- Colores: blanco (40%), azul (25%), naranja (15%), rojo (20%)
- Rotación global lenta (0.003 rad/s)

#### MeteorShowerFx
- Sistema de partículas con 60–250 meteoros
- **Componentes:** cabezas (points), colas (lineSegments), glow (points)
- Reciclado: al caer debajo de Y=-15, reaparecen arriba
- Textura circular generada en Canvas (radial gradient)
- Blending aditivo para brillo

#### OrbitRings
- 128 puntos por órbita, color blanco opacidad 0.15

### Controles de Cámara
- `OrbitControls` con damping (0.08)
- Rotación, zoom, pan con restricciones
- Teclado: Flechas (rotar), Shift+Flechas (panear), +/- (zoom)
- Límites: distancia 8–220, ángulo polar 0.18π–0.48π

---

## 7. Audio Espacial — useSpatialAudio.ts

**Archivo:** `src/hooks/useSpatialAudio.ts` (440 líneas)

Sistema de audio generativo con Web Audio API. Sin archivos externos, todo es síntesis procedural.

### Arquitectura de audio

```
                    ┌──────────────────┐
                    │  Pad Sideral      │──┐
                    │  (32Hz + 24Hz)    │  │
                    └──────────────────┘  │
                    ┌──────────────────┐  │
                    │  Viento Estelar   │──┤
                    │  (ruido filtrado) │  │
                    └──────────────────┘  │
                    ┌──────────────────┐  │   ┌──────────┐   ┌──────────┐
                    │  Phaser (6 allpass│──┤──→│  Reverb  │──→│  Master  │──→ speakers
                    │  + LFO 0.08Hz)    │  │   │  (4 delay│   │  Gain    │
                    └──────────────────┘  │   │  + FB)   │   └──────────┘
                    ┌──────────────────┐  │   └──────────┘
                    │  16 Star Twinkles│──┘
                    │  (one-shots)     │
                    └──────────────────┘
                    ┌──────────────────┐
                    │  Tonos Planetas   │──→ Master (directo)
                    │  (8 planetas)     │
                    └──────────────────┘
```

### Master Gain
- `GainNode` global único
- Silencia con `setValueAtTime(0)` — corte instantáneo
- Restaura volumen con `setValueAtTime(volumen)`

### Phaser (createPhaser)
- 6 filtros `BiquadFilterNode` tipo `allpass` en serie
- Frecuencias base: 400, 700, 1000, 1300, 1600, 1900 Hz
- LFO senoidal a 0.08 Hz modula frecuencia de todos los filtros ±1200 Hz
- Crea el barrido espacial característico

### Reverb (createReverb)
- 4 líneas de delay con feedback: 0.08s, 0.12s, 0.17s, 0.23s
- Feedback: 0.4, 0.35, 0.3, 0.25
- Filtros lowpass a 3 kHz en la realimentación
- Pre-delay estéreo: 0.07s (L), 0.11s (R)
- Splitter/Merger para procesamiento estéreo

### Star Twinkler (createStarTwinkler)
- 16 "estrellas" con scheduling recursivo via `setTimeout`
- Cada estrella tiene:
  - `StereoPannerNode` con pan aleatorio (−0.8 a +0.8)
  - `BiquadFilterNode` bandpass (800–3200 Hz, Q 6–10)
  - Intervalo aleatorio entre titileos (2–8 s)
- Cada titileo:
  - Oscilador one-shot con frecuencia variada (±50 Hz)
  - Envolvente ADSR: attack 0.3–0.8s, sustain 0.4–1.2s, release 0.6–1.8s
  - `linearRampToValueAtTime` para fade suave
  - `osc.stop()` al finalizar

### Space Wind (createSpaceWind)
- Buffer de ruido blanco procedural (2s, loop)
- Filtro pasa-bajos (400 Hz) modulado por LFO a 0.03 Hz ±350 Hz
- Filtro pasa-altos (80 Hz) elimina subgraves
- LFO de volumen a 0.06 Hz ±0.03

### Pad Sideral (createPadTone)
- 2 pads: 32 Hz y 24 Hz
- Cada pad: 3 osciladores ligeramente desafinados (detune ±5 cents)
- Filtro pasa-bajos a 600 Hz, Q=3
- Fade in lento: 0.25 y 0.2 respectivamente

### Planet Tones
- 8 osciladores (uno por planeta)
- Volumen modulado según selección:
  - Sin selección: 7% vol, frecuencia base
  - Planeta seleccionado: 50% vol, frecuencia elevada
  - Otros planetas (cuando hay selección): 3% vol
- `setTargetAtTime` para transiciones suaves

---

## 8. Panel de Control — ControlPanel.tsx

**Archivo:** `src/components/ControlPanel.tsx`

### Layout
- **Desktop:** Sidebar fijo izquierdo (320px)
- **Mobile:** Bottom sheet con FAB toggle

### Secciones

| Sección | Contenido |
|---|---|
| Velocidad Temporal | Slider 0.1–20×, botones 0.1×/Pausa/10× |
| Capas | Switches: Órbitas, Etiquetas, Lluvia |
| Sonido Espacial | Switch on/off + Slider volumen (0–100%) |
| Herramientas | Botones: Modo Enfoque, Comparar |
| Vistos Recientemente | RecentPlanetsWidget (5 círculos de colores) |
| Footer | Ayuda de controles sin mouse |

---

## 9. Paneles Laterales

Se renderizan en `src/routes/index.tsx` como `aside` flotante.

### ChartsPanel
- Gráficos de barras horizontales con Recharts
- 4 métricas: Distancia (AU/km), Masa, Gravedad, Temperatura
- Escala logarítmica para masa
- Click en barra → selecciona planeta

### InfoPanel
- Se muestra cuando hay `selectedPlanet`
- Pestañas: Características Físicas, Órbita & Rotación, Clima & Atmósfera, Satélites, Exploración
- Modo básico / experto (toggle)
- Botones: Copiar datos, Compartir planeta
- Datos contextuales (ej. "gravedad relativa a la Tierra")

### BiographiesPanel
- 18 entradas (8 astronautas + 10 científicos)
- Filtro: todos / astronautas / científicos
- Búsqueda por nombre o nacionalidad
- Modal con: frase célebre, biografía completa, logros

### EventsPanel
- 9 eventos (cometas, asteroides, impactos)
- Filtro: todos / futuros / pasados
- Cards con: categoría, peligro, estado, fecha, tamaño
- Modal con datos técnicos detallados

### MeteorsPanel
- 5 lluvias de meteoros con THZ, fecha pico, velocidad, radiante
- Intensity meter (5 barras)
- Toggle visibilidad en simulador
- Shower activo con indicador

### ComparePlanetsPanel
- Selecciona planeta a comparar con el seleccionado
- Tabla de 9 métricas lado a lado
- Ratio de diferencia coloreado

---

## 10. Chatbot

**Archivo:** `src/components/Chatbot.tsx`

- Astrónomo virtual con base de conocimiento offline
- Burbuja flotante (abajo derecha)
- Panel expandible con historial
- Persistencia en localStorage
- TypeWriter effect en respuestas
- 10 preguntas sugeridas inicialmente
- `askAstronomer(query)` de `src/data/chatbot.ts`
  - Matching por keywords
  - 170+ pares Q&A

### Categorías del conocimiento
- Sol, planetas (8), Ceres
- Cometas (Halley, Hale-Bopp, NEOWISE)
- Asteroides (Apophis, Bennu, 1950 DA, Didymos)
- Impactos (Tunguska, Chelyabinsk, Chicxulub)
- Lluvias de meteoros (Perseidas, Gemínidas, etc.)
- Misiones (Apollo, Voyager, Curiosity, Hubble, JWST, etc.)
- Astronautas y científicos
- Fenómenos (agujeros negros, años luz, materia oscura, Big Bang, exoplanetas)

---

## 11. Datos Estáticos

### planets.ts
```typescript
interface PlanetData {
  id, name, nameEn, color, radius, realDiameter,
  distance, realDistance, au, orbitalPeriod, rotationPeriod,
  temperature: { min, mean, max }, mass, gravity, moons,
  axialTilt, hasRings, description, facts,
  satellites?: { name, radius, distance, color, period }[],
  density?, escapeVelocity?, albedo?, apparentMagnitude?,
  composition?, exploration?, atmosphericComposition?, atmosphericPressure?
}
```

9 cuerpos: Mercurio, Venus, Tierra (+ Luna), Marte (+ Fobos, Deimos), Júpiter (+ Ío, Europa, Ganimedes, Calisto), Saturno (+ Titán, Encélado), Urano, Neptuno, Ceres.

### biographies.ts
```typescript
interface Bio {
  id, name, type: "astronaut" | "scientist", nationality,
  birth, death, initials, color, achievements: string[],
  quote, bio
}
```

8 astronautas (Gagarin, Armstrong, Tereshkova, Aldrin, Ride, Hadfield, Jemison, Leonov)
10 científicos (K. Johnson, Newton, Galileo, Kepler, Einstein, Sagan, Hawking, Rubin, Curie, Hubble)

### chatbot.ts
170+ pares en un array de `{ keywords, answer }`. Coincidencia por inclusión de keywords.

### events.ts
9 objetos `SpaceEvent` con: category, date, status, size, details, description, danger.

### meteorShowers.ts
5 objetos `MeteorShower` con: id, name, peak, thz, radiant, velocity, origin, color, intensity.

---

## 12. Atajos de Teclado

**Archivo:** `src/hooks/useKeyboardShortcuts.ts`

| Tecla | Acción |
|---|---|
| Espacio | Play/Pause |
| O | Toggle órbitas |
| L | Toggle etiquetas |
| M | Toggle meteoros |
| S | Toggle sonido |
| F | Modo enfoque |
| C | Modo comparación |
| R | Reset simulación |
| Escape | Limpiar selección |
| 1–3 | Seleccionar planeta 1–3 |
| Flechas | Rotar cámara |
| Shift + Flechas | Mover cámara |
| + / - | Zoom |
| Shift + ? | Ayuda (consola) |

---

## 13. Utilidades

### lib/utils.ts
```typescript
cn(...inputs: ClassValue[]): string  // clsx + tailwind-merge
```

### lib/performance.ts
- `useMemoWithComparison`: `useMemo` con comparador custom
- `useDebouncedCallback(fn, delay)`: Callback con debounce
- `memoComponent(component, propsAreEqual)`: `React.memo` wrapper
- `geometryCache`, `materialCache`: Caché global de geometrías Three.js
- `getCachedGeometry(key, factory)`, `getCachedMaterial(key, factory)`
- `useAnimationFrameLimit(fps)`: Hook que limita framerate

---

## 14. Routing y SSR

### router.tsx
- `createRouter()` con `routeTree.gen.ts`
- Contexto: `QueryClient`
- Scroll restoration

### __root.tsx
- `createRootRouteWithContext<{ queryClient }>()`
- `NotFoundComponent`: 404 con link a home
- `ErrorComponent`: Error con botón retry + link home
- `RootShell`: HTML shell con `HeadContent` + `Scripts`
- `RootComponent`: `QueryClientProvider` + `<Outlet />`

### server.ts
- SSR entry point
- Captura de errores catastróficos (h3-swallowed)
- Fallback a `renderErrorPage()` en caso de 500

### start.ts
- `createStart()` con `requestMiddleware` (error middleware)

---

## 15. Estilos — styles.css

**Archivo:** `src/styles.css`

- **Tailwind CSS v4** con `@import "tailwindcss"`
- **Tema custom** con `@theme inline`:
  - `--color-solar: #FDB813` (amarillo)
  - `--color-space: #0B0E17` (fondo)
  - `--color-mars: #E85D3A` (rojo)
  - `--color-glass-bg`, `--color-glass-border`
- **Glassmorphism:** `.glass` y `.glass-strong` con backdrop-blur
- **Animaciones:**
  - `slideInLeft/Right/Up` — paneles
  - `fadeIn` — fade general
  - `glow` — brillo pulsante
  - `pulse-soft` — pulso suave
  - `barGrow` — barras de comparación
  - `dotPulse` — puntos de carga
  - `meteorStreak` — estela de meteoro
  - `glowPulse` — pulso de brillo
  - `orbitRotate` — rotación orbital
- **Clases utilitarias:**
  - `font-display`, `font-mono-data`
  - `.scrollbar-thin` — scrollbar fino
  - `.btn-solar` — botón temático
  - `.panel-enter` — entrada de panel animada

---

## 16. Flujo de Datos

```
Usuario interactúa
       │
       ▼
   Componente React
       │
       ├──→ useSimStore.set*()  ←── Zustand
       │
       ▼
   Store actualizado
       │
       ├──→ SolarSystem (useSimStore)
       │     ├── timeScale → velocidad orbital
       │     ├── paused → freeze
       │     ├── showOrbits → visibilidad
       │     ├── showLabels → etiquetas
       │     └── selectedPlanet → selección + anillo
       │
       ├──→ useSpatialAudio (useSimStore)
       │     ├── soundEnabled → master gain
       │     ├── soundVolume → volumen
       │     └── timeScale → modulación
       │
       ├──→ ControlPanel (useSimStore)
       │
       └──→ Paneles (useSimStore)
             ├── activePanel → visibilidad
             ├── selectedPlanet → InfoPanel
             ├── compareMode/comparePlanet → ComparePlanetsPanel
             └── activeMeteorShower → MeteorsPanel
```

---

## 17. Rendimiento y Optimización

- **Memoización:** `React.memo` en Sol, Planet (con comparador custom), Moon, OrbitRing
- **Caché Three.js:** `geometryCache` y `materialCache` para geometrías compartidas
- **Partículas:** Reciclado de meteoros (reposicionamiento en lugar de crear/eliminar)
- **Canvas:** `dpr={[1, 2]}` (adaptativo), antialiasing, alpha
- **Audio:** Scheduling con `setTimeout` + `ctx.currentTime` para precisión sin bloqueo
- **Scroll:** `overflow-hidden` en contenedor principal
- **Lazy:** `Suspense` en Canvas para 3D

---

## 18. Dependencias Clave (package.json)

| Paquete | Versión |
|---|---|
| react, react-dom | ^19.2.0 |
| @tanstack/react-router | ^1.168.25 |
| @tanstack/react-query | ^5.83.0 |
| @tanstack/react-start | ^1.167.50 |
| three | ^0.184.0 |
| @react-three/fiber | ^9.6.1 |
| @react-three/drei | ^10.7.7 |
| zustand | ^5.0.13 |
| recharts | ^2.15.4 |
| framer-motion | ^10.12.6 |
| tailwindcss | ^4.2.1 |
| lucide-react | ^0.575.0 |

### Scripts
| Comando | Descripción |
|---|---|
| `npm run dev` | Desarrollo con HMR |
| `npm run build` | Build producción |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
