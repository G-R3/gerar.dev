import type { NextPage } from "next";
import { HiOutlineMail } from "react-icons/hi";
import { FiGithub, FiArrowRight } from "react-icons/fi";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../projects";

const Home: NextPage = () => {
  return (
    <>
      <section className="flex flex-col gap-5">
        <div>
          <h1 className="text-5xl font-bold">Gerardo Rodriguez</h1>
          <h2 className="text-gray-200 text-xl mt-4 mb-6">
            Web developer and amateur skateboarder
          </h2>
        </div>

        <p className="text-gray-400 text-xl">
          Highly motivated developer trying to learn and build wicked insane
          things for the web.
        </p>

        <div className="flex gap-5 mt-6">
          <a
            href="https://github.com/G-R3"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all "
            rel="noreferrer"
          >
            <FiGithub size={25} />
          </a>
          <a
            href="https://github.com/G-R3"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all "
            rel="noreferrer"
          >
            <HiOutlineMail size={25} />
          </a>
        </div>
      </section>
      <section className="mt-20">
        <h3 className="text-4xl font-bold mb-8">Featured Projects</h3>
        <div className="flex flex-col md:flex-row gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="flex justify-end items-center gap-2 mt-8 text-gray-400 transition-colors group hover:text-white">
          <a href="https://github.com/G-R3" target="_blank" rel="noreferrer">
            More of my stuff
          </a>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </div>
      </section>
    </>
  );
};

export default Home;
