import { FC } from "react";
import { motion } from "framer-motion";
import { tagContainer, scaleIn } from "../animations";
import Tag from "./Tag";

const ProjectTags: FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <motion.div
      initial="hidden"
      viewport={{ once: true }}
      whileInView="visible"
      variants={tagContainer}
      className="text-xs flex flex-wrap gap-2 md:gap-0 dark:text-gray-400 rounded-md md:shadow-lg md:border md:border-neutral-200 dark:md:border-neutral-800 dark:md:bg-neutral-900 md:p-1"
    >
      {tags.map((tag: string) => (
        <Tag key={tag} label={tag} />
      ))}
    </motion.div>
  );
};

export default ProjectTags;
