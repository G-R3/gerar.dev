import type { GardenMedia } from "@/lib/garden-media";
import { DitherImage } from "./dither-image";

interface MasonryGalleryProps {
  media: readonly GardenMedia[];
}

export function MasonryGallery({ media }: MasonryGalleryProps) {
  return (
    <div className="columns-2 md:columns-3 gap-0 w-full max-w-full">
      {media.map((item) => (
        <div key={item.id} className="break-inside-avoid relative group">
          <DitherImage
            src={item.src}
            alt=""
            width={item.width}
            height={item.height}
            className="w-full"
          />
          <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 mix-blend-color-dodge transition-opacity duration-100 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
