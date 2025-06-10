import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Enhanced Navbar Component
const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: "about", title: "About" },
    { id: "services", title: "Services" },
    { id: "tech", title: "Tech" },
    { id: "portfolio", title: "Work" },
    { id: "contact", title: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full flex items-center py-5 fixed top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-black/20 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10" 
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ 
              scale: 1.2, 
              rotate: 360,
              boxShadow: "0 0 30px rgba(147, 51, 234, 0.8)"
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
            <span className="relative text-white font-bold text-xl z-10">VS</span>
          </motion.div>
          <div>
            <p className="text-white text-xl font-bold">
              Vikram Singh
            </p>
            <p className="text-purple-400 text-sm hidden sm:block">
              Full Stack Developer
            </p>
          </div>
        </motion.div>

        <ul className="list-none hidden sm:flex flex-row gap-8">
          {navLinks.map((nav, index) => (
            <motion.li
              key={nav.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className={`${
                active === nav.title ? "text-white" : "text-gray-300"
              } hover:text-white text-lg font-medium cursor-pointer relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`} className="relative z-10">
                {nav.title}
              </a>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setToggle(!toggle)}
            className="relative w-8 h-8 flex flex-col justify-center items-center"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  rotate: toggle ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y: toggle ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                  opacity: toggle && i === 1 ? 0 : 1,
                }}
                className="w-6 h-0.5 bg-white mb-1 last:mb-0"
              />
            ))}
          </motion.button>

          <motion.div
            initial={false}
            animate={{
              scale: toggle ? 1 : 0,
              opacity: toggle ? 1 : 0,
            }}
            className="absolute top-16 right-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
          >
            <ul className="flex flex-col p-4 gap-2">
              {navLinks.map((nav, index) => (
                <motion.li
                  key={nav.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 text-white hover:text-purple-400 cursor-pointer"
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
