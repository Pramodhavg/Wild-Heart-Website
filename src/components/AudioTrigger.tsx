import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface AudioTriggerProps {
  src: string;
  isStarted: boolean; // Tells whether the user clicked 'Enter the Jungle'
  children: React.ReactNode;
}

export function AudioTrigger({ src, isStarted, children }: AudioTriggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Triggers when at least 40% in view. We use a margin to approximate 'when 40% of the screen is covered by this logic'
  const inView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only initialize the audio once the user has allowed interaction
    if (!audioRef.current && isStarted) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0; // start silent
      audioRef.current = audio;
    }
  }, [src, isStarted]);

  useEffect(() => {
    if (!audioRef.current || !isStarted) return;
    
    // Smooth Transition fade
    const fadeAudio = (targetVolume: number) => {
      const currentVolume = audioRef.current!.volume;
      const t = Math.abs(currentVolume - targetVolume);
      
      // Stop any existing transition? Not easily possible without storing interval id. Let's do a simple interval.
      const interval = setInterval(() => {
        if (!audioRef.current) {
          clearInterval(interval);
          return;
        }

        const step = 0.05;
        if (targetVolume > audioRef.current.volume) {
          if (audioRef.current.volume + step >= targetVolume) {
            audioRef.current.volume = targetVolume;
            clearInterval(interval);
          } else {
            audioRef.current.volume += step;
          }
        } else {
          if (audioRef.current.volume - step <= targetVolume) {
            audioRef.current.volume = targetVolume;
            if (targetVolume === 0) audioRef.current.pause();
            clearInterval(interval);
          } else {
            audioRef.current.volume -= step;
          }
        }
      }, 50);
      return interval;
    };

    let intervalId: NodeJS.Timeout;
    
    if (inView) {
      audioRef.current.play().catch(e => console.warn('Audio play restricted:', e));
      intervalId = fadeAudio(1); // fade to full volume
    } else {
      intervalId = fadeAudio(0); // fade out and pause
    }

    return () => clearInterval(intervalId);
  }, [inView, isStarted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
