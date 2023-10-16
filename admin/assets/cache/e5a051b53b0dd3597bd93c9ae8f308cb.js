
var defaultData = new Array();
var filtering = new Object();
var grooming_table;

var dataList = new Array();

var groomingConfig = {
	grooming_url:config.base_url+"settings/api/grooming_api/getGrooming",
	grooming_delete_url:config.base_url+"settings/api/grooming_api/deletegrooming",
	grooming_info_url:config.base_url+"settings/api/grooming_api/getPaymentByID",
	searchTable:"#search_table",
	datatable:"#grooming_datatable",
	datatable_info:"#grooming_info_datatable",
	grooming_container:"#grooming_container",
	
};



function loadGroomingModal(_method){
	$(groomingConfig.grooming_container).empty();
	$(groomingConfig.grooming_container).load(config.base_url+"settings/"+_method,function() {
		$("#"+_method).modal("show");
	});
}
function loadGroomingModalEdit(id){
	$(groomingConfig.grooming_container).empty();
	$(groomingConfig.grooming_container).load(config.base_url+"settings/myModalEditGrooming/"+id,function() {
		$("#myModalEditGrooming").modal("show");
	});
}
function startDatatableGrooming(){
	grooming_table = $(groomingConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "10%" },
				{"width": "35%" },
				{"width": "35%" },
				{"width": "5%" }
		 ],
		"ajax": {
		"url": groomingConfig.grooming_url,
		"data": function ( d ) {
		}
	  }
	});
	

}


$(groomingConfig.searchTable).on('keyup change', function () {
	grooming_table.search(this.value).draw();
});


$("#del_grooming").click(function(){
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
		$(".del_grooming").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				grooming_table.rows(".selected").remove().draw();
				var grooming_style_id = $(this).val();
				
				$.ajax({
					type: 'POST',
					data:{"grooming_style_id":grooming_style_id},
					url: groomingConfig.grooming_delete_url,
					success: function(json){
						var json = JSON.parse(json);
						alert(json.success);
					}
				});
			}
		});
	});
});








startDatatableGrooming();


