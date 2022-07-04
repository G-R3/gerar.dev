import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-5 mt-20 mb-10 border-t-2 border-neutral-800 flex justify-between items-center">
      <div className="flex gap-10 justify-evenly">
        <ul className="mt-10 flex flex-col gap-5">
          <li>
            <Link href="/">
              <a className="px-3 py-2 text-gray-400 hover:text-white transition-all">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="px-3 py-2 text-gray-400 hover:text-white transition-all">
                About
              </a>
            </Link>
          </li>
        </ul>
        <ul className="mt-10 flex flex-col gap-5">
          <li>
            <a
              href="https://github.com/G-R3/PortfolioV2"
              target="_blank"
              className="px-3 py-2 text-gray-400 hover:text-white transition-all"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>

      <a
        href="https://github.com/G-R3/"
        target="_blank"
        className="text-gray-400 hover:text-white transition-all"
        rel="noreferrer"
      >
        Made with ♥ by Gerardo
      </a>
    </div>
  );
};

export default Footer;
