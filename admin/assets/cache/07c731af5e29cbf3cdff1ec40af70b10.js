
var defaultData = new Array();
var filtering = new Object();
var requisition_table;
var requisition_info_table;
var requisition_bills_datatable;
var dataList = new Array();
var dataListinfo = new Array();

var requisitionConfig = {
	requisition_url:config.base_url+"requisition/api/requisition_api/getRequisition/",
	requisition_delete_url:config.base_url+"requisition/api/requisition_api/deleteRequisition",
	requisition_delete_url_info:config.base_url+"requisition/api/requisition_api/deleteRequisitionInfo",
	requisition_stock_url:config.base_url+"requisition/api/requisition_api/getStock",
	requisition_info_url:config.base_url+"requisition/api/requisition_api/getPaymentByID",

	searchTable:"#search_table",
	datatable:"#requisition_datatable",
	datatable_info:"#requisition_info_datatable",
	myModalRequesitionStockCut:"#myModalRequesitionStockCut",
	myModalRequesitionStockCutInfo:"#myModalRequesitionStockCutInfo",
	requisition_bills_datatable:"#requisition_bills_datatable",
	modal_container:"#modal_container",
	modal_container_info:"#modal_container_info",
};

function startDatatable(){
	
	requisition_table = $(requisitionConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "12%" },
				{"width": "10%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "11%" },
				{"width": "10%" },
				{"width": "12%" }
		 ],
		"ajax": {
		"url": requisitionConfig.requisition_url,
		"data": function ( d ) {
		}
	  }
	});

	requisition_info_table = $(requisitionConfig.datatable_info).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "10%" },
				{"width": "30%" },
				{"width": "10%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "15%" }
		 ]
	});
	
	requisition_bills_datatable = $(requisitionConfig.requisition_bills_datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "10%" },
				{"width": "30%" },
				{"width": "10%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "15%" }
		 ]
	});
	
}


$(requisitionConfig.searchTable).on('keyup change', function () {
	requisition_table.search(this.value).draw();
});
$(requisitionConfig.searchTable).on('keyup change', function () {
	requisition_info_table.search(this.value).draw();
});



$("#del_requisition").click(function(){
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
					requisition_table.rows(".selected").remove().draw();
					var requis_id = $(this).val();
					$.ajax({
						type: 'POST',
						data:{"requis_id":requis_id},
						url: requisitionConfig.requisition_delete_url,
						success: function(json){
							
							var json = JSON.parse(json);
							alert(json.success);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});

$("#del_requisition_add").click(function(){
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
					requisition_bills_datatable.rows(".selected").remove().draw();
					dataList.splice(index,1);
					
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});



function loadRequisitionInfo(requisition_uid){
	var data = {'requisition_uid':requisition_uid};
	$.ajax({
		type: 'POST',
		data:data,
		url: requisitionConfig.requisition_info_url,
		success: function(json){
			
			var json = JSON.parse(json);
			requisition_info_table.clear();
			for(var i = 0;i<json.data.length;i++){
				requisition_info_table.row.add(json.data[i]);
			}
			requisition_info_table.draw();
		}
	});
}

function initAutocomplete(){
	if($("#tags").length > 0 ){
		$("#tags").autocomplete({
			source: requisitionConfig.requisition_stock_url,
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
	$(requisitionConfig.modal_container).empty();
	$(requisitionConfig.modal_container).load(config.base_url+"requisition/requisition_url/myModalRequesitionStock/"+uid,function() {
		$(requisitionConfig.myModalRequesitionStockCut).modal("show");
		
	});
}


$("#requisition_frm_submit").submit(function(e){
	var rows = requisition_bills_datatable.rows().count();
	if(rows > 0){	

	}else{
		swal("กรุณาเพิ่มอย่างน้อย 1 รายการ","", "info")
		return false;
	}
	$("#dataList").val(JSON.stringify(dataList));
});




function initAutocompleteInfo(){
	if($("#tagsInfo").length > 0 ){
		$("#tagsInfo").autocomplete({
			source: requisitionConfig.requisition_stock_url,
			select: function (event, ui) {
				var uid = ui.item.uid;
				var label = ui.item.label;
				var description = ui.item.description;
				openAddModalInfo(uid);
				
			}
		}).data("ui-autocomplete")._renderItem = function (ul,item) {
			return $('<li></li>')
			.data("item.autocomplete", item)
			.append('<div href="javascript:void(0)"><div class="row d-flex justify-content-between"><div class="col-md-2"><div class=" pl-3">'+item.label +'</div></div><div class="col-md-8"><div class="mdi mdi-needle">'+item.description+'</div></div><div class="col-md-2"><div class="mdi mdi-plus-circle text-success text-right"></div></div></div></div>')
			.appendTo(ul);
		};
	}
}
function openAddModalInfo(uid){
	
	$(requisitionConfig.modal_container_info).empty();
	$(requisitionConfig.modal_container_info).load(config.base_url+"requisition/requisition_url/myModalRequesitionStockInfo/"+uid,function() {
		
		$(requisitionConfig.myModalRequesitionStockCutInfo).modal("show");
		
	});
}

$("#info_requisition_frm_submit").submit(function(e){
	var rows = requisition_info_table.rows().count();
	if(rows > 0){	

	}else{
		swal("กรุณาเพิ่มอย่างน้อย 1 รายการ","", "info")
		return false;
	}
	$("#dataListinfo").val(JSON.stringify(dataListinfo));
});


$("#del_requisition_info").click(function(){
	var hasItemSelected = false;
	$(".chkDelInfo").each(function(index){
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
			$(".chkDelInfo").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					requisition_info_table.rows(".selected").remove().draw();
					dataListinfo.splice(index,1);
					var payment_id = $(this).val();
					$.ajax({
						type: 'POST',
						data:{"payment_id":payment_id},
						url: requisitionConfig.requisition_delete_url_info,
						success: function(json){
							
							var json = JSON.parse(json);
							alert(json.success);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});




initAutocomplete();
startDatatable();
initAutocompleteInfo();
