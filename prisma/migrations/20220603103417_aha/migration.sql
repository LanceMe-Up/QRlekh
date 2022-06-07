/*
  Warnings:

  - You are about to drop the column `expiryDate` on the `QrBookmark` table. All the data in the column will be lost.
  - You are about to drop the column `isBookmark` on the `QrBookmark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QrBookmark" DROP COLUMN "expiryDate",
DROP COLUMN "isBookmark";
