-- CreateTable
CREATE TABLE "TagName" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "TagName_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagName" ADD CONSTRAINT "TagName_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
