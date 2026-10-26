'use client';

import { useEffect, useRef } from 'react';

// Decorative GitHub-style contribution grid: 7 days × 30 weeks, levels from a fixed pseudo-random
// pattern that trends upward over time. Some cells pulse in slow diagonal waves.
const WEEKS = 30;
const DAYS = 7;
const CELL = 11;
const GAP = 3;

function level(w: number, d: number) {
  const n = Math.sin(w * 12.9898 + d * 78.233) * 43758.5453;
  const r = n - Math.floor(n); // 0..1, deterministic
  const t = w / WEEKS; // later weeks are busier
  const v = r * 0.75 + t * 0.45;
  return v < 0.35 ? 0 : v < 0.55 ? 1 : v < 0.75 ? 2 : v < 0.95 ? 3 : 4;
}

const FILL = ['rgb(var(--line))', 'rgb(var(--accent) / 0.22)', 'rgb(var(--accent) / 0.42)', 'rgb(var(--accent) / 0.68)', 'rgb(var(--accent))'];

function Contributions({ className }: { className: string }) {
  const w = WEEKS * (CELL + GAP) - GAP;
  const h = DAYS * (CELL + GAP) - GAP;
  return (
    <svg aria-hidden viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMax meet" className={className}>
      {Array.from({ length: WEEKS }, (_, x) =>
        Array.from({ length: DAYS }, (_, y) => {
          const lv = level(x, y);
          const pulse = lv >= 2 && (x + y) % 3 === 0;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * (CELL + GAP)}
              y={y * (CELL + GAP)}
              width={CELL}
              height={CELL}
              rx={2.5}
              fill={FILL[lv]}
              className={pulse ? 'cell-pulse' : undefined}
              style={pulse ? { animationDelay: `${((x + y) % 12) * 0.35}s` } : undefined}
            />
          );
        })
      )}
    </svg>
  );
}

/**
 * Fixed page backdrop: grid, green halo and a contribution graph whose cells pulse in waves.
 * Sections scroll over it; only a dim layer's opacity changes with scroll, so text-heavy
 * sections sit on a calmer background.
 */
export default function Background() {
  const dim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      if (dim.current) dim.current.style.opacity = String(p * 0.55);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: 'linear-gradient(rgb(var(--glow-soft)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--glow-soft)) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
          maskImage: 'radial-gradient(ellipse 95% 80% at 50% 45%, #000 20%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 80% at 50% 45%, #000 20%, transparent 90%)',
        }}
      />
      <div
        className="halo absolute left-1/2 top-[38%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl lg:left-[70%] lg:top-[48%] lg:h-[44rem] lg:w-[44rem]"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--glow-deep) / 0.6), transparent)' }}
      />
      <Contributions className="absolute inset-x-4 top-[14%] h-[22%] opacity-40 [mask-image:linear-gradient(to_bottom,#000_40%,transparent)] lg:inset-x-auto lg:bottom-[6%] lg:right-[3%] lg:top-auto lg:h-[34%] lg:w-[52%] lg:opacity-50 lg:[mask-image:linear-gradient(to_right,transparent,#000_35%)]" />
      <div ref={dim} className="absolute inset-0 bg-bg" style={{ opacity: 0, willChange: 'opacity' }} />
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
}
