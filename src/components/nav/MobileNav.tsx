import { NavLink } from "react-router-dom"
import BrandMark from "@/components/BrandMark"
import ThemeToggle from "@/components/ThemeToggle"
import { NAV_ITEMS } from "./nav-items"
import { personalInfo } from "@/data/portfolio-data"

/**
 * Below `lg` the rail splits in two: branding stays at the top where it is
 * read, and the routes move to a docked bar where they can be reached by
 * thumb. Every target is at least 44px tall and the dock clears the home
 * indicator on iOS.
 */
export default function MobileNav() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/95 backdrop-blur-sm lg:hidden">
        <div className="flex h-14 items-center justify-between px-5">
          <NavLink to="/" className="-mx-2 flex h-11 items-center gap-2.5 px-2 text-ink">
            <BrandMark className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">{personalInfo.handle}</span>
          </NavLink>
          <ThemeToggle />
        </div>
      </header>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-background/95 backdrop-blur-sm lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  [
                    "relative flex h-14 flex-col items-center justify-center gap-1 transition-colors duration-base ease-out",
                    isActive ? "text-primary" : "text-ink-dim",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden="true"
                      className={[
                        "absolute inset-x-5 top-0 h-0.5 rounded-full bg-primary transition-opacity duration-base ease-out",
                        isActive ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                    <item.icon className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
                    <span className="text-[0.6875rem] font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
