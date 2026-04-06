import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageCarousel({ images = [], horseName = '' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  return (
    <>
      {/* Main background image with crossfade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={horseName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      {/* Thumbnail strip — bottom right */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-16 w-24 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-20 sm:w-28 ${
              i === activeIndex
                ? 'border-gold shadow-lg shadow-gold/20'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img decoding="async"
              src={img}
              alt={`${horseName} ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </>
  );
}
