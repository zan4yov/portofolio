import TechBadge from "./TechBadge"
import { techGroups } from "@/data/portfolio-data"

/**
 * The stack, grouped by what each tool is for. Grouping beats one long
 * alphabetical wrap: a reader scanning for "does he know React" finds it under
 * Frameworks rather than somewhere in a field of twenty badges.
 */
export default function TechMatrix() {
  return (
    <div className="space-y-9">
      {techGroups.map((group) => (
        <section key={group.label}>
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold text-ink">{group.label}</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
          </div>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {group.items.map((item) => (
              <TechBadge key={item.name} name={item.name} logo={item.logo} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
