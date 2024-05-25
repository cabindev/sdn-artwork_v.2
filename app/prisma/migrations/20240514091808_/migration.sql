/*
  Warnings:

  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_categoryId_fkey`;

-- DropIndex
DROP INDEX `Category_name_key` ON `Category`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `zipUrl` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
