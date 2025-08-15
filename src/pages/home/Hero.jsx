import React, { useState, useEffect } from 'react';
import './Hero.css';

import profileImage1 from '../../assets/image1.png'; 
import profileImage2 from '../../assets/image2.png'; 

const Hero = () => {
  const [isFirstView, setIsFirstView] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFirstView(prevView => !prevView);
    }, 3000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section id='home' className="hero-section">
      <div className="hero-content">
        <p className="greeting">HELLO!</p>
        
        <div className="headline-wrapper">
          {isFirstView ? (
            <div key="frontend" className="fade-in">
              <h1 className="headline-small">I'm a</h1>
              <h1 className="headline-large">
                <span className="highlight">Full Stack MERN</span><span className="text-white">Developer</span>
              </h1>
            </div>
          ) : (
            <div key="name" className="fade-in">
              <h1 className="headline-large">
                I'm <span className="highlight">Waleed Iftikhar</span>
              </h1>
              <p className="sub-headline">A Freelance MERN Developer</p>
            </div>
          )}
        </div>

        <div className="button-group">
          <button className="btn hire-me-btn">HIRE ME</button>
          <button className="btn my-works-btn">MY WORKS</button>
        </div>
      </div>
      
      <div className="hero-image">
        <img
          key={isFirstView ? 'image1' : 'image2'}
          src={isFirstView ? profileImage1 : profileImage2}
          alt="Waleed Iftikhar"
          className="fade-in"
          loading="lazy"
        />
      </div>

      <div className="slider-dots">
        <span className={`dot ${isFirstView ? 'active' : ''}`}></span>
        <span className={`dot ${!isFirstView ? 'active' : ''}`}></span>
      </div>
    </section>
  );
};

export default Hero;