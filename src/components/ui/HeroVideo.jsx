import { useState, useRef, useEffect } from 'react';

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      setVideoLoaded(true);
      return;
    }

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => setVideoLoaded(true));
    };

    video.addEventListener('canplay', handleCanPlay);

    if (video.readyState >= 3) {
      setVideoLoaded(true);
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/videos/hero.webm" type="video/webm" />
        <source src="/assets/videos/hero-optimized.mp4" type="video/mp4" />
        <source src="/assets/videos/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
