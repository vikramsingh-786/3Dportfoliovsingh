'use client';

import { useEffect, useState } from 'react';
import { navLinks, profile } from '../lib/data';

const ThemeToggle = () => {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.dataset.theme === 'light'), []);
  const toggle = () => {
    const next = light ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setLight(!light);
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className="key-cap key-cap-press flex h-11 w-11 items-center justify-center rounded-full [--key-depth:4px]"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
        {light ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /> : <circle cx="12" cy="12" r="5" />}
      </svg>
    </button>
  );
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-md' : ''}`}>
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between sm:h-20">
        <a href="#top" onClick={() => setOpen(false)} className="text-lg font-extrabold tracking-tight">
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map(({ id, title }, i) => (
            <li key={id}>
              <a href={`#${id}`} className="group flex items-baseline gap-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-muted transition-colors hover:text-fg">
                <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                {title}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="key-cap key-cap-press flex h-11 items-center rounded-full px-4 text-[11px] font-extrabold uppercase tracking-widest [--key-depth:4px] lg:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="shell h-[calc(100svh-4rem)] overflow-y-auto pb-10 pt-6 lg:hidden">
          <ol className="border-t border-line">
            {navLinks.map(({ id, title }, i) => (
              <li key={id} className="border-b border-line">
                <a href={`#${id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5 text-4xl font-extrabold tracking-tight">
                  {title}
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </header>
  );
};

export default Nav;
