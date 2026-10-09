import { useState } from "react"

interface TechBadgeProps {
  name: string
  logo: string
}

/**
 * One technology.
 *
 * Logos come from third-party CDNs, so a failure is expected rather than
 * exceptional: the badge falls back to the technology's initial instead of
 * collapsing and leaving a gap in the row.
 */
export default function TechBadge({ name, logo }: TechBadgeProps) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <li className="flex items-center gap-2.5 rounded-sm border border-hairline bg-surface-raised px-3 py-2 transition-colors duration-base ease-out hover:border-hairline-strong">
      {logoFailed ? (
        <span
          aria-hidden="true"
          className="grid h-5 w-5 place-items-center rounded-sm bg-muted text-[0.625rem] font-semibold text-ink-dim"
        >
          {name.charAt(0)}
        </span>
      ) : (
        <img
          src={logo}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          className="h-5 w-5 shrink-0 object-contain"
          onError={() => setLogoFailed(true)}
        />
      )}
      <span className="text-sm font-medium text-ink">{name}</span>
    </li>
  )
}
