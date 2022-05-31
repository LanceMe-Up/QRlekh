-- CreateTable
CREATE TABLE "QrImageMapping" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "coords" INTEGER[],
    "preFillColor" TEXT NOT NULL,
    "fillColor" TEXT NOT NULL,
    "strokeColor" TEXT NOT NULL,
    "qrMappingId" INTEGER NOT NULL,

    CONSTRAINT "QrImageMapping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QrImageMapping" ADD CONSTRAINT "QrImageMapping_qrMappingId_fkey" FOREIGN KEY ("qrMappingId") REFERENCES "QrlekhImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
