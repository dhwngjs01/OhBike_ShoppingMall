-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.11.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- nodejs_ohbike_shoppingmall 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `nodejs_ohbike_shoppingmall` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `nodejs_ohbike_shoppingmall`;

-- 테이블 nodejs_ohbike_shoppingmall.basket 구조 내보내기
CREATE TABLE IF NOT EXISTS `basket` (
  `basket_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) NOT NULL,
  `product_no` int(11) NOT NULL,
  `option_no` int(11) NOT NULL,
  `option_num` int(11) NOT NULL,
  `basket_datetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`basket_no`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.basket:~2 rows (대략적) 내보내기
DELETE FROM `basket`;
INSERT INTO `basket` (`basket_no`, `user_no`, `product_no`, `option_no`, `option_num`, `basket_datetime`) VALUES
	(27, 2, 1, 1, 2, '2023-03-24 07:27:07'),
	(28, 2, 1, 2, 1, '2023-03-24 07:17:35');

-- 테이블 nodejs_ohbike_shoppingmall.detail 구조 내보내기
CREATE TABLE IF NOT EXISTS `detail` (
  `detail_no` int(11) NOT NULL AUTO_INCREMENT,
  `product_no` int(11) NOT NULL,
  `order_no` int(11) NOT NULL,
  `option_no` int(11) NOT NULL,
  `option_num` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  PRIMARY KEY (`detail_no`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.detail:~0 rows (대략적) 내보내기
DELETE FROM `detail`;

-- 테이블 nodejs_ohbike_shoppingmall.image 구조 내보내기
CREATE TABLE IF NOT EXISTS `image` (
  `image_no` int(11) NOT NULL AUTO_INCREMENT,
  `product_no` int(11) NOT NULL,
  `file_show_name` text NOT NULL,
  `file_save_name` text NOT NULL,
  PRIMARY KEY (`image_no`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.image:~26 rows (대략적) 내보내기
DELETE FROM `image`;
INSERT INTO `image` (`image_no`, `product_no`, `file_show_name`, `file_save_name`) VALUES
	(1, 1, '알파 11 퀀튼 / MC21SF', '1.jpg'),
	(2, 2, 'K-3 SV 탑 윈터 테스트 2016', '2.jpg'),
	(3, 3, '모멘텀 에보 무광 블랙(30K 기반)', '3.jpg'),
	(4, 4, 'RX-7X 반더마크 무광', '4.jpg'),
	(5, 5, '퀄리파이어 플레어 무광블랙/그레이', '5.jpg'),
	(6, 6, '에어마다 메카니카', '6.jpg'),
	(7, 7, 'GT-에어 2 크로스바 TC-10', '7.jpg'),
	(8, 8, '레이스 알 프로 GP FIM 레이싱 DKD', '8.jpg'),
	(9, 9, '그라비티 G-9 화이트/레드/블랙', '9.jpg'),
	(10, 10, 'SX.100 코어 무광 그레이', '10.jpg'),
	(11, 11, 'RV MSX1 카본 그래픽', '11.jpg'),
	(12, 12, '블레이드 FP04 풀페이스 화이트', '12.jpg'),
	(13, 13, 'SF-3 레인저스 무광 블랙/화이트', '13.jpg'),
	(14, 14, 'SR 스포츠 도비지오소 레플리카 GP', '14.jpg'),
	(15, 15, '섹터스 헬멧 (옐로우 무광)', '15.jpg'),
	(16, 16, 'X-802R 레플리카', '16.jpg'),
	(17, 17, 'XF-705 트레이서 실버', '17.jpg'),
	(18, 18, 'FF323 애로우 C 에보 레플리카 로리스 바즈 카본', '18.jpg'),
	(19, 19, '썬더 3 SV 유광 검정', '19.jpg'),
	(20, 20, 'FF-R3 건메탈', '20.jpg'),
	(21, 21, '드리프트 에보 카본 무광 안트라사이트 화이트', '21.jpg'),
	(22, 22, 'VR-2 에일리언', '22.jpg'),
	(23, 23, 'NF-R 로고스 무광 레드', '23.jpg'),
	(24, 24, 'HK-167 데메트라', '24.jpg'),
	(25, 25, '야마하 경기모', '25.jpg'),
	(26, 26, 'F06 풀 페이스 퓨전 옐로우(무광)', '26.jpg');

-- 테이블 nodejs_ohbike_shoppingmall.options 구조 내보내기
CREATE TABLE IF NOT EXISTS `options` (
  `option_no` int(11) NOT NULL AUTO_INCREMENT,
  `product_no` int(11) NOT NULL,
  `option_name` varchar(10) NOT NULL,
  `option_num` int(11) NOT NULL,
  PRIMARY KEY (`option_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.options:~2 rows (대략적) 내보내기
DELETE FROM `options`;
INSERT INTO `options` (`option_no`, `product_no`, `option_name`, `option_num`) VALUES
	(1, 1, 'S', 9931),
	(2, 1, 'M', 9905);

-- 테이블 nodejs_ohbike_shoppingmall.orders 구조 내보내기
CREATE TABLE IF NOT EXISTS `orders` (
  `order_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) NOT NULL,
  `order_totalPrice` int(11) NOT NULL,
  `order_status` varchar(15) NOT NULL,
  `order_ship_name` varchar(20) NOT NULL,
  `order_ship_phone` varchar(20) NOT NULL,
  `order_ship_zipcode` int(5) NOT NULL,
  `order_ship_address` text NOT NULL,
  `order_ship_detail_address` text DEFAULT NULL,
  `order_msg` text DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`order_no`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.orders:~0 rows (대략적) 내보내기
DELETE FROM `orders`;

-- 테이블 nodejs_ohbike_shoppingmall.product 구조 내보내기
CREATE TABLE IF NOT EXISTS `product` (
  `product_no` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_en_name` varchar(100) NOT NULL,
  `product_brand` varchar(50) NOT NULL,
  `product_category` varchar(30) NOT NULL,
  `product_contents` text NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_enable` int(11) NOT NULL,
  PRIMARY KEY (`product_no`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=COMPACT;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.product:~26 rows (대략적) 내보내기
DELETE FROM `product`;
INSERT INTO `product` (`product_no`, `product_name`, `product_en_name`, `product_brand`, `product_category`, `product_contents`, `product_price`, `product_date`, `product_enable`) VALUES
	(1, '알파 11 퀀튼 / MC21SF', 'RPHA11 QUINTAIN / MC21SF', '홍진(HJC)', '헬멧', '<img src="../uploadFiles/1-1.jpg">\n\n<iframe width="1250" height="703" src="https://www.youtube.com/embed/inoH1NrzOE8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n\n<img src="../uploadFiles/1-2.jpg">', 495000, '2019-11-21 15:00:00', 1),
	(2, 'K-3 SV 탑 윈터 테스트 2016', 'K-3 SV TOP WINTER TEST 2016', '에이지브이(AGV)', '헬멧', '내용', 348000, '2019-11-21 15:00:00', 1),
	(3, '모멘텀 에보 무광 블랙(30K 기반)', 'MOMENTUM EVO MATT BLACK', '세나[SENA]', '헬멧', '내용', 440000, '2019-11-22 12:38:33', 1),
	(4, 'RX-7X 반더마크 무광', 'RX-7X VAN DER MARK', '아라이[ARAI]', '헬멧', '내용', 740000, '2019-11-22 12:39:15', 1),
	(5, '퀄리파이어 플레어 무광블랙/그레이', 'QUALIFIER FLARE MATT BLACK/GRAY', '벨[BELL]', '헬멧', '내용', 160000, '2019-11-22 12:40:05', 1),
	(6, '에어마다 메카니카', 'AIRMADA MECHANICA', '아이콘[ICON]', '헬멧', '내용', 230000, '2019-11-22 12:44:16', 1),
	(7, 'GT-에어 2 크로스바 TC-10', 'GT-AIR II CROSSBAR TC-10', '쇼에이(SHOEI)', '헬멧', '내용', 780000, '2019-11-22 12:44:51', 1),
	(8, '레이스 알 프로 GP FIM 레이싱 DKD', 'RACE R PRO GP FIM RACING DKD', '샤크헬멧[SHARK]', '헬멧', '내용', 1390000, '2019-11-22 12:47:52', 1),
	(9, '그라비티 G-9 화이트/레드/블랙', 'GRAVITY G-9 WHITE/RED/BLACK', '그라비티[GRAVITY]', '헬멧', '내용', 89600, '2019-11-22 12:49:20', 1),
	(10, 'SX.100 코어 무광 그레이', 'SX.100 CORE MATT GRAY', '넥스[NEXX]', '헬멧', '내용', 169000, '2019-11-22 12:49:58', 1),
	(11, 'RV MSX1 카본 그래픽', 'RV MSX1 CARBON GRAPHIC', '리뷰[REEVU]', '헬멧', '내용', 470000, '2019-11-22 12:51:31', 1),
	(12, '블레이드 FP04 풀페이스 화이트', 'BLADE FP04 FULL FACE (WHITE)', '블레이드[BLADE]', '헬멧', '내용', 79000, '2019-11-22 12:52:09', 1),
	(13, 'SF-3 레인저스 무광 블랙/화이트', 'SF-3 RANGERS M.BLACK/WHITE', '솔[SOL]', '헬멧', '내용', 210000, '2019-11-22 12:52:57', 1),
	(14, 'SR 스포츠 도비지오소 레플리카 GP', 'SR SPORT DOVIZIOSO REPLICA GP', '수오미[SUOMY]', '헬멧', '내용', 790000, '2019-11-22 12:53:34', 1),
	(15, '섹터스 헬멧 (옐로우 무광)', 'SECTORS HELMET', '에어로(AIROH)', '헬멧', '내용', 690000, '2019-11-22 12:54:11', 1),
	(16, 'X-802R 레플리카', 'Replica[87]', '엑스라이트[X-LITE]', '헬멧', '내용', 880000, '2019-11-22 12:54:51', 1),
	(17, 'XF-705 트레이서 실버', 'TRACER SILVER', '엑스피드[XPEED]', '헬멧', '내용', 270000, '2019-11-22 12:55:38', 1),
	(18, 'FF323 애로우 C 에보 레플리카 로리스 바즈 카본', 'FF323 ARROW C EVO REPLICA LORIS BAZ CARBON', '엘에스2[LS2 HELMET]', '헬멧', '내용', 398000, '2019-11-22 12:56:29', 1),
	(19, '썬더 3 SV 유광 검정', 'THUNDER 3 BLACK', '엠티헬멧[MT HELMETS]', '헬멧', '내용', 138000, '2019-11-22 12:57:08', 1),
	(20, 'FF-R3 건메탈', '', '오지케이[OGK]', '헬멧', '내용', 115000, '2019-11-22 12:57:58', 1),
	(21, '드리프트 에보 카본 무광 안트라사이트 화이트', 'DRIFT EVO CARBON MT.ANT WHITE', '카베르그[CABERG]', '헬멧', '내용', 599000, '2019-11-22 12:58:50', 1),
	(22, 'VR-2 에일리언', 'ALIEN', '케이비씨[KBC]', '헬멧', '내용', 99000, '2019-11-22 12:59:23', 1),
	(23, 'NF-R 로고스 무광 레드', 'NF-R LOGOS MATT RED', '케이와이티[KYT]', '헬멧', '내용', 198000, '2019-11-22 13:00:01', 1),
	(24, 'HK-167 데메트라', 'DEMETRA', '코미네[KOMINE]', '헬멧', '내용', 98000, '2019-11-22 13:00:29', 1),
	(25, '야마하 경기모', '', '한미[HANMI]', '헬멧', '내용', 38000, '2019-11-22 13:00:49', 1),
	(26, 'F06 풀 페이스 퓨전 옐로우(무광)', 'F06 FULL FACE FUSION YELLOW (MATT)', '혼즈[HONZ]', '헬멧', '내용', 98000, '2019-11-22 13:01:31', 1);

-- 테이블 nodejs_ohbike_shoppingmall.sessions 구조 내보내기
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.sessions:~1 rows (대략적) 내보내기
DELETE FROM `sessions`;
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('HKCWmT8uNYgRI7M9Qw2a5z0mnfhhArFj', 1679696828, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user_no":2,"user_name":"관리자"}');

-- 테이블 nodejs_ohbike_shoppingmall.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `user_pw` varchar(30) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `user_lv` varchar(10) NOT NULL,
  `user_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.user:~3 rows (대략적) 내보내기
DELETE FROM `user`;
INSERT INTO `user` (`user_no`, `user_id`, `user_pw`, `user_name`, `user_phone`, `user_lv`, `user_date`) VALUES
	(1, 'user', '1234', '사용자', '010-4567-7777', 'user', '2019-11-20 16:45:28'),
	(2, 'admin', '1234', '관리자', '010-1234-1234', 'admin', '2019-11-20 16:46:35'),
	(3, 'test', '1234', '테스터', '010-1234-1234', 'user', '2019-11-20 16:47:07');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
