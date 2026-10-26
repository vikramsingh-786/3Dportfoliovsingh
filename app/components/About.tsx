'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { achievements, education, experience, profile, skillGroups, stats } from '../lib/data';
import { Odometer, Reveal, ScrollText, SectionHeader } from './ui';

const history = [
  { year: '2026', title: experience[0].role, org: experience[0].org, period: experience[0].period, note: experience[0].note, current: true },
  { year: '2024', title: experience[1].role, org: experience[1].org, period: experience[1].period, note: experience[1].note, current: false },
  { year: '2021', title: education.degree, org: education.school, period: education.period, note: '', current: false },
];

// True at the lg breakpoint (where the journey zig-zags left/right).
function useDesktop() {
  const [desk, setDesk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setDesk(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return desk;
}

/**
 * The journey, oldest → now. The rail runs from the first node to the last and fills as you scroll;
 * a glowing traveller rides its tip. Each milestone stays dim until the line reaches its node, then
 * the node lights up and its card + year pop in. Desktop zig-zags around a centre rail; phones use a
 * left rail.
 */
function Journey() {
  const list = useRef<HTMLOListElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();
  const desk = useDesktop();
  const steps = [...history].reverse();

  // Node centres (px from the list top), measured so the rail starts/ends exactly on the nodes.
  const [geo, setGeo] = useState({ start: 0, span: 1, at: steps.map(() => 0) });
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top;
      const c = nodes.current.map((n) => (n ? n.getBoundingClientRect().top - top + n.offsetHeight / 2 : 0));
      const start = c[0] ?? 0;
      const span = Math.max(1, (c[c.length - 1] ?? 1) - start);
      setGeo({ start, span, at: c.map((y) => (y - start) / span) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [desk]);

  // Progress: 0 when the first node reaches ~70% down the viewport, 1 when the last node does.
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.7', 'end 0.7'] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const travellerY = useTransform(fill, (v) => geo.start + Math.min(1, Math.max(0, v)) * geo.span);

  // How many milestones the line has reached.
  const [reached, setReached] = useState(0);
  // Reduced motion (known only after mount): show everything, no scroll gating.
  useEffect(() => {
    if (reduced) setReached(steps.length);
  }, [reduced, steps.length]);
  useMotionValueEvent(fill, 'change', (v) => {
    if (reduced) return;
    const n = geo.at.filter((t) => v >= t - 0.02).length;
    setReached((r) => (n > r ? n : r)); // once revealed, stay revealed
  });

  const railStyle = { top: geo.start, height: geo.span };
  const railX = 'absolute left-[11px] w-0.5 rounded-full lg:left-[calc(50%-1px)]';

  return (
    <ol ref={list} className="relative space-y-10 lg:space-y-16">
      <span aria-hidden className={`${railX} bg-line`} style={railStyle} />
      <motion.span
        aria-hidden
        className={`${railX} origin-top bg-accent shadow-[0_0_10px_rgb(74_222_128/0.8)]`}
        style={reduced ? railStyle : { ...railStyle, scaleY: fill }}
      />
      {!reduced && (
        <motion.span
          aria-hidden
          className="absolute left-[12px] top-0 z-10 -ml-2 -mt-2 h-4 w-4 rounded-full bg-accent shadow-[0_0_0_6px_rgb(74_222_128/0.2),0_0_18px_rgb(74_222_128/0.9)] lg:left-1/2"
          style={{ y: travellerY }}
        />
      )}

      {steps.map((h, i) => {
        const right = i % 2 === 1; // desktop: odd milestones sit right of the rail
        const on = i < reached;
        return (
          <li key={h.year + h.title} className="relative pl-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20 lg:pl-0">
            {/* Node on the rail: lights up when the line arrives */}
            <span
              ref={(n) => {
                nodes.current[i] = n;
              }}
              aria-hidden
              className={`absolute left-[12px] top-7 z-[5] -ml-[10px] h-5 w-5 rounded-full border-2 transition-all duration-500 lg:left-1/2 lg:top-1/2 lg:-mt-[10px] ${
                on ? 'scale-110 border-accent bg-accent shadow-[0_0_14px_rgb(74_222_128/0.9)]' : 'border-line bg-bg'
              }`}
            />

            {/* Big year on the open side (desktop) */}
            <motion.p
              aria-hidden
              className={`hidden font-mono text-7xl font-medium tracking-tight text-accent/80 [text-shadow:0_0_28px_rgb(74_222_128/0.35)] lg:row-start-1 lg:block ${right ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-2'}`}
              initial={false}
              animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {h.year}
            </motion.p>

            {/* Milestone card: pops in from its side when reached */}
            <motion.div
              className={`lg:row-start-1 ${right ? 'lg:col-start-2' : 'lg:col-start-1'}`}
              initial={false}
              animate={on ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: desk ? (right ? 56 : -56) : 32, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className={h.current ? 'beam rounded-2xl' : ''}>
                <div className={`rounded-2xl p-5 sm:p-6 ${h.current ? 'bg-surface' : 'panel'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-xs font-bold text-subtle">
                      {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                      <span className="ml-3 text-2xl font-extrabold tracking-tight text-accent lg:hidden">{h.year}</span>
                    </p>
                    {h.current && <span className="tag rounded-full border border-accent/40 px-2.5 py-0.5">Now</span>}
                  </div>
                  <h4 className="mt-3 text-lg font-extrabold sm:text-xl">{h.title}</h4>
                  <p className="text-sm font-semibold text-subtle">
                    {h.org} · {h.period}
                  </p>
                  {h.note && <p className="mt-3 text-sm leading-relaxed text-muted">{h.note}</p>}
                </div>
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

const About = () => (
  <section id="about" className="relative py-24 sm:py-32">
    <div className="shell">
      <SectionHeader index="01" label="About" title="Design-minded engineer." />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="slab mb-[10px] rounded-3xl p-6 sm:p-10">
          <ScrollText
            className="text-xl font-semibold leading-snug sm:text-2xl"
            segments={[
              { text: "I'm Vikram — an Associate Software Engineer at " },
              { text: 'CoinSwitch', className: 'text-accent' },
              { text: ", building trading tools with Go and Next.js. I care as much about how a product feels as how it's built." },
            ]}
          />
          <div className="mt-8 flex items-center gap-4">
            <span className="panel relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
              <Image src="/vikram.jpg" alt="Portrait of Vikram Singh" fill sizes="64px" className="object-cover" style={{ objectPosition: '50% 35%' }} />
            </span>
            <div>
              <p className="font-extrabold">{profile.name}</p>
              <p className="text-sm text-subtle">{profile.role}</p>
            </div>
          </div>
        </Reveal>

        <dl className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-1">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="well flex flex-col justify-center rounded-2xl px-3 py-5 sm:px-6">
              <dd className="font-mono text-xl font-medium tracking-tight text-accent [text-shadow:0_0_18px_rgb(74_222_128/0.45)] min-[400px]:text-2xl sm:text-4xl">
                <Odometer value={s.value} />
              </dd>
              <dt className="label mt-1">{s.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="mt-20">
        <Reveal>
          <h3 className="label mb-8 text-center">Journey</h3>
        </Reveal>
        <Journey />
      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-2">
        <>
          <Reveal>
            <h3 className="label mb-5 text-center lg:text-left">Skills</h3>
            <dl className="slab mb-[10px] space-y-5 rounded-2xl p-5 sm:p-6">
              {skillGroups.map((g) => (
                <div key={g.name}>
                  <dt className="tag mb-2">{g.name}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <span key={i} className="panel rounded-lg px-2.5 py-1 text-xs font-bold">
                        {i}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <h3 className="label mb-5 text-center lg:text-left">Achievements</h3>
            <ul className="slab mb-[10px] space-y-3 rounded-2xl p-5 sm:p-6">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 font-medium leading-relaxed">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.8)]" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </>
      </div>
    </div>
  </section>
);

export default About;
