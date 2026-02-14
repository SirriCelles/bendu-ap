export const SEED_KEYS = Object.freeze({
  propertySlug: "alonta-towers",
});

export const PROPERTY_BASELINE_SEED = Object.freeze({
  slug: SEED_KEYS.propertySlug,
  name: "Alonta Towers",
  description:
    "Premium, modern stays in a secure Upstation location with central access and warm hospitality. Facilities include high-speed wifi, cafeteria bar, fitness center, and parking.",
  city: "Bamenda",
  country: "Cameroon",
  addressLine1: "Upstation",
  timezone: "Africa/Douala",
  defaultCurrency: "XAF",
});

export type AmenityMetadata = {
  key: string;
  title: string;
  description: string;
};

export const STARTER_AMENITY_METADATA = Object.freeze({
  sellingPoints: [
    {
      key: "secure-location-upstation",
      title: "Secure Location in Upstation Bamenda",
      description: "Secure area in Upstation Bamenda.",
    },
    {
      key: "city-heart-location",
      title: "Ideally located in the city's heart",
      description: "Easy access and convenience.",
    },
    {
      key: "luxury-modern-comfort",
      title: "Luxurious, modern and comfortable",
      description: "Fully equipped space designed for comfort.",
    },
    {
      key: "customer-care",
      title: "Customer Care",
      description: "Friendly, welcoming staff for a delightful stay.",
    },
    {
      key: "great-prices-offers",
      title: "Great Prices and Offers",
      description: "Unbeatable prices with tailored offers.",
    },
  ] as const satisfies readonly AmenityMetadata[],
  facilities: [
    {
      key: "high-speed-wifi",
      title: "High Speed Wifi",
      description: "Seamless, high-speed internet throughout the property.",
    },
    {
      key: "cafeteria-bar",
      title: "Cafeteria Bar",
      description: "Gourmet dishes and cocktails at the restaurant & bar.",
    },
    {
      key: "fitness-center",
      title: "Fitness Center",
      description: "Modern gym with state-of-the-art equipment.",
    },
    {
      key: "parking-space",
      title: "Parking Space",
      description: "Secure parking available for guests.",
    },
  ] as const satisfies readonly AmenityMetadata[],
});

export const REQUIRED_UNIT_TYPE_SLUGS = Object.freeze([
  "standard-room",
  "bedsit-chambre-moderne",
  "studio-one-bedroom",
  "apartment-two-bedroom",
] as const);

export type RequiredUnitTypeSlug = (typeof REQUIRED_UNIT_TYPE_SLUGS)[number];

export type UnitSeedKey = {
  unitTypeSlug: RequiredUnitTypeSlug;
  unitCode: string;
};

export type UnitBaselineSeed = {
  unitTypeSlug: RequiredUnitTypeSlug;
  unitCode: string;
  unitName: string;
  floor: string;
  nightlyRateMinor: number;
};

export type UnitTypeBaselineSeed = {
  slug: RequiredUnitTypeSlug;
  name: string;
  description: string;
  coverImageUrl: string | null;
  galleryImageUrls: readonly string[];
  estimatedRating: number;
  maxGuests: number;
  basePriceMinor: number;
  displayOrder: number;
  currency: "XAF";
};

export const UNIT_TYPE_BASELINE_SEED: ReadonlyArray<UnitTypeBaselineSeed> = Object.freeze([
  {
    slug: "standard-room",
    name: "Standard Room",
    description: "Modern, comfortable room (no kitchen).",
    coverImageUrl: "/images/landing/hero-bg-image.png",
    galleryImageUrls: ["/images/landing/hero-bg-image.png"],
    estimatedRating: 4.8,
    maxGuests: 2,
    basePriceMinor: 20000,
    displayOrder: 1,
    currency: "XAF",
  },
  {
    slug: "bedsit-chambre-moderne",
    name: "Bedsit (Chambre Moderne)",
    description: "Modern bedsit with kitchen.",
    coverImageUrl: "/images/landing/hero-bg-image.png",
    galleryImageUrls: ["/images/landing/hero-bg-image.png"],
    estimatedRating: 4.7,
    maxGuests: 2,
    basePriceMinor: 25000,
    displayOrder: 2,
    currency: "XAF",
  },
  {
    slug: "studio-one-bedroom",
    name: "Studio (One-bedroom Apartment)",
    description: "Private one-bedroom studio apartment.",
    coverImageUrl: "/images/landing/hero-bg-image.png",
    galleryImageUrls: ["/images/landing/hero-bg-image.png"],
    estimatedRating: 4.9,
    maxGuests: 3,
    basePriceMinor: 35000,
    displayOrder: 3,
    currency: "XAF",
  },
  {
    slug: "apartment-two-bedroom",
    name: "Apartment (Two-bedroom)",
    description: "Spacious two-bedroom apartment.",
    coverImageUrl: "/images/landing/hero-bg-image.png",
    galleryImageUrls: ["/images/landing/hero-bg-image.png"],
    estimatedRating: 4.6,
    maxGuests: 4,
    basePriceMinor: 60000,
    displayOrder: 4,
    currency: "XAF",
  },
]);

// Stable, deterministic unit keys used for idempotent seed upserts.
export const BASELINE_UNIT_KEYS = Object.freeze<UnitSeedKey[]>([
  { unitTypeSlug: "standard-room", unitCode: "STD-101" },
  { unitTypeSlug: "bedsit-chambre-moderne", unitCode: "BED-201" },
  { unitTypeSlug: "studio-one-bedroom", unitCode: "STU-301" },
  { unitTypeSlug: "apartment-two-bedroom", unitCode: "APT-401" },
]);

export const BASELINE_UNITS_SEED: ReadonlyArray<UnitBaselineSeed> = Object.freeze([
  {
    unitTypeSlug: "standard-room",
    unitCode: "STD-101",
    unitName: "Standard Room 101",
    floor: "1",
    nightlyRateMinor: 20000,
  },
  {
    unitTypeSlug: "bedsit-chambre-moderne",
    unitCode: "BED-201",
    unitName: "Bedsit 201",
    floor: "2",
    nightlyRateMinor: 25000,
  },
  {
    unitTypeSlug: "studio-one-bedroom",
    unitCode: "STU-301",
    unitName: "Studio 301",
    floor: "3",
    nightlyRateMinor: 35000,
  },
  {
    unitTypeSlug: "apartment-two-bedroom",
    unitCode: "APT-401",
    unitName: "Apartment 401",
    floor: "4",
    nightlyRateMinor: 60000,
  },
]);
