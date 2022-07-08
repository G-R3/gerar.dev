import type { NextPage } from "next";
import Head from "next/head";
import { FiGithub, FiArrowRight, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { featuredProjects, otherProjects } from "../projects";
import Project from "../components/Project";
import { container, fadeInFromTop } from "../animations";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gerardo Rodriguez | Home</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content="The personal website for Gerardo Rodriguez"
        />
      </Head>
      <motion.div initial="hidden" animate="visible" variants={container}>
        <motion.section initial="hidden" animate="visible" variants={container}>
          <motion.h1
            variants={fadeInFromTop}
            className="text-2xl md:text-5xl font-bold"
          >
            Gerardo Rodriguez
          </motion.h1>
          <motion.h2
            variants={fadeInFromTop}
            className="text-gray-200 text-base md:text-xl mt-3"
          >
            Web developer and amateur skateboarder
          </motion.h2>

          <motion.p
            variants={fadeInFromTop}
            className="text-gray-400 text-base md:text-xl my-10"
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
              variants={fadeInFromTop}
              href="https://github.com/G-R3"
              target="_blank"
              className="text-gray-400 hover:text-white transition-all block"
              rel="noreferrer"
            >
              <FiGithub size={25} />
            </motion.a>

            <motion.a
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
        <motion.section
          initial="hidden"
          animate="visible"
          variants={container}
          className="my-20"
        >
          <motion.h3
            variants={fadeInFromTop}
            className="text-2xl md:text-4xl font-bold mb-8"
          >
            Featured Projects
          </motion.h3>

          <div className="flex flex-col gap-20 md:gap-32">
            {featuredProjects.map((project) => (
              <Project key={project.title} {...project} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={container}
          className="my-20"
        >
          <motion.h3
            variants={fadeInFromTop}
            className="text-2xl md:text-4xl font-bold mb-8"
          >
            While learning, I made these
          </motion.h3>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {otherProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeInFromTop}
                className="w-full"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          <a
            href="https://github.com/G-R3"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-end w-fit ml-auto gap-2 mt-8 text-gray-400 transition-colors group hover:text-white"
          >
            More of my stuff
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.section>
      </motion.div>
    </>
  );
};

export default Home;
