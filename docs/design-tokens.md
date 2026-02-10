# BookEasy Design Tokens

Source of Truth for UI Styling

Rule: ❗ Use these tokens only. No raw hex colors or ad-hoc styles in component code.

This token system is derived directly from the approved BookEasy UI designs
(Landing Page, Listings, Room Details).

---

## 1. Color Tokens (CSS Variables)

All colors must be defined as CSS variables and consumed via Tailwind utilities
(e.g. bg-background, text-foreground, bg-primary).

### Core Surfaces

- --background → Warm ivory page background
- --foreground → Primary text color
- --card → Card / section surface
- --card-foreground
- --muted → Subtle surface / section separators
- --muted-foreground
- --border → Input + card borders
- --input
- --ring → Focus ring

### Brand & Action

- --primary → Deep navy (primary brand color)
- --primary-foreground
- --secondary → Blue-gray panels (booking panels, soft blocks)
- --secondary-foreground
- --accent → Gold (ratings, highlights)
- --accent-foreground

### Semantic

- --info → Soft blue callout (contact card)
- --info-foreground
- --destructive
- --destructive-foreground

### Overlay

- --overlay-50 → Hero image overlay (rgba black @ 50%)

---

## 2. Color Values (Reference Only – DO NOT USE DIRECTLY)

These values come from the approved UI designs and are mapped internally
to the tokens above.

- Primary Navy: #1A3D63
- Dark Navy: #26374D
- Secondary Blue Gray: #536D82
- Soft Info Blue: #BBD0DD
- Page Background: #DDE6ED
- Border Gray: #D9D9D9
- Gold Accent: #FFCE31
- Gold Soft: #FFDF77
- Black: #000000
- White: #FFFFFF
- Overlay: rgba(0,0,0,0.5)

⚠️ These values must never appear directly in components.

---

## 3. Typography Tokens

### Font Strategy

- Headings: `Playfair Display`
- Body / UI: `Instrument Sans`

Rationale:

- Serif headings reinforce luxury & hospitality
- Clean sans-serif body ensures readability and modern UX

### Font Rules

- Headings (h1–h4) must use heading font
- Body text, labels, inputs use body font
- Never mix fonts arbitrarily

### Type Scale

- xs
- sm
- base
- lg
- xl
- 2xl
- 3xl
- 4xl

Guidance:

- Headings: tighter tracking, tighter line-height
- Body text: relaxed line-height for readability

---

## 4. Radius Tokens

- Base radius: `--radius: 0.75rem` (12px)

Derived usage:

- rounded-sm → subtle UI elements
- rounded-md → inputs
- rounded-lg → cards
- rounded-xl → featured panels / hero cards

Rule:

- No custom radius values allowed outside this scale.

---

## 5. Spacing Scale

Approved spacing increments (Tailwind scale only):

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64

Layout conventions:

- Section padding: `py-12 md:py-16`
- Container padding: `px-4 md:px-8`
- Card padding: `p-4 md:p-6`
- Grid gap: `gap-6 md:gap-8`

---

## 6. Elevation Tokens

Shadows must be used consistently:

- shadow-sm → default cards
- shadow-md → booking / checkout panels
- shadow-lg → modals and dialogs only

No custom shadows allowed.

---

## 7. Component Usage Rules (NON-NEGOTIABLE)

- Use Tailwind semantic utilities only (bg-primary, text-muted-foreground, etc.)
- Never hardcode hex, rgba, or font-family in components
- Build new UI from shadcn primitives first
- Booking panels must use `secondary` surface
- Ratings must use `accent` (gold)
- Contact/info blocks must use `info` surface
- Hero overlays must use `overlay-50`

---

## 8. Codex Enforcement Instruction

When using Codex or any AI builder, include:

"Read and enforce /docs/design-tokens.md.
Do not invent new colors, fonts, spacing, or shadows.
Reject any UI output that violates these tokens."
