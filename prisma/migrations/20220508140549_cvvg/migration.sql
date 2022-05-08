-- DropForeignKey
ALTER TABLE "TagName" DROP CONSTRAINT "TagName_qrlekhId_fkey";

-- AlterTable
ALTER TABLE "TagName" ALTER COLUMN "qrlekhId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TagName" ADD CONSTRAINT "TagName_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
