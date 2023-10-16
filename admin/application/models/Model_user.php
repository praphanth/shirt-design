<?php
class Model_user extends CI_Model {

	function __construct()
    {
        parent::__construct();
    }
    public function getUserById($user_id) // หมอ
   	{
        $query = $this->db->query('SELECT * FROM user WHERE user_id = '.$user_id);

		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}	
    }
    public function getUserDoctor() // หมอ
    {
        $query = $this->db->query('SELECT user_id,name FROM user WHERE user_type = 1');

        if($query->num_rows() > 0 ) {
            return $query->result();
        } else {
            return array();
        }   
    }  
    public function countQueueUser($user_id) // หมอ
    {
        $query = $this->db->query('SELECT uid FROM user_queue WHERE user_id = '.$user_id);

        
        return $query->num_rows();
          
    }    
}

?>
