import Link from "next/link";
import { Sparkles } from "lucide-react";

type VerifyRequestPageProps = {
  searchParams?: Promise<{
    returnTo?: string;
    callbackUrl?: string;
    email?: string;
  }>;
};

const DEFAULT_RETURN_TO = "/bookings";

function resolveSafeReturnTo(value: string | undefined): string {
  if (!value) {
    return DEFAULT_RETURN_TO;
  }

  const trimmed = value.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return DEFAULT_RETURN_TO;
  }

  return trimmed;
}

export default async function VerifyRequestPage({ searchParams }: VerifyRequestPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const returnTo = resolveSafeReturnTo(resolved?.returnTo ?? resolved?.callbackUrl);
  const email = typeof resolved?.email === "string" ? resolved.email.trim() : "";

  return (
    <main className="min-h-screen bg-[#f6f6f8]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[38%_62%]">
        <aside className="relative hidden overflow-hidden bg-[#0b1020] lg:block">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_44%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_40%)]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          <p className="absolute left-10 top-1/2 max-w-sm -translate-y-1/2 text-8xl font-black leading-[0.9] tracking-tight text-white/7">
            Powered By
            <br />
            BookEasy
          </p>
        </aside>

        <section className="mx-auto flex w-full max-w-md items-center px-6 py-14">
          <div className="w-full rounded-xl border border-[#d8d8dc] bg-white p-6 shadow-sm">
            <div className="text-center">
              <Sparkles className="mx-auto h-10 w-10 text-primary" />
              <h1 className="mt-4 text-3xl font-bold text-foreground">Check your email</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                We sent you a magic sign-in link. Open it to finish logging in.
              </p>
              {email ? (
                <p className="mt-2 text-sm font-medium text-foreground">
                  Sent to: <span className="font-semibold">{email}</span>
                </p>
              ) : null}
            </div>

            <div className="mt-6 space-y-2">
              <Link
                href={`/login?returnTo=${encodeURIComponent(returnTo)}`}
                className="block text-center text-sm text-muted-foreground underline underline-offset-2"
              >
                Try a different email
              </Link>
              <Link
                href={returnTo}
                className="block text-center text-sm text-muted-foreground underline underline-offset-2"
              >
                Back to previous page
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
