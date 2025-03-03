/*
  Warnings:

  - You are about to drop the column `locationId` on the `ongs` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `pets` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `ongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ongs" DROP CONSTRAINT "ongs_locationId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_locationId_fkey";

-- AlterTable
ALTER TABLE "ongs" DROP COLUMN "locationId",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "locationId",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs" ADD CONSTRAINT "ongs_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
