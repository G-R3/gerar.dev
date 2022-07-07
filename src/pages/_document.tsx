import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html className="dark">
      <Head />
      <body className="bg-white dark:bg-black dark:text-white selection:bg-purple-500 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
