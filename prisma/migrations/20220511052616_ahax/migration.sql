/*
  Warnings:

  - Made the column `qrlekhId` on table `QrlekhGallery` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "QrlekhGallery" DROP CONSTRAINT "QrlekhGallery_qrlekhId_fkey";

-- AlterTable
ALTER TABLE "QrlekhGallery" ALTER COLUMN "qrlekhId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "QrlekhGallery" ADD CONSTRAINT "QrlekhGallery_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
