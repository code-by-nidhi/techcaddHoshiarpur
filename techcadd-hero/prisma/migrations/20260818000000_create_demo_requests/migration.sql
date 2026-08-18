-- CreateTable
CREATE TABLE `demo_bookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `email` VARCHAR(254) NULL,
    `course` VARCHAR(120) NULL,
    `preferredDate` VARCHAR(32) NULL,
    `message` TEXT NULL,
    `source` VARCHAR(32) NOT NULL DEFAULT 'navbar',
    `status` VARCHAR(16) NOT NULL DEFAULT 'new',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `demo_bookings_phone_idx`(`phone`),
    INDEX `demo_bookings_status_createdAt_idx`(`status`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

