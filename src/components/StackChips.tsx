import { cn } from "@/lib/utils"

interface StackChipsProps {
  items: string[]
  className?: string
  /** Accessible name for the list, since the chips carry no heading. */
  label?: string
}

/** The technologies a project is built from, as a plain list of chips. */
export default function StackChips({ items, className, label = "Built with" }: StackChipsProps) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-x-2 gap-y-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="data rounded-sm border border-hairline bg-surface-raised px-2 py-1 text-ink-dim"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
