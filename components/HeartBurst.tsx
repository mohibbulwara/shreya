
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  scale: number;
}

const HeartBurst: React.FC<{ trigger: number }> = ({ trigger }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    // Create a burst of elegant particles
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 20,
      size: Math.random() * 100 + 50,
      opacity: Math.random() * 0.3 + 0.1,
      delay: i * 0.08,
      scale: Math.random() * 0.5 + 0.5
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Cleanup
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id > Date.now() - 3000));
    }, 3000);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-pink-200 to-pink-100 blur-2xl"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animation: `elegantRise 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards`,
            animationDelay: `${p.delay}s`,
            transform: `scale(${p.scale})`
          }}
        />
      ))}
      <style>{`
        @keyframes elegantRise {
          0% { transform: scale(0) translateY(0); opacity: 0; }
          20% { opacity: var(--opacity, 0.2); transform: scale(1); }
          100% { transform: scale(1.5) translateY(-500px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HeartBurst;
