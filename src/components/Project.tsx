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
    <div className="flex gap-5 flex-col group border-2 border-neutral-800 rounded-md p-2 md:flex-row md:relative md:border-none md:p-0">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        viewport={{ once: true }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5 },
        }}
        className="w-full md:w-[75%] h-full"
      >
        <Image
          src={`/images/${image}`}
          alt={title}
          width={2400}
          height={1350}
          priority
        />
      </motion.div>
      <div className="flex flex-col px-2 md:items-end md:absolute md:right-0 md:mt-10">
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
          className="text-gray-400 md:bg-neutral-800 py-3 rounded-md shadow-lg md:w-[450px] md:px-5 md:my-5"
        >
          {longDescription}
        </motion.p>
        <motion.div
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={tagContainer}
          className="text-sm flex flex-wrap gap-2 text-gray-400 py-1 rounded-md shadow-lg md:bg-neutral-800 md:px-3"
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
