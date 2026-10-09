import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Without this, it reads a
 * custom size like `text-display` as a text *colour* and lets a later
 * `text-ink` delete it, which silently drops the headline down to body size.
 * Teaching it the project's own font-size names keeps `cn()` safe to use on
 * any class string in the design system.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "title", "heading", "subheading", "lead", "meta"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
