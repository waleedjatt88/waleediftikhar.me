import React, { useEffect } from 'react';
import AOS from 'aos';
import { useInView } from 'react-intersection-observer';
import './Skills.css';
import Count from './Count'; 

const skillsData = [
  { name: 'Node.Js', percentage: 80 },
  { name: 'Java Script', percentage: 65 },
  { name: 'React Js', percentage: 85 },
  { name: 'DataBase Management', percentage: 75 },
  { name: 'Video Editing', percentage: 70 },
  { name: 'Dev Tools', percentage: 70 },
];

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <span className="background-text-skills">Skills</span>
        
        <div className="section-header-skills" data-aos="fade-up">
          <h2><span id='skillspan'>My</span> Skills</h2>
          <p>"I turn ideas into powerful, interactive web experiences—driven by creativity, code, and a passion for seamless design."</p>
        </div>

        <div className="skills-grid" ref={ref} data-aos="fade-up">
          {skillsData.map((skill, index) => (
            <Count key={index} skill={skill} isVisible={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;