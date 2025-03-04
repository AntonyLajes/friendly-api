/*
  Warnings:

  - Made the column `address` on table `ongs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `ongs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ongs" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL;
