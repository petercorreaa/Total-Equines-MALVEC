import { motion } from 'framer-motion';

export default function ImageCarousel({ images = [], horseName = '' }) {
  if (!images.length) return null;

  return (
    <motion.img
      src={images[0]}
      alt={horseName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
  );
}
