'use client';

import { process, services } from '../lib/data';
import { Reveal, SectionHead, TiltCard } from './ui';

const Services = () => (
  <section id="services" data-station className="relative flex min-h-screen items-center px-6 py-24">
    <div className="mx-auto w-full max-w-7xl">
      <SectionHead index="02" label="Services" title="What I can build for you." />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 0.06} className="h-full">
              <TiltCard className="panel h-full p-6">
                <p className="font-mono text-xs text-amber">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-mute">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden className="text-accent">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="mt-12">
        <ol className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest text-mute">
          {process.map((p, i) => (
            <li key={p} className="flex items-center gap-4">
              <span className="text-bone">{p}</span>
              {i < process.length - 1 && <span aria-hidden className="text-accent">→</span>}
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);

export default Services;
