/*
  Warnings:

  - You are about to drop the column `qrLocationId` on the `QrLocation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[qrlekhId]` on the table `QrLocation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "QrLocation" DROP CONSTRAINT "QrLocation_qrLocationId_fkey";

-- DropIndex
DROP INDEX "QrLocation_qrLocationId_key";

-- AlterTable
ALTER TABLE "QrLocation" DROP COLUMN "qrLocationId",
ADD COLUMN     "qrlekhId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "QrLocation_qrlekhId_key" ON "QrLocation"("qrlekhId");

-- AddForeignKey
ALTER TABLE "QrLocation" ADD CONSTRAINT "QrLocation_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
