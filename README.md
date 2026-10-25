# Vikram Singh — 3D Portfolio

Scroll-driven 3D portfolio built with Next.js 14, react-three-fiber, Tailwind and Framer Motion.
One fixed WebGL canvas sits behind the page; the camera flies between a 3D "station" for each section as you scroll.

```bash
npm install
npm run dev   # http://localhost:3000
```

- Content (projects, services, stack, links): `app/lib/data.ts`
- 3D scene and camera rig: `app/components/canvas/World.tsx`
- Scroll → station mapping: `app/lib/scroll.ts` (a section joins the flight path by having a `data-station` attribute)
- Design tokens: `tailwind.config.js`, `app/globals.css`

Respects `prefers-reduced-motion` (camera snaps, objects stop spinning, tilt disabled).
