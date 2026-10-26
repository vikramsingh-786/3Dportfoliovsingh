'use client';

import { process, services } from '../lib/data';
import { Reveal, SectionHeader, column } from './ui';

const Services = () => (
  <section id="services" data-chapter className="relative py-24 sm:py-32">
    <div className="shell">
      <div className={column('left')}>
        <SectionHeader index="02" label="Services" title="What I can build for you." />

        <ol className="border-b border-line">
          {services.map((s, i) => (
            <li key={s.title} className="group border-t border-line">
              <Reveal className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-3 py-7 sm:grid-cols-[3rem_1fr_1fr]">
                <span className="pt-1.5 font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">{s.title}</h3>
                <ul className="col-start-2 flex flex-wrap gap-2 sm:col-start-3 sm:justify-end">
                  {s.features.map((f) => (
                    <li key={f} className="chip">
                      {f}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-12">
          <p className="label mb-4">Process</p>
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {process.map((p, i) => (
              <li key={p} className="rounded-2xl border border-line bg-surface/60 p-4">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <p className="mt-6 font-medium">{p}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Services;
