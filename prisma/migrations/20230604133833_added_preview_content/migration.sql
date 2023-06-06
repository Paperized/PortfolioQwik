/*
  Warnings:

  - Added the required column `preview_content` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `preview_content` VARCHAR(191) NOT NULL;
