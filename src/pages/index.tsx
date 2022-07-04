import type { NextPage } from "next";
import { HiOutlineMail } from "react-icons/hi";
import { FiGithub, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../projects";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};
const fadeIn = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Home: NextPage = () => {
  return (
    <>
      <motion.section initial="hidden" animate="visible" variants={container}>
        <motion.h1 variants={fadeIn} className="text-5xl font-bold">
          Gerardo Rodriguez
        </motion.h1>
        <motion.h2 variants={fadeIn} className="text-gray-200 text-xl mt-3">
          Web developer and amateur skateboarder
        </motion.h2>

        <motion.p variants={fadeIn} className="text-gray-400 text-xl my-10">
          Highly motivated developer trying to learn and build wicked insane
          things for the web.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex gap-5"
        >
          <motion.a
            variants={fadeIn}
            href="https://github.com/G-R3"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all block"
            rel="noreferrer"
          >
            <FiGithub size={25} />
          </motion.a>

          <motion.a
            variants={fadeIn}
            href="https://github.com/G-R3"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all block"
            rel="noreferrer"
          >
            <HiOutlineMail size={25} />
          </motion.a>
        </motion.div>
      </motion.section>
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
