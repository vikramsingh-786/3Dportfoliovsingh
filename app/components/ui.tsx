'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

// Easing curves lifted from daddyyankee.com's stylesheet: big moves vs. micro-interactions.
export const EXPO = [0.9, 0, 0.1, 1] as const;
export const OUT = [0.215, 0.61, 0.355, 1] as const;

// True once the visitor has passed the "Enter" cover (this session or just now).
export function useEntered() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (document.documentElement.classList.contains('is-entered')) setEntered(true);
    const on = () => setEntered(true);
    window.addEventListener('portfolio-enter', on);
    return () => window.removeEventListener('portfolio-enter', on);
  }, []);
  return entered;
}

// Fade-up on scroll into view.
export const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease: OUT }}
  >
    {children}
  </motion.div>
);

// One masked unit (char or word) sliding up out of its clip.
const MaskUnit = ({ children, index, delay, stagger, when, reduced, entered }: { children: React.ReactNode; index: number; delay: number; stagger: number; when: 'view' | 'enter'; reduced: boolean; entered: boolean }) => (
  <span className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom">
    <motion.span
      className="inline-block"
      initial={reduced ? false : { y: '115%' }}
      {...(when === 'enter' ? { animate: { y: entered ? 0 : '115%' } } : { whileInView: { y: 0 }, viewport: { once: true, margin: '-10%' } })}
      transition={{ duration: 0.9, delay: delay + index * stagger, ease: EXPO }}
    >
      {children}
    </motion.span>
  </span>
);

// Masked text reveal (the `data-split` pattern). `when="enter"` waits for the Enter cover.
export const SplitText = ({ text, by = 'word', delay = 0, stagger, when = 'view', offset = 0 }: { text: string; by?: 'char' | 'word'; delay?: number; stagger?: number; when?: 'view' | 'enter'; offset?: number }) => {
  const reduced = !!useReducedMotion();
  const entered = useEntered();
  const units = by === 'char' ? Array.from(text) : text.split(' ');
  const gap = stagger ?? (by === 'char' ? 0.045 : 0.07);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {units.map((u, i) => (
          <MaskUnit key={i} index={i + offset} delay={delay} stagger={gap} when={when} reduced={reduced} entered={entered}>
            {u}
            {by === 'word' && i < units.length - 1 ? ' ' : ''}
          </MaskUnit>
        ))}
      </span>
    </>
  );
};

// `*word*` in the title renders as the accent serif italic.
export const SectionHead = ({ index, label, title }: { index: string; label: string; title: string }) => {
  let n = 0;
  return (
    <div className="mb-14">
      <Reveal>
        <p className="eyebrow flex items-center gap-4">
          <span>{index}</span>
          <span aria-hidden className="h-0.5 w-12 bg-accent" />
          <span>{label}</span>
        </p>
      </Reveal>
      <h2 className="mt-5 text-[clamp(2.75rem,11.5vw,5rem)] sm:text-8xl lg:text-[clamp(5rem,8vw,8rem)]">
        {title.split('*').map((part, i) => {
          const start = n;
          n += part.trim().split(' ').filter(Boolean).length;
          const inner = <SplitText text={part.trim()} offset={start} />;
          return (
            <span key={i}>
              {i % 2 ? <em className="font-serif font-normal normal-case italic text-accent">{inner}</em> : inner}{' '}
            </span>
          );
        })}
      </h2>
    </div>
  );
};

// Image inside a clip that drifts against the scroll (mask + mover pattern).
export const ParallaxImage = ({ src, alt, sizes, className = '', imgClassName = '' }: { src: string; alt: string; sizes: string; className?: string; imgClassName?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%']);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y, scale: 1.2 }}>
        <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${imgClassName}`} />
      </motion.div>
    </div>
  );
};

// Thin accent bar showing page progress.
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-accent" />;
};

// Pointer-driven 3D tilt; inert for reduced-motion users.
export const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};
