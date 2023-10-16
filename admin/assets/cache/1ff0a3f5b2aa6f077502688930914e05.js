
var defaultData = new Array();
var filtering = new Object();
var valueTime =new Object();
var settings_table;

var dataList = new Array();

var reportConfig = {
	report_url:config.base_url+"report/api/report_api/getReceive",
	datatable:"#receive_Table"
};

function startDatatable(){
	report_table = $(reportConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
			 	{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
				
		 ]
	});
}
startDatatable();

jQuery('.mydatepicker, #datepicker').datepicker({
	format: 'dd-mm-yyyy',
	language: "th-th",
	todayHighlight: true,
	ignoreReadonly: true
});

function filteringOption(){

	var type_id = $("#type_id option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();  

	var all_start_Date = "";
	var all_end_Date = "";

	var arr_start_Date = startDate.split("-");
	var arr_end_Date = endDate.split("-");
	
	if(startDate != "" || endDate != "")
	{
		all_start_Date = arr_start_Date[2] + "-" + arr_start_Date[1] + "-" + arr_start_Date[0];
		all_end_Date = arr_end_Date[2] + "-" + arr_end_Date[1] + "-" + arr_end_Date[0]; 
	}
	


	filtering.type_id = type_id;
	filtering.startDate = all_start_Date;
	filtering.endDate = all_end_Date;

	
	console.log('all_start_Date = ' + all_start_Date);
	loadReport(filtering);
}


function loadReport(filtering){


	var item_number =  0;
	
	$.ajax({
		type: 'POST', 
		data:filtering, 
		url: reportConfig.report_url,
		success: function(json){
			
			var json = JSON.parse(json);
			console.log(json);
			report_table.clear(); 

		
			$("#item_number").text(item_number);

			for(var i = 0;i<json.data.length;i++)
			{
		
				item_number = json.data.length;
				$("#item_number").text(number_format(item_number,2));
				 
			
				report_table.row.add(json.data[i]); 
			}
		
			report_table.draw();
		}
	});
}

function number_format(currency) 
{
	return currency.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

loadReport();
jQuery(function () {
    jQuery("#selectbox").change(function () {
        location.href = jQuery(this).val();
    })
})