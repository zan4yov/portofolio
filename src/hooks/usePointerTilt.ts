import { useEffect, useRef } from "react"

interface UsePointerTiltOptions {
  /** Maximum rotation on either axis, in degrees. */
  max?: number
  /**
   * Where the pointer is tracked. "self" listens on the returned element;
   * "parent" listens on its parent, for decorative layers that must stay
   * pointer-transparent.
   */
  attach?: "self" | "parent"
}

/**
 * Turns pointer position into two rotation custom properties, `--tilt-x` and
 * `--tilt-y`, written on the returned element.
 *
 * The values are consumed by CSS transforms further down the tree, so a tilt
 * costs one style write per frame and no React render. Coarse pointers and
 * reduced-motion are opted out: a tilt that only exists under a mouse must not
 * be the only way to perceive anything.
 */
export function usePointerTilt<T extends HTMLElement = HTMLDivElement>({
  max = 6,
  attach = "self",
}: UsePointerTiltOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const target = attach === "parent" ? node.parentElement : node
    if (!target) return

    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    let frame = 0
    let pending: { x: number; y: number } | null = null

    const write = () => {
      frame = 0
      if (!pending) return
      node.style.setProperty("--tilt-x", pending.y.toFixed(2) + "deg")
      node.style.setProperty("--tilt-y", pending.x.toFixed(2) + "deg")
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write)
    }

    const onMove = (event: PointerEvent) => {
      const rect = target.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      pending = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2 * max,
        // Pointing up should tip the far edge away, so this axis inverts.
        y: ((event.clientY - rect.top) / rect.height - 0.5) * -2 * max,
      }
      schedule()
    }

    const onLeave = () => {
      pending = { x: 0, y: 0 }
      schedule()
    }

    target.addEventListener("pointermove", onMove)
    target.addEventListener("pointerleave", onLeave)

    return () => {
      target.removeEventListener("pointermove", onMove)
      target.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [max, attach])

  return ref
}
