'use client';

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

// Fade-up on scroll into view.
export const Reveal = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ index, label, title, align = 'left' }: { index: string; label: string; title: string; align?: 'left' | 'right' }) => (
  <Reveal className={`mb-12 ${align === 'right' ? 'lg:text-right' : ''}`}>
    <p className="eyebrow">
      {index} / {label}
    </p>
    <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
  </Reveal>
);

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
