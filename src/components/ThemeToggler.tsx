import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

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
      className={`bg-neutral-900 p-2 rounded-[4px] hover:bg-neutral-800 transition-color`}
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggler;
