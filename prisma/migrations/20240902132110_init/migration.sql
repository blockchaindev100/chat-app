/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" VARCHAR NOT NULL,
    "fromID" TEXT NOT NULL,
    "toID" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_email_key" ON "UserDetails"("email");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fromID_fkey" FOREIGN KEY ("fromID") REFERENCES "UserDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_toID_fkey" FOREIGN KEY ("toID") REFERENCES "UserDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
