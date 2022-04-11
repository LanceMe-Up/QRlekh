-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "OtpType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "passwordResetRequested" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "QrlekhData" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "knownFor" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT,
    "location" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 1,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "favourite" BOOLEAN DEFAULT false,
    "like" BOOLEAN DEFAULT false,
    "dislike" BOOLEAN DEFAULT false,
    "userId" INTEGER NOT NULL,
    "tagNameId" INTEGER,

    CONSTRAINT "QrlekhData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagName" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "lat" DECIMAL(65,30),
    "long" DECIMAL(65,30),
    "userId" INTEGER,

    CONSTRAINT "TagName_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "QrlekhData_slug_key" ON "QrlekhData"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TagName_lat_key" ON "TagName"("lat");

-- CreateIndex
CREATE UNIQUE INDEX "TagName_long_key" ON "TagName"("long");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhData" ADD CONSTRAINT "QrlekhData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrlekhData" ADD CONSTRAINT "QrlekhData_tagNameId_fkey" FOREIGN KEY ("tagNameId") REFERENCES "TagName"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagName" ADD CONSTRAINT "TagName_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
