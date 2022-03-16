-- AlterTable
ALTER TABLE "QrlakeData" ADD COLUMN     "tagNameId" INTEGER;

-- AddForeignKey
ALTER TABLE "QrlakeData" ADD CONSTRAINT "QrlakeData_tagNameId_fkey" FOREIGN KEY ("tagNameId") REFERENCES "TagName"("id") ON DELETE SET NULL ON UPDATE CASCADE;
