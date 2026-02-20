# BookEasy System Architecture

Version: v1 (MVP + Online Payments)
Status: Implementation Blueprint (Codex-ready)
Primary market: Upstation, Bamenda, NorthWest Region, Cameroon
Property: Alonta Towers Guest House
Platform role: BookEasy provides the booking solution for the property
Currency: XAF (FCFA)
Payments: Notch Pay (MVP), CinetPay (future via adapter)

---

## 1. Executive Summary

BookEasy is a single-property guest house booking platform for apartments, studios, and single rooms. The MVP supports:

- Public discovery (landing, listings, room details)
- Availability + reservation creation
- Online payments (Mobile Money via gateway)
- Booking confirmation via webhooks
- Admin portal to manage inventory, bookings, and payments
- PWA/offline readiness (progressive enhancement)

This architecture is designed for **speed-to-ship** while remaining **production-grade**: secure, observable, and provider-agnostic for payments.

---

## 2. System Context

### Primary Actors

- **Guest user**: browses rooms, reserves, pays, receives confirmation
- **Admin user**: manages rooms, availability, pricing, bookings, payments
- **Payment gateway**: Notch Pay (now), CinetPay (later)
- **Notification providers** (future): SMS/WhatsApp/email

### High-level Responsibilities

- Frontend + backend in **Next.js App Router**
- Persistent storage in **Postgres**
- Auth for admin (Auth.js/NextAuth) + guest session model for bookings
- Payments handled through **provider adapters** with webhook confirmation

---

## 3. Architecture Overview

### 3.1 Component Diagram (Logical)

```
+-------------------+
|     Guest UI      |
| Next.js (public)  |
+---------+---------+
          |
          | HTTPS (server actions / API routes)
          v
+-------------------+        +-------------------+
|  Next.js Backend  | <----> |     Postgres      |
| (API + services)  |        | (Prisma ORM)      |
+---------+---------+        +-------------------+
          |
          | Payment initiation / verify
          v
+-------------------+
| Payment Provider  |
| Adapter Layer     |
| (Notch/CinetPay)  |
+---------+---------+
          |
          | External API calls
          v
+-------------------+
| Payment Gateway   |
| NotchPay/CinetPay |
+---------+---------+
          |
          | Webhook callbacks
          v
+-------------------+
| Webhook Handlers  |
| /api/webhooks/... |
+-------------------+
          |
          v
+-------------------+
| Booking Confirm   |
| (atomic updates)  |
+-------------------+
```

### 3.2 Deployment Diagram (Physical)

```
Browser/PWA
   |
   v
Vercel (Next.js)  ----->  Postgres (Neon/Supabase/Render)
   |
   +--> Object Storage (future: Cloudinary for images)
   |
   +--> Observability (Sentry / Log drain)
   |
   +--> Payment Gateway Webhooks (NotchPay/CinetPay -> Vercel endpoint)
```

---

## 4. Key Modules and Boundaries

### 4.1 Route Groups

- `app/(public)/**` — landing, listings, details, checkout
- `app/(admin)/**` — admin dashboard, rooms, bookings, payments
- `app/api/**` — API routes (webhooks, admin APIs, public APIs)

### 4.2 Domain Services

- **BookingService**
  - availability checks
  - create/cancel/expire bookings
  - calculate totals
  - enforce booking state transitions
- **PaymentService**
  - initiate payment (idempotent)
  - apply webhook events (dedupe + atomic update)
  - provider verification fallback
  - provider adapter registry
- **InventoryService** (MVP-light)
  - rooms, pricing, images, amenities
- **NotificationService** (future)
  - send confirmations, reminders

### 4.3 Provider Adapters (Payments)

- `PaymentProvider` interface
- `NotchPayProvider` implementation (MVP)
- `CinetPayProvider` implementation (future)

Adapters handle:

- request/response mapping
- signature verification
- webhook parsing to canonical event
- provider status -> canonical status mapping

---

## 5. Data Model (Conceptual)

### 5.1 Core Entities

- **Room**
  - id, slug, type (apartment/studio/single)
  - title, description
  - pricePerNight (XAF)
  - maxGuests
  - amenities (many-to-many or JSON)
  - images (URLs)
  - isActive/isFeatured
- **Booking**
  - id
  - roomId
  - checkIn, checkOut, nights
  - guests
  - totals (subtotal/total)
  - currency
  - status (RESERVED/CONFIRMED/CANCELLED/EXPIRED)
  - customer (name/phone/email)
  - paymentStatus (PENDING/PAID/FAILED)
  - expiresAt (for payment window)
- **Payment**
  - id
  - bookingId
  - provider (NOTCHPAY/CINETPAY)
  - amount, currency
  - status (INITIATED/PENDING/SUCCEEDED/FAILED/CANCELLED/EXPIRED)
  - providerReference
  - checkoutUrl
  - idempotencyKey
  - metadata
- **ProviderEvent**
  - id
  - provider
  - eventId (unique per provider)
  - raw payload JSON
  - signatureValid
  - processedAt

### 5.2 Integrity Rules

- 1 Booking → 0..1 Payment (MVP)
- A booking can only be **CONFIRMED** if payment is **SUCCEEDED**
- Webhook processing must be **idempotent**:
  - unique constraint on `(provider, eventId)`
