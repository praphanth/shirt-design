<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Design extends MX_Controller {

	public $PAGE;
	
	public function __construct() {
        parent::__construct();
        $this->PAGE['title'] = 'ออกแบบเสื้อ | '.$this->load->get_var("default_title");
	}
	public function index()
	{
		
		// $this->PAGE['modulesList'] = $modulesList;
		$this->load->view("design_view",$this->PAGE);
	}
	
}
