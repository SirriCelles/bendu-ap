import type { Metadata } from "next";

import { AmenitiesStrip } from "@/components/public/landing/amenities-strip";
import { FacilitiesAmenitiesSection } from "@/components/public/landing/facilities-amenities-section";
import { FeaturedRoomsSection } from "@/components/public/landing/featured-rooms-section";
import { HeroSection } from "@/components/public/landing/hero-section";
import { RoomCategoriesSection } from "@/components/public/landing/room-categories-section";
import { SummarySection } from "@/components/public/landing/summary-section";
import { StatsRibbonSection } from "@/components/public/landing/stats-ribbon-section";
import { TestimonialsSection } from "@/components/public/landing/testimonials-section";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover modern rooms and apartments in Bamenda with BookEasy. Browse amenities, featured stays, and reserve your ideal room.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "BookEasy - Rooms and Apartments in Bamenda",
    description:
      "Browse room categories, featured apartments, and guest amenities for your next stay in Bamenda.",
    url: absoluteUrl("/"),
    siteName: "BookEasy",
    images: [
      {
        url: absoluteUrl("/images/landing/hero-bg-image.png"),
        alt: "BookEasy guest-house hero image",
      },
    ],
  },
};

export default function PublicPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <AmenitiesStrip />
      <RoomCategoriesSection />
      <FeaturedRoomsSection />
      <FacilitiesAmenitiesSection />
      <StatsRibbonSection />
      <TestimonialsSection />
      <SummarySection />
    </main>
  );
}
