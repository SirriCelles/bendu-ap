-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GUEST');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('XAF', 'EUR', 'USD');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('DRAFT', 'RESERVED', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PAY_ON_ARRIVAL', 'CARD', 'MOBILE_MONEY');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('INTERNAL', 'STRIPE', 'MTN_MOMO', 'ORANGE_MOMO', 'CUSTOM');

-- CreateEnum
CREATE TYPE "UnitTypeStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "UnitStatus" AS ENUM ('ACTIVE', 'OUT_OF_SERVICE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MessageThreadStatus" AS ENUM ('OPEN', 'RESOLVED', 'CLOSED');

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "postalCode" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Africa/Douala',
    "defaultCurrency" "Currency" NOT NULL DEFAULT 'XAF',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitType" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "UnitTypeStatus" NOT NULL DEFAULT 'ACTIVE',
    "maxGuests" INTEGER NOT NULL,
    "basePriceMinor" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'XAF',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "unitTypeId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "floor" TEXT,
    "status" "UnitStatus" NOT NULL DEFAULT 'ACTIVE',
    "isBookable" BOOLEAN NOT NULL DEFAULT true,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "idempotencyKey" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'RESERVED',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'NOT_REQUIRED',
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "guestFullName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "adultsCount" INTEGER NOT NULL,
    "childrenCount" INTEGER NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL DEFAULT 'XAF',
    "totalAmountMinor" INTEGER NOT NULL,
    "notes" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceSnapshot" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "nightsCount" INTEGER NOT NULL,
    "nightlyRateMinor" INTEGER NOT NULL,
    "subtotalMinor" INTEGER NOT NULL,
    "discountsMinor" INTEGER NOT NULL DEFAULT 0,
    "taxesMinor" INTEGER NOT NULL DEFAULT 0,
    "feesMinor" INTEGER NOT NULL DEFAULT 0,
    "totalAmountMinor" INTEGER NOT NULL,
    "pricingVersion" INTEGER NOT NULL DEFAULT 1,
    "promotionCode" TEXT,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentIntent" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "provider" "PaymentProvider" NOT NULL DEFAULT 'INTERNAL',
    "status" "PaymentStatus" NOT NULL DEFAULT 'NOT_REQUIRED',
    "providerIntentRef" TEXT,
    "providerCustomerRef" TEXT,
    "idempotencyKey" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "id" TEXT NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "providerTxnRef" TEXT,
    "externalReference" TEXT,
    "message" TEXT,
    "rawPayload" JSONB,
    "sequence" INTEGER NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageThread" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bookingId" TEXT,
    "subject" TEXT,
    "guestFullName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "status" "MessageThreadStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastMessageAt" TIMESTAMP(3),

    CONSTRAINT "MessageThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "senderRole" "Role" NOT NULL,
    "senderUserId" TEXT,
    "senderName" TEXT,
    "body" TEXT NOT NULL,
    "isInternalNote" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bookingId" TEXT,
    "messageThreadId" TEXT,
    "actorRole" "Role" NOT NULL,
    "actorUserId" TEXT,
    "actorEmail" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "requestId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- CreateIndex
CREATE INDEX "Property_isActive_idx" ON "Property"("isActive");

-- CreateIndex
CREATE INDEX "Property_city_country_idx" ON "Property"("city", "country");

-- CreateIndex
CREATE INDEX "UnitType_propertyId_status_idx" ON "UnitType"("propertyId", "status");

