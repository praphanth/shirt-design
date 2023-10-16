<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Detail extends MX_Controller {

	public $PAGE;
	public function __construct() {
        parent::__construct();
        $this->utils->checkLogin();
        $this->load->model('detail/model_detail');
		$this->PAGE['title'] = 'รายละเอียดเว็บไซต์ | '.$this->load->get_var("default_title");
		
	}
	public function index()
	{	
		$detail_reseul = $this->model_detail->getDetail();
		$this->PAGE['detail_reseul'] = $detail_reseul;
		$this->load->view('detail_view',$this->PAGE);
	}
	
	
	public function addDetail()
	{
		//รับค่าจากฟอร์ม
		$contact_info_id       = $this->input->post("contact_info_id");
		$contact_info_phon     = $this->input->post("contact_info_phon");
		$contact_info_email    = $this->input->post("contact_info_email");
		$contact_info_facebook = $this->input->post("contact_info_facebook");
		$contact_info_twitter  = $this->input->post("contact_info_twitter");
		$contact_info_ig       = $this->input->post("contact_info_ig");
		$contact_info_youtube  = $this->input->post("contact_info_youtube");
		$contact_info_line     = $this->input->post("contact_info_line");
		$contact_info_pay      = $this->input->post("contact_info_pay");
		$contact_info_detail   = $this->input->post("contact_info_detail");
		
		$data = array(
			'contact_info_phon'     =>$contact_info_phon,
			'contact_info_email'    =>$contact_info_email,
			'contact_info_facebook' =>$contact_info_facebook,
			'contact_info_twitter'  =>$contact_info_twitter,
			'contact_info_ig'       =>$contact_info_ig,
			'contact_info_youtube'  =>$contact_info_youtube,
			'contact_info_line'     =>$contact_info_line,
			'contact_info_pay'      =>$contact_info_pay,
			'contact_info_detail'   =>$contact_info_detail,
	    );

	    $this->db->where("contact_info_id",$contact_info_id);
		$this->db->update("contact_info",$data);
		
		redirect("detail");
	}

	










}
