import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 144,
    particles: {
      color: {
        value: "#6B46C1",
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.7,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 500,
        },
        value: 100,
      },
      opacity: {
        value: { min: 0.2, max: 0.7 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.4, max: 2.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      className="absolute inset-0 z-0"
    />
  );
}

export default ParticlesBackground;
