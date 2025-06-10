import React from 'react'
import {motion} from "framer-motion";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/vikramsingh-786" },
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/vikram-singh-508b08250/" },
    { name: "Twitter", icon: "🐦", url: "https://x.com/VikramS01972090" },
    { name: "Instagram", icon: "📸", url: "https://www.instagram.com/vikram___5683/?hl=en" },
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-black via-purple-900/20 to-black border-t border-purple-500/20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 400,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 400,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/50"
              >
                <span className="text-white font-bold text-lg">VS</span>
              </motion.div>
              <div>
                <h3 className="text-white font-bold text-xl">Vikram Singh</h3>
                <p className="text-purple-400 text-sm">Full Stack Developer</p>
              </div>
            </motion.div>
            
            <p className="text-gray-400 leading-relaxed">
              Crafting digital experiences that inspire and engage. Let's build something amazing together.
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 15,
                    boxShadow: "0 10px 20px rgba(147, 51, 234, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 backdrop-blur-sm hover:bg-purple-500/30 transition-all duration-300"
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h4 className="text-white font-bold text-lg">Services</h4>
            <ul className="space-y-3">
              {[
                "Web Development",
                "UI/UX Design",
                "Backend Development",
                "Content Creation",
                "Consulting"
              ].map((service, index) => (
                <motion.li
                  key={service}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 cursor-pointer">
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="w-2 h-2 bg-pink-500 rounded-full"
                    />
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h4 className="text-white font-bold text-lg">Get In Touch</h4>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                <span className="text-xl">📧</span>
                <span>bobvik2003@gmail.com</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                <span className="text-xl">📱</span>
                <span>+91 9219251196</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                <span className="text-xl">📍</span>
                <span>Gwalior, India</span>
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2"
            >
              <span>💬</span>
              Let's Chat
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-purple-500/20 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Vikram Singh. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Cookies Policy
              </a>
            </div>
          </div>
          <p className="mt-4 text-gray-500 text-xs">
            Made with ❤️ and ☕ in India
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer
