'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { process, services } from '../lib/data';
import { Reveal, SectionHeader } from './ui';

const STEP_MS = 2600;

// Process steps light up one after another, each with a filling progress bar (paused off-screen).
function Stepper() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % process.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, inView, reduced]);

  return (
    <ol ref={ref} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {process.map((p, i) => {
        const on = reduced || i === active;
        return (
          <li key={p} className={`key-cap mb-[7px] rounded-2xl p-5 transition-colors ${on ? 'border-accent/50' : ''}`}>
            <span className={`font-mono text-xs font-bold ${on ? 'text-accent' : 'text-subtle'}`}>0{i + 1}</span>
            <p className="mt-6 text-lg font-extrabold">{p}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
              {reduced ? (
                <div className="h-full w-full rounded-full bg-accent" />
              ) : (
                i <= active && <div key={i === active ? `a${active}` : 'done'} className={`h-full rounded-full bg-accent ${i === active ? 'step-fill' : 'w-full'}`} style={i === active ? { animationDuration: `${STEP_MS}ms` } : undefined} />
              )}
            </div>
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

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={(i % 3) * 0.06} className="key-cap key-cap-press group mb-[7px] h-full rounded-3xl p-6">
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
          </li>
        ))}
      </ul>

      <Reveal className="mt-16">
        <h3 className="label mb-5">Process</h3>
        <Stepper />
      </Reveal>
    </div>
  </section>
);

export default Services;
