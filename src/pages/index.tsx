import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { container } from "../animations";
import Intro from "../components/Intro";
import FeatureProjects from "../components/FeaturedProjects";
import ProjectCardGrid from "../components/ProjectCardGrid";
import Skills from "../components/Skills";

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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="flex flex-col gap-14"
      >
        <Intro />
        <Skills />
        <FeatureProjects />
        <ProjectCardGrid />
      </motion.div>
    </>
  );
};

export default Home;
