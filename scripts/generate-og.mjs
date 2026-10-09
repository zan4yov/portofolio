/**
 * Builds the 1200x630 social preview card referenced by the og:image and
 * twitter:image tags. Run: npm run generate-og
 *
 * Text is set in a generic sans stack because the card is rasterised here
 * rather than in a browser, so the site webfont is not available.
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "../public/og.png");

const BG = "#14181a";
const BRASS = "#d9a44a";
const MALACHITE = "#5ca68a";
const BONE = "#e7e4dc";
const DIM = "#9aa3a2";
const HAIR = "#2c3537";

// Nested contours in the same language as the brand mark, at poster scale.
const contours = [
  { d: "M620 700C760 340 1240 300 1420 640", stroke: HAIR, w: 2 },
  { d: "M660 690C790 390 1210 355 1370 630", stroke: HAIR, w: 2 },
  { d: "M700 680C820 440 1180 410 1320 620", stroke: MALACHITE, w: 2, o: 0.5 },
  { d: "M745 670C850 490 1145 465 1265 610", stroke: BRASS, w: 2.5, o: 0.6 },
  { d: "M790 660C880 540 1110 520 1210 600", stroke: BRASS, w: 3, o: 0.9 },
]
  .map(
    ({ d, stroke, w, o = 1 }) =>
      `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`
  )
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0V60M0 60H60" fill="none" stroke="${HAIR}" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.55"/>
  <g transform="translate(-30 -70) scale(0.9)">${contours}</g>

  <text x="80" y="268" fill="${BONE}" font-family="sans-serif" font-size="92" font-weight="700" letter-spacing="-3">Razan Widya</text>
  <text x="80" y="366" fill="${BONE}" font-family="sans-serif" font-size="92" font-weight="700" letter-spacing="-3">Reswara</text>

  <rect x="80" y="412" width="64" height="3" fill="${BRASS}"/>

  <text x="80" y="470" fill="${BRASS}" font-family="sans-serif" font-size="34" font-weight="600">Software Engineer</text>
  <text x="80" y="516" fill="${DIM}" font-family="sans-serif" font-size="26" font-weight="500">Web applications, analytics dashboards, geospatial analysis</text>
  <text x="80" y="566" fill="${DIM}" font-family="monospace" font-size="22">razan-widya-portfolio.vercel.app</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log("wrote", path.relative(process.cwd(), out));
