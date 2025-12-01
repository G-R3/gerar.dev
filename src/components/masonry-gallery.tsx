"use client";

import { useState, useEffect } from "react";
import { DitherImage } from "./dither-image";

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface MasonryGalleryProps {
  images: string[];
}

export function MasonryGallery({ images }: MasonryGalleryProps) {
  const [imageData, setImageData] = useState<ImageData[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const promises = images.map((src) => {
        return new Promise<ImageData>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              src,
              alt: `Inspiration ${images.indexOf(src) + 1}`,
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          };
          img.src = src;
        });
      });

      const loadedImages = await Promise.all(promises);
      setImageData(loadedImages);
    };

    loadImages();
  }, [images]);

  if (imageData.length === 0) {
    return null;
  }

  return (
    <div className="columns-2 md:columns-3 gap-0 w-full max-w-full">
      {imageData.map((image, i) => (
        <div key={`image-${i}`} className="break-inside-avoid relative group">
          <DitherImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full"
          />
          <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 mix-blend-color-dodge transition-opacity duration-100 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
