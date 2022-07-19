import { FC } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { otherProjects } from "../projects";
import { fadeInFromTop, container } from "../animations";
import ProjectCard from "./ProjectCard";

const ProjectCardGrid: FC = () => {
  return (
    <motion.section initial="hidden" animate="visible" variants={container}>
      <motion.h3 variants={fadeInFromTop} className="text-3xl font-bold mb-8">
        While learning, I made these
      </motion.h3>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {otherProjects.map((project) => (
          <motion.div
            key={project.title}
            variants={fadeInFromTop}
            className="w-full"
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>

      <a
        href="https://github.com/G-R3"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-end w-fit ml-auto gap-2 mt-8 text-gray-600 hover:text-black dark:text-gray-400 transition-colors group dark:hover:text-white"
      >
        More of my stuff
        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
      </a>
    </motion.section>
  );
};

export default ProjectCardGrid;
