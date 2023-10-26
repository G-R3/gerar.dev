import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `mx-auto flex min-h-screen max-w-4xl flex-col bg-white selection:bg-purple-500 selection:text-white dark:bg-black dark:text-white`,
          inter.className,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
