"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaMobile,
  FaServer,
  FaCode,
  FaLayerGroup,
} from "react-icons/fa";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaHtml5 } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { SiCss3 } from "react-icons/si";
import { SiMongodb, SiTailwindcss, SiExpress } from "react-icons/si";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });
  const scroll = useMotionValue(0);
  const smoothScroll = useSpring(scroll, { stiffness: 100, damping: 30 });
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const updateScreen = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = window.scrollY;
        const offsetTop = containerRef.current.offsetTop;
        const height = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const progress = Math.max(
          0,
          Math.min(1, (scrollTop + windowHeight - offsetTop) / (height * 0.7))
        );
        setScrollProgress(progress);
        // drive motion value for smoother, interactive scroll-linked animations
        scroll.set(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe when this section actually enters the viewport to trigger entry animations
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [containerRef]);

  const onMouseTrack = (e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  const projects = [
    {
      id: 1,
      title: "Groceezy",
      description:
        "A modern grocery delivery platform connecting local stores with customers in real-time.",
      features: [
        "Real-time inventory tracking",
        "Smart recommendation engine",
        "Multiple payment options",
        "Store management dashboard",
      ],
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      stack: ["Frontend", "Backend", "Database", "DevOps"],
      icons: [FaReact, FaNodeJs, SiMongodb, FaServer],
      githubUrl: "https://github.com/kojing777/Groceezy-Frontend-v1.0",
      liveUrl: "https://groceezy.kojing.me/",
      image:
        "https://res.cloudinary.com/dp27ua535/image/upload/v1757216017/Screenshot_2025-09-07_091826_w6iplj.png",
      color: "#4F46E5",
      type: "Full-Stack",
    },
    {
      id: 2,
      title: "Fra-cheur",
      description:
        "Artisanal bakery e-commerce with custom order interface and local delivery tracking.",
      features: [
        "Custom cake design interface",
        "Local delivery zone mapping",
        "Seasonal specials calendar",
        "Order tracking system",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      stack: ["Frontend", "UI/UX", "Mobile-First"],
      icons: [FaHtml5, SiCss3, FaJsSquare, FaMobile],
      githubUrl: "https://github.com/kojing777/Fra-cheur-v1.1",
      liveUrl: "https://fra-cheur.vercel.app/",
      image:
        "https://res.cloudinary.com/dp27ua535/image/upload/v1757217075/Screenshot_2025-09-07_093517_ancuhs.png",
      color: "#8B5CF6",
      type: "Frontend",
    },
    {
      id: 3,
      title: "MeubelHouse",
      description:
        "Furniture e-commerce with AR preview, room customization, and complete order management.",
      features: [
        "AR product visualization",
        "Room style filters",
        "Customization options",
        "Assembly service booking",
      ],
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
      stack: ["Full-Stack", "3D Integration", "E-commerce"],
      icons: [FaReact, FaNodeJs, SiMongodb, SiTailwindcss],
      githubUrl: "https://github.com/kojing777/MeubelHouse",
      liveUrl: "https://meubel-house-iota.vercel.app/",
      image:
        "https://res.cloudinary.com/dp27ua535/image/upload/v1757215916/Screenshot_2025-09-07_091455_k50kfz.png",
      color: "#3B82F6",
      type: "Full-Stack",
    },
    {
      id: 4,
      title: "Lama AI",
      description:
        "AI-powered full-stack web application providing text generation, summarization and image creation with a clean, responsive UI.",
      features: [
        "AI text generation and summarization",
        "On-demand image creation",
        "Secure authentication and user management",
        "Image storage via ImageKit and payments with Stripe",
      ],
      technologies: ["MERN", "Tailwind CSS", "OpenAI", "ImageKit", "Stripe"],
      stack: ["Full-Stack", "AI Integration", "Payments"],
      icons: [FaReact, FaNodeJs, SiMongodb, SiTailwindcss],
      githubUrl: "https://github.com/kojing777/Lama-AI",
      liveUrl: "https://lama-ai-five.vercel.app/",
      image:
        "https://res.cloudinary.com/dp27ua535/image/upload/v1764830451/Screenshot_2025-12-04_122538_nqfmkn.png",
      color: "#06B6D4",
      type: "Full-Stack",
    },
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
      onMouseMove={onMouseTrack}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-10 w-2 h-20 bg-gradient-to-b from-cyan-400/20 to-blue-500/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            rotate: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-12 w-2 h-24 bg-gradient-to-b from-purple-400/20 to-pink-500/20 rounded-full blur-sm"
        />

        {/* Progress indicator */}
        <motion.div
          className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"
          style={{ scaleY: scrollProgress }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl alkalami-regular font-extrabold">
              My{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Projects
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl roboto-slab text-slate-300 max-w-3xl mx-auto mb-8">
            Here are some of the projects I've built using modern technologies
            and best practices{" "}
          </p>

          {/* <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="px-4 py-2 bg-indigo-500/10 text-indigo-300 rounded-full text-sm font-medium">
              React
            </span>
            <span className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-full text-sm font-medium">
              Node.js
            </span>
            <span className="px-4 py-2 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium">
              MongoDB
            </span>
            <span className="px-4 py-2 bg-pink-500/10 text-pink-300 rounded-full text-sm font-medium">
              Tailwind
            </span>
          </motion.div> */}
        </motion.div>

        {/* Main Showcase */}
        <div className="relative">
          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative"
                // subtle parallax: cards move slightly based on scroll progress
                style={{
                  transform: `translateY(${
                    -scrollProgress * (8 + index * 3)
                  }px)`,
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-slate-600/70"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                    {/* Project Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 pt-serif-regular py-1 rounded-full text-sm font-medium ${
                          project.type === "Full-Stack"
                            ? "bg-gradient-to-r from-indigo-400/50 to-purple-400/10 text-black"
                            : "bg-gradient-to-r from-blue-500/20 to-cyan-500/40 text-black"
                        }`}
                      >
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl alkalami-regular md:text-2xl font-bold text-white">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.icons.map((Icon, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-2 bg-slate-800/50 rounded-lg"
                          >
                            <Icon className="text-slate-300" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-300 roboto-slab mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-slate-800/70 text-slate-300 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm pt-serif-regular text-slate-400">
                        <FaCode className="text-indigo-400" />
                        <span>Click for details</span>
                      </div>
                      <div className="flex gap-2">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub className="text-white" />
                        </motion.a>
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt className="text-white" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Developer Skills Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Development Stack
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  icon: FaReact,
                  label: "Frontend",
                  desc: "React, Next.js, Framer Motion",
                },
                {
                  icon: FaNodeJs,
                  label: "Backend",
                  desc: "Node.js, Express, REST APIs",
                },
                {
                  icon: SiMongodb,
                  label: "Database",
                  desc: "MongoDB, Mongoose, Prisma",
                },
                {
                  icon: FaServer,
                  label: "DevOps",
                  desc: "Vercel, Cloudinary, Git",
                },
              ].map((skill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700/30 backdrop-blur-sm text-center"
                >
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-4">
                    <skill.icon className="text-3xl text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {skill.label}
                  </h3>
                  <p className="text-sm text-slate-400">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                onClick={() => setSelectedProject(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950"
              >
                <div className="h-full overflow-y-auto">
                  {/* Modal Header */}
                  <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-900 to-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl alkalami-regular md:text-4xl font-bold text-white">
                          {selectedProject.title}
                        </h2>
                        <div className="flex items-center gap-3 mt-2">
                          <span
                            className={`px-4 py-1 rounded-full font-medium pt-serif-regular ${
                              selectedProject.type === "Full-Stack"
                                ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300"
                                : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300"
                            }`}
                          >
                            {selectedProject.type}
                          </span>
                          <div className="flex gap-2">
                            {selectedProject.icons.map((Icon, i) => (
                              <div
                                key={i}
                                className="p-2 bg-slate-800/50 rounded-lg"
                              >
                                <Icon className="text-slate-300" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="p-3 hover:bg-slate-800 rounded-full transition-colors"
                      >
                        <span className="text-3xl">×</span>
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 md:p-8">
                    {/* Project Image */}
                    <div className="rounded-xl overflow-hidden mb-8">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-auto"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Description */}
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold roboto-slab text-white mb-4">
                          About This Project
                        </h3>
                        <p className="text-slate-300 mb-6">
                          {selectedProject.description}
                        </p>

                        <div className="mb-8">
                          <h4 className="text-xl font-bold roboto-slab text-white mb-4">
                            Key Features
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {selectedProject.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3 p-4 pt-serif-regular rounded-lg bg-slate-800/30"
                              >
                                <div className="p-2 rounded-full bg-indigo-500/20">
                                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                </div>
                                <span className="text-slate-300">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tech Stack & Links */}
                      <div>
                        <div className="mb-8 pt-serif-regular">
                          <h4 className="text-xl font-bold text-white mb-4">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-8 pt-serif-regular">
                          <h4 className="text-xl font-bold text-white mb-4">
                            Development Stack
                          </h4>
                          <div className="space-y-2">
                            {selectedProject.stack.map((stack, i) => (
                              <div
                                key={i}
                                className="flex items-center gap-3 text-slate-300"
                              >
                                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                <span>{stack}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4 pt-serif-regular">
                          <motion.a
                            href={selectedProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-colors"
                            whileHover={{ scale: 1.02 }}
                          >
                            <FaGithub />
                            View Source Code
                          </motion.a>
                          <motion.a
                            href={selectedProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-medium transition-all"
                            whileHover={{ scale: 1.02 }}
                          >
                            <FaExternalLinkAlt />
                            View Live Demo
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
