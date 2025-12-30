import React, { useEffect, lazy, Suspense } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CustomCursor from "./components/CustomCursor.jsx";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Loader from "./components/Loader";

// Lazy load all page components for better performance
const Hero = lazy(() => import("./pages/home/Hero"));
const About = lazy(() => import("./pages/about/About"));
const Resume = lazy(() => import("./pages/resume/Resume"));
const Services = lazy(() => import("./pages/services/Services"));
const Skills = lazy(() => import("./pages/skills/Skills"));
const Projects = lazy(() => import("./pages/projects/Projects"));
const HireMe = lazy(() => import("./pages/blogs/Hireme"));
const Contact = lazy(() => import("./pages/contact/Contact"));

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <ScrollToHashElement />

      <Suspense fallback={<Loader />}>
        <main>
          <Hero />
          <About />
          <Resume />
          <Services />
          <Skills />
          <Projects />
          <HireMe />
          <Contact />
        </main>
      </Suspense>

      <Footer />
    </>
  );
};

export default App;
