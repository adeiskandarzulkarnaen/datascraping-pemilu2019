DROP TABLE IF EXISTS `pemilu_parpol`;


CREATE TABLE `pemilu_parpol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pemilu_id` int NOT NULL,
  `parpol_id` int NOT NULL,
  `no_urut` int NOT NULL,
  `is_delete` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


insert  into `pemilu_parpol`(`id`,`pemilu_id`,`parpol_id`,`no_urut`,`is_delete`,`created_at`,`updated_at`,`created_by`,`updated_by`) values 
(1,2,1,1,0,'2023-08-14 11:02:50',NULL,1,NULL),
(2,2,2,2,0,'2023-08-14 11:07:12',NULL,1,NULL),
(3,2,3,3,0,'2023-08-14 11:07:30',NULL,1,NULL),
(4,2,4,4,0,'2023-08-14 11:08:07',NULL,1,NULL),
(5,2,5,5,0,'2023-08-14 11:08:23',NULL,1,NULL),
(6,2,6,6,0,'2023-08-14 11:08:54',NULL,1,NULL),
(7,2,7,7,0,'2023-08-14 11:09:25',NULL,1,NULL),
(8,2,8,8,0,'2023-08-14 11:09:37',NULL,1,NULL),
(9,2,9,9,0,'2023-08-14 11:09:53',NULL,1,NULL),
(10,2,10,10,0,'2023-08-14 11:10:16',NULL,1,NULL),
(11,2,11,11,0,'2023-08-14 11:10:47',NULL,1,NULL),
(12,2,12,12,0,'2023-08-14 11:11:05',NULL,1,NULL),
(13,2,13,13,0,'2023-08-14 11:11:20',NULL,1,NULL),
(14,2,14,14,0,'2023-08-14 11:11:35',NULL,1,NULL),
(15,2,15,15,0,'2023-08-14 11:12:13',NULL,1,NULL),
(16,2,16,16,0,'2023-08-14 11:12:30',NULL,1,NULL),
(17,2,17,17,0,'2023-08-14 11:12:40',NULL,1,NULL),
(18,2,18,18,0,'2023-08-14 11:12:50',NULL,1,NULL),
(19,2,19,19,0,'2023-08-14 11:13:30',NULL,1,NULL),
(20,2,20,20,0,'2023-08-14 11:13:50',NULL,1,NULL);
