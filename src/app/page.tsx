import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main>
      <h1 className="mb-2  text-3xl font-semibold text-fg">
        Gerardo Rodriguez
      </h1>
      <div className=" text-fg-muted">Software Engineer</div>

      <p className="mt-16 text-fg-muted">
        I&apos;m on a journey to <span className="line-through">break</span>{" "}
        build cool things on the web, obsess over pixels, and learn as much as I
        can.
      </p>
    </main>
  );
};

export default Home;
