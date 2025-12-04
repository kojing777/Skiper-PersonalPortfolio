import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGitAlt,
  FaTools,
  FaCode,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiVercel,
  SiPostman,
  SiRender,
} from "react-icons/si";
import { FaGithub } from "react-icons/fa6";

// Background Component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating shapes */}
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

      {/* Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzMzM4NDIiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
    </div>
  );
};

// Skills Component
const Skills = () => {
  const skillsRef = useRef(null);
  const isInView = useInView(skillsRef, { once: true, amount: 0.3 });

  // Tech stack icons
  const techStack = [
    { icon: <FaHtml5 className="text-orange-500" />, name: "HTML5" },
    { icon: <SiMongodb className="text-green-600" />, name: "MongoDB" },
    { icon: <SiExpress className="text-gray-400" />, name: "Express" },
    { icon: <FaReact className="text-sky-400" />, name: "React" },
    { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
    { icon: <FaCss3Alt className="text-blue-500" />, name: "CSS3" },
    { icon: <SiTailwindcss className="text-cyan-400" />, name: "TailwindCSS" },
    { icon: <FaJs className="text-yellow-400" />, name: "JavaScript" },
    { icon: <FaDatabase className="text-purple-400" />, name: "Database" },
    { icon: <FaGitAlt className="text-orange-600" />, name: "Git" },
  ];

  // Tools icons
  const toolsStack = [
    { icon: <FaGithub className="text-gray-200" />, name: "GitHub" },
    { icon: <SiPostman className="text-orange-500" />, name: "Postman" },
    { icon: <SiVercel className="text-gray-200" />, name: "Vercel" },
    { icon: <SiRender className="text-purple-500" />, name: "Render" },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen py-12 px-6 md:px-20 lg:px-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden pt-20"
    >
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-10 text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl alkalami-regular lg:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Skills
            </span>
          </motion.h1>

          <motion.p
            className="text-xl max-w-3xl mx-auto roboto-slab text-slate-300 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Explore the technologies and tools I specialize in. This section is
            all about my personal skills and development toolkit.
          </motion.p>
        </motion.div>

        {/* Technical Stack Section */}
        <div ref={skillsRef} className="mb-12">
          {/* Tech Stack Grid */}
          <div className="grid roboto-slab grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {techStack.map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700/50 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{tech.icon}</div>
                <p className="text-lg font-medium text-center">{tech.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="mt-12 text-center"
          >
            <h3 className="text-3xl alkalami-regular font-bold mb-6 flex items-center justify-center gap-3">
              Development <span className="text-cyan-400">Tools</span>
            </h3>

            <div className="flex  flex-wrap justify-center gap-6 max-w-2xl mx-auto">
              {toolsStack.map((tool, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                  className="flex alkalami-regular flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700/50 shadow-md min-w-[120px]"
                >
                  <div className="text-3xl mb-2">{tool.icon}</div>
                  <p className="font-medium roboto-slab text-center">{tool.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
