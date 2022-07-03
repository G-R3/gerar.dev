import type { NextPage } from "next";
import { HiOutlineMail } from "react-icons/hi";
import { FiGithub } from "react-icons/fi";

const Home: NextPage = () => {
  return (
    <>
      <section className="flex flex-col gap-5">
        <div>
          <h1 className="text-5xl font-bold">Gerardo Rodriguez</h1>
          <h2 className="text-gray-200 text-xl mt-4 mb-6">
            Web developer and amateur skateboarded
          </h2>
        </div>

        <p className="text-gray-400 text-xl">
          Highly motivated developer trying to learn and build wicked insane
          things for the web.
        </p>

        <div className="flex gap-5 mt-6">
          <a
            href="https://github.com/G-R3"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all "
            rel="noreferrer"
          >
            <FiGithub size={25} />
          </a>
          <a
            href="https://github.com/G-R3"
            target="_blank"
            className="text-gray-400 hover:text-white transition-all "
            rel="noreferrer"
          >
            <HiOutlineMail size={25} />
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
