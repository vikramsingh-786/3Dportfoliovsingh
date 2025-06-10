'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Typewriter from 'typewriter-effect';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const ComputersCanvas = dynamic(() => import('./canvas/Computer'), { ssr: false });

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const personalInfo = {
    name: "Vikram Singh",
    title: "Full Stack Web Developer and UI Designer",
    profileImage: "/hero.png",
    description: "I craft exceptional digital experiences with cutting-edge technologies. Passionate about creating beautiful, functional, and user-centered solutions that make a difference.",
    location: "Based in India",
    availability: "Available for freelance work"
  };

  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Python", "UI/UX"];
  const socialLinks = [
    { icon: <FiGithub className="w-5 h-5" />, url: "https://github.com/vikramsingh9219251196", label: "GitHub" },
    { icon: <FiLinkedin className="w-5 h-5" />, url: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
    { icon: <FiTwitter className="w-5 h-5" />, url: "https://twitter.com/yourhandle", label: "Twitter" },
    { icon: <FiMail className="w-5 h-5" />, url: "mailto:your@email.com", label: "Email" },
  ];

  if (!mounted) return null;

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-gradient-to-br from-black via-purple-900/20 to-black">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              background: `radial-gradient(circle, ${
                ['rgba(145, 94, 255, 0.1)', 'rgba(244, 114, 182, 0.1)', 'rgba(6, 182, 212, 0.1)', 'rgba(16, 185, 129, 0.1)'][Math.floor(Math.random() * 4)]
              }, transparent)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 z-10">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex flex-col justify-center items-start gap-6">
            <div className="flex items-center gap-6">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 glow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="w-1 h-20 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent"
                  initial={{ height: 0 }}
                  animate={{ height: 80 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </motion.div>

              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs font-medium">
                    {personalInfo.availability}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-xs font-medium">
                    {personalInfo.location}
                  </span>
                </div>
                <p className="text-purple-400 text-sm uppercase tracking-widest font-medium">
                  Welcome to my digital space
                </p>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-black text-white text-4xl sm:text-5xl lg:text-7xl leading-tight"
            >
              Hi, I'm{' '}
              <span className="gradient-text text-glow">
                {personalInfo.name}
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-300 font-medium text-lg sm:text-xl lg:text-2xl h-12"
            >
              <span className="text-purple-400 font-bold">
                <Typewriter
                  options={{
                    strings: [
                      personalInfo.title,
                      'Full Stack Developer',
                      'UI/UX Designer',
                      'React Specialist',
                      'Problem Solver',
                      'Creative Coder'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                    cursor: '<span class="text-purple-400">|</span>'
                  }}
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-300 max-w-2xl leading-relaxed text-base sm:text-lg"
            >
              {personalInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#portfolio" 
                className="group btn-primary flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              
              <motion.a
                href="/CV.pdf"
                download
                className="btn-secondary flex items-center justify-center gap-3 "
              >
                <FiDownload className="w-5 h-5" />
                Download CV
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Right Content - 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="relative w-full lg:w-1/2 h-[500px] lg:h-full"
        >
          <div className="relative h-full rounded-2xl overflow-hidden">
            <ComputersCanvas />
            
            {/* Overlay Elements */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
