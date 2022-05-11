-- DropForeignKey
ALTER TABLE "QrType" DROP CONSTRAINT "QrType_qrlekhId_fkey";

-- AlterTable
ALTER TABLE "QrType" ALTER COLUMN "qrlekhId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QrType" ADD CONSTRAINT "QrType_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
