import { Buffer } from "node:buffer";

import type { BookingReceiptResponse } from "@/lib/validation/booking-receipt";

function escapePdfText(input: string): string {
  return input.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function formatMoney(amountMinor: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-CM", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amountMinor);
  } catch {
    return `${currency} ${amountMinor}`;
  }
}

function formatDateLabel(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function toReceiptLines(receipt: BookingReceiptResponse["data"]): string[] {
  return [
    "BookEasy Booking Receipt",
    "",
    `Confirmation Number: ${receipt.booking.bookingId}`,
    `Booking Status: ${receipt.booking.status}`,
    `Payment Status: ${receipt.payment.status}`,
    `Payment Reference: ${receipt.payment.reference}`,
    "",
    `Property: Alonta Towers Guest House`,
    `Location: Upstation, Bamenda, NorthWest Region, Cameroon`,
    `Room: ${receipt.room.title}`,
    `Room Slug: ${receipt.room.slug}`,
    `Room Snapshot: ${receipt.room.thumbnailUrl ?? "N/A"}`,
    "",
    `Guest Name: ${receipt.booking.guest.fullName}`,
    `Guest Email: ${receipt.booking.guest.email}`,
    "",
    `Check-in: ${formatDateLabel(receipt.booking.checkInDate)}`,
    `Check-out: ${formatDateLabel(receipt.booking.checkOutDate)}`,
    `Nights: ${receipt.booking.nights}`,
    "",
    `Subtotal: ${formatMoney(receipt.totals.subtotalMinor, receipt.totals.currency)}`,
    `Discounts: ${formatMoney(receipt.totals.discountsMinor, receipt.totals.currency)}`,
    `Taxes: ${formatMoney(receipt.totals.taxesMinor, receipt.totals.currency)}`,
    `Fees: ${formatMoney(receipt.totals.feesMinor, receipt.totals.currency)}`,
    `Total: ${formatMoney(receipt.totals.totalMinor, receipt.totals.currency)}`,
    `Currency: ${receipt.totals.currency}`,
  ];
}

export function renderBookingReceiptPdf(receipt: BookingReceiptResponse["data"]): Buffer {
  const lines = toReceiptLines(receipt).map((line) => `(${escapePdfText(line)}) Tj`);
  const streamBody = `BT
/F1 12 Tf
50 790 Td
${lines.join("\nT*\n")}
ET`;

  const objects: string[] = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj",
    "4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
    `5 0 obj << /Length ${Buffer.byteLength(streamBody, "utf8")} >> stream
${streamBody}
endstream
endobj`,
  ];

  const header = "%PDF-1.4\n";
  let body = "";
  const offsets: number[] = [];

  for (const obj of objects) {
    offsets.push(Buffer.byteLength(header + body, "utf8"));
    body += `${obj}\n`;
  }

  const xrefOffset = Buffer.byteLength(header + body, "utf8");
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    xref += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  const trailer = `trailer << /Size ${objects.length + 1} /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF`;

  return Buffer.from(`${header}${body}${xref}${trailer}`, "utf8");
}
