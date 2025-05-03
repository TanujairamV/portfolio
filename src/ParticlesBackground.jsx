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
    fpsLimit: 165,
    particles: {
      color: {
        value: ["#6B46C1", "#FF6AC1"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 0.6,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 450,
        },
        value: 120,
      },
      opacity: {
        value: { min: 0.15, max: 0.75 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.3, max: 3 },
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
