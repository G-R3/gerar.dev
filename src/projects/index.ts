export type ProjectType = {
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

export const featuredProjects = [
  // {
  //   image: "",
  //   title: "Cosmo",
  //   description: "A reddit like application.",
  //   longDescription:
  //     "Cosmo is a reddit like application where you can post to a community revolving around a particular topic or create a community of your own.",
  //   tags: ["Next.js", "TailwindCSS", "Prisma", "tRPC"],
  //   externals: {
  //     github: "https://github.com/G-R3/cosmo",
  //     demo: "aa",
  //   },
  //   isFeatured: false,
  // },
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
      "Movie manager is a react application to manage your movies. It supports creating, editing, and deleting lists and adding and removing movies from your lists. It also integrates a login and signin flow using JWTs.",
    tags: ["React", "TypeScript", "Chakra", "MongoDB"],
    externals: {
      github: "https://github.com/G-R3/Movies",
      demo: "",
    },
    isFeatured: true,
  },
];

export const otherProjects = [
  {
    image: "",
    title: "GitHub Profiles",
    description: "Search for a GitHub Profile and view their top repositories",
    longDescription:
      "Github profiles is a react application that allows you to search for any GitHub profile and see the their top repositories. It supports sorting the repo by stars and number of forks.",
    tags: ["React", "TailwindCSS", "GitHub API"],
    externals: {
      github: "https://github.com/G-R3/Github-Profiles",
      demo: "",
    },
  },
  {
    image: "",
    title: "Camp",
    description: "Easily browse and search for your next campground.",
    longDescription:
      "Camp is a traditional server-side rendered fullstack web app. It allows users to create or view campgrounds via search or map. It also supports image upload, a rating and comment system, and authentication.",
    tags: [
      "Bootstrap 5",
      "JavaScript",
      "EJS",
      "Express",
      "MongoDB",
      "Heroku",
      "Passport",
    ],
    externals: {
      github: "https://github.com/G-R3/Github-Profiles",
      demo: "https://yelpcamp-gr.herokuapp.com/",
    },
  },
  {
    image: "",
    title: "PokeDex",
    description: "Browse the first generation of pokemon.",
    longDescription:
      "A PokeDex to browse the first generation of pokemon. The best generation of pokemon. I built this to learn more about web APIs and how to display API data",
    tags: ["HTML", "CSS", "JavaScript", "Pokemon API"],
    externals: {
      github: "https://github.com/G-R3/Todo-App",
      demo: "",
    },
  },
  {
    image: "",
    title: "Todo App",
    description: "Keep track of your daily tasks with this simple todo app",
    longDescription:
      "Yes... yet another todo app added to the list. This was a project I built to learn the fundamentals of JavaScript and the DOM.",
    tags: ["HTML", "CSS", "JavaScript"],
    externals: {
      github: "https://github.com/G-R3/Todo-App",
      demo: "",
    },
  },
];
