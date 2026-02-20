import * as React from "react";

export type NewMessageAlertEmailProps = {
  recipientName: string;
  bookingId: string;
  messagePreview: string;
};

export function NewMessageAlertEmail({
  recipientName,
  bookingId,
  messagePreview,
}: NewMessageAlertEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#1f2937", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "12px" }}>New Message</h1>
      <p>Hello {recipientName},</p>
      <p>You have a new message for booking {bookingId}.</p>
      <p style={{ background: "#f3f4f6", borderRadius: "8px", padding: "12px" }}>
        {messagePreview}
      </p>
    </div>
  );
}
