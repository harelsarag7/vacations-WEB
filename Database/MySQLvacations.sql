-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE DATABASE `vacations`;
USE `vacations`;
--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` enum('ADMIN','USER') DEFAULT 'USER',
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ADMIN','admin','admin','admin@admin.com','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'),(2,'USER','harel','sarag','harel@harel.com','b26e9de80e27b17448658012895ca1dfdc97e3bb8e121e1e8e7c5a9f798629c6'),(3,'USER','1234','1234','1234@1234.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'),(4,'USER','ofek','sarag','ofek@ofek.com','9617d7ca5edb73b88e01ae853acd35bba37458a39b2c4681b4bdc85c63b9c1d0'),(5,'USER','shalev','shalev','shalev@shalev.com','115c021379fd0cf06bede7dd269d689f358534e5b0fd006dda54095605cc43cd'),(6,'USER','daniel','hen','daniel@hen.com','bd3dae5fb91f88a4f0978222dfd58f59a124257cb081486387cbae9df11fb879'),(7,'USER','dani','dani','dani@dani.com','d37c5e7961d0ed500ecf0475346027cf2d7010b7083c411f953936b0e38b1ab2'),(8,'USER','sdf','sdf','','e31c7b3bb1c815a1201538205cffaefcdabe46f885b2f7e2787117646bbb712b'),(9,'USER','dqwd','qwd','qwd','ff66143c9a611e7cd02be5c75c5ebb1fca48f62de3875770ec53b6fc62d82dc6'),(10,'USER','asd','dsa','d@d.com','35669191c32a9cfb532e5d79b09f2b0926c0faf27e7543f1fbe433bd94ae78d7');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `imageName` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (2,'Rome',' Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-03-04','2023-05-13',500,'zyplr4le1qp60v.jpg'),(4,'Hilo','Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-03-02','2023-05-05',200,'zyplr4le1qo3ho.jfif'),(5,'Eilat','Vacation in Eilat, Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-03-02','2023-05-20',800,'zyplr4le1qn69t.jfif'),(6,'LA','        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-03-02','2023-05-12',400,'zyplr4le1qoqny.jfif'),(7,'Turkey','Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-03','2023-05-23',500,'zypglsle1lq0jh.jfif'),(8,'Japan','        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-04-22','2023-05-09',600,'zyplr4le1qqz7g.jfif'),(9,'Budapest','        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-03','2023-03-16',300,'zypddcle1kdyta.jpg'),(10,'Hungary','        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-16','2023-02-21',1400,'zyplr4le1qmaod.jfif'),(11,'Sofia','        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-04-05','2023-04-09',1000,'zyplr4le1qtrir.jfif'),(12,'Sweden','        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-03-21','2023-03-31',900,'zyplr4le1qpncl.jpg'),(14,'Haifa','        Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-03','2023-02-18',500,'zypddcle1km86f.jfif'),(15,'China','        Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-02','2023-02-27',400,'zypddcle1kfe7s.jpg'),(18,'Brazil','        Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-04','2023-05-09',600,'zypddcle1kln9l.jfif'),(20,'Spain','        Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-04-05','2023-04-14',500,'zyplr4le1qs92y.jfif'),(21,'USA','        Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-07-09','2023-07-19',1200,'zyplr4le1qsrkv.jfif'),(22,'Canada','        Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-06-03','2023-06-26',900,'zyplr4le1qtb5k.jpg'),(23,'London','        Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-04-30','2023-05-31',1000,'zyplr4le1qrh36.jpg'),(26,'fdsfsd','Nesciunt iurecsdcsd csd sd ssdd sds dsd s ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo. Nesciunt iure ipsam omnis! Eius ipsa.','2023-02-01','2023-02-13',1000,'zypddcle1k1efi.jpg'),(28,'Rhodes','Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-08','2023-02-08',200,'zypmy4ldvxz48f.jpg'),(29,'Tel Aviv','Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-02-20','2023-02-27',700,'zypddcle1knji9.jpg'),(30,'Thailand','Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-01-16','2023-01-29',222222,'zypddcle1kq31f.jpg'),(31,'Madrid','Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2023-01-10','2023-01-17',600,'zypddcle1ksuum.jpg'),(34,'harel','Nesciunt iurecsdcsd csd sd ssdd sds dsd s  ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.        Nesciunt iure ipsam omnis! Eius ipsa maiores eos eligendi nostrum ipsum illo.','2022-12-12','2022-12-13',5003,'zypfpwle1tqf6d.jfif');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacationslikes`
--

DROP TABLE IF EXISTS `vacationslikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacationslikes` (
  `vacationId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`vacationId`,`userId`),
  KEY `fk_userid_idx` (`userId`),
  CONSTRAINT `fk_userid` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_vacationid` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacationslikes`
--

LOCK TABLES `vacationslikes` WRITE;
/*!40000 ALTER TABLE `vacationslikes` DISABLE KEYS */;
INSERT INTO `vacationslikes` VALUES (4,2),(8,2),(9,2),(12,2),(15,2),(18,2),(30,2),(4,5),(9,5),(15,5),(18,5),(21,5),(26,5),(30,5),(31,5);
/*!40000 ALTER TABLE `vacationslikes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-15 17:53:10
