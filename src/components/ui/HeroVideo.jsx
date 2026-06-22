import { useState, useRef, useEffect } from 'react';

const POSTER = '/assets/videos/hero-poster.jpg';
const SOURCES = [
  { src: '/assets/videos/hero-720.webm', type: 'video/webm' },
  { src: '/assets/videos/hero-720.mp4', type: 'video/mp4' },
];

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Defer downloading the video until after first paint so it never
  // competes with critical resources (keeps FCP/LCP on the lightweight poster).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => {});
    };
    video.addEventListener('canplay', handleCanPlay);

    const startLoading = () => {
      // Inject sources lazily, then begin buffering.
      SOURCES.forEach(({ src, type }) => {
        const source = document.createElement('source');
        source.src = src;
        source.type = type;
        video.appendChild(source);
      });
      video.load();
    };

    const idle =
      window.requestIdleCallback || ((cb) => window.setTimeout(cb, 200));
    const id = idle(startLoading);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  // Pause when off-screen to save resources.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Poster paints immediately as the LCP element */}
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={videoRef}
        poster={POSTER}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="none"
      />
    </div>
  );
}
