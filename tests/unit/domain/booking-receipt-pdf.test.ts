import { describe, expect, it } from "vitest";

import { renderBookingReceiptPdf } from "@/lib/domain/booking-receipt-pdf";

describe("renderBookingReceiptPdf", () => {
  it("renders deterministic PDF bytes containing booking summary text", () => {
    const pdf = renderBookingReceiptPdf({
      booking: {
        bookingId: "bk_123",
        status: "CONFIRMED",
        paymentStatus: "SUCCEEDED",
        checkInDate: "2026-03-01",
        checkOutDate: "2026-03-03",
        nights: 2,
        guest: {
          fullName: "Jane Doe",
          email: "jane@example.com",
          phone: "",
        },
      },
      payment: {
        paymentId: "pay_123",
        provider: "NOTCHPAY",
        method: "MOMO",
        status: "SUCCEEDED",
        reference: "np_ref_123",
      },
      room: {
        roomId: "room_123",
        slug: "studio-deluxe",
        title: "Deluxe Studio",
        unitCode: "A-101",
        thumbnailUrl: "/images/landing/room-image.jpg",
      },
      totals: {
        subtotalMinor: 40000,
        discountsMinor: 0,
        taxesMinor: 0,
        feesMinor: 0,
        totalMinor: 40000,
        currency: "XAF",
      },
      issuedAt: "2026-03-01T12:00:00.000Z",
    });

    const text = pdf.toString("utf8");
    expect(text.startsWith("%PDF-1.4")).toBe(true);
    expect(text).toContain("BookEasy Booking Receipt");
    expect(text).toContain("Confirmation Number: bk_123");
    expect(text).toContain("Payment Reference: np_ref_123");
    expect(text).toContain("Room: Deluxe Studio");
    expect(pdf.byteLength).toBeGreaterThan(800);
  });
});
