import React, { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import CustomCursor from "./components/CustomCursor.jsx";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Loader from "./components/Loader.jsx";

import Hero from "./pages/home/Hero";
import About from "./pages/about/About";
import Resume from "./pages/resume/Resume";
import Services from "./pages/services/Services";
import Skills from "./pages/skills/Skills";
import HyperspeedSection from "./pages/hyperspeed/HyperspeedSection";
import HireMe from "./pages/blogs/Hireme";
import Contact from "./pages/contact/Contact";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const removeTimer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {loading && <Loader fadeOut={fadeOut} />}
      <CustomCursor />
      <Navbar />
      <ScrollToHashElement />

      <main>
        <Hero />
        <About />
        <Resume />
        <Services />
        <HyperspeedSection />
        <Skills />
        <HireMe />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;
