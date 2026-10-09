import { ReactNode } from "react"
import { usePointerTilt } from "@/hooks/usePointerTilt"
import { cn } from "@/lib/utils"

interface TiltPlateProps {
  children: ReactNode
  /** Content that floats above the plate, such as a label. */
  overlay?: ReactNode
  className?: string
  /** Maximum rotation in degrees. Keep it small; this is depth, not a trick. */
  max?: number
}

/**
 * Gives a project plate physical depth.
 *
 * The plate tips toward the pointer under perspective while the overlay sits
 * on a plane in front of it, so the two separate as the plate turns. The tilt
 * is decoration: it is off for touch and reduced-motion, and nothing is
 * communicated by it alone.
 */
export default function TiltPlate({ children, overlay, className, max = 5 }: TiltPlateProps) {
  const ref = usePointerTilt<HTMLDivElement>({ max })

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        perspective: "1000px",
        ["--tilt-x" as string]: "0deg",
        ["--tilt-y" as string]: "0deg",
      }}
    >
      <div
        className="relative transition-transform duration-base ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
        }}
      >
        {children}
        {overlay && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transform: "translateZ(22px) scale(0.978)" }}
          >
            {overlay}
          </div>
        )}
      </div>
    </div>
  )
}
