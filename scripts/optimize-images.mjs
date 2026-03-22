/**
 * One-shot asset optimization: writes .webp siblings next to sources.
 * Run: npm run optimize-images
 */
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/assets");

const jobs = [
  { file: "project-1.png", maxW: 1280, quality: 82 },
  { file: "project-2.png", maxW: 1280, quality: 82 },
  { file: "project-5.png", maxW: 1280, quality: 82 },
  { file: "project-6.png", maxW: 1280, quality: 82 },
  { file: "project-3.jpeg", maxW: 1000, quality: 82 },
  { file: "project-4.jpeg", maxW: 1000, quality: 82 },
  { file: "profile.jpeg", maxW: 720, quality: 85 },
  { file: "mini-profile.jpeg", maxW: 160, quality: 82 },
];

async function run() {
  if (!fs.existsSync(assetsDir)) {
    console.error("Missing src/assets");
    process.exit(1);
  }
  for (const { file, maxW, quality } of jobs) {
    const input = path.join(assetsDir, file);
    if (!fs.existsSync(input)) {
      console.warn("skip (missing):", file);
      continue;
    }
    const base = file.replace(/\.(png|jpe?g)$/i, "");
    const outPath = path.join(assetsDir, `${base}.webp`);
    await sharp(input)
      .resize(maxW, null, { withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outPath);
    const inStat = fs.statSync(input);
    const outStat = fs.statSync(outPath);
    console.log(
      `${base}.webp  ${(inStat.size / 1024).toFixed(0)}kB → ${(outStat.size / 1024).toFixed(0)}kB`
    );
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
