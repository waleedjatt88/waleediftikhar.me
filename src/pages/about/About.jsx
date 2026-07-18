import React, { useEffect } from 'react';
import AOS from 'aos';
import './About.css';
import { FaUser, FaBriefcase, FaEnvelope, FaGithub } from 'react-icons/fa';

import profileImage from '../../assets/image1.png';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-image-container" data-aos="fade-right" data-aos-duration="1000">
        <div className="about-image-glow"></div>
        <div className="about-image-frame">
          <img
            src={profileImage}
            alt="Waleed Iftikhar"
            width="450"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="availability-badge">
          <span className="pulse-dot"></span>
          Available for Freelance
        </div>
      </div>

      <div className="about-content-container">
        <span className="background-text">About</span>

        <h2 className="about-heading" data-aos="fade-up">
          <span id="aboutspan">About</span> Me
        </h2>

        <p className="about-description" data-aos="fade-up" data-aos-delay="100">
          I'm a passionate MERN Stack Developer focused on creating seamless digital
          experiences. From concept to deployment, I build scalable applications that
          combine elegant design with robust functionality, always prioritizing
          performance and user satisfaction.
        </p>

        <div className="personal-details">
          <div className="detail-item" data-aos="fade-up" data-aos-delay="150">
            <span className="detail-icon"><FaUser /></span>
            <div className="detail-text">
              <span className="detail-label">Name</span>
              <span className="detail-value">Waleed Iftikhar</span>
            </div>
          </div>
          <div className="detail-item" data-aos="fade-up" data-aos-delay="200">
            <span className="detail-icon"><FaBriefcase /></span>
            <div className="detail-text">
              <span className="detail-label">Experience</span>
              <span className="detail-value">2+ Years</span>
            </div>
          </div>
          <div className="detail-item" data-aos="fade-up" data-aos-delay="250">
            <span className="detail-icon"><FaEnvelope /></span>
            <div className="detail-text">
              <span className="detail-label">Email</span>
              <a href="mailto:waleediftikhar188@gmail.com" className="detail-value detail-link">waleediftikhar188@gmail.com</a>
            </div>
          </div>
          <div className="detail-item" data-aos="fade-up" data-aos-delay="300">
            <span className="detail-icon"><FaGithub /></span>
            <div className="detail-text">
              <span className="detail-label">GitHub</span>
              <a
                href="https://github.com/waleedjatt88"
                target="_blank"
                rel="noopener noreferrer"
                className="detail-value detail-link"
              >
                github.com/waleedjatt88
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
