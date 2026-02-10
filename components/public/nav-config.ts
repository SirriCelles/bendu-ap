export type PublicNavItem = {
  href: string;
  label: string;
};

export const primaryNavItems: PublicNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Browse" },
  { href: "/rooms", label: "Restaurant" },
];

export const primaryCta = {
  href: "/rooms",
  label: "Book Now",
};
