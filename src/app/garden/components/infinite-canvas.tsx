"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui-components/react/dialog";
import { DraggableWindow } from "./draggable-window";
import { Plus, Minus, RotateCcw, House, Info } from "lucide-react";

interface WindowData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  imageUrl: string;
  zIndex: number;
}

const RAW_WINDOWS = [
  { imageUrl: "/garden/1.webp" },
  { imageUrl: "/garden/2.gif" },
  { imageUrl: "/garden/3.webp" },
  { imageUrl: "/garden/4.webp" },
  { imageUrl: "/garden/5.webp" },
  { imageUrl: "/garden/6.png" },
  { imageUrl: "/garden/7.webp" },
  { imageUrl: "/garden/9.webp" },
  { imageUrl: "/garden/10.webp" },
  { imageUrl: "/garden/11.webp" },
  { imageUrl: "/garden/12.webp" },
];

// Helper function to load image dimensions
function loadImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
}

// Helper function to load video dimensions
function loadVideoDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.onloadedmetadata = () => {
      resolve({ width: video.videoWidth, height: video.videoHeight });
    };
    video.onerror = reject;
    video.src = src;
  });
}

// Load dimensions for all media files
async function loadAllMediaDimensions(
  windows: typeof RAW_WINDOWS
): Promise<Array<{ width: number; height: number }>> {
  const dimensionPromises = windows.map((win) => {
    if (win.imageUrl.endsWith(".mp4")) {
      return loadVideoDimensions(win.imageUrl);
    } else {
      return loadImageDimensions(win.imageUrl);
    }
  });
  return Promise.all(dimensionPromises);
}

function generateLayout(
  windows: typeof RAW_WINDOWS,
  dimensions: Array<{ width: number; height: number }>
): WindowData[] {
  const placed: WindowData[] = [];
  // Create windows with ids and dimensions based on original array index
  const windowsWithIds = windows.map((win, index) => ({
    ...win,
    id: String(index),
    width: dimensions[index].width,
    height: dimensions[index].height,
  }));
  // Shuffle windows for random distribution
  const shuffled = [...windowsWithIds].sort(() => Math.random() - 0.5);

  // Spiral parameters
  const angleStep = 0.5;
  const spiralGrowth = 50;
  const padding = 40; // Space between windows

  for (let i = 0; i < shuffled.length; i++) {
    const win = shuffled[i];
    let angle = 0;
    let radius = 0;
    let x = 0;
    let y = 0;
    let collision = true;

    // Try to place window
    while (collision) {
      // Convert polar to cartesian
      // Add some random jitter to make it look less perfect
      const jitterX = (Math.random() - 0.5) * 20;
      const jitterY = (Math.random() - 0.5) * 20;

      x = radius * Math.cos(angle) + jitterX - win.width / 2;
      y = radius * Math.sin(angle) + jitterY - win.height / 2;

      // Check collision with all placed windows
      collision = placed.some((p) => {
        // Simple AABB collision detection with padding
        return (
          x < p.x + p.width + padding &&
          x + win.width + padding > p.x &&
          y < p.y + p.height + padding &&
          y + win.height + padding > p.y
        );
      });

      if (collision) {
        angle += angleStep;
        // Archimedean spiral: r = a + b * theta
        radius = spiralGrowth * angle;
      }
    }

    placed.push({
      ...win,
      x,
      y,
      zIndex: i + 1,
    });
  }

  return placed;
}

