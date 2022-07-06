import React, { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProjectType } from "../projects";

const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};
const tagContainer = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const Project: FC<ProjectType> = ({
  image,
  title,
  description,
  longDescription,
  tags,
  externals,
}) => {
  return (
    <div className="flex gap-5 relative group">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        }}
        className="w-full md:w-[75%] h-fit bg-cover md:bg-contain bg-no-repeat bg-center grayscale group-hover:filter-none transition-all duration-[400ms]"
      >
        <Image
          src={`/images/${image}`}
          alt={title}
          width={2400}
          height={1350}
        />
      </motion.div>
      <div className="flex items-end flex-col px-2 mt-10 absolute right-0 md:mt-20">
        <motion.h4
          initial={{ opacity: 0, y: 100 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          {title}
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, y: 100 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-gray-400 my-5 bg-neutral-800 py-3 px-5 rounded-md shadow-lg md:w-[450px] "
        >
          {longDescription}
        </motion.p>
        <motion.div
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={tagContainer}
          className="text-sm flex gap-2 text-gray-400 bg-neutral-800 py-1 px-3 rounded-md shadow-lg"
        >
          {tags.map((tag: string) => (
            <motion.span
              key={tag}
              variants={scaleIn}
              className="cursor-default rounded-md hover:bg-neutral-900 p-1 transition"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Project;
