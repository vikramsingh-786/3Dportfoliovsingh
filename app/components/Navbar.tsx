'use client';

import { useEffect, useState } from 'react';
import { navLinks, profile } from '../lib/data';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled || open ? 'border-b border-line bg-void/70 backdrop-blur-md' : ''}`}>
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm tracking-widest" aria-label={`${profile.name} — back to top`}>
          VS<span className="text-accent">/</span>3D
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`text-sm transition-colors hover:text-accent ${active === id ? 'text-accent' : 'text-mute'}`}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden rounded-full border border-line px-4 py-2 font-mono text-xs"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 px-6 pb-6 md:hidden">
          {navLinks.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 text-2xl font-semibold">
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
