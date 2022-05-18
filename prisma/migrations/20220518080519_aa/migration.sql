/*
  Warnings:

  - A unique constraint covering the columns `[qrlekhId]` on the table `QrLocation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subqrId]` on the table `QrLocation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QrLocation_qrlekhId_key" ON "QrLocation"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "QrLocation_subqrId_key" ON "QrLocation"("subqrId");
