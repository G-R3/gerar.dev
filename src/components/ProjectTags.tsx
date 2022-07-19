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
      className="text-xs flex flex-wrap gap-2 md:gap-0 dark:text-gray-400 rounded-md shadow-lg md:border md:border-neutral-200 dark:md:border-neutral-800 dark:md:bg-neutral-900 md:p-1"
    >
      {tags.map((tag: string) => (
        <motion.span
          key={tag}
          variants={scaleIn}
          className="cursor-default rounded-[4px] hover:bg-neutral-200 dark:md:hover:bg-neutral-800 transition md:px-3 py-1"
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ProjectTags;
