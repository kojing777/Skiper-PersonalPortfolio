import React from "react";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Footer from "./Footer";
import ContactMe from "./ContactMe";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutMe />
      <Projects />
      <Skills />
      <Experience />
      <ContactMe />
    </div>
  );
};

export default Home;
