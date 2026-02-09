# BookEasy Implementation Todo

## Project Summary

BookEasy is a single-property guest-house booking platform for Buea, Cameroon, built with Next.js App Router and PostgreSQL.
MVP focuses on browsing rooms, checking availability, reserving with Pay on Arrival, and guest-admin communication.
Double-booking prevention is enforced primarily at database level with transactional booking flows and idempotency.
Booking logic and payment logic are separated so future Stripe and Mobile Money providers can plug in cleanly.
Public pages are SEO-first and server-rendered, with mobile-first UX and an installable PWA baseline.
Offline behavior is limited to previously fetched booking details and graceful fallback states.
Security and operations include RBAC, validation, audit logs, rate limiting, and observability.

## Definition of Done

- [ ] MVP milestones 0–6 complete with passing CI (typecheck, unit, e2e)
- [ ] Zero overlapping bookings possible for the same unit in production DB
- [ ] Booking service depends on payment interface, not provider-specific logic
- [ ] Public pages are SSR, metadata-complete, and SEO-audited
- [ ] Admin area is RBAC-protected and all admin mutations are audit-logged
- [ ] PWA is installable and can show previously loaded booking details offline
- [ ] Validation, rate limiting, structured logs, and Sentry are active
- [ ] MVP excludes online payments, marketplace, reviews/ratings, and FX conversion

## Explicit Assumptions

- Assumption: MVP uses exactly one `Property` record, but schema remains extensible for future multi-property support.
- Assumption: Testimonials on the landing page are static marketing content, not user-submitted reviews.
- Assumption: Availability is enforced at `Unit` (physical room) level and surfaced by `UnitType` in listings.
- Assumption: Overlap blocking applies to `RESERVED`, `CONFIRMED`, `CHECKED_IN`; `CANCELLED` and `COMPLETED` do not block inventory.
- Assumption: Offline mode is read-only for booking details; create/cancel requires internet in MVP.

## Top 5 Risks + Mitigations

1. **Risk:** Concurrent booking requests create race conditions.
   Mitigation: PostgreSQL exclusion constraint + transactional booking flow + idempotency + concurrency tests.
2. **Risk:** Payment concerns leak into booking logic and hinder future providers.
   Mitigation: Define `PaymentService` interface and provider adapters from MVP start, with Pay-on-Arrival as default provider.
3. **Risk:** Admin mutations are not traceable.
   Mitigation: Centralized audit logging for every admin write path, enforced in service/API layer and tested.
4. **Risk:** SEO/performance regressions from client-heavy rendering.
   Mitigation: Server Components for public pages, metadata/sitemap coverage, image optimization, and performance checks.
5. **Risk:** Offline caching produces stale or inconsistent behavior.
   Mitigation: Cache only booking-detail routes/assets with explicit invalidation and deterministic fallback UI.

## Milestone 0 — Repo & Tooling Foundation

### Task 001

- **ID:** 001
- **Feature Area:** Infra
- **Title:** Initialize project baseline and enforce strict TypeScript
- **Context:** Establish a reliable baseline aligned with locked stack decisions.
- **Scope Included:** Validate Next.js App Router baseline, strict TypeScript, path aliases, core scripts.
- **Scope Excluded:** Feature implementation.
- **Acceptance Criteria:**
- [ ] `next build` passes on clean install
- [ ] TypeScript strict mode is enabled and enforced in CI
- [ ] Standard scripts exist for `dev`, `build`, `lint`, `test`
- **Implementation Notes:** Check `tsconfig.json`, `next.config.*`, `package.json`; add `@/*` alias for `app`, `lib`, `components`.
- **Dependencies:** None
- **Estimate:** S

### Task 002

- **ID:** 002
- **Feature Area:** Infra
- **Title:** Configure Prisma, Neon connection, and migration workflow
- **Context:** Stable migration workflow is required before domain modeling.
- **Scope Included:** Prisma setup, environment schema, migration scripts.
- **Scope Excluded:** Final domain table definitions.
- **Acceptance Criteria:**
- [ ] `prisma migrate dev` runs locally
- [ ] `prisma generate` succeeds in CI
- [ ] `.env.example` contains required DB variables
- **Implementation Notes:** Update `prisma/schema.prisma`, `.env.example`, scripts in `package.json`; support Neon pooled/direct URLs if needed.
- **Dependencies:** 001
- **Estimate:** S

### Task 003

- **ID:** 003
- **Feature Area:** Infra
- **Title:** Install and configure shadcn/ui + Tailwind design tokens
- **Context:** UI foundation must reflect approved visual direction.
- **Scope Included:** Tailwind setup, color/typography tokens, base UI primitives.
- **Scope Excluded:** Full page implementations.
- **Acceptance Criteria:**
- [ ] Global theme variables reflect approved palette
- [ ] Base layout uses configured typography and spacing scale
- [ ] Button, input, card, and badge components are ready
- **Implementation Notes:** Update `app/globals.css`, `tailwind.config.*`, `components/ui/*`.
- **Dependencies:** 001
- **Estimate:** M

