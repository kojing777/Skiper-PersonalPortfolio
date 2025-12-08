import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameTime, setGameTime] = useState(10);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(Math.round(scrolled));
      setShowScroll(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timer;
    if (gameActive && gameTime > 0) {
      timer = setTimeout(() => setGameTime(gameTime - 1), 1000);
    } else if (gameTime === 0) {
      setGameActive(false);
    }
    return () => clearTimeout(timer);
  }, [gameActive, gameTime]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startGame = () => {
    setGameScore(0);
    setGameTime(10);
    setGameActive(true);
    setShowGame(true);
  };

  const handleGameClick = () => {
    if (gameActive) {
      setGameScore(gameScore + 1);
    }
  };

  // Ring settings
  const radius = 20;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const progress = (scrollPercent / 100) * circumference;

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 py-12 overflow-hidden">
      {/* Floating gradient */}
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-20 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-20 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"
      />

      {/* Footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl sofia-regular font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
            Bijaya Tamang
          </h2>
          <p className="text-sm roboto-slab text-slate-400 mt-1.5">
            MERN Stack Developer.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap pt-serif-regular justify-center gap-6 text-sm font-medium"
        >
          {["Home", "About", "Projects", "Contact"].map((link, i) => (
            <li key={i}>
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:text-indigo-400 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById(link.toLowerCase());
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4"
        >
          <motion.a
            href="https://github.com/kojing777"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }}
            className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-indigo-400 transition"
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }}
            className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-indigo-400 transition"
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a
            href="mailto:kojingmoktan92@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }}
            className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-indigo-400 transition"
          >
            <Mail size={20} />
          </motion.a>
          <motion.a
            href="https://bijaya-tamang.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -3 }}
            className="p-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-indigo-400 transition"
          >
            <Globe size={20} />
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 text-center mt-10 border-t border-slate-800 pt-6"
      >
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Bijaya Tamang. All rights reserved.
        </p>
      </motion.div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 z-40"
          >
            {/* Button */}
            <button
              onClick={scrollToTop}
              className="relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 group"
            >
              {/* Progress Ring */}
              <svg className="absolute -rotate-90 w-16 h-16">
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="url(#progressGradient)"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - progress}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage display */}
              <div className="relative flex flex-col items-center justify-center">
                <motion.span
                  key={scrollPercent}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-xs font-bold text-white"
                >
                  {scrollPercent}%
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute -bottom-4"
                ></motion.div>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
