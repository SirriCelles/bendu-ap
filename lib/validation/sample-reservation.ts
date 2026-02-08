import { z } from "zod";

export const sampleReservationSchema = z.object({
  guestName: z.string().trim().min(2).max(120),
  guestEmail: z.email(),
  unitId: z.string().trim().min(1),
  checkIn: z.iso.date(),
  checkOut: z.iso.date(),
});

export type SampleReservationInput = z.infer<typeof sampleReservationSchema>;
