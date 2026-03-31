import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { TreePine, Wind, Bird, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { ScrollSequence } from './components/ScrollSequence';
import { AudioTrigger } from './components/AudioTrigger';
import { CustomCursor } from './components/CustomCursor';
import { ParallaxVines } from './components/ParallaxVines';
import { FireflyOverlay } from './components/FireflyOverlay';

// Custom Stylized Owl Component (Enchanted Night Variant)
const Owl = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    onClick={onClick}
  >
    {/* The Feathered Silhouette */}
    <path d="M11 4 L12 1 L13 4 C 18 5, 20 9, 20 12 L22 13 L19 14 C 19 18, 17 21, 14 21 L10 21 C 7 21, 5 18, 5 14 L2 13 L4 12 C 4 9, 6 5, 11 4 Z" />
    {/* Eyes */}
    <circle cx="8.5" cy="10.5" r="2.5" />
    <circle cx="15.5" cy="10.5" r="2.5" />
    {/* Beak */}
    <path d="M12 13 L13 15 L11 15 Z" />
    {/* Claws */}
    <path d="M9 21 V23 M15 21 V23" />
  </svg>
);

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(prev => !prev);
  };


  return (
    <>
      {/* Enter the Jungle Overlay */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f4f1ea] selection:bg-green-100 ${isNightMode ? 'night-mode' : ''}`}
          >
            <div className="absolute inset-0 watercolor-bg opacity-40"></div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="gpu-accelerated relative z-10 text-center space-y-8"
            >
              <TreePine className="w-16 h-16 text-green-800 mx-auto" />
              <h1 className="text-4xl md:text-6xl font-serif font-light tracking-widest uppercase text-green-900">
                Wild Heart
              </h1>
              <p className="text-stone-500 italic max-w-sm mx-auto font-serif">
                A serene audio-visual journey. Please ensure your sound is on.
              </p>
              <button
                onClick={() => setIsStarted(true)}
                className="px-8 py-4 border border-green-800 text-green-800 font-serif tracking-widest uppercase hover:bg-green-800 hover:text-white transition-colors duration-500 rounded-full"
              >
                Enter the Jungle
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen font-serif text-stone-800 selection:bg-green-100 watercolor-bg relative ${isNightMode ? 'night-mode' : ''}`}>
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-[9999] backdrop-blur-md transition-colors duration-700 ${isNightMode ? 'bg-black/20' : 'bg-white/10'}`}>
          <div className="w-full px-4 md:px-6 flex justify-between items-center h-20">
            <div className="flex items-center gap-2 max-[600px]:scale-90 origin-left flex-shrink-0">
              <TreePine className="w-6 h-6 text-green-800" />
              <h1 className="text-xl font-bold tracking-widest uppercase text-green-900">Wild Heart</h1>
            </div>
            <nav className="flex items-center justify-end gap-5 pr-4 md:pr-12 max-[600px]:scale-90 origin-right flex-shrink-0">
              <Owl
                className={`w-6 h-6 cursor-pointer transition-all duration-700 ${isNightMode ? 'text-[#ffd700] drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]' : 'text-stone-800 hover:text-green-600'}`}
                onClick={toggleNightMode}
              />
              <Instagram className="w-6 h-6 cursor-pointer hover:text-green-600 transition-colors" />
              <Twitter className="w-6 h-6 cursor-pointer hover:text-green-600 transition-colors" />
              <Facebook className="w-6 h-6 cursor-pointer hover:text-green-600 transition-colors" />
              <Mail className="w-6 h-6 cursor-pointer hover:text-green-600 transition-colors" />
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto pt-24 md:pt-[20vh] pb-[10vh] px-8 space-y-[15vh]">
          {/* Section 1 */}
          <AudioTrigger src="/assets/audio/boy-sleeping-music.wav" isStarted={isStarted}>
            <section className="gpu-accelerated flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-20 items-center justify-center text-center md:text-left min-h-[90vh]">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gpu-accelerated space-y-6 flex flex-col items-center md:items-start w-full"
              >
                <h2 className="text-4xl md:text-5xl font-light italic leading-tight">
                  Finding peace in the <span className="text-green-800">embrace</span> of the wild.
                </h2>
                <p className={`text-lg leading-relaxed max-w-md transition-colors duration-700 ${isNightMode ? 'text-stone-300' : 'text-stone-600'}`}>
                  In the heart of the jungle, where the sunlight filters through ancient leaves, we discover a connection that transcends words. A bond forged in silence and shared breath.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="gpu-accelerated relative w-[85vw] max-w-[350px] aspect-[4/5] md:w-full md:max-w-[450px] md:max-h-none md:aspect-[9/16] mx-auto overflow-hidden rounded-[2rem] flex-shrink-0"
              >
                <ScrollSequence
                  folderPath="/assets/frames/boy_with_gorilla"
                  frameCount={96}
                />
              </motion.div>
            </section>
          </AudioTrigger>

          {/* Section 2 */}
          <AudioTrigger src="/assets/audio/boy-with_boat_music.wav" isStarted={isStarted}>
            <section className="gpu-accelerated flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center text-center md:text-left min-h-[90vh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="gpu-accelerated order-2 md:order-1 relative w-[85vw] max-w-[350px] aspect-[4/5] md:w-full md:max-w-[450px] md:max-h-none md:aspect-[9/16] mx-auto overflow-hidden rounded-[2rem] flex-shrink-0"
              >
                <ScrollSequence
                  folderPath="/assets/frames/boy_in_boat"
                  frameCount={96}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gpu-accelerated order-1 md:order-2 space-y-6 flex flex-col items-center md:items-start w-full"
              >
                <h2 className="text-4xl md:text-5xl font-light italic leading-tight">
                  Navigating the <span className="text-green-800">rhythm</span> of the river.
                </h2>
                <p className={`text-lg leading-relaxed max-w-md transition-colors duration-700 ${isNightMode ? 'text-stone-300' : 'text-stone-600'}`}>
                  Every stroke of the paddle tells a story of curiosity and courage. The river is a mirror, reflecting the untamed spirit that flows within us all.
                </p>
              </motion.div>
            </section>
          </AudioTrigger>

          {/* Section 3 */}
          <AudioTrigger src="/assets/audio/boy_playing_with_monkey.wav" isStarted={isStarted}>
            <section className="gpu-accelerated flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-20 items-center justify-center text-center md:text-left min-h-[90vh]">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gpu-accelerated space-y-6 flex flex-col items-center md:items-start w-full"
              >
                <h2 className="text-4xl md:text-5xl font-light italic leading-tight">
                  Soaring through the <span className="text-green-800">canopy</span> of dreams.
                </h2>
                <p className={`text-lg leading-relaxed max-w-md transition-colors duration-700 ${isNightMode ? 'text-stone-300' : 'text-stone-600'}`}>
                  To swing is to fly, to touch the sky while rooted in the earth. The jungle is our playground, a vast expanse of wonder waiting to be explored.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="gpu-accelerated relative w-[85vw] max-w-[350px] aspect-[4/5] md:w-full md:max-w-[450px] md:max-h-none md:aspect-[9/16] mx-auto overflow-hidden rounded-[2rem] flex-shrink-0"
              >
                <ScrollSequence
                  folderPath="/assets/frames/boy_play_monkey"
                  frameCount={96}
                />
              </motion.div>
            </section>
          </AudioTrigger>
        </main>

        {/* Footer */}
        <footer className="py-10 mt-20 border-t border-stone-200/50 bg-[#fbfaf8]/80 backdrop-blur-sm relative z-10">
          <div className="max-w-6xl mx-auto px-8 text-center space-y-8">
            <div className="flex items-center justify-center gap-2">
              <TreePine className="w-8 h-8 text-green-800" />
              <h3 className="text-2xl font-bold tracking-widest uppercase text-green-900">Wild Heart</h3>
            </div>
            <p className="text-stone-500 italic max-w-lg mx-auto leading-relaxed">
              "In every walk with nature, one receives far more than he seeks."
            </p>
            <div className="flex justify-center gap-8">
              <Instagram className="w-6 h-6 text-stone-400 hover:text-green-600 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-stone-400 hover:text-green-600 cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 text-stone-400 hover:text-green-600 cursor-pointer transition-colors" />
            </div>
            <p className="text-xs text-stone-400 uppercase tracking-widest pt-8">
              © 2026 Wild Heart. All rights reserved.
            </p>
          </div>
        </footer>
        
        <CustomCursor isNightMode={isNightMode} />
        <ParallaxVines isNightMode={isNightMode} />
        {isNightMode && <FireflyOverlay />}
      </div>
    </>
  );
}
