'use client';

import Image from 'next/image';
import { useState } from 'react';
import { tech } from '../lib/data';
import { Reveal, SectionHead } from './ui';

const groups = ['All', 'Frontend', 'Backend', 'Cloud', 'Tools'] as const;

const Technologies = () => {
  const [group, setGroup] = useState<(typeof groups)[number]>('All');
  const shown = tech.filter((t) => group === 'All' || t.group === group);

  return (
    <section id="tech" data-station className="relative px-6 py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="lg:ml-auto lg:w-[60%]">
          <SectionHead index="03" label="Stack" title="Tools I reach *for.*" />

          <Reveal>
            <div role="group" aria-label="Filter technologies" className="mb-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-line">
              {groups.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={group === g}
                  onClick={() => setGroup(g)}
                  className={`-mb-px border-b-2 pb-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                    group === g ? 'border-accent text-accent' : 'border-transparent text-mute hover:text-bone'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </Reveal>

          <ul className="flex flex-wrap gap-3">
            {shown.map((t) => (
              <li key={t.name} className="flex items-center gap-3 rounded-full border border-line py-1.5 pl-1.5 pr-5 transition-colors hover:border-accent">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 p-1.5">
                  <Image src={t.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                </span>
                <span className="text-sm">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
