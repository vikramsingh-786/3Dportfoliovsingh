'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Tilt } from 'react-tilt';
import { FiCode, FiServer, FiLayers, FiMonitor, FiDatabase, FiPieChart } from 'react-icons/fi';
import { useEffect } from 'react';

const Services = () => {
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

  const services = [
    { 
      title: "Web Development", 
      icon: <FiCode className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Responsive Design",
        "Single Page Applications",
        "Progressive Web Apps",
        "Performance Optimization"
      ]
    },
    { 
      title: "Backend Development", 
      icon: <FiServer className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500",
      features: [
        "RESTful APIs",
        "GraphQL Services",
        "Database Design",
        "Authentication Systems"
      ]
    },
    { 
      title: "Full-Stack Solutions", 
      icon: <FiLayers className="w-6 h-6" />,
      color: "from-green-500 to-teal-500",
      features: [
        "End-to-End Development",
        "Architecture Design",
        "Third-party Integrations",
        "Deployment & Scaling"
      ]
    },
    { 
      title: "UI/UX Design", 
      icon: <FiMonitor className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      features: [
        "Wireframing & Prototyping",
        "User Experience Design",
        "Design Systems",
        "Accessibility Compliance"
      ]
    },
    { 
      title: "Database Solutions", 
      icon: <FiDatabase className="w-6 h-6" />,
      color: "from-yellow-500 to-amber-500",
      features: [
        "Database Architecture",
        "Query Optimization",
        "Data Migration",
        "NoSQL & SQL Solutions"
      ]
    },
    { 
      title: "Analytics & SEO", 
      icon: <FiPieChart className="w-6 h-6" />,
      color: "from-indigo-500 to-violet-500",
      features: [
        "Performance Tracking",
        "SEO Optimization",
        "Data Visualization",
        "Conversion Analysis"
      ]
    }
  ];

  return (
    <section
      id="services"
      className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-br from-black via-purple-900/10 to-black overflow-hidden border-t border-purple-500/20"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500"
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
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              opacity: Math.random() * 0.05 + 0.02,
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
            What I Offer
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-white font-black text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
          >
            Services
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-3xl mx-auto mt-6 text-lg"
          >
            Comprehensive solutions tailored to your needs, from initial concept to final deployment and beyond.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
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
                <div className={`h-full bg-gradient-to-br ${service.color} p-0.5 rounded-2xl transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-500/30`}>
                  <div className="h-full bg-gradient-to-br from-black via-purple-900/20 to-black rounded-2xl p-6 flex flex-col backdrop-blur-sm border border-purple-500/30 transition-all duration-500 group-hover:border-purple-500/60">
                    <div className={`bg-gradient-to-br ${service.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 self-start`}>
                      {service.icon}
                    </div>
                    
                    <h3 className="text-white text-xl font-bold mb-4">{service.title}</h3>
                    
                    <ul className="space-y-3 mb-6 flex-1">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`bg-gradient-to-br ${service.color} w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0`}></span>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className={`h-0.5 bg-gradient-to-r ${service.color} mt-auto`}
                    />
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-8 border border-purple-500/30 backdrop-blur-sm">
            <h3 className="text-white text-2xl font-bold mb-8 text-center">My Development Process</h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { 
                  title: "Discovery", 
                  description: "Understanding your goals and requirements",
                  color: "bg-purple-500"
                },
                { 
                  title: "Planning", 
                  description: "Creating architecture and roadmap",
                  color: "bg-pink-500"
                },
                { 
                  title: "Development", 
                  description: "Building with clean, maintainable code",
                  color: "bg-cyan-500"
                },
                { 
                  title: "Delivery", 
                  description: "Testing, deployment, and support",
                  color: "bg-blue-500"
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold mb-4`}>
                    {index + 1}
                  </div>
                  <h4 className="text-white font-medium mb-2">{step.title}</h4>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;