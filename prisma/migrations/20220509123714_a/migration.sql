/*
  Warnings:

  - You are about to drop the column `expire` on the `QrBookmark` table. All the data in the column will be lost.
  - Added the required column `expiryDate` to the `QrBookmark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QrBookmark" DROP COLUMN "expire",
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL;
