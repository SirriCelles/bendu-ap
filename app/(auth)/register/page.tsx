import Link from "next/link";

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

type RegisterPageProps = {
  searchParams?: Promise<{
    returnTo?: string;
    callbackUrl?: string;
    error?: string;
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

function resolveAuthErrorMessage(errorCode: string | undefined): string | null {
  if (!errorCode) {
    return null;
  }

  if (errorCode === "AccessDenied") {
    return "Sign-up was denied. Please try again with a valid account.";
  }

  if (errorCode === "OAuthCallbackError" || errorCode === "OAuthAccountNotLinked") {
    return "We could not complete account creation. Please try again.";
  }

  return "Sign-up failed. Please retry.";
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const returnTo = resolveSafeReturnTo(resolved?.returnTo ?? resolved?.callbackUrl);
  const errorMessage = resolveAuthErrorMessage(resolved?.error);

  return (
    <main className="mx-auto flex min-h-[70svh] w-full max-w-md items-center px-4 py-10">
      <section className="w-full rounded-xl border border-input bg-card p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-foreground">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up to unlock your dashboard and booking history.
        </p>

        {errorMessage ? <p className="mt-4 text-sm text-destructive">{errorMessage}</p> : null}

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: returnTo });
          }}
          className="mt-5"
        >
          <Button type="submit" className="w-full">
            Continue with Google
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`}
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}
