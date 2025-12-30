import React, { useState } from 'react'; 
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);

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
            <NavLink to="/#home" className="nav-links" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#about" className="nav-links" onClick={closeMobileMenu}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#resume" className="nav-links" onClick={closeMobileMenu}>
              Resume
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#services" className="nav-links" onClick={closeMobileMenu}>
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#skills" className="nav-links" onClick={closeMobileMenu}>
              Skills
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#projects" className="nav-links" onClick={closeMobileMenu}>
              Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/#contact" className="nav-links" onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;