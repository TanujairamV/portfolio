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
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 5,
        },
        repulse: {
          distance: 200,
          duration: 0.5,
        },
      },
    },
    particles: {
      color: {
        value: "#6B46C1",
      },
      links: {
        color: "#6B46C1",
        distance: 160,
        enable: true,
        opacity: 0.6,
        width: 1.2,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 4,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 100,
      },
      opacity: {
        value: 0.6,
        random: { enable: true, minimumValue: 0.3 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 6 },
        random: true,
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
