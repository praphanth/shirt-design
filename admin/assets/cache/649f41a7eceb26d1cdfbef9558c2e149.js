
var defaultData = new Array();
var filtering = new Object();
var receive_table;
var receive_bills_edit_table;
var receive_bills_table;
var receive_info_table;

var dataList = new Array();

var receiveConfig = {
	receive_url:config.base_url+"receive/api/receive_api/getReceive",
	receive_edit_url:config.base_url+"receive/api/receive_api/getIncomingEditList",
	receive_delete_url:config.base_url+"receive/delete_bills",
	receive_delete_list_url:config.base_url+"receive/delete_bills_list",
	
	receive_info_url:config.base_url+"receive/api/receive_api/getIncomingByID",
	receive_stock_url:config.base_url+"receive/api/receive_api/getStock",
	received_stock_bill_type_id:"#received_stock_bill_type_id",
	received_stock_bill_status_id:"#received_stock_bill_status_id",
	searchTable:"#search_table",
	datatable:"#receive_datatable",
	datatable_bills:"#receive_bills_datatable",
	datatable_edit_bills:"#receive_bills_edit_datatable",
	datatable_info:"#receive_info_datatable",
	incoming_date:"#incoming_date",
	myModalAddHisProduct:"#myModalAddHisProduct",
	save_bills_frm:"#save_bills",
	edit_bills_frm:"#edit_bills",
	addNumStock:"#addNumStock",
	modal_container:"#modal_container"
	
};

function startDatatable(){
	receive_table = $(receiveConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "20%"},
				{"width": "10%" },
				{"width": "30%" },
				{"width": "10%" },
				{"width": "10%" }
		 ],
		"ajax": {
		"url": receiveConfig.receive_url,
		"data": function ( d ) {
		  
		}
	  }
	});
	
	receive_bills_edit_table = $(receiveConfig.datatable_edit_bills).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "10%" },
				{"width": "20%" },
				{"width": "5%" },
				{"width": "15%" },
				{"width": "5%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
	
	receive_bills_table = $(receiveConfig.datatable_bills).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "10%" },
				{"width": "20%" },
				{"width": "5%" },
				{"width": "15%" },
				{"width": "5%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
	
	receive_info_table = $(receiveConfig.datatable_info).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "10%" },
				{"width": "20%" },
				{"width": "10%" },
				{"width": "20%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
	
}

$(receiveConfig.searchTable).on('keyup change', function () {
	receive_table.search(this.value).draw();
});



	

function loadReceive(filtering){
	$.ajax({
		type: 'POST',
		data:filtering,
		url: receiveConfig.receive_url,
		success: function(json){
			console.log("json : "+json);
			var json = JSON.parse(json);
			receive_table.clear();
			for(var i = 0;i<json.data.length;i++){
				receive_table.row.add(json.data[i]);
			}
			receive_table.draw();
		}
	});
}

function loadReceiveInfo(received_stock_bill_uid){
	var data = {'received_stock_bill_uid':received_stock_bill_uid};
	$.ajax({
		type: 'POST',
		data:data,
		url: receiveConfig.receive_info_url,
		success: function(json){
			console.log("json : "+json);
			var json = JSON.parse(json);
			receive_info_table.clear();
			for(var i = 0;i<json.data.length;i++){
				receive_info_table.row.add(json.data[i]);
			}
			receive_info_table.draw();
		}
	});
}

function filteringOption(){
	
	var received_stock_bill_type_id = $(receiveConfig.received_stock_bill_type_id).val();
	var received_stock_bill_status_id = $(receiveConfig.received_stock_bill_status_id).val();
	
	filtering.received_stock_bill_type_id = received_stock_bill_type_id;
	filtering.received_stock_bill_status_id = received_stock_bill_status_id;
	
	loadReceive(filtering);
	console.log(received_stock_bill_type_id+" | "+received_stock_bill_status_id);	
}

function onChangeType(){
	var received_stock_bill_type_id = $(receiveConfig.received_stock_bill_type_id).val();
	hideType(received_stock_bill_type_id);
}
function hideType(received_stock_bill_type_id){
	for(i = -1;i<=3;i++){
		if(received_stock_bill_type_id == -1)received_stock_bill_type_id=3;
		if(i == received_stock_bill_type_id){
			$(".type"+i).each(function(){
				$(this).show();						   
			});
		}else{
			$(".type"+i).each(function(){
				$(this).hide();						   
			});
		}
	}
}
hideType(-1);

$(receiveConfig.incoming_date).datepicker({
		format: 'yyyy-m-d',
		language:"th-th",
		todayHighlight:true,
		ignoreReadonly: true
}).datepicker("setDate", new Date());



