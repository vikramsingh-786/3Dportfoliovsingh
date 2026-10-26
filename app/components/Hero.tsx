'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { experience, profile, socials, stats } from '../lib/data';
import { Magnetic } from './ui';

// WebGL only runs in the browser.
const Keypad = dynamic(() => import('./Keypad'), { ssr: false });

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

// Stat card stamped in under the stage after the portrait lands (never over the photo).
const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <div className="stamp-flat" style={d(delay)}>
    <div className="slab rounded-2xl px-3.5 py-2.5 [--slab-depth:6px] sm:px-4 sm:py-3">
      <p className="font-mono text-lg font-medium leading-none text-accent [text-shadow:0_0_14px_rgb(74_222_128/0.5)] sm:text-2xl">{value}</p>
      <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-subtle sm:text-[10px]">{label}</p>
    </div>
  </div>
);

// The portrait: framed, beam-lit, tilts toward the pointer, stands on the 3D macropad.
function Stage() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

  return (
    <div
      className="relative mx-auto w-full max-w-[24rem] pt-4 sm:max-w-[28rem] lg:max-w-none lg:pt-0"
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {/* Portrait frame */}
      <div className="relative z-10 mx-auto aspect-[4/5] w-[62%] lg:h-[min(28rem,52svh)] lg:w-auto">
        <div
          aria-hidden
          className="glow-in absolute -inset-x-[30%] -inset-y-[12%] -z-10 rounded-full blur-2xl"
          style={{ ...d(0.6), background: 'radial-gradient(closest-side, rgb(var(--glow) / 0.55), rgb(var(--glow-deep) / 0.25) 55%, transparent)' }}
        />
        <div className="enter h-full w-full" style={d(0.3)}>
          <div className="float h-full w-full">
          <motion.div className="h-full w-full" style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}>
            <div className="beam h-full w-full rounded-[2rem]">
              <div className="relative h-full w-full overflow-hidden rounded-[calc(2rem-1px)] bg-surface">
                <Image
                  src="/vikram.jpg"
                  alt="Portrait of Vikram Singh"
                  fill
                  priority
                  sizes="(min-width:1024px) 26rem, 68vw"
                  className="object-cover"
                  style={{ objectPosition: '50% 38%' }}
                />
                {/* Bottom fade into the pedestal */}
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />
                <p className="absolute inset-x-0 bottom-4 text-center text-[10px] font-extrabold uppercase tracking-[0.2em] text-fg/80">Bengaluru · India</p>
              </div>
            </div>
          </motion.div>
          </div>
        </div>

        {/* CodeChef stamp */}
        <div className="pointer-events-none absolute -right-[30%] -top-[5%] z-20 sm:-right-[26%] lg:-right-[24%]">
          <span aria-hidden className="stamp-impact absolute inset-[-12%] rounded-2xl border-2 border-accent/70" style={d(1.3)} />
          <div
            className="stamp flex flex-col items-center rounded-2xl border-[3px] border-accent bg-bg/70 px-3.5 py-2 text-accent backdrop-blur-sm"
            style={{ ...d(1.3), boxShadow: 'inset 0 0 0 4px rgb(var(--bg)), inset 0 0 0 6px currentColor, 0 0 1.5rem rgb(74 222 128 / 0.35)' }}
          >
            <span className="text-[9px] font-extrabold uppercase tracking-[0.2em]">CodeChef</span>
            <span className="mt-0.5 text-2xl font-extrabold leading-none tracking-[-0.04em]">5★</span>
          </div>
        </div>

      </div>

      {/* 3D macropad pedestal, just under the frame so every key is visible */}
      <div className="relative z-0 -mt-[3%] h-40 sm:h-48 lg:h-56">
        <Keypad />
      </div>

      {/* Stats row under the pedestal */}
      <div className="relative z-10 -mt-2 flex justify-center gap-3 sm:gap-4">
        <StatCard value={stats[0].value} label={stats[0].label} delay={1.9} />
        <StatCard value={stats[2].value} label={stats[2].label} delay={2.3} />
      </div>
    </div>
  );
}

const Hero = () => {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  // As the hero scrolls away, the photo stage shrinks back and dims.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
  <section ref={section} id="top" className="relative flex min-h-[100svh] flex-col pt-16 sm:pt-20">
    <div className="shell grid flex-1 items-center gap-4 py-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-10">
      <motion.div className="order-first lg:order-last" style={reduced ? undefined : { scale: stageScale, opacity: stageOpacity, y: stageY }}>
        <Stage />
      </motion.div>

      <div>
        <p className="enter panel inline-flex max-w-full items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-xs font-bold" style={d(0.05)}>
          <span aria-hidden className="live-dot h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.9)]" />
          <span className="truncate">
            <span className="text-accent">Now</span> · {experience[0].role}, {experience[0].org.split(' · ')[0]}
          </span>
        </p>

        {/* Headline + a one-time light sweep laid over a copy of it */}
        <h1 className="enter relative mt-6 whitespace-nowrap text-[clamp(2rem,9vw,4.25rem)] font-extrabold leading-[1] tracking-[-0.045em] lg:text-[clamp(3rem,5vw,4.5rem)]" style={d(0.15)}>
          <span className="text-grad">Vikram Singh</span>
          <span className="text-accent">.</span>
          <span aria-hidden className="shimmer pointer-events-none absolute left-0 top-0" style={d(1)}>
            Vikram Singh
          </span>
        </h1>

        <p className="tag enter mt-6" style={d(0.3)}>
          {profile.role}
        </p>

        <p className="enter mt-4 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={d(0.4)}>
          {profile.intro}
        </p>

        <div className="enter mt-9 flex flex-col gap-5 sm:flex-row" style={d(0.55)}>
          <Magnetic>
            <a href="#portfolio" className="btn-key btn-shine w-full sm:w-auto">
              See the work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.cv} download className="btn-cap w-full sm:w-auto">
              Download CV
            </a>
          </Magnetic>
        </div>

        <ul className="enter mt-9 flex flex-wrap gap-x-6 gap-y-1" style={d(0.7)}>
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="label inline-block py-2 transition-colors hover:text-accent">
                {s.name} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
  );
};

export default Hero;
