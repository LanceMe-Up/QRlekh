/*
  Warnings:

  - The `like` column on the `QrlekhData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dislike` column on the `QrlekhData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "QrlekhData" DROP COLUMN "like",
ADD COLUMN     "like" INTEGER[],
DROP COLUMN "dislike",
ADD COLUMN     "dislike" INTEGER[];
