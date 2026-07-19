import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import './Services.css';
import { FaDatabase, FaMobileAlt, FaLaptopCode, FaPlug, FaTools } from "react-icons/fa";
import { SiInstructure } from "react-icons/si";

const servicesData = [
  { icon: <FaMobileAlt />, title: 'RESPONSIVE DESIGN' },
  { icon: <FaDatabase />, title: 'DATABASE MANAGEMENT' },
  { icon: <FaLaptopCode />, title: 'FULL-STACK WEB DEVELOPMENT' },
  { icon: <SiInstructure />, title: 'CODEBASE STRUCTURING' },
  { icon: <FaTools />, title: 'WEBSITE MAINTENANCE & SUPPORT' },
  { icon: <FaPlug />, title: 'API DEVELOPMENT & INTEGRATION' },
];

const ServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      className="service-card"
      data-aos="fade-up"
      data-aos-delay={(index % 3) * 150}
      onMouseMove={handleMouseMove}
    >
      <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="service-icon-badge">
        <span className="service-icon">{service.icon}</span>
      </div>
      <h3 className="service-title">{service.title}</h3>
      <div className="service-divider"></div>
    </div>
  );
};

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <section id="services" className="services-section">
      <div className="services-container">

        <span className="background-text-services">Services</span>

        <div className="section-header-services" data-aos="fade-up">
          <h2><span id='servicesspan'>Serv</span>ices</h2>
          <p>"I turn ideas into powerful, interactive web experiences—driven by creativity, code, and a passion for seamless design"</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
