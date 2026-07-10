-- AlterTable
ALTER TABLE "article_images" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "quotes" JSONB;
