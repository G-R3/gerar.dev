"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log(theme);

  return (
    <button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className="rounded-md text-fg-muted transition-all duration-200 ease-out hover:text-fg"
    >
      <Moon className="hidden h-4 w-4 dark:block" />
      <Sun className="block: h-4 w-4 dark:hidden" />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggler;
