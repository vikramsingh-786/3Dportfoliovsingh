# Vikram Singh — 3D Portfolio

3D portfolio built with Next.js 14, react-three-fiber, Tailwind and Framer Motion.
Dark navy + green "tactile" design: 3D key-cap cards and buttons that press, a fixed grid/halo backdrop with a pulsing contribution graph, and a 3D macropad in the hero whose keys type by themselves.

```bash
npm install
npm run dev   # http://localhost:3000
```

- Content (projects, services, stack, links): `app/lib/data.ts`
- 3D macropad: `app/components/Keypad.tsx`; backdrop: `app/components/Background.tsx`
- Design tokens: `tailwind.config.js`, `app/globals.css`

Respects `prefers-reduced-motion` (no typing, stamps, shimmer or looping effects).
