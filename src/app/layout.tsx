import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { VisualEffects } from "@/components/visual-effects";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerardo",
  description: "software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} antialiased flex flex-col min-h-screen bg-black text-gray-100 font-mono selection:bg-white selection:text-black `}
      >
        <VisualEffects />
        {children}
      </body>
    </html>
  );
}
