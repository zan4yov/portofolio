import { NavLink, useLocation } from "react-router-dom"
import { Github, Instagram, Linkedin } from "lucide-react"
import BrandMark from "@/components/BrandMark"
import ThemeToggle from "@/components/ThemeToggle"
import { NAV_ITEMS } from "./nav-items"
import { useScrollProgress } from "./useScrollProgress"
import { personalInfo, socialLinks } from "@/data/portfolio-data"

/** Row height in rem; the sliding indicator is positioned off this. */
const ROW = 2.5

const SOCIALS = [
  { href: socialLinks.github, label: "GitHub", icon: Github },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: socialLinks.instagram, label: "Instagram", icon: Instagram },
]

/**
 * The left margin of a survey sheet: brand, route ticks, and a datum line that
 * fills as the reader descends the page.
 *
 * Desktop only — below `lg` the same routes are served by MobileNav, which is
 * reachable by thumb.
 */
export default function DatumRail() {
  const { pathname } = useLocation()
  const progressRef = useScrollProgress<HTMLDivElement>()

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.path === pathname)
  )
  const onKnownRoute = NAV_ITEMS.some((item) => item.path === pathname)

  return (
    <div
      ref={progressRef}
      className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col justify-between border-r border-hairline bg-background/90 px-6 py-7 backdrop-blur-sm lg:flex"
    >
      {/* Datum line: sits on the rail's own border and fills with progress. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-px inset-y-0 w-px origin-top bg-primary/70"
        style={{ transform: "scaleY(var(--scroll-progress, 0))" }}
      />

      <div>
        <NavLink
          to="/"
          className="group flex items-center gap-2.5 text-ink transition-colors duration-base ease-out hover:text-primary"
        >
          <BrandMark className="h-6 w-6 text-primary" />
          <span className="text-subheading font-semibold">{personalInfo.handle}</span>
        </NavLink>

        <nav aria-label="Primary" className="mt-9">
          <ul className="relative" style={{ ["--row" as string]: `${ROW}rem` }}>
            {/* One indicator for the whole list, translated to the active row. */}
            {onKnownRoute && (
              <li
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 flex h-[var(--row)] w-full items-center transition-transform duration-base ease-out"
                style={{ transform: `translateY(calc(${activeIndex} * var(--row)))` }}
              >
                <span className="h-4 w-0.5 rounded-full bg-primary" />
              </li>
            )}

            {NAV_ITEMS.map((item) => (
              <li key={item.path} className="flex h-[var(--row)] items-center">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "group flex h-full w-full items-center gap-3 pl-4 text-sm transition-colors duration-base ease-out",
                      isActive ? "text-ink" : "text-ink-dim hover:text-ink",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* The tick grows on the active route and on hover. */}
                      <span
                        aria-hidden="true"
                        className={[
                          "h-px bg-current transition-all duration-base ease-out",
                          isActive ? "w-5 opacity-100" : "w-2.5 opacity-50 group-hover:w-4",
                        ].join(" ")}
                      />
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="space-y-5">
        <ul className="flex items-center gap-1">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} profile, opens in a new tab`}
                className="grid h-9 w-9 place-items-center rounded-sm text-ink-dim transition-colors duration-base ease-out hover:text-primary"
              >
                <social.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
          <ThemeToggle className="ml-auto h-9 w-9" />
        </ul>

        <p className="data text-ink-faint">{personalInfo.location}</p>
      </div>
    </div>
  )
}
