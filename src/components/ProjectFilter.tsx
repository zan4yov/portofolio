import type { Discipline } from "@/data/portfolio-data"

export type Filter = Discipline | "All"

interface ProjectFilterProps {
  options: Filter[]
  active: Filter
  onChange: (next: Filter) => void
  /** Number of projects in each option, shown so the choice is informed. */
  counts: Record<string, number>
}

/**
 * Slices the project list by discipline.
 *
 * Implemented as toggle buttons rather than tabs: the list below is not a set
 * of panels, it is one list being narrowed, so `aria-pressed` describes it
 * accurately and arrow-key tab semantics would mislead.
 */
export default function ProjectFilter({
  options,
  active,
  onChange,
  counts,
}: ProjectFilterProps) {
  return (
    <div role="group" aria-label="Filter projects by discipline" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === active
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={[
              "inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-sm font-medium",
              "transition-colors duration-base ease-out",
              isActive
                ? "border-primary bg-primary/12 text-primary"
                : "border-hairline text-ink-dim hover:border-hairline-strong hover:text-ink",
            ].join(" ")}
          >
            {option}
            <span className="data text-ink-faint">{counts[option]}</span>
          </button>
        )
      })}
    </div>
  )
}
