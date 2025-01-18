export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-16 py-16">
        <section className="space-y-4">
          <h1 className="text-xl font-bold text-white">gerardo rodriguez</h1>
          <p className="text-zinc-400 text-sm">
            Software Engineer based in new jersey
          </p>

          <p className="text-sm text-zinc-400 leading-relaxed">
            welcome to my little corner of the internet. i love{" "}
            <span className="line-through">breaking</span> building cool things
            on the web, learning as much as possible, and obessing over pixels.
            when i'm not staring at a screen, i'm jamming to jazz fusion,
            skateboarding, or learning film photography.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">Experience</h2>
        </section>
      </div>
    </main>
  );
}
