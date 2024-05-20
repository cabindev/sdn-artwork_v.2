-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 20, 2024 at 09:27 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sdnmedia`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`id`, `name`) VALUES
(1, 'T8'),
(2, 'T2'),
(3, 'T7'),
(4, 'A1'),
(5, 'A2'),
(6, 'A3'),
(7, 'TT!1'),
(8, 'YY4'),
(9, 'UUU');

-- --------------------------------------------------------

--
-- Table structure for table `Post`
--

CREATE TABLE `Post` (
  `id` int(11) NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `categoryId` int(11) DEFAULT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `zipUrl` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `downloads` int(11) NOT NULL DEFAULT '0',
  `views` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Post`
--

INSERT INTO `Post` (`id`, `title`, `content`, `createdAt`, `categoryId`, `imageUrl`, `updatedAt`, `zipUrl`, `downloads`, `views`) VALUES
(33, 'Y1', 'fghgn', '2024-05-18 12:26:03.098', 1, '/images/1716035163092.jpg', '2024-05-20 08:42:05.615', '/zip/1716035163094.zip', 3, 17),
(34, 'X1', 'ghmhm', '2024-05-18 12:26:22.521', 3, '/images/1716035182517.jpg', '2024-05-20 09:08:57.743', '/zip/1716035182519.zip', 1, 35),
(35, 'ma', 'fgnbgn', '2024-05-19 10:23:59.977', 2, '/images/1716114239972.jpg', '2024-05-20 08:35:56.791', '/zip/1716114239975.zip', 1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('25dd0c1f-4cf0-4958-b480-baf6bd470116', '58e97530ddc33970c3672138e5e07b3d0507d041e75c4afaebdfd1c51d998803', '2024-05-14 09:18:00.746', '20240513132745_add_post_category', NULL, NULL, '2024-05-14 09:18:00.725', 1),
('2fa20b38-2cd1-4a38-a38c-2b7e8638067c', '58e97530ddc33970c3672138e5e07b3d0507d041e75c4afaebdfd1c51d998803', '2024-05-14 09:18:00.618', '20240513084737_add_post_category', NULL, NULL, '2024-05-14 09:18:00.595', 1),
('5ddff429-a17b-465c-8a71-d5e8446dd5d0', 'ea683e045ac24189afab88db1b9f73c7d04631b8caae03050eabe4b5d34731c7', '2024-05-14 09:18:00.724', '20240513124751_backpost1', NULL, NULL, '2024-05-14 09:18:00.689', 1),
('7ec2675f-d03f-490e-a192-acacda7d03f1', 'ea683e045ac24189afab88db1b9f73c7d04631b8caae03050eabe4b5d34731c7', '2024-05-14 09:18:00.594', '20240511160930_post1', NULL, NULL, '2024-05-14 09:18:00.558', 1),
('9fa6bb46-9be3-4f53-a173-87d0e0f4ed79', '07429042f9a8ad2ba423c434c8a159c3f70806dd92efb2b41c0e771560d84bf4', '2024-05-14 09:18:00.688', '20240513094007_prisma_cat', NULL, NULL, '2024-05-14 09:18:00.619', 1),
('ad18a202-8795-416b-820d-fd5e699c57eb', '07429042f9a8ad2ba423c434c8a159c3f70806dd92efb2b41c0e771560d84bf4', '2024-05-14 09:18:00.820', '20240513150803_', NULL, NULL, '2024-05-14 09:18:00.747', 1),
('af0b927f-65fa-4b90-a6ba-b410dc494c41', 'bd70f7680db95d008780bc339f0a65abcbca65f03a6146a2ac15a704aa44c74f', '2024-05-14 09:18:00.557', '20240511155909_init', NULL, NULL, '2024-05-14 09:18:00.488', 1),
('caa04915-96c8-4587-b66c-03c3e62c758e', '342a37f78497aa335b3f6c80ed04cb91c3c03b538debd46a7bd0862794c2d133', '2024-05-14 09:18:08.713', '20240514091808_', NULL, NULL, '2024-05-14 09:18:08.628', 1),
('d2d13ce1-c066-4cf8-a264-379d709173e7', '9bf8a4d7da23d4d0039c09d7d7679303d8e369c1e478df534cc4424c8b56fed8', '2024-05-17 03:33:19.881', '20240517033319_add_views_and_downloads', NULL, NULL, '2024-05-17 03:33:19.821', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Post_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Post`
--
ALTER TABLE `Post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Post`
--
ALTER TABLE `Post`
  ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
