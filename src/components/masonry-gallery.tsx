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
        </div>
      ))}
    </div>
  );
}
