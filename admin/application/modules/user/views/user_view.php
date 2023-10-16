<?php
	$this->load->view("templates/header");
	$this->load->assets('css'); 
?>
	<div class="page-wrapper">
		<!-- ============================================================== -->
		<!-- Bread crumb and right sidebar toggle -->
		<!-- ============================================================== -->
		<div class="row page-titles">
			<div class="col-md-5 align-self-center">
				<h3 class="text-themecolor">จัดการผู้ใช้งานระบบ</h3>
			</div>
			<div class="col-md-7 align-self-center">
				<ol class="breadcrumb">
				<li class="breadcrumb-item">ตั้งค่า</li>
				<li class="breadcrumb-item">จัดการผู้ใช้งานระบบ</li>
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
			<div class="row pl-3 pr-3">
				<div class="col-lg-12 col-xlg-12 col-md-12">
					<div class="row">
						<div class="col-lg-12 col-xlg-12 col-md-12 ">
							<div class="card">
								<div class="card-body">
									<div class="row padding-mps_product">
										<div class="col-sm-12 col-md-8 col-lg-9 p-b-10">
											<div class="input-group">
												<input type="text" id="search_table" class="form-control h-15" placeholder="กรอกข้อมูลที่ต้องการค้นหา">
												<div class="input-group-append">
													<button class="btn btn-info h-38" type="button">ค้นหา</button>
												</div>
											</div>
										</div>
										<div class="col-sm-12 col-md-4 col-lg-3 p-b-10 pl-md-1 pl-lg-1">
											<button onClick="loadModal('myModalAddUser')" class="btn btn-success waves-effect waves-light btn-block d-flex justify-content-between" type="button"><span class="btn-label"><i class="fa fa-plus"></i></span>เพิ่มผู้ใช้งาน<a></a></button>
										</div>
									</div><!-- row -->
									
									<div class="table-responsive pr-3 pl-3">
										<div id="myTable_wrapper" class="no-footer">
											<table id="user_datatable" class="table table-bordered table-striped nowrap">
												<thead>
													<tr>
														<th>#</th>
														<th>Username</th>
														<th>ชื่อ-สกุล</th>
														<th>สถานะ</th>
														<th>ประเภท</th>
														<th>แก้ไข</th>
												
													</tr>
												</thead>
												<tbody>
													<!-- แสดงข้อมูลตรงนี้ -->
												</tbody>
		                                    </table>
										</div><!-- myTable_wrapper -->
									</div><!-- table-responsive -->
									<div class="col-md-12 col-lg-12 p-t-10">
										<div class="row">
											<div class="col-sm-12 col-md-3 col-lg-2">
												<button type="button" id="del_user" name="del_user" class="btn btn-danger text-light btn-block mdi mdi-account-remove"> ลบผู้ใช้งาน</button>
											</div>
											<div class="col-sm-12 col-md col-lg-4">
												<!-- contant -->
											</div>
											<div class="col-sm-12 col-md col-lg-4">
												<!-- contant -->
											</div>
										</div><!-- row -->
									</div><!-- col-md-12 -->
								</div><!-- card-body -->
							</div><!-- card -->
						</div>
					</div><!-- row -->
				</div><!-- col-lg-9 -->
			</div><!-- row -->
		</div><!-- container-fluid -->
		<footer class="footer"> <?php echo $this->setting->getFooterTitle() ?> </footer>
	</div><!--สิ้นสุด page-wrapper-->
	<!--เริ่มต้น Footer-->
</div><!-- main-wrapper -->
<div id="user_container"></div>


<?php $this->load->view("templates/footer"); ?>
<script src="<?php echo base_url("assets/system/plugins/datatables/jquery.dataTables.min.js"); ?>"></script>
<?php $this->load->assets('js'); ?>

</body>
</html>


