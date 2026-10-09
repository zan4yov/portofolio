# Design System Master File — Razan Portfolio

> **LOGIC:** When building a specific page, first check `design-system/razan-portfolio/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file. If not, follow the rules below.

**Stack:** Vite + React 18 + TypeScript + Tailwind CSS 3 + shadcn/ui + React Router 6
**Style family:** Minimalism & Swiss Style — grid-based, high contrast, geometric sans, generous rule work
**Design dials:** Variance 4/10 (balanced) · Motion 3/10 (subtle) · Density 5/10 (standard)

## Creative direction: "Survey"

The palette and structural vocabulary come from the subject matter — mining-area mapping,
ESG tracking and economic dashboards. Graphite rock, bone paper, hi-vis survey ochre and
copper-ore green. Structural devices are cartographic: a datum rail, contour relief, a
graticule, mounted photographic plates.

### Deliberate divergences from the generic recommendation

| Generic recommendation | What ships | Why |
|---|---|---|
| Monochrome + blue accent `#2563EB` on `#FAFAFA` | Graphite + survey brass, dark-default with a full light theme | A default blue is subject-neutral; the brass/ore palette is derived from the work itself and is what makes the site not read as a template |
| Archivo + Space Grotesk | Archivo (one family) + JetBrains Mono | Two sans faces this close in voice read as an accident. Archivo's `wdth` axis already gives display vs. body contrast; the mono is reserved for genuine technical data |
| `border-radius` 8–16px | `--radius: 0.25rem` | Swiss/technical drawing idiom; large radii soften the survey-sheet reading |
| Sticky hero CTA | Bottom CTA per page only | Navigation is persistent (rail on desktop, dock on mobile) so Contact is always one target away; a sticky CTA on a personal portfolio reads as a sales page |
| GSAP scroll reveal | IntersectionObserver + CSS transitions | Same motion tier (subtle, ~12px, ~350ms). A 70 kB animation dependency is not justified for it |

---

## Global Rules

### Colour tokens

Declared in `src/index.css` as HSL triplets so Tailwind and shadcn can compose alpha
(`bg-primary/10`). `:root` is light; `.dark` is the default, applied pre-paint by the
bootstrap script in `index.html`.

| Role | Token | Dark (default) | Light |
|---|---|---|---|
| Page | `--background` | `#14181A` | `#E9E8E2` |
| Raised surface | `--surface-raised` | `#1B2123` | `#F2F1EC` |
| Sunk surface | `--surface-sunk` | `#0F1314` | `#DEDDD5` |
| Body text | `--foreground` | `#E7E4DC` | `#1A1E1F` |
| Secondary text | `--ink-dim` | `#9AA3A2` | `#555C5C` |
| Tertiary text | `--ink-faint` | `hsl(173 5% 50%)` | `hsl(171 3% 40%)` |
| Hairline | `--border` | `#2C3537` | `#C9C8BE` |
| Strong hairline | `--hairline-strong` | `#3D4749` | `#A8A79C` |
| Primary / CTA | `--primary` | `#D9A44A` brass | `hsl(38 82% 29%)` |
| Secondary accent | `--secondary` | `#5CA68A` malachite | `hsl(155 39% 30%)` |
| Rare emphasis | `--accent` / `--destructive` | `#C05A3C` hematite | `hsl(14 64% 37%)` |

**Measured contrast (both themes, against the painted background):** headings 13.9 / 13.7,
body 6.9 / 5.5, links and CTA label 8.0, tertiary 4.7 / 4.6. All ≥ WCAG AA.

`--ink-faint` is the floor: it carries real content (counts, handles, location) at 12px,
so it must stay ≥ 4.5:1. Do not darken it for aesthetics.

### Typography

**Archivo** variable (`wdth 62–125`, `wght 100–900`) + **JetBrains Mono** (`400–600`).

- Headings set expanded and tight: `font-variation-settings: "wdth" 116`, `letter-spacing: -0.025em`, `text-wrap: balance`.
- Body at `wdth 100`. Measure capped at `62ch` via `.measure`.
- Mono is `.data` only — coordinates, counts, stack strings, record metadata. Never body copy, never an all-caps label.
- Everything is left-aligned. No centred section headers.

Fluid scale (`tailwind.config.ts` → `fontSize`):

| Token | Size | Use |
|---|---|---|
| `text-display` | `clamp(2.75rem, 7vw, 5.25rem)` / lh .94 | Hero name only |
| `text-title` | `clamp(2rem, 4vw, 3rem)` / lh 1.04 | Page `h1`, featured project, CTA band |
| `text-heading` | `clamp(1.375rem, 2.2vw, 1.875rem)` | Section `h2`, project `h3` |
| `text-lead` | `1.0625rem` / lh 1.65 | Body prose |
| `text-meta` | `0.75rem` | Paired with `.data` |

