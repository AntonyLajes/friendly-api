/*
  Warnings:

  - Made the column `locationId` on table `ongs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ongs" DROP CONSTRAINT "ongs_locationId_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_locationId_fkey";

-- AlterTable
ALTER TABLE "ongs" ALTER COLUMN "locationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "locationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ongs" ADD CONSTRAINT "ongs_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
