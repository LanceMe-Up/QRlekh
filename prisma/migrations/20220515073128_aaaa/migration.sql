/*
  Warnings:

  - You are about to drop the column `location` on the `QrlekhData` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `SubQrlekhData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QrlekhData" DROP COLUMN "location",
ADD COLUMN     "isFeature" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SubQrlekhData" DROP COLUMN "location",
ADD COLUMN     "isFeature" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "QrLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "qrLocationId" INTEGER,
    "subqrId" INTEGER,

    CONSTRAINT "QrLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QrLocation_qrLocationId_key" ON "QrLocation"("qrLocationId");

-- CreateIndex
CREATE UNIQUE INDEX "QrLocation_subqrId_key" ON "QrLocation"("subqrId");

-- AddForeignKey
ALTER TABLE "QrLocation" ADD CONSTRAINT "QrLocation_qrLocationId_fkey" FOREIGN KEY ("qrLocationId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrLocation" ADD CONSTRAINT "QrLocation_subqrId_fkey" FOREIGN KEY ("subqrId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
