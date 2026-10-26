'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, RoundedBox } from '@react-three/drei';

// A 4×3 macropad whose keys type by themselves; the corner key is the green "enter".
const COLS = 4;
const ROWS = 3;
const PITCH = 1.18;
const ACCENT_KEYS = new Set([3, 6, 11]);

type Look = { light: boolean; reduced: boolean };
const pointer = { x: 0, y: 0 };

function Pad({ light, reduced }: Look) {
  const tilt = useRef<THREE.Group>(null);
  const keys = useRef<(THREE.Mesh | null)[]>([]);
  const press = useRef<number[]>(Array(COLS * ROWS).fill(0));
  const nextAt = useRef(0);

  const capColor = light ? '#f4f4f8' : '#171c33';
  const baseColor = light ? '#d9d7e3' : '#070a16';
  const positions = useMemo(
    () =>
      Array.from({ length: COLS * ROWS }, (_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        return [(c - (COLS - 1) / 2) * PITCH, 0, (r - (ROWS - 1) / 2) * PITCH] as const;
      }),
    []
  );

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    // "Typing": press a random key (sometimes two) every 120–420ms.
    if (!reduced && t > nextAt.current) {
      const n = Math.random() < 0.25 ? 2 : 1;
      for (let k = 0; k < n; k++) press.current[Math.floor(Math.random() * press.current.length)] = 1;
      nextAt.current = t + 0.12 + Math.random() * 0.3;
    }
    keys.current.forEach((m, i) => {
      if (!m) return;
      press.current[i] = Math.max(0, press.current[i] - dt * 4.5);
      m.position.y = 0.32 - press.current[i] * 0.2;
      const mat = m.material as THREE.MeshStandardMaterial;
      if (ACCENT_KEYS.has(i)) mat.emissiveIntensity = 0.6 + press.current[i] * 1.6;
    });
    if (tilt.current) {
      const k = reduced ? 1000 : 3;
      tilt.current.rotation.x = THREE.MathUtils.damp(tilt.current.rotation.x, 0.62 + pointer.y * 0.18, k, dt);
      tilt.current.rotation.y = THREE.MathUtils.damp(tilt.current.rotation.y, -0.55 + pointer.x * 0.3, k, dt);
    }
  });

  return (
    <Float speed={reduced ? 0 : 1.4} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={tilt} rotation={[0.62, -0.55, 0]}>
        {/* Base plate */}
        <RoundedBox args={[COLS * PITCH + 0.45, 0.35, ROWS * PITCH + 0.45]} radius={0.16} smoothness={4} position={[0, -0.05, 0]}>
          <meshStandardMaterial color={baseColor} metalness={0.35} roughness={0.45} />
        </RoundedBox>
        {positions.map((p, i) => (
          <RoundedBox
            key={i}
            ref={(m: THREE.Mesh | null) => {
              keys.current[i] = m;
            }}
            args={[1, 0.42, 1]}
            radius={0.13}
            smoothness={4}
            position={[p[0], 0.32, p[2]]}
          >
            {ACCENT_KEYS.has(i) ? (
              <meshStandardMaterial color="#22c55e" emissive="#4ade80" emissiveIntensity={0.6} roughness={0.35} />
            ) : (
              <meshStandardMaterial color={capColor} roughness={0.42} metalness={0.08} />
            )}
          </RoundedBox>
        ))}
        {/* Green under-glow */}
        <pointLight position={[0, -0.6, 0]} color="#4ade80" intensity={6} distance={6} />
      </group>
    </Float>
  );
}

// Studio lighting from Lightformers: no HDR download.
function Studio() {
  return (
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={3} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
        <Lightformer form="circle" intensity={1.5} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
        <Lightformer form="rect" intensity={1.5} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 4, 1]} />
        <Lightformer form="ring" color="#4ade80" intensity={3} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={6} />
      </group>
    </Environment>
  );
}

export default function Keypad() {
  const wrap = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState<Look>({ light: false, reduced: false });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setLook({ light: document.documentElement.dataset.theme === 'light', reduced: rm.matches });
    sync();
    rm.addEventListener('change', sync);
    const themeObs = new MutationObserver(sync);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    // Stop rendering when the hero is off-screen.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      rm.removeEventListener('change', sync);
      themeObs.disconnect();
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none h-full w-full">
      <Canvas frameloop={visible ? 'always' : 'never'} dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 35 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={look.light ? 0.9 : 0.45} />
        <directionalLight position={[4, 8, 6]} intensity={look.light ? 1.2 : 0.9} />
        <Studio />
        <Pad {...look} />
      </Canvas>
    </div>
  );
}
