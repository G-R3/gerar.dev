import type { NextPage } from "next";
import { HiOutlineMail } from "react-icons/hi";
import { FiGithub, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { featuredProjects, otherProjects } from "../projects";
import Project from "../components/Project";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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
    <motion.div initial="hidden" animate="visible" variants={container}>
      <motion.section initial="hidden" animate="visible" variants={container}>
        <motion.h1 variants={fadeIn} className="text-2xl md:text-5xl font-bold">
          Gerardo Rodriguez
        </motion.h1>
        <motion.h2
          variants={fadeIn}
          className="text-gray-200 text-base md:text-xl mt-3"
        >
          Web developer and amateur skateboarder
        </motion.h2>

        <motion.p
          variants={fadeIn}
          className="text-gray-400 text-base md:text-xl my-10"
        >
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
      <motion.section
        initial="hidden"
        animate="visible"
        variants={container}
        className="my-20"
      >
        <motion.h3
          variants={fadeIn}
          className="text-2xl md:text-4xl font-bold mb-8"
        >
          Featured Projects
        </motion.h3>

        <div className="flex flex-col gap-20 md:gap-32">
          {featuredProjects.map((project) => (
            <Project key={project.title} {...project} />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={container}
        className="my-20"
      >
        <motion.h3
          variants={fadeIn}
          className="text-2xl md:text-4xl font-bold mb-8"
        >
          While learning, I made these
        </motion.h3>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col md:flex-row gap-4"
        >
          {otherProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeIn}
              className="w-full md:w-1/3"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-end items-center gap-2 mt-8 text-gray-400 transition-colors group hover:text-white">
          <a href="https://github.com/G-R3" target="_blank" rel="noreferrer">
            More of my stuff
          </a>
          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
