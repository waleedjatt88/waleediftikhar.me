import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import './Skills.css';
import ParticlesBackground from '../../components/ParticlesBackground';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
} from 'react-icons/si';

const skillsData = [
  { name: 'React.js', icon: <SiReact />, color: '#61dafb' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#83cd29' },
  { name: 'Express.js', icon: <SiExpress />, color: '#ffffff' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4f95d1' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
  { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26' },
  { name: 'CSS3', icon: <SiCss3 />, color: '#1572b6' },
  { name: 'Git', icon: <SiGit />, color: '#f05032' },
  { name: 'GitHub', icon: <SiGithub />, color: '#ffffff' },
];

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={cardRef}
      className="skill-card"
      data-aos="zoom-in"
      data-aos-delay={(index % 5) * 90}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="skill-card-glow"></div>
      <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
      <h3 className="skill-name">{skill.name}</h3>
    </div>
  );
};

const Skills = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
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

        <div className="skills-marquee" data-aos="fade-up">
          <div className="marquee-track">
            {[...skillsData, ...skillsData].map((skill, i) => (
              <span className="marquee-chip" key={i}>
                <span style={{ color: skill.color }}>{skill.icon}</span> {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
