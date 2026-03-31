import { useEffect, useRef, useState, useMemo } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';

interface ScrollSequenceProps {
  folderPath: string;
  frameCount: number;
}

export function ScrollSequence({ folderPath, frameCount }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Format number to 3 digits, e.g., 001
      const fileNumber = String(i).padStart(3, '0');
      img.src = `${folderPath}/ezgif-frame-${fileNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, [folderPath, frameCount]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Condense the scroll animation to play faster (between 85% and 15% of viewport)
    offset: ['start 85%', 'end 15%']
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const drawFrame = (index: number) => {
    if (!images[index] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive high-DPI Object Cover Drawing
    const img = images[index];
    const dpr = window.devicePixelRatio || 1;
    
    // Physical pixels
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    
    // Scale context back to logical CSS pixels for easy drawing metrics
    ctx.scale(dpr, dpr);

    const rectWidth = canvas.offsetWidth;
    const rectHeight = canvas.offsetHeight;
    
    ctx.clearRect(0, 0, rectWidth, rectHeight);

    // Full-Bleed Cover Logic mapping 100% edge-to-edge eliminating internal transparent letterboxing!
    const sy = img.height * 0.10; // Invisible 10% top-crop physically dragging subjects "Up" into the frame's safe zone
    const sWidth = img.width; 
    const sHeight = img.height * 0.85; // 10% top-crop + strictly retaining the 5% Veo watermark bottom-crop!

    // Fit rect scale mathematically preserving standard bounding volumes via Cover (Math.max)
    const scale = Math.max(rectWidth / sWidth, rectHeight / sHeight);
    
    const dWidth = sWidth * scale;
    const dHeight = sHeight * scale;
    
    // Dead-centers the overflowing Cover image bounds exactly into the native canvas hardware pixels!
    const dx = (rectWidth - dWidth) / 2;
    const dy = (rectHeight - dHeight) / 2;

    ctx.drawImage(img, 0, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  };

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (loaded) {
      drawFrame(Math.round(latest));
    }
  });

  // Draw initial frame once loaded
  useEffect(() => {
    if (loaded) {
      drawFrame(0);
    }
  }, [loaded]);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-pointer group">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f7f6f1] text-stone-400">
          Loading sequence...
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover', padding: 0 }}
        className="!w-full !h-full !p-0 !object-cover rounded-[2rem] shadow-2xl shadow-green-900/10 border-[1.5px] border-white group-hover:shadow-green-900/20 transition-[shadow,border] duration-500"
      />
    </div>
  );
}
