# BookEasy — Product Requirements Document (PRD)

## Overview
BookEasy is a booking platform for a **single guest house** located in **Buea, Cameroon**, offering **apartments, studios, and single rooms**.

The MVP uses a **Reserve Now / Pay on Arrival** model with **XAF (FCFA)** as the primary currency, while remaining fully prepared for future **online payments (EUR/USD)** and **MTN & Orange Mobile Money**.

---

## Goals
- Enable guests to browse, reserve, and manage bookings easily
- Eliminate double-booking under all conditions
- Launch fast with zero payment onboarding risk
- Be SEO-ready from day one
- Support future online and mobile money payments without refactoring

---

## Success Metrics
- 0 double-booking incidents
- ≥ 95% successful reservation creation
- < 2s page load on listing pages
- ≥ 80% booking completion after date selection

---

## Target Users
### Guests
- Local customers in Buea paying on arrival
- Diaspora customers (future) paying online in EUR/USD

### Admin (Operations)
- Manages rooms, pricing, availability, and bookings
- Communicates with guests
- Oversees check-in/check-out

---

## Core Features (MVP)
- Room browsing and search
- Room details with amenities and gallery
- Availability checking
- Reserve now / pay on arrival booking
- Admin dashboard
- Guest messaging
- Email confirmations
- PWA with offline booking access

---

## Booking Rules
- A booking can be **CONFIRMED without payment** in MVP
- Inventory must be locked at booking time
- Cancellations update availability immediately

---

## Payment Rules
- MVP: No online payment required
- Payment logic is separate from booking logic
- Future: Stripe (EUR/USD), MTN & Orange Mobile Money

---

## Currency
- Default: XAF (FCFA)
- Future: EUR, USD
- All amounts stored as integers
- Currency stored per booking

---

## Non-Functional Requirements
- Security: RBAC, input validation, audit logs
- Reliability: idempotent booking creation
- Observability: error tracking and logs
- Performance: SEO-friendly server rendering

---

## Out of Scope (MVP)
- Reviews and ratings
- Multi-property marketplace
- FX conversion
- Channel manager integrations