### Task 004

- **ID:** 004
- **Feature Area:** Security
- **Title:** Configure Auth.js with ADMIN/GUEST roles and route protection skeleton
- **Context:** RBAC is required for admin security.
- **Scope Included:** Auth setup, role typing, middleware guards for admin routes.
- **Scope Excluded:** Admin feature pages.
- **Acceptance Criteria:**
- [ ] Unauthenticated users cannot access `/admin/*`
- [ ] Session contains role field
- [ ] Role guard utility is reusable in services/routes
- **Implementation Notes:** Add `auth.ts`, `middleware.ts`, `lib/security/rbac.ts`; keep authorization server-side.
- **Dependencies:** 001
- **Estimate:** M

### Task 005

- **ID:** 005
- **Feature Area:** Infra
- **Title:** Add request validation framework with Zod wrappers
- **Context:** Validation consistency reduces runtime and security risk.
- **Scope Included:** Shared schema parsing helpers for route handlers and server actions.
- **Scope Excluded:** Endpoint-specific schema content.
- **Acceptance Criteria:**
- [ ] Shared parser utility exists
- [ ] Validation errors map to a stable response format
- [ ] One sample endpoint uses the shared parser
- **Implementation Notes:** Create `lib/validation/*`, `lib/http/errors.ts` with typed error codes.
- **Dependencies:** 001
- **Estimate:** S

### Task 006

- **ID:** 006
- **Feature Area:** Observability
- **Title:** Implement structured logging and request correlation IDs
- **Context:** Booking and support workflows need request traceability.
- **Scope Included:** Logger utility, requestId propagation, bookingId tagging.
- **Scope Excluded:** External log dashboards.
- **Acceptance Criteria:**
- [ ] API requests log with `requestId`
- [ ] Booking mutations include `bookingId` where available
- [ ] Logs are structured JSON
- **Implementation Notes:** Add `lib/observability/logger.ts` and request helper wiring.
- **Dependencies:** 001
- **Estimate:** S

### Task 007

- **ID:** 007
- **Feature Area:** Observability
- **Title:** Integrate Sentry for errors and performance tracing
- **Context:** Error/performance monitoring is a non-functional requirement.
- **Scope Included:** Server/client Sentry setup, environment tags, release metadata.
- **Scope Excluded:** Custom alert routing.
- **Acceptance Criteria:**
- [ ] Unhandled server errors appear in Sentry with context
- [ ] Basic performance tracing enabled for APIs/routes
- [ ] Source maps upload in CI/deploy
- **Implementation Notes:** Configure `sentry.*.config.*`, `next.config.*`, CI workflow.
- **Dependencies:** 006
- **Estimate:** M

### Task 008

- **ID:** 008
- **Feature Area:** Security
- **Title:** Add Upstash Redis rate limiter utility for public APIs
- **Context:** Public write endpoints require abuse protection.
- **Scope Included:** Generic limiter by IP+route key, local fallback behavior.
- **Scope Excluded:** Final tuning of all limits.
- **Acceptance Criteria:**
- [ ] Reusable rate limiter helper exists
- [ ] Exceeded requests return `429`
- [ ] Local dev works when Redis is unavailable
- **Implementation Notes:** Add `lib/security/rate-limit.ts`; define buckets for bookings/messages.
- **Dependencies:** 001
- **Estimate:** S

### Task 009

- **ID:** 009
- **Feature Area:** QA
- **Title:** Set up Vitest, RTL, Playwright, and baseline CI workflow
- **Context:** Critical flows require early automated quality gates.
- **Scope Included:** Test runners, smoke tests, GitHub Actions pipeline.
- **Scope Excluded:** Complete scenario coverage.
- **Acceptance Criteria:**
- [ ] Unit and e2e jobs run in CI
- [ ] Example passing unit and e2e smoke tests exist
- [ ] CI blocks merge on failing checks
- **Implementation Notes:** Configure `vitest.config.*`, `playwright.config.*`, `.github/workflows/ci.yml`.
- **Dependencies:** 001
- **Estimate:** M

### Task 009A

- **ID:** 009A
- **Feature Area:** DX
- **Title:** Repo hygiene: Prettier + lint-staged
- **Context:** Prevent messy PRs and enforce baseline quality.
- **Scope Included:** Formatting + pre-commit hooks.
- **Scope Excluded:** CI integration.
- **Acceptance Criteria:**
- [x] `prettier` runs
- [x] `lint-staged` runs on staged files
- **Implementation Notes:** Configure `lint-staged` to run `eslint --fix` + `prettier` on staged files.
- **Dependencies:** T-001
- **Estimate:** S

## Milestone 1 — Core Data Model & Inventory

### Task 010

