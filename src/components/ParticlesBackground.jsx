import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesBackground({ isDarkMode }) {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: isDarkMode ? '#111827' : '#ffffff',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, mode: 'repulse' },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 150, duration: 0.4 },
          },
        },
        particles: {
          color: {
            value: isDarkMode ? '#b392ac' : '#7C3AED',
          },
          links: {
            color: isDarkMode ? '#b392ac' : '#7C3AED',
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: { default: 'bounce' },
            random: false,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 100,
          },
          opacity: { value: 0.4 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 4 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}
