export type Project = {
  image: string;
  title: string;
  description: string;
  longDescription: string;

  tags: string[];
  externals: {
    github: string;
    demo: string;
  };
};

export const projects = [
  {
    image: "",
    title: "Cosmo",
    description: "A reddit like application.",
    longDescription:
      "Cosmo is a reddit like application where you can post to a community revolving around a particular topic or create a community of your own.",
    tags: ["Next.js", "TailwindCSS", "Prisma", "tRPC"],
    externals: {
      github: "https://github.com/G-R3/cosmo",
      demo: "aa",
    },
    isFeatured: false,
  },
  {
    image: "spotify-profile.png ",
    title: "Spotify Profiles",
    description:
      "View your spotify top tracks and top artists. Create new playlist and follow artists.",
    longDescription:
      "A React application for viewing personalized spotify data such as your top artist, songs,and playlists. Additionally, you can create playlists and follow artists.",
    tags: ["React", "TailwindCSS", "Spotify"],
    externals: {
      github: "https://github.com/G-R3/spotify-profile",
      demo: "",
    },
    isFeatured: true,
  },
  {
    image: "movie-manager.png",
    title: "Movie Manager",
    description:
      "Browse movies and create lists to track your favorite movies.",
    longDescription:
      "Movie manager is a react application to manage your movies. It supports creating and deleting lists and adding and removing movies from your lists. It also integrates a login and signin flow using JWTs.",
    tags: ["React", "TypeScript", "Chakra", "MongoDB"],
    externals: {
      github: "https://github.com/G-R3/Movies",
      demo: "",
    },
    isFeatured: true,
  },
];
