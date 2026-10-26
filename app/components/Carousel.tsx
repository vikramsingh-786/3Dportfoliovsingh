'use client';

import { Children, useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const PHONE = '(max-width: 767px)';

/**
 * Phones (<md): a swipeable, snapping row that autoplays forward in a seamless loop, with a 3D
 * coverflow. The slides are rendered three times; it lives in the middle copy and, once a scroll
 * settles in the first/last copy, silently jumps by one copy's width to the same card in the middle.
 * Autoplay pauses after a touch, while off-screen, and for reduced motion.
 * md and up: a normal grid (`gridClass`) showing only the real slides.
 */
export default function Carousel({ children, label, gridClass, interval = 2500 }: { children: React.ReactNode; label: string; gridClass: string; interval?: number }) {
  const items = Children.toArray(children);
  const n = items.length;
  const slides = [...items, ...items, ...items];
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(n); // index into `slides`; starts on the middle copy
  const pausedUntil = useRef(0);
  const inView = useInView(track, { amount: 0.4 });
  const reduced = useReducedMotion();

  const centreOf = (el: HTMLUListElement, i: number) => {
    const item = el.children[i] as HTMLElement | undefined;
    return item ? item.offsetLeft - (el.clientWidth - item.clientWidth) / 2 : 0;
  };

  const goTo = useCallback((i: number, smooth = true) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: centreOf(el, i), behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  // Track the centred slide, apply the coverflow, and wrap around at the edges.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const mobile = window.matchMedia(PHONE);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let settle = 0;

    const paint = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      const coverflow = mobile.matches && !still.matches;
      let best = 0;
      let dist = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const node = c as HTMLElement;
        const off = node.offsetLeft + node.clientWidth / 2 - mid;
        if (Math.abs(off) < dist) {
          dist = Math.abs(off);
          best = i;
        }
        // Side cards turn away and shrink as they leave the centre.
        if (coverflow) {
          const t = Math.max(-1, Math.min(1, off / node.clientWidth));
          node.style.transform = `perspective(900px) rotateY(${-t * 28}deg) scale(${1 - Math.abs(t) * 0.1})`;
          node.style.opacity = String(1 - Math.abs(t) * 0.35);
        } else {
          node.style.transform = '';
          node.style.opacity = '';
        }
      });
      setActive(best);
      return best;
    };

    // Once scrolling stops in an outer copy, jump to the same card in the middle copy (invisible).
    const wrap = () => {
      if (!mobile.matches) return;
      const best = paint();
      if (best < n || best >= 2 * n) {
        const target = n + (best % n);
        el.style.scrollBehavior = 'auto';
        el.style.scrollSnapType = 'none';
        el.scrollLeft = centreOf(el, target);
        el.style.scrollSnapType = '';
        el.style.scrollBehavior = '';
        paint();
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
      window.clearTimeout(settle);
      settle = window.setTimeout(wrap, 140);
    };

    const toMiddle = () => {
      if (mobile.matches) {
        el.style.scrollBehavior = 'auto';
        el.scrollLeft = centreOf(el, n + (active % n));
        el.style.scrollBehavior = '';
      }
      paint();
    };

    toMiddle();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', toMiddle);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', toMiddle);
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  // Autoplay (phones only): always one card forward; the wrap keeps it looping.
  useEffect(() => {
    if (!inView || reduced) return;
    const mobile = window.matchMedia(PHONE);
    const id = window.setInterval(() => {
      if (!mobile.matches || Date.now() < pausedUntil.current) return;
      goTo(active + 1);
    }, interval);
    return () => window.clearInterval(id);
  }, [active, inView, reduced, interval, goTo]);

  // Any interaction pauses autoplay briefly.
  const pause = () => {
    pausedUntil.current = Date.now() + 3000;
  };

  const real = active % n;

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
        {slides.map((child, i) => {
          const clone = i < n || i >= 2 * n;
          return (
            <li
              key={i}
              // Copies exist only for the loop: hidden from screen readers/keyboard and from the md+ grid.
              aria-hidden={clone || undefined}
              ref={(li) => {
                if (li && clone) li.setAttribute('inert', '');
              }}
              aria-roledescription={clone ? undefined : 'slide'}
              aria-label={clone ? undefined : `${(i % n) + 1} of ${n}`}
              className={`w-[85%] shrink-0 snap-center md:w-auto ${clone ? 'md:hidden' : ''}`}
            >
              {child}
            </li>
          );
        })}
      </ul>

      {/* Dots (phones only) */}
      <div className="mt-2 flex justify-center gap-2 md:hidden">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show item ${i + 1}`}
            aria-current={i === real || undefined}
            onClick={() => {
              pause();
              goTo(active - real + i);
            }}
            className="flex h-11 w-6 items-center justify-center"
          >
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === real ? 'w-6 bg-accent' : 'w-1.5 bg-line'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
