"use client";

export function VisualEffects() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0"
      aria-hidden="true"
      style={{ visibility: "hidden" }}
    >
      <defs>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>

        <filter id="grainy-dither">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feBlend mode="overlay" in2="SourceGraphic" result="blend" />
        </filter>
      </defs>
    </svg>
  );
}
