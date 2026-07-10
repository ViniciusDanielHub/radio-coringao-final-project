-- AlterTable
ALTER TABLE "site_settings" ADD COLUMN     "copyrightText" TEXT,
ADD COLUMN     "socialTiktok" TEXT;

-- CreateTable
CREATE TABLE "footer_links" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footer_links_pkey" PRIMARY KEY ("id")
);
