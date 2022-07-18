import { FC } from "react";
import { motion } from "framer-motion";
import { fadeInFromTop, container } from "../animations";
import { featuredProjects } from "../projects";
import Project from "./Project";

const FeaturedProjects: FC = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={container}
      className="my-20"
    >
      <motion.h3
        variants={fadeInFromTop}
        className="text-2xl md:text-4xl font-bold mb-8"
      >
        Featured Projects
      </motion.h3>

      <div className="flex flex-col gap-20 md:gap-32">
        {featuredProjects.map((project, idx) => {
          const flipCard = idx % 2 === 0;
          return (
            <Project key={project.title} flipCard={flipCard} {...project} />
          );
        })}
      </div>
    </motion.section>
  );
};

export default FeaturedProjects;