import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { cn } from "@/utils/cn";
import { Metadata } from "next";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerardo Rodriguez",
  description: "My corner of the internet",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `mx-auto flex min-h-screen max-w-2xl flex-col bg-background selection:bg-selection`,
          inter.className,
        )}
      >
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
