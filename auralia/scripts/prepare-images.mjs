import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(projectRoot, "src", "assets");
const outputDirectory = path.join(projectRoot, "public", "images");

const assets = [
  { source: "headphones-hero.png", name: "headphones-hero", widths: [480, 800, 1200] },
  { source: "headphone-single.png", name: "headphone-single", widths: [320, 480, 704] },
  { source: "work-studio.jpg", name: "work-studio", widths: [480, 800, 1200] },
  { source: "work-detail.jpg", name: "work-detail", widths: [480, 800, 1200] },
  { source: "work-space.jpg", name: "work-space", widths: [480, 800, 1200] },
];

await readdir(sourceDirectory);
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

await Promise.all(
  assets.flatMap(({ source, name, widths }) =>
    widths.map(async (width) => {
      await sharp(path.join(sourceDirectory, source))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(path.join(outputDirectory, `${name}-${width}.webp`));
    }),
  ),
);

console.log(
  `Prepared ${assets.reduce((count, asset) => count + asset.widths.length, 0)} responsive images.`,
);
