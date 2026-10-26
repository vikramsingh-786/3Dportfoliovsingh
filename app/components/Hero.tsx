'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { experience, profile, socials } from '../lib/data';

// WebGL only runs in the browser.
const Keypad = dynamic(() => import('./Keypad'), { ssr: false });

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties;

const Hero = () => (
  <section id="top" className="relative flex min-h-[100svh] flex-col pt-16 sm:pt-20">
    <div className="shell grid flex-1 items-center gap-6 py-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-12">
      {/* 3D macropad + stamp — first on phones, right column on desktop */}
      <div className="relative order-first h-[38svh] min-h-[260px] lg:order-last lg:h-[34rem]">
        <Keypad />
        <div className="pointer-events-none absolute right-[4%] top-[6%] sm:right-[10%]" style={d(1.4)}>
          <span aria-hidden className="stamp-impact absolute inset-[-12%] rounded-2xl border-2 border-accent/70" style={d(1.4)} />
          <div
            className="stamp flex flex-col items-center rounded-2xl border-[3px] border-accent px-4 py-2.5 text-accent"
            style={{ ...d(1.4), boxShadow: 'inset 0 0 0 4px rgb(var(--bg)), inset 0 0 0 6px currentColor, 0 0 1.5rem rgb(74 222 128 / 0.35)' }}
          >
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">CodeChef</span>
            <span className="mt-0.5 text-3xl font-extrabold leading-none tracking-[-0.04em]">5★</span>
          </div>
        </div>
      </div>

      <div>
        <p className="enter panel inline-flex max-w-full items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-xs font-bold" style={d(0.05)}>
          <span aria-hidden className="live-dot h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(74_222_128/0.9)]" />
          <span className="truncate">
            <span className="text-accent">Now</span> · {experience[0].role}, {experience[0].org.split(' · ')[0]}
          </span>
        </p>
        <p className="tag enter mt-5" style={d(0.1)}>
          Portfolio · {new Date().getFullYear()} · Bengaluru, India
        </p>

        {/* Headline + a one-time light sweep laid over a copy of it */}
        <h1 className="enter relative mt-5 text-[clamp(3rem,10vw,7rem)] font-extrabold leading-[0.95] tracking-[-0.045em]" style={d(0.2)}>
          <span className="text-grad">
            Vikram
            <br />
            Singh
          </span>
          <span className="text-accent">.</span>
          <span aria-hidden className="shimmer pointer-events-none absolute left-0 top-0" style={d(1)}>
            Vikram
            <br />
            Singh
          </span>
        </h1>

        <div className="enter mt-7 flex items-center gap-4" style={d(0.35)}>
          <span className="panel relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
            <Image src="/hero.png" alt="Portrait of Vikram Singh" fill priority sizes="56px" className="object-cover object-top" />
          </span>
          <p className="text-base font-bold sm:text-lg">{profile.role}</p>
        </div>

        <p className="enter mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" style={d(0.45)}>
          {profile.intro}
        </p>

        <div className="enter mt-9 flex flex-col gap-5 sm:flex-row" style={d(0.6)}>
          <a href="#portfolio" className="btn-key btn-shine">
            See the work ↓
          </a>
          <a href={profile.cv} download className="btn-cap">
            Download CV
          </a>
        </div>

        <ul className="enter mt-9 flex flex-wrap gap-x-6 gap-y-1" style={d(0.75)}>
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="label inline-block py-2 transition-colors hover:text-accent">
                {s.name} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Hero;
