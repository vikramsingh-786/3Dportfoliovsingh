// app/page.tsx
'use client';

import Background from './components/Background';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Services from './components/Services';
import Stack from './components/Stack';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ScrollProgress, SpotlightTracker } from './components/ui';

export default function Home() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[#01040d]">
        Skip to content
      </a>
      <Background />
      <ScrollProgress />
      <SpotlightTracker />
      <Nav />
      <main className="relative">
        <Hero />
        <Ticker />
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