export function InfiniteCanvas() {
  const [scale, setScale] = useState(0.75);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [windows, setWindows] = useState<WindowData[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(RAW_WINDOWS.length);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalItems = RAW_WINDOWS.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialOffsetRef = useRef({ x: 0, y: 0 });

  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rAFRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initializeLayout() {
      try {
        // Load all media dimensions
        const dimensions = await loadAllMediaDimensions(RAW_WINDOWS);
        console.log(dimensions);
        if (cancelled) return;

        // Scale dimensions to fit nicely on screen (max width ~400px, maintaining aspect ratio)
        // Note: Window header is 20px (h-5), so we add that to the height
        const maxWidth = 500;
        const HEADER_HEIGHT = 20; // h-5 in Tailwind = 20px
        const scaledDimensions = dimensions.map((dim) => {
          const aspectRatio = dim.width / dim.height;
          let width = dim.width;
          let height = dim.height;

          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }

          // Add header height to window height so content area matches image dimensions
          return {
            width: Math.round(width),
            height: Math.round(height) + HEADER_HEIGHT,
          };
        });

        const layout = generateLayout(RAW_WINDOWS, scaledDimensions);
        setWindows(layout);

        const initialOffset = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        };
        setOffset(initialOffset);
        initialOffsetRef.current = initialOffset;
      } catch (error) {
        console.error("Failed to load media dimensions:", error);
        // Fallback to default dimensions if loading fails
        const defaultDimensions = RAW_WINDOWS.map(() => ({
          width: 300,
          height: 300,
        }));
        const layout = generateLayout(RAW_WINDOWS, defaultDimensions);
        setWindows(layout);
      }
    }

    initializeLayout();

    return () => {
      cancelled = true;
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current);
      }
    };
  }, []);

  const applyMomentum = useCallback(() => {
    const friction = 0.95;
    const stopThreshold = 0.1;

    const animate = () => {
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;

      setOffset((prev) => ({
        x: prev.x + velocityRef.current.x,
        y: prev.y + velocityRef.current.y,
      }));

      if (
        Math.abs(velocityRef.current.x) > stopThreshold ||
        Math.abs(velocityRef.current.y) > stopThreshold
      ) {
        rAFRef.current = requestAnimationFrame(animate);
      } else {
        rAFRef.current = null;
      }
    };

    rAFRef.current = requestAnimationFrame(animate);
  }, []);

  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if (
      e.target === containerRef.current ||
      (e.target as HTMLElement).dataset.canvasBackground
    ) {
      if (rAFRef.current) {
        cancelAnimationFrame(rAFRef.current);
        rAFRef.current = null;
      }

      setIsDraggingCanvas(true);
      dragStartRef.current = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      velocityRef.current = { x: 0, y: 0 };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handleCanvasPointerMove = (e: React.PointerEvent) => {
    if (isDraggingCanvas) {
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      velocityRef.current = { x: deltaX, y: deltaY };

      setOffset({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handleCanvasPointerUp = (e: React.PointerEvent) => {
    if (isDraggingCanvas) {
      setIsDraggingCanvas(false);
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      applyMomentum();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const zoomSensitivity = 0.001;
    const delta = -e.deltaY * zoomSensitivity;

    const newScale = Math.min(Math.max(0.5, scale * (1 + delta)), 2);

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const canvasX = (mouseX - offset.x) / scale;
    const canvasY = (mouseY - offset.y) / scale;

    const newOffsetX = mouseX - canvasX * newScale;
    const newOffsetY = mouseY - canvasY * newScale;

    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  };

  const bringToFront = (id: string) => {
    const newMax = maxZIndex + 1;
    setMaxZIndex(newMax);
    setWindows((windows) =>
      windows.map((w) => (w.id === id ? { ...w, zIndex: newMax } : w))
    );
  };

  const handleMediaLoad = () => {
    setLoadedCount((prev) => Math.min(prev + 1, totalItems));
  };

  const loadingProgress = totalItems > 0 ? (loadedCount / totalItems) * 100 : 0;
  const isLoading = loadedCount < totalItems;

  return (
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 55%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.15]">
        <div className="scanlines h-full w-full" />
      </div>

      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/70 px-3 py-2 shadow-[0_20px_45px_rgba(0,0,0,0.45)] backdrop-blur">
        {isLoading && (
          <div className="flex items-center gap-3 pr-2">
            <div className="flex flex-col gap-0.5 min-w-[100px]">
              <div className="text-[10px] font-medium text-neutral-400">
                {loadedCount}/{totalItems} loaded
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-900">
                <div
                  className="h-full origin-left bg-white transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}
        {isLoading && <div className="h-6 w-px bg-neutral-800" />}
        <div className="flex items-center justify-center px-2">
          <div className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            {(scale * 100).toFixed(0)}%
          </div>
        </div>
        <div className="h-6 w-px bg-neutral-800" />
        <button
          onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="h-6 w-px bg-neutral-800" />
        <button
          onClick={() => {
            setScale(0.75);
            setOffset(initialOffsetRef.current);
          }}
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          aria-label="Reset view"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <div className="h-6 w-px bg-neutral-800" />
        <Dialog.Root>
          <Dialog.Trigger className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black">
            <Info className="h-4 w-4" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-all duration-300" />
            <Dialog.Popup className="fixed left-1/2 top-1/2 z-[61] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/90 p-10 text-neutral-200 shadow-[0_30px_60px_rgba(0,0,0,0.7)] backdrop-blur-lg focus:outline-none">
              <div className="space-y-3 text-left">
                <Dialog.Title className="text-[10px] uppercase tracking-[0.5em] text-neutral-500">
                  Digital Garden
                </Dialog.Title>
                <h1 className="text-4xl font-serif italic tracking-tight text-white mix-blend-difference lg:text-5xl">
                  Infinite Moodboard
                </h1>
              </div>
              <Dialog.Description className="mt-4 max-w-lg text-left text-xs text-neutral-400">
                Living collage of 1-bit textures, motion studies, and visual
                cues that fuel me. A curated collection of visual images,
                motion, and aesthetics that resonate with me :)
              </Dialog.Description>
              <Dialog.Close className="mt-8 w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition-all hover:bg-neutral-200 active:scale-[98%]">
                Close
              </Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <div className="h-6 w-px bg-neutral-800" />
        <Link
          href="/"
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          aria-label="Back to home"
        >
          <House className="h-4 w-4" />
        </Link>
      </div>

      <div
        ref={containerRef}
        className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handleCanvasPointerMove}
        onPointerUp={handleCanvasPointerUp}
        onPointerLeave={handleCanvasPointerUp}
        onWheel={handleWheel}
        data-canvas-background="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #88888820 1px, transparent 1px)",
          backgroundSize: `${40 * scale}px ${40 * scale}px`,
          backgroundPosition: `${offset.x}px ${offset.y}px`,
        }}
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "0 0",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          {windows.map((window) => (
            <DraggableWindow
              key={window.id}
              {...window}
              title={`Frame ${parseInt(window.id) + 1}`}
              scale={scale}
              onDrag={(x, y) => updateWindowPosition(window.id, x, y)}
              onFocus={() => bringToFront(window.id)}
              onLoad={handleMediaLoad}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
