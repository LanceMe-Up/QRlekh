-- DropForeignKey
ALTER TABLE "SubQrlekhData" DROP CONSTRAINT "SubQrlekhData_qrlekhDataId_fkey";

-- AlterTable
ALTER TABLE "SubQrlekhData" ALTER COLUMN "qrlekhDataId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SubQrlekhData" ADD CONSTRAINT "SubQrlekhData_qrlekhDataId_fkey" FOREIGN KEY ("qrlekhDataId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
