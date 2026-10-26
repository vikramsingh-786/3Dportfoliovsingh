'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei';

// Shared, non-reactive state read every frame.
// `chapter` is a float over the [data-chapter] sections; it only advances near the end of each
// section, so the crystal holds its side while you read and glides across between chapters.
const live = { chapter: 0, progress: 0, px: 0, py: 0 };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function measure() {
  const els = document.querySelectorAll<HTMLElement>('[data-chapter]');
  const mid = window.innerHeight * 0.5;
  let c = 0;
  els.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    if (r.top <= mid) c = i + smooth(0.8, 1, (mid - r.top) / Math.max(1, r.height));
  });
  live.chapter = c;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  live.progress = max > 0 ? window.scrollY / max : 0;
}

type Look = { compact: boolean; reduced: boolean; accent: string };

function Crystal({ compact, reduced, accent }: Look) {
  const group = useRef<THREE.Group>(null);
  const gem = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || !gem.current || !ring.current) return;
    const k = reduced ? 1000 : 3;
    // Even chapters: crystal on the right, odd: on the left (content takes the other side).
    const x = compact ? 0 : 2.3 * Math.cos(live.chapter * Math.PI);
    g.position.x = THREE.MathUtils.damp(g.position.x, x, k, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, (compact ? 0.9 : 0) + live.py * 0.15, k, dt);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, live.px * 0.35, k, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -live.py * 0.25 + live.progress * Math.PI, k, dt);
    if (!reduced) {
      gem.current.rotation.y += dt * 0.18;
      ring.current.rotation.z += dt * 0.25;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={gem} scale={compact ? 1.05 : 1.3}>
        <icosahedronGeometry args={[1.4, 0]} />
        {compact ? (
          // Cheaper glass for phones/tablets.
          <meshPhysicalMaterial transmission={1} thickness={1.2} roughness={0.08} ior={1.45} color="#ffffff" />
        ) : (
          <MeshTransmissionMaterial samples={6} resolution={512} thickness={1.3} roughness={0.04} ior={1.45} chromaticAberration={0.06} anisotropy={0.2} distortion={0.25} distortionScale={0.4} temporalDistortion={0.08} />
        )}
      </mesh>
      {/* Glowing core seen through the glass. */}
      <mesh scale={compact ? 0.32 : 0.4}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <mesh ref={ring} rotation={[1.2, 0.3, 0]} scale={compact ? 0.85 : 1}>
        <torusGeometry args={[2.35, 0.012, 8, 160]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Studio lighting built from Lightformers: no HDR download needed.
function Studio({ accent }: { accent: string }) {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        <Lightformer form="ring" color={accent} intensity={6} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={8} />
      </group>
    </Environment>
  );
}

export default function Scene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState<Look>({ compact: false, reduced: false, accent: '#FF5B1F' });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      const rgb = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().split(/\s+/).join(',');
      setLook({ compact: mq.matches, reduced: rm.matches, accent: `rgb(${rgb})` });
    };
    sync();
    mq.addEventListener('change', sync);
    rm.addEventListener('change', sync);
    const themeObs = new MutationObserver(sync);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const onMove = (e: PointerEvent) => {
      live.px = (e.clientX / window.innerWidth - 0.5) * 2;
      live.py = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('pointermove', onMove, { passive: true });

    // On compact screens the canvas lives in the hero only; stop rendering once it's off-screen.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);

    return () => {
      mq.removeEventListener('change', sync);
      rm.removeEventListener('change', sync);
      themeObs.disconnect();
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className={`pointer-events-none z-0 ${look.compact ? 'absolute inset-x-0 top-0 h-[100svh]' : 'fixed inset-0'}`}
    >
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, look.compact ? 1.5 : 2]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <Studio accent={look.accent} />
        <Crystal {...look} />
      </Canvas>
    </div>
  );
}
