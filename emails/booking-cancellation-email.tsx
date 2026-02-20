import * as React from "react";

export type BookingCancellationEmailProps = {
  guestName: string;
  bookingId: string;
  roomName: string;
};

export function BookingCancellationEmail({
  guestName,
  bookingId,
  roomName,
}: BookingCancellationEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#1f2937", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "12px" }}>Booking Cancelled</h1>
      <p>Hello {guestName},</p>
      <p>Your booking has been cancelled.</p>
      <ul>
        <li>
          <strong>Booking ID:</strong> {bookingId}
        </li>
        <li>
          <strong>Room:</strong> {roomName}
        </li>
      </ul>
      <p>If this was unexpected, please contact support.</p>
    </div>
  );
}
