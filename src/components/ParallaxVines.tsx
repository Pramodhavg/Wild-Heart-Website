import { useScroll, useTransform, motion } from 'motion/react';
import { useMemo } from 'react';

export function ParallaxVines({ isNightMode = false }: { isNightMode?: boolean }) {
  const { scrollYProgress } = useScroll();
  
  // High-End Z-Depth Vectors mapping parallax to floating light points
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']); // 0.15x Extremely Deep
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']); // 0.3x Deep
  const orb3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']); // 0.6x Midground

  const orbs = useMemo(() => [
    { id: 1, top: '10%', left: '5%', size: '500px', day: 'rgba(34, 139, 34, 0.05)', night: 'rgba(0, 255, 200, 0.03)', transformY: orb1Y },
    { id: 2, top: '60%', left: '60%', size: '700px', day: 'rgba(0, 128, 128, 0.03)', night: 'rgba(0, 255, 200, 0.02)', transformY: orb2Y },
    { id: 3, top: '90%', left: '10%', size: '400px', day: 'rgba(46, 139, 87, 0.04)', night: 'rgba(0, 255, 200, 0.04)', transformY: orb3Y },
    { id: 4, top: '160%', left: '50%', size: '600px', day: 'rgba(34, 139, 34, 0.04)', night: 'rgba(0, 255, 200, 0.03)', transformY: orb1Y } 
  ], [orb1Y, orb2Y, orb3Y]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
      {orbs.map(orb => (
        <motion.div
          key={`orb-${orb.id}`}
          style={{ y: orb.transformY }}
          className="absolute inset-x-0 h-[200vh]"
        >
          <div
            className="absolute rounded-full blur-[80px] transition-colors duration-1000"
            style={{ 
              top: orb.top, 
              left: orb.left,
              width: orb.size,
              height: orb.size,
              // Shifts seamlessly between Sage Ambient Orbs and Deep Teal Moonlights
              backgroundColor: isNightMode ? orb.night : orb.day,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
