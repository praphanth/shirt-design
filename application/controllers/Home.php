<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MX_Controller {

	public $PAGE;
	
	public function __construct() {
        parent::__construct();
		$this->PAGE['title'] = 'หน้าแรก';
	}
	public function index()
	{
		
		// $this->PAGE['modulesList'] = $modulesList;
		// $this->load->view("home_view",$this->PAGE);
		$this->load->view("design_view",$this->PAGE);
	}
	
}
