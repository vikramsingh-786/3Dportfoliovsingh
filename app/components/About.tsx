'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Tilt } from 'react-tilt';
import { useEffect } from 'react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const stats = [
    { value: '20+', label: 'Projects', color: 'from-purple-400 to-pink-400' },
    { value: '2+', label: 'Experience', color: 'from-cyan-400 to-blue-400' },
    { value: '10+', label: 'Technologies', color: 'from-pink-400 to-red-400' },
    { value: '100%', label: 'Satisfaction', color: 'from-green-400 to-teal-400' },
  ];

  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'TypeScript', level: 70 },
    { name: 'GraphQL', level: 65 },
  ];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-br from-black via-purple-900/10 to-black overflow-hidden border-t border-purple-500/20"
    >
      {/* Hero-style particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle absolute rounded-full bg-purple-500/30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-purple-400 text-sm uppercase tracking-widest mb-4"
          >
            Get to know me
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-white font-black text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -45 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex justify-center"
          >
            <Tilt
              options={{
                max: 15,
                scale: 1.05,
                speed: 500,
                glare: true,
                'max-glare': 0.2,
              }}
              className="w-full max-w-md"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <motion.div
                  whileHover={{
                    rotateY: 15,
                    rotateX: 5,
                    scale: 1.03,
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-2 backdrop-blur-sm border border-purple-500/30"
                >
                  <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center overflow-hidden">
                    <Image
                      src="/hero.png"
                      alt="Vikram Singh"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </Tilt>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                Hello! I'm <span className="text-purple-400 font-medium">Vikram Singh</span>, a passionate and creative full-stack developer specializing in modern web technologies. With a keen eye for design and a love for clean code, I build digital experiences that are both beautiful and functional.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.0 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                My journey in web development began 2 years ago, and since then I've had the privilege of working on diverse projects that challenge my skills and push me to grow. I believe in continuous learning and staying updated with the latest industry trends.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)',
                  }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, type: 'spring' }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center">
                    <h3 className={`text-white font-bold text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 mt-2">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2.0 }}
              className="pt-4"
            >
              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg group glow"
              >
                Let's Work Together
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;