-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'SUPERADMIN', 'STAFF', 'VENDOR');

-- CreateEnum
CREATE TYPE "OtpType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "passwordResetRequested" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ProfileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "OtpType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrlekhData" (
    "id" SERIAL NOT NULL,
    "knownFor" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "visitor" INTEGER NOT NULL DEFAULT 0,
    "isFeature" BOOLEAN NOT NULL DEFAULT false,
    "desc" TEXT NOT NULL,
    "like" INTEGER[],
    "dislike" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "categoryId" INTEGER,

    CONSTRAINT "QrlekhData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubQrlekhData" (
    "id" SERIAL NOT NULL,
    "knownFor" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "visitor" INTEGER NOT NULL DEFAULT 0,
    "isFeature" BOOLEAN NOT NULL DEFAULT false,
    "desc" TEXT NOT NULL,
    "like" INTEGER[],
    "dislike" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "qrlekhDataId" INTEGER,

    CONSTRAINT "SubQrlekhData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "qrlekhId" INTEGER,
    "subqrId" INTEGER,

    CONSTRAINT "QrLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qrlekhId" INTEGER,
    "subQrlekhId" INTEGER,

    CONSTRAINT "QrType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrlekhImage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qrlekhId" INTEGER NOT NULL,

    CONSTRAINT "QrlekhImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrlekhGallery" (
    "id" SERIAL NOT NULL,
    "gallery" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qrlekhId" INTEGER NOT NULL,

    CONSTRAINT "QrlekhGallery_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "QrBookmark" (
    "id" SERIAL NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "qrlekhId" INTEGER,
    "subQrlekhId" INTEGER,

    CONSTRAINT "QrBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrFavourite" (
    "id" SERIAL NOT NULL,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qrlekhId" INTEGER,
    "userId" INTEGER,
    "subQrfavId" INTEGER,

    CONSTRAINT "QrFavourite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagName" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qrlekhId" INTEGER,
    "subtagId" INTEGER,

    CONSTRAINT "TagName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QrReviews" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "israting" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL DEFAULT 4,
    "userId" INTEGER,
    "qrlekhId" INTEGER,
    "subQrlekhDataId" INTEGER,

    CONSTRAINT "QrReviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileImage_userId_key" ON "ProfileImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhData_title_key" ON "QrlekhData"("title");

-- CreateIndex
CREATE UNIQUE INDEX "SubQrlekhData_title_key" ON "SubQrlekhData"("title");

-- CreateIndex
CREATE UNIQUE INDEX "QrLocation_qrlekhId_key" ON "QrLocation"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "QrLocation_subqrId_key" ON "QrLocation"("subqrId");

-- CreateIndex
CREATE UNIQUE INDEX "QrType_qrlekhId_key" ON "QrType"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "QrType_subQrlekhId_key" ON "QrType"("subQrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhImage_qrlekhId_key" ON "QrlekhImage"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhGallery_qrlekhId_key" ON "QrlekhGallery"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "SubQrlekhImage_subQrImageId_key" ON "SubQrlekhImage"("subQrImageId");

-- CreateIndex
CREATE UNIQUE INDEX "SubQrlekhGallery_subQrImageId_key" ON "SubQrlekhGallery"("subQrImageId");

-- CreateIndex
CREATE UNIQUE INDEX "TagName_qrlekhId_key" ON "TagName"("qrlekhId");

-- CreateIndex
CREATE UNIQUE INDEX "TagName_subtagId_key" ON "TagName"("subtagId");

-- AddForeignKey
ALTER TABLE "ProfileImage" ADD CONSTRAINT "ProfileImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhData" ADD CONSTRAINT "QrlekhData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhData" ADD CONSTRAINT "QrlekhData_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubQrlekhData" ADD CONSTRAINT "SubQrlekhData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubQrlekhData" ADD CONSTRAINT "SubQrlekhData_qrlekhDataId_fkey" FOREIGN KEY ("qrlekhDataId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrLocation" ADD CONSTRAINT "QrLocation_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrLocation" ADD CONSTRAINT "QrLocation_subqrId_fkey" FOREIGN KEY ("subqrId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrType" ADD CONSTRAINT "QrType_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrType" ADD CONSTRAINT "QrType_subQrlekhId_fkey" FOREIGN KEY ("subQrlekhId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhImage" ADD CONSTRAINT "QrlekhImage_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhGallery" ADD CONSTRAINT "QrlekhGallery_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubQrlekhImage" ADD CONSTRAINT "SubQrlekhImage_subQrImageId_fkey" FOREIGN KEY ("subQrImageId") REFERENCES "SubQrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubQrlekhGallery" ADD CONSTRAINT "SubQrlekhGallery_subQrImageId_fkey" FOREIGN KEY ("subQrImageId") REFERENCES "SubQrlekhData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrBookmark" ADD CONSTRAINT "QrBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrBookmark" ADD CONSTRAINT "QrBookmark_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrBookmark" ADD CONSTRAINT "QrBookmark_subQrlekhId_fkey" FOREIGN KEY ("subQrlekhId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrFavourite" ADD CONSTRAINT "QrFavourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrFavourite" ADD CONSTRAINT "QrFavourite_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrFavourite" ADD CONSTRAINT "QrFavourite_subQrfavId_fkey" FOREIGN KEY ("subQrfavId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagName" ADD CONSTRAINT "TagName_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagName" ADD CONSTRAINT "TagName_subtagId_fkey" FOREIGN KEY ("subtagId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrReviews" ADD CONSTRAINT "QrReviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrReviews" ADD CONSTRAINT "QrReviews_qrlekhId_fkey" FOREIGN KEY ("qrlekhId") REFERENCES "QrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrReviews" ADD CONSTRAINT "QrReviews_subQrlekhDataId_fkey" FOREIGN KEY ("subQrlekhDataId") REFERENCES "SubQrlekhData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
