import React, { useState, useMemo } from 'react';
import Hyperspeed, { hyperspeedPresets } from '../../components/hyperspeed/Hyperspeed';
import './HyperspeedSection.css';
import { FaRocket, FaBolt, FaLayerGroup } from 'react-icons/fa';

const HyperspeedSection = () => {
  const [activePresetKey, setActivePresetKey] = useState('cyberGold');
  const [isAccelerating, setIsAccelerating] = useState(false);

  const presetsList = [
    { key: 'cyberGold', label: 'Amber Cyber' },
    { key: 'one', label: 'Neon Pulse' },
    { key: 'two', label: 'Crimson Drift' },
    { key: 'three', label: 'Gold Warp' },
    { key: 'four', label: 'Cyan Flow' },
    { key: 'six', label: 'Deep Vortex' },
  ];

  const currentOptions = useMemo(() => {
    const base = hyperspeedPresets[activePresetKey] || hyperspeedPresets.one;
    return {
      ...base,
      onSpeedUp: () => setIsAccelerating(true),
      onSlowDown: () => setIsAccelerating(false),
    };
  }, [activePresetKey]);

  return (
    <section id="experience-speed" className="hyperspeed-section">
      {/* 3D WebGL Hyperspeed Background Canvas */}
      <div className="hyperspeed-bg-container">
        <Hyperspeed effectOptions={currentOptions} />
      </div>

      {/* Subtle radial vignette overlay */}
      <div className="hyperspeed-vignette"></div>

      {/* Content overlay */}
      <div className="hyperspeed-content-container">
        <span className="background-text-hyperspeed">SPEED</span>

        <div className="section-header-hyperspeed" data-aos="fade-up">
          <div className="speed-badge">
            <FaBolt className="speed-badge-icon" />
            <span>LIGHTNING PERFORMANCE</span>
          </div>
          <h2>
            <span id="speedspan">Hyper</span>speed Experience
          </h2>
          <p className="speed-quote">
            "Engineering high-performance, responsive web architectures that deliver blazing speed and seamless interactivity."
          </p>
        </div>

        {/* Interactive Preset Buttons */}
        <div className="preset-selector-bar" data-aos="fade-up" data-aos-delay="100">
          <span className="preset-label">
            <FaLayerGroup /> Modes:
          </span>
          <div className="preset-buttons">
            {presetsList.map((preset) => (
              <button
                key={preset.key}
                type="button"
                className={`preset-btn ${activePresetKey === preset.key ? 'active' : ''}`}
                onClick={() => setActivePresetKey(preset.key)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Acceleration status pill */}
        <div className="acceleration-hint" data-aos="fade-up" data-aos-delay="150">
          <FaRocket className={`rocket-icon ${isAccelerating ? 'launching' : ''}`} />
          <span>
            {isAccelerating ? 'BOOST ACTIVE: WARP SPEED!' : 'Click & Hold anywhere to accelerate'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HyperspeedSection;
