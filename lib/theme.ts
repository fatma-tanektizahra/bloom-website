/**
 * Bloom — design tokens
 *
 * A small salon/wellness studio booking site. The brand should read as
 * warm, unhurried, and a little considered — like the space itself, not
 * like software. Reference this file when adding new UI so choices stay
 * consistent; don't introduce new colors or type sizes ad hoc.
 *
 * COLOR
 * paper   #FBF6F2  — page background, warm off-white (never pure white)
 * ink     #2E2A28  — body text and headings (never pure black)
 * rose    #B97A8F  — the one accent: links, primary buttons, active states.
 *                    Used sparingly — it should stay noticeable because it's rare.
 * clay    #E4D9D0  — hairline dividers, borders, muted backgrounds
 * moss    #7C8B6F  — functional only: confirmations, success states.
 *                    Never used as a decorative accent.
 *
 * TYPE
 * display — Bodoni Moda (serif). Headlines and the wordmark only — its
 *           high-contrast strokes are what give the brand its editorial,
 *           fashion-adjacent feel. Keep it out of UI chrome and small text;
 *           it only reads well at large sizes.
 * body    — Inter (sans). Everything else: paragraphs, labels, buttons, nav.
 *
 * Scale (rem): 3.5 / 2.25 / 1.5 / 1.125 / 1 / 0.875
 * Line length: keep body copy under ~70 characters per line.
 *
 * LAYOUT
 * Left-aligned, editorial, generous whitespace — not centered hero blocks
 * or symmetric card grids. The services list reads like a real salon menu:
 * a plain list with hairline dividers and right-aligned prices, not cards
 * with shadows. Border-radius stays small and is used on interactive
 * elements only (buttons, inputs) — not decoratively on every box.
 *
 * MOTION
 * One deliberate moment: the hero headline and subhead fade/slide up on
 * load, staggered slightly. Everything else is a plain, quick hover or
 * focus transition — no scroll-triggered reveals on every section.
 */

export const colors = {
  paper: "#FBF6F2",
  ink: "#2E2A28",
  rose: "#B97A8F",
  clay: "#E4D9D0",
  moss: "#7C8B6F",
} as const;
