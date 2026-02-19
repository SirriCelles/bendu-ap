ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'EXPIRED';
ALTER TYPE "PaymentStatus" ADD VALUE IF NOT EXISTS 'EXPIRED';

ALTER TABLE "Booking"
ADD COLUMN "expiresAt" TIMESTAMP(3);

CREATE INDEX "Booking_status_paymentStatus_expiresAt_idx"
ON "Booking"("status", "paymentStatus", "expiresAt");
