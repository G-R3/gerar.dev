import { InfiniteCanvas } from "./components/infinite-canvas";

export default function Page() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      <InfiniteCanvas />
    </main>
  );
}
