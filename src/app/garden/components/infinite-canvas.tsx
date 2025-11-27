"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { DraggableWindow } from "./draggable-window";
import { Plus, Minus, RotateCcw } from "lucide-react";

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
    width: 300,
    height: 400,
    imageUrl: "/garden/inspo-1.jpg",
  },
  {
    width: 400,
    height: 300,
    imageUrl: "/garden/inspo-2.jpg",
  },
  {
    width: 300,
    height: 300,
    imageUrl: "/garden/inspo-3.gif",
  },
  {
    width: 350,
    height: 350,
    imageUrl: "/garden/inspo-4.gif",
  },
  {
    width: 320,
    height: 240,
    imageUrl: "/garden/inspo-5.jpg",
  },
  {
    width: 400,
    height: 225,
    imageUrl: "/garden/inspo-6.mp4",
  },
  {
    width: 360,
    height: 260,
    imageUrl: "/garden/inspo-7.jpg",
  },
  {
    width: 300,
    height: 300,
    imageUrl: "/garden/inspo-8.jpg",
  },
  {
    width: 260,
    height: 340,
    imageUrl: "/garden/inspo-9.jpg",
  },
  {
    width: 340,
    height: 220,
    imageUrl: "/garden/inspo-10.png",
  },
  {
    width: 380,
    height: 280,
    imageUrl: "/garden/inspo-11.jpg",
  },
];

function generateLayout(windows: typeof RAW_WINDOWS): WindowData[] {
  const placed: WindowData[] = [];
  // Create windows with ids based on original array index
  const windowsWithIds = windows.map((win, index) => ({
    ...win,
    id: String(index),
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
    const layout = generateLayout(RAW_WINDOWS);
    setWindows(layout);

    const initialOffset = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    setOffset(initialOffset);
    initialOffsetRef.current = initialOffset;

    return () => {
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
        <div className="absolute top-4 left-4 z-50 rounded-lg bg-white/90 backdrop-blur-sm p-3 shadow-lg dark:bg-neutral-800/90">
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1 min-w-[120px]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  Loading media
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {loadedCount}/{totalItems}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className="h-full bg-neutral-600 dark:bg-neutral-400 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2 rounded-lg bg-white p-2 shadow-lg dark:bg-neutral-800">
        <div className="px-2 py-1 text-center text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {(scale * 100).toFixed(0)}%
        </div>
        <button
          onClick={() => setScale((s) => Math.min(s + 0.1, 2))}
          className="rounded p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(s - 0.1, 0.5))}
          className="rounded p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setScale(0.75);
            setOffset(initialOffsetRef.current);
          }}
          className="rounded p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          aria-label="Reset view"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
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
            "radial-gradient(circle, #88888840 1px, transparent 1px)",
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
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
