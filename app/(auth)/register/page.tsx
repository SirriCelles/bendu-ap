import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  if (errorCode === "Verification") {
    return "This sign-in link is invalid or expired. Request a new link to continue.";
  }

  if (errorCode === "EmailProviderUnavailable") {
    return "Magic-link signup is temporarily unavailable. Please use Google or credentials.";
  }

  return "Sign-up failed. Please retry.";
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const returnTo = resolveSafeReturnTo(resolved?.returnTo ?? resolved?.callbackUrl);
  const errorMessage = resolveAuthErrorMessage(resolved?.error);

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
          <div className="w-full">
            <div className="mb-8 text-center">
              <Sparkles className="mx-auto h-10 w-10 text-primary" />
              <h1 className="mt-4 text-4xl font-bold text-foreground">Create your account</h1>
            </div>

            {errorMessage ? (
              <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}

            <div className="mt-5 flex items-center justify-end text-sm">
              <Link
                href={`/login?returnTo=${encodeURIComponent(returnTo)}`}
                className="text-muted-foreground underline underline-offset-2"
              >
                Already have an account?
              </Link>
            </div>

            <div className="my-7 border-t border-[#e7e7ea]" />

            <form
              action={async (formData) => {
                "use server";
                const email = String(formData.get("email") ?? "").trim();
                if (!email) {
                  return;
                }
                try {
                  await signIn("resend", {
                    email,
                    redirectTo: returnTo,
                  });
                } catch {
                  redirect(
                    `/register?returnTo=${encodeURIComponent(returnTo)}&error=EmailProviderUnavailable`
                  );
                }
              }}
              className="space-y-3"
            >
              <Input
                name="email"
                type="email"
                required
                placeholder="Email for magic link"
                className="h-12 rounded-md border-[#d8d8dc] bg-white"
              />
              <Button
                type="submit"
                variant="outline"
                className="h-12 w-full justify-center border-[#d8d8dc] bg-white text-base font-normal text-foreground"
              >
                <Image
                  src="/icon/magic-svgrepo-com.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mr-2 h-4 w-4"
                  aria-hidden
                />
                Email me a sign-in link
              </Button>
            </form>

            <div className="my-7 border-t border-[#e7e7ea]" />

            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: returnTo });
              }}
              className="space-y-3"
            >
              <Button
                type="submit"
                variant="outline"
                className="h-12 w-full justify-center border-[#d8d8dc] bg-white text-base font-normal text-foreground"
              >
                <Image
                  src="/icons/socials/google-icon-logo-svgrepo-com.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="mr-2 h-4 w-4"
                  aria-hidden
                />
                Continue with Google
              </Button>
            </form>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
