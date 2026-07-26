"use client";

import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@base-ui-components/react/dialog";
import {
  GripHorizontal,
  House,
  Info,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import {
  GARDEN_MEDIA,
  getGardenMediaSize,
  type GardenMedia,
} from "@/lib/garden-media";

const INITIAL_SCALE = 0.4;
const MIN_SCALE = 0.4;
const MAX_SCALE = 2;
const ZOOM_STEP = 0.1;
const WHEEL_ZOOM_SENSITIVITY = 0.001;
const GRID_SIZE = 40;
const WORLD_ORIGIN_X = 0.5;
const MOMENTUM_FRICTION = 0.95;
const MOMENTUM_STOP_THRESHOLD = 0.1;

type Point = { x: number; y: number };
type Viewport = Point & { scale: number };

function clampScale(scale: number) {
  return Math.min(Math.max(scale, MIN_SCALE), MAX_SCALE);
}

function getDistance(first: Point, second: Point) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function getMidpoint(first: Point, second: Point): Point {
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  };
}

function getCenterOffset(element: HTMLElement, point: Point): Point {
  const rect = element.getBoundingClientRect();

  return {
    x: point.x - (rect.left + rect.width * WORLD_ORIGIN_X),
    y: point.y - (rect.top + rect.height / 2),
  };
}

function snapToPixel(value: number) {
  return Math.round(value);
}

// Deliberate camera position, independent of the hand-authored media layout.
const INITIAL_VIEWPORT: Viewport = { x: -58, y: -27, scale: INITIAL_SCALE };

// Zooms so the world point under `anchor` stays under `anchor`.
function zoomViewport(
  viewport: Viewport,
  anchor: Point,
  targetScale: number,
): Viewport {
  const scale = clampScale(targetScale);
  const worldX = (anchor.x - viewport.x) / viewport.scale;
  const worldY = (anchor.y - viewport.y) / viewport.scale;

  return {
    x: anchor.x - worldX * scale,
    y: anchor.y - worldY * scale,
    scale,
  };
}

const MediaTile = memo(function MediaTile({ media }: { media: GardenMedia }) {
  const size = getGardenMediaSize(media);
  const fileName = media.src.split("/").pop();

  return (
    <div
      className="absolute flex flex-col overflow-hidden rounded-md border border-white/10 bg-neutral-900/70 text-white shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
      style={{
        width: size.width,
        transform: `translate(${media.x}px, ${media.y}px)`,
      }}
    >
      <div className="flex h-5 items-center justify-between px-2">
        <span className="text-[10px] uppercase tracking-[0.1em] text-neutral-400">
          {fileName}
        </span>
        <GripHorizontal className="h-4 w-4 text-neutral-600" />
      </div>
      <div className="px-1.5 pb-1.5">
        {media.type === "video" ? (
          <video
            aria-hidden="true"
            autoPlay
            className="block h-auto w-full rounded-sm"
            height={size.height}
            loop
            muted
            playsInline
            preload="metadata"
            src={media.src}
            width={size.width}
          />
        ) : (
          <Image
            alt=""
            className="block h-auto w-full rounded-sm"
            draggable={false}
            height={size.height}
            loading="eager"
            src={media.src}
            unoptimized
            width={size.width}
          />
        )}
      </div>
    </div>
  );
});

