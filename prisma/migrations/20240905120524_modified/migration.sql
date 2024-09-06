/*
  Warnings:

  - You are about to drop the column `isGroupChat` on the `RoomParticipant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "isGroupChat" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RoomParticipant" DROP COLUMN "isGroupChat";
