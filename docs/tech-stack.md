# BookEasy — Technology Stack (Option A)

## Overview

This document defines the approved, production-ready technology stack for BookEasy using **free-tier tools** and **Next.js full-stack architecture**.

---

## Core Stack

- Next.js (App Router)
- TypeScript (strict)
- shadcn/ui + Tailwind CSS
- Prisma ORM
- PostgreSQL (Neon)

---

## Backend & APIs

- Next.js Route Handlers
- Server Actions
- Zod for validation

---

## Authentication

- Auth.js (NextAuth)
- Role-based access control

---

## Payments

### MVP

- Reserve Now / Pay on Arrival

### Future

- Stripe (EUR/USD)
- MTN & Orange Mobile Money (via aggregator)

---

## Currency Handling

- XAF default
- EUR / USD future
- Integer-based amount storage
- Price snapshot at booking

---

## Media & Email

- Cloudinary (images)
- Resend (transactional emails)
- React Email templates

---

## Observability & Security

- Sentry (errors + performance)
- Upstash Redis (rate limiting)
- Audit logs for admin actions

---

## Testing

- Vitest (unit)
- React Testing Library
- Playwright (e2e)

---

## CI/CD & Deployment

- GitHub Actions
- Vercel deployment
- Environment-based configuration

---

## Status

This stack is approved for MVP and future scale.
