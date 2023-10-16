<?php $this->load->view("templates/header"); ?>
<?php $this->load->assets('css'); ?>
<link href="<?php echo base_url('assets/custom/css/bootstrap-colorpicker.css'); ?>" rel="stylesheet" type="text/css">
<link href="<?php echo base_url('assets/custom/css/bootstrap-colorpicker-plus.min.css'); ?>" rel="stylesheet" type="text/css">

<?php
  $com_id = 0;	
  $com_name_en = '';	
  $header_color = '#fff';	
  $font_color = '#000';	
  $footer_title =  '';	
  $is_default = '';	
	foreach($settings as $row){
		$com_id = $row->com_id ?? 0;	
		$com_name_en = $row->com_name_en;	
		$header_color = $row->header_color;	
		$font_color = $row->font_color;	
		$footer_title = $row->footer_title;	
		$is_default = $row->is_default;	
      
	}
?>
 <div class="page-wrapper">
		<!-- ============================================================== -->
		<!-- Bread crumb and right sidebar toggle -->
		<!-- ============================================================== -->
		<div class="row page-titles">
			<div class="col-md-5 align-self-center">
				<h3 class="text-themecolor">ตั้งค่าทั่วไป</h3>
			</div>
			<div class="col-md-7 align-self-center">
				<ol class="breadcrumb">
				<li class="breadcrumb-item">ตั้งค่า</li>
				<li class="breadcrumb-item"> ตั้งค่าทั่วไป </li>
				</ol>
			</div>
		</div>
		<!-- ============================================================== -->
		<!-- End Bread crumb and right sidebar toggle -->
		<!-- ============================================================== -->
		<!-- ============================================================== -->
		<!-- Container fluid  -->
		<!-- ============================================================== -->
		<div class="container-fluid">
			<!-- ============================================================== -->
			<!-- Start Page Content -->
			<!-- ============================================================== -->
			<!-- Row -->
			
            <div class="row">
              <div class="col-lg-12">
                  <div class="card card-outline-info">
                      <div class="card-header">
                          <h4 class="m-b-0 text-white">ตั้งค่าทั่วไปเว็บไซต์</h4>
                      </div>
                      <div class="card-body">
                          <form action="<?php echo base_url("settings/save_website"); ?>" method="post" id="setting_frm" enctype="multipart/form-data">
                              <div class="form-body">
                                  <div class="row p-t-20">
                                  	
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label class="control-label">ชื่อเว็บไซต์</label>
                                              <input type="text" name="com_name_en" class="form-control" value="<?php echo $com_name_en ?? ''; ?>">
                                              <input type="hidden" name="is_default" id="is_default" value="<?php echo $is_default; ?>">
                                              <input type="hidden" name="com_id" id="com_id" value="<?php echo $com_id; ?>">
                                              <input type="hidden" name="font_color" id="font_color" value="<?php echo $font_color; ?>">
                                              <input type="hidden" name="header_color" id="header_color" value="<?php echo $header_color; ?>">
                                              <small class="form-control-feedback"> ใช้สำหรับแสดงส่วนหัวของเว็บไซต์</small> 
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label class="control-label">ข้อความด้านล่าง</label>
                                              <input type="text" name="footer_title" class="form-control" value="<?php echo $footer_title; ?>">
                                              <small class="form-control-feedback"> ใช้สำหรับแสดงส่วนท้ายของเว็บไซต์</small>
                                          </div>
                                      </div>
                                      
                                      <div class="col-md-6">
                                          <div class="form-group">
                                            <label class="control-label">โลโก้ขนาด 365x379 พิกเซล</label>
                                              <label for="file-upload" class="form-control custom-file-upload">
                                                  <i class="fa fa-cloud-upload"></i> อัพโหลดไฟล์ .png, .jpg
                                              </label>
                                              <input id="file-upload" type="file" name="com_logo" class="form-control" accept="image/png,image/gif,image/jpeg"/>
                                          </div>
                                      </div>
                                      <div class="col-md-6"></div>
                                      <div class="col-md-3">
                                          <div class="form-group has-danger">
                                            <label class="control-label">เปลี่ยนสีพื้นหลังส่วนหัวเว็บไซต์</label>
                                            <div class="btn-group btn-group-sm colorpickerplus-dropdown header_color" id="palette">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="color-fill-icon dropdown-color-fill-icon" style="background-color:<?php echo $header_color; ?>"></span>&nbsp;<b class="fa fa-caret-down"></b></button>
                                                <ul class="dropdown-menu">
                                                  <li class=""><div class="colorpickerplus-container"></div></li>
                                                </ul>
                                              </div>
                                          </div>
                                      </div>

                                      <div class="col-md-3">
                                          <div class="form-group has-danger">
                                              <label class="control-label">เปลี่ยนสีตัวหนังสือส่วนหัวเว็บไซต์</label>
                                               
                                              <div class="btn-group btn-group-sm colorpickerplus-dropdown font_color" id="palette2">
                                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="color-fill-icon dropdown-color-fill-icon" style="background-color:<?php echo $font_color; ?>"></span>&nbsp;<b class="fa fa-caret-down"></b></button>
                                                <ul class="dropdown-menu">
                                                  <li class=""><div class="colorpickerplus-container"></div></li>
                                                </ul>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <!--/row-->
                              </div>
                             


                              <div class="form-actions">
                                  <button type="submit" class="btn btn-success"> <i class="fa fa-check"></i> บันทึกข้อมูล</button>
                                  <button type="button" onClick="setDefault();" class="btn btn-inverse"><i class="mdi mdi-autorenew"></i> ใช้ค่าเริ่มต้น</button>
                              </div>
                      </div>
                  </div>
              </div>
          </div>
		</div><!-- container-fluid -->
		<footer class="footer"> <?php echo $this->setting->getFooterTitle() ?> </footer>
	</div><!--สิ้นสุด page-wrapper-->
	<!--เริ่มต้น Footer-->
