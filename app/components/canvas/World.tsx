'use client';

import { Suspense, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, useTexture } from '@react-three/drei';
import { updateStation, world } from '../../lib/scroll';

const GAP = 30; // z distance between stations
const PALETTES = {
  dark: { bg: '#0B1730', star: '#ECE8DC', accent: '#EFEE32', amber: '#FF5A4F', ice: '#6C9BE0', ambient: 0.6 },
  light: { bg: '#ECE8DC', star: '#17376F', accent: '#E4332A', amber: '#244A98', ice: '#E6C500', ambient: 1.1 },
};
const PalCtx = createContext(PALETTES.dark);
const usePal = () => useContext(PalCtx);

type Env = { mobile: boolean; reduced: boolean; light: boolean };

// Anything that spins: speed is zeroed for reduced-motion users.
function useSpin(ref: React.RefObject<THREE.Object3D>, speed: [number, number], reduced: boolean) {
  useFrame((_, dt) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.x += dt * speed[0];
    ref.current.rotation.y += dt * speed[1];
  });
}

// Camera flies down -z as the page scrolls; pointer adds a little parallax.
function Rig({ reduced }: { reduced: boolean }) {
  useFrame(({ camera }, dt) => {
    const s = world.station;
    const k = reduced ? 50 : 3;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, -s * GAP, k, dt);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(s * 1.3) * 1.2 + world.px * 0.8, k, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, Math.cos(s * 0.9) * 0.6 + world.py * 0.5, k, dt);
    camera.lookAt(camera.position.x * 0.4, camera.position.y * 0.4, camera.position.z - 10);
  });
  return null;
}

// Star tunnel along the whole flight path.
function Stars({ count }: { count: number }) {
  const pal = usePal();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 90;
      a[i * 3 + 1] = (Math.random() - 0.5) * 60;
      a[i * 3 + 2] = 30 - Math.random() * (GAP * 6 + 60);
    }
    return a;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color={pal.star} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Station 0 — planet built from the textures already in /public/planets.
