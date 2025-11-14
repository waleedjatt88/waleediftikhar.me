import React from 'react';
import './Hireme.css'; 
import ctaVideo from '../../assets/bg_1.mp4';

const HireMe = () => {
  return (
    <>
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Awards</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4+</span>
            <span className="stat-label">Complete Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1+</span>
            <span className="stat-label">Years of Experinces</span>
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