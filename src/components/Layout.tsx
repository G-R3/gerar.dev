import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-5">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
