# BookEasy API Spec & Endpoint Definitions

Version: v1 (MVP + Online Payments)
Status: Draft for Codex implementation
Primary currency: XAF (FCFA)
Primary payment rails: MTN MoMo, Orange Money (via gateway)
Active gateway in MVP: Notch Pay (abstracted behind provider interface)
Future gateway: CinetPay (same contracts)

> **Rules**
>
> - No provider-specific shapes leak into client/API responses.
> - Amounts are **integers in minor units** (for XAF, minor unit == 1).
> - All write endpoints are **idempotent** where noted.
> - All responses are JSON unless explicitly noted.
> - Public endpoints are readable without auth; booking/payment actions require user context (guest session) or admin auth.

---

## 0. Conventions

### Base URL

- Local: `http://localhost:3000`
- API prefix: `/api`

### Auth model (MVP)

- **Guest session**: cookie-based session (Auth.js/NextAuth or custom) OR booking-scoped access token.
- **Admin**: authenticated user with role `ADMIN`.

> If you haven't implemented auth yet, Codex should stub auth with:
>
> - `X-Guest-Session` header (temporary) OR signed `bookingAccessToken` for booking detail/receipt routes.
> - Replace later with Auth.js.

### Idempotency

- For idempotent endpoints, client must send header:
  - `Idempotency-Key: <uuid>`
- Server stores and replays the first successful response for the same key + user + endpoint.

### Common Headers

- `Content-Type: application/json`
- `Idempotency-Key: <uuid>` (when required)
- `X-Request-Id: <uuid>` (optional; generated if missing)

### Error Object

All errors use:

```json
{
  "error": {
    "code": "STRING_ENUM",
    "message": "Human-readable message",
    "details": { "optional": "object" }
  }
}
```

Common error codes:

- `VALIDATION_ERROR`
- `NOT_FOUND`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `CONFLICT`
- `RATE_LIMITED`
- `PAYMENT_PROVIDER_ERROR`
- `WEBHOOK_SIGNATURE_INVALID`
- `IDEMPOTENCY_REPLAY`

### Canonical Payment Status

- `INITIATED`
- `PENDING`
- `SUCCEEDED`
- `FAILED`
- `CANCELLED`
- `EXPIRED`

### Canonical Booking Status (MVP)

- `DRAFT` (optional)
- `RESERVED`
- `CONFIRMED`
- `CANCELLED`
- `EXPIRED`

---

## 1. Public Content APIs (Read)

### 1.1 List Rooms

**GET** `/api/public/rooms`

Query params:

- `type` (optional): `apartment|studio|single`
- `guests` (optional): integer
- `minPrice` / `maxPrice` (optional): integer
- `amenities` (optional): comma-separated slugs
- `page` (optional): integer default 1
- `pageSize` (optional): integer default 12
- `sort` (optional): `price_asc|price_desc|featured|rating`

Response `200`:

```json
{
  "data": [
    {
      "id": "room_123",
      "slug": "studio-deluxe",
      "title": "Deluxe Studio",
      "type": "studio",
      "pricePerNight": 20000,
      "currency": "XAF",
      "maxGuests": 2,
      "thumbnailUrl": "/images/rooms/studio.jpg",
      "rating": 4.8,
      "reviewCount": 24,
      "amenities": ["wifi", "fitness", "parking"],
      "isFeatured": true
    }
  ],
  "pagination": { "page": 1, "pageSize": 12, "total": 42 }
}
```

### 1.2 Room Details

**GET** `/api/public/rooms/{slug}`

Response `200`:

```json
{
  "data": {
    "id": "room_123",
    "slug": "studio-deluxe",
    "title": "Deluxe Studio",
    "type": "studio",
    "description": "…",
    "pricePerNight": 20000,
    "currency": "XAF",
    "maxGuests": 2,
    "gallery": [{ "url": "/images/rooms/studio-1.jpg", "alt": "Studio view" }],
    "amenities": [{ "slug": "wifi", "label": "High Speed WiFi" }],
    "policies": {
      "checkIn": "14:00",
      "checkOut": "12:00",
      "cancellation": "…"
    }
  }
}
```

### 1.3 Availability Quote (Optional but recommended)

**POST** `/api/public/availability/quote`

Request:

```json
{
  "roomId": "room_123",
  "checkIn": "2026-03-01",
  "checkOut": "2026-03-03",
  "guests": 2
}
```

