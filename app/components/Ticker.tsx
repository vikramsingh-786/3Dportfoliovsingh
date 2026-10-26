'use client';

import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';
import { tech } from '../lib/data';

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const BASE_SPEED = 2.5; // % of track width per second

/**
 * Stock-ticker strip of the stack. Drifts on its own; scrolling speeds it up and scroll direction
 * flips it, with a slight skew while moving fast. The list is rendered twice for a seamless loop
 * (second copy hidden from screen readers).
 */
const Ticker = () => {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 2500], [6, -6]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    let move = direction.current * -BASE_SPEED * (delta / 1000);
    move += move * Math.abs(b);
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="relative overflow-hidden border-y border-line bg-surface/60 py-3 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <motion.div className="flex w-max" style={reduced ? undefined : { x, skewX }}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} aria-label={copy === 0 ? 'Tech stack' : undefined} className="flex shrink-0 items-center">
            {tech.map((t) => (
              <li key={t.name} className="flex items-center gap-2 whitespace-nowrap px-5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-muted">
                <span aria-hidden className="text-accent">▲</span>
                {t.name}
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;
