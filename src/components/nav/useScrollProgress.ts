import { useEffect, useRef } from "react"

/**
 * Writes how far down the document the reader is, as a 0–1 number, into a
 * custom property on the returned element.
 *
 * The value drives a `scaleY` on the rail's datum line. Keeping it in CSS
 * means scrolling never triggers a render, and the listener is passive so it
 * cannot delay the scroll itself.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    let frame = 0

    const write = () => {
      frame = 0
      const node = ref.current
      if (!node) return

      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      node.style.setProperty("--scroll-progress", Math.min(1, Math.max(0, progress)).toFixed(4))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write)
    }

    write()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