Response `200`:

```json
{
  "data": {
    "isAvailable": true,
    "nights": 2,
    "pricePerNight": 20000,
    "subtotal": 40000,
    "fees": 0,
    "tax": 0,
    "total": 40000,
    "currency": "XAF"
  }
}
```

Errors:

- `409 CONFLICT` if overlapping holds/reservations logic is used

---

## 2. Booking APIs (Guest)

### 2.1 Create Booking (Reserve)

**POST** `/api/bookings`
Idempotent: **YES** (requires `Idempotency-Key`)

Request:

```json
{
  "roomId": "room_123",
  "checkIn": "2026-03-01",
  "checkOut": "2026-03-03",
  "guests": 2,
  "customer": {
    "fullName": "Jane Doe",
    "phone": "+2376xxxxxxx",
    "email": "jane@example.com"
  },
  "notes": "Optional guest notes"
}
```

Response `201`:

```json
{
  "data": {
    "bookingId": "bk_123",
    "status": "RESERVED",
    "paymentStatus": "PENDING",
    "total": 40000,
    "currency": "XAF",
    "expiresAt": "2026-02-17T22:30:00.000Z"
  }
}
```

Notes:

- Creates booking in `RESERVED` with an expiration window (e.g., 15 minutes) if payment required.
- Returns `expiresAt` to drive client countdown UI.

### 2.2 Get Booking (Guest)

**GET** `/api/bookings/{bookingId}`

Auth:

- Guest session must match booking OR valid booking access token.

Response `200`:

```json
{
  "data": {
    "bookingId": "bk_123",
    "status": "RESERVED",
    "room": {
      "id": "room_123",
      "title": "Deluxe Studio",
      "type": "studio"
    },
    "dates": { "checkIn": "2026-03-01", "checkOut": "2026-03-03", "nights": 2 },
    "total": 40000,
    "currency": "XAF",
    "paymentStatus": "PENDING",
    "payment": {
      "paymentId": "pay_123",
      "status": "PENDING",
      "provider": "NOTCHPAY"
    }
  }
}
```

### 2.3 Cancel Booking (Guest)

**POST** `/api/bookings/{bookingId}/cancel`

Request:

```json
{ "reason": "Changed plans" }
```

Response `200`:

```json
{ "data": { "bookingId": "bk_123", "status": "CANCELLED" } }
```

---

## 3. Payments APIs (Provider-Agnostic)

### 3.1 Start Payment for Booking

**POST** `/api/payments/start`
Idempotent: **YES** (requires `Idempotency-Key`)

Request:

```json
{
  "bookingId": "bk_123",
  "provider": "NOTCHPAY",
  "method": "MOMO",
  "customerPhone": "+2376xxxxxxx",
  "returnUrl": "https://bookeasy.cm/booking/bk_123/success",
  "cancelUrl": "https://bookeasy.cm/booking/bk_123"
}
```

Response `200`:

```json
{
  "data": {
    "paymentId": "pay_123",
    "status": "PENDING",
    "checkoutUrl": "https://gateway.example/checkout/abc",
    "provider": "NOTCHPAY"
  }
}
```

Rules:

- If a payment already exists for the booking in `PENDING`, return existing `checkoutUrl`.
- If payment is `SUCCEEDED`, return conflict and the booking details.

Errors:

- `409 CONFLICT` if booking is already CONFIRMED and payment is SUCCEEDED
- `400 VALIDATION_ERROR` if phone missing for MoMo flow

### 3.2 Get Payment Status

**GET** `/api/payments/{paymentId}`

Response `200`:

```json
{
  "data": {
    "paymentId": "pay_123",
    "bookingId": "bk_123",
    "provider": "NOTCHPAY",
    "status": "PENDING",
    "amount": 40000,
    "currency": "XAF",
    "providerReference": "NP_REF_987",
    "createdAt": "2026-02-17T20:00:00.000Z"
  }
}
```

### 3.3 Verify Payment (Fallback)

**POST** `/api/payments/{paymentId}/verify`

Purpose:

- Used if webhook is delayed or user returns before webhook arrives.
- Calls provider verify endpoint, then applies canonical transition.

Response `200`:

```json
{
  "data": {
    "paymentId": "pay_123",
    "status": "SUCCEEDED",
    "bookingStatus": "CONFIRMED"
  }
}
```

