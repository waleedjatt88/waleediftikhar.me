import React, { useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; 
import particlesConfig from '../config/particles-config';

// ✅ Step 1: Component ko 'id' prop pass karein
const ParticlesBackground = ({ id }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <Particles
        id={id}
        options={particlesConfig}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;