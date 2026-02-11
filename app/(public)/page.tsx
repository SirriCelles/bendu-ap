import { AmenitiesStrip } from "@/components/public/landing/amenities-strip";
import { FacilitiesAmenitiesSection } from "@/components/public/landing/facilities-amenities-section";
import { FeaturedRoomsSection } from "@/components/public/landing/featured-rooms-section";
import { HeroSection } from "@/components/public/landing/hero-section";
import { RoomCategoriesSection } from "@/components/public/landing/room-categories-section";
import { SummarySection } from "@/components/public/landing/summary-section";
import { StatsRibbonSection } from "@/components/public/landing/stats-ribbon-section";
import { TestimonialsSection } from "@/components/public/landing/testimonials-section";

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
