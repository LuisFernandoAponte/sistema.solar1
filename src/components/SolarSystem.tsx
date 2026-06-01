import { useEffect, useRef, useMemo, useState, Suspense, memo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { PLANETS, SUN, type PlanetData } from "@/data/planets";
import { SHOWERS } from "@/data/meteorShowers";
import { useSimStore } from "@/store/useSimStore";
import { useIsMobile } from "@/hooks/use-mobile";

// Suppress THREE.Clock deprecation warning (comes from @react-three/fiber internally)
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) return;
  originalWarn.apply(console, args);
};

// Custom timer to avoid THREE.Clock
function useElapsedTime() {
  const startRef = useRef(performance.now());
  const getElapsed = useCallback(() => (performance.now() - startRef.current) / 1000, []);
  return getElapsed;
}

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius]);
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return (
    <line>
      <primitive object={geom} attach="geometry" />
      <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </line>
  );
}

// Memoize OrbitRing to prevent unnecessary re-renders
const MemoOrbitRing = memo(OrbitRing);

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedPlanet } = useSimStore();
  useFrame((_, dt) => {
    if (meshRef.current) meshRef.current.rotation.y += dt * 0.05;
  });
  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); setSelectedPlanet(SUN.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[SUN.radius, 64, 64]} />
        <meshBasicMaterial color={SUN.color} />
      </mesh>
      <mesh
        scale={1.15 + (hovered ? 0.05 : 0)}
        onClick={(e) => { e.stopPropagation(); setSelectedPlanet(SUN.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial color="#FDB813" transparent opacity={0.18} />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[SUN.radius, 32, 32]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

// Memoize Sun
const MemoSun = memo(Sun);

function Rings({ inner, outer }: { inner: number; outer: number }) {
  return (
    <mesh rotation={[Math.PI / 2.4, 0, 0]}>
      <ringGeometry args={[inner, outer, 96]} />
      <meshBasicMaterial color="#EAD6B8" side={THREE.DoubleSide} transparent opacity={0.55} />
    </mesh>
  );
}

function Planet({ data, angleOffset }: { data: PlanetData; angleOffset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const moonsRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { timeScale, paused, selectedPlanet, showLabels, setSelectedPlanet } = useSimStore();
  const selected = selectedPlanet === data.id;
  const getTime = useElapsedTime();

  // Orbital speed proportional to 1/sqrt(distance) (Keplerian-ish), normalized
  const orbitalSpeed = 0.15 / Math.sqrt(data.distance / 9);

  useFrame((_, dt) => {
    if (paused) return;
    const t = getTime() * timeScale * orbitalSpeed + angleOffset;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * data.distance;
      groupRef.current.position.z = Math.sin(t) * data.distance;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += dt * timeScale * 0.3 * Math.sign(data.rotationPeriod || 1);
    }
    if (moonsRef.current) {
      moonsRef.current.rotation.y += dt * timeScale * 0.0;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        rotation={[THREE.MathUtils.degToRad(data.axialTilt), 0, 0]}
        onClick={(e) => { e.stopPropagation(); setSelectedPlanet(data.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[data.radius, 64, 64]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.85}
          metalness={0.05}
          emissive={data.color}
          emissiveIntensity={hovered || selected ? 0.35 : 0.08}
        />
      </mesh>

      {/* Atmosphere glow for Earth/Venus/Neptune */}
      {(data.id === "earth" || data.id === "venus" || data.id === "neptune") && (
        <mesh scale={1.08}>
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshBasicMaterial color={data.id === "venus" ? "#F4E4B8" : data.id === "neptune" ? "#5A78D8" : "#4A90D9"} transparent opacity={0.18} />
        </mesh>
      )}

      {data.hasRings && (
        <Rings inner={data.radius * 1.4} outer={data.radius * 2.3} />
      )}

      {/* Selection ring */}
      {selected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.radius * 1.5, data.radius * 1.6, 64]} />
          <meshBasicMaterial color="#FDB813" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Moons */}
      {data.satellites && (
        <group ref={moonsRef}>
          {data.satellites.map((m, i) => (
            <Moon key={m.name} moon={m} offset={i * 1.3} />
          ))}
        </group>
      )}

      <Html position={[0, data.radius + 1, 0]} center distanceFactor={18} style={{ pointerEvents: "none", transition: "opacity 0.3s" }}>
        <div className={`text-[10px] font-mono-data px-2 py-1 rounded-lg whitespace-nowrap transition-all duration-500 ${
          selected
            ? "bg-solar/20 border border-solar/40 text-solar shadow-[0_0_12px_rgba(253,184,19,0.15)]"
            : hovered
              ? "bg-white/10 border border-white/20 text-white"
              : showLabels
                ? "bg-white/5 border border-white/10 text-white/70"
                : "bg-transparent border-transparent text-transparent"
        }`}>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full" style={{ background: data.color }} />
            <span>{data.name}</span>
          </span>
        </div>
      </Html>
    </group>
  );
}

// Memoize Planet with custom comparison
const MemoPlanet = memo(
  Planet,
  (prevProps, nextProps) => {
    return (
      prevProps.data.id === nextProps.data.id &&
      prevProps.angleOffset === nextProps.angleOffset
    );
  }
);

function Moon({ moon, offset }: { moon: NonNullable<PlanetData["satellites"]>[number]; offset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { timeScale, paused, selectedPlanet, setSelectedPlanet } = useSimStore();
  const getTime = useElapsedTime();
  const [hovered, setHovered] = useState(false);
  const selected = selectedPlanet === "moon";
  useFrame(() => {
    if (paused || !groupRef.current) return;
    const t = getTime() * timeScale * (1.5 / moon.period) + offset;
    groupRef.current.position.x = Math.cos(t) * moon.distance;
    groupRef.current.position.z = Math.sin(t) * moon.distance;
  });
  return (
    <group ref={groupRef}>
      <mesh
        onClick={(e) => { e.stopPropagation(); setSelectedPlanet("moon"); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[moon.radius, 24, 24]} />
        <meshStandardMaterial
          color="#F0F0F0"
          emissive="#FFFFFF"
          emissiveIntensity={0.15 + (hovered ? 0.25 : 0) + (selected ? 0.3 : 0)}
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      {/* Selection ring */}
      {selected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[moon.radius * 1.8, moon.radius * 2, 48]} />
          <meshBasicMaterial color="#FDB813" side={THREE.DoubleSide} />
        </mesh>
      )}

      <Html position={[0, moon.radius + 0.5, 0]} center distanceFactor={14} style={{ pointerEvents: "none", transition: "opacity 0.3s" }}>
        <div className={`text-[9px] font-mono-data px-1.5 py-0.5 rounded-lg whitespace-nowrap transition-all duration-500 ${
          selected
            ? "bg-solar/20 border border-solar/40 text-solar shadow-[0_0_12px_rgba(253,184,19,0.15)]"
            : hovered
              ? "bg-white/15 border border-white/30 text-white"
              : "bg-white/5 border border-white/10 text-white/60"
        }`}>
          <span className="flex items-center gap-1">
            <span className="size-1 rounded-full bg-white" />
            <span>Luna</span>
          </span>
        </div>
      </Html>
    </group>
  );
}

// Memoize Moon
const MemoMoon = memo(Moon);

function createCircleTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.1, "rgba(255,255,255,0.95)");
  g.addColorStop(0.4, "rgba(255,255,255,0.6)");
  g.addColorStop(0.7, "rgba(255,255,255,0.2)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function MeteorShowerFx() {
  const { showMeteors, activeMeteorShower } = useSimStore();
  const shower = SHOWERS.find((s) => s.id === activeMeteorShower) ?? SHOWERS[1];
  const count = Math.min(250, Math.max(60, Math.floor(shower.thz * 1.8)));

  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const circleTex = useMemo(() => createCircleTexture(), []);

  const { positions, velocities, sizes, opacities, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const op = new Float32Array(count);
    const lp = new Float32Array(count * 2 * 3);

    for (let i = 0; i < count; i++) {
      // Spread meteors in a visible cone from a radiant-like area
      const angle = Math.random() * Math.PI * 2;
      const spread = 40 + Math.random() * 80;
      const x = Math.cos(angle) * spread;
      const y = 50 + Math.random() * 60;
      const z = Math.sin(angle) * spread - 30;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const vAngle = Math.atan2(x, z + 30);
      const speed = 1.5 + Math.random() * 2;
      vel[i * 3] = Math.sin(vAngle) * speed * 0.3;
      vel[i * 3 + 1] = -(1.5 + Math.random() * 2.5);
      vel[i * 3 + 2] = Math.cos(vAngle) * speed * 0.3;

      sz[i] = 0.6 + Math.random() * 1.8;
      op[i] = 0.6 + Math.random() * 0.4;

      // Tail: behind the head
      const tx = x - vel[i * 3] * 8;
      const ty = y - vel[i * 3 + 1] * 8;
      const tz = z - vel[i * 3 + 2] * 8;
      lp[i * 6] = tx;
      lp[i * 6 + 1] = ty;
      lp[i * 6 + 2] = tz;
      lp[i * 6 + 3] = x;
      lp[i * 6 + 4] = y;
      lp[i * 6 + 5] = z;
    }
    return { positions: pos, velocities: vel, sizes: sz, opacities: op, linePositions: lp };
  }, [count]);

  const sparklePositions = useMemo(() => {
    const sp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      sp[i * 3] = (Math.random() - 0.5) * 2;
      sp[i * 3 + 1] = (Math.random() - 0.5) * 2;
      sp[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return sp;
  }, [count]);

  useFrame(() => {
    if (!showMeteors || !pointsRef.current || !linesRef.current || !glowRef.current) return;

    const pArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const lArr = linesRef.current.geometry.attributes.position.array as Float32Array;
    const gArr = glowRef.current.geometry.attributes.position.array as Float32Array;
    const sizeArr = pointsRef.current.geometry.attributes.size.array as Float32Array;
    const opArr = pointsRef.current.geometry.attributes.opacity.array as Float32Array;
    if (!pArr || !lArr || !gArr) return;

    for (let i = 0; i < count; i++) {
      pArr[i * 3] += velocities[i * 3] * 1.5;
      pArr[i * 3 + 1] += velocities[i * 3 + 1] * 1.5;
      pArr[i * 3 + 2] += velocities[i * 3 + 2] * 1.5;

      if (pArr[i * 3 + 1] < -15) {
        const angle = Math.random() * Math.PI * 2;
        const spread = 40 + Math.random() * 80;
        pArr[i * 3] = Math.cos(angle) * spread;
        pArr[i * 3 + 1] = 50 + Math.random() * 60;
        pArr[i * 3 + 2] = Math.sin(angle) * spread - 30;

        const vAngle = Math.atan2(pArr[i * 3], pArr[i * 3 + 2] + 30);
        const speed = 1.5 + Math.random() * 2;
        velocities[i * 3] = Math.sin(vAngle) * speed * 0.3;
        velocities[i * 3 + 1] = -(1.5 + Math.random() * 2.5);
        velocities[i * 3 + 2] = Math.cos(vAngle) * speed * 0.3;

        sizeArr[i] = 0.6 + Math.random() * 1.8;
        opArr[i] = 0.6 + Math.random() * 0.3;
      }

      const tx = pArr[i * 3] - velocities[i * 3] * 8;
      const ty = pArr[i * 3 + 1] - velocities[i * 3 + 1] * 8;
      const tz = pArr[i * 3 + 2] - velocities[i * 3 + 2] * 8;

      lArr[i * 6] = tx;
      lArr[i * 6 + 1] = ty;
      lArr[i * 6 + 2] = tz;
      lArr[i * 6 + 3] = pArr[i * 3];
      lArr[i * 6 + 4] = pArr[i * 3 + 1];
      lArr[i * 6 + 5] = pArr[i * 3 + 2];

      // Glow follows head
      gArr[i * 3] = pArr[i * 3] + (Math.random() - 0.5) * 1.5;
      gArr[i * 3 + 1] = pArr[i * 3 + 1] + (Math.random() - 0.5) * 1.5;
      gArr[i * 3 + 2] = pArr[i * 3 + 2] + (Math.random() - 0.5) * 1.5;

      // Flicker
      if (Math.random() > 0.95) {
        sizeArr[i] *= 0.7 + Math.random() * 0.6;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
    pointsRef.current.geometry.attributes.opacity.needsUpdate = true;
    linesRef.current!.geometry.attributes.position.needsUpdate = true;
    glowRef.current!.geometry.attributes.position.needsUpdate = true;
  });

  if (!showMeteors) return null;

  return (
    <>
      {/* Tails */}
      <lineSegments ref={linesRef} renderOrder={1}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={shower.color} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </lineSegments>

      {/* Meteor heads - round particles */}
      <points ref={pointsRef} renderOrder={3}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-opacity" args={[opacities, 1]} />
        </bufferGeometry>
        <pointsMaterial
          map={circleTex}
          color={shower.color}
          size={1.6}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glow / sparkle aura around meteors */}
      <points ref={glowRef} renderOrder={2}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparklePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={circleTex}
          color="#FFFFFF"
          size={0.8}
          sizeAttenuation
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

function GalaxyBackground() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const total = 20000;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(total * 3);
    const col = new Float32Array(total * 4);
    const sz = new Float32Array(total);

    const tempColor = new THREE.Color();

    for (let i = 0; i < total; i++) {
      const isBright = i > total * 0.92;
      const zone = Math.random();

      let r: number, y: number, angle: number;

      if (zone < 0.25) {
        r = 60 + Math.random() * 340;
        angle = Math.random() * Math.PI * 2;
        y = (Math.random() - 0.5) * 60;
      } else if (zone < 0.4) {
        r = 27 + Math.random() * 8;
        angle = Math.random() * Math.PI * 2;
        y = (Math.random() - 0.5) * 2.5;
      } else if (zone < 0.55) {
        r = 75 + Math.random() * 25;
        angle = Math.random() * Math.PI * 2;
        y = (Math.random() - 0.5) * 6;
      } else if (zone < 0.75) {
        r = 130 + Math.random() * 220;
        angle = Math.random() * Math.PI * 2;
        y = (Math.random() - 0.5) * 80;
      } else {
        // Milky Way band
        r = 20 + Math.random() * 200;
        angle = Math.random() * Math.PI * 2;
        y = (Math.random() - 0.5) * 6;
      }

      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      const colorRoll = Math.random();
      if (colorRoll < 0.3) {
        tempColor.setHSL(0, 0, 0.7 + Math.random() * 0.3);
      } else if (colorRoll < 0.45) {
        tempColor.setHSL(0.6 + Math.random() * 0.15, 0.3, 0.5 + Math.random() * 0.35);
      } else if (colorRoll < 0.6) {
        tempColor.setHSL(0.08 + Math.random() * 0.05, 0.5, 0.5 + Math.random() * 0.3);
      } else if (colorRoll < 0.72) {
        tempColor.setHSL(0.01 + Math.random() * 0.03, 0.5, 0.3 + Math.random() * 0.2);
      } else if (colorRoll < 0.82) {
        tempColor.setHSL(0.75 + Math.random() * 0.1, 0.4, 0.35 + Math.random() * 0.2);
      } else if (colorRoll < 0.9) {
        tempColor.setHSL(0.5 + Math.random() * 0.1, 0.4, 0.35 + Math.random() * 0.2);
      } else {
        tempColor.setHSL(Math.random() * 0.15 + 0.1, 0.3, 0.6 + Math.random() * 0.3);
      }

      const alpha = isBright ? 0.6 + Math.random() * 0.4 : 0.06 + Math.random() * 0.15;
      col[i * 4] = tempColor.r;
      col[i * 4 + 1] = tempColor.g;
      col[i * 4 + 2] = tempColor.b;
      col[i * 4 + 3] = alpha;

      sz[i] = isBright ? 0.6 + Math.random() * 1.2 : 0.04 + Math.random() * 0.12;
    }
    return { positions: pos, colors: col, sizes: sz };
  }, []);

  useFrame((state, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.002;
    if (materialRef.current) {
      materialRef.current.opacity = 0.85 + 0.15 * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 0.3));
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 4]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.15}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene({ controlsRef }: { controlsRef: React.MutableRefObject<OrbitControlsImpl | null> }) {
  const { showOrbits, timeScale, paused, selectedPlanet, setSelectedPlanet } = useSimStore();
  const angleOffsets = useMemo(() => PLANETS.map((_, i) => (i * Math.PI * 2) / PLANETS.length), []);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const sunLightRef = useRef<THREE.PointLight>(null);
  const earthUmbraRef = useRef<THREE.Mesh>(null);

  // Eclipse
  const getTime = useElapsedTime();
  const earth = PLANETS.find((p) => p.id === "earth")!;
  const earthIdx = PLANETS.findIndex((p) => p.id === "earth");
  const earthOrbitalSpeed = 0.15 / Math.sqrt(earth.distance / 9);
  const moonData = earth.satellites![0];
  const earthAngleOffset = (earthIdx * Math.PI * 2) / PLANETS.length;
  const moonShadowRef = useRef<THREE.Mesh>(null);
  const eclipseRef = useRef(0);
  const [showEclipseLabel, setShowEclipseLabel] = useState(false);
  const coronaInnerRef = useRef<THREE.Mesh>(null);
  const coronaOuterRef = useRef<THREE.Mesh>(null);
  const diamondRef = useRef<THREE.Mesh>(null);

  // Camera fly-to eclipse view
  const animReady = useRef(false);
  const animActive = useRef(false);
  const animProgress = useRef(0);
  const startPos = useRef(new THREE.Vector3());
  const endPos = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    if (selectedPlanet === "solar-eclipse") {
      animReady.current = true;
    }
  }, [selectedPlanet]);

  useFrame(() => {
    if (paused) return;
    const t = getTime() * timeScale;

    const earthAngle = t * earthOrbitalSpeed + earthAngleOffset;
    const ex = Math.cos(earthAngle) * earth.distance;
    const ez = Math.sin(earthAngle) * earth.distance;

    const moonAngle = t * (1.5 / moonData.period);
    const mx = ex + Math.cos(moonAngle) * moonData.distance;
    const mz = ez + Math.sin(moonAngle) * moonData.distance;

    const sunToEarth = Math.sqrt(ex * ex + ez * ez);
    const sunToMoon = Math.sqrt(mx * mx + mz * mz);
    const moonToEarth = Math.sqrt((ex - mx) * (ex - mx) + (ez - mz) * (ez - mz));
    const dot = mx * ex + mz * ez;
    const cross2d = Math.abs(mx * ez - mz * ex);

    const isBetween = dot > 0 && sunToMoon < sunToEarth;
    const isAligned = moonToEarth < 8 && cross2d / sunToEarth < 2.2;

    let rawIntensity = 0;
    if (isBetween && isAligned && moonToEarth < 12) {
      const alignment = Math.max(0, 1 - cross2d / (sunToEarth * 2.2));
      const proximity = Math.max(0, 1 - moonToEarth / 12);
      rawIntensity = Math.min(1, alignment * proximity * 2.5);
    }

    eclipseRef.current += (rawIntensity - eclipseRef.current) * 0.06;
    const intensity = eclipseRef.current;

    if (ambientRef.current) {
      ambientRef.current.intensity = 0.15 * (1 - intensity * 0.85);
    }

    if (sunLightRef.current) {
      sunLightRef.current.intensity = 3 * (1 - intensity * 0.85);
    }

    if (moonShadowRef.current && intensity > 0.05) {
      const dirX = ex - mx;
      const dirZ = ez - mz;
      const len = Math.sqrt(dirX * dirX + dirZ * dirZ) || 1;
      const midX = mx + dirX * 0.5;
      const midZ = mz + dirZ * 0.5;
      const angle = Math.atan2(dirZ, dirX);
      moonShadowRef.current.position.set(midX, 0, midZ);
      moonShadowRef.current.rotation.y = -angle;
      const scale = Math.min(6, Math.max(0.8, len * 0.5)) * (intensity > 0.1 ? 1 : 0);
      moonShadowRef.current.scale.set(scale, 1, scale);
    }
    if (moonShadowRef.current) moonShadowRef.current.visible = intensity > 0.05;

    // Inner corona glow around Moon during totality
    if (coronaInnerRef.current) {
      coronaInnerRef.current.position.set(mx, 0, mz);
      const op = Math.max(0, (intensity - 0.25) / 0.75) * 0.6;
      (coronaInnerRef.current.material as THREE.MeshBasicMaterial).opacity = op;
      const scale = 0.4 + intensity * 3;
      coronaInnerRef.current.scale.setScalar(scale);
      coronaInnerRef.current.visible = intensity > 0.25;
    }

    // Outer corona (warmer glow)
    if (coronaOuterRef.current) {
      coronaOuterRef.current.position.set(mx, 0, mz);
      const op = Math.max(0, (intensity - 0.35) / 0.65) * 0.3;
      (coronaOuterRef.current.material as THREE.MeshBasicMaterial).opacity = op;
      const scale = 0.6 + intensity * 5;
      coronaOuterRef.current.scale.setScalar(scale);
      coronaOuterRef.current.visible = intensity > 0.35;
    }

    // Diamond ring effect (bright flash at Moon's edge)
    if (diamondRef.current) {
      const flash = Math.max(0, Math.sin(intensity * Math.PI * 1.8)) * 0.9;
      const angle = Math.atan2(ex - mx, ez - mz);
      const offsetX = Math.sin(angle) * 0.35;
      const offsetZ = Math.cos(angle) * 0.35;
      diamondRef.current.position.set(mx + offsetX, 0.1, mz + offsetZ);
      (diamondRef.current.material as THREE.MeshBasicMaterial).opacity = flash;
      const s = 0.3 + flash * 2.5;
      diamondRef.current.scale.setScalar(s);
      diamondRef.current.visible = flash > 0.05;
    }

    // Earth umbra (dark shadow covering Earth)
    if (earthUmbraRef.current) {
      earthUmbraRef.current.position.set(ex, 0, ez);
      (earthUmbraRef.current.material as THREE.MeshBasicMaterial).opacity = intensity * 0.8;
      const s = 1 + intensity * 0.35;
      earthUmbraRef.current.scale.setScalar(s);
      earthUmbraRef.current.visible = intensity > 0.05;
    }

    // Camera fly-to eclipse view
    if (animReady.current && controlsRef.current) {
      const earthPos = new THREE.Vector3(ex, 0, ez);
      const toSun = new THREE.Vector3(-ex, 0, -ez).normalize();
      const side = new THREE.Vector3().crossVectors(toSun, new THREE.Vector3(0, 1, 0)).normalize();
      startPos.current.copy(controlsRef.current.object.position);
      endPos.current.copy(earthPos).add(side.multiplyScalar(12)).add(new THREE.Vector3(0, 10, 0));
      lookAtTarget.current.copy(earthPos);
      animReady.current = false;
      animActive.current = true;
      animProgress.current = 0;
    }

    if (animActive.current && controlsRef.current) {
      animProgress.current = Math.min(1, animProgress.current + 0.015);
      const t = animProgress.current;
      const smooth = t * t * (3 - 2 * t);
      const c = controlsRef.current;
      c.object.position.lerpVectors(startPos.current, endPos.current, smooth);
      const curTarget = c.target.clone();
      c.target.lerpVectors(curTarget, lookAtTarget.current, smooth);
      c.update();
      if (t >= 1) animActive.current = false;
    }

    setShowEclipseLabel(intensity > 0.2);
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.15} />
      <pointLight ref={sunLightRef} intensity={3} distance={300} decay={1} color="#FDB813" />
      <GalaxyBackground />
      <MemoSun />
      {showOrbits && PLANETS.map((p) => <MemoOrbitRing key={p.id} radius={p.distance} />)}
      {PLANETS.map((p, i) => (
        <MemoPlanet key={p.id} data={p} angleOffset={angleOffsets[i]} />
      ))}
      <MeteorShowerFx />

      {/* Earth umbra — dark shadow covering Earth during eclipse */}
      <mesh ref={earthUmbraRef} visible={false}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Eclipse shadow cone */}
      <mesh ref={moonShadowRef} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[1, 1, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner corona — white glow of Sun's atmosphere during totality */}
      <mesh ref={coronaInnerRef} visible={false}>
        <ringGeometry args={[0.1, 1.5, 64]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer corona — warmer golden glow */}
      <mesh ref={coronaOuterRef} visible={false}>
        <ringGeometry args={[0.15, 3, 48]} />
        <meshBasicMaterial
          color="#FFE4B5"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Diamond ring — bright flash at edge of Moon */}
      <mesh ref={diamondRef} visible={false}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0} />
      </mesh>

      {/* Eclipse label */}
      {showEclipseLabel && (
        <Html position={[0, 20, 0]} center distanceFactor={18} style={{ pointerEvents: "auto" }}>
          <div
            onClick={(e) => { e.stopPropagation(); setSelectedPlanet("solar-eclipse"); }}
            className="px-4 py-2 rounded-xl bg-black/60 border border-solar/50 text-solar text-sm font-display font-bold whitespace-nowrap shadow-[0_0_20px_rgba(253,184,19,0.3)] animate-pulse-soft cursor-pointer hover:bg-black/80 hover:border-solar transition-all"
          >
            🌑 ECLIPSE SOLAR
          </div>
        </Html>
      )}

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.9}
        zoomSpeed={0.95}
        panSpeed={0.6}
        minDistance={1.5}
        maxDistance={220}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.48}
        screenSpacePanning
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
    </>
  );
}