Errors:

- `502 PAYMENT_PROVIDER_ERROR` if provider unavailable

---

## 4. Webhooks (Provider Ingress)

### 4.1 Notch Pay Webhook

**POST** `/api/webhooks/payments/notchpay`

Headers:

- Provider signature header (exact name to be confirmed per NotchPay docs)
- `Content-Type: application/json`

Body:

- Provider-specific payload (stored raw)

Response:

- `200 OK` on success
- `400` on invalid signature/payload

Processing rules:

1. Verify signature (mandatory)
2. Parse event to normalized shape:
   - `eventId`
   - `providerReference`
   - `status`
   - `amount`
   - `currency`
3. Upsert `ProviderEvent(provider,eventId)` to dedupe
4. Resolve internal `Payment` by `providerReference`
5. Update `Payment.status`
6. Update related `Booking.status/paymentStatus` **in the same DB transaction**
7. Mark `ProviderEvent.processedAt`

Normalized internal event shape (stored/used):

```json
{
  "provider": "NOTCHPAY",
  "eventId": "evt_123",
  "providerReference": "NP_REF_987",
  "status": "SUCCEEDED",
  "amount": 40000,
  "currency": "XAF",
  "raw": {}
}
```

Errors:

- `401 WEBHOOK_SIGNATURE_INVALID`
- `404 NOT_FOUND` if payment cannot be matched (store event anyway for investigation)

### 4.2 CinetPay Webhook (Future)

**POST** `/api/webhooks/payments/cinetpay`

Same processing rules and normalized event output as above.

---

## 5. Admin APIs

> All admin endpoints require `ADMIN` role.

### 5.1 List Bookings

**GET** `/api/admin/bookings`

Query:

- `status` optional
- `dateFrom`, `dateTo`
- `page`, `pageSize`

Response `200`:

```json
{
  "data": [
    {
      "bookingId": "bk_123",
      "status": "CONFIRMED",
      "total": 40000,
      "currency": "XAF",
      "customerPhone": "+2376xxxxxxx",
      "createdAt": "2026-02-17T20:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "pageSize": 20, "total": 120 }
}
```

### 5.2 Booking Detail (includes payment)

**GET** `/api/admin/bookings/{bookingId}`

Response `200` includes:

- booking data
- payment data
- event ledger summary

### 5.3 List Payments

**GET** `/api/admin/payments`

Query:

- `status`, `provider`, `dateFrom`, `dateTo`

### 5.4 Payment Detail (includes events)

**GET** `/api/admin/payments/{paymentId}`

### 5.5 Replay Webhook Event (Controlled)

**POST** `/api/admin/payments/{paymentId}/replay-event`
Request:

```json
{ "eventId": "evt_123" }
```

Response `200`:

```json
{ "data": { "replayed": true } }
```

---

## 6. Client UX Endpoints (Optional)

These are optional server endpoints used to support smooth UX.

### 6.1 Booking Success Page Data

**GET** `/api/bookings/{bookingId}/receipt`
Returns:

- booking confirmed info
- payment reference
- room details summary

---

## 7. Rate Limiting & Security Notes

- Apply rate limiting to:
  - `/api/payments/start`
  - webhook routes
- Webhooks should allow provider IPs if available (optional)
- Never log full webhook payloads in plaintext logs; store in DB, log only IDs/references.
- Enforce strict CORS for admin endpoints.

---

## 8. Codex Implementation Checklist

Codex must generate:

- Route handlers under `app/api/**/route.ts`
- Server actions for:
  - create booking
  - start payment
- Validation (zod) for request bodies
- Database models + migrations (Prisma)
- Payment provider adapter interfaces
- Webhook signature verification hooks (stub until exact headers confirmed)
- Idempotency store (DB table or Redis; DB acceptable for MVP)
- Unit tests for:
  - idempotency replay
  - webhook dedupe
  - booking confirmation transaction
- E2E test skeleton for payment flow (mock webhook)

---

## 9. Open Questions (Need to confirm during integration)

- Notch Pay webhook signature header name & signing algorithm
- Notch Pay verify endpoint & status mapping
- CinetPay webhook signature verification details

> Until confirmed, implement signature verification as a strict stub:
>
> - Reject if header missing
> - Validate using HMAC with env secret once docs confirmed
