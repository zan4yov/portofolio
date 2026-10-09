/**
 * Topographic contour generation.
 *
 * The hero visual is a map, not an ornament: a seeded value-noise height field
 * traced at several elevations with marching squares. It is deterministic, so
 * the same seed always yields the same terrain, and it is computed once — the
 * rendered output is static SVG geometry that only ever gets transformed.
 *
 * Each elevation returns a single path string of `M x y L x y` segment pairs.
 * One path per level keeps the DOM at a handful of nodes rather than the
 * thousands that individually-pathed segments would need.
 */

/** Integer hash → [0, 1). Deterministic across runs and platforms. */
function hash2(ix: number, iy: number, seed: number): number {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Smoothstep, so cell boundaries in the lattice are not visible as creases. */
const smooth = (t: number) => t * t * (3 - 2 * t);

function valueNoise(x: number, y: number, seed: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = smooth(x - ix);
  const fy = smooth(y - iy);

  const tl = hash2(ix, iy, seed);
  const tr = hash2(ix + 1, iy, seed);
  const bl = hash2(ix, iy + 1, seed);
  const br = hash2(ix + 1, iy + 1, seed);

  const top = tl + (tr - tl) * fx;
  const bottom = bl + (br - bl) * fx;
  return top + (bottom - top) * fy;
}

/** Fractal sum — gives the field both broad landforms and finer detail. */
function fbm(x: number, y: number, seed: number, octaves = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  let total = 0;

  for (let o = 0; o < octaves; o += 1) {
    value += amplitude * valueNoise(x * frequency, y * frequency, seed + o * 101);
    total += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / total;
}

/**
 * Marching-squares case table. The index bits are the corners that sit at or
 * above the threshold (1 = top-left, 2 = top-right, 4 = bottom-right,
 * 8 = bottom-left); each entry lists the cell edges a segment spans, where
 * 0 = top, 1 = right, 2 = bottom, 3 = left.
 */
const CASES: ReadonlyArray<ReadonlyArray<readonly [number, number]>> = [
  [],
  [[3, 0]],
  [[0, 1]],
  [[3, 1]],
  [[1, 2]],
  [[3, 0], [1, 2]],
  [[0, 2]],
  [[3, 2]],
  [[2, 3]],
  [[2, 0]],
  [[0, 1], [2, 3]],
  [[2, 1]],
  [[1, 3]],
  [[1, 0]],
  [[0, 3]],
  [],
]

export interface ContourFieldOptions {
  /** Seed for the terrain. Same seed, same map. */
  seed: number
  /** SVG user-space extent the field is traced across. */
  width: number
  height: number
  /** Lattice resolution. Higher is smoother and costs more at mount only. */
  columns: number
  rows: number
  /** Elevations to trace, each in [0, 1]. */
  levels: readonly number[]
}

/** Builds one SVG path string per elevation in `levels`. */
export function buildContourPaths({
  seed,
  width,
  height,
  columns,
  rows,
  levels,
}: ContourFieldOptions): string[] {
  const cellW = width / columns
  const cellH = height / rows

  // Sample the height field once on a (columns+1) x (rows+1) lattice; every
  // elevation then reads from this same grid.
  const field = new Float32Array((columns + 1) * (rows + 1))
  const at = (cx: number, cy: number) => field[cy * (columns + 1) + cx]

  for (let cy = 0; cy <= rows; cy += 1) {
    for (let cx = 0; cx <= columns; cx += 1) {
      // Scale differs per axis so landforms read as wide ridges, not blobs.
      field[cy * (columns + 1) + cx] = fbm((cx / columns) * 5.5, (cy / rows) * 3.2, seed)
    }
  }

  return levels.map((level) => {
    const segments: string[] = []

    for (let cy = 0; cy < rows; cy += 1) {
      for (let cx = 0; cx < columns; cx += 1) {
        const tl = at(cx, cy)
        const tr = at(cx + 1, cy)
        const br = at(cx + 1, cy + 1)
        const bl = at(cx, cy + 1)

        const index =
          (tl >= level ? 1 : 0) |
          (tr >= level ? 2 : 0) |
          (br >= level ? 4 : 0) |
          (bl >= level ? 8 : 0)

        const edges = CASES[index]
        if (edges.length === 0) continue

        const x0 = cx * cellW
        const y0 = cy * cellH
        const x1 = x0 + cellW
        const y1 = y0 + cellH

        // Linear interpolation along each crossed edge keeps lines smooth
        // instead of stair-stepping between lattice points.
        const lerp = (a: number, b: number) => (level - a) / (b - a)
        const point = (edge: number): [number, number] => {
          switch (edge) {
            case 0:
              return [x0 + cellW * lerp(tl, tr), y0]
            case 1:
              return [x1, y0 + cellH * lerp(tr, br)]
            case 2:
              return [x0 + cellW * lerp(bl, br), y1]
            default:
              return [x0, y0 + cellH * lerp(tl, bl)]
          }
        }

        for (const [from, to] of edges) {
          const [ax, ay] = point(from)
          const [bx, by] = point(to)
          segments.push(
            `M${ax.toFixed(1)} ${ay.toFixed(1)}L${bx.toFixed(1)} ${by.toFixed(1)}`
          )
        }
      }
    }

    return segments.join("")
  })
}
