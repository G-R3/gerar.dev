import ThemeToggler from "@/components/ThemeToggler";
import { Home, Lightbulb } from "lucide-react";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="mb-10 flex items-center justify-between py-5">
      <div className="flex">
        <Link
          href="/"
          className="rounded-md text-gray11 transition-all duration-200 ease-out hover:text-gray12"
          title="Home"
        >
          <Home className="h-4 w-4" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/projects"
          className="rounded-md text-gray11 transition-all duration-200 ease-out hover:text-gray12"
          title="Projects"
        >
          <Lightbulb className="h-4 w-4" />
        </Link>
        <ThemeToggler />
      </div>
    </nav>
  );
};
