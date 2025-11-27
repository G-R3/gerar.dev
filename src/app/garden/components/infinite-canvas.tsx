"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Dialog } from "@base-ui-components/react/dialog";
import { DraggableWindow } from "./draggable-window";
import { Plus, Minus, RotateCcw, ArrowLeft, Info } from "lucide-react";

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
  {
    imageUrl: "/garden/inspo-1.jpg",
  },
  {
    imageUrl: "/garden/inspo-2.jpg",
  },
  {
    imageUrl: "/garden/inspo-3.gif",
  },
  {
    imageUrl: "/garden/inspo-4.gif",
  },
  {
    imageUrl: "/garden/inspo-5.jpg",
  },
  {
    imageUrl: "/garden/inspo-6.mp4",
  },
  {
    imageUrl: "/garden/inspo-7.jpg",
  },
  {
    imageUrl: "/garden/inspo-8.jpg",
  },
  {
    imageUrl: "/garden/inspo-9.jpg",
  },
  {
    imageUrl: "/garden/inspo-10.png",
  },
  {
    imageUrl: "/garden/inspo-11.jpg",
  },
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

        if (cancelled) return;

        // Scale dimensions to fit nicely on screen (max width ~400px, maintaining aspect ratio)
        // Note: Window header is 36px (h-9), so we add that to the height
        const maxWidth = 400;
        const HEADER_HEIGHT = 36; // h-9 in Tailwind = 36px
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
    <div className="relative h-full w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
      {/* Loading Progress Indicator */}
      {isLoading && (
        <div className="absolute top-6 left-6 z-50 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 shadow-xl ring-1 ring-black/5 dark:bg-neutral-900/90 dark:ring-white/10">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-0.5 min-w-[100px]">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-medium">
                <span className="text-neutral-500 dark:text-neutral-400">
                  Loading
                </span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  {Math.round(loadingProgress)}%
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <div
                  className="h-full bg-neutral-900 dark:bg-white transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-1 rounded-xl bg-white/90 p-1.5 shadow-xl backdrop-blur-md ring-1 ring-black/5 dark:bg-neutral-900/90 dark:ring-white/10">
        <div className="flex justify-center py-1">
          <div className="w-8 text-center text-[10px] font-medium text-neutral-500 dark:text-neutral-400 font-mono">
            {(scale * 100).toFixed(0)}%
          </div>
        </div>
        <button
          onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-black active:scale-95 transition-all dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-black active:scale-95 transition-all dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="my-0.5 h-px bg-neutral-200 dark:bg-neutral-800" />
        <button
          onClick={() => {
            setScale(0.75);
            setOffset(initialOffsetRef.current);
          }}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-black active:scale-95 transition-all dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Reset view"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <div className="my-0.5 h-px bg-neutral-200 dark:bg-neutral-800" />
        <Dialog.Root>
          <Dialog.Trigger className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-black active:scale-95 transition-all dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white">
            <Info className="h-4 w-4" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-all duration-300 dark:bg-black/40" />
            <Dialog.Popup className="fixed left-1/2 top-1/2 z-[61] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white/90 p-6 text-center shadow-2xl ring-1 ring-black/5 backdrop-blur-md focus:outline-none dark:bg-neutral-900/90 dark:ring-white/10">
              <Dialog.Title className="mb-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">
                Digital Garden
              </Dialog.Title>
              <Dialog.Description className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                A curated collection of visual images, motion, and aesthetics
                that resonate with me :)
              </Dialog.Description>
              <Dialog.Close className="mt-6 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 active:scale-95 transition-all dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
                Close
              </Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <div className="my-0.5 h-px bg-neutral-200 dark:bg-neutral-800" />
        <Link
          href="/"
          className="flex items-center justify-center rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-black active:scale-95 transition-all dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div
        ref={containerRef}
        className="h-full w-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={handleCanvasPointerMove}
        onPointerUp={handleCanvasPointerUp}
        onPointerLeave={handleCanvasPointerUp}
        onWheel={handleWheel}
        data-canvas-background="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #88888820 1px, transparent 1px)",
          backgroundSize: `${40 * scale}px ${40 * scale}px`, // Larger grid spacing
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
