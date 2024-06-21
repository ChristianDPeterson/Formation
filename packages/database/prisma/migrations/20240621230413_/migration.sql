/*
  Warnings:

  - You are about to drop the column `db_table_name` on the `Table` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Table_db_table_name_key` ON `Table`;

-- AlterTable
ALTER TABLE `Table` DROP COLUMN `db_table_name`;
