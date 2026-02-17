# BookEasy Product Requirements Document (PRD)

## Version 2.0 — Includes Online Payments

Location: Buea, Cameroon
Primary Currency: XAF (FCFA)

---

# 1. Product Overview

BookEasy is a single-property guest house booking platform allowing users to:

- Browse apartments, studios, and single rooms
- Make reservations
- Pay online via Mobile Money (MTN MoMo / Orange Money)
- Receive booking confirmation instantly

Future expansion:

- EUR/USD payments for diaspora customers
- Multi-gateway support
- Admin analytics dashboard

---

# 2. Objectives

### Business Goals

- Increase confirmed bookings through online payments
- Reduce no-shows
- Automate booking confirmation
- Enable seamless Mobile Money payments

### Technical Goals

- Implement provider-agnostic payment architecture
- Support Notch Pay (MVP)
- Allow easy swap to CinetPay
- Ensure secure, reliable webhook processing

---

# 3. Target Users

### Primary

- Local customers in Cameroon (MTN MoMo / Orange Money)

### Secondary

- Diaspora customers (future EUR/USD support)

---

# 4. Core Features

## 4.1 Public Booking Flow

1. User browses rooms
2. Selects dates
3. Proceeds to checkout
4. Enters required details
5. Initiates online payment
6. Redirected to payment gateway
7. Receives confirmation upon success

---

## 4.2 Online Payment (NEW FEATURE)

### Payment Providers

- MVP: Notch Pay
- Future: CinetPay

### Payment Methods

- MTN Mobile Money
- Orange Money

### Payment Flow Requirements

- Booking must not be confirmed until payment succeeds
- Payment must be idempotent
- Webhook-driven confirmation
- Secure signature verification
- Booking and Payment updated atomically

### Canonical Payment States

- INITIATED
- PENDING
- SUCCEEDED
- FAILED
- CANCELLED
- EXPIRED

---

# 5. Functional Requirements

## 5.1 Booking Management

- Create booking in RESERVED state
- Attach Payment record
- Transition to CONFIRMED upon successful payment
- Support failed payment retry

## 5.2 Payment Integration

- Create payment intent
- Redirect user to provider checkout
- Process webhook events
- Prevent duplicate processing
- Store provider reference

## 5.3 Admin Portal

- View payment status
- View transaction reference
- View payment logs
- Manually verify payment (if needed)

---

# 6. Non-Functional Requirements

### Security

- Verify webhook signatures
- No card data stored
- Secure environment variables
- Rate limiting on webhook endpoints

### Reliability

- Idempotency keys
- Event deduplication ledger
- Transaction-safe updates
- Retry-safe webhook handling

### Performance

- Payment initiation < 2 seconds
- Webhook processing < 1 second
- Zero booking confirmation without payment success

---

# 7. Data Model Summary

## Booking

- id
- status (RESERVED, CONFIRMED, CANCELLED)
- totalAmount (integer)
- currency (XAF)
- paymentStatus

## Payment

- id
- bookingId
- provider
- amount
- status
- providerReference
- idempotencyKey

## ProviderEvent

- provider
- eventId
- rawPayload
- processedAt

---

# 8. Success Metrics

- 95% successful payment processing rate
- Reduced no-show rate by 50%
- Payment confirmation latency < 5 seconds
- Zero duplicate confirmations

---

# 9. Future Enhancements

- Multi-currency support (EUR/USD)
- Refund handling
- Partial payments
- Payment analytics dashboard
- Payout automation

---

This PRD supersedes previous versions and includes online payment functionality.
