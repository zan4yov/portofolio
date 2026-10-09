import { Link } from "react-router-dom"
import { ArrowRight, Github } from "lucide-react"
import ContourField from "@/components/ContourField"
import PageSection from "@/components/PageSection"
import PortraitPlate from "@/components/PortraitPlate"
import ProjectRecord from "@/components/ProjectRecord"
import Reveal from "@/components/Reveal"
import SectionHead from "@/components/SectionHead"
import { Button } from "@/components/ui/button"
import { facts, personalInfo, projects, socialLinks } from "@/data/portfolio-data"

const SELECTED = projects.slice(0, 3)

export default function Home() {
  return (
    <>
      {/*
        Hero. The contour field is the one bold element on the page, so the
        type beside it stays plain and left-aligned, and the entrance runs as a
        single sequence: terrain first, then status, headline and actions.
      */}
      <section className="relative isolate overflow-hidden border-b border-hairline">
        <ContourField className="hero-mask pointer-events-none absolute inset-0 -z-10 h-full w-full" />

        <div className="container flex min-h-[32rem] flex-col justify-center py-20 md:min-h-[38rem] md:py-28">
          <Reveal className="flex items-center gap-2.5 text-sm text-ink-dim" delay={120}>
            <span aria-hidden="true" className="relative grid h-2.5 w-2.5 place-items-center">
              <span className="absolute inset-0 animate-pulse-soft rounded-full bg-secondary/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            </span>
            {personalInfo.availability}
          </Reveal>

          <Reveal as="h1" className="mt-6 text-display font-extrabold text-ink" delay={200} shift={14}>
            Razan Widya
            <br />
            Reswara
          </Reveal>

          <Reveal className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1" delay={300}>
            <span className="text-heading font-semibold text-primary">{personalInfo.role}</span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-hairline-strong sm:block" />
            <span className="text-heading font-medium text-ink-dim">{personalInfo.title}</span>
          </Reveal>

          <Reveal className="measure mt-7 text-lead text-ink-dim" delay={380}>
            {personalInfo.summary}
          </Reveal>

          <Reveal className="mt-9 flex flex-wrap items-center gap-3" delay={460}>
            <Button asChild size="lg">
              <Link to="/projects">
                View projects
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                GitHub profile
                <span className="sr-only">, opens in a new tab</span>
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      <PageSection>
        <SectionHead
          title="About"
          action={
            <Link
              to="/about"
              className="shrink-0 text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-base ease-out hover:decoration-primary"
            >
              Full background
            </Link>
          }
        />

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5 lg:col-span-4 lg:max-w-sm">
            <PortraitPlate />
          </Reveal>

          <Reveal className="md:col-span-7 md:self-center lg:col-span-7 lg:col-start-6" delay={80}>
            <p className="measure text-lead text-ink-dim">{personalInfo.bio}</p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-hairline pt-7">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="sr-only">{fact.label}</dt>
                  <dd>
                    <span className="block text-heading font-bold text-primary">{fact.value}</span>
                    <span className="mt-1 block text-sm text-ink-dim">{fact.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </PageSection>

      <PageSection className="border-t border-hairline">
        <SectionHead
          title="Selected work"
          lead="Three projects that between them cover what I build: product interfaces, analytics dashboards and geospatial analysis."
          action={
            <Link
              to="/projects"
              className="shrink-0 text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-base ease-out hover:decoration-primary"
            >
              All {projects.length} projects
            </Link>
          }
        />

        <div className="mt-12 space-y-14 md:space-y-20">
          {SELECTED.map((project, index) => (
            <Reveal key={project.title}>
              <ProjectRecord project={project} index={index} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageSection className="border-t border-hairline">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-title font-bold text-ink">Looking for an intern?</h2>
            <p className="measure mt-4 text-lead text-ink-dim">
              I am open to software engineering internships and junior roles. Tell me what you are
              building and I will tell you honestly whether I can help.
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
