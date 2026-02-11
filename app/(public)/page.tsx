import { AmenitiesStrip } from "@/components/public/landing/amenities-strip";
import { FeaturedRoomsSection } from "@/components/public/landing/featured-rooms-section";
import { HeroSection } from "@/components/public/landing/hero-section";
import { RoomCategoriesSection } from "@/components/public/landing/room-categories-section";

export default function PublicPage() {
  return (
    <main>
      <HeroSection />
      <AmenitiesStrip />
      <RoomCategoriesSection />
      <FeaturedRoomsSection />
    </main>
  );
}
