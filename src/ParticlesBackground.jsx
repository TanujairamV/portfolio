import { useCallback } from 'react';
import Particles from '@tsparticles/react';
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
    fpsLimit: 120,
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
        speed: 0.2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 600,
        },
        value: 80,
      },
      opacity: {
        value: { min: 0.05, max: 0.2 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.1, max: 1 },
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
