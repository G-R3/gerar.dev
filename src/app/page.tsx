import Link from "next/link";
import { MasonryGallery } from "@/components/masonry-gallery";

export default function Home() {
  const images = [
    "/garden/1.webp",
    "/garden/5.webp",
    "/garden/6.png",
    "/garden/7.webp",
    "/garden/14.webp",
    "/garden/4.webp",
    "/garden/2.gif",
    "/garden/3.webp",
    // "/garden/11.webp",
    "/garden/11.webp",
  ];

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row">
      <section className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-black z-10 relative">
        <div className="space-y-12 max-w-xl">
          <header className="space-y-2">
            <h1 className="-ml-2 lg:-ml-3 text-6xl lg:text-8xl font-serif italic tracking-tighter text-white mix-blend-difference">
              Gerardo
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mt-4">
              Software Engineer
            </p>
          </header>

          <div className="space-y-8 font-mono text-sm leading-relaxed text-neutral-300">
            <p>welcome to my little corner on the internet.</p>
            <p>
              i love building cool things on the web, learning as much as
              possible, and obessing over pixels. when i&apos;m not staring at a
              screen, i&apos;m jamming to jazz fusion, skateboarding, or
              learning film photography.
            </p>

            <div className="pt-8 space-y-2">
              <Link
                href="/garden"
                className="flex items-center gap-1 w-fit border-b border-neutral-800"
              >
                garden
              </Link>
              <a
                href="https://github.com/G-R3"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit border-b border-neutral-800"
              >
                github.com/G-R3
              </a>
              <a
                href="https://linkedin.com/in/gerardo-rodriguez"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit border-b border-neutral-800"
              >
                linkedin.com/in/gerardo-rodri/
              </a>
            </div>
          </div>
        </div>

        {/* <footer className="mt-12 lg:mt-0 text-[10px] text-neutral-600 font-mono flex justify-between uppercase tracking-widest">
          <span>System Status: Online</span>
          <span>{new Date().getFullYear()} ©</span>
        </footer> */}
      </section>

      <section className="w-full lg:w-1/2 relative flex items-center justify-center">
        <div className="scanlines absolute inset-0 z-20 pointer-events-none opacity-20"></div>
        <MasonryGallery images={images} />
      </section>
    </main>
  );
}
