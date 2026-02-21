import { redirect } from "next/navigation";

type LegacyAuthLoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LegacyAuthLoginPage({ searchParams }: LegacyAuthLoginPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const nextParams = new URLSearchParams();

  if (resolved) {
    for (const [key, value] of Object.entries(resolved)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          nextParams.append(key, item);
        }
      } else if (typeof value === "string") {
        nextParams.set(key, value);
      }
    }
  }

  const query = nextParams.toString();
  redirect(query ? `/login?${query}` : "/login");
}
