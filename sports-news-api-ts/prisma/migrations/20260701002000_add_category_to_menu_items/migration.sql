-- AlterTable: Adicionar categoryId a menu_items
ALTER TABLE "menu_items" ADD COLUMN "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
