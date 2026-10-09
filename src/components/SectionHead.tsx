import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadProps {
  title: string
  /** Optional sentence under the heading. Kept to one measure. */
  lead?: string
  /** Sits at the far end of the rule, where the eye finishes the line. */
  action?: ReactNode
  /** Heading level, so each page keeps a sensible document outline. */
  as?: "h2" | "h3"
  className?: string
  id?: string
}

/**
 * Section opening.
 *
 * The rule is the structural device: it marks where a section begins and
 * carries the eye to whatever action closes it, so no label is needed above
 * the heading.
 */
export default function SectionHead({
  title,
  lead,
  action,
  as: Tag = "h2",
  className,
  id,
}: SectionHeadProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-5">
        <Tag id={id} className="text-heading font-semibold text-ink">
          {title}
        </Tag>
        <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
        {action}
      </div>
      {lead && <p className="measure mt-4 text-lead text-ink-dim">{lead}</p>}
    </div>
  )
}