- **ID:** 010
- **Feature Area:** Data
- **Title:** Model core entities in Prisma schema
- **Context:** Domain model must be explicit before feature work.
- **Scope Included:** `Property`, `UnitType`, `Unit`, `Booking`, `PriceSnapshot`, `PaymentIntent`, `PaymentTransaction`, `MessageThread`, `Message`, `AuditLog`.
- **Scope Excluded:** Non-MVP entities.
- **Acceptance Criteria:**
- [ ] Schema compiles and migration is generated
- [ ] Booking stores `currency` and integer monetary fields
- [ ] Single-property relation is explicit and future-extensible
- **Implementation Notes:** Edit `prisma/schema.prisma`; use enums for booking/payment lifecycles.
- **Dependencies:** 002
- **Estimate:** M

### Task 011

- **ID:** 011
- **Feature Area:** Booking
- **Title:** Add PostgreSQL exclusion constraint for non-overlapping bookings per unit
- **Context:** Robust double-booking prevention must be DB-enforced.
- **Scope Included:** Range-based exclusion constraint migration with status awareness.
- **Scope Excluded:** App-level locking mechanisms.
- **Acceptance Criteria:**
- [ ] Overlapping bookings for same unit are rejected by DB
- [ ] Non-overlapping bookings succeed
- [ ] `CANCELLED`/`COMPLETED` records do not block new bookings
- **Implementation Notes:** Use SQL migration with GiST and range type (`daterange` or `tstzrange`), include `btree_gist` if required.
- **Dependencies:** 010
- **Estimate:** M

### Task 012

- **ID:** 012
- **Feature Area:** Booking
- **Title:** Implement booking/payment status enums and transition guards
- **Context:** Lifecycle control prevents invalid state changes.
- **Scope Included:** Transition map and reusable guard helpers.
- **Scope Excluded:** API/UI wiring.
- **Acceptance Criteria:**
- [ ] Illegal transitions return typed domain errors
- [ ] MVP defaults to `paymentStatus=NOT_REQUIRED`
- [ ] Transition helpers have unit test coverage
- **Implementation Notes:** Add `lib/domain/booking-status.ts`, `tests/domain/booking-status.test.ts`.
- **Dependencies:** 010
- **Estimate:** S

### Task 013

- **ID:** 013
- **Feature Area:** Pricing
- **Title:** Implement PriceSnapshot creation at booking time
- **Context:** Price history must be immutable per booking.
- **Scope Included:** Snapshot generation from current room pricing with stored currency.
- **Scope Excluded:** Dynamic pricing engine.
- **Acceptance Criteria:**
- [ ] Booking creates immutable `PriceSnapshot`
- [ ] Monetary amounts are integer values
- [ ] Currency stored on both booking and snapshot
- **Implementation Notes:** Add logic in `lib/domain/pricing.ts` and `lib/domain/booking.ts`.
- **Dependencies:** 010
- **Estimate:** S

### Task 014

- **ID:** 014
- **Feature Area:** Inventory
- **Title:** Build availability query helpers and inventory repository
- **Context:** Listings and booking flows depend on consistent availability logic.
- **Scope Included:** Date-range availability queries by unit and unit type.
- **Scope Excluded:** Calendar UX components.
- **Acceptance Criteria:**
- [ ] Valid date range returns available units correctly
- [ ] Invalid date ranges are rejected
- [ ] Query performance is acceptable for MVP data size
- **Implementation Notes:** Add `lib/db/inventory-repo.ts`, `lib/domain/availability.ts`; handle same-day check-out/in boundary.
- **Dependencies:** 011
- **Estimate:** M

### Task 015

- **ID:** 015
- **Feature Area:** Data
- **Title:** Seed single-property inventory and baseline units
- **Context:** MVP needs seeded inventory for development and test consistency.
- **Scope Included:** One property, required unit categories, starter amenity metadata.
- **Scope Excluded:** Multi-property seed permutations.
- **Acceptance Criteria:**
- [ ] Seed creates exactly one property row
- [ ] At least one unit per category exists
- [ ] Seed is idempotent on rerun
- **Implementation Notes:** Implement in `prisma/seed.ts` with stable unique keys/slugs.
- **Dependencies:** 010
- **Estimate:** S

### Task 016

- **ID:** 016
- **Feature Area:** QA
- **Title:** Add concurrency tests for double-booking protection
- **Context:** Race-condition protection must be validated, not assumed.
- **Scope Included:** Parallel booking creation tests for overlapping and non-overlapping ranges.
- **Scope Excluded:** Browser e2e tests.
- **Acceptance Criteria:**
- [ ] Concurrent overlapping attempts result in one deterministic conflict
- [ ] Concurrent non-overlapping attempts succeed
- [ ] DB conflict maps to domain conflict error
- **Implementation Notes:** Add `tests/integration/booking-concurrency.test.ts`.
- **Dependencies:** 011, 012, 013, 014
- **Estimate:** M

