
var user_table;
var filtering = new Object();
var userConfig = {
	isShowContextMenu:false,
	user_url:config.base_url+"user/api/user_api/getUser",
	user_delete_url:config.base_url+"user/api/user_api/deleteUser",

	searchTable:"#search_table",
	datatable:"#user_datatable",
	user_container:"#user_container",
};


function loadModal(_method){
	$(userConfig.user_container).empty();
	$(userConfig.user_container).load(config.base_url+"user/"+_method,function() {
		$("#"+_method).modal("show");
		
	});
	
}
function loadModalEdit(user_id){
	$(userConfig.user_container).empty();
	$(userConfig.user_container).load(config.base_url+"user/myModalEditUser/"+user_id,function() {
		$("#myModalEditUser").modal("show");
		
	});
}

function startDatatable(){

	user_table = $(userConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "30%" },
				{"width": "30%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "15%" },


		 ],
		"ajax": {
		"url": userConfig.user_url,
		"data": function ( d ) {
		}
	  }

	});

	
}

startDatatable();



$(userConfig.searchTable).on('keyup change', function () {
	user_table.search(this.value).draw();
});




$("#del_user").click(function(){
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
			confirmButtonText: "ใช่, ต้องการลบ !",   
			closeOnConfirm: true 
		}, function(){   
			$(".chkDel").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					user_table.rows(".selected").remove().draw();
					var user_id = $(this).val();
					
					$.ajax({
						type: 'POST',
						data:{"user_id":user_id},
						url: userConfig.user_delete_url,
						success: function(json){
							var json = JSON.parse(json);
							console.log(json.success);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});
