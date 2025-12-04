import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaGraduationCap,
  FaAward,
  FaStar,
} from "react-icons/fa";

const Experience = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const experienceRef = useRef(null);
  const isInView = useInView(experienceRef, { once: true, amount: 0.15 });

  // Experience data
  const experiences = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Tech Innovations Inc.",
      duration: "Jan 2023 - Present",
      description:
        "Developed responsive web applications using React.js and Next.js. Collaborated with UX designers to implement pixel-perfect interfaces.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      achievements: [
        "Improved page load time by 40%",
        "Led a team of 3 developers",
        "Implemented CI/CD pipeline",
      ],
    },
    {
      id: 2,
      role: "Freelance Web Developer",
      company: "Self-Employed",
      duration: "Mar 2021 - May 2022",
      description:
        "Worked with various clients to create custom web solutions and e-commerce platforms.",
      technologies: ["React", "Express", "MongoDB", "Firebase"],
      achievements: [
        "Maintained 95% client satisfaction",
        "Completed 10+ projects",
        "Developed reusable component library",
      ],
    },
  ];

  // Education data
  const education = [
    {
      id: 1,
      degree:
        " Bachelor of Science in Computer Science and Information Technology",
      institution: "Nepalaya College",
      duration: "2022 - Current",
      description:
        "Specialized in Web Development and Software Engineering. Graduated with honors.",
      achievements: ["GPA: 3.8/4.0", "Dean's List 2021-2023"],
      //  "Capstone Project Award"
    },
    {
      id: 2,
      degree: "MERN Stack  Certification",
      institution: "Mind Risers Academy",
      duration: "2025",
      description:
        "Intensive 3-month program covering modern web development technologies.",
      achievements: [
        "Top 5% of cohort",
        "Built 5+ projects",
        "MERN Stack Certification",
      ],
    },
  ];

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tabVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="experience"
      className="relative min-h-screen py-20 px-6 md:px-20 lg:px-32 bg-slate-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Static gradient orbs */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>

        {/* Reduced number of floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 rounded-full bg-indigo-500/30"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}

        {/* Static grid pattern  */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-20 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 text-center"
        >
          <motion.h1
            className="text-4xl alkalami-regular md:text-5xl lg:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            My <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">Journey</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl roboto-slab text-slate-300 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            My path in web development has been an exciting journey of
            continuous learning and growth
          </motion.p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="bg-slate-800/50 rounded-full p-1 flex border border-slate-700/30"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("experience")}
              className={`px-6 roboto-slab py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === "experience"
                  ? "bg-indigo-600 shadow-lg"
                  : "hover:bg-slate-700/50"
              }`}
            >
              <FaBriefcase />
              Experience
            </motion.button>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("education")}
              className={`px-6 roboto-slab py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === "education"
                  ? "bg-indigo-600 shadow-lg"
                  : "hover:bg-slate-700/50"
              }`}
            >
              <FaGraduationCap />
              Education
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Content Section*/}
        <motion.div
          ref={experienceRef}
          className="bg-slate-800/30 rounded-2xl p-6 md:p-8 border border-slate-700/30"
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          {/* Experience Tab */}
          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.h2
                className="text-2xl roboto-slab font-bold mb-8 text-center flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <FaBriefcase className=" text-indigo-400" />
                </motion.div>
                Work Experience
              </motion.h2>

              <motion.div
                className="relative"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {/* Timeline line */}
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-indigo-500/30 hidden sm:block"></div>

                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={itemVariants}
                    transition={{ duration: 0.55, delay: index * 0.12 }}
                    className="relative pl-12 sm:pl-16 pb-8 last:pb-0"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className="absolute left-0 top-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg ring-1 ring-indigo-400/20"
                      whileHover={{ scale: 1.06, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 260 }}
                    >
                      <FaBriefcase className="text-white text-base sm:text-lg" />
                    </motion.div>

                    <motion.div
                      className="bg-slate-800/70 rounded-xl p-5 sm:p-6 border border-slate-700/30"
                      whileHover={{ y: -6, transition: { duration: 0.18 } }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="text-lg sm:text-xl alkalami-regular font-bold">{exp.role}</h3>
                            <p className="text-slate-300 roboto-slab">{exp.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                          <FaCalendarAlt />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      <p className="text-slate-300 roboto-slab mb-4 text-sm sm:text-base">{exp.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <FaStar className="text-yellow-400" />
                          </motion.div>
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              variants={itemVariants}
                              transition={{ delay: i * 0.06 + index * 0.06 }}
                              className="flex items-center text-sm text-slate-400"
                            >
                              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            variants={itemVariants}
                            transition={{ delay: i * 0.04 + index * 0.04 }}
                            className="px-3 py-1 text-xs bg-slate-700/50 rounded-full text-slate-300 border border-slate-600/30"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <motion.h2
                className="text-2xl roboto-slab font-bold mb-8 text-center flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <FaGraduationCap className="text-purple-400" />
                </motion.div>
                Education
              </motion.h2>

              <div className="grid grid-cols-1 roboto-slab md:grid-cols-2 gap-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="bg-slate-800/70 rounded-xl p-6 border border-slate-700/30"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        className="text-2xl p-3 rounded-full bg-purple-600/20"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaGraduationCap className="text-purple-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl pt-serif-regular font-bold">{edu.degree}</h3>
                        <p className="text-slate-300 roboto-slab">{edu.institution}</p>
                      </div>
                    </div>

                    <div className="flex items-center roboto-slab gap-2 text-slate-400 mb-4">
                      <FaCalendarAlt />
                      <span>{edu.duration}</span>
                    </div>

                    <p className="text-slate-300 roboto-slab mb-4">{edu.description}</p>

                    <div>
                      <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <FaAward className="text-yellow-400" />
                        </motion.div>
                        Achievements
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.15 + i * 0.1 }}
                            className="flex items-center text-sm text-slate-400"
                          >
                            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
