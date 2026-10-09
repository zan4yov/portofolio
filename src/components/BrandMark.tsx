interface BrandMarkProps {
  className?: string
}

/**
 * Three nested contour lines over a datum — a surveyed rise. The same figure
 * the hero draws at full scale, reduced to a mark.
 */
export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1.5 17.5C5 8.5 19 8.5 22.5 17.5" opacity="0.45" />
      <path d="M5.5 17.5C8 12 16 12 18.5 17.5" opacity="0.75" />
      <path d="M9.5 17.5C10.75 15 13.25 15 14.5 17.5" />
      <path d="M1.5 21h21" strokeWidth="1.2" opacity="0.35" />
    </svg>
  )
}
