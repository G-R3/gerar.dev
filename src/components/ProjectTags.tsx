import { FC } from "react";
import { motion } from "framer-motion";
import { tagContainer, scaleIn } from "../animations";

const ProjectTags: FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <motion.div
      initial="hidden"
      viewport={{ once: true }}
      whileInView="visible"
      variants={tagContainer}
      className="text-xs flex flex-wrap gap-2 text-gray-400 rounded-md shadow-lg md:border md:border-neutral-800 md:bg-neutral-900 md:p-1 "
    >
      {tags.map((tag: string) => (
        <motion.span
          key={tag}
          variants={scaleIn}
          className="cursor-default rounded-md md:hover:bg-neutral-800 transition md:px-3 py-1"
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ProjectTags;
