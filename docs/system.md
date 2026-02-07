# BookEasy — System Architecture Blueprint

## Overview
BookEasy is a full-stack booking platform for a **single guest house** located in **Buea, Cameroon**, supporting **apartments, studios, and single rooms**.

The MVP uses a **Reserve Now / Pay on Arrival** model with **XAF (FCFA)**.  
The architecture is explicitly designed to support future **online payments (EUR/USD)** and **Mobile Money (MTN & Orange)** without refactoring.

---

## Architecture Goals
- Prevent double-booking under all conditions
- Be SEO-ready from day one
- Separate booking logic from payment logic
- Support multi-currency safely
- Use free-tier, production-ready tools
- Scale beyond MVP with minimal rewrites

---

## High-Level Architecture

```
[ Guest Web / PWA ]
[ Admin Dashboard ]
        |
        v
+------------------------------+
|        Next.js App           |
|  (Frontend + Backend)        |
|                              |
|  - Server Components (SEO)    |
|  - Server Actions             |
|  - Route Handlers (/api)      |
|                              |
|  Domain Services:             |
|   - BookingService            |
|   - PricingService            |
|   - PaymentService            |
|   - MessagingService          |
|   - NotificationService       |
+---------------+--------------+
                |
                v
        +---------------+
        | PostgreSQL    |  (Neon)
        | Source of     |
        | Truth         |
        +-------+-------+
                |
    +-----------+-----------+
    |           |           |
    v           v           v
Cloudinary   Upstash      Resend
Images       Rate Limit   Emails
                            |
                            v
                         Sentry
                 Error & Performance
```

---

## Technology Stack (Option A – Approved)

### Core
- Next.js (App Router)
- TypeScript (strict)
- PostgreSQL (Neon)
- Prisma ORM
- shadcn/ui + Tailwind CSS

### Infrastructure
- Vercel (deployment)
- Cloudinary (images + CDN)
- Resend (transactional email)
- Upstash Redis (rate limiting)
- Sentry (observability)

### Authentication & Security
- Auth.js (NextAuth)
- Role-based access control (ADMIN / GUEST)
- Zod validation

---

## Core Domain Model

### Entities
- Property (single row for MVP)
- UnitType (Apartment | Studio | Single Room)
- Unit (physical rooms)
- Booking
- PriceSnapshot
- PaymentIntent
- PaymentTransaction
- MessageThread
- Message
- AuditLog

---

## Booking & Payment Model

### Booking Lifecycle
```
DRAFT
→ RESERVED
→ CONFIRMED
→ CHECKED_IN
→ COMPLETED
→ CANCELLED
```

### Payment Lifecycle
```
NOT_REQUIRED (MVP)
PENDING
PAID
FAILED
REFUNDED
```

### MVP Rule
- Bookings may be CONFIRMED without payment
- Payment status is NOT_REQUIRED

### Future Rule
- Booking confirmation requires successful payment

---

## Currency Strategy
- Supported currencies:
  - XAF (FCFA) — MVP
  - EUR / USD — future
- All amounts stored as integers
- Currency stored per booking
- No FX conversion in MVP
- PriceSnapshot freezes prices at booking time

---

## Double-Booking Prevention

### Strategy
- PostgreSQL exclusion constraints on date ranges per unit

### Outcome
- Zero overlapping bookings
- No race conditions
- No app-level locking required

---

## API Surface

### Guest
- GET /rooms
- GET /rooms/:id
- POST /bookings
- GET /bookings/me
- GET /bookings/:id
- POST /bookings/:id/cancel
- POST /messages

### Admin
- GET /admin/bookings
- PATCH /admin/bookings/:id
- CRUD /admin/units
- GET /admin/messages

### Webhooks (future)
- POST /api/webhooks/stripe
- POST /api/webhooks/momo

---

## Folder Structure

```
/app
  /(public)
    page.tsx
    /rooms
    /rooms/[id]
  /(admin)
    /admin
    /admin/bookings
    /admin/units
    /admin/messages
  /api
    /webhooks

/lib
  /db
  /domain
    booking.ts
    pricing.ts
    payments/
      index.ts
      providers/
        payOnArrival.ts
        stripe.ts
        momo.ts
    messaging.ts
    notifications.ts
  /security

/prisma
  schema.prisma
  migrations/

/emails
/tests
```

---

## PWA & Offline Support
- Installable PWA
- Offline access to booking details and confirmations
- Offline indicator and graceful fallbacks

---

## Observability & Operations
- Sentry for error tracking and performance
- Structured logs with requestId and bookingId
- Audit logs for admin actions

---

## Roadmap

### MVP
- Listings & SEO pages
- Booking engine (pay on arrival)
- Admin dashboard
- Messaging
- Emails
- PWA

### Phase 2
- Stripe payments (EUR/USD)
- MTN & Orange Mobile Money
- Currency selector
- Online refunds
- Realtime messaging

---

## Status
- Product: Defined
- Design: Approved
- Tech Stack: Locked
- Architecture: Approved
- Implementation: Pending

---

## Next Steps
1. Generate Prisma schema
2. Create GitHub issues for Sprint 1
3. Initialize repository with this system.md
