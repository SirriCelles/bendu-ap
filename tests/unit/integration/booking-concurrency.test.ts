import { describe, expect, it } from "vitest";
import type { BookingStatus } from "@/generated/prisma";

import {
  BookingConflictError,
  reserveBookingWithSnapshot,
  type BookingReserveInput,
  type BookingReservationDbClient,
} from "@/lib/domain/booking";
import { BOOKING_INVENTORY_BLOCKING_STATUSES } from "@/lib/domain/booking-status";
import type { MinorUnitAmount } from "@/lib/domain/pricing";

type PersistedBooking = {
  id: string;
  unitId: string;
  status: BookingStatus;
  idempotencyKey: string | null;
  checkInDate: Date;
  checkOutDate: Date;
  priceSnapshot: {
    totalAmountMinor: number;
  };
};

type BookingCreateData = {
  unitId: string;
  status: BookingStatus;
  idempotencyKey: string | null;
  checkInDate: Date;
  checkOutDate: Date;
  priceSnapshot: {
    create: {
      totalAmountMinor: number;
    };
  };
};

class FakeDbConstraintError extends Error {
  readonly code: string;
  readonly constraint: string;
  readonly meta: { constraint: string };

  constructor(code: string, constraint: string, message: string) {
    super(message);
    this.code = code;
    this.constraint = constraint;
    this.meta = { constraint };
  }
}

class ConcurrencyBookingDb implements BookingReservationDbClient<PersistedBooking> {
  private readonly blockingStatuses: ReadonlySet<BookingStatus> = new Set<BookingStatus>(
    BOOKING_INVENTORY_BLOCKING_STATUSES
  );
  private readonly bookings: PersistedBooking[] = [];
  private transactionQueue: Promise<void> = Promise.resolve();
  private nextId = 1;
  private snapshotsCreated = 0;

  async $transaction<TResult>(
    callback: (tx: {
      booking: {
        create(args: { data: BookingCreateData }): Promise<PersistedBooking>;
      };
    }) => Promise<TResult>
  ): Promise<TResult> {
    return this.withTransactionLock(async () => {
      return callback({
        booking: {
          create: async ({ data }) => this.createBooking(data),
        },
      });
    });
  }

  seedBooking(record: Omit<PersistedBooking, "id" | "priceSnapshot">): void {
    this.bookings.push({
      id: `seed-${this.nextId++}`,
      unitId: record.unitId,
      status: record.status,
      idempotencyKey: record.idempotencyKey,
      checkInDate: record.checkInDate,
      checkOutDate: record.checkOutDate,
      priceSnapshot: { totalAmountMinor: 0 },
    });
  }

  listBookings(): readonly PersistedBooking[] {
    return this.bookings;
  }

  getSnapshotCreateCount(): number {
    return this.snapshotsCreated;
  }

  setBookingStatusById(bookingId: string, status: BookingStatus): void {
    const booking = this.bookings.find((entry) => entry.id === bookingId);
    if (booking) {
      booking.status = status;
    }
  }

  private async withTransactionLock<T>(fn: () => Promise<T>): Promise<T> {
    let release: (() => void) | undefined;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });

    const previous = this.transactionQueue;
    this.transactionQueue = previous.then(
      () => gate,
      () => gate
    );
    await previous;

    try {
      return await fn();
    } finally {
      release?.();
    }
  }

  private async createBooking(data: BookingCreateData): Promise<PersistedBooking> {
    if (data.idempotencyKey) {
      const existingByKey = this.bookings.find(
        (booking) => booking.idempotencyKey === data.idempotencyKey
      );
      if (existingByKey) {
        throw new FakeDbConstraintError(
          "23505",
          "Booking_idempotencyKey_key",
          "duplicate key value violates unique constraint Booking_idempotencyKey_key"
        );
      }
    }

    const isNewBookingBlocking = this.blockingStatuses.has(data.status);
    if (isNewBookingBlocking) {
      const overlapping = this.bookings.find((booking) => {
        if (booking.unitId !== data.unitId) return false;
        if (!this.blockingStatuses.has(booking.status)) return false;

        // Half-open range overlap: [checkIn, checkOut)
        return booking.checkInDate < data.checkOutDate && booking.checkOutDate > data.checkInDate;
      });

      if (overlapping) {
        throw new FakeDbConstraintError(
          "23P01",
          "booking_no_overlap_active_per_unit",
          "conflicting key value violates exclusion constraint booking_no_overlap_active_per_unit"
        );
      }
    }

    const persisted: PersistedBooking = {
      id: `booking-${this.nextId++}`,
      unitId: data.unitId,
      status: data.status,
      idempotencyKey: data.idempotencyKey,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      priceSnapshot: {
        totalAmountMinor: data.priceSnapshot.create.totalAmountMinor,
      },
    };

    this.bookings.push(persisted);
    this.snapshotsCreated += 1;
    return persisted;
  }
}

function minor(value: number): MinorUnitAmount {
  return value as MinorUnitAmount;
}

function makeReserveInput(overrides: Partial<BookingReserveInput> = {}): BookingReserveInput {
  const checkInDate = overrides.checkInDate ?? new Date("2026-09-10T00:00:00.000Z");
  const checkOutDate = overrides.checkOutDate ?? new Date("2026-09-12T00:00:00.000Z");
  const unitId = overrides.unitId ?? "unit-1";

  return {
    propertyId: "property-1",
    unitId,
    idempotencyKey: null,
    checkInDate,
    checkOutDate,
    guestFullName: "Test Guest",
    guestEmail: "guest@example.com",
    guestPhone: "+237600000000",
    adultsCount: 2,
    pricing: {
      checkInDate,
      checkOutDate,
      currency: "XAF",
      selectedUnit: {
        unitId,
        code: "A-101",
        nightlyRateMinor: minor(20000),
      },
      selectedUnitType: {
        unitTypeId: "type-a",
        slug: "standard-room",
        basePriceMinor: minor(20000),
      },
    },
    ...overrides,
  };
}

