import { ReactNode } from "react"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import DatumRail from "./nav/DatumRail"
import MobileNav from "./nav/MobileNav"
import { personalInfo, socialLinks } from "@/data/portfolio-data"

interface LayoutProps {
  children: ReactNode
}

const FOOTER_SOCIALS = [
  { href: socialLinks.github, label: "GitHub", icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: socialLinks.twitter, label: "Twitter", icon: Twitter },
  { href: socialLinks.instagram, label: "Instagram", icon: Instagram },
]

/**
 * Site shell.
 *
 * The page sits on a faint survey graticule, drawn in CSS, so there is no
 * background paint loop anywhere on the site.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div
        aria-hidden="true"
        className="graticule pointer-events-none fixed inset-0 -z-10 opacity-40"
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <DatumRail />
      <MobileNav />

      <div className="lg:pl-56">
        <main id="main" className="pb-16">
          {children}
        </main>

        <footer className="border-t border-hairline">
          <div className="container flex flex-col gap-6 py-10 pb-28 sm:flex-row sm:items-end sm:justify-between lg:pb-10">
            <div>
              <p className="text-subheading font-semibold text-ink">{personalInfo.name}</p>
              <p className="mt-1 text-sm text-ink-dim">
                {personalInfo.role}, {personalInfo.location}
              </p>
              <a
                href={"mailto:" + personalInfo.email}
                className="mt-1 inline-flex min-h-11 items-center text-sm text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-base ease-out hover:decoration-primary"
              >
                {personalInfo.email}
              </a>
            </div>

            <div className="flex flex-col gap-4 sm:items-end">
              <ul className="flex items-center gap-1">
                {FOOTER_SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label + " profile, opens in a new tab"}
                      className="grid h-11 w-11 place-items-center rounded-sm text-ink-dim transition-colors duration-base ease-out hover:text-primary"
                    >
                      <social.icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="data text-ink-faint">
                Built with React, TypeScript and Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
