import { useEffect, useMemo, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import type { ISourceOptions, Engine } from '@tsparticles/react';

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticles = async (engine: Engine) => {
      await loadSlim(engine);
    };

    initParticlesEngine(initParticles).then(() => {
      setInit(true);
    });

    // Optional: prevent memory leaks if the component is unmounted before init completes
    return () => {
      setInit(false);
    };
  }, []);

  const particlesOptions = useMemo<ISourceOptions>(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60, // Lowered from 120 to save resources
      particles: {
        color: { value: '#6B46C1' },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          random: true,
          speed: 0.15,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 50,
        },
        opacity: { value: { min: 0.05, max: 0.1 } },
        shape: { type: 'circle' },
        size: { value: { min: 0.1, max: 0.8 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return <div className="absolute inset-0 z-0 bg-transparent" />;

  return (
    <Particles
      id="tsparticles"
      options={particlesOptions}
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticlesBackground;
