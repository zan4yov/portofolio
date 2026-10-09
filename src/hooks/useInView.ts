import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  /** Fraction of the element that must be visible before it counts as in view. */
  threshold?: number
  /** Shrinks the viewport so reveals fire slightly before the edge. */
  rootMargin?: string
  /** Stop observing after the first intersection. Default: true. */
  once?: boolean
}

/**
 * Reports whether a node has entered the viewport.
 *
 * The observer is the only JavaScript involved in a scroll reveal — the
 * transition itself lives in CSS, so scrolling never triggers a React render
 * for anything already revealed.
 */
export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Without IntersectionObserver, show the content rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
