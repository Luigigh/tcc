/*
  Warnings:

  - Made the column `duration` on table `job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mode` on table `job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salary` on table `job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `job` ADD COLUMN `benefits` VARCHAR(191) NULL,
    ADD COLUMN `requirements` VARCHAR(191) NULL,
    ADD COLUMN `skills` VARCHAR(191) NULL,
    MODIFY `duration` VARCHAR(191) NOT NULL,
    MODIFY `mode` ENUM('REMOTO', 'PRESENCIAL', 'HÍBRIDO') NOT NULL,
    MODIFY `salary` VARCHAR(191) NOT NULL;
