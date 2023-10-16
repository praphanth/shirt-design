<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Utils{
	private $CI;
	public function __construct()
	{
		$this->CI =& get_instance();
	}




	public function errorMessage($error_title,$error_message)
	{
		if($error_title == ''){
			$error_title = 'ข้อความจากระบบ';
		}
		$this->CI->session->set_flashdata('error_title', $error_title);
		$this->CI->session->set_flashdata('error_message', $error_message);
	}
	public function do_upload($filename)
    {
        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|jpeg|png|bmp';
        //$config['max_size']             = 100;
        //$config['max_width']            = 1024;
        //$config['max_height']           = 768;

        $this->CI->load->library('upload', $config);

        if (!$this->CI->upload->do_upload($filename)){
            $error = $this->CI->upload->display_errors();
            return base_url('assets/custom/images/cat.jpg');
        }else{
            $file_info = $this->CI->upload->data();
            $full_path = base_url('uploads/'.$file_info['file_name']);

            return $full_path;
        }
    }
    

	function dateThai($strDate,$isTime = 1){

		$strYear = date("Y",strtotime($strDate))+543;
		$strMonth= date("n",strtotime($strDate));
		$strDay= date("j",strtotime($strDate));
		$strHour= date("H",strtotime($strDate));
		$strMinute= date("i",strtotime($strDate));
		$strSeconds= date("s",strtotime($strDate));
		$strMonthCut = Array("","มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม");
		$strMonthThai=$strMonthCut[$strMonth];

		if($isTime){
			return "$strDay $strMonthThai $strYear, $strHour:$strMinute";
		}else{
			return "$strDay $strMonthThai $strYear";
		}
		
	}

	public function CreatePagination($numrows,$uri_segment,$page,$limit,$url,$search){

		$this->CI->load->library("pagination");
		$segments = array($url);

		if(isset($search)){
			$config['base_url'] = site_url($segments);
		}else{
			$config['base_url'] = base_url().$url;
		}

		if (!empty($search)) $config['suffix'] = '?' . http_build_query($_GET, '', "&");
    	$config['first_url'] = $config['base_url'].'?'.http_build_query($_GET);

		$config['total_rows'] = $numrows;
		$config['per_page'] = $limit;
		$config['uri_segment'] = $uri_segment;	
		$config['cur_page'] = $page;
		$config['full_tag_open'] = '<div class="dataTables_paginate paging_simple_numbers" id="myTable_paginate"><ul>';
		$config['full_tag_close'] = '</ul></div>';
		$config['first_link'] = false;
		$config['last_link'] = false;

		$config['first_tag_open'] = '<li>';
		$config['first_tag_close'] = '</li>';

		$config['prev_link'] = 'ย้อนกลับ';
		$config['prev_tag_open'] = '<li class="paginate_button previous" aria-controls="myTable" id="myTable_previous">';
		$config['prev_tag_close'] = '</li>';

		$config['next_link'] = 'ถัดไป';
		$config['next_tag_open'] = '<li class="paginate_button next" aria-controls="myTable" id="myTable_next">';
		$config['next_tag_close'] = '</li>';

		$config['last_tag_open'] = '<li class="paginate_button" aria-controls="myTable">';
		$config['last_tag_close'] = '</li>';

		$config['cur_tag_open'] = '<li class="paginate_button current" aria-controls="myTable">';
		$config['cur_tag_close'] = '</li>';

		$config['num_tag_open'] = '<li  class="paginate_button" aria-controls="myTable">';
		$config['num_tag_close'] = '</li>';

		$config['use_page_numbers'] = TRUE;

		$config['num_links'] = 3;
		$config['attributes'] = array('class' => 'page-link');
		//$config['anchor_class'] = 'class="page-link"';
		$this->CI->pagination->initialize($config);
	}

	
}
