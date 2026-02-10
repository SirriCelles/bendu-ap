export type PublicNavItem = {
  href: string;
  label: string;
};

export const primaryNavItems: PublicNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Browse" },
  { href: "/rooms", label: "Apartments" },
];

export const primaryCta = {
  href: "/rooms",
  label: "Book Now",
};
