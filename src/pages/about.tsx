/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import Anchor from "../components/Anchor";
import { container, fadeInFromTop } from "../animations";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gerardo Rodriguez | About</title>
        <meta
          name="description"
          content="Web developer and skateboarding enthusiast"
        />
      </Head>
      <motion.div initial="hidden" animate="visible" variants={container}>
        <motion.h1 variants={fadeInFromTop} className="text-5xl font-bold mb-8">
          About Me
        </motion.h1>
        <motion.div
          variants={fadeInFromTop}
          className=" text-gray-400 text-base md:text-lg flex flex-col gap-8"
        >
          <p className="bg-neutral-800 py-2 px-4 rounded-md">
            TL;DR: I like do web stuff and skateboard.
          </p>
          <p>
            Hi, I'm Gerardo and I'm a currently looking to do anything web
            related. I got my start in Computer Science during high school where
            learned the fundamentals using{" "}
            <Anchor text="Scratch" href="https://scratch.mit.edu/" /> and Java.
            Soon after I went to a university where I got my B.S. in Computer
            Science 🎓.
          </p>
          <div>
            <h2 className="text-white font-bold text-2xl mb-1">
              What I'm upto
            </h2>
            Currently, I'm learning{" "}
            <Anchor text="Next.js" href="https://nextjs.org/" /> and{" "}
            <Anchor text="TypeScript" href="https://www.typescriptlang.org/" />{" "}
            by building{" "}
            <Anchor text="Cosmo" href="https://github.com/G-R3/cosmo" />. Its
            essentially at really bad clone of reddit.
          </div>

          <div>
            <h2 className="text-white font-bold text-2xl mb-1">Hobbies</h2>
            Outside programming, I like to listen to psychedelic rock and
            skateboard 🛹. I can confidently and with consistency land Ollies,
            Nollies, FS-180s, and Pop-Shuvits. Wicked right? 😎. I'm working on
            landing kick-flips.
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default About;
