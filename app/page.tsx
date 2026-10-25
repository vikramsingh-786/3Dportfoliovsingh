// app/page.tsx
'use client';

import dynamic from 'next/dynamic';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Technologies from './components/Technologies';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

// WebGL only runs in the browser.
const World = dynamic(() => import('./components/canvas/World'), { ssr: false });

export default function Home() {
  return (
    <>
      <World />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-void">
        Skip to content
      </a>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