export function InfiniteCanvas() {
  const [viewport, setViewport] = useState<Viewport>(INITIAL_VIEWPORT);
  const viewportRef = useRef(viewport);
  const canvasRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const panRef = useRef<{ startPoint: Point; startViewport: Viewport } | null>(
    null,
  );
  const pinchRef = useRef<
    | {
        distance: number;
        anchor: Point;
        viewport: Viewport;
      }
    | undefined
  >(undefined);
  const velocityRef = useRef<Point>({ x: 0, y: 0 });
  const momentumFrameRef = useRef<number | undefined>(undefined);

  const updateViewport = useCallback((nextViewport: Viewport) => {
    viewportRef.current = nextViewport;
    setViewport(nextViewport);
  }, []);

  function cancelMomentum() {
    if (momentumFrameRef.current !== undefined) {
      cancelAnimationFrame(momentumFrameRef.current);
      momentumFrameRef.current = undefined;
    }
  }

  function startMomentum() {
    cancelMomentum();

    function animate() {
      const velocity = velocityRef.current;
      const nextVelocity = {
        x: velocity.x * MOMENTUM_FRICTION,
        y: velocity.y * MOMENTUM_FRICTION,
      };

      velocityRef.current = nextVelocity;

      if (
        Math.abs(nextVelocity.x) < MOMENTUM_STOP_THRESHOLD &&
        Math.abs(nextVelocity.y) < MOMENTUM_STOP_THRESHOLD
      ) {
        momentumFrameRef.current = undefined;
        return;
      }

      const currentViewport = viewportRef.current;
      updateViewport({
        ...currentViewport,
        x: currentViewport.x + nextVelocity.x,
        y: currentViewport.y + nextVelocity.y,
      });
      momentumFrameRef.current = requestAnimationFrame(animate);
    }

    momentumFrameRef.current = requestAnimationFrame(animate);
  }

  function startPan(point: Point) {
    panRef.current = {
      startPoint: point,
      startViewport: viewportRef.current,
    };
    pinchRef.current = undefined;
    velocityRef.current = { x: 0, y: 0 };
  }

  function startPinch() {
    const points = [...pointersRef.current.values()];
    if (points.length < 2 || !canvasRef.current) return;

    const [first, second] = points;
    pinchRef.current = {
      distance: getDistance(first, second),
      anchor: getCenterOffset(canvasRef.current, getMidpoint(first, second)),
      viewport: viewportRef.current,
    };
    panRef.current = null;
    velocityRef.current = { x: 0, y: 0 };
  }

  // Zooms around the middle of the viewport, which is the world origin's
  // anchor, so no measurement is needed.
  function zoomFromCenter(targetScale: number) {
    const currentViewport = viewportRef.current;
    updateViewport(zoomViewport(currentViewport, { x: 0, y: 0 }, targetScale));
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
    cancelMomentum();

    if (pointersRef.current.size === 1) {
      startPan({ x: event.clientX, y: event.clientY });
    } else {
      startPinch();
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!pointersRef.current.has(event.pointerId)) return;

    const point = { x: event.clientX, y: event.clientY };
    const previousPoint = pointersRef.current.get(event.pointerId)!;
    pointersRef.current.set(event.pointerId, point);

    if (pinchRef.current) {
      const points = [...pointersRef.current.values()];
      if (points.length < 2 || !canvasRef.current) return;

      const [first, second] = points;
      const pinch = pinchRef.current;
      const anchor = getCenterOffset(
        canvasRef.current,
        getMidpoint(first, second),
      );
      const scale = clampScale(
        pinch.viewport.scale * (getDistance(first, second) / pinch.distance),
      );
      // Anchor on the gesture's starting midpoint so the pinch zooms around the
      // content the fingers grabbed, then follow the midpoint as it drifts.
      const zoomed = zoomViewport(pinch.viewport, pinch.anchor, scale);

      updateViewport({
        x: zoomed.x + (anchor.x - pinch.anchor.x),
        y: zoomed.y + (anchor.y - pinch.anchor.y),
        scale: zoomed.scale,
      });
      return;
    }

    if (!panRef.current) return;

    velocityRef.current = {
      x: point.x - previousPoint.x,
      y: point.y - previousPoint.y,
    };

    const { startPoint, startViewport } = panRef.current;
    updateViewport({
      ...startViewport,
      x: startViewport.x + (point.x - startPoint.x),
      y: startViewport.y + (point.y - startPoint.y),
    });
  }

  function handlePointerEnd(
    event: PointerEvent<HTMLDivElement>,
    shouldApplyMomentum: boolean,
  ) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const wasPanning = panRef.current !== null;
    pointersRef.current.delete(event.pointerId);

    if (pointersRef.current.size === 0) {
      panRef.current = null;
      pinchRef.current = undefined;

      if (wasPanning && shouldApplyMomentum) startMomentum();
      return;
    }

    if (pointersRef.current.size === 1) {
      startPan([...pointersRef.current.values()][0]);
      return;
    }

    startPinch();
  }

  // Registered natively because React attaches `wheel` passively, which makes
  // preventDefault a no-op and lets trackpad pinch zoom the whole page.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const currentViewport = viewportRef.current;
      updateViewport(
        zoomViewport(
          currentViewport,
          getCenterOffset(canvas, { x: event.clientX, y: event.clientY }),
          currentViewport.scale * (1 - event.deltaY * WHEEL_ZOOM_SENSITIVITY),
        ),
      );
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, [updateViewport]);

  useEffect(() => {
    return () => {
      if (momentumFrameRef.current !== undefined) {
        cancelAnimationFrame(momentumFrameRef.current);
      }
    };
  }, []);

  const renderedViewport = {
    ...viewport,
    x: snapToPixel(viewport.x),
    y: snapToPixel(viewport.y),
  };

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
        <div className="flex items-center justify-center px-2">
          <div className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
            {(viewport.scale * 100).toFixed(0)}%
          </div>
        </div>
        <div className="h-6 w-px bg-neutral-800" />
        <button
          aria-label="Zoom in"
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          onClick={() => zoomFromCenter(viewportRef.current.scale + ZOOM_STEP)}
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          aria-label="Zoom out"
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          onClick={() => zoomFromCenter(viewportRef.current.scale - ZOOM_STEP)}
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="h-6 w-px bg-neutral-800" />
        <button
          aria-label="Reset view"
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          onClick={() => {
            cancelMomentum();
            updateViewport(INITIAL_VIEWPORT);
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <div className="h-6 w-px bg-neutral-800" />
        <Dialog.Root>
          <Dialog.Trigger
            aria-label="About this garden"
            className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          >
            <Info className="h-4 w-4" />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-all duration-300" />
            <Dialog.Popup className="fixed left-1/2 top-1/2 z-[61] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/90 p-10 text-neutral-200 shadow-[0_30px_60px_rgba(0,0,0,0.7)] backdrop-blur-lg focus:outline-none">
              <div className="space-y-3 text-left">
                <Dialog.Title className="text-[10px] uppercase tracking-[0.5em] text-neutral-400/75">
                  Digital Garden
                </Dialog.Title>
                <h1 className="text-4xl font-serif italic tracking-tight text-white mix-blend-difference lg:text-5xl">
                  Infinite Moodboard
                </h1>
              </div>
              <Dialog.Description className="mt-4 max-w-lg text-left text-xs text-neutral-400">
                A curated collection of visuals, motion, and aesthetic pieces
                that resonate with me :). An evolving garden I continue to tend
                as I discover new pieces.
              </Dialog.Description>
              <Dialog.Close className="mt-8 w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition-all hover:bg-neutral-200 active:scale-[98%]">
                Close
              </Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
        <div className="h-6 w-px bg-neutral-800" />
        <Link
          aria-label="Back to home"
          className="flex items-center justify-center rounded-md border border-transparent p-1 text-neutral-300 transition-all hover:border-white/20 hover:bg-white hover:text-black"
          href="/"
        >
          <House className="h-4 w-4" />
        </Link>
      </div>

      <div
        aria-label="Interactive moodboard"
        className="h-full w-full touch-none cursor-grab active:cursor-grabbing"
        onPointerCancel={(event) => handlePointerEnd(event, false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => handlePointerEnd(event, true)}
        ref={canvasRef}
        role="application"
        style={{
          backgroundImage:
            "radial-gradient(circle, #88888820 1px, transparent 1px)",
          backgroundPosition: `calc(${WORLD_ORIGIN_X * 100}% + ${renderedViewport.x}px) calc(50% + ${renderedViewport.y}px)`,
          backgroundSize: `${GRID_SIZE * viewport.scale}px ${GRID_SIZE * viewport.scale}px`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2"
          style={{
            left: `${WORLD_ORIGIN_X * 100}%`,
            transform: `translate(${renderedViewport.x}px, ${renderedViewport.y}px) scale(${viewport.scale})`,
            transformOrigin: "0 0",
          }}
        >
          {GARDEN_MEDIA.map((media) => (
            <MediaTile key={media.id} media={media} />
          ))}
        </div>
      </div>
    </div>
  );
}
