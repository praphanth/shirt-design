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
			return $hospitalName[0]->com_name_en ?? '';
		}else{
			return $hospitalName[0]->com_name_en ?? '';
		}
	}
	public function getHeaderColor()
	{
		$hospitalName = $this->CI->model_main->getNameCompany();
		return $hospitalName[0]->header_color  ?? '#fff';
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
		$images = $this->CI->model_main->getNameCompany();
		return $images[0]->com_logo ?? 'assets/custom/images/clothes.svg';
	}
	
}
