// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

// Dynamic imports for performance and to avoid SSR issues with 3D components
const Loader = dynamic(() => import('./components/Loader'));
const Navbar = dynamic(() => import('./components/Navbar'));
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });
const About = dynamic(() => import('./components/About'));
const Services = dynamic(() => import('./components/Services'));
const Technologies = dynamic(() => import('./components/Technologies'), { ssr: false });
const Portfolio = dynamic(() => import('./components/Portfolio'));
const Contact = dynamic(() => import('./components/Contact'), { ssr: false });
const Footer = dynamic(() => import('./components/Footer'));
const StarsCanvas = dynamic(() => import('./components/canvas/Stars'), { ssr: false });

// Enhanced Loading Component
const EnhancedLoader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black"
  >
    <div className="text-center space-y-8">
      {/* Logo/Brand */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-20 h-20 mx-auto border-4 border-purple-500/30 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-t-purple-500 border-r-pink-500 border-b-cyan-500 border-l-green-500 rounded-full"
          />
        </div>
        <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse" />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold gradient-text">Loading Experience</h2>
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full max-w-xs mx-auto"
      />
    </div>
  </motion.div>
);

// Page Transition Component
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Scroll Progress Indicator
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 z-50 origin-left"
      style={{ scaleX: scrollProgress / 100 }}
      initial={{ scaleX: 0 }}
    />
  );
};

// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 glow-hover"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 3000); // Extended loading time
    return () => clearTimeout(timer);
  }, []);

  // Preload critical assets
  useEffect(() => {
    if (mounted) {
      // Preload images
      const imageUrls = ['/hero.png', '/planets/scene.gltf'];
      imageUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = url.includes('.gltf') ? 'fetch' : 'image';
        document.head.appendChild(link);
      });
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Global Loading State */}
      <AnimatePresence>
        {loading && <EnhancedLoader />}
      </AnimatePresence>

      {/* Main Application */}
      <AnimatePresence>
        {!loading && (
          <PageTransition>
            <div className="relative z-0 bg-primary min-h-screen">
              {/* Scroll Progress Indicator */}
              <ScrollProgress />
              
              {/* Navigation */}
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Navbar />
              </motion.div>

              {/* Hero Section with Enhanced Background */}
              <div className="relative bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Hero />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50 pointer-events-none" />
              </div>
              
              {/* Main Content Sections */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10"
              >
                {/* About Section */}
                <section className="relative">
                  <About />
                  <div className="absolute inset-0 dots-pattern opacity-5 pointer-events-none" />
                </section>

                {/* Services Section */}
                <section className="relative bg-gradient-to-b from-transparent to-black/20">
                  <Services />
                </section>

                {/* Technologies Section */}
                <section className="relative">
                  <Technologies />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-pink-900/5 pointer-events-none" />
                </section>

                {/* Portfolio Section */}
                <section className="relative bg-gradient-to-b from-black/20 to-transparent">
                  <Portfolio />
                </section>

                {/* Contact Section */}
                <section className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />
                  <Contact />
                </section>

                {/* Footer */}
                <Footer />
              </motion.div>
              
              {/* Background Stars Canvas */}
              <div className="fixed inset-0 z-0 pointer-events-none">
                <StarsCanvas />
              </div>

              {/* Back to Top Button */}
              <BackToTop />

              {/* Ambient Light Effects */}
              <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
              </div>
            </div>
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  );
}