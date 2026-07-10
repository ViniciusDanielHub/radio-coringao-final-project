-- AlterTable
ALTER TABLE "banners" ADD COLUMN     "subtitle" TEXT;

-- CreateTable
CREATE TABLE "event_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT,
    "time" TEXT,
    "venue" TEXT,
    "status" TEXT NOT NULL DEFAULT 'agendado',
    "image" TEXT,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "eventCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_categories_eventId_idx" ON "event_categories"("eventId");

-- CreateIndex
CREATE INDEX "event_items_eventCategoryId_idx" ON "event_items"("eventCategoryId");

-- AddForeignKey
ALTER TABLE "event_categories" ADD CONSTRAINT "event_categories_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_items" ADD CONSTRAINT "event_items_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
