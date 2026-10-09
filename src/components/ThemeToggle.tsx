import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

/**
 * Switches between the graphite and drafting-paper themes.
 *
 * The icon is only rendered once the resolved theme is known, so the button
 * never shows a state that contradicts the page. Its width is reserved up
 * front to keep the surrounding row from shifting.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-sm border border-hairline text-ink-dim",
        "transition-colors duration-base ease-out",
        "hover:border-hairline-strong hover:text-primary",
        className
      )}
    >
      {ready ? (
        isDark ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )
      ) : null}
    </button>
  )
}