## Milestone 2 — Listings & SEO Pages

### Task 017

- **ID:** 017
- **Feature Area:** Listings
- **Title:** Implement public layout, header, footer, and responsive navigation
- **Context:** Shared public UX scaffolding is needed before page-specific work.
- **Scope Included:** Public route layout and nav/footer components.
- **Scope Excluded:** Admin layouts.
- **Acceptance Criteria:**
- [ ] Header/footer match design requirements
- [ ] Primary CTA routes to reservation flow
- [ ] Mobile and desktop nav both function correctly
- **Implementation Notes:** Add `app/(public)/layout.tsx` and `components/public/*`.
- **Dependencies:** 003
- **Estimate:** M

### Task 018

- **ID:** 018
- **Feature Area:** Listings
- **Title:** Build landing page sections (hero, amenities, categories, featured rooms)
- **Context:** Landing page drives discovery and conversion.
- **Scope Included:** Hero, amenities, category blocks, featured inventory cards, static testimonial content.
- **Scope Excluded:** Dynamic reviews/ratings system.
- **Acceptance Criteria:**
- [ ] Hero and primary CTA render above fold
- [ ] Featured cards show image, room info, and XAF-formatted price
- [ ] Any testimonial section is static content only
- **Implementation Notes:** Build in `app/(public)/page.tsx` with server-side data fetch for featured units.
- **Dependencies:** 015, 017
- **Estimate:** M

### Task 019

- **ID:** 019
- **Feature Area:** Listings
- **Title:** Create rooms listing page with availability filters
- **Context:** Guests need filtered inventory discovery before booking.
- **Scope Included:** SSR room grid, date filters, availability badge states.
- **Scope Excluded:** Personalized ranking.
- **Acceptance Criteria:**
- [ ] `/rooms` renders server-side inventory list
- [ ] Date filters change availability results
- [ ] Empty-availability state is shown clearly
- **Implementation Notes:** Implement in `app/(public)/rooms/page.tsx` using `lib/domain/availability.ts`.
- **Dependencies:** 014, 017
- **Estimate:** M

### Task 020

- **ID:** 020
- **Feature Area:** Listings
- **Title:** Build room details page with gallery, amenities, and reserve CTA
- **Context:** Users need detailed room context before reservation.
- **Scope Included:** SSR room detail, image gallery, amenities, pricing, reserve CTA.
- **Scope Excluded:** Payment capture UI.
- **Acceptance Criteria:**
- [ ] `/rooms/[id]` renders room details and amenities
- [ ] Reserve CTA carries room/date context into checkout
- [ ] Invalid room id shows not-found state
- **Implementation Notes:** Implement in `app/(public)/rooms/[id]/page.tsx`; optimize Cloudinary images.
- **Dependencies:** 015, 017
- **Estimate:** M

### Task 021

- **ID:** 021
- **Feature Area:** SEO
- **Title:** Add metadata, Open Graph tags, sitemap, and robots
- **Context:** SEO-first requirement must be explicit and verifiable.
- **Scope Included:** Route metadata and search indexing primitives.
- **Scope Excluded:** Paid SEO tooling and backlink workflows.
- **Acceptance Criteria:**
- [ ] Landing, listing, and detail pages have title/description/OG metadata
- [ ] `/sitemap.xml` and `/robots.txt` are generated
- [ ] Canonical URLs are set for indexable pages
- **Implementation Notes:** Add `app/sitemap.ts`, `app/robots.ts`, and route metadata exports.
- **Dependencies:** 018, 019, 020
- **Estimate:** S

### Task 022

- **ID:** 022
- **Feature Area:** Performance
- **Title:** Optimize image handling and performance budgets for listing pages
- **Context:** Listing pages should meet target load performance.
- **Scope Included:** Responsive image sizing, lazy loading, format optimization.
- **Scope Excluded:** CDN vendor migration.
- **Acceptance Criteria:**
- [ ] Listing page baseline load remains under 2s in local benchmark
- [ ] Hero and card images use optimized delivery settings
- [ ] Layout shift is controlled for major visual elements
- **Implementation Notes:** Update image wrappers/components used by landing/listing/detail pages.
- **Dependencies:** 018, 019, 020
- **Estimate:** S

### Task 023

- **ID:** 023
- **Feature Area:** QA
- **Title:** Add e2e tests for listing discovery and room-detail navigation
- **Context:** Public funnel should be protected from regression.
- **Scope Included:** Landing -> listing -> details journey and empty-availability path.
- **Scope Excluded:** Booking submission.
- **Acceptance Criteria:**
- [ ] e2e covers room selection from listing to detail page
- [ ] e2e covers empty availability state
- [ ] Tests run in CI
- **Implementation Notes:** Add `tests/e2e/listings.spec.ts`.
- **Dependencies:** 019, 020, 021
- **Estimate:** S

## Milestone 3 — Booking Engine (Pay on Arrival)

### Task 024

