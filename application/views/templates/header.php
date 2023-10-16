<!DOCTYPE html>
<html lang="zxx">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Sona Template">
    <meta name="keywords" content="Sona, unica, creative, html">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo base_url('assets/custom/images/clothes.svg'); ?>">
    <title><?php echo $title; ?></title>
    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css?family=Lora:400,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,500,600,700&display=swap" rel="stylesheet">
    <!-- Css Styles -->
    <link href="<?php echo base_url('assets/system/css/bootstrap.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/fontawesome-free-5.12.1-web/css/all.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/elegant-icons.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/flaticon.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/owl.carousel.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/nice-select.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/jquery-ui.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/magnific-popup.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/slicknav.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/css/style.css'); ?>" rel="stylesheet" type="text/css">
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote.min.css" rel="stylesheet">
    <link href="<?php echo base_url('assets/custom/css/main.css'); ?>" rel="stylesheet" type="text/css">
    
</head>
<body>
    <!-- Page Preloder -->
    <div id="preloder">
        <div class="loader"></div>
    </div>

    <!-- Offcanvas Menu Section Begin -->
    <div class="offcanvas-menu-overlay"></div>
    <div class="canvas-open">
        <i class="icon_menu"></i>
    </div>
    <div class="offcanvas-menu-wrapper">
        <div class="canvas-close">
            <i class="icon_close"></i>
        </div>
        <div class="header-configure-area">
            <a href="<?php echo base_url('design'); ?>" class="bk-btn">เริ่มออกแบบเสื้อ</a>
        </div>
        <nav class="mainmenu mobile-menu">
            <ul>
                <li class="active"><a href="<?php echo base_url('/design')?>">หน้าแรก</a></li>
                <!-- <li><a href="./rooms.html">บริการของเรา</a></li> -->
                <!-- <li><a href="./rooms.html">ติดต่อเรา</a></li> -->
                <!-- <li><a href="./rooms.html">สมัครสมาชิก</a></li> -->
                <li><a href="<?php echo base_url('/admin')?>">เข้าสู่ระบบ</a></li>
            </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div class="top-social">
            <a href="<?php echo $this->setting->getFacebook(); ?>" target="_blank"><i class="fa fa-facebook"></i></a>
            <a href="http://line.me/ti/p/~<?php echo $this->setting->getLine(); ?>" target="_blank"><i class="fab fa-line"></i></a>
            <a href="<?php echo $this->setting->getTwitter(); ?>" target="_blank"><i class="fa fa-twitter"></i></a>
            <a href="<?php echo $this->setting->getInstagram(); ?>" target="_blank"><i class="fa fa-instagram"></i></a>
            <a href="<?php echo $this->setting->getYoutube(); ?>" target="_blank"><i class="fa fa-youtube-play"></i></a>
        </div>
        <ul class="top-widget">
            <li><i class="fa fa-phone"></i> <?php echo $this->setting->getPhone(); ?></li>
            <li><i class="fa fa-envelope"></i> <?php echo $this->setting->getEmail(); ?></li>
        </ul>
    </div>
    <!-- Offcanvas Menu Section End -->

    <!-- Header Section Begin -->
    <header class="header-section">
        <div class="top-nav">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <ul class="tn-left">
                            <li><i class="fa fa-phone"></i> <?php echo $this->setting->getPhone(); ?></li>
                            <li><i class="fa fa-envelope"></i> <?php echo $this->setting->getEmail(); ?></li>
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <div class="tn-right">
                            <div class="top-social">
                                <a href="<?php echo $this->setting->getFacebook(); ?>" target="_blank"><i class="fa fa-facebook"></i></a>
                                <a href="http://line.me/ti/p/~<?php echo $this->setting->getLine(); ?>" target="_blank"><i class="fab fa-line"></i></a>
                                <a href="<?php echo $this->setting->getTwitter(); ?>" target="_blank"><i class="fa fa-twitter"></i></a>
                                <a href="<?php echo $this->setting->getInstagram(); ?>" target="_blank"><i class="fa fa-instagram"></i></a>
                                <a href="<?php echo $this->setting->getYoutube(); ?>" target="_blank"><i class="fa fa-youtube-play"></i></a>
                            </div>
                            <a href="<?php echo base_url('design'); ?>" class="bk-btn">เริ่มออกแบบเสื้อ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu-item">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="logo">
                            <a href="<?php echo base_url('/design')?>">
                                <?php echo $this->setting->getHeaderImage(); ?>
                                &nbsp;
                                <span class="h5"><?php echo $this->setting->getNameCompany('en'); ?></span>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="nav-menu">
                            <nav class="mainmenu">
                                <ul>
                                    <li class="active"><a href="<?php echo base_url('/design')?>">หน้าแรก</a></li>
                                    <!-- <li><a href="./rooms.html">บริการของเรา</a></li>
                                    <li><a href="./about-us.html">ติดต่อเรา</a></li>
                                    <li><a href="./about-us.html">สมัครสมาชิก</a></li> -->
                                    <li><a href="<?php echo base_url('/admin')?>">เข้าสู่ระบบ</a></li>
                                  <!--   <li><a href="./pages.html">Pages</a>
                                        <ul class="dropdown">
                                            <li><a href="./room-details.html">Room Details</a></li>
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                            <li><a href="#">Family Room</a></li>
                                            <li><a href="#">Premium Room</a></li>
                                        </ul>
                                    </li> -->
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Header End -->
