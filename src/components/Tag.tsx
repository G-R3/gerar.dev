import { FC } from "react";
import { motion } from "framer-motion";
import { scaleIn } from "../animations";

const Tag: FC<{ label: string }> = ({ label }) => {
  return (
    <motion.span
      variants={scaleIn}
      className="cursor-default rounded-[4px] hover:bg-neutral-200 dark:md:hover:bg-neutral-800 transition md:px-3 py-1"
    >
      {label}
    </motion.span>
  );
};

export default Tag;