function getRejectedReason(result: PromiseSettledResult<unknown>): string | null {
  if (result.status !== "rejected") return null;
  if (result.reason instanceof BookingConflictError) {
    return result.reason.reason;
  }
  return null;
}

describe("integration: booking concurrency protection", () => {
  it("allows only one overlapping concurrent reservation and maps loser to overlap domain conflict", async () => {
    const db = new ConcurrencyBookingDb();

    const [first, second] = await Promise.allSettled([
      reserveBookingWithSnapshot(db, makeReserveInput({ idempotencyKey: "req-a-1234" })),
      reserveBookingWithSnapshot(
        db,
        makeReserveInput({
          idempotencyKey: "req-b-1234",
          checkInDate: new Date("2026-09-11T00:00:00.000Z"),
          checkOutDate: new Date("2026-09-13T00:00:00.000Z"),
        })
      ),
    ]);

    const fulfilled = [first, second].filter((result) => result.status === "fulfilled");
    const rejected = [first, second].filter((result) => result.status === "rejected");
    expect(fulfilled).toHaveLength(1);
    expect(rejected).toHaveLength(1);
    expect(getRejectedReason(rejected[0])).toBe("OVERLAPPING_BOOKING");
    expect(db.listBookings()).toHaveLength(1);
    expect(db.getSnapshotCreateCount()).toBe(1);
  });

  it("allows concurrent non-overlapping reservations on same unit", async () => {
    const db = new ConcurrencyBookingDb();

    const [first, second] = await Promise.allSettled([
      reserveBookingWithSnapshot(
        db,
        makeReserveInput({
          idempotencyKey: "req-c-1234",
          checkInDate: new Date("2026-10-10T00:00:00.000Z"),
          checkOutDate: new Date("2026-10-12T00:00:00.000Z"),
        })
      ),
      reserveBookingWithSnapshot(
        db,
        makeReserveInput({
          idempotencyKey: "req-d-1234",
          checkInDate: new Date("2026-10-12T00:00:00.000Z"),
          checkOutDate: new Date("2026-10-14T00:00:00.000Z"),
        })
      ),
    ]);

    expect(first.status).toBe("fulfilled");
    expect(second.status).toBe("fulfilled");
    expect(db.listBookings()).toHaveLength(2);
    expect(db.getSnapshotCreateCount()).toBe(2);
  });

  it("rejects concurrent duplicate idempotency key with domain conflict and keeps one booking", async () => {
    const db = new ConcurrencyBookingDb();

    const [first, second] = await Promise.allSettled([
      reserveBookingWithSnapshot(
        db,
        makeReserveInput({
          idempotencyKey: "same-key-1234",
          checkInDate: new Date("2026-11-01T00:00:00.000Z"),
          checkOutDate: new Date("2026-11-03T00:00:00.000Z"),
        })
      ),
      reserveBookingWithSnapshot(
        db,
        makeReserveInput({
          idempotencyKey: "same-key-1234",
          checkInDate: new Date("2026-11-01T00:00:00.000Z"),
          checkOutDate: new Date("2026-11-03T00:00:00.000Z"),
        })
      ),
    ]);

    const fulfilled = [first, second].filter((result) => result.status === "fulfilled");
    const rejected = [first, second].filter((result) => result.status === "rejected");
    expect(fulfilled).toHaveLength(1);
    expect(rejected).toHaveLength(1);
    expect(getRejectedReason(rejected[0])).toBe("IDEMPOTENCY_KEY_REUSED");
    expect(db.listBookings()).toHaveLength(1);
    expect(db.getSnapshotCreateCount()).toBe(1);
  });

  it("allows new reservation after terminal states release inventory", async () => {
    const db = new ConcurrencyBookingDb();
    db.seedBooking({
      unitId: "unit-1",
      status: "RESERVED",
      idempotencyKey: "old-reserved-1234",
      checkInDate: new Date("2026-12-01T00:00:00.000Z"),
      checkOutDate: new Date("2026-12-03T00:00:00.000Z"),
    });
    db.seedBooking({
      unitId: "unit-1",
      status: "RESERVED",
      idempotencyKey: "old-completed-1234",
      checkInDate: new Date("2026-12-05T00:00:00.000Z"),
      checkOutDate: new Date("2026-12-07T00:00:00.000Z"),
    });

    // Convert the seeded rows to terminal/non-blocking equivalents.
    const seeded = db.listBookings();
    db.setBookingStatusById(seeded[0].id, "CANCELLED");
    db.setBookingStatusById(seeded[1].id, "COMPLETED");

    const result = await reserveBookingWithSnapshot(
      db,
      makeReserveInput({
        idempotencyKey: "new-reservation-1234",
        checkInDate: new Date("2026-12-01T00:00:00.000Z"),
        checkOutDate: new Date("2026-12-03T00:00:00.000Z"),
      })
    );

    expect(result.id).toMatch(/^booking-/);
    expect(db.listBookings()).toHaveLength(3);
    expect(db.getSnapshotCreateCount()).toBe(1);
  });
});
