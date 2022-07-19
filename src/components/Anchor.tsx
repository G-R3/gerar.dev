import { FC } from "react";

const Anchor: FC<{ text: string; href: string }> = ({ text, href }) => {
  return (
    <span className="relative after:content-* after:absolute after:w-full after:bottom-0 after:left-0 after:h-0 hover:after:h-full after:bg-[rgba(0,255,242,.3)] shadow-[inset_0_0_0_#b4e7f8] hover:shadow-[inset_0_-2px_0_#b4e7f8] transition-all after:duration-75">
      <a
        href={href}
        target="_blank"
        className="relative text-black dark:text-white z-10"
        rel="noreferrer"
      >
        {text}
      </a>
    </span>
  );
};

export default Anchor;
