/*
  Warnings:

  - You are about to drop the column `username` on the `UserDetails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserDetails_username_key";

-- AlterTable
ALTER TABLE "UserDetails" DROP COLUMN "username";
