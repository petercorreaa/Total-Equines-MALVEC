import { useEffect, useRef, useState } from 'react';

/* ─── Singleton IntersectionObserver ─── */
const observerMap = new Map();
let sharedObserver = null;

function getSharedObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const cb = observerMap.get(entries[i].target);
          if (cb) cb(entries[i].isIntersecting);
        }
      },
      { threshold: 0.15, rootMargin: '-5% 0px' }
    );
  }
  return sharedObserver;
}

export function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver();
    observerMap.set(el, (intersecting) => {
      if (intersecting) {
        setIsVisible(true);
        observer.unobserve(el);
        observerMap.delete(el);
      }
    });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observerMap.delete(el);
    };
  }, []);

  return { ref, isVisible };
}
