import { Link, useLocation } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Off the map. Says what happened and offers the way back. */
export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <div className="container flex min-h-[26rem] flex-col justify-center py-20">
      <p className="data text-primary">404</p>
      <h1 className="mt-4 text-title font-bold text-ink">This page is not on the map</h1>
      <p className="measure mt-5 text-lead text-ink-dim">
        Nothing is published at <span className="data text-ink">{pathname}</span>. It may have
        moved, or the link may be mistyped.
      </p>
      <div className="mt-9">
        <Button asChild size="lg" variant="outline">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}
