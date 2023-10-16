<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_api extends MX_Controller {
	
	public $PAGE;
	public $STATUS_LIST = array();
	public function __construct() {
        parent::__construct(); 
        $this->utils->checkLogin();
		$this->load->model('user/model_user');
		$this->load->library('user/user_libs');
	}
	
	public function getUser()
	{

		$user = $this->model_user->getUser();
		$user_arr = array();
        $user_arr['data'] = array();
		
        if(!empty($user)):
            foreach($user as $row):
				$user_id = $row->user_id;
				$username = $row->username;
				$name = $row->name;
				$user_type = $row->user_type;
				$logged_in = $row->logged_in;

				$user_type_result = $this->model_user->getUserTypeByID($user_type);
				if(count($user_type_result)>0){
					$user_type_name = $user_type_result[0]->user_type_name;
				}else{
					$user_type_name = "ไม่ระบุ";
				}
				if($user_type == 9){
					$disabled = "disabled";
					$disablebtn = "secondary";
				}else{
					$disabled = "";
					$disablebtn = "warning";
				}
				if($user_type == 9){
					$color ="danger";
					$btn_icon = "mdi-account-key";
				}else if($user_type == 8){
					$color ="info";
					$btn_icon = "mdi-account-edit";
				}else{
					$color ="warning";
					$btn_icon = "mdi-account-edit";
				}
				if($logged_in == 1){
					$status_color = "success";
					$status_name = "กำลังออนไลน์";
				}else{
					$status_color = "warning";
					$status_name = "ออฟไลน์";
				}
				$type_lable = '<label class="label label-'.$color.' w-100 text-center" >'.$user_type_name.'</label>';

				$status = '<label class="label label-'.$status_color.' w-100 text-center" >'.$status_name.'</label>';
				$checkbox = '<input type="checkbox" id="basic_checkbox_'.$user_id.'" value="'.$user_id.'" class="filled-in chk-col-light-green chkDel" '.$disabled.'><label for="basic_checkbox_'.$user_id.'" class="chk-mps"></label>';
				$edit = '<button  href="javascript:void(0)" data-toggle="modal" onClick="loadModalEdit('.$user_id.');" class="btn btn-'.$disablebtn.' text-light btn-block mdi '.$btn_icon.' font-btn-agent-14" '.$disabled.'> แก้ไข</button>'; 
				

                $user_arr['data'][] = array( 
                    $checkbox,
                    $username,
                    $name,
                    $status,
                    $type_lable,
                    $edit,

                );
            endforeach;
        endif;

        $json = json_encode($user_arr);
		echo $json;
	}

	// delete data
	public function deleteUser(){
		$user_id  = $this->input->post("user_id");
		$this->db->where('user_id', $user_id);
		$result = $this->db->delete('user');
		if($result){
			$success = 1;
		}else{
			$success = 0;
		}
		$respond = array('success' => $success);
	}





	
}