- **ID:** 024
- **Feature Area:** Booking
- **Title:** Define booking API schemas with Zod
- **Context:** Booking contracts require strict validation and predictable errors.
- **Scope Included:** Guest details, dates, unit ID, currency, idempotency key.
- **Scope Excluded:** Online payment payload fields.
- **Acceptance Criteria:**
- [ ] Invalid booking payloads fail with stable field errors
- [ ] Currency defaults to XAF and validates against supported set
- [ ] Schemas are reused by API and service layer
- **Implementation Notes:** Add `lib/validation/booking.ts`.
- **Dependencies:** 005, 012
- **Estimate:** S

### Task 025

- **ID:** 025
- **Feature Area:** Payments
- **Title:** Implement payment provider interface and Pay-on-Arrival adapter
- **Context:** Payment abstraction is required even with MVP offline payment model.
- **Scope Included:** Provider contract, registry, Pay-on-Arrival implementation.
- **Scope Excluded:** Live Stripe/Mobile Money logic.
- **Acceptance Criteria:**
- [ ] `PaymentService` resolves provider by method key
- [ ] Pay-on-Arrival returns `NOT_REQUIRED` payment status
- [ ] Booking flow depends on provider interface, not concrete provider
- **Implementation Notes:** Add `lib/domain/payments/index.ts` and `lib/domain/payments/providers/payOnArrival.ts`.
- **Dependencies:** 010
- **Estimate:** M

### Task 026

- **ID:** 026
- **Feature Area:** Booking
- **Title:** Implement transactional BookingService reserve flow
- **Context:** Core booking workflow must enforce invariants consistently.
- **Scope Included:** Availability check, snapshot creation, booking insert, payment hook, idempotency.
- **Scope Excluded:** Admin-side lifecycle updates.
- **Acceptance Criteria:**
- [ ] Idempotency key returns same booking on retry
- [ ] Overlap conflicts map to domain conflict response
- [ ] Success persists booking, snapshot, and payment status atomically
- **Implementation Notes:** Build in `lib/domain/booking.ts`; use DB transaction and DB exclusion constraint as final guard.
- **Dependencies:** 011, 013, 024, 025
- **Estimate:** M

### Task 027

- **ID:** 027
- **Feature Area:** Booking
- **Title:** Implement `POST /bookings` endpoint with rate limiting
- **Context:** Public booking endpoint needs both correctness and abuse controls.
- **Scope Included:** Validation, limiter integration, service call, error mapping.
- **Scope Excluded:** Checkout UI.
- **Acceptance Criteria:**
- [ ] Returns 201 with booking identifier on success
- [ ] Returns 409 for overlap conflicts
- [ ] Returns 429 when rate limit is exceeded
- **Implementation Notes:** Add `app/api/bookings/route.ts`; include requestId and bookingId logging.
- **Dependencies:** 008, 024, 026
- **Estimate:** S

### Task 028

- **ID:** 028
- **Feature Area:** Booking
- **Title:** Build checkout/reservation UI for Pay on Arrival
- **Context:** MVP checkout must reserve without online payment.
- **Scope Included:** Guest details form, date/unit review, payment method selection fixed to pay-on-arrival.
- **Scope Excluded:** Card/mobile-money payment form fields.
- **Acceptance Criteria:**
- [ ] Checkout submits valid reservation payload
- [ ] UI explicitly states payment happens on arrival
- [ ] Loading and error states are handled
- **Implementation Notes:** Build under `app/(public)/checkout/page.tsx` or equivalent; prevent duplicate submit via idempotency key + disabled submit state.
- **Dependencies:** 019, 020, 027
- **Estimate:** M

### Task 029

- **ID:** 029
- **Feature Area:** Booking
- **Title:** Implement guest booking APIs (`/bookings/me`, `/bookings/:id`, cancel)
- **Context:** Guests need to view and manage their own reservations.
- **Scope Included:** Self-only booking retrieval and cancellation workflow.
- **Scope Excluded:** Refund processing.
- **Acceptance Criteria:**
- [ ] Guest can list/view only own bookings
- [ ] Cancel updates status and immediately releases availability
- [ ] Unauthorized access returns safe 403/404 responses
- **Implementation Notes:** Add `app/api/bookings/me/route.ts`, `app/api/bookings/[id]/route.ts`, `app/api/bookings/[id]/cancel/route.ts`; use transition guards.
- **Dependencies:** 012, 014, 026
- **Estimate:** M

### Task 030

- **ID:** 030
- **Feature Area:** QA
- **Title:** Add unit tests for BookingService and payment abstraction boundaries
- **Context:** Booking correctness and separation-of-concerns require direct unit coverage.
- **Scope Included:** Success, conflict, idempotent retry, provider contract tests.
- **Scope Excluded:** Browser e2e tests.
- **Acceptance Criteria:**
- [ ] BookingService unit tests cover success/conflict/idempotency
- [ ] Payment provider contract tests run against Pay-on-Arrival provider
- [ ] Test suite has no external payment dependency
- **Implementation Notes:** Add `tests/unit/booking-service.test.ts`, `tests/unit/payment-provider.test.ts`.
- **Dependencies:** 025, 026
- **Estimate:** M

