import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageSectionProps {
  children: ReactNode
  className?: string
  id?: string
  /** Accessible name, when the section has no visible heading of its own. */
  ariaLabel?: string
}

/**
 * One band of a page. Owns the vertical rhythm so no page has to repeat it,
 * which is what kept the old layout drifting between py-12 and py-20.
 */
export default function PageSection({ children, className, id, ariaLabel }: PageSectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={cn("py-16 md:py-24", className)}>
      <div className="container">{children}</div>
    </section>
  )
}
