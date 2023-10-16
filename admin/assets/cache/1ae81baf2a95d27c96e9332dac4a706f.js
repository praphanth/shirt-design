
var order_table;
var filtering = new Object();
var orderConfig = {
	isShowContextMenu:false,
	order_url:config.base_url+"order/api/order_api/getOrder",
	order_view_url:config.base_url+"order/api/order_api/getOrderView",
	order_delete_url:config.base_url+"order/api/order_api/deleteOrder",

	searchTable:"#search_table",
	datatable:"#order_datatable",
	startDate:"#startDate",
	stopDate:"#stopDate",
};

function numberWithCommas(x) {
	x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function startDatatable(){

	order_table = $(orderConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		
		"columns": [
				{"width": "5%" },
				{"width": "14%" },
				{"width": "12%" },
				{"width": "12%" },
				{"width": "12%" },
				{"width": "12%" },
				{"width": "8%" },
				{"width": "15%" },
				{"width": "10%" },

		 ],
		"ajax": {
		"url": orderConfig.order_url,
		"data": function ( d ) {
		}
	  }
	});
}

startDatatable();


$(orderConfig.searchTable).on('keyup change', function () {
	order_table.search(this.value).draw();
});


$("#del_order").click(function(){
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
					order_table.rows(".selected").remove().draw();
					var order_id = $(this).attr("order_id");
					$.ajax({
						type: 'POST',
						data:{"order_id":order_id},
						url: orderConfig.order_delete_url,
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

function loadOrder(filtering){
	$.ajax({
		type: 'POST',
		data:filtering,
		url: orderConfig.order_url,
		success: function(json){
			
			var json = JSON.parse(json);

			var pe_sum = json.pe_sum;
		 	var total_weight_sum = json.total_weight_sum;
		 	var jumbo_bag_sum = json.jumbo_bag_sum;

		 	$(".pe_sum").empty();
		 	$(".pe_sum").text(numberWithCommas(pe_sum));

		 	$(".total_weight_sum").empty();
		 	$(".total_weight_sum").text(numberWithCommas(total_weight_sum));	

		 	$(".jumbo_bag_sum").empty();
		 	$(".jumbo_bag_sum").text(numberWithCommas(jumbo_bag_sum));

			order_table.clear();
			for(var i = 0;i<json.data.length;i++){
				order_table.row.add(json.data[i]);
			}
			order_table.draw();
		}
	});
}


function loadModal(order_id){
	$(".modal_container").empty();
	$(".modal_container").load(config.base_url+"order/edit_order/"+order_id,function() {
		$("#myModalEditOrder").modal("show");
		
	});
}

jQuery('.mydatepicker').datepicker({
	format: 'dd-mm-yyyy',
	language: "th-th",
	todayHighlight: true,
	ignoreReadonly: true
});


function filteringOption(){
	
	var startDate = $(orderConfig.startDate).val();
	var stopDate = $(orderConfig.stopDate).val();
	
	filtering.startDate = startDate;
	filtering.stopDate = stopDate;

	loadOrder(filtering);
	console.log(filtering);

}

loadOrder(filtering);