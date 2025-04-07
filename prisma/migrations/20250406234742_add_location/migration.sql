/*
  Warnings:

  - Made the column `link` on table `job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `job` MODIFY `link` VARCHAR(191) NOT NULL,
    MODIFY `location` VARCHAR(191) NOT NULL;
