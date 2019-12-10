-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- 생성 시간: 19-11-26 15:44
-- 서버 버전: 10.3.14-MariaDB
-- PHP 버전: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `SW_201844021`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `product_no` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_en_name` varchar(100) NOT NULL,
  `product_brand` varchar(50) NOT NULL,
  `product_category` varchar(30) NOT NULL,
  `product_contents` text NOT NULL,
  `product_price` int(11) NOT NULL,
  `product_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `product_enable` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 테이블의 덤프 데이터 `product`
--

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

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_no`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `product_no` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
