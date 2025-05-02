import { useEffect, useMemo, useRef } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function ParticlesBackground() {
  const particlesRef = useRef(null);
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: isDarkMode ? '#D1D1D1' : '#7E57C2',
        },
        links: {
          color: isDarkMode ? '#D1D1D1' : '#7E57C2',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [isDarkMode]
  );

  return (
    <Particles
      id="tsparticles"
      ref={particlesRef}
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}

export default ParticlesBackground;
