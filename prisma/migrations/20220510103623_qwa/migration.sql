/*
  Warnings:

  - You are about to drop the column `subQrGalleryId` on the `QrlekhGallery` table. All the data in the column will be lost.
  - You are about to drop the column `subQrImageId` on the `QrlekhImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QrlekhGallery" DROP CONSTRAINT "QrlekhGallery_subQrGalleryId_fkey";

-- DropForeignKey
ALTER TABLE "QrlekhImage" DROP CONSTRAINT "QrlekhImage_subQrImageId_fkey";

-- DropIndex
DROP INDEX "QrlekhGallery_subQrGalleryId_key";

-- DropIndex
DROP INDEX "QrlekhImage_subQrImageId_key";

-- AlterTable
ALTER TABLE "QrlekhGallery" DROP COLUMN "subQrGalleryId";

-- AlterTable
ALTER TABLE "QrlekhImage" DROP COLUMN "subQrImageId";

-- CreateTable
CREATE TABLE "SubQrlekhImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subQrImageId" INTEGER NOT NULL,

    CONSTRAINT "SubQrlekhImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubQrlekhGallery" (
    "id" SERIAL NOT NULL,
    "gallery" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subQrImageId" INTEGER NOT NULL,

    CONSTRAINT "SubQrlekhGallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubQrlekhImage_subQrImageId_key" ON "SubQrlekhImage"("subQrImageId");

-- CreateIndex
CREATE UNIQUE INDEX "SubQrlekhGallery_subQrImageId_key" ON "SubQrlekhGallery"("subQrImageId");

-- AddForeignKey
ALTER TABLE "SubQrlekhImage" ADD CONSTRAINT "SubQrlekhImage_subQrImageId_fkey" FOREIGN KEY ("subQrImageId") REFERENCES "SubQrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubQrlekhGallery" ADD CONSTRAINT "SubQrlekhGallery_subQrImageId_fkey" FOREIGN KEY ("subQrImageId") REFERENCES "SubQrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
