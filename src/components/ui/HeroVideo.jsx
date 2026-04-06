import { useState, useRef, useEffect } from 'react';

export default function HeroVideo({ fallbackImage }) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pause/resume based on visibility
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

  // Autoplay on canplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      if (video.style) video.style.transform = 'translateZ(0)'; // GPU acceleration
      video.play().catch(() => setVideoLoaded(true));
    };

    const handleError = () => setVideoError(true);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={fallbackImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fallback image — shows while video loads or on error */}
      <img
        src={fallbackImage}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />

      {/* Video */}
      {!videoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={fallbackImage}
        >
          <source src="/assets/videos/hero.webm" type="video/webm" />
          <source src="/assets/videos/hero-optimized.mp4" type="video/mp4" />
          <source src="/assets/videos/hero.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
