
var defaultData = new Array();
var filtering = new Object();
var valueTime =new Object();
var settings_table;

var dataList = new Array();

var billConfig = {
	bill_url:config.base_url+"bill/api/bill_api/getBillByID",
	datatable:"#table_bill"
	
};

function startDatatable(){
	bill_table = $(billConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"order": [[ 0, "desc" ]],
		"columns": [
				{"width": "5%" },
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
$(".hide_id").hide(); 
$("#startDate").hide(); 
$("#endDate").hide();

loadBill(filtering);
jQuery('.mydatepicker, #datepicker').datepicker({
	format: 'yyyy-m-d',
	language:"th-th",
	todayHighlight:true,
	ignoreReadonly: true
});

function filteringOption(){
	var bill_type = $("#bill_type option:selected").val();
	var bill_pay = $("#bill_pay option:selected").val();
	var filter_date = $("#filter_date option:selected").val();
	var expense_type = $("#expense_type option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();  

	
	if (filter_date == "duration") {
	$(".hide_id").show();
	$("#startDate").show();
	$("#endDate").show();
	}
	else {
	$(".hide_id").hide();
	$("#startDate").hide();
	$("#endDate").hide();
	}

	filtering.bill_type = bill_type;
	filtering.bill_pay = bill_pay;
	filtering.startDate = startDate;
	filtering.endDate = endDate;
	filtering.filter_date = filter_date;
	filtering.expense_type = expense_type;
	console.log('BILL EXPENSE:= '+ bill_type +'|| START DATA := '+startDate+'|| END DATA : = '+endDate);

	loadBill(filtering);
}
$("#search_table").on('keyup change', function () {
	bill_table.search(this.value).draw();
	
});
function delete_hide() {
	$("#startDate").val(null);
	$("#endDate").val(null);
}
function loadBill(filtering){
	

	var net_total = 0;
	var deposit = 0;
	$.ajax({
		type: 'POST', 
		data:filtering, 
		url: billConfig.bill_url,
		success: function(json){
			var json = JSON.parse(json);
			console.log(json);
			bill_table.clear(); 
		
			$("#depositSum").text(deposit);
			$("#net_total").text(deposit);
			for(var i = 0;i<json.data.length;i++){
				
				deposit += parseInt(json.data[i][4]);
				net_total += parseInt(json.data[i][3]);

				$("#depositSum").text(number_format(deposit));
				$("#net_total").text(number_format(net_total));

				bill_table.row.add(json.data[i]); 
			}
			bill_table.draw();
		}
	});
}

function number_format(currency) 
{
	return currency.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
	startDatatable();
