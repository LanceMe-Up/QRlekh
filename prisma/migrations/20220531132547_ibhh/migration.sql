/*
  Warnings:

  - Added the required column `updatedAt` to the `QrImageMapping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QrImageMapping" DROP CONSTRAINT "QrImageMapping_qrMappingId_fkey";

-- AlterTable
ALTER TABLE "QrImageMapping" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "qrMappingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QrImageMapping" ADD CONSTRAINT "QrImageMapping_qrMappingId_fkey" FOREIGN KEY ("qrMappingId") REFERENCES "QrlekhImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
