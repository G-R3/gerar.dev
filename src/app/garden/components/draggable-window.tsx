"use client";

import React, { useState, useRef } from "react";
import { GripHorizontal } from "lucide-react";
import { OptimizedMedia } from "./optimized-media";

interface DraggableWindowProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  imageUrl: string;
  zIndex: number;
  scale: number;
  onDrag: (x: number, y: number) => void;
  onFocus: () => void;
  onLoad?: () => void;
}

export function DraggableWindow({
  x,
  y,
  width,
  height,
  title,
  imageUrl,
  zIndex,
  scale,
  onDrag,
  onFocus,
  onLoad,
}: DraggableWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation(); // Prevent canvas panning
    e.preventDefault();
    onFocus();
    setIsDragging(true);

    // Store initial click position and initial window position
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = { x, y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.stopPropagation();

    // Calculate delta taking scale into account
    // When zoomed in (scale > 1), mouse movement needs to translate to smaller window movement relative to canvas
    // When zoomed out (scale < 1), mouse movement needs to translate to larger window movement
    const deltaX = (e.clientX - dragStartRef.current.x) / scale;
    const deltaY = (e.clientY - dragStartRef.current.y) / scale;

    onDrag(initialPosRef.current.x + deltaX, initialPosRef.current.y + deltaY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl select-none cursor-grab active:cursor-grabbing dark:border-neutral-800 dark:bg-neutral-900"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: zIndex,
        pointerEvents: "auto", // Re-enable pointer events for the window
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Window Header / Drag Handle */}
      <div className="flex h-8 items-center justify-between border-b border-neutral-100 bg-neutral-50 px-3 dark:border-neutral-800 dark:bg-neutral-800/50">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {title}
        </span>
        <GripHorizontal className="h-4 w-4 text-neutral-400" />
      </div>

      {/* Window Content */}
      <div className="relative flex-1 overflow-hidden bg-neutral-100 dark:bg-neutral-950">
        <OptimizedMedia
          src={imageUrl}
          alt={title}
          width={width}
          height={height}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
