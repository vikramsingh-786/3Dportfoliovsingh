'use client';

import { motion, useScroll } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

// Content column. The crystal sits on the opposite side on desktop; full width below lg.
export const column = (side: 'left' | 'right') => (side === 'right' ? 'lg:ml-auto lg:w-[58%]' : 'lg:w-[58%]');

export const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const SectionHeader = ({ index, label, title }: { index: string; label: string; title: React.ReactNode }) => (
  <Reveal className="mb-12 sm:mb-16">
    <p className="label flex items-center gap-3">
      <span className="text-accent">({index})</span>
      <span>{label}</span>
    </p>
    <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">{title}</h2>
  </Reveal>
);

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent" />;
};
