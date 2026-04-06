import { useState, useEffect, useCallback, memo } from 'react';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [update]);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left"
      style={{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(to right, #c9a84c, #e8c97a)',
        transition: 'transform 50ms linear',
      }}
    />
  );
}

export default memo(ScrollProgress);
