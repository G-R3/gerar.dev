import { Github, Linkedin } from "lucide-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main className="mt-16">
      <div className="space-y-4">
        <p className="text-fg-muted">
          Hey there, I&apos;m{" "}
          <span className="font-medium text-fg">Gerardo</span> and welcome to my
          little corner on the internet. I&apos;m on a journey to{" "}
          <span className="line-through">break</span>{" "}
          <span className="font-medium text-fg">build</span> cool things on the
          web and <span className="font-medium text-fg">learn</span> as much as
          I can.
        </p>

        <p className="text-fg-muted">
          Outside that I like{" "}
          <span className="font-medium text-fg">skateboarding</span>, playing{" "}
          <span className="font-medium text-fg">video games</span>,{" "}
          <span className="font-medium text-fg">jamming out</span> out to some
          soul and classic rock, and{" "}
          <span className="font-medium text-fg">
            obessing over pixels on my screen
          </span>
          ,
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-5">
        <span>Find me on</span>

        <div className="flex gap-6 text-fg-muted">
          <a
            href="https://github.com/G-R3"
            className="flex items-center gap-1 underline underline-offset-4 transition-colors duration-200 hover:text-fg focus-visible:text-fg"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Github className="mr-1 size-4" />
            Github
          </a>
          <a
            href="www.linkedin.com/in/gerardo-rodriguez-823551213"
            className="flex items-center gap-1 underline underline-offset-4 transition-colors duration-200 hover:text-fg focus-visible:text-fg"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Linkedin className="mr-1 size-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;
