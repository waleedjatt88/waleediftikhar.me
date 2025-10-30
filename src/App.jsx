import React, { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import CustomCursor from './components/CustomCursor.jsx'; 
import ScrollToHashElement from './components/ScrollToHashElement';

import Hero from './pages/home/Hero';
import About from './pages/about/About';
import Resume from './pages/resume/Resume';
import Services from './pages/services/Services';
import Skills from './pages/skills/Skills';
import Projects from './pages/projects/Projects';
import Blog from './pages/blogs/Blogs';
import HireMe from './pages/blogs/Hireme';
import Contact from './pages/contact/Contact';

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

      <main>
        <Hero />
        <About />
        <Resume />
        <Services />
        <Skills />
        <Projects />
        <Blog />
        <HireMe />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;
