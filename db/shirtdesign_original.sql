-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2023 at 12:37 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28
DROP DATABASE IF EXISTS shirtdesign;
CREATE DATABASE shirtdesign;


-- Creating Company Schema
USE shirtdesign;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shirtdesign`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `com_id` int(11) NOT NULL,
  `com_name_en` varchar(200) NOT NULL,
  `header_color` varchar(50) NOT NULL,
  `font_color` varchar(50) NOT NULL,
  `com_status` int(11) NOT NULL,
  `footer_title` varchar(300) NOT NULL,
  `com_logo` varchar(300) NOT NULL,
  `is_default` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`com_id`, `com_name_en`, `header_color`, `font_color`, `com_status`, `footer_title`, `com_logo`, `is_default`, `timestamp`) VALUES
(1, 'Shirtdesign', '#5cc72a', '#ffffff', 1, '© 2020 Shirtdesign', 'assets/custom/images/clothes.svg', 1, '2018-11-23 06:40:34'),
(2, 'Shirtdesign', '#5cc72a', '#ffffff', 1, '© 2020 Shirtdesign', 'assets/custom/images/clothes.svg', 0, '2018-11-23 06:40:34');

-- --------------------------------------------------------

--
-- Table structure for table `contact_info`
--

CREATE TABLE `contact_info` (
  `contact_info_id` int(11) NOT NULL,
  `contact_info_phon` varchar(255) NOT NULL,
  `contact_info_email` varchar(255) NOT NULL,
  `contact_info_facebook` varchar(255) NOT NULL,
  `contact_info_twitter` varchar(255) NOT NULL,
  `contact_info_ig` varchar(255) NOT NULL,
  `contact_info_youtube` varchar(255) NOT NULL,
  `contact_info_line` varchar(255) NOT NULL,
  `contact_info_pay` varchar(255) NOT NULL,
  `contact_info_detail` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact_info`
--

INSERT INTO `contact_info` (`contact_info_id`, `contact_info_phon`, `contact_info_email`, `contact_info_facebook`, `contact_info_twitter`, `contact_info_ig`, `contact_info_youtube`, `contact_info_line`, `contact_info_pay`, `contact_info_detail`) VALUES
(1, 'Tel. 02 000 0000', 'info@shirtdesign.com', 'https://www.facebook.com/shirtdesign', 'https://www.Twitter.com/shirtdesign', 'https://www.Instagram.com/shirtdesign', 'https://www.Youtube.com/shirtdesign', 'shirtdesign', '', 'shirtdesign.com โดย บริษัท shirtdesign จำกัด\n123 ถนนรัชดาภิเษก(ท่าพระ-ตากสิน)\nแขวงดาวคะนอง เขตธนบุรี กรุงเทพ 10600');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `user_type` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `allow_to_login` tinyint(4) DEFAULT 0,
  `logged_in` int(11) NOT NULL,
  `is_active` tinyint(4) DEFAULT 1,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `user_type`, `name`, `allow_to_login`, `logged_in`, `is_active`, `timestamp`) VALUES
(1, 'admin', '25f9e794323b453885f5181f1b624d0b', 9, 'admin', 1, 1, 1, '2019-04-20 15:27:46');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE `user_type` (
  `user_type_id` int(11) NOT NULL,
  `user_type_name` varchar(30) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`user_type_id`, `user_type_name`, `timestamp`) VALUES
(1, 'เจ้าหน้าที่', '2019-04-20 15:28:11'),
(8, 'เจ้าของกิจการ', '2019-04-20 15:28:11'),
(9, 'admin', '2019-04-20 15:28:11'),
(999, 'ไม่ระบุ', '2019-04-20 15:28:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`com_id`);

--
-- Indexes for table `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`contact_info_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_type` (`user_type`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `contact_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
