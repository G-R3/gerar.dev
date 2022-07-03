import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="dark">
      <Head />
      <body className="bg-white dark:bg-black dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
