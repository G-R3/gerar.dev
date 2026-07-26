import Link from "next/link";
import { MasonryGallery } from "@/components/masonry-gallery";
import { HOME_GARDEN_MEDIA } from "@/lib/garden-media";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row">
      <section className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between bg-black z-10 relative">
        <div className="space-y-12 max-w-xl">
          <header className="space-y-2">
            <h1 className="-ml-2 lg:-ml-3 text-6xl lg:text-8xl font-serif italic tracking-tighter text-white mix-blend-difference">
              Gerardo
            </h1>
            <p className="mt-3 w-fit font-serif text-[1.15rem] italic">
              software engineer
            </p>
          </header>

          <div className="space-y-8 text-sm leading-relaxed text-neutral-300">
            <p>
              i love building, learning, and obsessing over pixels. <br />
              away from the screen, i&apos;m listening to music, skateboarding,
              or doing film photography
            </p>

            <div className="space-y-9">
              <section className="space-y-2">
                <h2 className="w-fit !font-mono !tracking-[0.22em] text-[10px] text-neutral-400/90">
                  ELSEWHERE
                </h2>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/G-R3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-fit border-b border-neutral-800 transition-colors hover:border-white hover:text-white"
                  >
                    github.com/G-R3
                  </a>
                  <a
                    href="https://linkedin.com/in/gerardo-rodri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-fit border-b border-neutral-800 transition-colors hover:border-white hover:text-white"
                  >
                    linkedin.com/in/gerardo-rodri/
                  </a>
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="w-fit !font-mono !tracking-[0.22em] text-[10px] text-neutral-400/90">
                  THINGS
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-3">
                    <Link
                      href="/garden"
                      className="w-fit border-b border-neutral-800 text-white transition-colors hover:border-white"
                    >
                      garden
                    </Link>
                    <p className="text-xs text-neutral-400/90">
                      curated collection of visuals, motion, and aesthetic
                      imagery
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <a
                      href="https://github.com/G-R3/diode"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit border-b border-neutral-800 text-white transition-colors hover:border-white"
                    >
                      diode
                    </a>
                    <p className="text-xs text-neutral-400/90">
                      interactive 3D breadboard simulator in the browser
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <a
                      href="https://github.com/G-R3/reloj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit border-b border-neutral-800 text-white transition-colors hover:border-white"
                    >
                      reloj
                    </a>
                    <p className="text-xs text-neutral-400/90">
                      arduino-based LCD hardware clock
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <a
                      href="https://github.com/G-R3/role-snippet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit border-b border-neutral-800 text-white transition-colors hover:border-white"
                    >
                      role-snippet
                    </a>
                    <p className="text-xs text-neutral-400/90">
                      job-post-to-Notion browser extension
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <a
                      href="https://github.com/G-R3/convert"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit border-b border-neutral-800 text-white transition-colors hover:border-white"
                    >
                      convert
                    </a>
                    <p className="text-xs text-neutral-400/90">
                      TIFF converter for film scans
                    </p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <a
                      href="https://github.com/G-R3/stash"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit border-b border-neutral-800 text-white transition-colors hover:border-white"
                    >
                      stash
                    </a>
                    <p className="text-xs text-neutral-400/90">
                      fuzzy-search TUI for jumping between side projects
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* <footer className="mt-12 lg:mt-0 text-[10px] text-neutral-600 flex justify-between uppercase tracking-widest">
          <span>System Status: Online</span>
          <span>{new Date().getFullYear()} ©</span>
        </footer> */}
      </section>

      <section className="w-full lg:w-1/2 relative flex items-center justify-center">
        <MasonryGallery media={HOME_GARDEN_MEDIA} />
      </section>
    </main>
  );
}
