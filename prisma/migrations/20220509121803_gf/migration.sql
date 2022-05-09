/*
  Warnings:

  - You are about to drop the column `dislike` on the `SubQrlekhData` table. All the data in the column will be lost.
  - The `like` column on the `SubQrlekhData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SubQrlekhData" DROP COLUMN "dislike",
DROP COLUMN "like",
ADD COLUMN     "like" INTEGER[];
