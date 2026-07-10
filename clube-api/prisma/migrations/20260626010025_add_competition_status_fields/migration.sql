-- AlterTable
ALTER TABLE "competitions" ADD COLUMN     "eliminationMessage" TEXT,
ADD COLUMN     "isParticipating" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "status" TEXT;
