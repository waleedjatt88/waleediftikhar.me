import React, { useEffect } from 'react';
import AOS from 'aos';
import './Skills.css';
import SkillBall from './SkillBall'; 
import ParticlesBackground from '../../components/ParticlesBackground';


const skillsData = [
  { name: 'Node.js', percentage: 80 },
  { name: 'React.js', percentage: 85 },
  { name: 'JavaScript', percentage: 65 },
  { name: 'MongoDB', percentage: 75 },
  { name: 'Express.js', percentage: 80 },
  { name: 'HTML/CSS', percentage: 90 },
  { name: 'Git/GitHub', percentage: 75 },
  { name: 'PostgreSQL', percentage: 70 },
];

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <section id="skills" className="skills-section">
      <ParticlesBackground id="skills-particles" />
      <div className="container">
        <span className="background-text-skills">Skills</span>
        
        <div className="section-header-skills" data-aos="fade-up">
          <h2><span id='skillspan'>My</span> Skills</h2>
          <p>"I turn ideas into powerful, interactive web experiences—driven by creativity, code, and a passion for seamless design."</p>
        </div>

        <div className="orbital-container" data-aos="fade-up">
          <div className="orbital-center">
            <div className="center-icon">⚡</div>
            <p className="center-text">Skills</p>
          </div>
          
          <div className="orbital-track">
            {skillsData.map((skill, index) => (
              <SkillBall 
                key={index} 
                skill={skill} 
                index={index}
                total={skillsData.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;