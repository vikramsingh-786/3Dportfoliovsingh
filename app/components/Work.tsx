'use client';

import Image from 'next/image';
import { projects } from '../lib/data';
import { Reveal, SectionHeader } from './ui';

const Work = () => (
  <section id="portfolio" className="relative py-24 sm:py-32">
    <div className="shell">
      <SectionHeader index="04" label="Work" title="Selected projects." />

      <ol className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={(i % 2) * 0.08} className="slab group mb-[10px] flex h-full flex-col overflow-hidden rounded-3xl">
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} live demo (opens in new tab)`}
                className="relative block aspect-[16/10] overflow-hidden border-b border-line"
              >
                <Image
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </a>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-mono text-xs font-bold text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{p.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{p.desc}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="key-cap rounded-lg px-2.5 py-1 text-xs font-bold [--key-depth:3px]">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-key" aria-label={`${p.title} live demo (opens in new tab)`}>
                    Live ↗
                  </a>
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className="btn-cap" aria-label={`${p.title} source code (opens in new tab)`}>
                    Code ↗
                  </a>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default Work;
