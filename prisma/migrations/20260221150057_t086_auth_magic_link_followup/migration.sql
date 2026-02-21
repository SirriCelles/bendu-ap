-- DropIndex
DROP INDEX "booking_active_unit_checkin_idx";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
