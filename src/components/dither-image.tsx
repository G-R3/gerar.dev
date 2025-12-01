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
      {/* <div className="absolute inset-0 z-10 mix-blend-overlay pointer-events-none opacity-50 bg-noise" /> */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain w-full h-auto grayscale contrast-125 brightness-90 group-hover:contrast-100 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out"
      />
      {/* optional Scanline overlay. idk if should remove. I kind of like it */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-40" />
    </div>
  );
}
