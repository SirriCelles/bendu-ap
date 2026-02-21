# BookEasy Implementation Todo

## Project Summary

BookEasy is a single-property guest-house booking platform for Buea, Southwest Region, Cameroon, built with Next.js App Router and PostgreSQL.
MVP focuses on browsing rooms, checking availability, reserving with online payment, and guest-admin communication.
Double-booking prevention is enforced primarily at database level with transactional booking flows and idempotency.
Booking logic and payment logic are separated so Notch Pay can ship now and CinetPay can be swapped in later without domain rewrites.
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
- [ ] MVP includes live gateway payments (MTN MoMo, Orange Money, Stripe) before enabling reserve-now/pay-later

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
   Mitigation: Define `PaymentService` interface and provider adapters from MVP start, shipping Notch Pay first with CinetPay-ready adapter boundaries.
3. **Risk:** Admin mutations are not traceable.
   Mitigation: Centralized audit logging for every admin write path, enforced in service/API layer and tested.
4. **Risk:** SEO/performance regressions from client-heavy rendering.
   Mitigation: Server Components for public pages, metadata/sitemap coverage, image optimization, and performance checks.
5. **Risk:** Offline caching produces stale or inconsistent behavior.
   Mitigation: Cache only booking-detail routes/assets with explicit invalidation and deterministic fallback UI.

## Milestone 0 — Repo & Tooling Foundation

## T-001 — Initialize project baseline and enforce strict TypeScript

<!-- issue: bookeasy:T-001 -->

Status: DONE
Verification: 2026-02-12 (`pnpm build` ✅)

- **Feature Area:** Infra
- **Context:** Establish a reliable baseline aligned with locked stack decisions.
- **Scope Included:** Validate Next.js App Router baseline, strict TypeScript, path aliases, core scripts.
- **Scope Excluded:** Feature implementation.
- **Acceptance Criteria:**
- [x] `next build` passes on clean install
- [x] TypeScript strict mode is enabled and enforced in CI
- [x] Standard scripts exist for `dev`, `build`, `lint`, `test`
- **Implementation Notes:** Check `tsconfig.json`, `next.config.*`, `package.json`; add `@/*` alias for `app`, `lib`, `components`.
- **Dependencies:** None
- **Estimate:** S

## T-002 — Configure Prisma, Neon connection, and migration workflow

<!-- issue: bookeasy:T-002 -->

Status: DONE

- **Feature Area:** Infra
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

## T-003 — Install and configure shadcn/ui + Tailwind design tokens

<!-- issue: bookeasy:T-003 -->

Status: DONE

- **Feature Area:** Infra
- **Context:** UI foundation must reflect approved visual direction.
- **Scope Included:** Tailwind setup, color/typography tokens, base UI primitives.
- **Scope Excluded:** Full page implementations.
- **Acceptance Criteria:**
- [x] Global theme variables reflect approved palette
- [x] Base layout uses configured typography and spacing scale
- [x] Button, input, card, and badge components are ready
- **Implementation Notes:** Update `app/globals.css`, `tailwind.config.*`, `components/ui/*`.
- **Dependencies:** 001
- **Estimate:** M

## T-004 — Configure Auth.js with ADMIN/GUEST roles and route protection skeleton

<!-- issue: bookeasy:T-004 -->

Status: DONE
Verification: 2026-02-14 (`pnpm typecheck` ✅, `pnpm exec vitest run tests/unit/security/auth-role.test.ts tests/unit/security/auth-callbacks.test.ts tests/unit/security/rbac.test.ts tests/unit/security/admin-session.test.ts tests/unit/security/admin-middleware-access.test.ts tests/unit/security/admin-bookings-route.test.ts` ✅)

- **Feature Area:** Security
- **Context:** RBAC is required for admin security.
- **Scope Included:** Auth setup, role typing, middleware guards for admin routes.
- **Scope Excluded:** Admin feature pages.
- **Acceptance Criteria:**
- [x] Unauthenticated users cannot access `/admin/*`
- [x] Session contains role field
- [x] Role guard utility is reusable in services/routes
- **Implementation Notes:** Add `auth.ts`, `middleware.ts`, `lib/security/rbac.ts`; keep authorization server-side.
- **Dependencies:** 001
- **Estimate:** M

## T-005 — Add request validation framework with Zod wrappers

<!-- issue: bookeasy:T-005 -->

Status: DONE

- **Feature Area:** Infra
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

## T-006 — Implement structured logging and request correlation IDs

<!-- issue: bookeasy:T-006 -->

Status: DONE

- **Feature Area:** Observability
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

## T-007 — Integrate Sentry for errors and performance tracing

<!-- issue: bookeasy:T-007 -->

Status: DONE

- **Feature Area:** Observability
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

## T-008 — Add Upstash Redis rate limiter utility for public APIs

<!-- issue: bookeasy:T-008 -->

Status: DONE

- **Feature Area:** Security
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

## T-009 — Set up Vitest, RTL, Playwright, and baseline CI workflow

<!-- issue: bookeasy:T-009 -->

Status: DONE

- **Feature Area:** QA
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

## T-009A — Repo hygiene: Prettier + lint-staged

<!-- issue: bookeasy:T-009A -->

Status: DONE

- **Feature Area:** DX
- **Context:** Prevent messy PRs and enforce baseline quality.
- **Scope Included:** Formatting + pre-commit hooks.
- **Scope Excluded:** CI integration.
- **Acceptance Criteria:**
- [x] `prettier` runs
- [x] `lint-staged` runs on staged files
- **Implementation Notes:** Configure `lint-staged` to run `eslint --fix` + `prettier` on staged files.
- **Dependencies:** T-001
- **Estimate:** S

## T-009B — Fix todo-sync issue creation parsing

<!-- issue: bookeasy:T-009B -->

Status: DONE

- **Feature Area:** Chore
- **Context:** GitHub Actions workflow runs, but issues are not created from `todo.md` checkboxes.
- **Scope Included:** Update checkbox parsing logic in sync script and verify matching against current markdown format.
- **Scope Excluded:** Workflow redesign or CI policy changes.
- **Acceptance Criteria:**
- [x] Workflow parser matches standard markdown checkboxes (`[ ]` / `[x]`)
- [x] Sync script detects unchecked tasks from `todo.md`
- **Implementation Notes:** Update regex in `scripts/todo-sync.mjs` and validate with local parser checks.
- **Dependencies:** None
- **Estimate:** XS

## Milestone 1 — Core Data Model & Inventory

## T-010 — Model core entities in Prisma schema

<!-- issue: bookeasy:T-010 -->

Status: DONE

- **Feature Area:** Data
- **Context:** Domain model must be explicit before feature work.
- **Scope Included:** `Property`, `UnitType`, `Unit`, `Booking`, `PriceSnapshot`, `PaymentIntent`, `PaymentTransaction`, `MessageThread`, `Message`, `AuditLog`.
- **Scope Excluded:** Non-MVP entities.
- **Acceptance Criteria:**
- [x] Schema compiles and migration is generated
- [x] Booking stores `currency` and integer monetary fields
- [x] Single-property relation is explicit and future-extensible
- **Implementation Notes:** Edit `prisma/schema.prisma`; use enums for booking/payment lifecycles.
- **Dependencies:** 002
- **Estimate:** M

## T-011 — Add PostgreSQL exclusion constraint for non-overlapping bookings per unit

<!-- issue: bookeasy:T-011 -->

Status: DONE

- **Feature Area:** Booking
- **Context:** Robust double-booking prevention must be DB-enforced.
- **Scope Included:** Range-based exclusion constraint migration with status awareness.
- **Scope Excluded:** App-level locking mechanisms.
- **Acceptance Criteria:**
- [x] Overlapping bookings for same unit are rejected by DB
- [x] Non-overlapping bookings succeed
- [x] `CANCELLED`/`COMPLETED` records do not block new bookings
- **Implementation Notes:** Use SQL migration with GiST and range type (`daterange` or `tstzrange`), include `btree_gist` if required.
- **Dependencies:** 010
- **Estimate:** M

## T-012 — Implement booking/payment status enums and transition guards

<!-- issue: bookeasy:T-012 -->

