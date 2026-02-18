-- T-054A: dedicated provider event ledger for webhook dedupe and processing traceability
CREATE TABLE "ProviderEvent" (
  "id" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "providerReference" TEXT,
  "paymentIntentId" TEXT,
  "status" TEXT,
  "signatureValid" BOOLEAN NOT NULL,
  "rawPayload" JSONB NOT NULL,
  "occurredAt" TIMESTAMP(3),
  "processedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ProviderEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProviderEvent_provider_eventId_key" ON "ProviderEvent"("provider", "eventId");
CREATE INDEX "ProviderEvent_provider_providerReference_idx" ON "ProviderEvent"("provider", "providerReference");
CREATE INDEX "ProviderEvent_paymentIntentId_createdAt_idx" ON "ProviderEvent"("paymentIntentId", "createdAt");
CREATE INDEX "ProviderEvent_processedAt_idx" ON "ProviderEvent"("processedAt");

ALTER TABLE "ProviderEvent"
ADD CONSTRAINT "ProviderEvent_paymentIntentId_fkey"
FOREIGN KEY ("paymentIntentId") REFERENCES "PaymentIntent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
