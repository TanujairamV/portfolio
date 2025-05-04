import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import type { ISourceOptions } from '@tsparticles/engine';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async () => {
      await loadSlim();
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo<ISourceOptions>(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 120,
      particles: {
        color: { value: '#6B46C1' },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: { default: 'bounce' as const },
          random: true,
          speed: 0.15,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 50,
        },
        opacity: { value: { min: 0.05, max: 0.1 } },
        shape: { type: 'circle' as const },
        size: { value: { min: 0.1, max: 0.8 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={particlesOptions}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBackground;