> **Gotcha:** `cn()` extends tailwind-merge with these names (`src/lib/utils.tsx`). Without
> that, tailwind-merge reads `text-display` as a *colour* and a later `text-ink` deletes it.
> Any new custom font-size must be added to that `classGroups` list.

### Spacing, layout and shape

- `--radius: 0.25rem`. Tailwind `rounded-lg/md/sm` all derive from it. Nothing is pill-shaped except status dots.
- Container: centred, padding `1.25rem / md 2rem / xl 3rem`, max `1200px` at `2xl`. With the 224px rail this leaves a comfortable column — do not widen it.
- Vertical rhythm is owned by `<PageSection>` (`py-16 md:py-24`). Pages must not set their own section padding; that is what caused the old drift between `py-12` and `py-20`.
- Section boundaries are hairlines (`border-t border-hairline`), never cards-on-background.
- Elevation is used only on photographic plates (`shadow-xl`, lifting to `shadow-2xl` on hover). Text blocks never get a shadow.

### Motion

One timing language, declared as tokens and exposed as Tailwind durations:

| Token | Value | Use |
|---|---|---|
| `--dur-fast` / `duration-fast` | 120ms | Pointer-tracked transforms |
| `--dur-base` / `duration-base` | 220ms | Hover, focus, colour, nav indicator |
| `--dur-slow` / `duration-slow` | 520ms | Scroll reveals, image scale |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default (overrides Tailwind's) |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetric loops |

Rules:
- **Never write `duration-[...]` with an arbitrary value.** Tailwind cannot disambiguate it between transition- and animation-duration and silently drops the class. Use the named tokens.
- Animate `transform` and `opacity` only.
- There is **no `requestAnimationFrame` loop on the site.** Pointer tracking writes CSS custom properties inside one rAF and the compositor does the rest. Keep it that way.
- One orchestrated entrance (the hero). Elsewhere, reveals are single small fades — no stagger cascades.
- Every motion path has a `prefers-reduced-motion` exit: CSS kills durations globally, `[data-reveal]` renders final state, and `usePointerTilt` returns before attaching listeners.

---

## Component Specs

Components are Tailwind + shadcn, not hand-written CSS classes. Compose with `cn()`.

| Component | Responsibility |
|---|---|
| `PageSection` | Owns vertical rhythm and the container. Every band uses it. |
| `SectionHead` | `h2` + a rule that runs to an optional end action. The rule is the structural device — no eyebrow label above the heading. |
| `PageHeader` | `h1` + lead for secondary routes. |
| `Reveal` | IntersectionObserver → `data-reveal` attribute. Transition lives in CSS; nothing re-renders. |
| `ContourField` | Seeded noise + marching squares (`lib/contours.ts`), 9 elevations on separate `preserve-3d` planes. Geometry is computed once in `useMemo`. |
| `TiltPlate` | Perspective wrapper. Overlay layers need inverse scale (`p/(p−z)`) or they sit visibly out of register. |
| `ProjectRecord` | Featured = 8/4 split + `text-title`. Others = 6/6 alternating + `text-heading`. |
| `DatumRail` / `MobileNav` | Rail ≥1024px; brand bar + bottom dock below. |
| `Button` (shadcn) | `outline`/`ghost` were retuned off `accent` — hematite is far too loud for a secondary action. |

**Project plates:** source screenshots range 1.60–2.83 in ratio. One fixed `aspect-[16/10]`
plate with `object-contain` on `bg-surface-sunk` and `p-3` matting. **Never `object-cover`** —
it crops most of the set.

---

## Quality floor

- Touch targets ≥ 44×44 anywhere reachable below `lg`. The rail is desktop-only and may use 36px.
- Icon-only controls carry `aria-label`; decorative icons carry `aria-hidden="true"`; external links append a visually-hidden ", opens in a new tab".
- No emoji as icons. Lucide only, one family.
- Filter options are derived from the data, so a zero-result slice is never offered; an empty state with a way out exists regardless.
- Skip-to-content link; one visible `:focus-visible` ring sitewide.
- Verified at 320, 390, 768, 1024, 1366 and 1536px — `scrollWidth === clientWidth` at every one.

## Pre-delivery checklist

- [ ] `npm run typecheck`, `npm run lint`, `npm run build` pass (lint has 3 known pre-existing shadcn/config errors)
- [ ] Contrast re-measured if any `--ink-*` or `--primary` token moved
- [ ] No new `duration-[...]` arbitrary values
- [ ] No new `requestAnimationFrame` loop
- [ ] New custom font sizes added to the tailwind-merge `classGroups` in `src/lib/utils.tsx`
- [ ] `prefers-reduced-motion` path checked for any new motion
- [ ] Both themes checked, not just dark
