import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import PageSection from "@/components/PageSection"
import PortraitPlate from "@/components/PortraitPlate"
import Reveal from "@/components/Reveal"
import SectionHead from "@/components/SectionHead"
import TechMatrix from "@/components/TechMatrix"
import { Button } from "@/components/ui/button"
import { experience, personality, personalInfo } from "@/data/portfolio-data"

const DETAILS = [
  { label: "Based in", value: personalInfo.location },
  { label: "Studying", value: personalInfo.title },
  { label: "Status", value: personalInfo.availability },
]

export default function About() {
  return (
    <>
      <div className="container">
        <PageHeader
          title="About"
          lead="How I think, where I have worked, and what I build with."
        />
      </div>

      <PageSection>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5 lg:col-span-4 lg:max-w-sm">
            <PortraitPlate />
          </Reveal>

          <Reveal className="md:col-span-7 md:self-center lg:col-span-7 lg:col-start-6" delay={80}>
            <p className="measure text-lead text-ink-dim">{personalInfo.bio}</p>

            <dl className="mt-10 divide-y divide-hairline border-t border-hairline">
              {DETAILS.map((detail) => (
                <div key={detail.label} className="flex flex-wrap gap-x-6 gap-y-1 py-4">
                  <dt className="w-24 shrink-0 text-sm text-ink-faint">{detail.label}</dt>
                  <dd className="text-sm font-medium text-ink">{detail.value}</dd>
                </div>
              ))}
              <div className="flex flex-wrap gap-x-6 gap-y-1 py-4">
                <dt className="w-24 shrink-0 text-sm text-ink-faint">Email</dt>
                <dd>
                  <a
                    href={"mailto:" + personalInfo.email}
                    className="text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-base ease-out hover:decoration-primary"
                  >
                    {personalInfo.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </PageSection>

      <PageSection className="border-t border-hairline">
        <SectionHead title="Experience" />

        <Reveal className="mt-10">
          <ol className="space-y-8">
            {experience.map((role) => (
              <li
                key={role.title + role.company}
                className="relative border-l border-hairline-strong pl-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[3px] top-2 h-1.5 w-1.5 rounded-full bg-primary"
                />
                <p className="data text-primary">{role.year}</p>
                <h3 className="mt-2 text-heading font-semibold text-ink">{role.title}</h3>
                <p className="mt-1 text-lead text-ink-dim">{role.company}</p>
                {role.description && (
                  <p className="measure mt-3 text-lead text-ink-dim">{role.description}</p>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </PageSection>

      <PageSection className="border-t border-hairline">
        <SectionHead
          title="How I work"
          lead="The habits colleagues would recognise in me."
        />

        <Reveal className="mt-8">
          <ul className="grid gap-x-10 border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
            {personality.map((trait) => (
              <li
                key={trait}
                className="border-b border-hairline py-4 text-lead font-medium text-ink"
              >
                {trait}
              </li>
            ))}
          </ul>
        </Reveal>
      </PageSection>

      <PageSection className="border-t border-hairline">
        <SectionHead title="Stack" lead="What I reach for, grouped by the job it does." />
        <Reveal className="mt-10">
          <TechMatrix />
        </Reveal>
      </PageSection>

      <PageSection className="border-t border-hairline">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-title font-bold text-ink">See the work</h2>
            <p className="measure mt-4 text-lead text-ink-dim">
              Six projects, with source where the code is public.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/projects">
              View projects
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </PageSection>
    </>
  )
}
