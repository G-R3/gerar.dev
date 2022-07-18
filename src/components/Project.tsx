import React, { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import type { ProjectType } from "../projects";
import {
  container,
  tagContainer,
  scaleIn,
  scaleOut,
  fadeInFromBottom,
} from "../animations";
import ProjectTags from "./ProjectTags";

type Props = ProjectType & {
  flipCard: boolean;
};

const Project: FC<Props> = ({
  image,
  title,
  description,
  longDescription,
  tags,
  externals,
  flipCard,
}) => {
  return (
    <div
      className={`flex flex-col gap-3 group border-2 border-neutral-900 rounded-md p-2 md:flex-row md:relative md:border-none md:p-0 md:justify-between`}
    >
      <motion.div
        initial={"hidden"}
        viewport={{ once: true }}
        whileInView={"visible"}
        variants={scaleOut}
        className="w-full md:w-[65%] h-full"
      >
        <Image
          src={`/static/images/${image}`}
          alt={title}
          width={2400}
          height={1350}
          priority
        />
      </motion.div>

      <div
        className={`flex flex-col px-2 md:justify-center md:z-10 md:px-0 ${
          flipCard
            ? "md:-ml-48 order-last md:items-end"
            : "md:-mr-48 md:order-first md:items-start"
        }`}
      >
        <motion.h4
          initial={"hidden"}
          viewport={{ once: true }}
          whileInView={"visible"}
          variants={fadeInFromBottom}
          className="text-xl font-semibold"
        >
          {title}
        </motion.h4>
        <motion.p
          initial={"hidden"}
          viewport={{ once: true }}
          whileInView={"visible"}
          variants={fadeInFromBottom}
          className="border border-neutral-800 text-gray-400 md:bg-neutral-900 py-3 rounded-md shadow-lg md:w-[450px] md:px-5 md:my-5"
        >
          {longDescription}
        </motion.p>
        <motion.div
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={container}
          className={`flex flex-col gap-3 ${
            flipCard ? "md:items-end" : "md:items-start"
          }`}
        >
          <ProjectTags tags={tags} />
          <div className="flex gap-5">
            <motion.a
              aria-label="Github"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              href={externals.github}
              target="_blank"
              className="w-fit text-gray-400 hover:text-white transition-all block"
              rel="noreferrer"
            >
              <FiGithub size={23} />
            </motion.a>
            {!!externals.demo && (
              <motion.a
                aria-label="See demo"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                href={externals.demo}
                target="_blank"
                className="w-fit text-gray-400 hover:text-white transition-all block"
                rel="noreferrer"
              >
                <FiExternalLink size={23} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Project;
