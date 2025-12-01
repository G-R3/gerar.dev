import { InfiniteCanvas } from "./components/infinite-canvas";

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
      >
        <div className="scanlines h-full w-full" />
      </div>
      <InfiniteCanvas />
    </main>
  );
}
