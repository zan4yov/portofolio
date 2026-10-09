import { useEffect, useMemo, useState } from "react"
import { buildContourPaths } from "@/lib/contours"
import { usePointerTilt } from "@/hooks/usePointerTilt"
import { cn } from "@/lib/utils"

const VIEW_W = 1200
const VIEW_H = 760

interface Stratum {
  /** Threshold in the height field, in [0, 1]. */
  level: number
  stroke: string
  width: number
  opacity: number
}

/**
 * Elevations, lowest first. Colour, weight and opacity climb with altitude so
 * the model reads as terrain: distant ground in hairline grey, the ridges
 * picked out in ore green and survey brass.
 */
const STRATA: readonly Stratum[] = [
  { level: 0.300, stroke: "hsl(var(--border))", width: 1, opacity: 0.6 },
  { level: 0.345, stroke: "hsl(var(--border))", width: 1, opacity: 0.8 },
  { level: 0.390, stroke: "hsl(var(--hairline-strong))", width: 1, opacity: 0.75 },
  { level: 0.435, stroke: "hsl(var(--hairline-strong))", width: 1, opacity: 0.9 },
  { level: 0.480, stroke: "hsl(var(--secondary))", width: 1, opacity: 0.45 },
  { level: 0.525, stroke: "hsl(var(--secondary))", width: 1.15, opacity: 0.6 },
  { level: 0.570, stroke: "hsl(var(--primary))", width: 1.15, opacity: 0.6 },
  { level: 0.615, stroke: "hsl(var(--primary))", width: 1.4, opacity: 0.8 },
  { level: 0.660, stroke: "hsl(var(--primary))", width: 1.6, opacity: 1 },
]

/** Vertical exaggeration: distance in px between one contour plane and the next. */
const LIFT = 34

interface ContourFieldProps {
  /** Terrain seed. Changing it draws a different, equally valid map. */
  seed?: number
  className?: string
}

/**
 * A relief model of generated terrain.
 *
 * Contours are traced once at mount, then each elevation is placed on its own
 * plane in a shared 3D space, exactly the way a physical stacked-contour model
 * is built. The whole model sits under perspective and tips toward the
 * pointer, so moving across the hero genuinely parallaxes the high ground against
 * the low. No animation loop runs: pointer tracking writes two custom
 * properties and the compositor does the rest.
 */
export default function ContourField({ seed = 20060418, className }: ContourFieldProps) {
  const sceneRef = usePointerTilt<HTMLDivElement>({ attach: "parent", max: 5 })
  const [drawn, setDrawn] = useState(false)

  const paths = useMemo(
    () =>
      buildContourPaths({
        seed,
        width: VIEW_W,
        height: VIEW_H,
        columns: 64,
        rows: 40,
        levels: STRATA.map((s) => s.level),
      }),
    [seed]
  )

  // Raise the strata in sequence, low ground first: the model builds itself.
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
      style={{
        perspective: "1400px",
        perspectiveOrigin: "60% 35%",
        ["--tilt-x" as string]: "0deg",
        ["--tilt-y" as string]: "0deg",
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-base ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "rotateX(calc(16deg + var(--tilt-x))) rotateY(calc(-7deg + var(--tilt-y))) rotateZ(-5deg) scale(0.9)",
        }}
      >
        {/* Ground plane: the graticule the model is plotted on. */}
        <div className="absolute inset-0" style={{ transform: "translateZ(0px)" }}>
          <svg
            className="h-full w-full"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <defs>
              <pattern id="cf-graticule" width="60" height="60" patternUnits="userSpaceOnUse">
                <path
                  d="M60 0V60M0 60H60"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width={VIEW_W} height={VIEW_H} fill="url(#cf-graticule)" />
          </svg>
        </div>

        {STRATA.map((stratum, index) => (
          <div
            key={stratum.level}
            className="absolute inset-0 transition-opacity ease-out"
            style={{
              transform: `translateZ(${(index + 1) * LIFT}px)`,
              opacity: drawn ? stratum.opacity : 0,
              transitionDuration: "900ms",
              transitionDelay: `${index * 70}ms`,
            }}
          >
            <svg
              className="h-full w-full"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <path
                d={paths[index]}
                fill="none"
                stroke={stratum.stroke}
                strokeWidth={stratum.width}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
