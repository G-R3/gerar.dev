import Image from "next/image";
import type { GardenMedia } from "@/lib/garden-media";

interface MasonryGalleryProps {
  media: readonly GardenMedia[];
}

export function MasonryGallery({ media }: MasonryGalleryProps) {
  return (
    <div className="columns-2 md:columns-3 gap-0 w-full max-w-full">
      {media.map((item) => (
        <Image
          key={item.id}
          src={item.src}
          alt=""
          width={item.width}
          height={item.height}
          sizes="(min-width: 1024px) 17vw, (min-width: 768px) 33vw, 50vw"
          unoptimized={item.type === "animated"}
          className="block h-auto w-full break-inside-avoid bg-neutral-900 object-contain grayscale contrast-125 brightness-90 transition-[filter] duration-500 ease-out hover:grayscale-0 hover:contrast-100 hover:brightness-100 motion-reduce:transition-none"
        />
      ))}
    </div>
  );
}
