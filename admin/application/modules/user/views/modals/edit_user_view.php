<!-- ============================================================== -->
<!----------------- Modals เพิ่มประเภทสินค้าและบริการ ------------------>
<!-- ============================================================== -->  
<?php
$attributes = array('id' => 'update_user');
echo form_open(base_url('user/update_user'), $attributes);

foreach($user_result as $row){
  $user_id = $row->user_id;
  $name = $row->name;
  $username = $row->username;
  $password = $row->password;
  $user_type = $row->user_type;
}


?>
<input name="user_id" type="text" value="<?php echo $user_id; ?>">
<div id="myModalEditUser" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xs">
      <div class="modal-content">
          <div class="modal-header bg-header-modals">
              <h4 class="modal-title text-light" id="myModalLabel2">แก้ไขผู้ใช้งานระบบ</h4>
              <button type="button" class="close text-white" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <!-- from modal  -->
          <div class="modal-body">
                  <div class="row p-l-20 p-r-10">
                      <div class="col-md-12 col-lg-12 p-t-10 p-b-10 pl-0">
                          <div class="row">
                              <div class="col-sm-12 col-md-12 col-lg-12 pr-0">
                                  <label class="">ชื่อ - นามสกุล : <a class="text-danger">*</a></label>
                              </div>
                              <div class="col-sm-12 col-md-12 col-lg-12">
                                  <input name="name" type="text" class="form-control" value="<?php echo $name; ?>" required>
                              </div>
                          </div>
                      </div>
                      
                      <div class="col-md-12 col-lg-12 p-t-10 p-b-10 pl-0">
                          <div class="row">
                              <div class="col-sm-12 col-md-12 col-lg-12 pr-0">
                                  <label class="">Username : <a class="text-danger">*</a></label>
                              </div>
                              <div class="col-sm-12 col-md-12 col-lg-12">
                                  <input name="username" type="text" class="form-control" value="<?php echo $username; ?>" required>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-12 col-lg-12 p-t-10 p-b-10 pl-0">
                          <div class="row">
                              <div class="col-sm-12 col-md-12 col-lg-12 pr-0">
                                  <label class="">Password : <a class="text-danger">*</a></label>
                              </div>
                              <div class="col-sm-12 col-md-12 col-lg-12">
                                  <input name="password" type="password" class="form-control" value="<?php echo $password; ?>" required readonly>
                              </div>
                          </div>
                      </div>
                      <div class="col-md-12 col-lg-12 p-t-10 p-b-10 pl-0">
                          <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-12 pr-0">
                                <label class="">ประเภท Account: :</label>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-12">
                                <select class="select2 form-control custom-select" name="user_type">
                
                                    <?php 
                                        $type_list = $this->model_user->getUserType();
                                        foreach($type_list as $row){
                                          $user_type_id = $row->user_type_id;
                                          $user_type_name = $row->user_type_name;
                                          if($user_type == $user_type_id){
                                            $selected = "selected";
                                          }else{
                                            $selected = "";
                                          }
                                          if($user_type_id != 9){
                                      ?>
                                       <option value="<?=$user_type_id;?>" <?php echo $selected; ?> ><?=$user_type_name;?></option>
                                    <?php }} ?>
                                  
                                </select>
                            </div>
                          </div>
                      </div>

                      
                  </div>
             
          </div>
          <!-- close from modal  -->

          <div class="modal-footer d-flex justify-content-center">
              <div class="row w-100">
                  <div class="col-sm-12 col-md-2 button-group text-center btn-footer">
                       <!-- contant -->
                  </div>

                  <div class="col-sm-12 col-md-4 button-group text-center btn-footer">
                      <button type="button" class="btn btn-default waves-effect btn-block" data-dismiss="modal">ยกเลิก</button>
                  </div>
                   <div class="col-sm-12 col-md-4 button-group text-center btn-footer ">
                       <button type="submit" class="btn btn-info waves-effect btn-block">แก้ไขผู้ใช้งาน</button>
                  </div>                 
              </div>
          </div>

      </div>
      <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
  </div>
  </form>
