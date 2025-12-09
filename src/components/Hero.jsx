"use client";

import { useEffect, useRef, useState } from "react";
// Smooth scroll handler
const handleSmoothScroll = (e, targetId) => {
  e.preventDefault();
  const el = document.getElementById(targetId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFileDownload,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import Image from "../assets/me3121212.jpg";
import Image1 from "../assets/oreo.jpg";

// GRID BACKGROUND SETTINGS
const CELL_SIZE = 120;
const COLORS = ["#A764FF", "#4B94FD", "#FD4B4E", "#FF8743"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function SubGrid({ idx }) {
  const [cellColors, setCellColors] = useState([null, null, null, null]);
  const leaveTimeouts = useRef([null, null, null, null]);

  function handleHover(cellIdx) {
    if (leaveTimeouts.current[cellIdx]) {
      clearTimeout(leaveTimeouts.current[cellIdx]);
      leaveTimeouts.current[cellIdx] = null;
    }
    setCellColors((prev) =>
      prev.map((c, i) => (i === cellIdx ? getRandomColor() : c))
    );
  }

  function handleLeave(cellIdx) {
    leaveTimeouts.current[cellIdx] = setTimeout(() => {
      setCellColors((prev) => prev.map((c, i) => (i === cellIdx ? null : c)));
      leaveTimeouts.current[cellIdx] = null;
    }, 120);
  }

  useEffect(() => {
    return () => {
      leaveTimeouts.current.forEach((t) => t && clearTimeout(t));
    };
  }, []);

  return (
    <div
      className="grid grid-cols-2 grid-rows-2 gap-[2px] pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    >
      {[0, 1, 2, 3].map((cellIdx) => (
        <div
          key={cellIdx}
          className="transition-colors duration-300"
          style={{
            background: cellColors[cellIdx] || "transparent",
            pointerEvents: "auto",
          }}
          onMouseEnter={() => handleHover(cellIdx)}
          onMouseLeave={() => handleLeave(cellIdx)}
        />
      ))}
    </div>
  );
}

function InteractiveGrid() {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    function updateGrid() {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setGrid({
          columns: Math.ceil(width / CELL_SIZE),
          rows: Math.ceil(height / CELL_SIZE),
        });
      }
    }
    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  const total = grid.columns * grid.rows;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    >
      <div
        className="grid gap-[2px] w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: total }).map((_, idx) => (
          <SubGrid key={idx} idx={idx} />
        ))}
      </div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col-reverse md:flex-row  items-center justify-center md:justify-between px-6 md:px-20 lg:px-32 bg-slate-950 text-white overflow-hidden">
      {/*  Interactive Hover Grid Background */}
      <InteractiveGrid />

      {/*  Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-3/4 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-sm"
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500/15 to-blue-500/15 blur-sm"
        />
      </div>

      {/* Left content */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex mt-8 flex-col gap-6 max-w-3xl text-center md:text-left z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-7xl font-extrabold leading-tight sofia-regular"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Bijaya Tamang
          </span>
        </motion.h1>

        <TypeAnimation
          sequence={[
            "MERN Stack Developer 🧩",
            2000,
            "Frontend Engineer 🖥️",
            2000,
            "React & Next.js Enthusiast 🔥",
            2000,
            "UI/UX Designer 🎨",
            2000,
          ]}
          wrapper="span"
          speed={50}
          className="text-sm md:text-xl font-medium text-slate-300 min-h-[2rem] md:min-h-[2.5rem]  playwrite-nz-guides-regular "
          repeat={Infinity}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="roboto-slab text-base md:text-lg text-slate-400 max-w-lg"
        >
          Passionate about building modern, scalable, and user-friendly web
          applications with a focus on performance and design. Currently
          crafting digital experiences with cutting-edge technologies.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <a
            href="#projects"
            onClick={(e) => handleSmoothScroll(e, "projects")}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pt-serif-regular px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition-all font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              View Projects
            </motion.button>
          </a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, "contact")}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pt-serif-regular px-6 py-3 rounded-full border border-slate-600 hover:border-indigo-500 transition-all font-medium flex items-center gap-2"
            >
              <HiMail className="text-lg" />
              Contact Me
            </motion.button>
          </a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/public/bijaya-tamang.pdf"
            download
            className="pt-serif-regular px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all font-medium flex items-center gap-2"
          >
            <FaFileDownload className="text-lg" />
            Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex gap-4 justify-center md:justify-start mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.a
            whileHover={{ y: -5, scale: 1.1 }}
            href="https://github.com/kojing777"
            target="_blank"
            className="p-3 rounded-full bg-slate-800 hover:bg-indigo-600 transition-all duration-300 ease-in-out transform-gpu"
            aria-label="GitHub"
          >
            <FaGithub className="text-xl" />
          </motion.a>
          <motion.a
            whileHover={{ y: -5, scale: 1.1 }}
            href="https://linkedin.com"
            target="_blank"
            className="p-3 rounded-full bg-slate-800 hover:bg-indigo-600 transition-all duration-300 ease-in-out transform-gpu"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-xl" />
          </motion.a>
          <motion.a
            whileHover={{ y: -5, scale: 1.1 }}
            href="https://twitter.com"
            target="_blank"
            className="p-3 rounded-full bg-slate-800 hover:bg-indigo-600 transition-all duration-300 ease-in-out transform-gpu"
            aria-label="Twitter"
          >
            <FaTwitter className="text-xl" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right image */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative mt-12 md:mt-0 flex justify-center items-center md:-translate-x-4"
      >
        {/* Ripple Effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.05, 0.1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20"
        />

        {/* Profile Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-700 shadow-xl shadow-indigo-900/40 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 group-hover:opacity-0 transition-opacity duration-700 z-10"></div>
          <img
            src={Image}
            alt="Kojing Moktan"
            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30"
        >
          <span className="text-white roboto-slab font-bold">React</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30"
        >
          <span className="text-white roboto-slab font-bold">JS</span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center text-slate-400"
      >
        <span className="text-sm roboto-slab mb-2">Scroll down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-indigo-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
