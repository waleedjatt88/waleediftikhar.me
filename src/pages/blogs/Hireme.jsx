import React from 'react';
import './Hireme.css'; 
import ctaVideo from '../../assets/bg_1.mp4';
import ParticlesBackground from '../../components/ParticlesBackground';

const HireMe = () => {
  return (
    <>
      <section className="stats-section">
        <ParticlesBackground id="experience-particles" />
        <div className="container">
          <div className="globe-container">
            <div className="globe-ring"></div>
            <div className="globe-content">
              <div className="stat-number">2+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container stats-grid">
        </div>
      </section>

      <section className="cta-section">
        
        <video 
          className="cta-background-video" 
          autoPlay   
          loop       
          muted      
          playsInline
        >
          <source src={ctaVideo} type="video/mp4" loading="lazy" />
          Aapka browser video tag ko support nahi karta.
        </video>

        <div className="container cta-content">
          <h2>I'm <span>Available</span> for freelancing</h2>
          <p>"Open to exciting freelance opportunities—let’s bring your ideas to life with clean, creative, and responsive web design"!</p>
          <a href="#contact" className="cta-button">HIRE ME</a>
        </div>
      </section>
    </>
  );
};

export default HireMe;