- Booking + payment status updates happen in a **single DB transaction**

---

## 6. Key Flows (Sequence Diagrams)

### 6.1 Reserve + Pay + Confirm

```
Guest -> Public UI: Select room/dates
Public UI -> API: Create Booking (RESERVED + expiresAt)
Public UI -> API: Start Payment (idempotent)
API -> Provider Adapter: initiatePayment()
Adapter -> Gateway: create payment
Gateway -> Guest: payment authorization (MoMo prompt)
Gateway -> Webhook: payment result
Webhook -> PaymentService: verify signature, parse, dedupe
PaymentService -> DB: update Payment + Booking (atomic)
DB -> Guest UI: booking confirmed
```

### 6.2 Payment Provider Swap

```
Change env PAYMENT_PROVIDER=CINETPAY
Add CinetPayProvider adapter
No changes to BookingService, PaymentService, DB schema, or UI contracts
```

---

## 7. API Surface (Summary)

Authoritative details live in: **/docs/api-spec.md**

### Public

- `GET /api/public/rooms`
- `GET /api/public/rooms/{slug}`
- `POST /api/public/availability/quote` (recommended)

### Booking

- `POST /api/bookings` (idempotent)
- `GET /api/bookings/{bookingId}`
- `POST /api/bookings/{bookingId}/cancel`

### Payments

- `POST /api/payments/start` (idempotent)
- `GET /api/payments/{paymentId}`
- `POST /api/payments/{paymentId}/verify`

### Webhooks

- `POST /api/webhooks/payments/notchpay`
- `POST /api/webhooks/payments/cinetpay` (future)

### Admin

- `GET /api/admin/bookings`
- `GET /api/admin/bookings/{bookingId}`
- `GET /api/admin/payments`
- `GET /api/admin/payments/{paymentId}`

---

## 8. Security Architecture

### 8.1 Authentication & Authorization

- Admin routes require `ADMIN` role (Auth.js recommended)
- Guest booking access:
  - guest session cookie OR booking access token
- All admin APIs protected by auth middleware

### 8.2 Payments Security

- Webhook signature verification is mandatory
- Never store card data
- Store only provider references + minimal metadata
- Rate limit:
  - `/api/payments/start`
  - webhook endpoints

### 8.3 Data Privacy

- Store only necessary PII (name/phone/email)
- Log redaction for phone/email where possible
- Separate audit logs for sensitive events

---

## 9. Reliability & Consistency

### 9.1 Idempotency

- Client supplies `Idempotency-Key` for:
  - create booking
  - start payment
- Server persists idempotency results (DB table or Payment.idempotencyKey in MVP)

### 9.2 Webhook Dedupe

- Persist ProviderEvent with unique `(provider,eventId)`
- If duplicate event received, return 200 without re-applying transitions

### 9.3 Booking Expiry

- RESERVED bookings expire after a configured window (e.g., 15–30 minutes)
- Expiration job options:
  - Cron in GitHub Actions or Vercel Cron
  - Admin-triggered cleanup endpoint (fallback)

---

## 10. Observability (MVP)

- Structured logs with correlation IDs:
  - bookingId, paymentId, providerReference, requestId
- Error tracking:
  - Sentry (recommended)
- Metrics (future):
  - payments success rate
  - webhook latency
  - booking conversion funnel

---

## 11. Performance & UX

- SSR for public pages (SEO)
- Use `next/image` for optimization
- Cache public room data (revalidate) where safe
- Keep payment initiation < 2s; webhook processing < 1s

---

## 12. Deployment & Environments

### 12.1 Environments

- `development`
- `staging`
- `production`

### 12.2 Required Secrets/Env Vars (MVP)

- `DATABASE_URL`
- `PAYMENT_PROVIDER` = `NOTCHPAY` | `CINETPAY`
- `NOTCHPAY_SECRET_KEY`
- `NOTCHPAY_WEBHOOK_SECRET`
- `CINETPAY_API_KEY` (future)
- `CINETPAY_WEBHOOK_SECRET` (future)
- `NEXTAUTH_SECRET` (if using Auth.js)

---

## 13. Repo Structure (Recommended)

```
app/
  (public)/
  (admin)/
  api/
components/
  public/
  admin/
  ui/               # shadcn components
lib/
  services/
    booking.service.ts
    payment.service.ts
  payments/
    provider.ts     # interface
    notchpay.ts
    cinetpay.ts
  validators/        # zod schemas
  utils.ts           # cn(), helpers
docs/
  prd.md
  api-spec.md
  payment.md
  design-tokens.md
```

---

## 14. Decision Log (Key Architectural Decisions)

- Full-stack Next.js for SEO + unified dev experience
- Provider-agnostic payments via adapter pattern
- Webhook-ledger dedupe for correctness
- Atomic booking confirmation on payment success
- Token-based design system enforced via docs and Tailwind mapping

---

## 15. Next Steps (Implementation Order)

1. Public layout scaffold (navbar/footer) + landing
2. Listings + room details
3. Booking creation (RESERVED + expiry)
4. Payment initiation (Notch Pay adapter)
5. Webhook processing + confirm booking
6. Admin booking/payment views
7. PWA/offline enhancements

---

This file is the authoritative system architecture blueprint for BookEasy.
