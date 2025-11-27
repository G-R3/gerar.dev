"use client";

import { useState, useRef, useEffect } from "react";

interface LazyVideoProps {
  src: string;
  width: number;
  height: number;
  onLoad?: () => void;
}

export default function LazyVideo({
  src,
  width,
  height,
  onLoad,
}: LazyVideoProps) {
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
    <div
      ref={containerRef}
      className="w-full h-full relative bg-neutral-100 dark:bg-neutral-800 overflow-hidden rounded-md"
    >
      {shouldLoad ? (
        <>
          <video
            ref={videoRef}
            src={src}
            width={width}
            height={height}
            className={`rounded-md transition-opacity duration-700 ease-in-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
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
            <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-700" />
      )}
    </div>
  );
}