-- CreateIndex
CREATE INDEX "UnitType_propertyId_displayOrder_idx" ON "UnitType"("propertyId", "displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "UnitType_propertyId_slug_key" ON "UnitType"("propertyId", "slug");

-- CreateIndex
CREATE INDEX "Unit_propertyId_unitTypeId_idx" ON "Unit"("propertyId", "unitTypeId");

-- CreateIndex
CREATE INDEX "Unit_propertyId_status_isBookable_isPublished_idx" ON "Unit"("propertyId", "status", "isBookable", "isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_propertyId_code_key" ON "Unit"("propertyId", "code");

-- CreateIndex
CREATE INDEX "Booking_propertyId_status_checkInDate_idx" ON "Booking"("propertyId", "status", "checkInDate");

-- CreateIndex
CREATE INDEX "Booking_propertyId_unitId_checkInDate_checkOutDate_idx" ON "Booking"("propertyId", "unitId", "checkInDate", "checkOutDate");

-- CreateIndex
CREATE INDEX "Booking_unitId_checkInDate_checkOutDate_idx" ON "Booking"("unitId", "checkInDate", "checkOutDate");

-- CreateIndex
CREATE INDEX "Booking_guestEmail_createdAt_idx" ON "Booking"("guestEmail", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_idempotencyKey_key" ON "Booking"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "PriceSnapshot_bookingId_key" ON "PriceSnapshot"("bookingId");

-- CreateIndex
CREATE INDEX "PriceSnapshot_propertyId_capturedAt_idx" ON "PriceSnapshot"("propertyId", "capturedAt");

-- CreateIndex
CREATE INDEX "PriceSnapshot_currency_capturedAt_idx" ON "PriceSnapshot"("currency", "capturedAt");

-- CreateIndex
CREATE INDEX "PaymentIntent_propertyId_status_createdAt_idx" ON "PaymentIntent"("propertyId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentIntent_bookingId_createdAt_idx" ON "PaymentIntent"("bookingId", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentIntent_provider_providerCustomerRef_idx" ON "PaymentIntent"("provider", "providerCustomerRef");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentIntent_provider_providerIntentRef_key" ON "PaymentIntent"("provider", "providerIntentRef");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentIntent_idempotencyKey_key" ON "PaymentIntent"("idempotencyKey");

-- CreateIndex
CREATE INDEX "PaymentTransaction_paymentIntentId_occurredAt_idx" ON "PaymentTransaction"("paymentIntentId", "occurredAt");

-- CreateIndex
CREATE INDEX "PaymentTransaction_status_occurredAt_idx" ON "PaymentTransaction"("status", "occurredAt");

-- CreateIndex
CREATE INDEX "PaymentTransaction_externalReference_occurredAt_idx" ON "PaymentTransaction"("externalReference", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_paymentIntentId_sequence_key" ON "PaymentTransaction"("paymentIntentId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentTransaction_providerTxnRef_key" ON "PaymentTransaction"("providerTxnRef");

-- CreateIndex
CREATE INDEX "MessageThread_propertyId_status_updatedAt_idx" ON "MessageThread"("propertyId", "status", "updatedAt");

-- CreateIndex
CREATE INDEX "MessageThread_bookingId_updatedAt_idx" ON "MessageThread"("bookingId", "updatedAt");

-- CreateIndex
CREATE INDEX "MessageThread_guestEmail_createdAt_idx" ON "MessageThread"("guestEmail", "createdAt");

-- CreateIndex
CREATE INDEX "Message_threadId_createdAt_idx" ON "Message"("threadId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_senderRole_createdAt_idx" ON "Message"("senderRole", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_propertyId_createdAt_idx" ON "AuditLog"("propertyId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorRole_createdAt_idx" ON "AuditLog"("actorRole", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_bookingId_createdAt_idx" ON "AuditLog"("bookingId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_messageThreadId_createdAt_idx" ON "AuditLog"("messageThreadId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_requestId_createdAt_idx" ON "AuditLog"("requestId", "createdAt");

-- AddForeignKey
ALTER TABLE "UnitType" ADD CONSTRAINT "UnitType_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_unitTypeId_fkey" FOREIGN KEY ("unitTypeId") REFERENCES "UnitType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceSnapshot" ADD CONSTRAINT "PriceSnapshot_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceSnapshot" ADD CONSTRAINT "PriceSnapshot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentIntent" ADD CONSTRAINT "PaymentIntent_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentIntent" ADD CONSTRAINT "PaymentIntent_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_paymentIntentId_fkey" FOREIGN KEY ("paymentIntentId") REFERENCES "PaymentIntent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThread" ADD CONSTRAINT "MessageThread_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThread" ADD CONSTRAINT "MessageThread_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_messageThreadId_fkey" FOREIGN KEY ("messageThreadId") REFERENCES "MessageThread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
