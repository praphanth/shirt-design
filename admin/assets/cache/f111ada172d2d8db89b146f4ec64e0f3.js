
var defaultData = new Array();
var filtering = new Object();
var valueTime =new Object();
var settings_table;

var dataList = new Array();

var reportConfig = {
	report_url:config.base_url+"report/api/report_api/getRemaining",
	datatable:"#left_in_stock_Table",

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

function remainingFilteringOption(){

	var warehouses = $("#warehouses option:selected").val();
	var stock_type = $("#stock_type option:selected").val();
	var stock_status = $("#stock_status option:selected").val();
	var stock_price_type = $("#stock_price_type option:selected").val();


	filtering.warehouses = warehouses;
	filtering.stock_type = stock_type;
	filtering.stock_status = stock_status;
	filtering.stock_price_type = stock_price_type; 

	console.log('warehouses = ' + warehouses + ':' + 'stock_type = ' + stock_type + 'stock_status = ' + stock_status + 'stock_price_type = '+ stock_price_type);

	loadReport(filtering);
}


function loadReport(filtering){

	var deposit = 0;
	var item_number =  0;
	
	$.ajax({
		type: 'POST', 
		data:filtering, 
		url: reportConfig.report_url,
		success: function(json){
			
			var json = JSON.parse(json);
			console.log(json);
			report_table.clear(); 

			$("#depositSum").text(deposit);
			$("#item_number").text(item_number);

			for(var i = 0;i<json.data.length;i++)
			{
				deposit += parseInt(json.data[i][5]);
				item_number = json.data.length;
				
				$("#item_number").text(number_format(item_number,2));
				$("#depositSum").text(number_format(deposit,2));
			
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