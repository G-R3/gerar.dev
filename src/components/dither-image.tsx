import Image from "next/image";
import { cn } from "@/lib/utils";

interface DitherImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function DitherImage({
  src,
  alt,
  className,
  width = 400,
  height = 400,
}: DitherImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden group bg-neutral-900", className)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-contain grayscale contrast-125 brightness-90 transition-[filter] duration-500 ease-out [will-change:filter] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 motion-reduce:transition-none"
      />
    </div>
  );
}
