-- T-011.4: Prevent overlapping active bookings on the same unit.
-- Uses half-open ranges [checkInDate, checkOutDate) so checkout is a non-overlapping boundary.
ALTER TABLE "Booking"
ADD CONSTRAINT "booking_no_overlap_active_per_unit"
EXCLUDE USING gist (
  "unitId" WITH =,
  tsrange("checkInDate", "checkOutDate", '[)') WITH &&
)
WHERE ("status" IN ('RESERVED', 'CONFIRMED', 'CHECKED_IN'));
