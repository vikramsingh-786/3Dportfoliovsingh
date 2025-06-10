'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Tilt } from 'react-tilt';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { useEffect } from 'react';

const Portfolio = () => {
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

  const projects = [
       {
      id: 1,
      image: "/Nova.png",
      title: "Nova AI Assistant",
      demo: "https://vsinghnovaai.vercel.app/",
      code: "https://github.com/vikramsingh-786/NovaAI",
      desc: "NovaAI is a smart AI chat platform like ChatGPT and DeepSeek, built for real-time, intelligent conversations. It helps with coding, writing, learning, and more to boost productivity and creativity.",
      tags: ["React", "Firebase", "Tailwind CSS", "Context API"]
    },
    {
      id: 2,
      image: "/IMG5.png",
      title: "SHOPITO - MERN E-commerce",
      demo: "https://vs-shopito.vercel.app/",
      code: "https://github.com/vikramsingh-786/mern-ecommerce-platform",
      desc: "Full-fledged E-commerce platform with payment integration, admin dashboard, and real-time features built with MERN stack.",
      tags: ["React", "Node.js", "MongoDB", "Express", "Stripe"]
    },
    {
      id: 3,
      image: "/IMG2.png",
      title: "Coursify - LMS Platform",
      demo: "https://coursifyvs.vercel.app/",
      code: "https://github.com/vikramsingh-786/coursify",
      desc: "Learning Management System with course creation, video streaming, progress tracking, and interactive quizzes.",
      tags: ["React", "Node.js", "MongoDB", "JWT", "Video Streaming"]
    },
     {
      id: 4,
      image: "/weatherapp.png",
      title: "Weather Dashboard",
      demo: "https://weatherly18.netlify.app/",
      code: "https://github.com/manju1807/Weatherly-nextjs-weather-app",
      desc: "Weather Dashboard is a simple, interactive app showing real-time weather and 5-day forecasts. Search any location for detailed info. Includes animated icons and a clean interface.",
      tags: ["React", "API Integration", "Chart.js", "Geolocation"]
    },
    {
      id: 5,
      image: "/quiz.png",
      title: "INTUITIVE QUIZ HUB",
      demo: "https://developerquizapp.netlify.app/",
      code: "https://github.com/vikramsingh-786/ThinkTank-Trivia",
      desc: "Modern portfolio template with smooth animations, dark mode, and responsive design.",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"]
    },
    {
      id: 6,
      image: "/IMG1.png",
      title: "Animation Website",
      demo: "https://golfanimation.netlify.app/",
      code: "https://github.com/vikramsingh-786/Family_Golf",
      desc: "Immersive web experience with stunning animations, smooth transitions, and interactive elements using GSAP.",
      tags: ["HTML5", "CSS3", "JavaScript", "GSAP", "Animations"]
    }
    
  ];

  return (
    <section
      id="portfolio"
      className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-br from-black via-purple-900/10 to-black overflow-hidden border-t border-purple-500/20"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random(),
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              opacity: Math.random() * 0.1 + 0.05,
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
            My Work
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-white font-black text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
          >
            Portfolio
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-3xl mx-auto mt-6 text-lg"
          >
            Selected projects that showcase my skills and experience. Each project represents a unique challenge and solution.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Tilt
                options={{
                  max: 15,
                  scale: 1.05,
                  speed: 500,
                  glare: true,
                  'max-glare': 0.2,
                }}
                className="h-full"
              >
                <div className="relative h-full flex flex-col bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl overflow-hidden border border-purple-500/30 backdrop-blur-sm transition-all duration-500 group-hover:border-purple-500/60">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Demo Link */}
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full shadow-lg"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>

                  {/* Project Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className="text-white text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 flex-1">
                      {project.desc}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-black/30 text-purple-300 text-xs rounded-full border border-purple-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex justify-between items-center pt-2 border-t border-purple-500/20">
                      <a
                        href={project.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-white text-sm font-medium flex items-center transition-colors duration-300"
                      >
                        <FiGithub className="mr-2" />
                        View Code
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm font-medium flex items-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                      >
                        Live Demo
                        <FiArrowRight className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/vikramsingh-786"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg group glow hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-500"
          >
            View All Projects
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowRight className="w-5 h-5" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;