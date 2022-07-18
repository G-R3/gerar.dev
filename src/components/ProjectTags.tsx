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
      className="text-xs flex flex-wrap text-gray-400 p-1 rounded-md shadow-lg border border-neutral-800 md:bg-neutral-900"
    >
      {tags.map((tag: string) => (
        <motion.span
          key={tag}
          variants={scaleIn}
          className="cursor-default rounded-md hover:bg-neutral-800 py-1 transition px-3"
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ProjectTags;
