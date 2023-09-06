DROP TABLE IF EXISTS `parpol`;

CREATE TABLE `parpol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `singkatan` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path_logo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `ketua_partai` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `wakil_ketua` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sekretaris` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_partai_lokal` int DEFAULT '0',
  `is_delete` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


insert  into `parpol`(`id`,`nama`,`singkatan`,`file_logo`,`path_logo`,`ketua_partai`,`wakil_ketua`,`sekretaris`,`alamat`,`is_partai_lokal`,`is_delete`,`created_at`,`updated_at`,`created_by`,`updated_by`) values 
(1,'Partai Kebangkitan Bangsa','PKB','169198231264d999e86c4db_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198231264d999e86c4db_.png','','','','',0,0,'2023-08-14 10:05:12',NULL,1,NULL),
(2,'Partai Gerakan Indonesia Raya','Gerindra','169198238264d99a2e0f3d4_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198238264d99a2e0f3d4_.png','','','','',0,0,'2023-08-14 10:06:22',NULL,1,NULL),
(3,'Partai Demokrasi Perjuangan','PDIP','16675480046364c364ec6f7_1.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/16675480046364c364ec6f7_1.png','','','','',0,0,'2022-11-04 14:06:54','2023-08-14 11:07:41',1,1),
(4,'Partai Golongan Karya','Golkar','169198248764d99a975ddfe_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198248764d99a975ddfe_.png','','','','',0,0,'2023-08-14 10:08:07',NULL,1,NULL),
(5,'Partai Nasional Demokrat','Nasdem','169198260464d99b0cdde01_.svg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198260464d99b0cdde01_.svg','','','','',0,0,'2023-08-14 10:10:04',NULL,1,NULL),
(6,'Partai Garda Perubahan Indonesia','Garuda','169198265464d99b3e17d7f_.jpeg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198265464d99b3e17d7f_.jpeg','','','','',0,0,'2023-08-14 10:10:54','2023-08-14 11:09:10',1,1),
(7,'Partai Berkarya','Berkarya','169198268964d99b615bf8b_.svg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198268964d99b615bf8b_.svg','','','','',0,0,'2023-08-14 10:11:29',NULL,1,NULL),
(8,'Partai Keadilan Sejahtera','PKS','16675480656364c3a1712d5_2.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/16675480656364c3a1712d5_2.png','','','','',0,0,'2022-11-04 14:16:45','2022-11-04 14:47:45',1,1),
(9,'Partai Perubahan Indonesia','Perindo','169198278764d99bc3af33c_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198278764d99bc3af33c_.png','','','','',0,0,'2023-08-14 10:13:07',NULL,1,NULL),
(10,'Partai Persatuan Pembangunan','PPP','169198283764d99bf5d54a3_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198283764d99bf5d54a3_.png','','','','',0,0,'2023-08-14 10:13:57',NULL,1,NULL),
(11,'Partai Solidaritas Indonesia','PSI','169198291264d99c405f60d_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198291264d99c405f60d_.png','','','','',0,0,'2023-08-14 10:15:12',NULL,1,NULL),
(12,'Partai Amanat Nasional','PAN','169198295164d99c67d91f9_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198295164d99c67d91f9_.png','','','','',0,0,'2023-08-14 10:15:51',NULL,1,NULL),
(13,'Partai Hati Nurani Rakyat','Hanura','169198299664d99c940ef7e_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198299664d99c940ef7e_.png','','','','',0,0,'2023-08-14 10:16:36',NULL,1,NULL),
(14,'Partai Demokrat','Demokrat','169198306764d99cdb34048_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198306764d99cdb34048_.png','','','','',0,0,'2023-08-14 10:17:47',NULL,1,NULL),
(15,'Partai Aceh','PA','169198328764d99db705f72_.jpeg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198328764d99db705f72_.jpeg','','','','',1,0,'2023-08-14 10:21:27','2023-08-14 10:21:32',1,1),
(16,'Partai Sira','SIRA','169198348764d99e7fa7c6e_.jpeg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198348764d99e7fa7c6e_.jpeg','','','','',1,0,'2023-08-14 10:24:47',NULL,1,NULL),
(17,'Partai Darul Aceh','PD Aceh','169198354664d99eba1c1ca_.jpeg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198354664d99eba1c1ca_.jpeg','','','','',1,0,'2023-08-14 10:25:46','2023-08-14 10:27:00',1,1),
(18,'Partai Naggroe Aceh','PNA','169198358864d99ee4a4ea8_.jpeg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198358864d99ee4a4ea8_.jpeg','','','','',1,0,'2023-08-14 10:26:28','2023-08-14 10:26:48',1,1),
(19,'Partai Bulan Bintang','PBB','169198315364d99d3175691_.png','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198315364d99d3175691_.png','','','','',0,0,'2023-08-14 10:19:13',NULL,1,NULL),
(20,'Partai Keadilan dan Persatuan Indonesia','PKPI','169198322464d99d78e678b_.jpeg','/Users/aenganwar/Sites/indovoters_yii/uploads/parpol/169198322464d99d78e678b_.jpeg','','','','',0,0,'2023-08-14 10:20:24',NULL,1,NULL);
