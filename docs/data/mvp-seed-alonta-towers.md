# Alonta Towers — MVP Seed Data Blueprint (Draft)

> Purpose: single-property, deterministic seed dataset for local dev + tests.  
> Currency: **XAF** (all prices stored in **minor units**; for XAF use 1 XAF = 1 minor unit).

---

## Property

- **propertySlug:** `alonta-towers`
- **propertyName:** `Alonta Towers Guest House`
- **city:** Bamenda
- **area/quarter:** Upstation (often spelled “Upstation”; keep one spelling consistently)
- **country:** Cameroon
- **timezone:** Africa/Douala

### Public description (short)

Premium, modern stays in a secure Upstation location — central access, great value, and warm hospitality.

---

## Unit Types (Inventory Categories)

> Rule: each unitType must have at least **one** seeded unit.  
> Pricing: nightly **integer minor units**.

### 1) Standard Room (no kitchen)

- **unitTypeSlug:** `standard-room`
- **displayName:** `Standard Room`
- **hasKitchen:** false
- **baseNightlyRateMinor:** `20000`
- **marketingLabel:** Modern, comfortable room (no kitchen)

### 2) Bedsits / Chambre Moderne (with kitchen)

- **unitTypeSlug:** `bedsit-chambre-moderne`
- **displayName:** `Bedsit (Chambre Moderne)`
- **hasKitchen:** true
- **baseNightlyRateMinor:** `25000`
- **marketingLabel:** Modern bedsit with kitchen

### 3) Studio (one-bedroom apartment)

- **unitTypeSlug:** `studio-one-bedroom`
- **displayName:** `Studio (One-bedroom Apartment)`
- **bedrooms:** 1
- **baseNightlyRateMinor:** `35000`
- **marketingLabel:** Private one-bedroom studio apartment

### 4) Apartment (two-bedroom apartment)

- **unitTypeSlug:** `apartment-two-bedroom`
- **displayName:** `Apartment (Two-bedroom)`
- **bedrooms:** 2
- **baseNightlyRateMinor:** `60000`
- **marketingLabel:** Spacious two-bedroom apartment

---

## Units (Seed at least 1 per unit type)

> Suggested deterministic unit codes; adjust count later.

- Standard Room:
  - **unitCode:** `STD-101`
  - **unitName:** `Standard Room 101`
  - **nightlyRateMinor:** `20000`

- Bedsit (Chambre Moderne):
  - **unitCode:** `BED-201`
  - **unitName:** `Bedsit 201`
  - **nightlyRateMinor:** `25000`

- Studio (One-bedroom):
  - **unitCode:** `STU-301`
  - **unitName:** `Studio 301`
  - **nightlyRateMinor:** `35000`

- Apartment (Two-bedroom):
  - **unitCode:** `APT-401`
  - **unitName:** `Apartment 401`
  - **nightlyRateMinor:** `60000`

---

## Amenities (Marketing + Facilities)

> Split into two groups: “selling points” (copy) vs “facilities” (tangible).  
> Implementation tip: store as Amenity records with stable **keys** and optional categories.

### Selling Points (Marketing Amenities)

- **amenityKey:** `secure-location-upstation`
  - **title:** Secure Location in Upstation Bamenda
  - **description:** Secure area in Upstation Bamenda.

- **amenityKey:** `city-heart-location`
  - **title:** Ideally located in the city's heart
  - **description:** Easy access and convenience.

- **amenityKey:** `luxury-modern-comfort`
  - **title:** Luxurious, modern and comfortable
  - **description:** Fully equipped space designed for comfort.

- **amenityKey:** `customer-care`
  - **title:** Customer Care
  - **description:** Friendly, welcoming staff for a delightful stay.

- **amenityKey:** `great-prices-offers`
  - **title:** Great Prices and Offers
  - **description:** Unbeatable prices with tailored offers.

### Facilities (On-site Features)

- **amenityKey:** `high-speed-wifi`
  - **title:** High Speed Wifi
  - **description:** Seamless, high-speed internet throughout the property.

- **amenityKey:** `cafeteria-bar`
  - **title:** Cafeteria Bar
  - **description:** Gourmet dishes and cocktails at the restaurant & bar.

- **amenityKey:** `fitness-center`
  - **title:** Fitness Center
  - **description:** Modern gym with state-of-the-art equipment.

- **amenityKey:** `parking-space`
  - **title:** Parking Space
  - **description:** Secure parking available for guests.

---

## Seeding Rules (Idempotent Keys)

- Property unique key: `property.slug = "alonta-towers"`
- UnitType unique key: `unitType.slug`
- Unit unique key: `(propertyId, unit.code)` or globally unique `unit.code`
- Amenity unique key: `amenity.key`

---

## Notes

- Prices should remain **integers** (minor units) to avoid rounding bugs.
- Inventory availability should treat bookings as half-open intervals: **[checkIn, checkOut)**.
