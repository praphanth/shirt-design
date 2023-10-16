<?php
class Model_user extends CI_Model {

	public function getUser(){
		$query = $this->db->query('SELECT * FROM user');

		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
	}
	public function getUserType(){
		$query = $this->db->query('SELECT * FROM user_type');

		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
	}
	public function getUserTypeByID($user_type){
		$query = $this->db->query('SELECT * FROM user_type WHERE user_type_id ='.$user_type);

		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
	}
	public function getUserByID($user_id){
		$query = $this->db->query('SELECT * FROM user WHERE user_id ='.$user_id);

		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
	}
	public function getUserLogIn($username,$password){
		$query = $this->db->query('SELECT * FROM user WHERE username = '.$this->db->escape($username).' AND password = '.$this->db->escape(md5($password))); //is_active != 0 AND

		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
	}

	public function getUserTypeLoginById($user_type)
   	{
        $query = $this->db->query('SELECT user_type_name FROM user_type WHERE user_type_id = '.$this->db->escape($user_type));
		
		if($query->num_rows() > 0 ) {
			return $query->result();
		} else {
			return array();
		}
    }
   	public function countQueueUser($user_id)
    {
        $query = $this->db->query('SELECT uid FROM user_queue WHERE user_id = '.$user_id);

        
        return $query->num_rows();
          
    }   


	   

}

?>
