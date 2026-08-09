import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const sectionIds = ['home', 'about', 'resume', 'services', 'skills', 'contact'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const linkClass = (id) => `nav-links${activeSection === id ? ' active-link' : ''}`;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/#home" className="navbar-logo" onClick={closeMobileMenu}>
           <span id='portspan'>PORT</span>FOLIO
        </Link>

        <div className="menu-icon" onClick={handleToggle}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/#home" className={linkClass('home')} onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#about" className={linkClass('about')} onClick={closeMobileMenu}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#resume" className={linkClass('resume')} onClick={closeMobileMenu}>
              Resume
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#services" className={linkClass('services')} onClick={closeMobileMenu}>
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#skills" className={linkClass('skills')} onClick={closeMobileMenu}>
              Skills
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#contact" className={linkClass('contact')} onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;