
var admission_table;
var filtering = new Object();
var admissionConfig = {
	isShowContextMenu:false,
	admission_url:config.base_url+"admission/api/admission_api/getAdmission",
	admission_delete_url:config.base_url+"admission/api/admission_api/deleteAdmission",

	searchTable:"#search_table",
	datatable:"#admission_datatable",
	startDate:"#startDate",
	stopDate:"#stopDate",
};

function numberWithCommas(x) {
	x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function startDatatable(){

	admission_table = $(admissionConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		
		"columns": [
				{"width": "5%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "15%" },


		 ],
		"ajax": {
		"url": admissionConfig.admission_url,
		"data": function ( d ) {
		}
	  }
	});
}

startDatatable();


$(admissionConfig.searchTable).on('keyup change', function () {
	admission_table.search(this.value).draw();
});


$("#del_admission").click(function(){
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
					admission_table.rows(".selected").remove().draw();
					var admission_id = $(this).val();
					
					$.ajax({
						type: 'POST',
						data:{"admission_id":admission_id},
						url: admissionConfig.admission_delete_url,
						success: function(json){
							console.log("json : "+json);
							location.reload();
						}
					});
					
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});

function loadAdmission(filtering){
	$.ajax({
		type: 'POST',
		data:filtering,
		url: admissionConfig.admission_url,
		success: function(json){
			
			var json = JSON.parse(json);

			var sum_weight_total = json.sum_weight_total;

		 	$(".sum_weight_total").empty();
		 	$(".sum_weight_total").text(numberWithCommas(sum_weight_total));

			admission_table.clear();
			for(var i = 0;i<json.data.length;i++){
				admission_table.row.add(json.data[i]);
			}
			admission_table.draw();
		}
	});
}


function loadModal(admission_id){
	$(".modal_container").empty();
	$(".modal_container").load(config.base_url+"admission/edit_admission/"+admission_id,function() {
		$("#myModalEditAdmission").modal("show");
		
	});
}

jQuery('.mydatepicker').datepicker({
	format: 'dd-mm-yyyy',
	language: "th-th",
	todayHighlight: true,
	ignoreReadonly: true
});


function filteringOption(){
	
	var startDate = $(admissionConfig.startDate).val();
	var stopDate = $(admissionConfig.stopDate).val();

	filtering.startDate = startDate;
	filtering.stopDate = stopDate;

	loadAdmission(filtering);
	console.log(filtering);

}

loadAdmission(filtering);