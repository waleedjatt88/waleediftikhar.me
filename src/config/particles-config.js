const particlesConfig = {
  
  fullScreen: {
    enable: false, 
    zIndex: 0 
  },

  background: {
    color: {
      value: '#000000',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse', 
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#f0ad4e',
    },
    links: {
      color: '#f0ad4e',
      distance: 150,
      enable: true,
      opacity: 0.2, 
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 1.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 108,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 3 }, 
    },
  },
  detectRetina: true,
};

export default particlesConfig;