-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.11.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.4.0.6670
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 nodejs_ohbike_shoppingmall.basket 구조 내보내기
CREATE TABLE IF NOT EXISTS `basket` (
  `basket_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) NOT NULL,
  `product_no` int(11) NOT NULL,
  `option_no` int(11) NOT NULL,
  `option_num` int(11) NOT NULL,
  `basket_datetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`basket_no`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.basket:~2 rows (대략적) 내보내기
DELETE FROM `basket`;
INSERT INTO `basket` (`basket_no`, `user_no`, `product_no`, `option_no`, `option_num`, `basket_datetime`) VALUES
	(33, 2, 9, 43, 1, '2023-06-16 04:55:58'),
	(34, 2, 10, 49, 4, '2023-06-16 09:54:51');

-- 테이블 nodejs_ohbike_shoppingmall.detail 구조 내보내기
CREATE TABLE IF NOT EXISTS `detail` (
  `detail_no` int(11) NOT NULL AUTO_INCREMENT,
  `product_no` int(11) NOT NULL,
  `order_no` int(11) NOT NULL,
  `option_no` int(11) NOT NULL,
  `option_num` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `order_status` varchar(20) NOT NULL DEFAULT '배송준비중',
  PRIMARY KEY (`detail_no`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.detail:~14 rows (대략적) 내보내기
DELETE FROM `detail`;
INSERT INTO `detail` (`detail_no`, `product_no`, `order_no`, `option_no`, `option_num`, `product_price`, `order_status`) VALUES
	(145, 1, 96, 3, 7, 495000, '배송준비중'),
	(146, 1, 96, 4, 1, 495000, '주문취소'),
	(147, 1, 97, 4, 2, 495000, '배송중'),
	(148, 18, 98, 91, 3, 398000, '배송준비중'),
	(149, 12, 99, 59, 1, 79000, '배송준비중'),
	(150, 1, 100, 5, 3, 495000, '배송중'),
	(155, 1, 125, 3, 8, 495000, '배송완료'),
	(156, 1, 125, 5, 1, 495000, '배송준비중'),
	(157, 3, 125, 16, 1, 440000, '배송준비중'),
	(158, 18, 125, 89, 3, 398000, '배송준비중'),
	(159, 1, 126, 3, 8, 495000, '배송준비중'),
	(160, 1, 126, 5, 1, 495000, '배송준비중'),
	(161, 3, 126, 16, 1, 440000, '배송준비중'),
	(162, 18, 126, 89, 3, 398000, '배송준비중');

-- 테이블 nodejs_ohbike_shoppingmall.image 구조 내보내기
CREATE TABLE IF NOT EXISTS `image` (
  `image_no` int(11) NOT NULL AUTO_INCREMENT,
  `product_no` int(11) NOT NULL,
  `file_show_name` text NOT NULL,
  `file_save_name` text NOT NULL,
  PRIMARY KEY (`image_no`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.image:~28 rows (대략적) 내보내기
DELETE FROM `image`;
INSERT INTO `image` (`image_no`, `product_no`, `file_show_name`, `file_save_name`) VALUES
	(1, 1, '알파 11 퀸튼 블루', '1687145788164_1.jpg'),
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
	(26, 26, 'F06 풀 페이스 퓨전 옐로우(무광)', '26.jpg'),
	(37, 54, '171 바람막이 자켓 - 레드', '1687121995279_1.jpg'),
	(38, 55, '171 바람막이 자켓 - 레드', '1687125889295_1.jpg');

-- 테이블 nodejs_ohbike_shoppingmall.options 구조 내보내기
CREATE TABLE IF NOT EXISTS `options` (
  `option_no` int(11) NOT NULL AUTO_INCREMENT,
  `product_no` int(11) NOT NULL,
  `option_name` varchar(10) NOT NULL,
  `option_num` int(11) NOT NULL,
  PRIMARY KEY (`option_no`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.options:~135 rows (대략적) 내보내기
DELETE FROM `options`;
INSERT INTO `options` (`option_no`, `product_no`, `option_name`, `option_num`) VALUES
	(1, 1, 'S', 30),
	(2, 1, 'M', 30),
	(3, 1, 'L', 30),
	(4, 1, 'XL', 25),
	(8, 2, 'S', 30),
	(9, 2, 'M', 30),
	(10, 2, 'L', 30),
	(11, 2, 'XL', 30),
	(12, 2, 'XXL', 30),
	(13, 3, 'S', 30),
	(14, 3, 'M', 30),
	(15, 3, 'L', 30),
	(16, 3, 'XL', 27),
	(17, 3, 'XXL', 30),
	(18, 4, 'S', 30),
	(19, 4, 'M', 30),
	(20, 4, 'L', 30),
	(21, 4, 'XL', 30),
	(22, 4, 'XXL', 30),
	(23, 5, 'S', 30),
	(24, 5, 'M', 30),
	(25, 5, 'L', 30),
	(26, 5, 'XL', 30),
	(27, 5, 'XXL', 30),
	(28, 6, 'S', 30),
	(29, 6, 'M', 30),
	(30, 6, 'L', 30),
	(31, 6, 'XL', 30),
	(32, 6, 'XXL', 30),
	(33, 7, 'S', 30),
	(34, 7, 'M', 30),
	(35, 7, 'L', 30),
	(36, 7, 'XL', 30),
	(37, 7, 'XXL', 30),
	(38, 8, 'S', 30),
	(39, 8, 'M', 30),
	(40, 8, 'L', 30),
	(41, 8, 'XL', 30),
	(42, 8, 'XXL', 30),
	(43, 9, 'S', 30),
	(44, 9, 'M', 30),
	(45, 9, 'L', 30),
	(46, 9, 'XL', 30),
	(47, 9, 'XXL', 30),
	(48, 10, 'S', 30),
	(49, 10, 'M', 30),
	(50, 10, 'L', 30),
	(51, 10, 'XL', 30),
	(52, 10, 'XXL', 30),
	(53, 11, 'S', 30),
	(54, 11, 'M', 30),
	(55, 11, 'L', 30),
	(56, 11, 'XL', 30),
	(57, 11, 'XXL', 30),
	(58, 12, 'S', 30),
	(59, 12, 'M', 29),
	(60, 12, 'L', 30),
	(61, 12, 'XL', 30),
	(62, 12, 'XXL', 30),
	(63, 13, 'S', 30),
	(64, 13, 'M', 30),
	(65, 13, 'L', 30),
	(66, 13, 'XL', 30),
	(67, 13, 'XXL', 30),
	(68, 14, 'S', 30),
	(69, 14, 'M', 30),
	(70, 14, 'L', 30),
	(71, 14, 'XL', 30),
	(72, 14, 'XXL', 30),
	(73, 15, 'S', 30),
	(74, 15, 'M', 30),
	(75, 15, 'L', 30),
	(76, 15, 'XL', 30),
	(77, 15, 'XXL', 30),
	(78, 16, 'S', 30),
	(79, 16, 'M', 30),
	(80, 16, 'L', 30),
	(81, 16, 'XL', 30),
	(82, 16, 'XXL', 30),
	(83, 17, 'S', 30),
	(84, 17, 'M', 30),
	(85, 17, 'L', 30),
	(86, 17, 'XL', 30),
	(87, 17, 'XXL', 30),
	(88, 18, 'S', 30),
	(89, 18, 'M', 21),
	(90, 18, 'L', 30),
	(91, 18, 'XL', 27),
	(92, 18, 'XXL', 30),
	(93, 19, 'S', 30),
	(94, 19, 'M', 30),
	(95, 19, 'L', 30),
	(96, 19, 'XL', 30),
	(97, 19, 'XXL', 30),
	(98, 20, 'S', 30),
	(99, 20, 'M', 30),
	(100, 20, 'L', 30),
	(101, 20, 'XL', 30),
	(102, 20, 'XXL', 30),
	(103, 21, 'S', 30),
	(104, 21, 'M', 30),
	(105, 21, 'L', 30),
	(106, 21, 'XL', 30),
	(107, 21, 'XXL', 30),
	(108, 22, 'S', 30),
	(109, 22, 'M', 30),
	(110, 22, 'L', 30),
	(111, 22, 'XL', 30),
	(112, 22, 'XXL', 30),
	(113, 23, 'S', 30),
	(114, 23, 'M', 30),
	(115, 23, 'L', 30),
	(116, 23, 'XL', 30),
	(117, 23, 'XXL', 30),
	(118, 24, 'S', 30),
	(119, 24, 'M', 30),
	(120, 24, 'L', 30),
	(121, 24, 'XL', 30),
	(122, 24, 'XXL', 30),
	(123, 25, 'S', 30),
	(124, 25, 'M', 30),
	(125, 25, 'L', 30),
	(126, 25, 'XL', 30),
	(127, 25, 'XXL', 30),
	(128, 26, 'S', 30),
	(129, 26, 'M', 30),
	(130, 26, 'L', 30),
	(131, 26, 'XL', 30),
	(132, 26, 'XXL', 30),
	(196, 54, 'S', 20),
	(197, 54, 'M', 35),
	(198, 54, 'L', 60),
	(199, 55, 'S', 20),
	(200, 55, 'M', 35),
	(201, 55, 'L', 60);

-- 테이블 nodejs_ohbike_shoppingmall.orders 구조 내보내기
CREATE TABLE IF NOT EXISTS `orders` (
  `order_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) NOT NULL,
  `order_totalPrice` int(11) NOT NULL,
  `order_ship_name` varchar(20) NOT NULL,
  `order_ship_phone` varchar(20) NOT NULL,
  `order_ship_zipcode` int(5) NOT NULL,
  `order_ship_address` text NOT NULL,
  `order_ship_detail_address` text DEFAULT NULL,
  `order_msg` text DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`order_no`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.orders:~15 rows (대략적) 내보내기
DELETE FROM `orders`;
INSERT INTO `orders` (`order_no`, `user_no`, `order_totalPrice`, `order_ship_name`, `order_ship_phone`, `order_ship_zipcode`, `order_ship_address`, `order_ship_detail_address`, `order_msg`, `order_date`) VALUES
	(88, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:01:24'),
	(89, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:01:27'),
	(90, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:03:13'),
	(91, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:03:29'),
	(92, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:03:54'),
	(93, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:04:21'),
	(94, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:04:30'),
	(95, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:04:51'),
	(96, 2, 3960000, '관리자', '010-1221-2222', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 13:05:15'),
	(97, 2, 990000, 'ㄷㄷ', '010-1234-1234', 22207, '인천 미추홀구 인하로47번길 120', '', '빠른 배송 부탁드립니다.', '2023-05-06 13:09:10'),
	(98, 2, 1194000, '아무나', '010-8888-2222', 6035, '서울 강남구 가로수길 5', '', '빠른 배송 부탁드립니다.', '2023-05-06 14:39:19'),
	(99, 2, 79000, '홍길동', '010-1238-2291', 23036, '인천 강화군 강화읍 갑룡길 3', '', '빠른 배송 부탁드립니다.', '2023-05-06 14:39:42'),
	(100, 2, 1485000, '김영택', '010-8233-1249', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-05-06 14:42:58'),
	(125, 2, 6089000, 'asd', '010-1234-1234', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-06-14 02:21:20'),
	(126, 2, 6089000, 'asd', '010-1234-1234', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', '빠른 배송 부탁드립니다.', '2023-06-14 02:30:04');

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
  `product_enable` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`product_no`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci ROW_FORMAT=COMPACT;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.product:~27 rows (대략적) 내보내기
DELETE FROM `product`;
INSERT INTO `product` (`product_no`, `product_name`, `product_en_name`, `product_brand`, `product_category`, `product_contents`, `product_price`, `product_date`, `product_enable`) VALUES
	(1, '알파 11 퀸튼 블루', 'RPHA11 QUINTAIN BLUE', '홍진(HJC)', '헬멧', '<figure class="image"><img src="/ckeditor_upload/2023619_123622_홍진헬멧 최종.jpg"></figure>', 495000, '2023-06-19 03:36:28', 1),
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
	(26, 'F06 풀 페이스 퓨전 옐로우(무광)', 'F06 FULL FACE FUSION YELLOW (MATT)', '혼즈[HONZ]', '헬멧', '내용', 98000, '2019-11-22 13:01:31', 1),
	(55, '171 바람막이 자켓 - 레드', '171 JACKET - Red', 'HUFSLOW(헙스로우)', '라이딩웨어', '<figure class="image"><img src="/ckeditor_upload/1687121972037_2.jpg"></figure><figure class="image"><img src="/ckeditor_upload/1687121971947_3.jpg"></figure><figure class="image"><img src="/ckeditor_upload/1687121971957_4.gif"></figure><figure class="image"><img src="/ckeditor_upload/1687121972221_5.jpg"></figure><figure class="image"><img src="/ckeditor_upload/1687121972445_6.jpg"></figure>', 158000, '2023-06-18 22:04:49', 1);

-- 테이블 nodejs_ohbike_shoppingmall.sessions 구조 내보내기
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.sessions:~39 rows (대략적) 내보내기
DELETE FROM `sessions`;
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('-m0lRkzhNxSzipMW3aOgaUlXGdxmonHO', 1687213340, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('-u_7XpWkd4JOJL4Sc6VzDWtL_Zp8Qwye', 1687188227, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('0flSMAK1Cs9R74TfgijA9QndB2GoZ-LJ', 1687234891, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"user_no":2,"user_name":"관리자","user_lv":"admin"}'),
	('0zs9JAsQZHqJ12f5owH7LQjxgKv_eLY7', 1687220959, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('1GMAVqlle5-Sjk7ZTHCR0CphpbxoKL4N', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('2LDv_qgk5LYKriDoLTvqVjlCnDh-hyPk', 1687191626, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('8LL5qzA8tckE5E8VHfjwHITBqbD804KM', 1687220925, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('903DiXCB5CW1Tf2zS04crNnhjQjYgjJK', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('9wwyH9UaMSzC3HqXbG-GRttrHmrJFJ-o', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('EvAvntZbdUekSwqOOvmG4Pr26GeDqysM', 1687191421, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('Fa3fTHuPizDMy3cqg8hqr3chi5CoM40C', 1687224580, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('GscyAX5XZQ8Ncp6gS-yH3qYmpgigrufw', 1687217574, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('IIwrjNFQ9Fq4gzdOOUSvQxLvbSH_vnzQ', 1687146154, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('IMaHROxbmAvVT2yorKIjIC2PauKoM7hI', 1687213341, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('IYhZ6eMVSY0cD6CysznYf9YNpCcDCqX8', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('Jp-0DpqLVbJXDVtKSuX-kZ8YwS7MWg0n', 1687211475, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('Kmj8u32gJnscu8rNi4DAOtng0AUmDAWe', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('LrPhT2v7l0qpume2-68Cz0-gHlG4lmW2', 1687196332, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('NrstJ7vVJfHu4N2tUYh9laAR4P22yHl_', 1687229859, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('OPZt0Nj-rUeMpTbu-2ebRvK1kkJpOQRt', 1687189028, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('OzGSUoQvltUPeM-myNeVXxg2REHfJgh6', 1687147582, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('TOYToJrMBoi8znXYJi2WHO1X6X0dJZfR', 1687191430, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('TWwGcKIUOO0sS5shVMNVl1-6eqHDW-TL', 1687198826, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('VeDgMosQrFzN6OGf1FETsM2MO029nwjM', 1687194278, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('YEnaDeL6xXwSagE3hWno10CKDNrWrffo', 1687194158, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('_-SgzpY7vae73klTYHoS7kub9raAfEFT', 1687229556, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('azy5kltEne2H397qTPZ2kqNBZodc8QUR', 1687207162, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('d-BfAp_XPjLgKM-k6OL3fe8QhKYnM2I9', 1687150310, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('eeHrFD5ginmJiLZBSpM6TKTUrzib83qF', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('iQCmrrwPDCSkjxDIsqbikqdUuWWXKjau', 1687213339, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('iWnkrCT_RRgsfjsDt3QggL1ueV6swBvb', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('k9DtXriVIz0G41snpWWVct05D4-Cj7Pm', 1687222348, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('m1F7NsGXaESmppaeNYLVHlNUbZtgtGxd', 1687148804, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('m1YruIdzbU1leO0OJYVxf8BSKhO0CiWJ', 1687147995, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('mxdKoSFNoFJywAIc1yvxX5JseeNRIRpK', 1687194022, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('rGRQ6Lgw88_AaACzS2QzNgH7tjBNLyAE', 1687202983, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('ulHOcYtx6dbWigt2gYoisE4lfdOMwPEA', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('w15ghcna97Gtg77ElNv9nRRnTQ5mU-37', 1687217574, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}'),
	('yxLNKCUWzbHWUlYQBH-rlExie5Id8i0d', 1687194159, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"}}');

-- 테이블 nodejs_ohbike_shoppingmall.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `user_pw` varchar(30) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `user_zipcode` int(11) NOT NULL,
  `user_address` text DEFAULT NULL,
  `user_detail_address` text DEFAULT NULL,
  `user_lv` varchar(10) NOT NULL DEFAULT 'user',
  `user_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- 테이블 데이터 nodejs_ohbike_shoppingmall.user:~4 rows (대략적) 내보내기
DELETE FROM `user`;
INSERT INTO `user` (`user_no`, `user_id`, `user_pw`, `user_name`, `user_phone`, `user_zipcode`, `user_address`, `user_detail_address`, `user_lv`, `user_date`) VALUES
	(1, 'user', '1234', '사용자', '010-4567-7777', 22212, '인천광역시 미추홀구 인하로 100', '인하공업전문대학', 'user', '2019-11-20 16:45:28'),
	(2, 'admin', '1234', '관리자', '010-1234-1234', 22212, '인천광역시 미추홀구 인하로 100', '인하공업전문대학', 'admin', '2019-11-20 16:46:35'),
	(3, 'test', '1234', '테스터', '010-1234-1234', 22212, '인천광역시 미추홀구 인하로 100', '인하공업전문대학', 'user', '2019-11-20 16:47:07'),
	(6, 'user2', '1234', '사용자2', '010-1234-1234', 22212, '인천 미추홀구 인하로 100', '인하대,인하공전,정석항공고', 'user', '2023-05-06 14:14:59');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
