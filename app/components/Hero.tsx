'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { experience, profile, socials, stats } from '../lib/data';
import { Magnetic, Tilt } from './ui';

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

// Stat card stamped onto the stage after the portrait lands.
const StatCard = ({ value, label, className, delay }: { value: string; label: string; className: string; delay: number }) => (
  <div className={`stamp-flat absolute z-20 ${className}`} style={d(delay)}>
    <Tilt max={14} className="slab pointer-events-auto rounded-xl px-2.5 py-1.5 [--slab-depth:4px] sm:rounded-2xl sm:px-4 sm:py-3 sm:[--slab-depth:6px]">
      <p className="font-mono text-sm font-medium leading-none text-accent [text-shadow:0_0_14px_rgb(74_222_128/0.5)] sm:text-2xl">{value}</p>
      <p className="mt-0.5 text-[7px] font-extrabold uppercase tracking-[0.12em] text-subtle sm:mt-1 sm:text-[10px] sm:tracking-[0.14em]">{label}</p>
    </Tilt>
  </div>
);

// The portrait: framed, beam-lit, tilts toward the pointer and floats.
function Stage() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

  return (
    <div
      className="relative mx-auto w-full max-w-[24rem] pt-2 sm:max-w-[28rem] sm:pt-4 lg:max-w-none lg:pt-0"
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
      <div className="relative z-10 mx-auto aspect-[4/5] w-[46%] sm:w-[62%] lg:h-[min(28rem,52svh)] lg:w-auto">
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
                {/* Bottom fade for the location label */}
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />
                <p className="absolute inset-x-0 bottom-2.5 text-center text-[8px] font-extrabold uppercase tracking-[0.18em] text-fg/80 sm:bottom-4 sm:text-[10px] sm:tracking-[0.2em]">Bengaluru · India</p>
              </div>
            </div>
          </motion.div>
          </div>
        </div>

        <StatCard value={stats[0].value} label={stats[0].label} className="-left-[46%] bottom-[16%] sm:-left-[26%] sm:bottom-[20%]" delay={1.9} />
        <StatCard value={stats[2].value} label={stats[2].label} className="-right-[40%] bottom-[6%] sm:-right-[16%] sm:bottom-[10%]" delay={2.3} />

        {/* CodeChef stamp */}
        <div className="pointer-events-none absolute -right-[42%] -top-[4%] z-20 sm:-right-[26%] sm:-top-[5%] lg:-right-[24%]">
          <span aria-hidden className="stamp-impact absolute inset-[-12%] rounded-2xl border-2 border-accent/70" style={d(1.3)} />
          <div
            className="stamp flex flex-col items-center rounded-xl border-2 border-accent bg-bg/70 px-2.5 py-1.5 text-accent backdrop-blur-sm sm:rounded-2xl sm:border-[3px] sm:px-3.5 sm:py-2"
            style={{ ...d(1.3), boxShadow: 'inset 0 0 0 4px rgb(var(--bg)), inset 0 0 0 6px currentColor, 0 0 1.5rem rgb(74 222 128 / 0.35)' }}
          >
            <span className="text-[7px] font-extrabold uppercase tracking-[0.18em] sm:text-[9px] sm:tracking-[0.2em]">CodeChef</span>
            <span className="mt-0.5 text-lg font-extrabold leading-none tracking-[-0.04em] sm:text-2xl">5★</span>
          </div>
        </div>

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
    <div className="shell grid flex-1 items-center gap-3 py-3 sm:gap-4 sm:py-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-10">
      <motion.div className="order-first lg:order-last" style={reduced ? undefined : { scale: stageScale, opacity: stageOpacity, y: stageY }}>
        <Stage />
      </motion.div>

      {/* Centred on phones/tablets, left-aligned beside the photo on desktop */}
      <div className="text-center lg:text-left">
        <p className="enter panel inline-flex max-w-full items-center gap-2 rounded-full py-1 pl-2.5 pr-3 text-[11px] font-bold sm:gap-2.5 sm:py-1.5 sm:pl-3 sm:pr-4 sm:text-xs" style={d(0.05)}>
          <span aria-hidden className="live-dot h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.9)]" />
          <span className="truncate">
            <span className="text-accent">Now</span> · {experience[0].role}, {experience[0].org.split(' · ')[0]}
          </span>
        </p>

        {/* Headline + a one-time light sweep laid over a copy of it */}
        <h1 className="enter relative mt-3 whitespace-nowrap text-[clamp(1.85rem,8.5vw,4.25rem)] sm:mt-6 font-extrabold leading-[1] tracking-[-0.045em] lg:text-[clamp(3rem,5vw,4.5rem)]" style={d(0.15)}>
          <span className="text-grad">Vikram Singh</span>
          <span className="text-accent">.</span>
          {/* Light-sweep copy: same box + alignment as the name (invisible "." keeps the width equal) */}
          <span aria-hidden className="shimmer pointer-events-none absolute inset-0" style={d(1)}>
            Vikram Singh<span className="opacity-0">.</span>
          </span>
        </h1>

        <p className="tag enter mt-2.5 !text-[10px] sm:mt-6 sm:!text-[11px]" style={d(0.3)}>
          {profile.role}
        </p>

        <p className="enter mx-auto mt-2 max-w-xl text-[15px] leading-snug text-muted sm:mt-4 sm:text-xl sm:leading-relaxed lg:mx-0" style={d(0.4)}>
          {profile.intro}
        </p>

        <div className="enter mt-5 flex gap-3 sm:mt-9 sm:justify-center sm:gap-5 lg:justify-start" style={d(0.55)}>
          <Magnetic className="flex-1 sm:flex-none">
            <a href="#portfolio" className="btn-key btn-shine w-full !min-h-11 max-sm:!px-3 max-sm:!text-[12px] sm:w-auto">
              See the work ↓
            </a>
          </Magnetic>
          <Magnetic className="flex-1 sm:flex-none">
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="btn-cap w-full !min-h-11 max-sm:!px-3 max-sm:!text-[12px] sm:w-auto">
              Download CV
            </a>
          </Magnetic>
        </div>

        <ul className="enter mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 sm:mt-9 sm:gap-x-6 lg:justify-start" style={d(0.7)}>
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
