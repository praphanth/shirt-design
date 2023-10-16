<!-- เริ่มต้น Header -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo base_url('assets/custom/images/clothes.svg'); ?>">
    <title><?php echo $title; ?></title>

    <link href="<?php echo base_url('assets/system/plugins/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet" media='screen,print'>

     <!--alerts CSS -->
    <link href="<?php echo base_url('assets/system/plugins/sweetalert/sweetalert.css'); ?>" rel="stylesheet" type="text/css">

    
    <link href="<?php echo base_url('assets/system/plugins/bootstrap-table/dist/bootstrap-table.min.css'); ?>" rel="stylesheet" media='screen,print' type="text/css" />
    
    <link href="<?php echo base_url('assets/system/plugins/tablesaw-master/dist/tablesaw.css'); ?>" rel="stylesheet" media='screen,print'>

    <link href="<?php echo base_url('assets/system/css/style.css'); ?>" rel="stylesheet" media='screen,print'>
    <link href="<?php echo base_url('assets/system/css/colors/blue.css'); ?>" id="theme" rel="stylesheet">
    <link href="<?php echo base_url('assets/custom/css/main.css'); ?>" id="theme" rel="stylesheet" media='screen,print'>
    
    <link href="<?php echo base_url('assets/system/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css'); ?>" rel="stylesheet">
    <!-- Page plugins css -->
    <link href="<?php echo base_url('assets/system/plugins/clockpicker/dist/jquery-clockpicker.min.css'); ?>" rel="stylesheet">

    <!--alerts TIMELINE -->
    <link href="<?php echo base_url('assets/system/plugins/horizontal-timeline/css/horizontal-timeline.css" rel="stylesheet'); ?>" type="text/css">
    <link href="<?php echo base_url('assets/custom/css/jquery-ui.css'); ?>" rel="stylesheet" type="text/css">

        <!-- chartist Dashboard -->
    <link href="<?php echo base_url('assets/system/plugins/chartist-js/dist/chartist.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/plugins/chartist-js/dist/chartist-init.css'); ?>" rel="stylesheet" type="text/css">
    
    <link href="<?php echo base_url('assets/system/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/system/plugins/morrisjs/morris.css'); ?>" rel="stylesheet" type="text/css">


    
</head>

<body class="fix-header card-no-border">
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!--เริ่มต้น main-wrapper-->
    <div id="main-wrapper">
        <header class="topbar" style="background-color:<?php echo $this->setting->getHeaderColor(); ?>">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                
                <div class="navbar-collapse">
                	<ul class="navbar-nav mr-auto mt-md-0">
                		<li class="nav-item dropdown">
                            <div class="logobox">
		                        <img src="<?php echo base_url($this->setting->getHeaderImage()); ?>" alt="homepage" class="light-logo" />
		                    </div>
		                    
                        </li>
                        <!-- This is  -->
                       
                        <li class="nav-item dropdown">
                            <div class="logonamebox">
		                    	<a class="navbar-brand" >
		                    		<span class="hp-name" style="color:<?php echo $this->setting->getFontColor(); ?>">
                                        <?php echo $this->setting->getNameCompany('en'); ?> 
                                    </span>
		                       
		                   		</a>
		                   </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="<?php echo base_url('assets/custom/images/asistencia-medica.svg'); ?>" alt="user" class="profile-pic" /></a>
                            <div class="dropdown-menu dropdown-menu-right scale-up">
                                <ul class="dropdown-user">
                                    <li>
                                        <div class="dw-user-box">
                                            <div class="u-img"><img src="<?php echo base_url('assets/custom/images/asistencia-medica.svg'); ?>" alt="user"></div>
                                            <div class="u-text">
                                                <h4></h4><?php echo $this->utils->name(); ?></h4>
                                                <p class="text-muted"></p>
                                                <a href="<?php echo base_url("user"); ?>" class="btn btn-rounded btn-danger btn-sm"><?php echo $this->utils->user_type_name(); ?></a></div>
                                        </div>
                                    </li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="<?php echo base_url("user"); ?>"><i class="ti-user"></i> ข้อมูลส่วนตัว</a></li>
                                    <li><a href="<?php echo site_url('user/logout'); ?>"><i class="fa fa-power-off"></i> ออกจากระบบ</a></li>
                                </ul>
                            </div>
                        </li>
                      
                    </ul>
                </div>
            </nav>
        </header>
      
        
        <aside class="left-sidebar">
            <!-- Sidebar scroll-->
            
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">

                        <li class="one-column"> <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fa fa-group"></i><span class="hide-menu">menu</span></a>
                        </li>
                        <li class="one-column"> <a class="has-arrow waves-effect waves-dark" href="<?php echo site_url('settings/website'); ?>" aria-expanded="false"><i class="fa fa-gears"></i><span class="hide-menu">ตั้งค่า</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="<?php echo site_url('settings'); ?>">ตั้งค่าทั่วไปเว็บไซต์</a></li>
                                <li><a href="<?php echo site_url('user'); ?>">จัดการผู้ใช้งานระบบ</a></li>
                                <li><a href="<?php echo site_url('detail'); ?>">รายละเอียดเว็บไซต์</a></li>
                               
                            </ul>
                        </li>
                       
                        </li>
                    </ul>
                    
                </nav>
            </div>
        </aside>
      <!--สิ้นสุด Header-->