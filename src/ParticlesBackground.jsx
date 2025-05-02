import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { useCallback } from 'react';

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          move: { enable: true, speed: 1, direction: 'none', random: true },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } },
          modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
        },
      }}
    />
  );
}

export default ParticlesBackground;