### Task 031

- **ID:** 031
- **Feature Area:** QA
- **Title:** Add e2e tests for reserve-now and cancellation flow
- **Context:** Primary conversion path must be tested end-to-end.
- **Scope Included:** Room selection to reservation confirmation to cancellation.
- **Scope Excluded:** Online payment scenarios.
- **Acceptance Criteria:**
- [ ] e2e confirms booking creation with pay-on-arrival method
- [ ] e2e confirms cancellation frees availability
- [ ] Tests run in CI
- **Implementation Notes:** Add `tests/e2e/booking.spec.ts`.
- **Dependencies:** 028, 029
- **Estimate:** M

## Milestone 4 — Admin Portal

### Task 032

- **ID:** 032
- **Feature Area:** Admin
- **Title:** Build admin shell, navigation, and RBAC route guards
- **Context:** Admin workflows need secure boundaries and navigation structure.
- **Scope Included:** Admin layout, route guards, nav links.
- **Scope Excluded:** Detailed page functionality.
- **Acceptance Criteria:**
- [ ] Non-admins cannot access `/admin/*`
- [ ] Admin shell links to bookings, units, messages, audit
- [ ] Unauthorized admin access attempts are logged
- **Implementation Notes:** Add `app/(admin)/admin/layout.tsx`; reuse `lib/security/rbac.ts`.
- **Dependencies:** 004
- **Estimate:** S

### Task 033

- **ID:** 033
- **Feature Area:** Admin
- **Title:** Implement admin bookings list and lifecycle update workflow
- **Context:** Operations must manage booking lifecycle states.
- **Scope Included:** Booking list/filter UI and status update API.
- **Scope Excluded:** Financial analytics dashboard.
- **Acceptance Criteria:**
- [ ] Admin can filter bookings by status/date
- [ ] Status updates enforce allowed transitions
- [ ] Every mutation writes an audit log entry
- **Implementation Notes:** Build `app/(admin)/admin/bookings/*` and `app/api/admin/bookings/[id]/route.ts`.
- **Dependencies:** 012, 032
- **Estimate:** M

### Task 034

- **ID:** 034
- **Feature Area:** Admin
- **Title:** Implement units CRUD for inventory operations
- **Context:** Admin must maintain room inventory and availability.
- **Scope Included:** Create/edit/archive units and adjust base pricing metadata.
- **Scope Excluded:** Bulk import workflows.
- **Acceptance Criteria:**
- [ ] Admin can create and edit units
- [ ] Archived units are excluded from public availability results
- [ ] Unit mutations are audit-logged
- **Implementation Notes:** Build `app/(admin)/admin/units/*` and `app/api/admin/units/*`.
- **Dependencies:** 014, 032
- **Estimate:** M

### Task 035

- **ID:** 035
- **Feature Area:** Security
- **Title:** Implement centralized audit logging service for admin actions
- **Context:** Auditable admin behavior is a hard requirement.
- **Scope Included:** Audit write utility and enforced integration in admin mutations.
- **Scope Excluded:** External SIEM forwarding.
- **Acceptance Criteria:**
- [ ] Audit record stores actor, action, target, timestamp, metadata
- [ ] All admin mutating APIs call audit logger
- [ ] Audit write failures are captured in Sentry
- **Implementation Notes:** Add `lib/security/audit.ts`; wire into admin service/API methods.
- **Dependencies:** 010, 006, 007, 032
- **Estimate:** M

### Task 036

- **ID:** 036
- **Feature Area:** Admin
- **Title:** Add admin audit log viewer page
- **Context:** Teams need visibility into logged admin actions.
- **Scope Included:** Paginated audit log table with basic filters.
- **Scope Excluded:** Advanced analytics.
- **Acceptance Criteria:**
- [ ] Admin can browse audit records
- [ ] Filter by actor/action/date works
- [ ] Sensitive fields are redacted where needed
- **Implementation Notes:** Add `app/(admin)/admin/audit/page.tsx` and `app/api/admin/audit/route.ts`.
- **Dependencies:** 035
- **Estimate:** S

### Task 037

- **ID:** 037
- **Feature Area:** QA
- **Title:** Add admin RBAC and audit e2e coverage
- **Context:** Security-sensitive admin flows need e2e verification.
- **Scope Included:** Unauthorized denial tests and successful mutation+audit tests.
- **Scope Excluded:** Visual regression testing.
- **Acceptance Criteria:**
- [ ] Non-admin is blocked from admin routes/APIs
- [ ] Admin mutation produces corresponding audit record
- [ ] Tests run in CI
- **Implementation Notes:** Add `tests/e2e/admin.spec.ts`.
- **Dependencies:** 033, 034, 035, 036
- **Estimate:** M