export function SolarSystem() {
  const store = useSimStore();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!store.keyboardEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (!controlsRef.current || target.matches("input, textarea, button")) return;

      const ctrl = controlsRef.current as any;
      const rotateStep = 0.08;
      const panStep = 0.18;
      const zoomFactor = 1.08;
      let handled = false;

      if (event.key === "+" || event.key === "=") {
        ctrl.dollyIn(zoomFactor);
        handled = true;
      }

      if (event.key === "-") {
        ctrl.dollyOut(zoomFactor);
        handled = true;
      }

      if (event.key.startsWith("Arrow")) {
        if (event.shiftKey) {
          if (event.key === "ArrowUp") {
            ctrl.panUp(panStep);
          } else if (event.key === "ArrowDown") {
            ctrl.panUp(-panStep);
          } else if (event.key === "ArrowLeft") {
            ctrl.panLeft(panStep, ctrl.object);
          } else if (event.key === "ArrowRight") {
            ctrl.panLeft(-panStep, ctrl.object);
          }
        } else {
          if (event.key === "ArrowUp") {
            ctrl.rotateUp(rotateStep);
          } else if (event.key === "ArrowDown") {
            ctrl.rotateUp(-rotateStep);
          } else if (event.key === "ArrowLeft") {
            ctrl.rotateLeft(rotateStep);
          } else if (event.key === "ArrowRight") {
            ctrl.rotateLeft(-rotateStep);
          }
        }
        handled = true;
      }

      if (handled) {
        event.preventDefault();
        ctrl.update();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [store.keyboardEnabled]);

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 35, 55], fov: 55, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <Scene controlsRef={controlsRef} />
        </Suspense>
      </Canvas>


    </div>
  );
}
