import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor({ isNightMode = false }: { isNightMode?: boolean }) {
  const [hasMoved, setHasMoved] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Generic origin points tracking coordinates cleanly outside the physics loop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer Aura Physics: Optimized Liquid Trail (High responsiveness, weightless mass)
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.5 });

  // Inner Core Physics: Tight, pinned 1-to-1 mapping
  const coreX = useSpring(mouseX, { stiffness: 800, damping: 50 });
  const coreY = useSpring(mouseY, { stiffness: 800, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      // Pumping raw positions; framer-motion interpolates springs concurrently!
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('svg') // Owl Trigger
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Passive listeners structurally reducing DOM layout thrashing limits
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [hasMoved, mouseX, mouseY]);

  if (!hasMoved) return null;
  // Eliminates Spore Cursor unconditionally on Mobile/Touchscreen hardware!
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Outer Spore Aura: Bioluminescent Breathing Liquid */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform', // Accelerates positioning calculations on explicit GPU bounds preventing thrash
          filter: isNightMode ? 'blur(4px)' : 'none',
          // Day: Semi-transparent Forest Green wash / Night: Golden Blur
          backgroundColor: isNightMode ? 'rgba(255, 215, 0, 0.4)' : 'rgba(27, 67, 50, 0.2)' 
        }}
        animate={{
          // The Bloom Effect
          width: isHovering ? 90 : 30, // Scale Spore to 3x (30 -> 90)
          height: isHovering ? 90 : 30, 
          opacity: isHovering ? 0.2 : 1,
          // Organic Breathing Morph into Perfect Circle Focus
          borderRadius: isHovering 
            ? ["50%", "50%", "50%"] // Geometrically snap to strict circle
            : [
                "40% 60% 70% 30% / 40% 40% 60% 50%", 
                "60% 40% 30% 70% / 50% 60% 40% 40%", 
                "40% 60% 70% 30% / 40% 40% 60% 50%"
              ] // 8-point morphing blob shapes tracking organic physics
        }}
        transition={{
          // Strict tween controls ensuring snaps to perfect circle lock reliably vs continuous breath cycles
          width: { type: "tween", ease: "backOut", duration: 0.3 },
          height: { type: "tween", ease: "backOut", duration: 0.3 },
          opacity: { type: "tween", duration: 0.3 },
          borderRadius: { 
            duration: isHovering ? 0.3 : 3, // Fast snap vs slow breath float
            repeat: isHovering ? 0 : Infinity, // Kills the breath cycle statically snapping focus
            ease: "easeInOut" 
          }
        }}
      />
      
      {/* Inner Core: Dead-Center Spark */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          x: coreX,
          y: coreY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform', // Eliminates layout calculations against position changes
          width: 4,
          height: 4,
          backgroundColor: isNightMode ? '#ffd700' : '#1b4332',
          boxShadow: isNightMode ? '0 0 10px #ffd700' : 'none',
        }}
        animate={{
          opacity: isHovering ? 0.1 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
