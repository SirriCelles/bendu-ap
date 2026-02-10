# BookEasy Token Specification

This file is the source of truth for design tokens.

Rule: **Use these tokens only. No random hex colors in component code.**

## Color Tokens (CSS Variables)

Use these variables in `:root` and map them to Tailwind utilities.

- `--background` (warm ivory)
- `--foreground` (near-black body text)
- `--card` (slightly deeper ivory than background)
- `--card-foreground`
- `--muted` (soft warm gray)
- `--muted-foreground`
- `--border` (warm gray border)
- `--input`
- `--ring`
- `--primary` (deep navy)
- `--primary-foreground`
- `--secondary` (cool gray panel)
- `--secondary-foreground`
- `--accent` (gold emphasis)
- `--accent-foreground`
- `--destructive`
- `--destructive-foreground`
- `--info` (soft blue callout)
- `--info-foreground`

## Typography Tokens

- Primary app typography: `Instrument Sans`
- Fallback stack: `"Avenir Next", Avenir, "Segoe UI", "Helvetica Neue", sans-serif`
- Rule: all app text (headings and body) should use the same primary typography with fallback only.

Type scale:

- `xs`
- `sm`
- `base`
- `lg`
- `xl`
- `2xl`
- `3xl`
- `4xl`

Guidance:

- Headings: tighter line-height and slightly tighter tracking.
- Body: relaxed line-height for readability.

## Radius Tokens

- Base: `--radius: 0.75rem` (12px)
- Derived radius scale:
- `rounded-sm`
- `rounded-md`
- `rounded-lg`
- `rounded-xl`

## Spacing Scale

Approved spacing increments:

- `4`
- `8`
- `12`
- `16`
- `24`
- `32`
- `40`
- `48`
- `64`

Layout rules:

- Section: `py-12 md:py-16`
- Container: `px-4 md:px-8`
- Card: `p-4 md:p-6`
- Grid: `gap-6 md:gap-8`

Container width:

- Base content container should use a consistent max-width (e.g. `max-w-7xl`) with centered layout.

## Elevation Tokens

Use shadow levels consistently:

- `shadow-sm`: default cards/surfaces
- `shadow-md`: booking/checkout panel emphasis
- `shadow-lg`: modals/dialogs only

## Enforcement

- Components must consume Tailwind token utilities instead of raw colors.
- New components should be built from shadcn primitives before custom styling.
- Token changes must be updated here first, then implemented in CSS/Tailwind mapping.
