# BookEasy — Notch Pay Payment Architecture Blueprint

Version: MVP (Notch Pay Integration)
Framework: Next.js (App Router)
Database: PostgreSQL (Prisma ORM)
Primary Currency: XAF (FCFA)
Payment Gateway: Notch Pay (Hosted Collect Page)
Website: https://developer.notchpay.co/
Quickstart Guide: https://developer.notchpay.co/get-started/quickstart

---

# 1. Overview

This document defines the production-grade payment architecture for integrating Notch Pay into BookEasy using Next.js App Router.

This architecture is:

- Provider-agnostic (future CinetPay swap-ready)
- Idempotent
- Webhook-driven
- Transaction-safe
- Fully aligned with Notch Pay official developer documentation

---

# 2. Notch Pay Core Concepts (From Official Docs)

## Authentication

All requests to Notch Pay must include:

Authorization: YOUR_PUBLIC_KEY

Sensitive operations may require:

X-Grant: YOUR_PRIVATE_KEY

Reference:
https://developer.notchpay.co/get-started/authentication

---

## Create Payment (Hosted Collect Page)

Endpoint:

POST https://api.notchpay.co/payments

Required body fields:

- amount (integer)
- currency
- customer (object)
- callback (URL)
- reference (unique string)

Response includes:

- authorization_url

Reference:
https://developer.notchpay.co/get-started/quickstart

---

## Verify Payment

Endpoint:

GET https://api.notchpay.co/payments/{reference}

Response includes:

- transaction.status

Reference:
https://developer.notchpay.co/accept-payments/collect

---

## Webhooks

- Events include: payment.complete, payment.failed, payment.expired, etc.
- Header: x-notch-signature
- Signature verification via HMAC SHA-256 using webhook secret

Reference:
https://developer.notchpay.co/get-started/webhooks

---

# 3. High-Level Architecture

Guest Browser
→ Next.js API (/api/payments/initiate)
→ PaymentService
→ NotchPayProvider
→ Notch Pay API
→ Redirect to authorization_url
→ Callback URL (/payments/notchpay/callback)
→ Server-side verify
→ Webhook confirmation (authoritative)

---

# 4. Route Structure (Next.js App Router)

Public UI:

- app/(public)/checkout/page.tsx
- app/(public)/payments/notchpay/callback/page.tsx

API Routes:

- app/api/payments/initiate/route.ts
- app/api/payments/verify/route.ts
- app/api/webhooks/notchpay/route.ts

---

# 5. Data Model

## PaymentIntent

- id (UUID)
- bookingId
- provider = "NOTCHPAY"
- reference (unique)
- amount (integer)
- currency = "XAF"
- status (CREATED | PENDING | SUCCEEDED | FAILED | EXPIRED | CANCELED)
- authorizationUrl
- idempotencyKey
- timestamps

## PaymentTransaction

- id
- intentId
- providerStatus (complete, failed, etc.)
- raw (JSON)
- receivedVia (CALLBACK | WEBHOOK | VERIFY)
- timestamps

## ProviderEvent (Recommended)

- id
- provider
- eventId (unique)
- reference
- raw (JSON)
- signatureValid (boolean)
- processedAt
- unique (provider, eventId)

---

# 6. Payment Flow

## Step 1 — Initiate Payment

POST /api/payments/initiate

Server calls:

POST https://api.notchpay.co/payments

Headers:
Authorization: NOTCHPAY_PUBLIC_KEY
Content-Type: application/json

Body example:

{
"amount": 20000,
"currency": "XAF",
"customer": {
"name": "Guest Name",
"email": "guest@email.com",
"phone": "+2376XXXXXXXX"
},
"description": "BookEasy reservation",
"callback": "https://yourdomain.com/payments/notchpay/callback",
"reference": "be_booking_ulid"
}

Response:
authorization_url

Store authorizationUrl + reference in PaymentIntent.

Redirect user to authorization_url.

---

## Step 2 — Callback Verification

User is redirected to:

/payments/notchpay/callback?reference=...

Server calls:

GET https://api.notchpay.co/payments/{reference}

Check:

data.transaction.status

If status = complete:

- PaymentIntent.status = SUCCEEDED
- Booking.status = CONFIRMED

Else:

- Map provider status to internal state

---

## Step 3 — Webhook (Authoritative Source)

POST /api/webhooks/notchpay

Steps:

1. Read raw body: await request.text()
2. Get x-notch-signature header
3. Compute HMAC SHA-256 using NOTCHPAY_WEBHOOK_SECRET
4. Timing-safe compare signatures
5. Parse event JSON
6. Deduplicate via ProviderEvent
7. Transaction:
   - Update PaymentIntent
   - Update Booking (if SUCCEEDED)
   - Mark ProviderEvent.processedAt

Return 200 OK.

---

# 7. Status Mapping

Notch Pay Status → Internal Status

complete → SUCCEEDED
failed → FAILED
expired → EXPIRED
canceled → CANCELED
pending/processing → PENDING
refunded → REFUNDED (future support)

---

# 8. Sequence Diagram

Checkout Flow:

Guest → /api/payments/initiate
Server → POST /payments (Notch)
Server ← authorization_url
Guest → Notch Hosted Page
Notch → redirect callback
Server → verify payment
Booking confirmed

Webhook Flow:

Notch → POST /api/webhooks/notchpay
Server → verify signature
Server → update payment + booking
Server → 200 OK

---

# 9. Environment Variables

Required:

- NOTCHPAY_PUBLIC_KEY
- NOTCHPAY_PRIVATE_KEY (optional advanced ops)
- NOTCHPAY_WEBHOOK_SECRET
- APP_BASE_URL

---

# 10. Security Requirements

- Always verify webhook signature
- Never trust redirect alone
- Never confirm booking without server-side verification
- Use idempotency keys for initiate endpoint
- Log bookingId, paymentId, reference for traceability

---

# 11. Provider Swap Strategy

PaymentService depends only on:

interface PaymentProvider {
initiatePayment()
verifyPayment()
handleWebhook()
}

To integrate CinetPay later:

- Create cinetpay-provider.ts
- Register in provider registry
- No BookingService refactor required

---

# 12. Definition of Done

- Payment initiation returns authorization_url
- Booking only CONFIRMED when status = complete
- Webhook is HMAC-verified
- Duplicate webhook events are idempotent
- Payment logs are structured and traceable
- Adapter abstraction enables provider swap
