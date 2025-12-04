import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  User,
  ArrowRight,
  Heart,
} from "lucide-react";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  // Animation variants
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

  // Floating animation
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-6 md:px-20 lg:px-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden"
    >
      {/* background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle floating shapes */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-3/4 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/4 w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500/15 to-blue-500/15 blur-sm"
        />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMzMzM4NDIiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMEg2MFY2MEgwWiIvPjwvZz48L3N2Zz4=')] opacity-20"></div>

        {/* moving particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400/20"
            style={{
              top: `${15 + i * 10}%`,
              left: `${5 + i * 12}%`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-purple-400/20"
            style={{
              top: `${20 + i * 8}%`,
              right: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 text-center"
        >
          <motion.h1
            className="text-4xl alkalami-regular md:text-5xl lg:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Touch
            </span>
          </motion.h1>

          <motion.p
            className="text-xl roboto-slab md:text-2xl max-w-4xl mx-auto text-slate-300 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Let's collaborate on your next project. I'm always open to
            discussing new opportunities.
          </motion.p>

          {/* Animated decorative element */}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.h2
              className="text-3xl font-bold pt-serif-regular flex items-center gap-3"
              variants={itemVariants}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Send className="text-indigo-400" />
              </motion.div>
              Let's <span className="text-purple-400">Connect</span>
            </motion.h2>

            <motion.p
              className="text-lg roboto-slab text-slate-300"
              variants={itemVariants}
            >
              I'm currently available for freelance work and open to full-time
              opportunities. If you have a project that you want to get started
              or think you need my help with something, then get in touch.
            </motion.p>

            <motion.div className="space-y-6 roboto-slab" variants={itemVariants}>
              <motion.div
                className="flex  items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 transition-colors hover:bg-slate-800/50"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="p-3 rounded-full bg-indigo-500/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="text-indigo-400" size={24} />
                </motion.div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-slate-300">kojingmoktan92@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 transition-colors hover:bg-slate-800/50"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="p-3 rounded-full bg-purple-500/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="text-purple-400" size={24} />
                </motion.div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-slate-300">+977 9813254153</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 transition-colors hover:bg-slate-800/50"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="p-3 rounded-full bg-pink-500/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="text-pink-400" size={24} />
                </motion.div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-slate-300">Kathmandu, Nepal</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div className="pt-0" variants={itemVariants}>
              <h3 className="text-xl pt-serif-regular font-semibold mb-4">Follow me on</h3>
              <div className="flex gap-4">
                {[
                  {
                    icon: <Github size={20} />,
                    color: "hover:text-purple-400",
                    label: "GitHub",
                    url: "https://github.com/kojing777",
                  },
                  {
                    icon: <Linkedin size={20} />,
                    color: "hover:text-blue-400",
                    label: "LinkedIn",
                    url: "https://linkedin.com/in/",
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`text-slate-400 transition-colors p-3 rounded-full bg-slate-800/30 border border-slate-700/30 ${item.color}`}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>

            <motion.div
              className="relative z-20 bg-slate-800/20 p-8 rounded-2xl border border-slate-700/30 shadow-xl"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Send className="mx-auto text-6xl text-green-400 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-300">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mt-4"
                  >
                    <Heart
                      className="mx-auto text-pink-500"
                      fill="currentColor"
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <motion.h2 className="text-2xl pt-serif-regular font-bold mb-6 flex items-center gap-2">
                    <Send className="text-indigo-400" />
                    Send a Message
                  </motion.h2>

                  <form onSubmit={handleSubmit} className="space-y-6 roboto-slab">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-slate-300"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="text-slate-500" size={20} />
                        </div>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/30 border border-slate-700/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-slate-300"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="text-slate-500" size={20} />
                        </div>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/30 border border-slate-700/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2 text-slate-300"
                      >
                        Your Message
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-3 bg-slate-800/30 border border-slate-700/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                        placeholder="Tell me about your project..."
                        required
                      ></motion.textarea>
                    </motion.div>
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                    >
                      Send Message
                      <ArrowRight size={20} className="ml-2" />
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{
                          x: isHovered ? "100%" : "-100%",
                          opacity: isHovered ? 0.4 : 0,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
