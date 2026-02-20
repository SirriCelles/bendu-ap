-- AlterTable
ALTER TABLE "ProviderEvent" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UnitType" ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "estimatedRating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
ADD COLUMN     "galleryImageUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
