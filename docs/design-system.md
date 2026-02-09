# BookEasy Design System

## Visual Direction

- Brand feel: calm, luxury, hospitality, warm neutral.
- UI personality: minimal and image-forward.
- Contrast strategy: high contrast for text/CTA only, soft contrast for surfaces.
- Corner language: soft-rounded shapes (12px base radius).
- Spacing rhythm: airy layouts with generous section and card breathing room.
- Elevation: subtle shadows; avoid heavy or harsh borders.
- Surface hierarchy: warm ivory base, muted gray panels, navy action emphasis.
- Accent usage: gold only for highlights (ratings, emphasis), not body text.
- Info callouts: soft blue panel for contact/help cards.
- Density rule: no cramped grids or tight form stacks in public pages.

Default mode: **light theme first**. Dark mode is optional and can be added later.

## Typography

- Heading font: `Playfair Display`.
- Body/UI font: `Inter`.
- Heading style: tighter tracking and tighter line-height than body.
- Body style: readable line-height and neutral letter spacing.

## Spacing & Elevation Rules

- Section spacing: `py-12 md:py-16`.
- Container spacing: `px-4 md:px-8`.
- Card spacing: `p-4 md:p-6`.
- Grid spacing: `gap-6 md:gap-8`.
- Shadows: `shadow-sm` for standard cards, `shadow-md` for booking panel, `shadow-lg` for dialog/modal only.

## Component Composition Rules

- Booking panel uses muted secondary surface + `shadow-md`.
- Primary CTA button uses primary background + primary-foreground text.
- Ratings/stars use accent token color.
- Contact/help card uses info surface + info foreground.

## Do / Don't

Do:

- Use token utilities only (`bg-background`, `text-foreground`, `bg-primary`, etc.).
- Prefer shadcn/ui primitives before custom controls.
- Stay on approved spacing and radius scales.
- Reuse the same card/image composition patterns across listing and detail pages.

Don't:

- Do not use raw hex values inside components.
- Do not introduce one-off spacing/radius values.
- Do not add heavy borders/shadows that break the calm luxury aesthetic.
- Do not mix new font families without design-system approval.
