'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { process as steps, services } from '../lib/data';
import Carousel from './Carousel';
import { Reveal, SectionHeader } from './ui';

const STEP_MS = 2600;

/**
 * Process as a connected pipeline: numbered nodes on a track that fills as it auto-advances
 * (paused off-screen). Click any step to jump to it; the timer restarts from there.
 * Horizontal on desktop, vertical on phones/tablets.
 */
function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const last = steps.length - 1;
  const current = reduced ? last : active;
  const pct = `${(current / last) * 100}%`;

  useEffect(() => {
    if (!inView || reduced) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, inView, reduced]);

  return (
    <ol ref={ref} className="relative grid gap-3 lg:grid-cols-4 lg:gap-0">
      {/* Track: vertical on small screens (through node centres), horizontal from lg */}
      <span aria-hidden className="absolute bottom-[34px] left-[33px] top-[34px] w-0.5 rounded-full bg-line lg:bottom-auto lg:left-[12.5%] lg:right-[12.5%] lg:top-[27px] lg:h-0.5 lg:w-auto" />
      <span aria-hidden className="absolute bottom-[34px] left-[33px] top-[34px] w-0.5 lg:bottom-auto lg:left-[12.5%] lg:right-[12.5%] lg:top-[27px] lg:h-0.5 lg:w-auto">
        <span className="block w-full rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.8)] transition-all duration-700 ease-out lg:hidden" style={{ height: pct }} />
        <span className="hidden h-full rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.8)] transition-all duration-700 ease-out lg:block" style={{ width: pct }} />
      </span>

      {steps.map((p, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'next';
        return (
          <li key={p} className="relative">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={state === 'active' ? 'step' : undefined}
              className="group flex w-full items-center gap-5 rounded-2xl p-1.5 text-left lg:flex-col lg:gap-4 lg:p-0 lg:text-center"
            >
              <span
                className={`relative z-10 flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-all duration-500 ${
                  state === 'active'
                    ? 'scale-110 border-accent bg-accent text-[#01040d] shadow-[0_0_0_6px_rgb(74_222_128/0.18),0_0_24px_rgb(74_222_128/0.7)]'
                    : state === 'done'
                      ? 'border-accent bg-bg text-accent'
                      : 'border-line bg-bg text-subtle group-hover:border-accent/60'
                }`}
              >
                {state === 'done' ? '✓' : `0${i + 1}`}
                {state === 'active' && !reduced && <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-accent opacity-40" />}
              </span>
              <span className="flex min-w-0 flex-1 flex-col lg:items-center">
                <span className={`text-lg font-extrabold transition-colors ${state === 'next' ? 'text-muted' : 'text-fg'}`}>{p}</span>
                <span className={`tag mt-0.5 ${state === 'next' ? '!text-subtle' : ''}`}>{state === 'done' ? 'Done' : state === 'active' ? 'In progress' : 'Up next'}</span>
                {/* Per-step timer under the active step */}
                <span className="mt-3 block h-1 w-full max-w-[9rem] overflow-hidden rounded-full bg-line">
                  {state === 'active' && !reduced ? (
                    <span key={`a${active}`} className="step-fill block h-full rounded-full bg-accent" style={{ animationDuration: `${STEP_MS}ms` }} />
                  ) : (
                    <span className={`block h-full rounded-full bg-accent ${state === 'next' ? 'w-0' : 'w-full'}`} />
                  )}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

const Services = () => (
  <section id="services" className="relative py-24 sm:py-32">
    <div className="shell">
      <SectionHeader index="02" label="Services" title="What I can build for you." />

      <Carousel label="Services" gridClass="md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.06} className="panel spotlight group h-full rounded-3xl p-6 transition-colors duration-300 hover:border-accent/50">
            <p className="font-mono text-xs font-bold text-accent">0{i + 1}</p>
            <h3 className="mt-4 text-xl font-extrabold tracking-tight">{s.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {s.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </Carousel>

      <Reveal className="mt-16">
        <h3 className="label mb-5">Process</h3>
        <Process />
      </Reveal>
    </div>
  </section>
);

export default Services;
