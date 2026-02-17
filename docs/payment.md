# BookEasy Payment Architecture Blueprint

This document defines the provider-agnostic payment system for BookEasy.
It supports Notch Pay (MVP) and allows easy future migration to CinetPay.

---

# 1. Architectural Principles

- Provider abstraction (no gateway logic in domain layer)
- Canonical internal payment states
- Idempotent webhook processing
- Atomic booking confirmation
- Easy provider swap via adapter pattern

---

# 2. High-Level Architecture

Components:

Frontend (Checkout UI)
↓
Server Action (Start Payment)
↓
PaymentService (Domain Layer)
↓
PaymentProvider Adapter (NotchPay / CinetPay)
↓
External Payment Gateway
↓
Webhook Route
↓
PaymentService
↓
Booking State Update

---

# 3. Canonical Payment States

Internal statuses:

- INITIATED
- PENDING
- SUCCEEDED
- FAILED
- CANCELLED
- EXPIRED

Providers map their statuses to these canonical states.

---

# 4. Sequence Diagram — Start Payment Flow

User initiates payment from checkout.

```
User
 │
 │ Click "Pay Now"
 ▼
Frontend (Checkout Page)
 │
 │ POST start-payment
 ▼
Server Action
 │
 │ Create Payment (idempotent)
 │
 ▼
PaymentService
 │
 │ Call initiatePayment()
 ▼
NotchPayProvider
 │
 │ API Request → Notch Pay
 ▼
Notch Pay Gateway
 │
 │ Return checkoutUrl + reference
 ▼
NotchPayProvider
 │
 ▼
PaymentService
 │
 │ Save providerReference + status=PENDING
 ▼
Frontend Redirects User → checkoutUrl
```

---

# 5. Sequence Diagram — Webhook Confirmation Flow

Provider confirms payment via webhook.

```
Notch Pay
 │
 │ POST /api/webhooks/payments/notchpay
 ▼
Webhook Route
 │
 │ Verify Signature
 │ Parse Event
 ▼
PaymentService.applyWebhookEvent()
 │
 │ Lookup Payment via providerReference
 │ Normalize status
 │ Store ProviderEvent (dedupe)
 │ Update Payment.status
 │ Update Booking.status (atomic transaction)
 ▼
Database (Payment + Booking)
 │
 ▼
Booking.status = CONFIRMED
Payment.status = SUCCEEDED
```

---

# 6. Sequence Diagram — Provider Swap (Notch → CinetPay)

No domain changes required.

```
Environment Config
 │
 │ PAYMENT_PROVIDER=CINETPAY
 ▼
PaymentService
 │
 │ Load CinetPayProvider adapter
 ▼
CinetPayProvider
 │
 │ initiatePayment()
 │ parseWebhook()
 │ verifySignature()
 ▼
Existing Domain + DB Models (unchanged)
```

Swap requires:

- New adapter implementation
- Env config change
- No schema change
- No booking logic change

---

# 7. Data Model Overview

## Booking

- id
- status (RESERVED, CONFIRMED, CANCELLED)
- totalAmount (integer)
- currency (XAF)
- paymentStatus
- paymentId

## Payment

- id
- bookingId
- provider
- amount
- currency
- status
- providerReference
- checkoutUrl
- idempotencyKey
- metadata
- timestamps

## ProviderEvent

- id
- provider
- eventId
- raw
- signatureValid
- processedAt
- Unique constraint: (provider, eventId)

---

# 8. Reliability Strategy

- Unique idempotencyKey per booking
- ProviderEvent ledger prevents double processing
- All state changes in DB transaction
- Safe webhook retries
- Optional manual verification endpoint

---

# 9. Security Controls

- Verify webhook signature
- No sensitive card data stored
- Correlation IDs logged
- Rate limiting on webhook routes
- Audit logs for payment transitions

---

# 10. Recommended MVP Configuration

Provider: Notch Pay  
Currency: XAF  
Payment Required for Booking Confirmation  
Webhook-driven confirmation  
Redirect after success → /booking/[id]/success

---

# 11. Future Enhancements

- Refund handling
- Partial payments
- Multi-currency (EUR/USD)
- Payment analytics
- Settlement reconciliation dashboard

---

This document is the authoritative reference for all BookEasy payment integrations.
