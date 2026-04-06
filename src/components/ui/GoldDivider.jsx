import { memo } from 'react';
import { motion } from 'framer-motion';

function GoldDivider({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`flex items-center justify-center gap-4 py-2 ${className}`}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-gold/50" />
      <span className="text-gold/70 text-xs select-none">◆</span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/50 to-gold/50" />
    </motion.div>
  );
}

export default memo(GoldDivider);
