import React, { FC, ReactNode } from "react";
import Header from "./Header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto">{children}</main>
    </>
  );
};

export default Layout;
