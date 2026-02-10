# BookEasy Design System Usage Rules

Purpose: keep UI implementation consistent and prevent style drift as more pages are added.

## Core Rules (Non-Negotiable)

1. Use design tokens only.
2. Prefer shadcn/ui primitives over custom base components.
3. Use the approved spacing scale only.
4. Reuse approved image + card composition patterns.
5. Build mobile-first and ensure every page is responsive at phone, tablet, and desktop sizes.

If a screen cannot be built with these rules, propose a token or primitive update first. Do not ship one-off styles.

## Do / Don't

### 1) Tokens Only

Do:

- Use semantic token utilities such as `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-ring`, `bg-primary`, `text-primary-foreground`.
- Keep colors and radii sourced from `app/globals.css` tokens.

Don't:

- Do not use raw hex/rgb/hsl color values in component markup.
- Do not use ad-hoc radius values like `rounded-[10px]` when tokenized options exist.

### 2) shadcn-First Components

Do:

- Start from shadcn primitives in `components/ui/*` (`Button`, `Input`, `Card`, `Badge`, `Dialog`, `Select`, `Textarea`, `Label`).
- Extend via `variant` props and shared utilities (`cn`) before creating new base components.

Don't:

- Do not re-implement existing primitive behavior with custom wrappers unless there is a documented gap.
- Do not bypass shared primitives for one-off local versions.

### 3) Spacing Scale Only

Do:

- Use approved spacing rhythm:
  - Section: `py-12 md:py-16`
  - Container: `px-4 md:px-8`
  - Grid: `gap-6 md:gap-8`
  - Card inner padding: `p-4 md:p-6`
- Maintain readable vertical rhythm with consistent section and card spacing.

Don't:

- Do not use arbitrary spacing values (`mt-[22px]`, `p-[18px]`) unless first approved and added as a reusable rule.
- Do not mix tight and airy spacing patterns within the same page region.

### 4) Image + Card Composition Patterns

Use these reusable patterns for listing/detail surfaces.

Pattern A: Media Card (listing item)

- Root: `Card` with `overflow-hidden rounded-xl border border-border bg-card shadow-sm`.
- Media: fixed ratio block (`aspect-[4/3]`) with `object-cover`.
- Content: `CardHeader` + `CardContent`, tokenized text hierarchy.
- Actions: `CardFooter` with primary/secondary actions using `Button` variants.

Pattern B: Feature Panel (highlighted offer)

- Root: `Card` with muted/info surface and `shadow-md`.
- Layout: media on top for mobile, split layout on desktop.
- Accent: use `Badge` for state and `text-accent` only for small emphasis items.

Pattern C: Detail Hero Card

- Root container with `rounded-xl`, tokenized surface, and one consistent shadow level.
- Primary image block + metadata stack + CTA group.
- Keep action area and pricing/status area visually separated using tokenized borders or muted surfaces.

## Typography and Surface Guidance

- Primary typography for the full app is `Instrument Sans` with fallback stack only.
- Heading and body styles both inherit the same `Instrument Sans`-first stack from `app/globals.css`.
- Light theme is the default baseline; dark mode is optional and must follow the same semantic token rules.

## PR Review Checklist (Quick Pass)

- No raw hex/rgb/hsl colors in JSX/TSX class strings.
- Uses existing shadcn primitives for base controls/surfaces.
- Spacing follows approved scale (`py-12/16`, `px-4/8`, `gap-6/8`, `p-4/6`).
- Image + card composition matches one approved pattern.
- New variants/tokens are documented before use.
