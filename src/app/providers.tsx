"use client";
import { ThemeProvider } from "next-themes";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};
