/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 8.0.33 : Database - indovoters_copy
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`indovoters_copy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `indovoters_copy`;

/*Table structure for table `pemilu_capres` */

DROP TABLE IF EXISTS `pemilu_capres`;

CREATE TABLE `pemilu_capres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pemilu_id` int NOT NULL,
  `no_urut` int NOT NULL,
  `calon_presiden` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `wakil_presiden` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_delete` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pemilu_capres` */

insert  into `pemilu_capres`(`id`,`pemilu_id`,`no_urut`,`calon_presiden`,`wakil_presiden`,`is_delete`,`created_at`,`updated_at`,`created_by`,`updated_by`) values 
(21,1,1,'Ir. H. JOKO WIDODO','Prof. Dr. (H.C) KH. MA\'RUF AMIN',0,NULL,NULL,NULL,NULL),
(22,1,2,'H. PRABOWO SUBIANTO','H. SANDIAGA SALAHUDIN UNO',0,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
