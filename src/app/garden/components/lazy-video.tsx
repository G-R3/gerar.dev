"use client";

import { useState, useRef, useEffect } from "react";

interface LazyVideoProps {
  src: string;
  onLoad?: () => void;
}

export default function LazyVideo({ src, onLoad }: LazyVideoProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-neutral-900">
      {shouldLoad ? (
        <>
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            onLoadedData={() => {
              setIsLoaded(true);
              onLoad?.();
            }}
          />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-xs">
              Loading...
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
          Loading...
        </div>
      )}
    </div>
  );
}
