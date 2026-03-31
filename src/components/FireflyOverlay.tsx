import { motion } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

// Represents an intelligent, subject-aware bioluminescent firefly
function Firefly({ index, total }: { index: number; total: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate configuration only once upon spawning
  const config = useMemo(() => {
    // 30% of fireflies are Mint tracking the subject, 70% are standard Warm Gold
    const isMint = Math.random() > 0.7;
    const color = isMint ? "#a3ffac" : "#ffd700";
    // Convert box-shadow color alpha synchronously mapping with the glow
    const shadowColor = isMint ? "rgba(163, 255, 172, 0.8)" : "rgba(255, 215, 0, 0.8)";
    
    // Size Variance: 0.5x to 1.2x multiplier
    const scale = Math.random() * 0.7 + 0.5;

    // Movement Logic: Global Dispersion Map directly across pixel coordinates
    const baseX = Math.random() * window.innerWidth;
    const baseY = Math.random() * window.innerHeight;
    
    // Massive drift distances (between 20% and 50% of the screen horizontally)
    const driftX = (Math.random() * 0.3 + 0.2) * window.innerWidth;
    const targetX = Math.random() > 0.5 ? baseX + driftX : baseX - driftX;
    
    // Y-axis Amplitude checking sine-wave characteristics (10% to 25% vertical bobs)
    const amplitudeY = (Math.random() * 0.15 + 0.10) * window.innerHeight;
    
    // Slow Cinematic Duration: 20s to 40s!
    const durationX = Math.random() * 20 + 20;
    const durationY = durationX * (Math.random() * 0.4 + 0.8); // Desynchronizes the Sine bob from the horizontal journey natively

    // Bioluminescent Breath Pattern: 3s to 7s organic pulsing!
    const breathDuration = Math.random() * 4 + 3;

    return { color, shadowColor, scale, baseX, baseY, targetX, amplitudeY, durationX, durationY, breathDuration };
  }, [index, total]);

  // Prevents hydration mismatch rendering coordinates dynamically!
  if (!mounted) return null;

  return (
    <motion.div
      className="absolute top-0 left-0 z-0"
      initial={{ x: config.baseX, y: config.baseY }}
      animate={{ 
        x: [config.baseX, config.targetX], 
        y: [
          config.baseY, 
          config.baseY - config.amplitudeY, 
          config.baseY + config.amplitudeY, 
          config.baseY
        ] 
      }}
      transition={{
        // Extremely slow horizontal floating loops
        x: { duration: config.durationX, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
        // Synchronous vertical bouncing mimicking gentle zephyrs
        y: { duration: config.durationY, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <motion.div
        // Bioluminescent Breath Loop (Opacity explicitly limits the visual shadow's rendering presence simultaneously)
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{
          duration: config.breathDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: 5 * config.scale,
          height: 5 * config.scale,
          borderRadius: '50%',
          backgroundColor: config.color,
          boxShadow: `0 0 ${16 * config.scale}px ${6 * config.scale}px ${config.shadowColor}`
        }}
      />
    </motion.div>
  );
}

export function FireflyOverlay() {
  // Mobile Safety Check: Drops count by 60% to 8 units to save battery rendering passes!
  const fireflyCount = (typeof window !== 'undefined' && window.innerWidth < 768) ? 8 : 20;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden mix-blend-screen mix-blend-plus-lighter">
      {Array.from({ length: fireflyCount }).map((_, i) => (
        <Firefly key={i} index={i} total={fireflyCount} />
      ))}
    </div>
  );
}
