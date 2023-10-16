
var defaultData = new Array();
var filtering = new Object();
var valueTime =new Object();
var settings_table;

var dataList = new Array();

var reportConfig = {
	reportTransfer_url:config.base_url+"report/api/report_transfer_api/gettransfer",
	reportTransferdatatable:"#reportTransfer_Table",
};

function startDatatable(){
	if(reportConfig.reportTransferdatatable.length){
		report_table = $(reportConfig.reportTransferdatatable).DataTable({
			"sPaginationType": "full_numbers",
			"dom": ' tpi', 
			"columnDefs": [
					{"width": "5%" },
					{"width": "10%" },
					{"width": "10%" },
					{"width": "10%" },
				 	{"width": "10%" }

			],
			"processing": true,
	        "serverSide": true,
	        'language': {
	            'loadingRecords': '&nbsp;',
	            'processing': 'Loading...'
	        },
	        "ajax": reportConfig.reportTransfer_url
		});
	}
}
startDatatable();

jQuery('.mydatepicker, #datepicker').datepicker({
	format: 'dd/mm/yyyy',
	language: "th-th",
	todayHighlight: true,
	ignoreReadonly: true
});

function filteringOption(){
	var bill_type = $("#bill_type option:selected").val();
	var bill_pay = $("#bill_pay option:selected").val();
	var filter_date = $("#filter_date option:selected").val();
	var expense_type = $("#expense_type option:selected").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();  

	filtering.bill_type = bill_type;
	filtering.bill_pay = bill_pay;
	filtering.startDate = startDate;
	filtering.endDate = endDate;
	filtering.filter_date = filter_date;
	filtering.expense_type = expense_type;
	console.log('BILL EXPENSE:= '+ bill_type +'|| START DATA := '+startDate+'|| END DATA : = '+endDate);

	loadReport(filtering);
}

function loadReport(){
	$.ajax({
		type: 'POST', 
		
		url: reportConfig.report_url,
		success: function(json){
			
			var json = JSON.parse(json);
			console.log(json);
			report_table.clear(); 
		
			for(var i = 0;i<json.data.length;i++){
				
			
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
jQuery(function () {
    jQuery("#selectbox").change(function () {
        location.href = jQuery(this).val();
    })
})

