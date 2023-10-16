<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MX_Controller { 
	
	public $PAGE;
	public function __construct() {
        parent::__construct();
		$this->PAGE['title'] = 'หน้าแรก | '.$this->load->get_var("default_title");
		$this->load->model('home/model_home');
		$this->load->helper(array('form', 'url'));
		$config['upload_path'] = 'uploads';
		$config['allowed_types'] = 'svg|gif|jpg|png'; 
		$config['encrypt_name'] = TRUE;
		$this->load->library('upload', $config);
	}

	public function index()
	{
		// $home = $this->model_home->getCompany();
		// $this->PAGE['home'] = $home;
		$this->load->view("home_view",$this->PAGE);
	}
	
	


}
