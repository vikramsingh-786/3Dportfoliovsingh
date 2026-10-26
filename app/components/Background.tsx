'use client';

import { useEffect, useRef } from 'react';

// Hand-tuned uptrend (SVG y grows downward): [open, close, high, low]
const CANDLES: [number, number, number, number][] = [
  [142, 134, 130, 148], [134, 139, 129, 143], [139, 127, 122, 141], [127, 121, 116, 131],
  [121, 126, 117, 130], [126, 111, 107, 128], [111, 103, 98, 115], [103, 108, 99, 113],
  [108, 93, 88, 110], [93, 86, 80, 97], [86, 90, 82, 95], [90, 75, 70, 92],
  [75, 67, 61, 79], [67, 71, 63, 76], [71, 55, 49, 74], [55, 47, 41, 59],
  [47, 51, 43, 56], [51, 36, 30, 54],
];
const UP = '#22c55e';
const DOWN = '#ef4444';
const STAGGER = 85;
const CHART_MS = (CANDLES.length - 1) * STAGGER + 500;

function Candles({ className }: { className: string }) {
  const step = 17;
  const w = 9;
  const trend = CANDLES.map(([, c], i) => `${i ? 'L' : 'M'}${i * step + 8 + w / 2} ${c}`).join(' ');
  return (
    <svg aria-hidden viewBox="0 0 320 160" preserveAspectRatio="xMidYMax meet" className={className}>
      {[36, 71, 106, 141].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 4" />
      ))}
      {CANDLES.map(([o, c, h, l], i) => {
        const x = i * step + 8;
        const up = c < o;
        const last = i === CANDLES.length - 1;
        return (
          <g key={i} className="candle-grow" style={{ animationDelay: `${i * STAGGER}ms` }}>
            <g className={last ? 'candle-live' : undefined} style={last ? { animationDelay: `${CHART_MS + 400}ms` } : undefined}>
              <line x1={x + w / 2} x2={x + w / 2} y1={h} y2={l} stroke={up ? UP : DOWN} strokeWidth="1" />
              <rect x={x} y={Math.min(o, c)} width={w} height={Math.max(2, Math.abs(o - c))} rx="1" fill={up ? UP : DOWN} fillOpacity={up ? 0.9 : 0.75} />
            </g>
          </g>
        );
      })}
      <path d={trend} pathLength={1} className="chart-draw" style={{ animationDuration: `${CHART_MS}ms` }} fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Fixed page backdrop: grid, green halo, a trading chart that draws itself.
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
      <Candles className="absolute inset-x-0 top-[12%] h-[30%] w-full text-fg opacity-25 lg:top-auto lg:bottom-[4%] lg:opacity-30 lg:left-auto lg:h-[50%] lg:w-[55%] lg:[mask-image:linear-gradient(to_right,transparent,#000_30%)]" />
      <div ref={dim} className="absolute inset-0 bg-bg" style={{ opacity: 0, willChange: 'opacity' }} />
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
}
