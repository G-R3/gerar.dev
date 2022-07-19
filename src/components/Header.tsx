import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggler from "./ThemeToggler";

const NavLink: FC<{ label: string; href: string }> = ({ label, href }) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <Link href={href}>
      <a
        className={`text-lg px-3 py-2 relative rounded-[4px] transition-all ${
          isActive
            ? " text-black bg-neutral-100 dark:text-white dark:bg-neutral-900 font-semibold"
            : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {label}
      </a>
    </Link>
  );
};

const Header: FC = () => {
  return (
    <header>
      <nav className="flex items-center justify-between max-w-4xl mx-auto px-5 pt-8 pb-8 md:pb-16">
        <div className="-ml-[0.7rem]">
          <NavLink label={"Home"} href="/" />
          <NavLink label={"About"} href="/about" />
        </div>

        <ThemeToggler />
      </nav>
    </header>
  );
};

export default Header;
