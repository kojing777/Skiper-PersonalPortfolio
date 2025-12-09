import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Skills from "./components/Skills";

const App = () => {
  return (
    <div>
      <div id="top"></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<ContactMe />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
