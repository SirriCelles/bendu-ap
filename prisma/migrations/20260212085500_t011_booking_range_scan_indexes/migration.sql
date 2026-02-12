-- T-011.5: Supporting indexes for booking range scans used by availability checks.
-- Focus on active inventory-blocking statuses to keep index size and scan cost lower.

-- Fast lookup by unit and start date for active bookings.
CREATE INDEX IF NOT EXISTS "booking_active_unit_checkin_idx"
ON "Booking" ("unitId", "checkInDate")
WHERE "status" IN ('RESERVED', 'CONFIRMED', 'CHECKED_IN');

-- Supports overlap-style predicates with date ranges on active bookings.
CREATE INDEX IF NOT EXISTS "booking_active_unit_tsrange_gist_idx"
ON "Booking" USING gist (
  "unitId",
  tsrange("checkInDate", "checkOutDate", '[)')
)
WHERE "status" IN ('RESERVED', 'CONFIRMED', 'CHECKED_IN');

-- Helps status/date filtered scans often used by admin and operational views.
CREATE INDEX IF NOT EXISTS "booking_status_checkin_idx"
ON "Booking" ("status", "checkInDate");
