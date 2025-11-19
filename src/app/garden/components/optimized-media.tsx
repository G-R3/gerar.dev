"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface OptimizedMediaProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  onLoad?: () => void;
}

export function OptimizedMedia({
  src,
  alt,
  width,
  height,
  onLoad,
}: OptimizedMediaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px", // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onLoad?.(); // Still call onLoad to update counter even on error
  };

  const isVideo = src.endsWith(".mp4");
  const isGif = src.endsWith(".gif");

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{ minHeight: height, minWidth: width }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent" />
        </div>
      )}

      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
          <span className="text-xs text-neutral-500">Failed to load</span>
        </div>
      )}

      {/* Actual media content */}
      {isVisible && (
        <div
          className={`h-full w-full transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {isVideo ? (
            <video
              src={src}
              className="h-full w-full object-cover pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              onLoadedData={handleLoad}
              onError={handleError}
            />
          ) : isGif ? (
            // Use regular img for GIFs since Next.js Image doesn't handle animated GIFs well
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover pointer-events-none"
              draggable={false}
              onLoad={handleLoad}
              onError={handleError}
              loading="lazy"
            />
          ) : (
            // Use Next.js Image for static images (jpg, png)
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-full w-full object-cover pointer-events-none"
              draggable={false}
              onLoadingComplete={handleLoad}
              onError={handleError}
              loading="lazy"
              quality={85}
              sizes={`${width}px`}
            />
          )}
        </div>
      )}
    </div>
  );
}
