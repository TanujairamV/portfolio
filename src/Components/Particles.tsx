import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;

  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update(mouseX: number, mouseY: number) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      this.x += (dx / distance) * force * 2;
      this.y += (dy / distance) * force * 2;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = window.innerWidth;
    if (this.x > window.innerWidth) this.x = 0;
    if (this.y < 0) this.y = window.innerHeight;
    if (this.y > window.innerHeight) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });

  const particleCount = 50;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(); // reset particles on resize to avoid weird positions
    };

    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        particle.update(mousePosition.current.x, mousePosition.current.y);
        particle.draw(ctx);
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />;
};

export default ParticlesBackground;
