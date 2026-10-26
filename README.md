# Vikram Singh — 3D Portfolio

3D portfolio built with Next.js 14, react-three-fiber, Tailwind and Framer Motion.
A single glass crystal (one fixed WebGL canvas) follows you through numbered chapters, switching sides between sections on desktop; on phones and tablets it lives in the hero only.

```bash
npm install
npm run dev   # http://localhost:3000
```

- Content (projects, services, stack, links): `app/lib/data.ts`
- 3D scene: `app/components/Scene.tsx` (a section joins the choreography with a `data-chapter` attribute)
- Design tokens: `tailwind.config.js`, `app/globals.css`

Respects `prefers-reduced-motion` (crystal stops spinning and snaps between positions).
