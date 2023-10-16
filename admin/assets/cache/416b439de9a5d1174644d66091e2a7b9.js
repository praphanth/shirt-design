var agent_table;

var agentConfig = {
	isShowContextMenu:false,
	agent_url:config.base_url+"agent/api/agent_api/getAgent",
	agent_delete_url:config.base_url+"agent/api/agent_api/deleteAgent",
	searchTable:"#search_table",
	datatable:"#agent_datatable"
};


function startDatatable(){
	agent_table = $(agentConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				
				{"width": "30%" },
				{"width": "15%" },
				{"width": "20%" },
				{"width": "15%" },
				{"width": "15%" },
		 ],
		"ajax": {
		"url": agentConfig.agent_url,
		"data": function ( d ) {
		}
	  }
	});
}

startDatatable();


$(agentConfig.searchTable).on('keyup change', function () {
	agent_table.search(this.value).draw();
});



$("#del_agent").click(function(){
	var hasItemSelected = false;
	$(".chkDel").each(function(index){
		if($(this).prop('checked')){
			hasItemSelected = true;
		}
	});
	if(hasItemSelected){
		swal({   
			title: "แน่ใจหรือ ?",   
			text: "ท่านแน่ใจหรือว่าต้องการลบข้อมูล !",   
			type: "warning",   
			showCancelButton: true, 
			cancelButtonText: "ยกเลิก",
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "ไช่, ต้องการลบ !",   
			closeOnConfirm: true 
		}, function(){   
			$(".chkDel").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					agent_table.rows(".selected").remove().draw();
					var agent_id = $(this).val();
					
					$.ajax({
						type: 'POST',
						data:{"agent_id":agent_id},
						url: agentConfig.agent_delete_url,
						success: function(json){
							console.log("json : "+json);
							var json = JSON.parse(json);
							alert(json.success);
						}
					});
					
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});


function loadModal(agent_id){
	$(".modal_container").empty();
	$(".modal_container").load(config.base_url+"agent/edit_agent/"+agent_id,function() {
		$("#myModalEditAgent").modal("show");
		
	});
}

function province(){
	var startDate = $(admissionConfig.startDate).val();
	var stopDate = $(admissionConfig.stopDate).val();
}