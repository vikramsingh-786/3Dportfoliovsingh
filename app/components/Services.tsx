'use client';

import { process, services } from '../lib/data';
import { Reveal, SectionHead } from './ui';

const Services = () => (
  <section id="services" data-station className="relative px-6 py-28">
    <div className="mx-auto w-full max-w-7xl">
      <div className="lg:w-[60%]">
        <SectionHead index="02" label="Services" title="What I can *build.*" />

        <ul className="border-b border-line">
          {services.map((s, i) => (
            <li key={s.title} className="group border-t border-line">
              <Reveal className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] md:grid-cols-[3rem_1fr_1fr]">
                <span className="pt-2 font-mono text-xs text-amber">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-4xl break-words">{s.title}</h3>
                <ul className="space-y-1 pt-2 font-mono text-xs text-mute sm:col-start-2 md:col-start-3">
                  {s.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14">
          <ol className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {process.map((p, i) => (
              <li key={p} className="border-t border-accent pt-3 font-mono text-xs uppercase tracking-widest">
                <span className="text-amber">{String(i + 1).padStart(2, '0')}</span> {p}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Services;
