import { ExternalLink, Github } from "lucide-react"
import StackChips from "./StackChips"
import TiltPlate from "./TiltPlate"
import type { Project } from "@/data/portfolio-data"
import { cn } from "@/lib/utils"

interface ProjectRecordProps {
  project: Project
  /** Even records put the plate on the left, odd on the right. */
  index: number
  /** Eager-load the first plate; it is usually above the fold. */
  priority?: boolean
}

/**
 * One project, presented as a survey record rather than a card: an image plate
 * paired with its metadata.
 *
 * The featured record runs wider and sets its title a step larger, so the page
 * has a clear lead item instead of a grid of interchangeable tiles. The plate
 * carries depth, tipping under the pointer with its discipline label floating
 * on a nearer plane.
 */
export default function ProjectRecord({ project, index, priority }: ProjectRecordProps) {
  const { title, description, discipline, tags, demoUrl, githubUrl, image, featured } = project
  const plateFirst = index % 2 === 0

  const plate = (
    <TiltPlate
      max={featured ? 4 : 5}
      overlay={
        <span className="data absolute left-3 top-3 rounded-sm border border-hairline bg-background/85 px-2 py-1 text-ink-dim shadow-lg backdrop-blur-sm">
          {discipline}
        </span>
      }
    >
      <div className="grid aspect-[16/10] place-items-center overflow-hidden rounded-sm border border-hairline bg-surface-sunk p-3 shadow-xl shadow-black/25 transition-shadow duration-slow ease-out group-hover:shadow-2xl group-hover:shadow-black/40 group-focus-within:shadow-2xl">
        {image ? (
          <img
            src={image}
            alt={"Screenshot of " + title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes={featured ? "(max-width: 768px) 100vw, 62vw" : "(max-width: 768px) 100vw, 46vw"}
            className="max-h-full max-w-full rounded-[2px] object-contain transition-transform duration-slow ease-out group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
          />
        ) : (
          <span className="data text-ink-faint">No preview available</span>
        )}
      </div>
    </TiltPlate>
  )

  const links = (demoUrl || githubUrl) && (
    <div className="-my-2 flex flex-wrap items-center gap-x-6">
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-base ease-out hover:decoration-primary"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Visit live site
          <span className="sr-only">, opens in a new tab</span>
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-dim underline decoration-hairline-strong underline-offset-4 transition-colors duration-base ease-out hover:text-ink hover:decoration-ink"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          Read the source
          <span className="sr-only">, opens in a new tab</span>
        </a>
      )}
    </div>
  )

  const meta = (
    <div className="flex flex-col gap-5">
      <h3 className={cn("font-semibold text-ink", featured ? "text-title" : "text-heading")}>
        {title}
      </h3>
      <p className="measure text-lead text-ink-dim">{description}</p>
      <StackChips items={tags} label={"Technologies used in " + title} />
      {links}
    </div>
  )

  return (
    <article className="group grid items-center gap-8 border-t border-hairline pt-8 md:grid-cols-12 md:gap-10 lg:gap-14">
      <div
        className={cn(
          featured ? "md:col-span-8" : "md:col-span-6",
          plateFirst ? "md:order-1" : "md:order-2"
        )}
      >
        {plate}
      </div>
      <div
        className={cn(
          featured ? "md:col-span-4" : "md:col-span-6",
          plateFirst ? "md:order-2" : "md:order-1"
        )}
      >
        {meta}
      </div>
    </article>
  )
}
