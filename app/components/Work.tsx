'use client';

import Image from 'next/image';
import { projects } from '../lib/data';
import { Reveal, SectionHeader, column } from './ui';

// Each project is its own chapter rather than a grid thumbnail.
const Work = () => (
  <section id="portfolio" data-chapter className="relative py-24 sm:py-32">
    <div className="shell">
      <div className={column('left')}>
        <SectionHeader index="04" label="Work" title="Selected projects." />

        <ol className="space-y-20 sm:space-y-28">
          {projects.map((p, i) => (
            <li key={p.title}>
              <Reveal>
                <article className="group">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} live demo (opens in new tab)`}
                    className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface"
                  >
                    <Image
                      src={p.image}
                      alt={`${p.title} screenshot`}
                      fill
                      sizes="(min-width:1024px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </a>

                  <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <p className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{p.title}</h3>
                      <p className="mt-3 max-w-xl leading-relaxed text-muted">{p.desc}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <li key={t} className="chip">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-3 md:flex-col">
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" aria-label={`${p.title} live demo (opens in new tab)`}>
                        Live ↗
                      </a>
                      <a href={p.code} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label={`${p.title} source code (opens in new tab)`}>
                        Code ↗
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Work;