## Milestone 5 — Messaging & Emails

### Task 038

- **ID:** 038
- **Feature Area:** Messaging
- **Title:** Implement messaging domain service and persistence wiring
- **Context:** Guest-admin communication is part of MVP core features.
- **Scope Included:** Thread creation and reply methods with role-aware access checks.
- **Scope Excluded:** Realtime messaging.
- **Acceptance Criteria:**
- [ ] Guest can create message thread tied to booking context
- [ ] Admin can reply within existing thread
- [ ] DB relations enforce thread-message integrity
- **Implementation Notes:** Add `lib/domain/messaging.ts`.
- **Dependencies:** 010, 032
- **Estimate:** M

### Task 039

- **ID:** 039
- **Feature Area:** Messaging
- **Title:** Expose guest/admin messaging APIs with validation and rate limiting
- **Context:** Messaging endpoints must be safe and abuse-resistant.
- **Scope Included:** `POST /messages`, admin message retrieval APIs, validation, limiter.
- **Scope Excluded:** File attachments.
- **Acceptance Criteria:**
- [ ] Message payloads are validated via Zod
- [ ] Guest message create endpoint is rate-limited
- [ ] APIs enforce thread access permissions
- **Implementation Notes:** Add `app/api/messages/route.ts`, `app/api/admin/messages/route.ts`.
- **Dependencies:** 005, 008, 038
- **Estimate:** M

### Task 040

- **ID:** 040
- **Feature Area:** Messaging
- **Title:** Build guest and admin messaging UI views
- **Context:** Messaging must be usable from both guest and admin sides.
- **Scope Included:** Guest send form/thread view and admin inbox/thread view.
- **Scope Excluded:** Typing indicators/realtime updates.
- **Acceptance Criteria:**
- [ ] Guest can send message from booking context
- [ ] Admin can list and open message threads
- [ ] Loading/error/empty states are implemented
- **Implementation Notes:** Build public booking-context components and `app/(admin)/admin/messages/*`.
- **Dependencies:** 039
- **Estimate:** M

### Task 041

- **ID:** 041
- **Feature Area:** Notifications
- **Title:** Implement transactional email templates and Resend integration
- **Context:** Booking and messaging events require transactional notifications.
- **Scope Included:** Booking confirmation, cancellation, new-message alert emails.
- **Scope Excluded:** Marketing email campaigns.
- **Acceptance Criteria:**
- [ ] React Email templates render correctly
- [ ] Booking create triggers confirmation email
- [ ] Email send failures are logged and captured in Sentry
- **Implementation Notes:** Build templates in `/emails/*`; integrate via `lib/domain/notifications.ts`.
- **Dependencies:** 007, 026, 038
- **Estimate:** M

### Task 042

- **ID:** 042
- **Feature Area:** QA
- **Title:** Add integration tests for messaging permissions and email triggers
- **Context:** Prevent unauthorized thread access and notification regressions.
- **Scope Included:** Messaging auth tests and mocked email dispatch assertions.
- **Scope Excluded:** Live provider integration tests.
- **Acceptance Criteria:**
- [ ] Unauthorized thread access test fails as expected
- [ ] Booking create/cancel trigger expected notification handlers
- [ ] Tests run in CI using deterministic mocks
- **Implementation Notes:** Add `tests/integration/messaging.test.ts`, `tests/integration/notifications.test.ts`.
- **Dependencies:** 039, 041
- **Estimate:** M

## Milestone 6 — PWA & Offline Support

### Task 043

- **ID:** 043
- **Feature Area:** PWA
- **Title:** Configure web app manifest and installability baseline
- **Context:** Installable PWA behavior is required for MVP.
- **Scope Included:** Manifest metadata, icons, display mode, theme color.
- **Scope Excluded:** Native app packaging.
- **Acceptance Criteria:**
- [ ] Manifest is served correctly
- [ ] Installability requirements are met in supported browsers
- [ ] App icons/theme color are configured
- **Implementation Notes:** Add `app/manifest.ts` and icon assets under `public/`.
- **Dependencies:** 017
- **Estimate:** S

### Task 044

- **ID:** 044
- **Feature Area:** PWA
- **Title:** Implement service-worker caching for offline booking-detail access
- **Context:** Offline access to booking details is a non-negotiable requirement.
- **Scope Included:** Cache booking-detail routes/data and critical static assets.
- **Scope Excluded:** Offline write queue for create/cancel actions.
- **Acceptance Criteria:**
- [ ] Previously viewed booking details are readable offline
- [ ] Uncached routes show graceful offline fallback
- [ ] Cache invalidation strategy is implemented and documented
- **Implementation Notes:** Configure service worker (`public/sw.js` or plugin config) and booking-detail fetch caching.
- **Dependencies:** 029, 043
- **Estimate:** M

