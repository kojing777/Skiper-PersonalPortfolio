import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaHeart, FaLightbulb } from "react-icons/fa";
import createGlobe from "cobe";

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

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzMzM4NDIiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
    </div>
  );
};

// Globe Component
const Globe = ({
  className,
  theta = 0.25,
  dark = 0,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 60000,
  mapBrightness = 10,
  baseColor = "#818cf8",
  markerColor = "#c084fc",
  glowColor = "#f472b6",
}) => {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(theta);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const autoRotateSpeed = 0.003;

  const hexToRgbNormalized = (hex) => {
    let r = 0,
      g = 0,
      b = 0;
    const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
    if (cleanHex.length === 3) {
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else if (cleanHex.length === 6) {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }
    return [r / 255, g / 255, b / 255];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedBaseColor =
      typeof baseColor === "string" ? hexToRgbNormalized(baseColor) : baseColor;
    const resolvedMarkerColor =
      typeof markerColor === "string"
        ? hexToRgbNormalized(markerColor)
        : markerColor;
    const resolvedGlowColor =
      typeof glowColor === "string" ? hexToRgbNormalized(glowColor) : glowColor;

    const initGlobe = () => {
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }

      const rect = canvas.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const devicePixelRatio = window.devicePixelRatio || 1;
      const internalWidth = size * devicePixelRatio;
      const internalHeight = size * devicePixelRatio;

      canvas.width = internalWidth;
      canvas.height = internalHeight;

      globeRef.current = createGlobe(canvas, {
        devicePixelRatio,
        width: internalWidth,
        height: internalHeight,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark,
        scale,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor: resolvedBaseColor,
        markerColor: resolvedMarkerColor,
        glowColor: resolvedGlowColor,
        opacity: 1,
        offset: [0, 0],
        markers: [],
        onRender: (state) => {
          if (!isDragging.current) {
            phiRef.current += autoRotateSpeed;
          }
          state.phi = phiRef.current;
          state.theta = thetaRef.current;
        },
      });
    };

    const onMouseDown = (e) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const rotationSpeed = 0.005;
        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );
        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      }
    };

    initGlobe();

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const handleResize = () => initGlobe();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseup", onMouseUp);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
      if (globeRef.current) globeRef.current.destroy();
    };
  }, [
    theta,
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
  ]);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "400px",
          maxHeight: "400px",
          aspectRatio: "1",
          display: "block",
          cursor: "grab",
        }}
      />
    </div>
  );
};

// AboutMe Component
const AboutMe = () => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="relative min-h-screen py-12 px-6 md:px-20 lg:px-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden pt-20">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 text-center"
        >
          <motion.h1
            className="alkalami-regular text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            About{" "}
            <span className="alkalami-regular bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Me
            </span>
          </motion.h1>

          <motion.p
            className="text-xl max-w-3xl mx-auto text-slate-300 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Passionate MERN Stack Developer crafting digital experiences with
            cutting-edge technologies
          </motion.p>
        </motion.div>

        {/* About Content */}
        <div className="relative py-4">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <div
            ref={aboutRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-4 mb-10 relative z-10"
          >
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              {/* Main Text Card */}
              <motion.div
                className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl border border-slate-700/50"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)",
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.25)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600"></div>

                {/* Header */}
                <motion.h2
                  className="text-3xl font-bold mb-6 flex items-center gap-3"
                  whileInView={{ scale: [0.95, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    <FaLightbulb className="text-yellow-400" />
                  </div>
                  Crafting{" "}
                  <span className="text-purple-400">Digital Experiences</span>
                </motion.h2>

                {/* Accent line */}
                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"></div>

                {/* Text Content */}
                <div className="space-y-6">
                  <motion.div
                    className="text-slate-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    I'm a passionate MERN Stack Developer with expertise in
                    building modern, scalable web applications. With a strong
                    foundation in JavaScript and its ecosystems, I specialize in
                    creating efficient, user-friendly solutions that solve
                    real-world problems.
                  </motion.div>

                  <motion.div
                    className="text-slate-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    My journey in web development started 1 year ago, and since
                    then I've been constantly learning and adapting to new
                    technologies. I enjoy the process of turning ideas into
                    reality through elegant code and intuitive interfaces.
                  </motion.div>

                  <motion.div
                    className="text-slate-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    When I'm not coding, you can find me exploring new
                    technologies, contributing to open source, or sharing my
                    knowledge through tech blogs and communities.
                  </motion.div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 font-medium flex flex-col items-center justify-center shadow-lg"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)",
                  }}
                >
                  <span className="text-2xl font-bold">1+</span>
                  <span className="text-sm">Years Experience</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-slate-800 font-medium flex flex-col items-center justify-center border border-slate-700/50 shadow-lg"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)",
                  }}
                >
                  <span className="text-2xl font-bold">5+</span>
                  <span className="text-sm">Projects Completed</span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-pink-600 to-rose-600 font-medium flex flex-col items-center justify-center shadow-lg"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)",
                  }}
                >
                  <FaHeart className="text-red-400 mb-1" />
                  <span className="text-sm">Open Source</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Globe Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              {/* Card Container for Globe */}
              <motion.div
                className="w-full max-w-md bg-slate-800/30 backdrop-blur-md p-6 border border-slate-700/50 shadow-2xl"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)",
                }}
                whileHover={{
                  boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.4)",
                  y: -5,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="absolute w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    ></motion.div>
                    <motion.div
                      className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
                      animate={{ scale: [1.1, 1, 1.1] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    ></motion.div>
                  </div>

                  {/* Globe */}
                  <div className="relative z-20 w-full h-full flex items-center justify-center">
                    <Globe
                      className="w-full h-full"
                      baseColor="#818cf8"
                      markerColor="#c084fc"
                      glowColor="#f472b6"
                      scale={1.1}
                      dark={0.8}
                    />
                  </div>

                  {/* Floating badges */}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="absolute bottom-4 left-0 right-0 text-center z-30"
                  >
                    <span className="text-xs font-semibold text-purple-300 bg-purple-900/30 backdrop-blur-sm py-2 px-4 rounded-full inline-block border border-purple-700/30">
                      Interactive Experiences
                    </span>
                  </motion.div>
                </div>

                {/* Card footer */}
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-semibold text-slate-200">
                    Global Reach
                  </h3>
                  <p className="text-sm text-slate-400 mt-2">
                    Creating solutions that connect people worldwide
                  </p>

                  {/* Interactive buttons */}
                  <div className="flex justify-center gap-4 mt-4">
                    <motion.button
                      className="px-4 py-2 text-xs bg-indigo-600/30 rounded-full border border-indigo-500/30 text-indigo-300"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(99, 102, 241, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Projects
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 text-xs bg-purple-600/30 rounded-full border border-purple-500/30 text-purple-300"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(139, 92, 246, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Technologies
                    </motion.button>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to <span className="text-purple-400">Collaborate </span>?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            I'm always interested in new challenges and opportunities to work on
            exciting projects.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;