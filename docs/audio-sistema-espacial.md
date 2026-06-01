# Sistema de Audio Espacial — Cosmos

## Arquitectura General

Sistema de audio generativo procedural construido con **Web Audio API** que produce un paisaje sonoro espacial inmersivo. Todo el audio es sintetizado en tiempo real (sin archivos de audio externos).

**Archivo principal:** `src/hooks/useSpatialAudio.ts`

```
Oscillators / Noise → Efectos (Phaser, Reverb, Filtros) → Master Gain → Destino (altavoces)
```

---

## Master Gain — Control de Volumen y Silencio

```
masterGain → audioCtx.destination
```

Un nodo `GainNode` global por el que pasa absolutamente todo el audio. Al silenciar, se asigna `setValueAtTime(0)` — corte instantáneo, sin rampas. Al activar, se restaura el volumen del usuario.

- **Variable:** `masterGain`
- **Función:** `getMasterGain()` — singleton, crea el `AudioContext` si no existe

---

## 1. Phaser — Efecto de Barrido Espacial

```
createPhaser()
```

### ¿Qué es un Phaser?

Un phaser es un efecto de modulación que crea un barrido de fase ("swoosh") característico del espacio. Funciona combinando la señal original con una copia desfasada mediante **filtros allpass en serie**.

### Implementación

- **6 filtros allpass** (`BiquadFilterNode`, tipo `"allpass"`) en cascada
- Frecuencias base: `400, 700, 1000, 1300, 1600, 1900 Hz` (escalonadas por etapa)
- **LFO** (Low Frequency Oscillator) senoidal a **0.08 Hz** que modula la frecuencia de todos los allpass filters simultáneamente
- Profundidad de modulación: **±1200 Hz**
- Factor Q: `2` (suave)

```
Señal → Gain → Allpass×6 → Destino
                ↑
           LFO (0.08Hz, ±1200Hz)
```

### Tecnología usada

| Clase Web Audio API | Propósito |
|---|---|
| `BiquadFilterNode` (type `"allpass"`) | Desfase de frecuencia variable |
| `OscillatorNode` | LFO de modulación |
| `GainNode` | Control de profundidad del LFO |

---

## 2. Reverb — Reverberación de Ambiente Espacial

```
createReverb()
```

Reverb sintética tipo **Schroeder** con 4 líneas de delay en paralelo, feedback y filtrado.

### Estructura

```
Señal seca → DryGain → Destino
Señal húmeda → WetGain → Splitter estéreo
                              ├→ LeftDelay (0.07s)
                              ├→ RightDelay (0.11s)
                              ├→ Delay1 (0.08s) → Feedback1 (0.4)
                              ├→ Delay2 (0.12s) → Feedback2 (0.35)
                              ├→ Delay3 (0.17s) → Feedback3 (0.3)
                              └→ Delay4 (0.23s) → Feedback4 (0.25)
                                                  ↓
                                            Filtro LP 3kHz
                                                  ↓
                                            Realimentación
```

### Parámetros

| Parámetro | Valor |
|---|---|
| Tiempos de delay | 0.08, 0.12, 0.17, 0.23 s |
| Feedback | 0.4, 0.35, 0.3, 0.25 |
| Filtro lowpass | 3000 Hz |
| Mezcla wet | 35% |

### Tecnología usada

| Clase Web Audio API | Propósito |
|---|---|
| `DelayNode` | Líneas de retardo |
| `GainNode` | Feedback y mezcla |
| `ChannelSplitterNode` | Separación estéreo L/R |
| `ChannelMergerNode` | Re-combinación estéreo |
| `BiquadFilterNode` (lowpass) | Amortiguación de altas frecuencias |

---

## 3. Twinkler de Estrellas — Titileo Estelar

```
createStarTwinkler()
```

16 "estrellas" virtuales que generan tonos suaves y aleatorios simulando el titileo de estrellas.

### Algoritmo

1. Cada estrella tiene un **panorama estéreo** fijo y aleatorio (pan: −0.8 a +0.8)
2. Un filtro **bandpass** con frecuencia central aleatoria (800–3200 Hz) y Q = 6–10
3. Cada estrella programa su próximo titileo con un intervalo aleatorio (2–8 segundos)
4. Cada titileo crea un **oscilador one-shot** con envolvente ADSR:
   - **Attack:** 0.3–0.8 s (fade in suave)
   - **Sustain:** 0.4–1.2 s
   - **Release:** 0.6–1.8 s (fade out suave)
   - Frecuencia ligeramente variada (±50 Hz) para riqueza armónica
5. El titileo se programa recursivamente con `setTimeout` basado en `ctx.currentTime`

### Envolvente de cada titileo

```
Volumen
  ↑
  |        _________
  |       /         \
  |      /           \
  |     /             \
  |    /               \
  |   /                 \
  |  /                   \
  | /                     \
  └────────────────────────────→ Tiempo
    attack    sustain    release
   0.3-0.8s  0.4-1.2s  0.6-1.8s
```

