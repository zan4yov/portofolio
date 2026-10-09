import TiltPlate from "./TiltPlate"
import { personalInfo } from "@/data/portfolio-data"
import { cn } from "@/lib/utils"

interface PortraitPlateProps {
  className?: string
}

/**
 * The portrait, plated and captioned like a survey photograph: framed, with
 * its subject identified underneath.
 */
export default function PortraitPlate({ className }: PortraitPlateProps) {
  return (
    <figure className={cn("w-full", className)}>
      <TiltPlate max={5}>
        <div className="aspect-[4/5] overflow-hidden rounded-sm border border-hairline bg-surface-sunk shadow-xl shadow-black/20">
          <img
            src={personalInfo.portraitImage}
            alt={"Portrait of " + personalInfo.name}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 80vw, 22rem"
            className="h-full w-full object-cover"
          />
        </div>
      </TiltPlate>

      <figcaption className="mt-4 flex items-start justify-between gap-4 border-t border-hairline pt-4">
        <div>
          <p className="font-semibold text-ink">{personalInfo.name}</p>
          <p className="mt-0.5 text-sm text-ink-dim">{personalInfo.title}</p>
        </div>
        <p className="data shrink-0 text-ink-faint">@{personalInfo.handle}</p>
      </figcaption>
    </figure>
  )
}
