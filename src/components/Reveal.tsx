import { ElementType, ReactNode } from "react"
import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Rendered element. Use a landmark or heading tag where one is meant. */
  as?: ElementType
  /** Delay in ms, for the rare case where two blocks should land in order. */
  delay?: number
  /** Travel distance in px. Keep it small; this is punctuation, not spectacle. */
  shift?: number
  id?: string
}

/**
 * Reveals its children once they scroll into view.
 *
 * All timing comes from the `--dur-slow` / `--ease-out` tokens, so every
 * reveal on the site shares one motion language, and `prefers-reduced-motion`
 * renders the content immediately.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  shift = 10,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={inView ? "in" : "out"}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-shift": `${shift}px`,
        } as React.CSSProperties
      }
      className={className && cn(className)}
    >
      {children}
    </Tag>
  )
}
