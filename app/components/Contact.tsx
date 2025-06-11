"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect } from "react";
import {
  FiSend,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiCheck,
  FiX,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    emailjs.init("mkrGLlFKQL_tLsUBs");
  }, []);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(
        () => setStatus({ type: null, message: "" }),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    // Email to admin (contains user's message)
    const userToAdminParams = {
      from_name: form.name,
      from_email: form.email,
      to_name: "Vikram Singh", // Admin name
      to_email: "bobvik2003@gmail.com", // Fixed admin email
      message: form.message,
      reply_to: form.email,
    };

    // Confirmation email to user
    const adminToUserParams = {
      from_name: "Vikram Singh", // Admin name
      from_email: "bobvik2003@gmail.com", // Fixed from admin email
      to_name: form.name, // User's name
      to_email: form.email, // User's email
      message: "Thank you for contacting me! I will get back to you soon.",
      reply_to: "bobvik2003@gmail.com",
    };

    try {
      // Send to admin
      const userToAdmin = await emailjs.send(
        "service_1hb6xn4",
        "template_oidiejn", // Template with user's message
        userToAdminParams
      );
      
      // Send to user
      const adminToUser = await emailjs.send(
        "service_1hb6xn4",
        "template_vqzvk5u", // Thank you template
        adminToUserParams
      );

      if (userToAdmin.status === 200 && adminToUser.status === 200) {
        setStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent and a confirmation has been sent to your email.",
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Email not sent");
      }
    } catch (err) {
      console.error("Email sending error:", err);
      setStatus({
        type: "error",
        message:
          "Failed to send message. Please try again or email me directly at bobvik2003@gmail.com.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-br from-black via-purple-900/10 to-black overflow-hidden border-t border-purple-500/20"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/20"
            initial={{
              x: Math.random() * (window.innerWidth || 1920),
              y: Math.random() * (window.innerHeight || 1080),
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: Math.random() * (window.innerWidth || 1920),
              y: Math.random() * (window.innerHeight || 1080),
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              opacity: Math.random() * 0.2 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
          className="text-center mb-16"
        >
          <motion.p
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="text-purple-400 text-sm uppercase tracking-widest mb-4"
          >
            Get in touch
          </motion.p>
          <motion.h2
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="text-white font-black text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
          >
            Contact Me
          </motion.h2>
          <motion.div
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-white text-2xl font-bold mb-6">
                Send me a message
              </h3>

              {status.type && (
                <motion.div
                  className={`mb-6 p-4 rounded-lg border flex items-center space-x-2 ${
                    status.type === "success"
                      ? "bg-green-900/30 border-green-500/30 text-green-400"
                      : "bg-red-900/30 border-red-500/30 text-red-400"
                  }`}
                >
                  {status.type === "success" ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <FiX className="w-5 h-5" />
                  )}
                  <p className="text-sm">{status.message}</p>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    disabled={loading}
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    disabled={loading}
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="text-gray-300 text-sm font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    required
                    disabled={loading}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.03 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4zm2 5.3A8 8 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.64z"
                        ></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-white text-2xl font-bold">
              Let's build something amazing together!
            </h3>
            <p className="text-gray-300">
              Whether you have a project in mind or just want to say hello, feel
              free to reach out!
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <FiGithub />,
                  label: "GitHub",
                  url: "https://github.com/vikramsingh7880323067",
                },
                {
                  icon: <FiLinkedin />,
                  label: "LinkedIn",
                  url: "https://www.linkedin.com/in/vikram-singh-508b08250/",
                },
                {
                  icon: <FiTwitter />,
                  label: "Twitter",
                  url: "https://x.com/VikramS01972090",
                },
                {
                  icon: <FiMail />,
                  label: "Email",
                  url: "mailto:bobvik2003@gmail.com",
                },
              ].map(({ icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-black/30 border border-purple-500/30 rounded-lg p-4 hover:border-purple-500/50 transition-all"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                    {icon}
                  </div>
                  <span className="text-white font-medium">{label}</span>
                </a>
              ))}
            </div>

            <div className="bg-black/30 border border-purple-500/30 rounded-xl p-6 mt-8">
              <h4 className="text-white font-bold mb-3">
                Current Availability
              </h4>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <p className="text-gray-300">
                  Available for freelance work and collaborations
                </p>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Typically responds within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;