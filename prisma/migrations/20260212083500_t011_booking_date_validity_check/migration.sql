-- T-011.3: Enforce valid booking ranges at DB level.
-- This guarantees check-in is strictly before check-out.
ALTER TABLE "Booking"
ADD CONSTRAINT "booking_checkin_before_checkout"
CHECK ("checkInDate" < "checkOutDate");
