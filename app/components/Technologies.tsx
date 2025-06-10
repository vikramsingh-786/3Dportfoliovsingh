'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import {
  FiCode,
  FiServer,
  FiCpu,
  FiDatabase,
  FiLayers,
} from 'react-icons/fi';
import { useEffect } from 'react';

const Technologies = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
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
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const bounceVariants = {
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const technologies = [
    // Frontend
    { name: "HTML5", icon: "/html.png", category: "frontend" },
    { name: "CSS3", icon: "/css.png", category: "frontend" },
    { name: "JavaScript", icon: "/javascript.png", category: "frontend" },
    { name: "TypeScript", icon: "/typescript.png", category: "frontend" },
    { name: "React", icon: "/reactjs.png", category: "frontend" },
    { name: "Next.js", icon: "/nextjs.png", category: "frontend" },
    { name: "Tailwind CSS", icon: "/tailwind.png", category: "frontend" },
    { name: "Redux", icon: "/redux.png", category: "frontend" },
    { name: "GSAP", icon: "/gsap.png", category: "frontend" },
    { name: "Three.js", icon: "/threejs.svg", category: "frontend" },

    // Backend
    { name: "Node.js", icon: "/nodejs.png", category: "backend" },
    { name: "Express", icon: "/express.png", category: "backend" },
    { name: "MongoDB", icon: "/mongodb.png", category: "backend" },
    { name: "PostgreSQL", icon: "/postgl.png", category: "backend" },
    { name: "MySQL", icon: "/sql.png", category: "backend" },
    { name: "Prisma", icon: "/prisma.png", category: "backend" },
    { name: "JWT", icon: "/jwt.png", category: "backend" },

    // Cloud
    { name: "AWS", icon: "/aws.png", category: "cloud" },
    { name: "Firebase", icon: "/firebase.svg", category: "cloud" },
    { name: "Vercel", icon: "/vercel.svg", category: "cloud" },
    { name: "Render", icon: "/render.png", category: "cloud" },
    { name: "Netlify", icon: "/netlify.svg", category: "cloud" },

    // Tools
    { name: "Git", icon: "/git.png", category: "tools" },
    { name: "Docker", icon: "/docker.png", category: "tools" },
    { name: "Figma", icon: "/figma.png", category: "tools" },
    { name: "VS Code", icon: "/vscode.png", category: "tools" },
    { name: "Postman", icon: "/postman.png", category: "tools" },
  ];

  const categories = [
    { name: "Frontend", icon: <FiCode className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { name: "Backend", icon: <FiServer className="w-5 h-5" />, color: "from-cyan-500 to-blue-500" },
    { name: "Cloud", icon: <FiDatabase className="w-5 h-5" />, color: "from-orange-500 to-red-500" },
    { name: "Tools", icon: <FiCpu className="w-5 h-5" />, color: "from-green-500 to-teal-500" },
  ];

  return (
    <section
      id="technologies"
      className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-br from-black via-purple-900/10 to-black overflow-hidden border-t border-purple-500/20"
    >
      {/* Background animation dots */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} initial="hidden" animate={controls} variants={containerVariants} className="text-center mb-16">
          <motion.p variants={itemVariants} className="text-purple-400 text-sm uppercase tracking-widest mb-4">
            My Skills
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-white font-black text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
          >
            Technologies
          </motion.h2>
          <motion.div variants={itemVariants} className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full" />
          <motion.p variants={itemVariants} className="text-gray-400 max-w-3xl mx-auto mt-6 text-lg">
            I work with a wide range of technologies to build full-stack applications with high performance and scalability.
          </motion.p>
        </motion.div>

        {/* Categories */}
        <motion.div initial="hidden" animate={controls} variants={containerVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${category.color} p-0.5 rounded-xl`}
            >
              <div className="bg-black/80 rounded-xl p-6 h-full flex flex-col items-center text-center">
                <div className={`bg-gradient-to-br ${category.color} p-3 rounded-full mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-300 text-sm">
                  {technologies.filter(t => t.category === category.name.toLowerCase()).length} technologies
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <motion.div initial="hidden" animate={controls} variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover="hover"
              className="flex flex-col items-center group"
            >
              <motion.div
                variants={bounceVariants}
                className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-3 border border-purple-500/30 backdrop-blur-sm transition-all duration-300 group-hover:border-purple-500/60 group-hover:shadow-lg group-hover:shadow-purple-500/20"
              >
                <Image src={tech.icon} alt={tech.name} width={40} height={40} className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
              <p className="text-white text-sm font-medium text-center group-hover:text-purple-400 transition-colors duration-300">
                {tech.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-8 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-white text-2xl font-bold mb-6 text-center">My Tech Stack Approach</h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                    <FiLayers className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold">Frontend Development</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Responsive and accessible interfaces using React, Next.js, Tailwind CSS, GSAP, and more.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
                    <FiServer className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold">Backend Development</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  REST APIs, authentication, WebSocket communication, and databases with Node.js, Express, and MongoDB.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg">
                    <FiCpu className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold">DevOps & Tools</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  CI/CD, Docker, version control, API testing, and modern development tooling for efficient workflows.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
