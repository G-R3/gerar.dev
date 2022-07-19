import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-5">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
