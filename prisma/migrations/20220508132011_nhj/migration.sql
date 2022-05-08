/*
  Warnings:

  - You are about to drop the column `rating` on the `QrlekhData` table. All the data in the column will be lost.
  - You are about to drop the column `qrlekhDataId` on the `QrlekhGallery` table. All the data in the column will be lost.
  - You are about to drop the column `qrlekhGalleryId` on the `QrlekhGallery` table. All the data in the column will be lost.
  - You are about to drop the column `qrlekhDataId` on the `QrlekhImage` table. All the data in the column will be lost.
  - You are about to drop the column `qrlekhImageId` on the `QrlekhImage` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `SubQrlekhData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[qrlekhId]` on the table `QrlekhGallery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subQrGalleryId]` on the table `QrlekhGallery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[qrlekhId]` on the table `QrlekhImage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subQrImageId]` on the table `QrlekhImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qrlekhId` to the `QrlekhImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subQrImageId` to the `QrlekhImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "QrlekhGallery" DROP CONSTRAINT "QrlekhGallery_qrlekhDataId_fkey";

-- DropForeignKey
ALTER TABLE "QrlekhGallery" DROP CONSTRAINT "QrlekhGallery_qrlekhGalleryId_fkey";

-- DropForeignKey
ALTER TABLE "QrlekhImage" DROP CONSTRAINT "QrlekhImage_qrlekhDataId_fkey";

-- DropForeignKey
ALTER TABLE "QrlekhImage" DROP CONSTRAINT "QrlekhImage_qrlekhImageId_fkey";

-- DropIndex
DROP INDEX "QrlekhGallery_qrlekhDataId_key";

-- DropIndex
DROP INDEX "QrlekhGallery_qrlekhGalleryId_key";

-- DropIndex
DROP INDEX "QrlekhImage_qrlekhDataId_key";

-- DropIndex
DROP INDEX "QrlekhImage_qrlekhImageId_key";

-- AlterTable
ALTER TABLE "QrlekhData" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "QrlekhGallery" DROP COLUMN "qrlekhDataId",
DROP COLUMN "qrlekhGalleryId",
ADD COLUMN     "qrlekhId" INTEGER,
ADD COLUMN     "subQrGalleryId" INTEGER;

-- AlterTable
ALTER TABLE "QrlekhImage" DROP COLUMN "qrlekhDataId",
DROP COLUMN "qrlekhImageId",
ADD COLUMN     "qrlekhId" INTEGER NOT NULL,
ADD COLUMN     "subQrImageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubQrlekhData" DROP COLUMN "rating";

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhGallery_qrlekhId_key" ON "QrlekhGallery"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhGallery_subQrGalleryId_key" ON "QrlekhGallery"("subQrGalleryId");

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhImage_qrlekhId_key" ON "QrlekhImage"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhImage_subQrImageId_key" ON "QrlekhImage"("subQrImageId");

-- AddForeignKey
ALTER TABLE "QrlekhImage" ADD CONSTRAINT "QrlekhImage_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhImage" ADD CONSTRAINT "QrlekhImage_subQrImageId_fkey" FOREIGN KEY ("subQrImageId") REFERENCES "SubQrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhGallery" ADD CONSTRAINT "QrlekhGallery_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhGallery" ADD CONSTRAINT "QrlekhGallery_subQrGalleryId_fkey" FOREIGN KEY ("subQrGalleryId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