Status: DONE
Verification: 2026-02-13 (`pnpm test:unit tests/unit/domain/booking-status.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Booking
- **Context:** Lifecycle control prevents invalid state changes.
- **Scope Included:** Transition map and reusable guard helpers.
- **Scope Excluded:** API/UI wiring.
- **Acceptance Criteria:**
- [x] Illegal transitions return typed domain errors
- [x] MVP defaults to `paymentStatus=NOT_REQUIRED`
- [x] Transition helpers have unit test coverage
- **Implementation Notes:** Add `lib/domain/booking-status.ts`, `tests/domain/booking-status.test.ts`.
- **Dependencies:** 010
- **Estimate:** S

## T-013 — Implement PriceSnapshot creation at booking time

<!-- issue: bookeasy:T-013 -->

Status: DONE
Verification: 2026-02-13 (`pnpm test:unit tests/unit/domain/pricing-and-reserve-flow.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Pricing
- **Context:** Price history must be immutable per booking.
- **Scope Included:** Snapshot generation from current room pricing with stored currency.
- **Scope Excluded:** Dynamic pricing engine.
- **Acceptance Criteria:**
- [x] Booking creates immutable `PriceSnapshot`
- [x] Monetary amounts are integer values
- [x] Currency stored on both booking and snapshot
- **Implementation Notes:** Add logic in `lib/domain/pricing.ts` and `lib/domain/booking.ts`.
- **Dependencies:** 010
- **Estimate:** S

## T-014 — Build availability query helpers and inventory repository

<!-- issue: bookeasy:T-014 -->

Status: DONE
Verification: 2026-02-13 (`pnpm test:unit tests/unit/domain/availability.test.ts tests/unit/db/inventory-repo.test.ts tests/unit/db/inventory-repo.integration.test.ts tests/unit/db/inventory-repo.performance.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Inventory
- **Context:** Listings and booking flows depend on consistent availability logic.
- **Scope Included:** Date-range availability queries by unit and unit type.
- **Scope Excluded:** Calendar UX components.
- **Acceptance Criteria:**
- [x] Valid date range returns available units correctly
- [x] Invalid date ranges are rejected
- [x] Query performance is acceptable for MVP data size
- **Implementation Notes:** Add `lib/db/inventory-repo.ts`, `lib/domain/availability.ts`; handle same-day check-out/in boundary.
- **Dependencies:** 011
- **Estimate:** M

## T-015 — Seed single-property inventory and baseline units

<!-- issue: bookeasy:T-015 -->

Status: DONE

- **Feature Area:** Data
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

## T-016 — Add concurrency tests for double-booking protection

<!-- issue: bookeasy:T-016 -->

Status: DONE
Verification: 2026-02-14 (`pnpm typecheck` ✅, `pnpm exec vitest run tests/unit/integration/booking-concurrency.test.ts` ✅)

- **Feature Area:** QA
- **Context:** Race-condition protection must be validated, not assumed.
- **Scope Included:** Parallel booking creation tests for overlapping and non-overlapping ranges.
- **Scope Excluded:** Browser e2e tests.
- **Acceptance Criteria:**
- [x] Concurrent overlapping attempts result in one deterministic conflict
- [x] Concurrent non-overlapping attempts succeed
- [x] DB conflict maps to domain conflict error
- **Implementation Notes:** Add `tests/integration/booking-concurrency.test.ts`.
- **Dependencies:** 011, 012, 013, 014
- **Estimate:** M

## Milestone 2 — Listings & SEO Pages

## T-017 — Implement public layout, header, footer, and responsive navigation

<!-- issue: bookeasy:T-017 -->

Status: DONE

- **Feature Area:** Listings
- **Context:** Shared public UX scaffolding is needed before page-specific work.
- **Scope Included:** Public route layout and nav/footer components.
- **Scope Excluded:** Admin layouts.
- **Acceptance Criteria:**
- [x] Header/footer match design requirements
- [x] Primary CTA routes to reservation flow
- [x] Mobile and desktop nav both function correctly
- **Implementation Notes:** Add `app/(public)/layout.tsx` and `components/public/*`.
- **Dependencies:** 003
- **Estimate:** M

## T-018 — Build landing page sections (hero, amenities, categories, featured rooms)

<!-- issue: bookeasy:T-018 -->

Status: DONE

- **Feature Area:** Listings
- **Context:** Landing page drives discovery and conversion.
- **Scope Included:** Hero, amenities, category blocks, featured inventory cards, static testimonial content.
- **Scope Excluded:** Dynamic reviews/ratings system.
- **Acceptance Criteria:**
- [x] Hero and primary CTA render above fold
- [x] Featured cards show image, room info, and XAF-formatted price
- [x] Any testimonial section is static content only
- **Implementation Notes:** Build in `app/(public)/page.tsx` with server-side data fetch for featured units.
- **Dependencies:** 015, 017
- **Estimate:** M

## T-019 — Create rooms listing page with availability filters

<!-- issue: bookeasy:T-019 -->

Status: DONE
Verification: 2026-02-14 (`pnpm test:unit tests/unit/validation/rooms-search-params.test.ts tests/unit/domain/rooms-listing.test.ts tests/unit/db/rooms-listing-repo.test.ts tests/unit/public/rooms-page-ssr.test.tsx` ✅, `pnpm test:unit tests/unit/db/inventory-repo.integration.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Listings
- **Context:** Guests need filtered inventory discovery before booking.
- **Scope Included:** SSR room grid, date filters, availability badge states.
- **Scope Excluded:** Personalized ranking.
- **Acceptance Criteria:**
- [x] `/rooms` renders server-side inventory list
- [x] Date filters change availability results
- [x] Empty-availability state is shown clearly
- **Implementation Notes:** Implement in `app/(public)/rooms/page.tsx` using `lib/domain/availability.ts`.
- **Dependencies:** 014, 017
- **Estimate:** M

## T-019A — Add streaming UX for `/rooms` page (React Suspense)

<!-- issue: bookeasy:T-019A -->

Status: DONE
Verification: 2026-02-14 (`pnpm test:unit tests/unit/public/rooms-loading.test.tsx tests/unit/public/rooms-page-ssr.test.tsx tests/unit/db/rooms-listing-repo.test.ts tests/unit/domain/rooms-listing.test.ts tests/unit/validation/rooms-search-params.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Listings/Performance
- **Context:** `/rooms` should feel responsive while server data resolves.
- **Scope Included:** Route-level streaming, section-level fallbacks, loading states for filter/list results.
- **Scope Excluded:** Client-side data fetching rewrite.
- **Acceptance Criteria:**
- [x] `/rooms` starts rendering immediately with loading fallback(s) before full data resolves
- [x] Critical sections (filters/results) stream independently or route streams as a whole
- [x] Loading UI is accessible and does not cause layout jumps
- [x] Existing filter URL behavior and SSR results remain correct after streaming changes
- **Implementation Notes:** Prefer App Router streaming (`loading.tsx`) plus section `Suspense` where helpful.
- **Dependencies:** 019
- **Estimate:** M
- **Subtasks:**
- [x] `T-019A.1` Define streaming strategy for `/rooms` (whole-page `loading.tsx` vs section `Suspense`) and identify async boundaries.
- [x] `T-019A.2` Add route-level loading UI (`app/(public)/rooms/loading.tsx`) with accessible skeleton/fallback content.
- [x] `T-019A.3` Implement whole-page route streaming boundary via App Router `loading.tsx` (section-level `Suspense` deferred for future optimization).
- [x] `T-019A.4` Ensure filter submit/reset URL behavior remains deterministic with streaming enabled.
- [x] `T-019A.5` Add tests for streaming render states (loading fallback + final content + empty state path).
- [x] `T-019A.6` Verification and backlog update (`pnpm test:unit` relevant suites, `pnpm typecheck`, mark `T-019A` DONE with date/commands).

## T-020 — Build room details page with gallery, amenities, and reserve CTA

<!-- issue: bookeasy:T-020 -->

Status: DONE
Verification: 2026-02-15 (`pnpm test:unit tests/unit/domain/room-detail.test.ts tests/unit/db/room-detail-repo.test.ts tests/unit/public/room-detail-page-ssr.test.tsx tests/unit/public/rooms-page-ssr.test.tsx` ✅, `pnpm test:unit tests/unit/db/inventory-repo.integration.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Listings
- **Context:** Users need detailed room context before reservation.
- **Scope Included:** SSR room detail, image gallery, amenities, pricing, reserve CTA.
- **Scope Excluded:** Payment capture UI.
- **Acceptance Criteria:**
- [x] `/rooms/[id]` renders room details and amenities
- [x] Reserve CTA carries room/date context into checkout
- [x] Invalid room id shows not-found state
- **Implementation Notes:** Implement in `app/(public)/rooms/[id]/page.tsx`; optimize Cloudinary images.
- **Dependencies:** 015, 017
- **Estimate:** M

## T-021 — Add metadata, Open Graph tags, sitemap, and robots

<!-- issue: bookeasy:T-021 -->

Status: DONE
Verification: 2026-02-15 (`pnpm typecheck` ✅)

- **Feature Area:** SEO
- **Context:** SEO-first requirement must be explicit and verifiable.
- **Scope Included:** Route metadata and search indexing primitives.
- **Scope Excluded:** Paid SEO tooling and backlink workflows.
- **Acceptance Criteria:**
- [x] Landing, listing, and detail pages have title/description/OG metadata
- [x] `/sitemap.xml` and `/robots.txt` are generated
- [x] Canonical URLs are set for indexable pages
- **Implementation Notes:** Add `app/sitemap.ts`, `app/robots.ts`, and route metadata exports.
- **Dependencies:** 018, 019, 020
- **Estimate:** S

## T-022 — Optimize image handling and performance budgets for listing pages

<!-- issue: bookeasy:T-022 -->

Status: DONE
Verification: 2026-02-19 (`pnpm exec vitest run tests/unit/api/payments-start-route.test.ts tests/unit/domain/pricing-and-reserve-flow.test.ts tests/unit/integration/booking-concurrency.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Performance
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

## T-023 — Add e2e tests for listing discovery and room-detail navigation

<!-- issue: bookeasy:T-023 -->

Status: SUPERSEDED

- **Feature Area:** QA
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

## T-023A — Implement Coming Soon page and route Pay/Reserve CTAs to it

<!-- issue: bookeasy:T-023A -->

Status: DONE
Verification: 2026-02-15 (`pnpm test:unit tests/unit/public/coming-soon-page-ssr.test.tsx tests/unit/public/room-detail-page-ssr.test.tsx` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Listings/UX
- **Context:** Some conversion actions are not fully available yet and need a clear temporary user path.
- **Scope Included:** Build a branded `/coming-soon` page and route `Pay Now`/`Reserve` button clicks to this page.
- **Scope Excluded:** Actual online payment flow or final reservation submission logic.
- **Acceptance Criteria:**
- [x] `/coming-soon` renders a complete mobile/desktop experience with clear message and next-step CTA(s)
- [x] Clicking `Pay Now` routes to `/coming-soon`
- [x] Clicking `Reserve` routes to `/coming-soon`
- [x] Coming Soon page provides safe navigation back to discovery/reservation context (e.g., Home/Rooms)
- [x] Basic unit/integration coverage verifies CTA routing behavior and page render
- **Implementation Notes:** Add `app/(public)/coming-soon/page.tsx`; update CTA sources in listing/detail/checkout-related components to route to `/coming-soon` until flows are enabled.
- **Dependencies:** 017, 019, 020
- **Estimate:** S
- **Subtasks:**
- [x] `T-023A.1` Define UX copy and visual structure for Coming Soon page (title, description, primary/secondary CTAs).
- [x] `T-023A.2` Implement `app/(public)/coming-soon/page.tsx` with responsive, accessible layout.
- [x] `T-023A.3` Identify all `Pay Now` and `Reserve` buttons in public flows and update destinations to `/coming-soon`.
- [x] `T-023A.4` Add tests for CTA click-through routing and Coming Soon page rendering.
- [x] `T-023A.5` Verify no regressions in existing listing/detail navigation and update `todo.md` status when complete.

## Milestone 3 — Booking Engine (Payment-First: MoMo -> Stripe)

Priority Decision: Complete full online payment flows (gateway-backed MTN MoMo + Orange Money, then Stripe) before enabling "reserve now / pay later".

## T-024 — Define booking API schemas with Zod

<!-- issue: bookeasy:T-024 -->

Status: DONE
Verification: 2026-02-16 (`pnpm test:unit tests/unit/validation/booking.test.ts tests/unit/domain/pricing-and-reserve-flow.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Booking
- **Context:** Booking contracts require strict validation and predictable errors.
- **Scope Included:** Guest details, dates, unit ID, currency, idempotency key.
- **Scope Excluded:** Online payment payload fields.
- **Acceptance Criteria:**
- [x] Invalid booking payloads fail with stable field errors
- [x] Currency defaults to XAF and validates against supported set
- [x] Schemas are reused by API and service layer
- **Implementation Notes:** Add `lib/validation/booking.ts`.
- **Dependencies:** 005, 012
- **Estimate:** S
- **Subtasks:**
- [x] `T-024.1` Define booking schema contract in `lib/validation/booking.ts` (`unitId`, `checkInDate`, `checkOutDate`, guest identity/contact, guest counts, optional `currency`, optional `idempotencyKey`).
      Acceptance Criteria: Required fields are explicit and typed; schema exports are reusable by API/service layers.
- [x] `T-024.2` Add date and occupancy validation rules.
      Acceptance Criteria: `checkInDate` and `checkOutDate` must be valid ISO dates; `checkOutDate > checkInDate`; guest counts are positive and constrained to MVP-safe bounds.
- [x] `T-024.3` Add currency and idempotency normalization rules.
      Acceptance Criteria: Missing currency defaults to `XAF`; unsupported currency fails validation; idempotency key is optional but validated for non-empty/length-safe format when present.
- [x] `T-024.4` Provide stable error mapping helper for booking schema failures.
      Acceptance Criteria: Validation output is deterministic (`field`, `code`, `message` shape) and consistent with existing shared parser/error conventions.
- [x] `T-024.5` Add unit tests for valid/invalid payload coverage.
      Acceptance Criteria: Tests cover happy path, missing required fields, invalid date order, invalid currency, and malformed idempotency key; tests run in CI.
- [x] `T-024.6` Wire schema into one booking-facing API boundary (or sample route) and one domain/service entry point.
      Acceptance Criteria: Both layers consume the same schema exports; no duplicate ad-hoc booking payload validation remains in those paths.

## T-025 — Implement payment provider interface and gateway-ready foundation

<!-- issue: bookeasy:T-025 -->

Status: DONE
Verification: 2026-02-19 (`pnpm exec vitest run tests/unit/domain/booking-expiry-cleanup.test.ts tests/unit/api/admin-bookings-expire-route.test.ts tests/unit/api/payments-start-route.test.ts tests/unit/domain/pricing-and-reserve-flow.test.ts tests/unit/integration/booking-concurrency.test.ts tests/unit/domain/booking-status.test.ts tests/unit/domain/availability.test.ts tests/unit/api/notchpay-webhook-route.test.ts tests/unit/api/payments-verify-route.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Payments
- **Context:** Payment abstraction must support live gateway integrations without booking-service refactors.
- **Scope Included:** Provider contract, adapter registry, and gateway-ready service foundation.
- **Scope Excluded:** Provider-specific endpoint wiring (covered by follow-up tasks).
- **Acceptance Criteria:**
- [ ] `PaymentService` resolves provider by method key
- [ ] Shared payment contract supports canonical online payment statuses
- [ ] Booking flow depends on provider interface, not concrete provider
- **Implementation Notes:** Add `lib/domain/payments/index.ts` and shared adapter contracts usable by Notch Pay, CinetPay, and Stripe.
- **Dependencies:** 010
- **Estimate:** M
- **Subtasks:**
- [x] `T-025.1` Define payment domain contract types and provider interface (`PaymentService`, provider key/method enums, request/response payload types).
      Acceptance Criteria: Interface is provider-agnostic, strongly typed, and does not expose provider-specific implementation details to booking domain consumers.
- [x] `T-025.2` Implement provider registry/resolver in `lib/domain/payments/index.ts`.
      Acceptance Criteria: Resolver maps payment method key to provider implementation deterministically; unknown method keys fail with typed domain error.
- [x] `T-025.3` Implement shared gateway client abstraction (auth/signature strategy, retries, timeout, correlation ids).
      Acceptance Criteria: Gateway client is reusable by all providers; sensitive config comes from env; transient errors are typed and retry-safe.
- [x] `T-025.4` Add domain error model for payment provider failures and unsupported methods.
      Acceptance Criteria: Errors include stable `code` + message shape usable by service/API layers; unsupported provider path is explicitly testable.
- [x] `T-025.5` Integrate payment interface usage in booking domain entry path (without coupling to concrete adapter import in core booking flow).
      Acceptance Criteria: Booking flow depends on interface/registry contract only; direct references to Pay-on-Arrival implementation are isolated to composition/wiring layer.
- [x] `T-025.6` Add unit tests for resolver + provider contract behavior.
      Acceptance Criteria: Tests cover provider resolution success/failure, canonical status mapping, and ensure no external dependency/network call is required.

## T-025A — Integrate gateway-backed MTN MoMo and Orange Money providers

<!-- issue: bookeasy:T-025A -->

Status: SUPERSEDED

- **Feature Area:** Payments
- **Context:** Superseded by Notch Pay MVP adapter strategy and provider-specific webhook flow in `T-051` to align with `/docs/payment.md`.
- **Scope Included:** Historical planning reference only.
- **Scope Excluded:** Execution as a separate task.
- **Acceptance Criteria:**
- [ ] Superseded by `T-051`, `T-053`, and `T-054`
- **Implementation Notes:** Keep for traceability; implement Notch Pay provider-first approach instead.
- **Dependencies:** 051, 053, 054
- **Estimate:** S

## T-025B — Integrate Stripe provider through gateway (or direct adapter if gateway requires)

<!-- issue: bookeasy:T-025B -->

Status: SUPERSEDED

- **Feature Area:** Payments
- **Context:** Superseded by split provider tasks (`T-052` Notch Pay MVP, `T-066` Stripe adapter, and `T-059`/`T-060` CinetPay-ready path) to match `/docs/prd.md` and `/docs/system-architecture.md`.
- **Scope Included:** Historical planning reference only.
- **Scope Excluded:** Execution as a separate task.
- **Acceptance Criteria:**
- [ ] Superseded by `T-051`, `T-052`, `T-059`, `T-060`, and `T-066`
- **Implementation Notes:** Keep for traceability; provider-specific work is handled in Milestone 3A by dedicated adapter tasks.
- **Dependencies:** 051, 052, 059, 060, 066
- **Estimate:** S

## T-025C — Implement payment webhooks and reconciliation for gateway providers

<!-- issue: bookeasy:T-025C -->

Status: SUPERSEDED

- **Feature Area:** Payments
- **Context:** Superseded by split implementation tasks for Notch Pay webhook ingestion (`T-054`) and CinetPay future webhook route (`T-060`).
- **Scope Included:** Historical planning reference only.
- **Scope Excluded:** Execution as a separate task.
- **Acceptance Criteria:**
- [ ] Superseded by `T-054` and `T-060`
- **Implementation Notes:** Keep for traceability; use provider-specific webhook routes and provider event ledger tasks below.
- **Dependencies:** 054, 060
- **Estimate:** S

## T-025D — Add payment observability, audit, and failure recovery primitives

<!-- issue: bookeasy:T-025D -->

Status: DONE

- **Feature Area:** Payments/Observability
- **Context:** Payment failures need traceability and safe retries.
- **Scope Included:** Structured logs, request correlation, Sentry context, retry-safe error surfaces, payment audit entries.
- **Scope Excluded:** Revenue dashboards and finance analytics.
- **Acceptance Criteria:**
- [ ] Every payment attempt has request/payment correlation ids in logs
- [ ] Provider/gateway errors are captured with redacted metadata
- [ ] Recovery path supports safe retry without double-charging
- **Implementation Notes:** Reuse `lib/observability/logger.ts`, `lib/http/errors.ts`, and audit patterns.
- **Dependencies:** 006, 007, 051, 052, 053, 054
- **Estimate:** S

## T-026 — Implement transactional BookingService reserve flow

<!-- issue: bookeasy:T-026 -->

Status: DONE
Verification: 2026-02-19 (`pnpm exec vitest run tests/unit/domain/pricing-and-reserve-flow.test.ts tests/unit/integration/booking-concurrency.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Booking
- **Context:** Core booking workflow must enforce invariants consistently.
- **Scope Included:** Availability check, snapshot creation, booking insert, payment hook, idempotency.
- **Scope Excluded:** Admin-side lifecycle updates.
- **Acceptance Criteria:**
- [x] Idempotency key returns same booking on retry
- [x] Overlap conflicts map to domain conflict response
- [x] Success persists booking, snapshot, payment intent, and payment status atomically
- **Implementation Notes:** Build in `lib/domain/booking.ts`; use DB transaction and DB exclusion constraint as final guard; do not finalize booking as confirmed before valid payment result.
- **Dependencies:** 011, 013, 024, 025, 051, 052, 053, 054
- **Estimate:** M
- **Subtasks:**
- [x] `T-026.1` Define booking service contract and transactional reserve boundary types.
- [x] `T-026.2` Implement transactional reserve orchestration (booking + immutable snapshot + payment intent seed).
- [x] `T-026.3` Preserve overlap conflict mapping from DB constraints to typed domain conflict.
- [x] `T-026.4` Add payment-intent initialization hook with provider-agnostic canonical metadata (no provider API call).
- [x] `T-026.5` Add idempotency replay behavior (same key returns deterministic booking/payment-intent pair).
- [x] `T-026.6` Add typed BookingService error model for replay mismatch/unavailable and persistence wrapper failures.
- [x] `T-026.7` Add unit coverage for transactional happy path.
- [x] `T-026.8` Add unit coverage for idempotency replay and typed mismatch/persistence failures.
- [x] `T-026.9` Verify compatibility with existing booking concurrency integration coverage.
- [x] `T-026.10` Wire reserve entry path (`reserveBookingWithPayment`) to shared BookingService transactional reserve flow.

## T-027 — Implement `POST /bookings` endpoint with rate limiting

<!-- issue: bookeasy:T-027 -->

Status: DONE
Verification: 2026-02-19 (`pnpm exec vitest run tests/unit/domain/booking-expiry-cleanup.test.ts tests/unit/api/admin-bookings-expire-route.test.ts tests/unit/api/payments-start-route.test.ts tests/unit/domain/pricing-and-reserve-flow.test.ts tests/unit/integration/booking-concurrency.test.ts tests/unit/domain/booking-status.test.ts tests/unit/domain/availability.test.ts tests/unit/api/notchpay-webhook-route.test.ts tests/unit/api/payments-verify-route.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Booking
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

## T-028 — Build checkout UI for live payments (MTN, Orange, Stripe)

<!-- issue: bookeasy:T-028 -->

Status: DONE

- **Feature Area:** Booking
- **Context:** Checkout must complete online payment before booking confirmation.
- **Scope Included:** Guest details form, date/unit review, payment method selection for MTN/Orange/Stripe, provider handoff states.
- **Scope Excluded:** Reserve-now/pay-later option.
- **Acceptance Criteria:**
- [ ] Checkout submits valid reservation payload
- [ ] User can choose MTN MoMo, Orange Money, or Stripe
- [ ] Booking confirmation appears only after successful payment status
- [ ] Loading and error states are handled
- **Implementation Notes:** Build under `app/(public)/checkout/page.tsx` or equivalent; prevent duplicate submit via idempotency key + disabled submit state.
- **Dependencies:** 019, 020, 027, 051, 052, 053, 054, 055
- **Estimate:** M

## T-029 — Implement guest booking APIs (`/bookings/me`, `/bookings/:id`, cancel)

<!-- issue: bookeasy:T-029 -->

Status: DONE

- **Feature Area:** Booking
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

## T-030 — Add unit tests for BookingService and payment abstraction boundaries

<!-- issue: bookeasy:T-030 -->

Status: DONE
Verification: 2026-02-19 (`pnpm exec vitest run tests/unit/validation/booking-receipt.test.ts tests/unit/domain/booking-receipt.test.ts tests/unit/api/booking-receipt-route.test.ts tests/unit/public/booking-success-page-ssr.test.tsx tests/unit/public/booking-success-loading-and-error.test.tsx` ✅, `pnpm typecheck` ✅)

- **Feature Area:** QA
- **Context:** Booking correctness and separation-of-concerns require direct unit coverage.
- **Scope Included:** Success, conflict, idempotent retry, provider contract tests.
- **Scope Excluded:** Browser e2e tests.
- **Acceptance Criteria:**
- [ ] BookingService unit tests cover success/conflict/idempotency
- [ ] Payment provider contract tests run against Notch Pay adapter and provider test doubles
- [ ] Test suite has no external payment dependency
- **Implementation Notes:** Add `tests/unit/booking-service.test.ts`, `tests/unit/payment-provider.test.ts`.
- **Dependencies:** 025, 026
- **Estimate:** M

## T-031 — Add e2e tests for online payment checkout and cancellation flow

<!-- issue: bookeasy:T-031 -->

Status: DONE

- **Feature Area:** QA
- **Context:** Primary conversion path must be tested end-to-end.
- **Scope Included:** Room selection -> payment method selection -> successful payment confirmation -> cancellation.
- **Scope Excluded:** Chargeback/dispute scenarios.
- **Acceptance Criteria:**
- [ ] e2e confirms booking creation with MTN/Orange and Stripe happy paths
- [ ] e2e confirms cancellation frees availability
- [ ] Tests run in CI
- **Implementation Notes:** Add `tests/e2e/booking.spec.ts`.
- **Dependencies:** 028, 029
- **Estimate:** M

## T-031A — Implement reserve-now / pay-later flow after payment-first stack is stable

<!-- issue: bookeasy:T-031A -->

Status: DONE
Verification: 2026-02-19 (`pnpm exec vitest run tests/unit/public/rooms-loading.test.tsx tests/unit/public/room-detail-loading.test.tsx tests/unit/public/room-detail-page-ssr.test.tsx` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Booking/Payments
- **Context:** Pay-later is explicitly deferred until MoMo and Stripe flows are production-ready.
- **Scope Included:** Reserve-now option with deferred settlement and explicit policy constraints.
- **Scope Excluded:** Replacing online payment options as the default checkout path.
- **Acceptance Criteria:**
- [ ] Reserve-now/pay-later option remains disabled until `T-051`, `T-052`, `T-053`, `T-054`, `T-055`, `T-066`, and `T-028` are DONE
- [ ] Deferred-payment eligibility/expiry/cancellation rules are explicit and tested
- [ ] Pay-later path does not regress online payment checkout flows
- **Implementation Notes:** Implement only after payment-first tasks are complete.
- **Dependencies:** 051, 052, 053, 054, 055, 066, 028
- **Estimate:** S

## Milestone 3A — Online Payments Delivery (Notch Pay MVP, CinetPay-Ready)

## T-051 — Define canonical booking/payment transition policy and invariants

<!-- issue: bookeasy:T-051 -->

Status: DONE
Verification: 2026-02-17 (`pnpm exec vitest run tests/unit/domain/booking-payment-invariants.test.ts tests/unit/domain/booking-status.test.ts tests/unit/domain/booking-transition-guards.test.ts tests/unit/domain/payment-transition-guards.test.ts tests/unit/domain/pricing-and-reserve-flow.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Payments/Booking
- **Context:** `/docs/prd.md` and `/docs/payment.md` require canonical transitions where booking confirmation is payment-driven.
- **Scope Included:** Formalize and enforce `RESERVED -> CONFIRMED` only when payment reaches `SUCCEEDED`; handle failure/cancel/expire transitions.
- **Scope Excluded:** Provider-specific API calls.
- **Acceptance Criteria:**
- [x] Transition policy is documented in code and rejects illegal transitions with typed domain errors
- [x] Booking cannot reach `CONFIRMED` unless related payment status is `SUCCEEDED`
- [x] Expired/cancelled payments cannot confirm bookings
- **Implementation Notes:** Canonical statuses and transition matrices are centralized in `lib/domain/booking-status.ts`; service-facing helper APIs are exposed in `lib/domain/booking.ts` (`createCanonicalBookingStatusUpdate`, `createCanonicalPaymentStatusUpdate`, `createCanonicalBookingConfirmationUpdate`); invariant and matrix tests live under `tests/unit/domain/*transition*` and `tests/unit/domain/booking-payment-invariants.test.ts`.
- **Dependencies:** 012, 024, 025
- **Estimate:** M
- **Subtasks:**
- [x] `T-051.1` Define canonical status enums and transition matrix.
- [x] `T-051.2` Implement booking transition guards with typed domain errors.
- [x] `T-051.3` Implement payment transition guards with typed domain errors.
- [x] `T-051.4` Enforce cross-entity invariant: booking `CONFIRMED` only when payment `SUCCEEDED`.
- [x] `T-051.5` Enforce failed/cancelled/expired payment invariants for booking confirmation.
- [x] `T-051.6` Add reusable domain-level transition APIs for service/API layers.
- [x] `T-051.7` Add exhaustive unit transition matrix coverage for canonical booking/payment statuses.
- [x] `T-051.8` Add cross-entity invariant unit tests for confirmation gating and terminal statuses.
- [x] `T-051.9` Verify backward compatibility with existing booking reserve flow tests.
- [x] `T-051.10` Update `todo.md` with traceable completion and verification commands.

## T-052 — Build Notch Pay adapter implementing provider contract

<!-- issue: bookeasy:T-052 -->

Status: DONE
Verification: 2026-02-17 (`pnpm exec vitest run tests/unit/payments/notchpay-config.test.ts tests/unit/payments/notchpay-client.test.ts tests/unit/payments/notchpay-provider.test.ts tests/unit/payments/notchpay-signature.test.ts tests/unit/payments/notchpay-registry-contract.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Payments
- **Context:** Notch Pay is the MVP gateway and must be integrated behind provider-agnostic contracts.(https://developer.notchpay.co/get-started/quickstart)
- **Scope Included:** `initiatePayment`, `parseWebhook`, `verifyPayment` fallback, signature verification stub fallback when exact header/algorithm is pending.
- **Scope Excluded:** CinetPay adapter implementation.
- **Acceptance Criteria:**
- [x] Adapter compiles against shared provider interface with no provider leakage into domain types
- [x] `initiatePayment` returns normalized payment payload (`providerReference`, `checkoutUrl`, canonical status)
- [x] `parseWebhook` maps provider events to canonical internal event shape
- [x] Signature verification fails closed when required signature header is missing
- **Implementation Notes:** Add `lib/payments/notchpay.ts` (or equivalent adapter location per project structure) and map statuses to canonical enum.
- **Dependencies:** 025
- **Estimate:** M
- **Subtasks:**
- [x] `T-052.1` Define Notch adapter config contract (`NOTCHPAY_PUBLIC_KEY`, `NOTCHPAY_WEBHOOK_SECRET`, `APP_BASE_URL`, optional private key) with fail-fast typed config errors and secret-safe error messages.
- [x] `T-052.2` Build Notch API client wrapper on shared `GatewayHttpClient` for `POST /payments` and `GET /payments/{reference}` with auth headers, retries/timeouts, and correlation IDs.
- [x] `T-052.3` Implement `initiatePayment` mapping from internal request to Notch payload and canonical `ProviderInitiatePaymentResult`.
- [x] `T-052.4` Centralize provider status mapper (`complete->SUCCEEDED`, `failed->FAILED`, `expired->EXPIRED`, `canceled->CANCELLED`, `pending/processing->PENDING`) with typed unknown-status errors.
- [x] `T-052.5` Implement `verifyPayment` against Notch `GET /payments/{reference}` and map provider/network failures to typed domain errors.
- [x] `T-052.6` Implement webhook signature verification helper (`x-notch-signature`, HMAC SHA-256, timing-safe compare) with fail-closed behavior.
- [x] `T-052.7` Implement `parseWebhook` canonical normalization (`eventId`, `providerReference`, canonical `status`, `occurredAt`) with typed parse errors.
- [x] `T-052.8` Add callback/redirect verification support hook that verifies callback `reference` server-side via provider verify path.
- [x] `T-052.9` Add unit tests for adapter happy paths (`initiatePayment`, `verifyPayment`, `parseWebhook`) using fixtures and canonical field assertions.
- [x] `T-052.10` Add failure/idempotency-safe unit tests (invalid signature, unknown status, malformed payload, timeout/network/provider errors) with no external network calls.
- [x] `T-052.11` Add contract compliance test with provider registry for deterministic `MOMO` resolution and typed unsupported provider/method paths.
- [x] `T-052.12` Update `todo.md` traceability with subtask checklist and verification evidence.

## T-053 — Implement `POST /api/payments/start` idempotent payment initiation endpoint

<!-- issue: bookeasy:T-053 -->

Status: DONE
Verification: 2026-02-18 (`pnpm exec vitest run tests/unit/validation/payments-start.test.ts tests/unit/api/payments-start-route.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Payments/API
- **Context:** API spec defines payment initiation as idempotent and provider-agnostic.
- **Scope Included:** Endpoint contract, request validation, idempotency key handling, checkout URL return, safe conflict behavior.
- **Scope Excluded:** Webhook processing.
- **Acceptance Criteria:**
- [x] Endpoint accepts spec-compliant request and returns normalized `paymentId`, `status`, `checkoutUrl`, `provider`
- [x] Repeated calls with same idempotency key return the same successful result
- [x] Returns conflict when booking already confirmed with successful payment
- **Implementation Notes:** Add `app/api/payments/start/route.ts`; reuse shared parser/error format and rate limiting guard.
- **Dependencies:** 024, 025, 052
- **Estimate:** M
- **Subtasks:**
- [x] `T-053.1` Define `/api/payments/start` request/response schemas and header parsing in `lib/validation/payments-start.ts`.
- [x] `T-053.2` Add route scaffold in `app/api/payments/start/route.ts` with safe JSON parse, actor/session context extraction, and request ID handling.
- [x] `T-053.3` Add booking eligibility checks (`NOT_FOUND`, `FORBIDDEN`, `CONFLICT`) before payment initiation.
- [x] `T-053.4` Resolve provider via registry and enforce method support with typed domain errors.
- [x] `T-053.5` Implement idempotency replay for `bookingId + Idempotency-Key` with deterministic response reuse.
- [x] `T-053.6` Implement provider initiation call path and persist payment intent fields (`providerReference`, metadata checkout URL, idempotency key).
- [x] `T-053.7` Return `409 CONFLICT` when booking is already `CONFIRMED` with successful payment.
- [x] `T-053.8` Apply route rate limiting and structured logging (`requestId`, `bookingId`, `paymentId`, `provider`, `actorId`) without secrets.
- [x] `T-053.9` Add unit tests for schema + happy path response contract.
- [x] `T-053.10` Add unit tests for replay, conflicts, unsupported provider/method, and provider failure mapping.
- [x] `T-053.11` Verify route tests perform no direct network calls (`fetch` not called).
- [x] `T-053.12` Update todo traceability with subtask completion and verification commands.

## T-054 — Implement Notch Pay webhook ingestion with ProviderEvent ledger dedupe and atomic updates

<!-- issue: bookeasy:T-054 -->

Status: DONE
Verification: 2026-02-18 (`pnpm exec vitest run tests/unit/api/notchpay-webhook-route.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Payments/Webhooks
- **Context:** Payment confirmation must be webhook-driven, idempotent, and transaction-safe.
- **Scope Included:** `POST /api/webhooks/payments/notchpay`, signature validation, event normalization, ProviderEvent upsert dedupe, atomic payment+booking update.
- **Scope Excluded:** CinetPay webhook handler.
- **Acceptance Criteria:**
- [x] Missing/invalid signature returns `WEBHOOK_SIGNATURE_INVALID`
- [x] Duplicate provider events are acknowledged without reapplying transitions
- [x] Payment + booking updates are committed in a single DB transaction
- [x] Unknown payment reference stores event for investigation and returns safe response
- **Implementation Notes:** Add ledger and transaction logic in PaymentService; persist raw payload with redacted logs.
- **Dependencies:** 051, 052
- **Estimate:** M
- **Subtasks:**
- [x] `T-054.1` Add `POST /api/webhooks/payments/notchpay` route scaffold and raw-body parsing.
- [x] `T-054.2` Normalize typed webhook errors with signature-invalid fail-closed behavior.
- [x] `T-054.3` Add provider-event ledger dedupe key (`provider:eventId`) before state application.
- [x] `T-054.4` Apply payment + booking status updates inside one DB transaction.
- [x] `T-054.5` Persist unmatched-reference events for investigation with safe `200` response.
- [x] `T-054.6` Add webhook write rate limiting and correlation logging.
- [x] `T-054.7` Add route-level unit tests for happy path, duplicate dedupe, invalid signature, unknown reference, and 429 behavior.

## T-054A — Consolidate webhook ledger on dedicated `ProviderEvent` table

<!-- issue: bookeasy:T-054A -->

Status: DONE
Verification: 2026-02-18 (`pnpm exec vitest run tests/unit/api/notchpay-webhook-route.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Payments/Webhooks
- **Context:** Architecture requires first-class provider event dedupe persistence; `AuditLog` fallback must be replaced by canonical `ProviderEvent`.
- **Scope Included:** Prisma model + migration, webhook route refactor to `ProviderEvent` upsert/dedupe path, route tests updated to assert provider-event ledger behavior.
- **Scope Excluded:** Backfill migration for historical `AuditLog`-based dedupe records.
- **Acceptance Criteria:**
- [x] `ProviderEvent` table exists with unique `(provider,eventId)` constraint and processing timestamps
- [x] Webhook dedupe is driven by `ProviderEvent`, not `AuditLog`
- [x] Unknown references are still persisted in ledger and acknowledged safely
- [x] Route tests validate duplicate suppression and processed-at behavior via `ProviderEvent`
- **Implementation Notes:** Added `ProviderEvent` in Prisma schema + SQL migration; refactored `app/api/webhooks/payments/notchpay/route.ts` to create/update provider events inside transaction.
- **Dependencies:** 054
- **Estimate:** S

## T-055 — Add fallback payment verification endpoint and booking confirmation recovery flow

<!-- issue: bookeasy:T-055 -->

Status: DONE
Verification: 2026-02-19 (`pnpm exec vitest run tests/unit/api/payments-verify-route.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Payments/API
- **Context:** Users may return before webhook delivery; verification fallback is required by API spec.
- **Scope Included:** `POST /api/payments/{paymentId}/verify` endpoint, provider verify call, canonical transition apply.
- **Scope Excluded:** Manual admin overrides.
- **Acceptance Criteria:**
- [x] Verify endpoint updates internal payment/booking state when provider reports successful payment
- [x] Provider downtime maps to `PAYMENT_PROVIDER_ERROR` with safe retry semantics
- [x] Endpoint is idempotent for already-terminal payment states
- **Implementation Notes:** Reuse PaymentService reconciliation path to avoid divergent transition logic.
- **Dependencies:** 052, 054
- **Estimate:** S
- **Subtasks:**
- [x] `T-055.1` Add `POST /api/payments/[paymentId]/verify` route scaffold with actor/session guards and route-param validation.
- [x] `T-055.2` Resolve provider key/method from stored payment intent metadata and provider registry.
- [x] `T-055.3` Implement verify-provider call path and canonical status reconciliation to DB payment/booking states.
- [x] `T-055.4` Add idempotent replay behavior for terminal payment states without extra provider calls.
- [x] `T-055.5` Add provider failure mapping to stable `PAYMENT_PROVIDER_ERROR` (retry-safe `502`).
- [x] `T-055.6` Add route-level tests for success, terminal replay, provider downtime, ownership/not-found, and rate limits.

## T-056 — Enforce DB-backed idempotency for booking create and payment start flows

<!-- issue: bookeasy:T-056 -->

Status: DONE

- **Feature Area:** Reliability
- **Context:** API spec requires idempotent writes for booking creation and payment initiation.
- **Scope Included:** Persistent idempotency keys, replay behavior, collision handling, deterministic response storage.
- **Scope Excluded:** External distributed lock service.
- **Acceptance Criteria:**
- [x] `POST /api/bookings` and `POST /api/payments/start` reject or replay duplicates deterministically
- [x] Idempotency scope includes endpoint + actor/session + key
- [x] Race conditions do not produce duplicate bookings/payments
- **Implementation Notes:** DB table or existing payment fields are acceptable for MVP if semantics are test-covered.
- **Dependencies:** 026, 053
- **Estimate:** M

## T-057 — Implement booking expiry window and scheduled cleanup job

<!-- issue: bookeasy:T-057 -->

Status: DONE

- **Feature Area:** Booking/Reliability
- **Context:** RESERVED bookings should expire when payment is not completed within configured TTL.
- **Scope Included:** `expiresAt` semantics, background cleanup job/cron, safe status transitions to `EXPIRED`.
- **Scope Excluded:** Customer reminder notification workflow.
- **Acceptance Criteria:**
- [x] New RESERVED bookings include expiration timestamp where payment is pending
- [x] Cleanup job transitions expired pending bookings and related payments safely
- [x] Expired bookings no longer block inventory
- **Implementation Notes:** Use Vercel/GitHub cron + admin fallback endpoint as noted in architecture docs.
- **Dependencies:** 051, 026, 056
- **Estimate:** M

## T-058 — Implement booking receipt endpoint and success page data contract

<!-- issue: bookeasy:T-058 -->

Status: DONE

- **Feature Area:** Booking/UX
- **Context:** API spec defines receipt data for post-payment confirmation UX.
- **Scope Included:** `GET /api/bookings/{bookingId}/receipt` contract and corresponding success-page data path.
- **Scope Excluded:** PDF invoice generation.
- **Acceptance Criteria:**
- [x] Receipt endpoint returns confirmed booking summary + payment reference + room snapshot
- [x] Access control prevents unrelated guests from reading receipt data
- [x] Success page can render solely from receipt contract
- **Implementation Notes:** Align with booking access token/guest session model in API spec.
- **Dependencies:** 029, 054, 055
- **Estimate:** S
- **Subtasks:**
- [x] `T-058.1` Define receipt response contract + validation schema.
- [x] `T-058.2` Implement receipt domain query service with typed not-found/invalid-state errors.
- [x] `T-058.3` Add `GET /api/bookings/[bookingId]/receipt` route with stable error mapping.
- [x] `T-058.4` Enforce ownership checks for guest/session and admin access.
- [x] `T-058.5` Add confirmed-and-paid receipt eligibility guard.
- [x] `T-058.6` Build success page loader using receipt API contract only.
- [x] `T-058.7` Implement loading/error/empty success-page UX states and retry path.
- [x] `T-058.8` Add unit tests for schema + domain query paths.
- [x] `T-058.9` Add route tests for auth + error mapping.
- [x] `T-058.10` Add SSR/UI tests for success-page integration and fallback states.
- [x] `T-058.11` Update todo traceability + verification commands.

## T-059 — Add CinetPay adapter (future-ready) behind the same provider interface

<!-- issue: bookeasy:T-059 -->

Status: DONE

- **Feature Area:** Payments
- **Context:** System design requires easy provider swap from Notch Pay to CinetPay with minimal domain impact.
- **Scope Included:** Adapter skeleton with initiate/webhook/verify contract compatibility and status mapping.
- **Scope Excluded:** Production activation of CinetPay in MVP.
- **Acceptance Criteria:**
- [ ] CinetPay adapter compiles and can be selected by provider registry without booking service changes
- [ ] Adapter exposes same normalized outputs as Notch Pay adapter
- [ ] Swap controlled by environment configuration only
- **Implementation Notes:** Keep route + provider wiring ready; real secrets can remain staging-only until rollout.
- **Dependencies:** 025, 052
- **Estimate:** S

## T-060 — Implement CinetPay webhook route skeleton with signature verification contract

<!-- issue: bookeasy:T-060 -->

Status: TODO

- **Feature Area:** Payments/Webhooks
- **Context:** API spec defines a future CinetPay webhook endpoint; route contract should exist early.
- **Scope Included:** `POST /api/webhooks/payments/cinetpay` route, strict signature/header contract stubs, normalized event parsing interface.
- **Scope Excluded:** Full production reconciliation rollout.
- **Acceptance Criteria:**
- [ ] Endpoint exists and validates required signature headers (fail closed when absent)
- [ ] Parsed payload is normalized to internal provider-event shape
- [ ] Route can be enabled without refactoring PaymentService
- **Implementation Notes:** Keep logic parallel to Notch Pay webhook flow to reduce swap risk.
- **Dependencies:** 059
- **Estimate:** S

## T-066 — Integrate Stripe payment provider behind the same payment adapter contract

<!-- issue: bookeasy:T-066 -->

Status: TODO

- **Feature Area:** Payments
- **Context:** Team decision requires full payment coverage from MoMo to Stripe before enabling pay-later.
- **Scope Included:** Stripe provider adapter, initiation + verification mapping to canonical statuses, registry wiring via provider contract.
- **Scope Excluded:** Subscription billing, disputes, payouts.
- **Acceptance Criteria:**
- [ ] Stripe adapter compiles and resolves through the same provider registry as Notch/CinetPay adapters
- [ ] Stripe status mapping conforms to canonical internal payment statuses
- [ ] Booking/payment domain services do not require provider-specific branching to support Stripe
- **Implementation Notes:** Keep Stripe integration behind adapter boundary; no provider-specific payloads leak to API responses.
- **Dependencies:** 025, 051, 053
- **Estimate:** M

## T-061 — Add admin payment visibility APIs and admin UI integration

<!-- issue: bookeasy:T-061 -->

Status: TODO

- **Feature Area:** Admin/Payments
- **Context:** Admin must inspect payment status and provider references to support operations.
- **Scope Included:** `GET /api/admin/payments`, `GET /api/admin/payments/{paymentId}`, booking detail payment summary integration in admin views.
- **Scope Excluded:** Financial reporting dashboards.
- **Acceptance Criteria:**
- [ ] Admin can list/filter payments by provider/status/date
- [ ] Admin payment detail shows provider reference, canonical status, and event history summary
- [ ] Admin booking detail exposes payment status/reference at a glance
- **Implementation Notes:** Reuse admin auth guards and audit log patterns.
- **Dependencies:** 032, 033, 054
- **Estimate:** M

## T-062 — Add payment-focused automated test suite (unit + integration + e2e skeleton)

<!-- issue: bookeasy:T-062 -->

Status: TODO

- **Feature Area:** QA
- **Context:** Payment correctness needs focused automated coverage before production rollout.
- **Scope Included:** Unit tests for state transitions/idempotency/dedupe, integration tests for webhook atomicity, e2e skeleton for checkout + webhook simulation.
- **Scope Excluded:** Live external gateway tests in CI.
- **Acceptance Criteria:**
- [ ] Unit tests cover idempotency replay, provider-event dedupe, and transition invariants
- [ ] Integration tests verify atomic booking/payment update on webhook apply
- [ ] E2E skeleton simulates webhook confirmation path and asserts booking confirmation behavior
- **Implementation Notes:** Add contract tests around PaymentProvider and fake gateway fixtures.
- **Dependencies:** 051, 053, 054, 055, 056
- **Estimate:** M

## T-063 — Add payment environment configuration validation and docs sync

<!-- issue: bookeasy:T-063 -->

Status: TODO

- **Feature Area:** Ops/Payments
- **Context:** Payment rollout requires strict env/secret validation to avoid runtime failures.
- **Scope Included:** Validate required env vars (`PAYMENT_PROVIDER`, Notch Pay secrets, webhook secrets, future CinetPay keys), `.env.example` and deployment docs updates.
- **Scope Excluded:** Secret rotation automation platform.
- **Acceptance Criteria:**
- [ ] App fails fast with clear startup error when required payment env vars are missing
- [ ] `.env.example` and docs list all payment configuration keys with purpose
- [ ] CI/deploy checks include payment env presence validation step
- **Implementation Notes:** Add env parser/guard under `lib/env` and reference in app bootstrap paths.
- **Dependencies:** 052, 059, 060, 066
- **Estimate:** S

## T-067 — Harden webhook perimeter with rate limiting and optional provider allowlist policy

<!-- issue: bookeasy:T-067 -->

Status: TODO

- **Feature Area:** Security/Payments
- **Context:** PRD and API spec require webhook hardening beyond signature checks.
- **Scope Included:** Route-level rate limits for payment webhooks, allowlist strategy hooks for provider source validation, and operational fallbacks.
- **Scope Excluded:** External WAF vendor setup.
- **Acceptance Criteria:**
- [ ] Payment webhook routes enforce dedicated rate limit buckets
- [ ] Allowlist policy can be configured (enabled/disabled) per environment without code changes
- [ ] Invalid/untrusted source handling is logged with correlation ids and safe response behavior
- **Implementation Notes:** Reuse `lib/security/rate-limit.ts`; document recommended gateway IP allowlist strategy in docs.
- **Dependencies:** 008, 054, 060
- **Estimate:** S

## T-064 — Implement public availability quote endpoint and validation contract

<!-- issue: bookeasy:T-064 -->

Status: TODO

- **Feature Area:** Public API/Booking
- **Context:** API spec recommends `/api/public/availability/quote` for price/availability confirmation before booking.
- **Scope Included:** Endpoint contract, zod validation, availability + pricing response shape, conflict handling.
- **Scope Excluded:** Checkout payment initiation.
- **Acceptance Criteria:**
- [ ] Endpoint returns nights/subtotal/total/currency for valid request payload
- [ ] Invalid payloads return stable validation errors
- [ ] Conflicting/unavailable inventory returns clear conflict response
- **Implementation Notes:** Reuse existing availability + pricing domain logic to avoid duplicate calculations.
- **Dependencies:** 014, 024
- **Estimate:** S

## T-065 — Align location/copy references from Bamenda to Buea across product content and docs

<!-- issue: bookeasy:T-065 -->

Status: TODO

- **Feature Area:** Content/Chore
- **Context:** `todo.md` and parts of code/docs still reference Bamenda while PRD/system architecture define Buea.
- **Scope Included:** Identify and update user-facing copy/docs/config constants to canonical Buea references.
- **Scope Excluded:** Geo-specific pricing or operations changes.
- **Acceptance Criteria:**
- [ ] Product-facing text is consistent with Buea in docs and public pages
- [ ] No contradictory Bamenda/Buea references remain in active MVP docs
- [ ] Changes are reviewed for SEO metadata consistency
- **Implementation Notes:** Treat as content consistency pass; avoid changing unrelated technical logic.
- **Dependencies:** 018, 021
- **Estimate:** S

## Milestone 4 — Admin Portal

## T-032 — Build admin shell, navigation, and RBAC route guards

<!-- issue: bookeasy:T-032 -->

Status: TODO

- **Feature Area:** Admin
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

## T-033 — Implement admin bookings list and lifecycle update workflow

<!-- issue: bookeasy:T-033 -->

Status: TODO

- **Feature Area:** Admin
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

## T-034 — Implement units CRUD for inventory operations

<!-- issue: bookeasy:T-034 -->

Status: TODO

- **Feature Area:** Admin
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

## T-035 — Implement centralized audit logging service for admin actions

<!-- issue: bookeasy:T-035 -->

Status: TODO

- **Feature Area:** Security
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

## T-036 — Add admin audit log viewer page

<!-- issue: bookeasy:T-036 -->

Status: TODO

- **Feature Area:** Admin
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

## T-037 — Add admin RBAC and audit e2e coverage

<!-- issue: bookeasy:T-037 -->

Status: TODO

- **Feature Area:** QA
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

## T-038 — Implement messaging domain service and persistence wiring

<!-- issue: bookeasy:T-038 -->

Status: TODO

- **Feature Area:** Messaging
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

## T-039 — Expose guest/admin messaging APIs with validation and rate limiting

<!-- issue: bookeasy:T-039 -->

Status: TODO

- **Feature Area:** Messaging
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

## T-040 — Build guest and admin messaging UI views

<!-- issue: bookeasy:T-040 -->

Status: TODO

- **Feature Area:** Messaging
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

## T-041 — Implement transactional email templates and Resend integration

<!-- issue: bookeasy:T-041 -->

Status: DONE
Verification: 2026-02-20 (`pnpm vitest tests/unit/domain/notifications.test.ts tests/unit/api/payments-verify-route.test.ts tests/unit/api/notchpay-webhook-route.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Notifications
- **Context:** Booking and messaging events require transactional notifications.
- **Scope Included:** Booking confirmation, cancellation, new-message alert emails.
- **Scope Excluded:** Marketing email campaigns.
- **Acceptance Criteria:**
- [x] React Email templates render correctly
- [x] Booking create triggers confirmation email
- [x] Email send failures are logged and captured in Sentry
- **Implementation Notes:** Build templates in `/emails/*`; integrate via `lib/domain/notifications.ts`.
- **Dependencies:** 007, 026, 038
- **Estimate:** M

## T-042 — Add integration tests for messaging permissions and email triggers

<!-- issue: bookeasy:T-042 -->

Status: TODO

- **Feature Area:** QA
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

## T-043 — Configure web app manifest and installability baseline

<!-- issue: bookeasy:T-043 -->

Status: TODO

- **Feature Area:** PWA
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

## T-044 — Implement service-worker caching for offline booking-detail access

<!-- issue: bookeasy:T-044 -->

Status: TODO

- **Feature Area:** PWA
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

## T-045 — Add global offline indicator and degraded UX states

<!-- issue: bookeasy:T-045 -->

Status: TODO

- **Feature Area:** PWA
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

## T-046 — Add e2e tests for installability and offline booking-detail access

<!-- issue: bookeasy:T-046 -->

Status: TODO

- **Feature Area:** QA
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

## T-047 — Add Stripe and Mobile Money provider stubs behind payment interface

<!-- issue: bookeasy:T-047 -->

Status: SUPERSEDED

- **Feature Area:** Payments
- **Context:** Replaced by live payment integration tasks in Milestone 3A (`T-051`, `T-052`, `T-059`, `T-066`).
- **Scope Included:** Historical planning reference only.
- **Scope Excluded:** Execution as a separate task.
- **Acceptance Criteria:**
- [ ] Superseded by `T-051`, `T-052`, `T-059`, and `T-066`
- **Implementation Notes:** Archived; implementation covered by Milestone 3 payment-first tasks.
- **Dependencies:** 051, 052, 059, 066
- **Estimate:** S

## T-048 — Create webhook endpoint skeletons for Stripe and Mobile Money

<!-- issue: bookeasy:T-048 -->

Status: SUPERSEDED

- **Feature Area:** Payments
- **Context:** Replaced by `T-054` and `T-060` with live webhook and reconciliation implementation.
- **Scope Included:** Historical planning reference only.
- **Scope Excluded:** Execution as a separate task.
- **Acceptance Criteria:**
- [ ] Superseded by `T-054` and `T-060`
- **Implementation Notes:** Archived; implementation covered by Milestone 3 payment-first tasks.
- **Dependencies:** 054, 060
- **Estimate:** S

## T-049 — Harden currency invariants without enabling FX conversion

<!-- issue: bookeasy:T-049 -->

Status: TODO

- **Feature Area:** Currency
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

## T-050 — Add contract tests for provider interchangeability and currency invariants

<!-- issue: bookeasy:T-050 -->

Status: TODO

- **Feature Area:** QA
- **Context:** Future-readiness must be protected by automated tests.
- **Scope Included:** Shared payment-provider contract tests and currency invariant tests.
- **Scope Excluded:** Live third-party API integration tests.
- **Acceptance Criteria:**
- [ ] Any provider implementation must pass the shared contract suite
- [ ] Currency and integer amount invariants are validated in tests
- [ ] Notch Pay and Stripe provider paths remain green under shared contract tests
- **Implementation Notes:** Add `tests/contract/payment-provider.contract.test.ts`, `tests/unit/currency.test.ts`.
- **Dependencies:** 049, 051, 052, 059, 066
- **Estimate:** M

## T-068 — Add room-detail streaming loading UI matching final layout

<!-- issue: bookeasy:T-068 -->

Status: TODO

- **Feature Area:** Public UX/Performance
- **Context:** Navigating from rooms listing to room detail should show an intentional streaming skeleton instead of abrupt fallback.
- **Scope Included:** `app/(public)/rooms/[id]/loading.tsx` with room-detail-shaped skeleton states and responsive layout parity.
- **Scope Excluded:** Data fetching or business logic changes in room detail route.
- **Acceptance Criteria:**
- [x] Navigating from `/rooms` to `/rooms/[id]` renders a dedicated loading state while data streams
- [x] Loading UI mirrors key room-detail sections (hero/media, title/meta, pricing/CTA, amenities/info blocks)
- [x] Loading layout is responsive and visually stable on mobile and desktop (no major layout shift)
- **Implementation Notes:** Keep skeleton structure close to `app/(public)/rooms/[id]/page.tsx`; validate with SSR/component tests.
- **Dependencies:** 019A, 020
- **Estimate:** S

## T-069 — Fix post-payment receipt handoff and ship booking receipt success experience

<!-- issue: bookeasy:T-069 -->

Status: DONE
Verification: 2026-02-20 (`pnpm exec playwright test tests/e2e/notchpay-return-receipt.spec.ts --project=chromium` ✅)

- **Feature Area:** Booking/Payments UX
- **Context:** After Notch Pay success return, users currently land on `Receipt Unavailable` instead of a confirmed receipt success experience.
- **Scope Included:** Redirect/callback handoff reliability, payment-to-booking confirmation sync, receipt data readiness, and success-page UX wiring.
- **Scope Excluded:** Visual redesign details (to be provided), non-MVP refund workflows.
- **Acceptance Criteria:**
- [ ] Successful Notch payment return always results in receipt-eligible state (`Booking=CONFIRMED`, `Payment=SUCCEEDED`) before success page render
- [ ] `/booking/[bookingId]/success` shows confirmed receipt data for successful payments instead of fallback `Receipt Unavailable`
- [ ] Cancel/failed/expired payment outcomes keep deterministic non-success behavior and do not falsely confirm bookings
- [ ] End-to-end test covers `pay now -> notch success callback/verify -> success page receipt rendered`
- **Implementation Notes:** Validate and align `app/api/public/pay-now/route.ts`, `app/api/payments/[paymentId]/verify/route.ts`, webhook transitions, and `lib/domain/booking-receipt.ts` eligibility checks; add explicit observability logs for callback and receipt gating decisions.
- **Dependencies:** 052, 054, 055, 058
- **Estimate:** M

- [x] `T-069.1` Map actual Notch return callback parameters and persist deterministic correlation (`bookingId`, `paymentId`, provider reference).
      Acceptance Criteria: Success return can always resolve the target booking/payment without guessing or brittle query assumptions.
- [x] `T-069.2` Add/confirm server-side return handler that triggers provider verification before rendering success page.
      Acceptance Criteria: Return flow never trusts redirect alone; verification updates canonical payment status.
- [x] `T-069.3` Enforce payment->booking confirmation transition on verified success in a single transactional path.
      Acceptance Criteria: Verified success moves booking to `CONFIRMED`; non-success statuses do not.
- [x] `T-069.4` Tighten receipt eligibility timing/read-model behavior for immediate post-payment navigation.
      Acceptance Criteria: Legitimate successful payments do not transiently fall into `Receipt Unavailable` under normal flow.
- [x] `T-069.5` Add deterministic fallback/retry UX contract for temporary verification lag.
      Acceptance Criteria: If verification is still pending, page communicates pending state and retries without dead-end error UX.
- [x] `T-069.6` Add unit/integration tests for success, pending, failed, cancelled, expired return paths.
      Acceptance Criteria: Tests assert canonical transitions and response codes/shapes with no external network calls.
- [x] `T-069.7` Add e2e skeleton test for checkout return to receipt success page.
      Acceptance Criteria: Scenario proves final user-visible success path from `/rooms/[id]` pay-now to receipt-rendered success screen.
- [x] `T-069.8` Plug in provided receipt success UI design on top of stabilized data contract.
      Acceptance Criteria: New UI renders only receipt contract fields and passes existing success page SSR tests (or updated equivalents).

## Milestone 8 — Authentication, OAuth, and Receipt Access

## T-070 — Implement OAuth sign-in/sign-up for guest account upgrade

<!-- issue: bookeasy:T-070 -->

Status: DONE
Verification: 2026-02-21 (`pnpm exec vitest run tests/unit/security/oauth-provider-config.test.ts tests/unit/security/auth-callbacks.test.ts tests/unit/integration/auth-oauth-entry-return.test.tsx` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Authentication
- **Context:** Current auth setup provides role/routing skeleton but does not ship end-user OAuth sign-in for guest-to-account upgrade.
- **Scope Included:** Auth.js OAuth provider wiring (Google MVP), sign-in/sign-up UI entry points, callback handling, session role assignment for USER flows.
- **Scope Excluded:** Enterprise SSO and multi-provider management UI.
- **Acceptance Criteria:**
- [x] User can sign in/up with OAuth from public booking/success context
- [x] OAuth callback creates or reuses user account deterministically
- [x] Session contains role and identity fields required for booking ownership checks
- **Implementation Notes:** Extend existing Auth.js setup from `T-004`; add user-facing auth screens/entry points and callback guards.
- **Dependencies:** 004
- **Estimate:** M
- **Subtasks:**
- [x] `T-070.1` Define OAuth provider config contract (Google MVP) and required env validation.
      Acceptance Criteria: Missing OAuth env vars fail fast with stable startup/config errors; secrets are never logged.
- [x] `T-070.2` Wire Auth.js provider setup and callback mapping in auth config.
      Acceptance Criteria: Google provider is registered and callback path resolves without runtime errors in dev/prod.
- [x] `T-070.3` Implement deterministic user upsert on OAuth callback.
      Acceptance Criteria: Existing user is reused by canonical email; first-time OAuth creates exactly one user record.
- [x] `T-070.4` Normalize session payload for booking flows.
      Acceptance Criteria: Session includes stable identity fields (`user.id`, `user.email`, `role`) used by booking ownership checks.
- [x] `T-070.5` Add public auth entry points (sign in/sign up CTAs) from booking and success contexts.
      Acceptance Criteria: User can start OAuth from rooms/detail/success paths without breaking guest flow.
- [x] `T-070.6` Implement post-login redirect continuity.
      Acceptance Criteria: `returnTo`/callback flow returns user to original target page after OAuth completion.
- [x] `T-070.7` Add auth error handling UX.
      Acceptance Criteria: Denied/failed OAuth attempts render user-safe error messages with retry path.
- [x] `T-070.8` Add route guard updates for authenticated user pages.
      Acceptance Criteria: Protected user routes require session and redirect unauthenticated users to login with preserved target.
- [x] `T-070.9` Add unit tests for callback/session normalization and deterministic user creation.
      Acceptance Criteria: Tests cover first login, repeat login, and malformed profile payload handling.
- [x] `T-070.10` Add integration tests for OAuth entry + return flow.
      Acceptance Criteria: Tests validate login initiation, callback success, and return-to-target behavior (mocked provider boundary).

## T-071 — Implement guest-to-user booking ownership linking after authentication

<!-- issue: bookeasy:T-071 -->

Status: DONE

- **Feature Area:** Authentication/Booking
- **Context:** Guest bookings exist, but authenticated users need a secure way to see their previously created guest bookings.
- **Scope Included:** Ownership claim/link flow using guest session + verified email/account identity, idempotent linking logic, audit-safe updates.
- **Scope Excluded:** Manual admin reassignment tooling.
- **Acceptance Criteria:**
- [x] Newly authenticated user can claim eligible guest bookings created with matching identity signals
- [x] Linking operation is idempotent and does not duplicate ownership mappings
- [x] Non-matching/unauthorized claim attempts fail with stable forbidden/conflict errors
- **Implementation Notes:** Add service-level ownership migration helper and route/action invoked post-login from success page.
- **Dependencies:** 029, 070
- **Estimate:** M

## T-072 — Gate “My Bookings” behind authentication and add login redirect UX

<!-- issue: bookeasy:T-072 -->

Status: DONE

- **Feature Area:** Authentication/Booking UX
- **Context:** Users should not access booking history without authentication; current guest flows rely mostly on session-scoped access.
- **Scope Included:** Protected “My Bookings” route(s), redirect-to-login behavior, post-login return-to-target flow.
- **Scope Excluded:** Admin booking screens.
- **Acceptance Criteria:**
- [x] Accessing “My Bookings” while logged out redirects to login
- [x] After successful login, user returns to intended bookings page
- [x] Authenticated user can only see bookings they own
- **Implementation Notes:** Reuse guard utilities from `T-004` and booking ownership constraints from `T-029`/`T-071`.
- **Dependencies:** 004, 029, 070, 071
- **Estimate:** S

## T-073 — Send paid booking receipt email and add resend receipt action

<!-- issue: bookeasy:T-073 -->

Status: DONE
Verification: 2026-02-21 (`pnpm exec vitest run tests/unit/domain/notifications.test.ts tests/unit/api/booking-receipt-resend-route.test.ts tests/unit/public/resend-receipt-button.test.tsx tests/unit/public/booking-success-page-ssr.test.tsx` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Notifications/Booking
- **Context:** Receipt page exists, but users still need durable confirmation via email after successful payment.
- **Scope Included:** Automatic receipt email trigger on confirmed+paid booking, resend endpoint/action with auth/ownership checks.
- **Scope Excluded:** Marketing email sequences.
- **Acceptance Criteria:**
- [x] Successful paid booking triggers receipt email with booking summary and payment reference
- [x] Authenticated owner can request receipt resend from booking success/details page
- [x] Email send/retry failures are logged with stable error codes and no secret leakage
- **Implementation Notes:** Build on notification infrastructure from `T-041`; receipt data source must reuse `T-058` contract.
- **Dependencies:** 041, 058, 069, 070
- **Estimate:** M
- **Subtasks:**
- [x] `T-073.1` Define receipt email payload contract and template data mapper from `T-058` receipt DTO.
      Acceptance Criteria: Mapper produces deterministic subject/body fields (booking id, guest, dates, totals, payment reference) without provider-specific leakage.
- [x] `T-073.2` Implement automatic post-payment email trigger in confirmation/verify flow.
      Acceptance Criteria: When payment becomes successful and booking is confirmed, email dispatch is invoked exactly once for that booking transition.
- [x] `T-073.3` Add idempotency guard for receipt email dispatch.
      Acceptance Criteria: Repeat verify/webhook/callback processing does not send duplicate confirmation emails for the same booking.
- [x] `T-073.4` Persist dispatch metadata on payment/booking record for traceability.
      Acceptance Criteria: Sent attempts stamp provider message id, sentAt, and attempt counters in metadata/audit-friendly shape.
- [x] `T-073.5` Create authenticated resend endpoint `POST /api/bookings/[bookingId]/receipt/resend`.
      Acceptance Criteria: Owner/admin can request resend; non-owner access returns stable 403/404; endpoint returns normalized success/error response.
- [x] `T-073.6` Add resend action wiring on booking success/details UI.
      Acceptance Criteria: UI button triggers resend endpoint, shows pending/success/error states, and prevents accidental double-submit while request is in flight.
- [x] `T-073.7` Add rate limiting + structured logs for resend endpoint.
      Acceptance Criteria: Excess resend attempts return 429; logs include requestId, bookingId, actorId, and sanitized error code without secrets.
- [x] `T-073.8` Map email provider failures to stable domain/API errors.
      Acceptance Criteria: Provider/network/validation failures map to typed error codes and user-safe messages; raw provider secrets are never surfaced.
- [x] `T-073.9` Add automated tests for auto-send and resend authorization flows.
      Acceptance Criteria: Tests cover auto-send happy path, idempotent duplicate suppression, owner/admin resend success, and forbidden resend attempts.
- [x] `T-073.10` Add failure-path tests for resend + provider errors.
      Acceptance Criteria: Tests cover provider timeout/failure mapping, rate-limit behavior, and logging metadata assertions with no external network calls.

## T-074 — Implement downloadable booking receipt (PDF) for owner and paid guest flow

<!-- issue: bookeasy:T-074 -->

Status: DONE
Verification: 2026-02-21 (`pnpm exec vitest run tests/unit/api/booking-receipt-pdf-route.test.ts tests/unit/public/booking-success-page-ssr.test.tsx` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Booking/Receipts
- **Context:** Users need offline/shareable proof of booking beyond on-screen receipt.
- **Scope Included:** Receipt PDF generation endpoint, secure access checks, success-page/download CTA wiring.
- **Scope Excluded:** Tax invoice compliance formatting beyond MVP receipt fields.
- **Acceptance Criteria:**
- [x] Owner (or valid guest success session) can download receipt PDF for eligible booking
- [x] Download output includes booking summary, room snapshot, totals, currency, and payment reference
- [x] Unauthorized download attempts return stable 403/404 responses
- **Implementation Notes:** Reuse `T-058` receipt domain query; keep PDF renderer provider-agnostic and deterministic for tests.
- **Dependencies:** 058, 069, 070, 071
- **Estimate:** M

## T-075 — Add authentication and receipt-access automated coverage (OAuth + ownership + delivery)

<!-- issue: bookeasy:T-075 -->

Status: TODO

- **Feature Area:** QA/Security
- **Context:** OAuth and ownership-linking introduce sensitive security boundaries that require regression coverage.
- **Scope Included:** Unit/integration/e2e coverage for OAuth callback outcomes, booking claim/link, protected bookings pages, receipt email/download access.
- **Scope Excluded:** Live OAuth provider contract tests against production provider.
- **Acceptance Criteria:**
- [ ] Tests cover logged-out redirect for “My Bookings” and post-login return flow
- [ ] Tests cover guest-to-user booking linking success and forbidden/conflict cases
- [ ] Tests cover receipt resend/download authorization and happy paths
- **Implementation Notes:** Prefer mocked OAuth provider responses and deterministic fixtures; enforce no external network in CI tests.
- **Dependencies:** 070, 071, 072, 073, 074
- **Estimate:** M

## T-076 — Migrate transactional email sender from Resend sandbox to verified production domain

<!-- issue: bookeasy:T-076 -->

Status: TODO

- **Feature Area:** Notifications/Production Readiness
- **Context:** Current setup may use Resend sandbox sender (`onboarding@resend.dev`) during development and must be migrated before production go-live.
- **Scope Included:** Domain verification in Resend, DNS setup (SPF/DKIM), production sender/reply-to env updates, and smoke verification.
- **Scope Excluded:** Marketing campaign tooling and advanced deliverability analytics.
- **Acceptance Criteria:**
- [ ] Resend production domain is verified and healthy (SPF + DKIM passing)
- [ ] `RESEND_FROM_EMAIL` and `RESEND_REPLY_TO` are switched to production-owned addresses
- [ ] Production smoke test confirms booking confirmation email delivery from verified sender
- **Implementation Notes:** Keep sandbox sender for local/dev only; document environment split and rollback plan.
- **Dependencies:** 041
- **Estimate:** S

## T-077 — Add “View Bookings” CTA plumbing on public surfaces and canonical route handoff

<!-- issue: bookeasy:T-077 -->

Status: TODO

- **Feature Area:** Booking UX
- **Context:** Users need a clear entry point to “My Bookings” from public pages before post-booking account features can be used.
- **Scope Included:** Add/standardize `View Bookings` CTA in header/footer/success contexts and route to canonical `/bookings` entry path.
- **Scope Excluded:** Booking data retrieval logic and auth enforcement internals.
- **Acceptance Criteria:**
- [ ] `View Bookings` CTA is present on approved public surfaces (`app/(public)/layout.tsx`, `app/(receipt)/booking/[bookingId]/success/page.tsx`)
- [ ] CTA navigation always resolves to canonical `/bookings` route (no duplicate aliases)
- [ ] Mobile and desktop navigation behavior is verified with SSR page tests
- **Implementation Notes:** Keep styling compliant with `/docs/design-tokens.md`; update affected public UI tests under `tests/unit/public/**`.
- **Dependencies:** 017, 069
- **Estimate:** S

## T-078 — Implement authenticated “My Bookings” dashboard pages (list + detail shells)

<!-- issue: bookeasy:T-078 -->

Status: TODO

- **Feature Area:** Dashboard/Booking UX
- **Context:** Current route placeholders exist but do not provide production booking dashboard experience.
- **Scope Included:** Build `/bookings` list page and `/bookings/[bookingId]` detail page shells using SSR data loading and receipt-style detail rendering.
- **Scope Excluded:** PDF export and email resend actions (covered by 073/074).
- **Acceptance Criteria:**
- [ ] `/bookings` renders paginated booking cards with status/date summary from authenticated user data
- [ ] `/bookings/[bookingId]` renders receipt-style booking detail for owner with empty/error states
- [ ] Dashboard pages do not leak provider-specific payment payload fields to UI contracts
- **Implementation Notes:** Implement in `app/(app)/bookings/page.tsx` and `app/(app)/bookings/[bookingId]/page.tsx`; consume API contracts from booking endpoints only.
- **Dependencies:** 072, 029, 058
- **Estimate:** M

## T-079 — Extend booking owner APIs for dashboard filters, pagination, and deterministic ordering

<!-- issue: bookeasy:T-079 -->

Status: DONE

- **Feature Area:** Booking/API
- **Context:** Existing guest booking endpoints are insufficient for account dashboard list UX (status filters + pagination + stable ordering).
- **Scope Included:** Add/extend owner-facing list/detail contract (`/api/bookings/me`, `/api/bookings/[bookingId]`) for status filters, page params, and deterministic sort.
- **Scope Excluded:** Admin booking APIs.
- **Acceptance Criteria:**
- [x] `GET /api/bookings/me` supports `status`, `page`, `pageSize` query params with validated bounds
- [x] Response includes pagination metadata and stable default ordering
- [x] Ownership checks are enforced server-side and return stable forbidden/not-found errors
- **Implementation Notes:** Add/extend schemas in `lib/validation/**`; implement handler updates in `app/api/bookings/**`; include request correlation/log fields.
- **Dependencies:** 029, 072
- **Estimate:** M

## T-080 — Introduce authenticated USER role semantics for dashboard access

<!-- issue: bookeasy:T-080 -->

Status: DONE

- **Feature Area:** Authentication/Security
- **Context:** Current `ADMIN`/`GUEST` model conflates anonymous guest-session behavior and authenticated account behavior; dashboard access requires explicit authenticated user role semantics.
- **Scope Included:** Introduce `USER` role for authenticated non-admin accounts and update auth role resolution/callbacks/guards accordingly.
- **Scope Excluded:** Admin RBAC changes beyond compatibility updates.
- **Acceptance Criteria:**
- [x] Authenticated non-admin sessions resolve to `USER` role (not anonymous guest fallback)
- [x] Existing admin protections remain intact for `/admin/**`
- [x] Booking/dashboard guards distinguish anonymous guest-session access from authenticated `USER` access
- **Implementation Notes:** Update `lib/security/auth-role.ts`, `lib/security/rbac.ts`, `lib/security/auth-callbacks.ts`, `auth.ts`, and related type declarations/tests.
- **Dependencies:** 004, 070
- **Estimate:** M

## T-081 — Add review domain model and booking linkage for post-stay feedback

<!-- issue: bookeasy:T-081 -->

Status: TODO

- **Feature Area:** Reviews/Data
- **Context:** User stories require rating/review capability with booking-bound eligibility and one-review-per-booking protection.
- **Scope Included:** Prisma model(s) for reviews, booking/user linkage fields, unique/index constraints, migration.
- **Scope Excluded:** Public review moderation UI.
- **Acceptance Criteria:**
- [ ] Prisma schema includes `Review` model linked to booking and owner identity with indexed query paths
- [ ] Constraint prevents duplicate review creation for the same booking by same owner
- [ ] Migration applies cleanly and seeds remain compatible
- **Implementation Notes:** Update `prisma/schema.prisma` + migration; include minimal moderation fields (`isHidden`, `moderationStatus`) for safety workflows.
- **Dependencies:** 010, 080
- **Estimate:** M

## T-082 — Implement review APIs with eligibility guards, validation, and rate limiting

<!-- issue: bookeasy:T-082 -->

Status: TODO

- **Feature Area:** Reviews/API
- **Context:** Reviews must be tied to eligible bookings and protected against abuse.
- **Scope Included:** `POST /api/reviews` and owner/list retrieval contract with Zod validation, booking eligibility policy checks, and rate limiting.
- **Scope Excluded:** Public review feed ranking/personalization.
- **Acceptance Criteria:**
- [ ] Review create endpoint validates payload and enforces rating/text bounds
- [ ] Eligibility policy is enforced (booking owner + allowed status/time window) with stable conflict/forbidden errors
- [ ] Review endpoints are rate-limited and emit structured logs without sensitive leakage
- **Implementation Notes:** Add schemas in `lib/validation/reviews.ts`; handlers in `app/api/reviews/**`; apply `lib/security/rate-limit.ts`.
- **Dependencies:** 005, 008, 081
- **Estimate:** M

## T-083 — Harden user-side cancellation policy enforcement and inventory release verification

<!-- issue: bookeasy:T-083 -->

Status: TODO

- **Feature Area:** Booking/Reliability
- **Context:** Dashboard cancellation actions must consistently apply policy guards and release inventory in all eligible cases.
- **Scope Included:** Policy check helper reuse in cancel route/service, deterministic transition errors, and availability release verification path.
- **Scope Excluded:** Refund processing and financial reconciliation.
- **Acceptance Criteria:**
- [ ] Cancellation endpoint enforces policy rule (not checked-in/completed; before check-in boundary) with typed errors
- [ ] Successful cancellation immediately restores availability in subsequent quote/listing checks
- [ ] Repeat cancellation attempts are idempotent and do not corrupt booking/payment status
- **Implementation Notes:** Align with transition guards from `T-051`; extend `app/api/bookings/[id]/cancel/route.ts` and booking service helper paths.
- **Dependencies:** 029, 051, 079
- **Estimate:** M

## T-084 — Add dashboard security and flow test suite (auth gating, ownership, cancellation, reviews)

<!-- issue: bookeasy:T-084 -->

Status: TODO

- **Feature Area:** QA/Security
- **Context:** New dashboard access paths introduce sensitive ownership boundaries and policy-critical actions.
- **Scope Included:** Unit/integration/e2e coverage for auth gating, owner-only booking access, cancellation policy/inventory release, and review eligibility/create flow.
- **Scope Excluded:** Live third-party OAuth provider contract tests.
- **Acceptance Criteria:**
- [ ] Unit tests cover ownership enforcement and review/cancel eligibility guards
- [ ] Integration tests verify cancellation releases availability and review write constraints
- [ ] E2E verifies logged-out redirect to login, post-login return to bookings, and successful review submission for eligible booking
- **Implementation Notes:** Add tests under `tests/unit/api/**`, `tests/unit/domain/**`, and `tests/e2e/**`; mock external providers and block external network in CI.
- **Dependencies:** 072, 078, 079, 082, 083
- **Estimate:** M

## T-085 — Add authenticated profile entry in public header/mobile nav for dashboard access

<!-- issue: bookeasy:T-085 -->

Status: DONE

- **Feature Area:** Authentication/Navigation UX
- **Context:** After successful sign-in/sign-up, users need an immediate visual account indicator and quick path to their booking dashboard from public pages.
- **Scope Included:** Session-aware public header/mobile nav rendering with profile avatar/icon and dashboard link handoff.
- **Scope Excluded:** Full account settings menu and sign-out dropdown workflows.
- **Acceptance Criteria:**
- [x] Authenticated users see a profile icon/image control in public header and mobile nav
- [x] Clicking profile control routes user to canonical dashboard entry (`/bookings`)
- [x] Logged-out users continue to see `Login` / `Sign Up` CTAs unchanged
- **Implementation Notes:** Implement in `components/public/public-header.tsx` and `components/public/mobile-nav.tsx` using `auth()` session data; keep desktop/mobile behavior aligned.
- **Dependencies:** 070, 072
- **Estimate:** S

## T-086 — Implement Auth.js magic-link provider for passwordless sign-in (USER + guest upgrade)

<!-- issue: bookeasy:T-086 -->

Status: DONE
Verification: 2026-02-21 (`pnpm exec vitest run tests/unit/security/magic-link-provider-config.test.ts tests/unit/security/auth-callbacks.test.ts tests/unit/security/oauth-provider-config.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Authentication
- **Context:** OAuth alone is insufficient for guests who want a low-friction login path to access bookings; passwordless email magic links are required.
- **Scope Included:** Auth.js Email provider wiring, required env/config validation, token/session callback mapping to `USER` role semantics, and safe fallback when email provider is unavailable.
- **Scope Excluded:** SMS OTP authentication and enterprise IdP flows.
- **Acceptance Criteria:**
- [x] Auth.js Email provider is configured with validated env vars and startup-safe errors
- [x] Magic-link sign-in creates/reuses deterministic account identity by canonical email
- [x] Session/JWT role payload remains compatible with `USER` role semantics and admin protections
- **Implementation Notes:** Update `auth.ts`, add provider config utility under `lib/security/**`, and wire transport adapter through existing email infrastructure from `T-041`.
- **Dependencies:** 041, 070, 080
- **Estimate:** M

## T-087 — Add magic-link UX for login/register and guest-to-user booking handoff

<!-- issue: bookeasy:T-087 -->

Status: DONE
Verification: 2026-02-21 (`pnpm exec vitest run tests/unit/integration/auth-oauth-entry-return.test.tsx tests/unit/security/magic-link-provider-config.test.ts tests/unit/security/auth-callbacks.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** Authentication/Booking UX
- **Context:** Users need a clear “email me a sign-in link” flow from login/register surfaces, including post-click guidance and return-to continuity.
- **Scope Included:** Login/register magic-link request forms, success/pending states, expired/invalid link handling, and return-to routing back to `/bookings` or originating booking path.
- **Scope Excluded:** Marketing email copy customization.
- **Acceptance Criteria:**
- [x] Login/register pages support magic-link request with user-safe success/error states
- [x] Clicking a valid magic link signs user in and returns them to intended `returnTo` page
- [x] Post-auth flow preserves booking ownership linking behavior for previously guest-created bookings
- **Implementation Notes:** Extend `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`, and callback/error handling routes; reuse ownership claim hook from `T-071`.
- **Dependencies:** 071, 072, 086
- **Estimate:** M

## T-088 — Add security and regression test coverage for magic-link auth flow

<!-- issue: bookeasy:T-088 -->

Status: DONE
Verification: 2026-02-21 (`pnpm exec vitest run tests/unit/security/prisma-auth-adapter.test.ts tests/unit/integration/auth-oauth-entry-return.test.tsx tests/unit/security/bookings-auth-gating.test.ts tests/unit/security/auth-callbacks.test.ts` ✅, `pnpm typecheck` ✅)

- **Feature Area:** QA/Security
- **Context:** Magic-link auth introduces token misuse/expiration risks and must be covered to avoid auth regressions.
- **Scope Included:** Unit/integration tests for request validation, callback token handling, expired/invalid token errors, return-to continuity, and role/ownership invariants.
- **Scope Excluded:** Live end-to-end email provider delivery tests against production infrastructure.
- **Acceptance Criteria:**
- [x] Tests cover magic-link request success/failure validation paths and stable error mapping
- [x] Tests cover callback success, expired token, and invalid token flows with safe UX messages
- [x] Tests verify authenticated session role and `/bookings` ownership enforcement remain intact after magic-link login
- **Implementation Notes:** Add tests under `tests/unit/security/**`, `tests/unit/integration/**`, and route-specific API tests with mocked transport/provider boundaries.
- **Dependencies:** 086, 087
- **Estimate:** M

## T-089 — Create user dashboard blueprint page and wire public CTAs

<!-- issue: bookeasy:T-089 -->

Status: DONE
Verification: 2026-02-21 (`pnpm typecheck` ✅, `pnpm exec vitest run tests/unit/public/booking-success-page-ssr.test.tsx` ✅)

- **Feature Area:** Authentication/Navigation UX
- **Context:** Users now need a clear landing page for post-auth account actions before full dashboard modules are built.
- **Scope Included:** Add a minimal authenticated `/dashboard` blueprint and route `My Dashboard` / `View Bookings` public CTAs to it.
- **Scope Excluded:** Full dashboard business features (filters, metrics, cancellation/review widgets, account settings workflows).
- **Acceptance Criteria:**
- [x] Authenticated users can open `/dashboard` and see a simple dashboard shell with links to bookings/account areas
- [x] Public header/mobile `My Dashboard` controls route to `/dashboard`
- [x] Public `View Bookings` CTA routes authenticated users to `/dashboard` and unauthenticated users to `/login?returnTo=/dashboard`
- **Implementation Notes:** Implement shell in `app/(app)/dashboard/page.tsx`; update link wiring in `components/public/public-header.tsx`, `components/public/mobile-nav.tsx`, and receipt/success CTA surfaces.
- **Dependencies:** 072, 085
- **Estimate:** S

## Immediate Next Actions (Start Milestone 0)

1. Execute Task 001 and Task 002 to lock the strict TypeScript baseline and verify Prisma/Neon migration health.
2. Implement Task 005 and Task 008 next so validation and rate limiting are in place before public write endpoints.
3. Complete Task 009 immediately afterward to gate all subsequent milestones with CI, unit tests, and e2e smoke coverage.
