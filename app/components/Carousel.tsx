'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Phones (<md): a swipeable, snapping row that autoplays. Autoplay pauses while the user touches or
 * focuses it, while it's off-screen, and for reduced motion. md and up: a normal grid (`gridClass`).
 */
export default function Carousel({ children, label, gridClass, interval = 3800 }: { children: React.ReactNode; label: string; gridClass: string; interval?: number }) {
  const items = Children.toArray(children);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const pausedUntil = useRef(0);
  const inView = useInView(track, { amount: 0.4 });
  const reduced = useReducedMotion();

  const goTo = useCallback((i: number) => {
    const el = track.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.clientWidth) / 2, behavior: 'smooth' });
  }, []);

  // Track which card is centred.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const n = c as HTMLElement;
          const dd = Math.abs(n.offsetLeft + n.clientWidth / 2 - mid);
          if (dd < dist) {
            dist = dd;
            best = i;
          }
        });
        setActive(best);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Autoplay (phones only).
  useEffect(() => {
    if (!inView || reduced) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const id = window.setInterval(() => {
      if (!mq.matches || Date.now() < pausedUntil.current) return;
      goTo((active + 1) % items.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [active, inView, reduced, interval, items.length, goTo]);

  // Any interaction pauses autoplay for a while.
  const pause = () => {
    pausedUntil.current = Date.now() + 6000;
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        onPointerDown={pause}
        onTouchStart={pause}
        onFocus={pause}
        onWheel={pause}
        className={`no-scrollbar relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-6 pt-2 md:mx-0 md:overflow-visible md:p-0 ${gridClass}`}
      >
        {items.map((child, i) => (
          <li key={i} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`} className="w-[85%] shrink-0 snap-center md:w-auto">
            {child}
          </li>
        ))}
      </ul>

      {/* Dots (phones only) */}
      <div className="mt-2 flex justify-center gap-2 md:hidden">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show item ${i + 1}`}
            aria-current={i === active || undefined}
            onClick={() => {
              pause();
              goTo(i);
            }}
            className="flex h-11 w-6 items-center justify-center"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-accent' : 'w-1.5 bg-line'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
