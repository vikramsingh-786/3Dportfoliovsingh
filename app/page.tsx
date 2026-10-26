// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Stack from './components/Stack';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ScrollProgress } from './components/ui';

// WebGL only runs in the browser.
const Scene = dynamic(() => import('./components/Scene'), { ssr: false });

export default function Home() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Scene />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Stack />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
