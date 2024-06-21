/*
  Warnings:

  - A unique constraint covering the columns `[db_table_name]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `db_table_name` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Table` ADD COLUMN `db_table_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Table_db_table_name_key` ON `Table`(`db_table_name`);
