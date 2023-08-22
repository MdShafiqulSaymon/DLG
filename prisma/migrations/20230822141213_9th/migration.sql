/*
  Warnings:

  - You are about to drop the `_categorytopost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_B_fkey`;

-- DropTable
DROP TABLE `_categorytopost`;

-- CreateTable
CREATE TABLE `Post_category` (
    `postId` INTEGER NOT NULL,
    `cateId` INTEGER NOT NULL,

    PRIMARY KEY (`postId`, `cateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post_category` ADD CONSTRAINT `Post_category_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_category` ADD CONSTRAINT `Post_category_cateId_fkey` FOREIGN KEY (`cateId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
