import { FC } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { fadeInFromTop, container } from "../animations";

const Intro: FC = () => {
  return (
    <motion.section initial="hidden" animate="visible" variants={container}>
      <motion.h1 variants={fadeInFromTop} className="text-5xl font-bold">
        Gerardo Rodriguez
      </motion.h1>
      <motion.h2
        variants={fadeInFromTop}
        className="text-gray-200 text-xl mt-3"
      >
        Web developer and amateur skateboarder
      </motion.h2>

      <motion.p
        variants={fadeInFromTop}
        className="text-gray-400 text-xl my-10"
      >
        Highly motivated developer trying to learn and build wicked insane
        things for the web.
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex gap-5"
      >
        <motion.a
          aria-label="Github"
          variants={fadeInFromTop}
          href="https://github.com/G-R3"
          target="_blank"
          className="text-gray-400 hover:text-white transition-all block"
          rel="noreferrer"
        >
          <FiGithub size={25} />
        </motion.a>

        <motion.a
          aria-label="LinkedIn"
          variants={fadeInFromTop}
          href="https://linkedin.com/in/gerardo-rodriguez-823551213"
          target="_blank"
          className="text-gray-400 hover:text-white transition-all block"
          rel="noreferrer"
        >
          <FiLinkedin size={25} />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Intro;
