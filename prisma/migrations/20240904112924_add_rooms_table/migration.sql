-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "user1" TEXT NOT NULL,
    "user2" TEXT NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_user1_fkey" FOREIGN KEY ("user1") REFERENCES "UserDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_user2_fkey" FOREIGN KEY ("user2") REFERENCES "UserDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
