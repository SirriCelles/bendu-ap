import * as React from "react";

export type BookingConfirmationEmailProps = {
  guestName: string;
  bookingId: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmountLabel: string;
  paymentReference: string;
  manageUrl?: string | null;
};

export function BookingConfirmationEmail({
  guestName,
  bookingId,
  roomName,
  checkInDate,
  checkOutDate,
  totalAmountLabel,
  paymentReference,
  manageUrl,
}: BookingConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#1f2937", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "12px" }}>Booking Confirmed</h1>
      <p>Hello {guestName},</p>
      <p>Your booking is confirmed. Here are your reservation details:</p>
      <ul>
        <li>
          <strong>Booking ID:</strong> {bookingId}
        </li>
        <li>
          <strong>Room:</strong> {roomName}
        </li>
        <li>
          <strong>Check-in:</strong> {checkInDate}
        </li>
        <li>
          <strong>Check-out:</strong> {checkOutDate}
        </li>
        <li>
          <strong>Total Paid:</strong> {totalAmountLabel}
        </li>
        <li>
          <strong>Payment Reference:</strong> {paymentReference}
        </li>
      </ul>
      {manageUrl ? (
        <p>
          View your receipt and booking details: <a href={manageUrl}>{manageUrl}</a>
        </p>
      ) : null}
      <p>Thank you for booking with BookEasy.</p>
    </div>
  );
}
