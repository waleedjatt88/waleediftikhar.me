import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <h2 className="loader-text">
          <span className="portfolio-text">PORT</span>
          <span className="folio-text">FOLIO</span>
        </h2>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
