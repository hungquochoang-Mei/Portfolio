import React, { useEffect, useRef } from 'react';

export default function FadingVideo({ src, className, style }: { src: string, className?: string, style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55;

    const fadeTo = (targetOpacity: number, duration: number) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      const startOpacity = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear interpolation
        const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
        video.style.opacity = currentOpacity.toString();

        if (progress < 1) {
          rafId.current = requestAnimationFrame(animate);
        }
      };

      rafId.current = requestAnimationFrame(animate);
    };

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (!fadingOutRef.current && video.duration > 0) {
        const timeRemaining = video.duration - video.currentTime;
        if (timeRemaining <= FADE_OUT_LEAD && timeRemaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0, FADE_MS);
        }
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 3) {
      handleLoadedData();
    }

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      autoPlay
      muted
      playsInline
      preload="auto"
    />
  );
}
