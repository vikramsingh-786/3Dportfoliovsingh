'use client';

import Image from 'next/image';
import { projects } from '../lib/data';
import { Reveal, SectionHead, TiltCard } from './ui';

const Portfolio = () => (
  <section id="portfolio" data-station className="relative px-6 py-24">
    <div className="mx-auto w-full max-w-7xl">
      <SectionHead index="04" label="Work" title="Selected projects." />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 3) * 0.08} className="h-full">
              <TiltCard className="panel flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                  <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{p.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ice">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex gap-5 text-sm">
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:text-bone" aria-label={`${p.title} live demo (opens in new tab)`}>
                      Live demo ↗
                    </a>
                    <a href={p.code} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-bone" aria-label={`${p.title} source code (opens in new tab)`}>
                      Code ↗
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Portfolio;
