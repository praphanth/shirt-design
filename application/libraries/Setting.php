<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Setting{
	private $CI;
	
	public function __construct()
	{
		$this->CI =& get_instance();
		
	}
	public function getNameCompany($lang)
	{
		$hospitalName = $this->CI->model_main->getNameCompany();
		if($lang == 'en'){
			return $hospitalName[0]->com_name_en;
		}else{
			return $hospitalName[0]->com_name_en;
		}
	}
	public function getHeaderColor()
	{
		$hospitalName = $this->CI->model_main->getNameCompany();
		return $hospitalName[0]->header_color ?? '#fff';
	}
	public function getFontColor()
	{
		$hospitalName = $this->CI->model_main->getNameCompany();
		return $hospitalName[0]->font_color ?? '#000';
	}
	public function getFooterTitle()
	{
		$footers = $this->CI->model_main->getNameCompany();
		return $footers[0]->footer_title ?? '';
	}
	public function getHeaderImage()
	{
		$result = $this->CI->model_main->getNameCompany();
		$img = $result[0]->com_logo ?? 'assets/custom/images/clothes.svg';
		$img_val =  '<img src="'.base_url('admin/'.$img).'" height="40" />';
		return $img_val;
	}

	public function getPhone()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_phon ?? '';
	}
	public function getEmail()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_email ?? '';
	}
	public function getFacebook()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_facebook ?? '';
	}
	public function getLine()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_line ?? '';
	}
	public function getTwitter()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_twitter ?? '';
	}
	public function getInstagram()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_ig ?? '';
	}
	public function getYoutube()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_youtube ?? '';
	}
	public function getPay()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_pay ?? '';
	}
	public function getDetail()
	{
		$data = $this->CI->model_main->getContactInfo();
		return $data[0]->contact_info_detail ?? '';
	}
	
}
