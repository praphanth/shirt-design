
var defaultData = new Array();
var filtering = new Object();
var settings_table;

var dataList = new Array();

var settingsConfig = {
	settings_url:config.base_url+"settings/api/settings_api/getsettings",
	settings_delete_url:config.base_url+"settings/api/settings_api/deletesettings",
	settings_info_url:config.base_url+"settings/api/settings_api/getPaymentByID",
	searchTable:"#search_table",
	datatable:"#settings_datatable",
	datatable_info:"#settings_info_datatable",
	hr_container:"#hr_container",
	
};



function loadModal(_method){
	$(settingsConfig.hr_container).empty();
	$(settingsConfig.hr_container).load(config.base_url+"settings/"+_method,function() {
		$("#"+_method).modal("show");
	});
}
function loadModalEdit(user_id){
	$(settingsConfig.hr_container).empty();
	$(settingsConfig.hr_container).load(config.base_url+"settings/myModalEditmember/"+user_id,function() {
		$("#myModalEditmember").modal("show");
	});
}
function startDatatable(){
	settings_table = $(settingsConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', //lrtip
		"columns": [
				{"width": "5%" },
				{"width": "5%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "15%" },
				{"width": "5%" },
				{"width": "10%" },
				{"width": "15%" },
		 ],
		"ajax": {
		"url": settingsConfig.settings_url,
		"data": function ( d ) {
		}
	  }
	});

}

// search data
$(settingsConfig.searchTable).on('keyup change', function () {
	settings_table.search(this.value).draw();
});

// // Delete ข้อมูล
$("#del_member").click(function(){
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
		$(".del_member").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				settings_table.rows(".selected").remove().draw();
				var user_id = $(this).val();
				$.ajax({
					type: 'POST',
					data:{"user_id":user_id},
					url: settingsConfig.settings_delete_url,
					success: function(json){
						console.log(json);
						var json = JSON.parse(json);
						
					}
				});
			}
		});
	});
});

function loadsettingsInfo(settings_uid){
	var data = {'settings_uid':settings_uid};
	$.ajax({
		type: 'POST',
		data:data,
		url: settingsConfig.settings_info_url,
		success: function(json){
			console.log("json : "+json);
			var json = JSON.parse(json);
			settings_info_table.clear();
			for(var i = 0;i<json.data.length;i++){
				settings_info_table.row.add(json.data[i]);
			}
			settings_info_table.draw();
		}
	});
}







// initAutocomplete();
startDatatable();


