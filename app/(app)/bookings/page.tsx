import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

function formatMoney(amountMinor: number, currency: "XAF" | "EUR" | "USD"): string {
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

export default async function BookingsPage() {
  const session = await auth();
  const email = typeof session?.user?.email === "string" ? session.user.email.toLowerCase() : null;

  if (!email) {
    return (
      <main>
        <h1>Bookings</h1>
        <p>Missing account email. Please sign out and sign in again.</p>
      </main>
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      guestEmail: {
        equals: email,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    select: {
      id: true,
      status: true,
      paymentStatus: true,
      checkInDate: true,
      checkOutDate: true,
      totalAmountMinor: true,
      currency: true,
      unit: {
        select: {
          code: true,
          unitType: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
      <h1>Bookings</h1>
      <p>Your upcoming sessions and history.</p>
      {bookings.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No bookings found for this account.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {bookings.map((booking) => (
            <li key={booking.id} className="rounded-lg border border-input bg-card p-4">
              <p className="text-sm font-semibold">{booking.unit.unitType.name}</p>
              <p className="text-xs text-muted-foreground">
                Unit {booking.unit.code} • {booking.status} • {booking.paymentStatus}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {formatMoney(booking.totalAmountMinor, booking.currency)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
