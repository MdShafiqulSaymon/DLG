/*
  Warnings:

  - Made the column `firstName` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profile` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL;
