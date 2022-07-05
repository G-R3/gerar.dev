import { Dispatch, FC, SetStateAction } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import type { Project } from "../projects";
import { motion } from "framer-motion";

interface Props extends Project {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const ProjectModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  image,
  title,
  description,
  longDescription,
  tags,
  externals,
}) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="bg-black inset-0 fixed bg-opacity-80 py-5 px-5"
      >
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100, transition: { duration: 0.2 } }}
          className="bg-neutral-900 rounded-md max-w-2xl mx-auto flex flex-col gap-3 p-5"
        >
          <motion.div
            initial={{
              scale: 1.1,
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 },
            }}
            className="border border-neutral-800 w-full min-h-[400px] relative rounded-sm overflow-hidden"
          >
            <Image
              src={`/images/${image}`}
              alt={title}
              // width="100%"
              // height="100%"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>

          <div className="flex flex-col gap-8 mt-2">
            <motion.div initial="hidden" animate="visible" variants={container}>
              <div className="flex items-center justify-between flex-wrap mb-6">
                <Dialog.Title
                  as={motion.h5}
                  variants={fadeIn}
                  className="text-lg sm:text-xl font-bold"
                >
                  {title}
                </Dialog.Title>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={tagContainer}
                  className="flex gap-2 bg-neutral-800 rounded-md py-px px-1 mt-1 sm:mt-0"
                >
                  {tags.map((tag: string) => (
                    <motion.span
                      variants={scaleIn}
                      key={tag}
                      className="text-xs rounded-md p-1 text-gray-400 hover:text-white hover:bg-neutral-900 transition-all cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <Dialog.Description
                as={motion.p}
                variants={fadeIn}
                className="text-gray-400 text-sm sm:text-base"
              >
                {longDescription}
              </Dialog.Description>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={tagContainer}
              className="flex justify-end gap-2 w-fit ml-auto"
            >
              {!!externals.github && (
                <motion.button
                  variants={scaleIn}
                  onClick={() => setIsOpen(false)}
                  className="self-end p-1 w-20 block"
                >
                  Source
                </motion.button>
              )}
              {!!externals.demo && (
                <motion.button
                  variants={scaleIn}
                  onClick={() => setIsOpen(false)}
                  className="self-end p-1 w-20 block"
                >
                  Demo
                </motion.button>
              )}
              <motion.button
                variants={scaleIn}
                onClick={() => setIsOpen(false)}
                className="self-end p-1 w-20 block"
              >
                Close
              </motion.button>
            </motion.div>
          </div>
        </Dialog.Panel>
      </motion.div>
    </Dialog>
  );
};

export default ProjectModal;
