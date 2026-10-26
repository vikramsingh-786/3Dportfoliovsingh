'use client';

import Image from 'next/image';
import { projects } from '../lib/data';
import { Reveal, SectionHeader } from './ui';

type Project = (typeof projects)[number];

// One project card. `featured` puts image and text side by side on large screens.
function Card({ p, i, featured = false }: { p: Project; i: number; featured?: boolean }) {
  return (
    <article className={`slab group mb-[10px] flex h-full flex-col overflow-hidden rounded-3xl ${featured ? 'lg:grid lg:grid-cols-[1.25fr_1fr]' : ''}`}>
      <a
        href={p.demo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${p.title} live demo (opens in new tab)`}
        className={`relative block aspect-[16/10] overflow-hidden border-b border-line ${featured ? 'lg:aspect-auto lg:min-h-[24rem] lg:border-b-0 lg:border-r' : ''}`}
      >
        <Image
          src={p.image}
          alt={`${p.title} screenshot`}
          fill
          sizes={featured ? '(min-width:1024px) 55vw, 100vw' : '(min-width:768px) 50vw, 100vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </a>
      <div className={`flex flex-1 flex-col p-6 sm:p-8 ${featured ? 'lg:justify-center lg:p-10' : ''}`}>
        <p className="font-mono text-xs font-bold text-accent">
          {String(i + 1).padStart(2, '0')}
          {featured && <span className="ml-3 text-subtle">Featured</span>}
        </p>
        <h3 className={`mt-2 font-extrabold tracking-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}>{p.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{p.desc}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-subtle">
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
    </article>
  );
}

const Work = () => {
  const [lead, ...rest] = projects;
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader index="04" label="Work" title="Selected projects." />

        <Reveal className="mb-8">
          <Card p={lead} i={0} featured />
        </Reveal>

        <ol className="grid gap-8 md:grid-cols-2">
          {rest.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <Card p={p} i={i + 1} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Work;
