<?php $this->load->view("templates/header"); ?>

<?php
$attributes = array('name' => 'addDetail', 'class' => 'form-horizontal', 'method' => 'post');
    echo form_open_multipart('detail/addDetail', $attributes);
    
$contact_info_id       = 0;
$contact_info_phon     = "";
$contact_info_email    = "";
$contact_info_facebook = "";
$contact_info_twitter  = "";
$contact_info_ig       = "";
$contact_info_youtube  = "";
$contact_info_line  = "";
$contact_info_pay      = "";
$contact_info_detail   = "";
foreach($detail_reseul as $row){
	$contact_info_id       = $row->contact_info_id;
	$contact_info_phon     = $row->contact_info_phon;
	$contact_info_email    = $row->contact_info_email;
	$contact_info_facebook = $row->contact_info_facebook;
	$contact_info_twitter  = $row->contact_info_twitter;
	$contact_info_ig       = $row->contact_info_ig;
	$contact_info_youtube  = $row->contact_info_youtube;
	$contact_info_line     = $row->contact_info_line;
	$contact_info_pay      = $row->contact_info_pay;
	$contact_info_detail   = $row->contact_info_detail;
}
?>	
	<input type="hidden" name="contact_info_id" value="<?php echo $contact_info_id; ?>">
	<div class="page-wrapper">
		<div class="row page-titles">
			<div class="col-md-5 align-self-center">
				<h3 class="text-themecolor">รายละเอียดเว็บไซต์</h3>
			</div>
			<div class="col-md-7 align-self-center">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">ตั้งค่า</li>
					<li class="breadcrumb-item active">รายละเอียดเว็บไซต์</li>
				</ol>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row pl-3 pr-3">
				<div class="col-lg-12 col-xlg-12 col-md-12">
					<div class="row">
						<div class="col-lg-12 col-xlg-12 col-md-12 mt-3">
							<div class="card card-outline-success">
								<div class="card-header">
		                        	<h4 class="m-b-0 text-white">รายละเอียดเว็บไซต์</h4>
		                      	</div>
								<div class="card-body">
									<div class="row padding-mps_product">
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">เบอร์โทรศัพท์</label>
												<input type="text" name="contact_info_phon" class="form-control" value="<?php echo $contact_info_phon; ?>">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">อีเมล</label>
												<input type="text" name="contact_info_email" class="form-control" value="<?php echo $contact_info_email; ?>">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Facebook</label>
												<input type="text" name="contact_info_facebook" class="form-control" value="<?php echo $contact_info_facebook; ?>">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Twitter</label>
												<input type="text" name="contact_info_twitter" class="form-control" value="<?php echo $contact_info_twitter; ?>">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Instagram</label>
												<input type="text" name="contact_info_ig" class="form-control" value="<?php echo $contact_info_ig; ?>">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Youtube</label>
												<input type="text" name="contact_info_youtube" class="form-control" value="<?php echo $contact_info_youtube; ?>">
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="control-label">Line ID</label>
												<input type="text" name="contact_info_line" class="form-control" value="<?php echo $contact_info_line; ?>">
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<label class="control-label">ช่องทางการชำระเงิน</label>
												<textarea name="contact_info_pay" class="form-control" rows="4"><?php echo $contact_info_pay; ?></textarea>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<label class="control-label">เกี่ยวกับเรา</label>
												<textarea name="contact_info_detail" class="form-control" rows="4"><?php echo $contact_info_detail; ?></textarea>
											</div>
										</div>
										<div class="col-md-12">
											<div class="form-actions mr-auto">
			                                  <button type="submit" class="btn btn-success pull-right"> <i class="fa fa-check"></i> บันทึกข้อมูล</button>
			                              	</div>
			                              </div>
									</div>
									
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer"><?php echo $this->setting->getFooterTitle() ?></footer>
	</div>
</div>
</form>

<?php $this->load->view("templates/footer"); ?>
</body>
</html>


