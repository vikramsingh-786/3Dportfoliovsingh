'use client';

import { projects } from '../lib/data';
import { ParallaxImage, Reveal, SectionHead } from './ui';

const Portfolio = () => (
  <section id="portfolio" data-station className="relative px-6 py-28">
    <div className="mx-auto w-full max-w-7xl">
      <div className="lg:w-[60%]">
        <SectionHead index="04" label="Work" title="Selected *projects.*" />

        <ul>
          {projects.map((p, i) => (
            <li key={p.title} className="group border-t border-line py-10">
              <Reveal className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
                <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo (opens in new tab)`} className="block">
                  <ParallaxImage src={p.image} alt={`${p.title} screenshot`} sizes="(min-width:1024px) 28vw, 100vw" className="aspect-[16/10] rounded-xl border border-line" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                </a>
                <div className="flex flex-col">
                  <p className="font-mono text-xs text-amber">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{p.desc}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-bone/70">{p.tags.join(' · ')}</p>
                  <div className="mt-5 flex gap-6 text-sm">
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="font-semibold text-head underline decoration-accent decoration-2 underline-offset-4 link-line hover:text-accent" aria-label={`${p.title} live demo (opens in new tab)`}>
                      Live demo ↗
                    </a>
                    <a href={p.code} target="_blank" rel="noopener noreferrer" className="link-line text-mute hover:text-bone" aria-label={`${p.title} source code (opens in new tab)`}>
                      Code ↗
                    </a>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Portfolio;
