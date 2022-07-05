/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";
import { motion } from "framer-motion";
import Anchor from "../components/Anchor";

const About: NextPage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            type: "spring",
            bounce: 0.5,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-5xl font-bold mb-10"
      >
        About Me
      </motion.h1>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
        className="text-lg text-gray-400 flex flex-col gap-8"
      >
        <p>
          Hey, I'm Gerardo Rodriguez and I'm currently trying to get myself a
          job 😁. I got started with this computer science and programming thing
          during my junior year of high school where I took an intro to CS
          course. We learned the fundamentals of programming using{" "}
          <Anchor text="Scratch" href="https://scratch.mit.edu/" /> and from
          there with Java.
        </p>
        <p>
          After high school I moved onto to university to study CS and I'll be
          honest I was not really enjoying it. That is until I began reading
          more about web development stuff and oh man did something ⚡spark⚡ in
          me. I was so enthralled by the things you can do within the web I
          immediately began to read and learn more about it. I started watching
          all these Youtube videos and I even ended up purchasing a{" "}
          <Anchor
            text="course"
            href="https://www.udemy.com/course/the-web-developer-bootcamp/"
          />
        </p>

        <p>
          While I continued to learn more about the fundamentals of Computer
          Science at university, in my spare time I would play around with HTML,
          CSS, and JavaScript and create some really terrible stuff, but man did
          I have a blast messing around (especially with the frontend).
        </p>

        <p>
          Skipping ahead, I graduated with a bachelors in CS and I have never
          been more excited. At the moment I'm looking to get hired but in the
          meantime, I'm spending my time learning how to build with{" "}
          <Anchor text="Next.js" href="https://nextjs.org/" /> and{" "}
          <Anchor text="TypeScript" href="https://www.typescriptlang.org/" />
        </p>

        <p>
          What about hobbies? well.... I like to play video games on my
          computer. Though I'm seeing that I do that less and less now. I also
          skate and I have been learning how to do tricks. After many falls and
          two scarred legs later, I can confidently and with consistency land
          Ollies, Nollies, FS-180s, and Pop-Shuvits. Wicked right? 😎.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