### Task 045

- **ID:** 045
- **Feature Area:** PWA
- **Title:** Add global offline indicator and degraded UX states
- **Context:** Users need explicit connectivity feedback and safe action gating.
- **Scope Included:** Offline banner, disabled mutating actions when offline, fallback messaging.
- **Scope Excluded:** Background sync implementation.
- **Acceptance Criteria:**
- [ ] Offline indicator appears on connectivity loss
- [ ] Mutating actions clearly indicate internet requirement
- [ ] UX states align with design doc loading/error/offline guidance
- **Implementation Notes:** Add `components/system/offline-indicator.tsx` and integrate in shared layouts.
- **Dependencies:** 044
- **Estimate:** S

### Task 046

- **ID:** 046
- **Feature Area:** QA
- **Title:** Add e2e tests for installability and offline booking-detail access
- **Context:** Offline behavior must be verified in automated tests.
- **Scope Included:** Installability checks, cached/offline booking detail flow, uncached fallback check.
- **Scope Excluded:** Broad multi-browser matrix.
- **Acceptance Criteria:**
- [ ] e2e verifies offline render of previously opened booking details
- [ ] e2e verifies fallback behavior for uncached routes
- [ ] Tests run in CI or scheduled run with clear gating rules
- **Implementation Notes:** Add `tests/e2e/pwa-offline.spec.ts`.
- **Dependencies:** 044, 045
- **Estimate:** M

## Milestone 7 — Future-Ready Stubs (Payments, Multi-Currency)

### Task 047

- **ID:** 047
- **Feature Area:** Payments
- **Title:** Add Stripe and Mobile Money provider stubs behind payment interface
- **Context:** Future provider onboarding should not require booking refactors.
- **Scope Included:** Typed, non-live adapter stubs and registry wiring.
- **Scope Excluded:** Live payment API calls.
- **Acceptance Criteria:**
- [ ] Stub providers compile and register successfully
- [ ] Switching provider key does not require BookingService code changes
- [ ] Provider-specific details do not leak into booking domain logic
- **Implementation Notes:** Add `lib/domain/payments/providers/stripe.ts`, `lib/domain/payments/providers/momo.ts`.
- **Dependencies:** 025
- **Estimate:** S

### Task 048

- **ID:** 048
- **Feature Area:** Payments
- **Title:** Create webhook endpoint skeletons for Stripe and Mobile Money
- **Context:** API surface should be reserved for future payment rollout.
- **Scope Included:** Route stubs, placeholder signature validation contracts, structured logs.
- **Scope Excluded:** Actual booking/payment mutation logic from webhook events.
- **Acceptance Criteria:**
- [ ] `/api/webhooks/stripe` and `/api/webhooks/momo` routes exist
- [ ] Endpoints return safe not-implemented responses with logs
- [ ] Signature validation placeholders are documented in code
- **Implementation Notes:** Add `app/api/webhooks/stripe/route.ts` and `app/api/webhooks/momo/route.ts`.
- **Dependencies:** 007, 047
- **Estimate:** S

### Task 049

- **ID:** 049
- **Feature Area:** Currency
- **Title:** Harden currency invariants without enabling FX conversion
- **Context:** Future EUR/USD support needs schema readiness while preserving MVP scope.
- **Scope Included:** Supported currency enum paths and validation hardening.
- **Scope Excluded:** FX conversion, exchange-rate ingestion.
- **Acceptance Criteria:**
- [ ] Booking and snapshot enforce supported currency enum values
- [ ] Monetary amounts remain integer-only across all write paths
- [ ] No FX conversion logic exists in MVP code paths
- **Implementation Notes:** Update `prisma/schema.prisma`, `lib/validation/currency.ts`, and domain tests.
- **Dependencies:** 010, 013, 024
- **Estimate:** S

### Task 050

- **ID:** 050
- **Feature Area:** QA
- **Title:** Add contract tests for provider interchangeability and currency invariants
- **Context:** Future-readiness must be protected by automated tests.
- **Scope Included:** Shared payment-provider contract tests and currency invariant tests.
- **Scope Excluded:** Live third-party API integration tests.
- **Acceptance Criteria:**
- [ ] Any provider implementation must pass the shared contract suite
- [ ] Currency and integer amount invariants are validated in tests
- [ ] MVP default path (pay-on-arrival) remains green
- **Implementation Notes:** Add `tests/contract/payment-provider.contract.test.ts`, `tests/unit/currency.test.ts`.
- **Dependencies:** 047, 049
- **Estimate:** M

## Immediate Next Actions (Start Milestone 0)

1. Execute Task 001 and Task 002 to lock the strict TypeScript baseline and verify Prisma/Neon migration health.
2. Implement Task 005 and Task 008 next so validation and rate limiting are in place before public write endpoints.
3. Complete Task 009 immediately afterward to gate all subsequent milestones with CI, unit tests, and e2e smoke coverage.
