<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MX_Controller {

	public $PAGE;
	public function __construct() {
        parent::__construct();
        $this->PAGE['title'] = 'จัดการผู้ใช้งาน | '.$this->load->get_var("default_title");
		$this->load->model('user/model_user');
		
	}
	public function index()
	{	
		$this->utils->checkLogin();
		$this->load->view('user_view',$this->PAGE);
	}
	public function myModalAddUser(){
		$this->utils->checkLogin();
		$this->load->view("user/modals/add_user_view");
	}
	public function add_user(){
		$this->utils->checkLogin();
		$name = $this->input->post("name");
		$username = $this->input->post("username");
		$password = $this->input->post("password");
		$user_type = $this->input->post("user_type");

		$data = array(
			"name"=>$name,
			"username"=>$username,
			"password"=>md5($password),
			"allow_to_login"=>1,
			"user_type"=>$user_type,
		);
		$this->db->insert("user",$data);
		redirect("user");
	}
	public function myModalEditUser($user_id){
		$this->utils->checkLogin();
		$user_result = $this->model_user->getUserByID($user_id);
		$this->PAGE['user_result'] = $user_result;
		$this->load->view("user/modals/edit_user_view",$this->PAGE);
	}

	public function update_user(){
		$this->utils->checkLogin();
		$user_id = $this->input->post("user_id");
		$name = $this->input->post("name");
		$username = $this->input->post("username");
		$password = $this->input->post("password");
		$user_type = $this->input->post("user_type");

		$data = array(
			"name"=>$name,
			"username"=>$username,
			//"password"=>md5($password),
			"user_type"=>$user_type,
		);
		$this->db->where("user_id",$user_id);
		$this->db->update("user",$data);
		redirect("user");
	}

	public function login()
	{
		$this->utils->IsLogin();
		$this->load->view('login_view',$this->PAGE);
	}
	public function logout()
	{
		$user_id = $this->utils->user_id();
		$this->db->set('logged_in', 0);
		$this->db->where('user_id',$user_id);
		$this->db->update('user');

		$this->session->sess_destroy();
		redirect("user/login","refresh");
	}
	public function loginUser()
	{
		$username = $this->input->post('username');
		$password = $this->input->post('password');

		$member = $this->model_user->getUserLogIn($username,$password);
		
		if(!empty($member)){
			/* ดึงข้อมูลของ ยูสเซอร์ */
			foreach ($member as $rs) {
				$user_id = $rs->user_id;
				$username = $rs->username;
				$user_type = $rs->user_type;
				$name = $rs->name;
				$allow_to_login = $rs->allow_to_login;
				$is_active = $rs->is_active;
				
			}
			if(!$allow_to_login){
				redirect("user/logout");
			}
			/* สร้างตัวแปรการ ล็อกอิน */
			$logged_in = 1;
			/* บันทึกค่าการเข้าสู่ระบบ */
			$this->db->set('logged_in', $logged_in);
			$this->db->where('user_id',$user_id);
			$this->db->update('user');

			/* ดึงชื่อ ตำแหน่งงาน */
			$usertype = $this->model_user->getUserTypeLoginById($user_type);
			$user_type_name = $usertype[0]->user_type_name;

			/* เก็บข้อมูลลงใน session*/
			$newdata = array(
		        'user_id'     	 => $user_id,
		        'username'  	 => $username,
		        'user_type' 	 => $user_type,
		        'user_type_name' => $user_type_name,
		        'name'      	 => $name,
		        'allow_to_login' => $allow_to_login,
		        'logged_in' 	 => $logged_in,
			);


			$this->session->set_userdata($newdata);
			redirect("user","refresh");
		}else{
			$error_title = '';
			$error_message = 'ชื่อผู้ใช้งาน หรือ รหัสผ่านของคุณไม่ถูกต้อง';
			$this->utils->errorMessage($error_title,$error_message);
			redirect("user/login","refresh");
		}
	}
	







}
