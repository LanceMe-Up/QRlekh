/*
  Warnings:

  - The `visitor` column on the `SubQrlekhData` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SubQrlekhData" DROP COLUMN "visitor",
ADD COLUMN     "visitor" INTEGER[];
