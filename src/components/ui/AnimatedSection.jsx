import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const isLowEnd =
  typeof navigator !== 'undefined' &&
  (navigator.hardwareConcurrency <= 4 || window.innerWidth < 768);

const offsets = {
  up:    { x: 0, y: 40 },
  down:  { x: 0, y: -40 },
  left:  { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  none:  { x: 0, y: 0 },
};

function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const { ref, isVisible } = useScrollAnimation();
  const prefersReducedMotion = useReducedMotion();
  const offset = offsets[direction] || offsets.up;

  const skip = prefersReducedMotion;
  const fast = isLowEnd && !skip;

  const initial = skip
    ? { opacity: 1 }
    : { opacity: 0, x: fast ? 0 : offset.x, y: fast ? 0 : offset.y };

  const animate = isVisible
    ? { opacity: 1, x: 0, y: 0 }
    : initial;

  const transition = skip
    ? { duration: 0 }
    : { duration: fast ? 0.25 : 0.7, delay: fast ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      style={{ willChange: isVisible ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

export default memo(AnimatedSection);
