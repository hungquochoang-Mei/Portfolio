import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newSparkle = { id: Date.now(), x: e.clientX, y: e.clientY };
      setSparkles((prev) => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, 800);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Hide cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          width: '24px',
          height: '24px',
          background: 'rgba(255, 255, 255, 1)',
          boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.4)',
        }}
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2.5 : 1,
          opacity: mousePosition.x === 0 && mousePosition.y === 0 ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
          mass: 0.5,
        }}
      />
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
        ))}
      </AnimatePresence>
    </>
  );
}

function Sparkle({ x, y }: { x: number; y: number }) {
  // Create an array of 8 sparkles for a starburst effect
  const particles = Array.from({ length: 8 });
  
  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block">
      {particles.map((_, i) => {
        const angle = (i * 360) / particles.length;
        const radians = (angle * Math.PI) / 180;
        const distance = 40 + Math.random() * 20;
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ x, y, scale: 1, opacity: 1 }}
            animate={{
              x: x + Math.cos(radians) * distance,
              y: y + Math.sin(radians) * distance,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              boxShadow: '0 0 4px #fff, 0 0 8px #fff',
            }}
          />
        );
      })}
      
      {/* Central burst */}
      <motion.div
        className="absolute w-3 h-3 bg-white rounded-full"
        style={{
          boxShadow: '0 0 10px #fff, 0 0 20px #fff',
        }}
        initial={{ x: x - 6, y: y - 6, scale: 0.5, opacity: 1 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}