function initAutocomplete(){
	if($("#tags").length > 0 ){
		$("#tags").autocomplete({
			source: receiveConfig.receive_stock_url,
			select: function (event, ui) {
				var uid = ui.item.uid;
				var label = ui.item.label;
				var description = ui.item.description;
				openAddModal(uid);
			}
		}).data("ui-autocomplete")._renderItem = function (ul,item) {
			return $('<li></li>')
			.data("item.autocomplete", item)
			.append('<div href="javascript:void(0)"><div class="row d-flex justify-content-between"><div class="col-md-2"><div class=" pl-3">'+item.label +'</div></div><div class="col-md-8"><div class="mdi mdi-needle">'+item.description+'</div></div><div class="col-md-2"><div class="mdi mdi-plus-circle text-success text-right"></div></div></div></div>')
			.appendTo(ul);
		};
	}
}

function openAddModal(uid){
	$(receiveConfig.modal_container).empty();
	$(receiveConfig.modal_container).load(config.base_url+"receive/receive_url/myModalStockCut/"+uid,function() {
		$(receiveConfig.myModalAddHisProduct).modal("show");
	});
	
}

$(receiveConfig.save_bills_frm).submit(function(event) {
	
	
	var rows = receive_bills_table.rows().count();
	if(rows > 0){
		
	}else{
		swal("กรุณาเพิ่มอย่างน้อย 1 รายการ","", "info")
		return false;
	}
	
	$("#dataList").val(JSON.stringify(dataList));
});

$(receiveConfig.edit_bills_frm).submit(function(event) {
	
	var rows = receive_bills_edit_table.rows().count();
	if(rows > 0){
		
	}else{
		swal("กรุณาเพิ่มอย่างน้อย 1 รายการ","", "info")
		return false;
	}
	console.log(dataList);
	
	$("#dataList").val(JSON.stringify(dataList));
});


$("#btn_del").click(function(){
	var hasItemSelected = false;
	$(".checkitem").each(function(index){
		if($(this).prop('checked')){
			hasItemSelected = true;
		}
	});
	console.log("hasItemSelected : "+hasItemSelected);
	if(!hasItemSelected){
		swal("กรุณาเลือกอย่างน้อย 1 รายการ","", "info")
		return false;
	}
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
		$(".checkitem").each(function(index){
			if($(this).prop('checked')){
				console.log(dataList);
				dataList.splice(index, 1);
				$(this).parent().parent().addClass("selected");
				receive_bills_table.rows(".selected").remove().draw();
				
				var incoming_id = $(this).attr("incoming_id")
				$.ajax({
					type: 'POST',
					data:{"incoming_id":incoming_id},
					url: receiveConfig.receive_delete_list_url,
					success: function(json){
						console.log("json : "+json);
					}
				});
				
			}
		});
	});
	
	
	
});

$("#btn_del_edit").click(function(){
	var hasItemSelected = false;
	$(".checkitem").each(function(index){
		if($(this).prop('checked')){
			hasItemSelected = true;
		}
	});
	console.log("hasItemSelected : "+hasItemSelected);
	if(!hasItemSelected){
		swal("กรุณาเลือกอย่างน้อย 1 รายการ","", "info")
		return false;
	}
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
		$(".checkitem").each(function(index){
			if($(this).prop('checked')){
				dataList.splice(index, 1);
				$(this).parent().parent().addClass("selected");
				receive_bills_edit_table.rows(".selected").remove().draw();
				
				var incoming_id = $(this).attr("incoming_id")
				$.ajax({
					type: 'POST',
					data:{"incoming_id":incoming_id},
					url: receiveConfig.receive_delete_list_url,
					success: function(json){
						console.log("json : "+json);
					}
				});
				
			}
		});
	});
	
});


$("#del_receive").click(function(){
	var hasItemSelected = false;
	$(".checkreceive").each(function(index){
		if($(this).prop('checked')){
			hasItemSelected = true;
		}
	});
	console.log("hasItemSelected : "+hasItemSelected);
	if(!hasItemSelected){
		swal("กรุณาเลือกอย่างน้อย 1 รายการ","", "info")
		return false;
	}
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
		$(".checkreceive").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				receive_table.rows(".selected").remove().draw();
				var received_stock_bill_uid = $(this).attr("received_stock_bill_uid")
				$.ajax({
					type: 'POST',
					data:{"received_stock_bill_uid":received_stock_bill_uid},
					url: receiveConfig.receive_delete_url,
					success: function(json){
						console.log("json : "+json);
					}
				});
			}
		});
	});
});

initAutocomplete();
startDatatable();


