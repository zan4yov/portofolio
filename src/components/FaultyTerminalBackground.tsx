import { useEffect, useRef } from 'react';

export default function FaultyTerminalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'rgb(17, 24, 39)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const chars = '01>_${}[]<>/\\|~`';
    const fontSize = 14;
    let drops: number[] = [];
    let scanlineY = 0;
    let flickerOpacity = 1;
    let frameId = 0;
    let running = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      if (!running) return;

      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(0, 245, 255, 0.08)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      ctx.fillStyle = 'rgba(0, 245, 255, 0.03)';
      ctx.fillRect(0, scanlineY, canvas.width, 2);
      scanlineY += 3;
      if (scanlineY > canvas.height) scanlineY = 0;

      if (Math.random() > 0.98) {
        ctx.fillStyle = 'rgba(127, 255, 212, 0.05)';
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 200,
          Math.random() * 5
        );
      }

      if (Math.random() > 0.95) {
        flickerOpacity = Math.random() * 0.5 + 0.5;
      } else {
        flickerOpacity = 1;
      }
      canvas.style.opacity = flickerOpacity.toString();

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Canvas for animated effects */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Static overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* CRT scanlines */}
        <div className="absolute inset-0 bg-scanlines opacity-[0.03]" />

        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
        </div>
      </div>

      {/* Add scanline pattern CSS */}
      <style>{`
        .bg-scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
        }
      `}</style>
    </>
  );
}