function Planet({ reduced }: { reduced: boolean }) {
  const [surface, clouds] = useTexture(['/planets/textures/Planet_baseColor.png', '/planets/textures/Clouds_baseColor.png']);
  const pal = usePal();
  const planet = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.Mesh>(null);
  useSpin(planet, [0, 0.06], reduced);
  useSpin(cloud, [0, 0.09], reduced);
  return (
    <group rotation={[0.35, 0, 0.2]}>
      <mesh ref={planet}>
        <sphereGeometry args={[3.4, 64, 64]} />
        <meshStandardMaterial map={surface} roughness={0.9} />
      </mesh>
      <mesh ref={cloud}>
        <sphereGeometry args={[3.48, 64, 64]} />
        <meshStandardMaterial map={clouds} transparent opacity={0.55} depthWrite={false} />
      </mesh>
      <mesh scale={1.12}>
        <sphereGeometry args={[3.4, 48, 48]} />
        <meshBasicMaterial color={pal.accent} side={THREE.BackSide} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Ring({ radius, tilt, color, speed, reduced }: { radius: number; tilt: [number, number, number]; color: string; speed: number; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useSpin(ref, [0, speed], reduced);
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, 0.018, 8, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function HeroStation({ reduced }: { reduced: boolean }) {
  const { accent: ACCENT, amber: AMBER, ice: ICE } = usePal();
  return (
    <group>
      <Suspense fallback={null}>
        <Planet reduced={reduced} />
      </Suspense>
      <Ring radius={4.9} tilt={[1.25, 0.2, 0]} color={ACCENT} speed={0.15} reduced={reduced} />
      <Ring radius={5.8} tilt={[1.0, -0.3, 0.4]} color={AMBER} speed={-0.1} reduced={reduced} />
    </group>
  );
}

function AboutStation({ reduced }: { reduced: boolean }) {
  const { accent: ACCENT, amber: AMBER, ice: ICE } = usePal();
  const ref = useRef<THREE.Mesh>(null);
  useSpin(ref, [0.12, 0.2], reduced);
  return (
    <Float speed={reduced ? 0 : 1.5} floatIntensity={1.5}>
      <mesh ref={ref} scale={1.5}>
        <torusKnotGeometry args={[1, 0.32, 160, 20]} />
        <meshStandardMaterial color={ACCENT} metalness={0.9} roughness={0.2} wireframe />
      </mesh>
    </Float>
  );
}

function ServicesStation({ reduced }: { reduced: boolean }) {
  const { accent: ACCENT, amber: AMBER, ice: ICE } = usePal();
  const group = useRef<THREE.Group>(null);
  useSpin(group, [0, 0.15], reduced);
  const items = Array.from({ length: 6 });
  return (
    <group ref={group} rotation={[0.4, 0, 0.2]}>
      {items.map((_, i) => {
        const a = (i / items.length) * Math.PI * 2;
        return (
          <Float key={i} speed={reduced ? 0 : 2} floatIntensity={1}>
            <mesh position={[Math.cos(a) * 4, Math.sin(a * 2) * 0.8, Math.sin(a) * 4]}>
              <octahedronGeometry args={[0.8]} />
              <meshStandardMaterial color={i % 2 ? AMBER : ICE} metalness={0.8} roughness={0.25} flatShading />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function TechStation({ reduced }: { reduced: boolean }) {
  const { accent: ACCENT, amber: AMBER, ice: ICE } = usePal();
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);
  useSpin(a, [0.3, 0], reduced);
  useSpin(b, [0, 0.4], reduced);
  useSpin(c, [0.2, 0.2], reduced);
  return (
    <group>
      <mesh ref={a}><torusGeometry args={[3.4, 0.04, 12, 128]} /><meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.6} /></mesh>
      <mesh ref={b}><torusGeometry args={[2.6, 0.04, 12, 128]} /><meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.6} /></mesh>
      <mesh ref={c}><torusGeometry args={[1.8, 0.04, 12, 128]} /><meshStandardMaterial color={ICE} emissive={ICE} emissiveIntensity={0.6} /></mesh>
      <mesh><icosahedronGeometry args={[0.8, 1]} /><meshStandardMaterial color="#ffffff" metalness={1} roughness={0.15} flatShading /></mesh>
    </group>
  );
}

function WorkStation({ reduced }: { reduced: boolean }) {
  const { accent: ACCENT, amber: AMBER, ice: ICE } = usePal();
  const ref = useRef<THREE.Mesh>(null);
  useSpin(ref, [0.1, 0.15], reduced);
  return (
    <mesh ref={ref} scale={2.4}>
      <icosahedronGeometry args={[1, 3]} />
      <MeshDistortMaterial color={ICE} wireframe distort={reduced ? 0 : 0.35} speed={reduced ? 0 : 1.5} />
    </mesh>
  );
}

function ContactStation({ reduced }: { reduced: boolean }) {
  const { accent: ACCENT, amber: AMBER, ice: ICE } = usePal();
  return (
    <group>
      <Float speed={reduced ? 0 : 1} floatIntensity={0.8}>
        <mesh scale={2.2}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={1.2} roughness={0.6} />
        </mesh>
      </Float>
      <pointLight color={AMBER} intensity={40} distance={30} />
      <Ring radius={4} tilt={[1.4, 0, 0.3]} color={AMBER} speed={0.2} reduced={reduced} />
    </group>
  );
}

const stations = [HeroStation, AboutStation, ServicesStation, TechStation, WorkStation, ContactStation];

function Scene({ mobile, reduced, light }: Env) {
  const pal = light ? PALETTES.light : PALETTES.dark;
  return (
    <PalCtx.Provider value={pal}>
      <color attach="background" args={[pal.bg]} />
      <fog attach="fog" args={[pal.bg, 25, 95]} />
      <ambientLight intensity={pal.ambient} />
      <directionalLight position={[8, 10, 6]} intensity={1.4} color="#ffffff" />
      <Rig reduced={reduced} />
      <Stars count={mobile ? 600 : 1800} />
      {stations.map((Station, i) => (
        // Objects sit right of centre on desktop so text can live on the left; centred (and dimmed by scrims) on mobile.
        <group key={i} position={[mobile ? 0 : (i % 2 ? -6.5 : 6.5), mobile ? 2 : 0, -i * GAP - 14]}>
          <Station reduced={reduced} />
        </group>
      ))}
    </PalCtx.Provider>
  );
}

export default function World() {
  const [env, setEnv] = useState<Env>({ mobile: false, reduced: false, light: true });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isLight = () => document.documentElement.dataset.theme === 'light';
    const sync = () => setEnv({ mobile: mq.matches, reduced: rm.matches, light: isLight() });
    const themeObs = new MutationObserver(sync);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    sync();
    mq.addEventListener('change', sync);
    rm.addEventListener('change', sync);

    const onScroll = () => updateStation();
    const onMove = (e: PointerEvent) => {
      world.px = (e.clientX / window.innerWidth - 0.5) * 2;
      world.py = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    updateStation();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('pointermove', onMove, { passive: true });
    // Section heights change as images/fonts load.
    const t = setTimeout(updateStation, 1200);
    return () => {
      mq.removeEventListener('change', sync);
      rm.removeEventListener('change', sync);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onMove);
      clearTimeout(t);
      themeObs.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas dpr={[1, env.mobile ? 1.5 : 1.75]} camera={{ position: [0, 0, 0], fov: 55, near: 0.1, far: 200 }} gl={{ powerPreference: 'high-performance' }}>
        <Scene {...env} />
      </Canvas>
    </div>
  );
}
