# BookEasy — Design Document

## Design Basis

This design specification is based on the following provided screens:

- Landing Page
- Apartments / Rooms Listing Page
- Apartment Details Page
- Checkout Page

These designs define the visual hierarchy, layout, and interaction flow.

---

## Design Principles

- Luxury hospitality look and feel
- Calm, neutral color palette
- Strong imagery
- Clear primary CTAs
- This is a mobile-first app.
- All pages must be mobile responsive by default, then enhanced for larger screens.

---

## Global UI Elements

### Navigation

- Logo (left)
- Menu links
- Primary CTA: Book / Reserve

### Footer

- Contact information
- Social links
- Brand description

---

## Color System

- Primary: Deep Navy Blue
- Background: Warm Ivory / Cream
- Surface: Light Beige
- Accent: Gold / Yellow
- Text: Charcoal / Grey

---

## Typography

- Primary app typeface: Instrument Sans
- Fallbacks: "Avenir Next", Avenir, "Segoe UI", "Helvetica Neue", sans-serif
- Headings and body both use the same Instrument Sans-first stack
- Pricing: Large, bold emphasis

---

## Page Specifications

- Global requirement for all pages: mobile-first responsive behavior across phone, tablet, and desktop breakpoints.

### Home / Landing Page

- Hero image with headline
- Amenities icons
- Room categories
- Featured rooms
- Testimonials
- Must remain readable and actionable on mobile first, without horizontal scrolling.

### Rooms Listing Page

- Grid layout
- Room cards with image, rating, price
- Availability badges
- Book Now CTA
- Grid and controls must collapse cleanly for mobile and progressively enhance at `md+`.

### Room Details Page

- Image gallery
- Amenities list
- Price per night
- Date picker
- Reserve CTA
- Gallery, pricing block, and reserve CTA must stack and remain usable on small screens.

### Checkout Page

- Guest details form
- Payment method selection (pay on arrival for MVP)
- Confirmation action
- Form fields and actions must be fully mobile-accessible and responsive.

---

## UX States

- Loading skeletons
- Empty availability states
- Error messaging
- Offline indicator (PWA)

---

## PWA Considerations

- Installable app
- Offline access to booking details
- Graceful offline fallbacks
