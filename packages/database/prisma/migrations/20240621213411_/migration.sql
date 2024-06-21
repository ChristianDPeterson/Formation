/*
  Warnings:

  - You are about to drop the column `schema_id` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schema` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Table` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Field` DROP FOREIGN KEY `Field_tableId_fkey`;

-- DropForeignKey
ALTER TABLE `Table` DROP FOREIGN KEY `Table_schema_id_fkey`;

-- DropForeignKey
ALTER TABLE `Table` DROP FOREIGN KEY `Table_userId_fkey`;

-- AlterTable
ALTER TABLE `Table` DROP COLUMN `schema_id`,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Field`;

-- DropTable
DROP TABLE `Schema`;

-- AddForeignKey
ALTER TABLE `Table` ADD CONSTRAINT `Table_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
