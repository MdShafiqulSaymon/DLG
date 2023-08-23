-- DropForeignKey
ALTER TABLE `post_category` DROP FOREIGN KEY `Post_category_cateId_fkey`;

-- DropForeignKey
ALTER TABLE `post_category` DROP FOREIGN KEY `Post_category_postId_fkey`;

-- AddForeignKey
ALTER TABLE `Post_category` ADD CONSTRAINT `Post_category_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post_category` ADD CONSTRAINT `Post_category_cateId_fkey` FOREIGN KEY (`cateId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