</div><!-- main-wrapper -->
<div id="modal_container"></div>
</form>


  <!--เริ่มต้น Footer-->

<?php $this->load->view("templates/footer"); ?>
<script src="<?php echo base_url("assets/system/plugins/datatables/jquery.dataTables.min.js"); ?>"></script>
<script src="<?php echo base_url("assets/custom/js/bootstrap-colorpicker.min.js"); ?>"></script>
<script src="<?php echo base_url("assets/custom/js/bootstrap-colorpicker-plus.js"); ?>"></script>
<script>
  var sum = 0;
  var r = 10;
  for (var i = 10 - 1; i >= 0; i--) {
    sum += r;
    // console.log(sum);
  }

function setDefault(){
	$("#is_default").val(1);	
	$("#setting_frm").submit();
}
$(function(){
		  
	var header_color = $('.header_color .colorpickerplus-container');
  	header_color.colorpickerembed();
  	header_color.on('changeColor', function(e,color){
    var el = $('.color-fill-icon', $('#palette'));
	$(".topbar").css('background-color', color);
	console.log(color);
	$("#header_color").val(color);
    if(color==null) {
      	el.addClass('colorpicker-color');
    } else {
      	el.removeClass('colorpicker-color');
      	el.css('background-color', color);
    }
  });
  
  var font_color = $('.font_color .colorpickerplus-container');
  font_color.colorpickerembed();
  font_color.on('changeColor', function(e,color){
    var el = $('.color-fill-icon', $('#palette2'));
	$(".hp-name").css('color', color);
	$(".hp-name-th").css('color', color);
	$("#font_color").val(color);
    if(color==null) {
      el.addClass('colorpicker-color');
    } else {
      el.removeClass('colorpicker-color');
      el.css('background-color', color);
    }
  });
  
});
</script>


