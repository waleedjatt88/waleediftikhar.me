import React, { useEffect } from 'react';
import AOS from 'aos';
import './Resume.css';
import { FaGraduationCap, FaBriefcase, FaWhatsapp } from 'react-icons/fa';
import { SiGit, SiGithub, SiSwagger, SiPostman, SiNetlify, SiVercel, SiDocker } from 'react-icons/si';

const educationItems = [
  {
    date: '2022-2026',
    title: "BACHELOR'S DEGREE IN IT",
    subtitle: 'ISLAMIA UNIVERSITY',
    description:
      "I hold a Bachelor's degree in Information Technology from The Islamia University, where I gained strong expertise in modern web technologies and software development.",
  },
  {
    date: '2018-2020',
    title: 'INTERMEDIATE IN ICS',
    subtitle: 'KHAWAJA FAREED GOV COLLEGE',
    description:
      'I completed my Intermediate in Computer Science (ICS) from Khawaja Fareed College, where I built a solid foundation in programming and computer fundamentals.',
  },
  {
    date: '2020-2021',
    title: 'Course in Microsoft Office Applications',
    subtitle: 'VOCATIONAL TRANING INSTITUTE',
    description:
      'Successfully completed a Course Microsoft Office Applications, gaining hands-on experience with MS Word, Excel, PowerPoint, and Outlook.',
  },
];

const experienceItems = [
  {
    date: 'April 2025 - June 2025',
    title: 'MERN Stack DEVELOPMENT COURSE',
    subtitle: 'DEVCASTLE INSTITUTE',
    description:
      'Successfully completed Full Stack MERN Development course, gaining proficiency in PostgreSQL, Express.js, React, and Node.js.',
  },
  {
    date: '2025',
    title: 'Full Stack MERN Developer',
    subtitle: 'BuiltinSoft',
    description:
      'Full Stack MERN developer with hands on experience in building responsive, scalable web applications using PostgreSQL, Express.js, React, and Node.js.',
  },
];

const tools = [
  { name: 'Git', icons: [SiGit] },
  { name: 'GitHub', icons: [SiGithub] },
  { name: 'Swagger', icons: [SiSwagger] },
  { name: 'Postman', icons: [SiPostman] },
  { name: 'Netlify/Vercel', icons: [SiNetlify, SiVercel] },
  { name: 'Docker', icons: [SiDocker] },
];

const TimelineItem = ({ item, aos, delay }) => (
  <div className="timeline-item" data-aos={aos} data-aos-delay={delay}>
    <span className="timeline-dot"></span>
    <div className="resume-item">
      <span className="item-date">{item.date}</span>
      <h3 className="item-title">{item.title}</h3>
      <h4 className="item-subtitle">{item.subtitle}</h4>
      <p className="item-description">{item.description}</p>
    </div>
  </div>
);

const Resume = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const WHATSAPP_URL = 'https://wa.me/923250063788';

  return (
    <section id="resume" className="resume-section">
      <div className="resume-container">
        <span className="background-text-resume">Resume</span>

        <div className="section-header" data-aos="fade-up">
          <h2><span id="resumespan">Res</span>ume</h2>
          <p>"I believe in continuous growth every challenge is an opportunity to learn, improve, and move one step closer to success."</p>
        </div>

        <div className="resume-grid">
          <div className="resume-track">
            <div className="track-heading" data-aos="fade-right">
              <span className="track-icon"><FaGraduationCap /></span>
              <h3>Education</h3>
            </div>
            <div className="timeline">
              {educationItems.map((item, index) => (
                <TimelineItem key={item.title} item={item} aos="fade-right" delay={index * 120} />
              ))}
            </div>
          </div>

          <div className="resume-track">
            <div className="track-heading" data-aos="fade-left">
              <span className="track-icon"><FaBriefcase /></span>
              <h3>Experience</h3>
            </div>
            <div className="timeline">
              {experienceItems.map((item, index) => (
                <TimelineItem key={item.title} item={item} aos="fade-left" delay={index * 120} />
              ))}
            </div>
          </div>
        </div>

        <div className="resume-tools" data-aos="fade-up">
          <h3 className="tools-heading">Tools &amp; Technologies</h3>
          <div className="tools-list">
            {tools.map((tool, index) => (
              <span
                key={tool.name}
                className="tool-pill"
                data-aos="zoom-in"
                data-aos-delay={index * 60}
              >
                <span className="tool-icons">
                  {tool.icons.map((Icon, i) => (
                    <Icon key={i} />
                  ))}
                </span>
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        <div className="download-button-container" data-aos="fade-up">
          <p className="whatsapp-line">Have a project in mind? Feel free to reach out.</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn-resume"
          >
            <FaWhatsapp /> CHAT ON WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
