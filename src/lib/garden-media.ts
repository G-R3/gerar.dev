export type GardenMedia = {
  id: string;
  src: string;
  type: "image" | "gif" | "video";
  width: number;
  height: number;
  x: number;
  y: number;
};

export const MAX_GARDEN_MEDIA_WIDTH = 500;
export const MAX_GARDEN_MEDIA_HEIGHT = 640;

export function getGardenMediaSize({ width, height }: GardenMedia) {
  const scale = Math.min(
    1,
    MAX_GARDEN_MEDIA_WIDTH / width,
    MAX_GARDEN_MEDIA_HEIGHT / height,
  );

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

export const GARDEN_MEDIA = [
  {
    id: "19",
    src: "/garden/19.webp",
    type: "image",
    width: 1500,
    height: 1051,
    x: -650,
    y: -700,
  },
  {
    id: "2",
    src: "/garden/2.gif",
    type: "gif",
    width: 800,
    height: 600,
    x: -1330,
    y: -902.5,
  },
  {
    id: "3",
    src: "/garden/3.webp",
    type: "image",
    width: 4096,
    height: 2731,
    x: -76,
    y: -931,
  },
  {
    id: "4",
    src: "/garden/4.webp",
    type: "image",
    width: 1550,
    height: 872,
    x: 541.5,
    y: -798,
  },
  {
    id: "5",
    src: "/garden/5.webp",
    type: "image",
    width: 1728,
    height: 2752,
    x: 1121,
    y: -969,
  },
  {
    id: "6",
    src: "/garden/6.png",
    type: "image",
    width: 1230,
    height: 555,
    x: -1100.5,
    y: -285,
  },
  {
    id: "7",
    src: "/garden/7.webp",
    type: "image",
    width: 350,
    height: 437,
    x: -500,
    y: -100,
  },
  {
    id: "8",
    src: "/garden/8.webp",
    type: "image",
    width: 829,
    height: 829,
    x: 646,
    y: 855,
  },
  {
    id: "1",
    src: "/garden/1.webp",
    type: "image",
    width: 604,
    height: 604,

    x: -95,
    y: -332.5,
  },
  {
    id: "9",
    src: "/garden/9.webp",
    type: "image",
    width: 2048,
    height: 1542,
    x: 513,
    y: -247,
  },
  {
    id: "10",
    src: "/garden/10.webp",
    type: "image",
    width: 736,
    height: 981,
    x: 1121,
    y: -304,
  },
  {
    id: "11",
    src: "/garden/11.webp",
    type: "image",
    width: 2048,
    height: 1543,
    x: -1349,
    y: 494,
  },
  {
    id: "12",
    src: "/garden/12.webp",
    type: "image",
    width: 639,
    height: 424,
    x: -760,
    y: 600,
  },
  {
    id: "13",
    src: "/garden/13.webp",
    type: "image",
    width: 400,
    height: 314,
    x: -180.5,
    y: 380,
  },
  {
    id: "14",
    src: "/garden/14.webp",
    type: "image",
    width: 2048,
    height: 1374,
    x: 361,
    y: 408.5,
  },
  {
    id: "15",
    src: "/garden/15.webp",
    type: "image",
    width: 2160,
    height: 1555,
    x: 931,
    y: 351.5,
  },
  {
    id: "16",
    src: "/garden/16.webp",
    type: "image",
    width: 2048,
    height: 1542,
    x: -1197,
    y: 1121,
  },
  {
    id: "17",
    src: "/garden/17.webp",
    type: "image",
    width: 1024,
    height: 1024,
    x: -570,
    y: 1000,
  },
  {
    id: "18",
    src: "/garden/18.webp",
    type: "image",
    width: 1500,
    height: 500,
    x: 47.5,
    y: 893,
  },
  {
    id: "20",
    src: "/garden/20.webp",
    type: "image",
    width: 606,
    height: 805,
    x: 1206.5,
    y: 855,
  },
  {
    id: "21",
    src: "/garden/21.webp",
    type: "image",
    width: 1740,
    height: 1478,
    x: -1050.5,
    y: 0,
  },
] satisfies readonly GardenMedia[];

// Order is art-directed: it decides which column each image lands in within the
// home page's CSS column layout. Do not sort or reorder to match GARDEN_MEDIA.
const HOME_MEDIA_ORDER = ["1", "5", "6", "7", "14", "4", "2", "3", "11"];

export const HOME_GARDEN_MEDIA = HOME_MEDIA_ORDER.map((id) => {
  const media = GARDEN_MEDIA.find((item) => item.id === id);
  if (!media) throw new Error(`Unknown garden media id: ${id}`);
  return media;
});
