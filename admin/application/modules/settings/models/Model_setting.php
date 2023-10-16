<?php
class Model_setting extends CI_Model {
	
	   public function getCompany($is_default = 1)
       {
           	$query = $this->db->query('SELECT * FROM company WHERE is_default = '.$is_default);
			if($query->num_rows() > 0 ) {
				return $query->result();
			} else {
				return array();
			}
       }
	   
}

?>
