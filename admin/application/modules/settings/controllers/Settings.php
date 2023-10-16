<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends MX_Controller { 
	
	public $PAGE;
	public function __construct() {
        parent::__construct();
		$this->PAGE['title'] = 'ตั้งค่าทั่วไป | '.$this->load->get_var("default_title");
		$this->load->model('settings/model_setting');
		$this->utils->checkLogin();
		$this->load->helper(array('form', 'url'));
		$config['upload_path'] = 'uploads';
		$config['allowed_types'] = 'svg|gif|jpg|png'; 
		$config['encrypt_name'] = TRUE;
		$this->load->library('upload', $config);
	}

	public function index()
	{
		$this->utils->checkLogin();
		$settings = $this->model_setting->getCompany();

		$this->PAGE['settings'] = $settings;
		$this->load->view("setting_view",$this->PAGE);
	}
	
	public function save_website()
	{
		
		$is_default = $this->input->post("is_default");
		$com_id = $this->input->post("com_id");
		// $com_name_th = $this->input->post("com_name_th");
		$com_name_en = $this->input->post("com_name_en");
		$header_color = $this->input->post("header_color");
		$font_color = $this->input->post("font_color");
		$footer_title = $this->input->post("footer_title");


		if(!$this->upload->do_upload('com_logo'))
		{
			echo $this->upload->display_errors();
			$com_logo = "";
		}else{
			$com_logo = $this->upload->data();
			$config['image_library'] = 'gd2';
			$config['source_image'] = $com_logo['full_path'];
			$config['create_thumb'] = FALSE;
			$config['maintain_ratio'] = TRUE;
			$config['quality'] = 100;
			$config['width'] = 365;
			$config['height'] = 379; 
			$com_logo = "uploads/".$com_logo['file_name'];
			$this->load->library('image_lib', $config); 
			$this->image_lib->resize();
		}
		
		
		if(isset($is_default) && $is_default){
			$settings = $this->model_setting->getCompany($is_default);
			foreach($settings as $row){
				// $com_name_th = $row->com_name_th;	
				$com_name_en = $row->com_name_en;	
				$header_color = $row->header_color;	
				$font_color = $row->font_color;	
				$footer_title = $row->footer_title;	
				$com_logo = $row->com_logo;	
			}
		}
		if(empty($com_logo)){
			$settings_logo = $this->model_setting->getCompany($is_default);
			foreach($settings_logo as $row){	
				$com_logo = $row->com_logo;	
			}
		}

		$data = array(
			// "com_name_th"=>$com_name_th,
			"com_name_en"=>$com_name_en,
			"header_color"=>$header_color,
			"font_color"=>$font_color,
			"footer_title"=>$footer_title,
			"com_logo"=>$com_logo,
		);

		$this->db->where("is_default",0);
		$this->db->where("com_id",$com_id);
		$this->db->update("company",$data);
		redirect("settings");
	}


}
