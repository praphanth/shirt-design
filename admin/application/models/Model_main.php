<?php
class Model_main extends CI_Model {

	function __construct()
    {
        parent::__construct();
    }

    public function getNameCompany()
   	{
        $query = $this->db->query('SELECT * FROM company WHERE com_status != 0 AND is_default = 0');
		
		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
    }

    public function getRoomTypeById($room_id)
   	{
        $query = $this->db->query('SELECT room_type FROM hospital_room WHERE room_id = '.$room_id);
		
		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
    } 

}

?>