### Tecnología usada

| Clase Web Audio API | Propósito |
|---|---|
| `OscillatorNode` (type `"sine"`) | Tono de la estrella (one-shot) |
| `GainNode` | Envolvente de amplitud |
| `StereoPannerNode` | Posición estéreo de la estrella |
| `BiquadFilterNode` (bandpass) | Timbre campana/estelar |
| `setTimeout` | Scheduling asíncrono |

---

## 4. Viento Estelar — Ambiente de Fondo

```
createSpaceWind()
```

Ruido blanco filtrado que simula el viento interestelar.

### Implementación

- Buffer de ruido blanco generado proceduralmente (2 segundos)
- Filtro **lowpass** a 400 Hz (modulado por LFO)
- Filtro **highpass** a 80 Hz (elimina subgraves)
- LFO senoidal a **0.03 Hz** modula la frecuencia del lowpass en ±350 Hz
- LFO senoidal a **0.06 Hz** modula el volumen en ±0.03
- Volumen base: 0.06

### Tecnología usada

| Clase Web Audio API | Propósito |
|---|---|
| `AudioBuffer` + `BufferSourceNode` | Ruido blanco |
| `BiquadFilterNode` (lowpass/highpass) | Modelado espectral |
| `OscillatorNode` | LFOs de modulación |
| `GainNode` | Volumen y modulación |

---

## 5. Pad Sideral — Base Armónica

```
createPadTone()
```

Capa armónica de fondo (drone) utilizando 3 osciladores ligeramente desafinados.

### Implementación

- **Osc1:** Senoidal a frecuencia base −5 cents
- **Osc2:** Senoidal a frecuencia base +5 cents
- **Osc3:** Triangular al doble de frecuencia base −2.5 cents
- Filtro **lowpass** a 600 Hz, Q = 3
- Dos pads: 32 Hz (subgrave) y 24 Hz (infra grave)
- Fade in lento de 0.5–1.5 segundos al inicio

### Tecnología usada

| Clase Web Audio API | Propósito |
|---|---|
| `OscillatorNode` (sine/triangle) | Generación de tono |
| `GainNode` | Mezcla y volumen |
| `BiquadFilterNode` (lowpass) | Suavizado espectral |
| `detune` (propiedad) | Desafinación sutil entre osciladores |

---

## 6. Tonos de Planetas — Sonido Espacial por Planeta

```
createPlanetTone()
```

Cada planeta tiene su propio tono sutil que cambia según la selección.

### Comportamiento

| Estado | Volumen del tono | Frecuencia |
|---|---|---|
| Planeta seleccionado | 50% del volumen global | 80 + (índice × 40) Hz |
| Otro planeta (cuando hay selección) | 3% del volumen global | — |
| Sin selección | 7% del volumen global | 60 + (índice × 30) Hz |

### Tecnología usada

| Clase Web Audio API | Propósito |
|---|---|
| `OscillatorNode` | Tono base del planeta |
| `GainNode` | Control de volumen |
| `BiquadFilterNode` (lowpass) | Suavizado del tono |
| `setTargetAtTime` | Transiciones suaves de volumen |

---

## Flujo de Señal Completo

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

                    ←─────── FX Bus (con efectos) ───────→
```

---

## Tecnologías Web Audio API Utilizadas

| Nodo | Cantidad | Uso |
|---|---|---|
| `AudioContext` | 1 | Contexto global de audio |
| `GainNode` | ~15 | Control de volumen, mezcla, modulación |
| `OscillatorNode` | ~25 | Tonos, LFOs, twinkles |
| `BiquadFilterNode` | 16 | Allpass (phaser), lowpass (reverb), bandpass (twinkles) |
| `DelayNode` | 6 | Reverb (4 feedback + 2 pre-delay) |
| `StereoPannerNode` | 16 | Posición estéreo de estrellas |
| `BufferSourceNode` | 1 | Ruido blanco del viento |
| `ChannelSplitterNode` | 1 | Separación L/R |
| `ChannelMergerNode` | 1 | Re-combinación L/R |

---

## Control desde la UI

| Elemento | Acción |
|---|---|
| Switch "Sonido Espacial" | `toggleSound()` en store |
| Slider de volumen | `setSoundVolume(0–1)` |
| Botón flotante mute | Mismo `toggleSound()` |
| Tecla `S` | Atajo de teclado |

Todas las modificaciones se hacen mediante `useSimStore` (Zustand), y el hook `useSpatialAudio()` reacciona automáticamente a los cambios.

---

## Rendimiento

- El `AudioContext` se crea bajo demanda (primer render)
- Los osciladores del pad y viento son permanentes (inician una vez)
- Los planet tones son 8 osciladores fijos con ganancia modulada
- Los twinkles de estrellas usan one-shots que se crean y destruyen (`osc.stop()`)
- El scheduling usa `setTimeout` + `ctx.currentTime` para precisión
- Todo se silencia instantáneamente mediante `masterGain.gain.setValueAtTime(0)`
