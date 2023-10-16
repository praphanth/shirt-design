
var defaultData = new Array();
var filtering = new Object();
var valueTime = new Object();
var settings_table;

var dataList = new Array();

var appointmentConfig = {
	appointment_url: config.base_url + "appointment/api/appointment_api/getAppointmentByID",
	delete_time_url: config.base_url + "appointment/api/appointment_api/delete_time",
	modal_appointment_url: config.base_url + "appointment/api/appointment_api/modal_appointment/",
	appointment_delete_url: config.base_url + "appointment/api/appointment_api/delete_appointment_list", 
	appointment_saveContent_url: config.base_url + "appointment/api/appointment_api/saveContent", 
	appointment_save_url: config.base_url + "appointment/save",
	datatable: "#table_appointment" 


};

function startDatatable() {
	appointment_table = $(appointmentConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
			{ "width": "5%" },
			{ "width": "10%" },
			{ "width": "10%" },
			{ "width": "10%" },
			
			{ "width": "10%" },
			{ "width": "10%" },
			{ "width": "10%" },
			{ "width": "10%" }
		]
		
		
		
		
		
	});

}


function loadAppointment(filtering) {
	$.ajax({
		type: 'POST',
		data: filtering, 
		url: appointmentConfig.appointment_url,
		success: function (json) {
			
			var json = JSON.parse(json);
			console.log(json);
			appointment_table.clear(); 
			for (var i = 0; i < json.data.length; i++) {
				appointment_table.row.add(json.data[i]); 
			}

			appointment_table.draw();
		}
	});
}

function loadModal(uid) {

	$("#modal_container").empty();
	$("#modal_container").load(appointmentConfig.modal_appointment_url + uid, function () {
		$('#bs-example-modal').modal("show");
	});
}

$("#btn_del_appointment").click(function () { 
	swal({
		title: "แน่ใจหรือ ?",
		text: "ท่านแน่ใจหรือว่าต้องการลบข้อมูล !",
		type: "warning",
		showCancelButton: true,
		cancelButtonText: "ยกเลิก",
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "ไช่, ต้องการลบ !",
		closeOnConfirm: true
	}, function () {
		$(".del_appointment").each(function (index) {

			if ($(this).prop('checked')) {
				$(this).parent().parent().addClass("selected");
				appointment_table.rows(".selected").remove().draw();
				var appointment_uid = $(this).val();


				$.ajax({
					type: 'POST',
					data: { "appointment_uid": appointment_uid },  
					url: appointmentConfig.appointment_delete_url, 
					success: function (json) {
						console.log("json : " + json);
					}
				});
			}
		});
	});
});


function saveContent() {
	var dataObj = new Object();
	var formdata = $("#appointment_frm").serializeArray();
	$(formdata).each(function (i, field) {
		dataObj[field.name] = field.value;
		console.log(field.name + " | " + field.value);
	});
	

	$.ajax({
		type: 'POST',
		data: dataObj,  
		url: appointmentConfig.appointment_saveContent_url,
		success: function (json) {
			console.log(json);
			swal("สำเร็จ","บันทึกข้อมูลสำเร็จแล้ว","info");
		}
	});
}




$("#search_table").on('keyup change', function () {
	appointment_table.search(this.value).draw();

});


$(".hide_id").hide();
$("#startDate").hide();
$("#endDate").hide();

function delete_hide() {
	$("#startDate").val(null);
	$("#endDate").val(null);
}
filteringOption();
function filteringOption() {
	var specific_doctor_id = $("#specific_doctor_id").val();
	var appointment_status_id = $("#appointment_status_id option:selected").val();
	var appointment_user_id = $("#appointment_user_id option:selected").val();
	var filter_date = $("#filter_date option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();  

	var arr_start_Date = startDate.split("-");
	var all_start_Date = arr_start_Date[2] + "-" + arr_start_Date[1] + "-" + arr_start_Date[0];

	var arr_end_Date = endDate.split("-");
	var all_end_Date = arr_end_Date[2] + "-" + arr_end_Date[1] + "-" + arr_end_Date[0];

	if (filter_date == "between_date") {
		$(".hide_id").show();
		$("#startDate").show();
		$("#endDate").show();
	}
	else {
		$(".hide_id").hide();
		$("#startDate").hide();
		$("#endDate").hide();
	}

	filtering.appointment_user_id = appointment_user_id;  
	
	filtering.appointment_status = appointment_status_id;
	filtering.filter_date = filter_date;
	filtering.startDate = all_start_Date;
	filtering.endDate = all_end_Date;
	filtering.specific_doctor_id = specific_doctor_id;
	
	console.log("xxxx : " + appointment_user_id + " | " + filter_date + " | " + all_start_Date + " | " + all_end_Date + " | " + specific_doctor_id);
	loadAppointment(filtering);
}


jQuery('.mydatepicker, #datepicker').datepicker({
	format: 'dd-mm-yyyy',
	language: "th-th",
	todayHighlight: true,
	ignoreReadonly: true
});



startDatatable();

