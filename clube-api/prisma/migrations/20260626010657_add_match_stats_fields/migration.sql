-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "awayCorners" INTEGER,
ADD COLUMN     "awayOnTarget" INTEGER,
ADD COLUMN     "awayPossession" INTEGER,
ADD COLUMN     "awayShots" INTEGER,
ADD COLUMN     "homeCorners" INTEGER,
ADD COLUMN     "homeOnTarget" INTEGER,
ADD COLUMN     "homePossession" INTEGER,
ADD COLUMN     "homeShots" INTEGER;
