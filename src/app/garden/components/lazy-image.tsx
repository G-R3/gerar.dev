"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  unoptimized?: boolean;
  onLoad?: () => void;
}

export default function LazyImage({
  src,
  alt,
  fill = true,
  width,
  height,
  unoptimized = false,
  onLoad,
}: LazyImageProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={containerRef} className="w-full h-full relative bg-neutral-900">
      {shouldLoad ? (
        <>
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              loading="lazy"
              unoptimized={unoptimized}
              sizes="(max-width: 400px) 100vw, 400px"
              onLoad={handleLoad}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="object-cover w-full h-full"
              loading="lazy"
              unoptimized={unoptimized}
              onLoad={handleLoad}
            />
          )}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs">
              Loading...
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
          Loading...
        </div>
      )}
    </div>
  );
}
