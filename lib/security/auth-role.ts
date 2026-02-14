import type { Role } from "@/generated/prisma";

export type UserRole = Role;

export const USER_ROLES = ["ADMIN", "GUEST"] as const satisfies readonly UserRole[];

export const DEFAULT_GUEST_ROLE = "GUEST" as const satisfies UserRole;

export function isUserRole(value: string): value is UserRole {
  return USER_ROLES.includes(value as UserRole);
}

export function resolveUserRole(value: unknown): UserRole {
  if (typeof value !== "string") {
    return DEFAULT_GUEST_ROLE;
  }

  return isUserRole(value) ? value : DEFAULT_GUEST_ROLE;
}
