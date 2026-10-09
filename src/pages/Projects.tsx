import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import PageSection from "@/components/PageSection"
import ProjectFilter, { type Filter } from "@/components/ProjectFilter"
import ProjectRecord from "@/components/ProjectRecord"
import Reveal from "@/components/Reveal"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/portfolio-data"

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All")

  // Counts and options both come from the projects that actually exist, so a
  // filter can never offer a slice that turns out to be empty.
  const { options, counts } = useMemo(() => {
    const tally: Record<string, number> = { All: projects.length }
    for (const project of projects) {
      tally[project.discipline] = (tally[project.discipline] ?? 0) + 1
    }
    const present = Object.keys(tally).filter((key) => key !== "All" && tally[key] > 0)
    return { options: ["All", ...present] as Filter[], counts: tally }
  }, [])

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.discipline === filter)),
    [filter]
  )

  return (
    <>
      <div className="container">
        <PageHeader
          title="Projects"
          lead="Six projects across web applications, business intelligence and geospatial analysis. Each one lists what it is built from and, where the code is public, a link to read it."
        />
      </div>

      <PageSection>
        <ProjectFilter options={options} active={filter} onChange={setFilter} counts={counts} />

        {/* Announced on change, so the filter is usable without sighted scanning. */}
        <p aria-live="polite" className="data mt-4 text-ink-faint">
          Showing {visible.length} of {projects.length} projects
        </p>

        {visible.length > 0 ? (
          <div className="mt-12 space-y-14 md:space-y-20">
            {visible.map((project, index) => (
              <Reveal key={project.title}>
                <ProjectRecord project={project} index={index} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-12 border-t border-hairline pt-10">
            <h2 className="text-heading font-semibold text-ink">Nothing filed under {filter}</h2>
            <p className="measure mt-3 text-lead text-ink-dim">
              There is no work in this discipline yet. The other disciplines have projects to
              read.
            </p>
            <Button className="mt-6" variant="outline" onClick={() => setFilter("All")}>
              Show all projects
            </Button>
          </div>
        )}
      </PageSection>

      <PageSection className="border-t border-hairline">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-title font-bold text-ink">Want the details?</h2>
            <p className="measure mt-4 text-lead text-ink-dim">
              Happy to walk through any of these: the decisions, what broke, and what I would
              build differently now.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/contact">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </PageSection>
    </>
  )
}
