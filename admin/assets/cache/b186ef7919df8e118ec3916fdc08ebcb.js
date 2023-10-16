











var defaultData = new Array();
var filtering = new Object();
filtering.expensed_stock_bill_type_id = "";
filtering.expensed_stock_bill_status_id = "";
filtering.typeTime = "";
filtering.startDate = "";
filtering.stopDate = "";
				
var filteringSlip = new Object();
var expense_table;
var expense_slip_table;
var expense_info_table;


var expense_modals_table;
var expense_payment_table;
var expense_billHis_table;
var expense_appointment_table;
var expense_bills_edit_table;
var expense_bills_table;


var dataList = new Array();

var expenseConfig = {
	
	expense_url:config.base_url+"expense/api/expense_api/getExpense",
	sum_expense_url:config.base_url+"expense/api/expense_api/getSumExpense",
	expense_slip_url:config.base_url+"expense/api/Expense_api/getExpenseSlip",
	sum_expense_slip_url:config.base_url+"expense/api/expense_api/getSumExpenseSlip",
	expense_info_url:config.base_url+"expense/api/expense_api/getExpenseByID",
	expense_modals_url:config.base_url+"expense/api/expense_api/getExpenseModalsByID",
	expense_payment_url:config.base_url+"expense/api/expense_api/getExpensePaymentByID",
	expense_billHis_url:config.base_url+"expense/api/expense_api/getBillHistory",
	expense_appointment_url:config.base_url+"expense/api/expense_api/getExpenseAppointment",
	expense_edit_url:config.base_url+"expense/api/expense_api/getIncomingEditList",
	expense_delete_url:config.base_url+"expense/api/expense_api/deleteExpensebills",
	expense_delete_slip_url:config.base_url+"expense/api/expense_api/deleteExpenseSlip",
	expense_delete_info_url:config.base_url+"expense/api/expense_api/deleteExpenseInfobills",
	expensed_stock_bill_type_id:"#expensed_stock_bill_type_id",
	expensed_stock_bill_status_id:"#expensed_stock_bill_status_id",
	expense_stock_url:config.base_url+"expense/api/expense_api/getStock",
	modal_appointment_url: config.base_url + "appointment/api/appointment_api/modal_appointment/",

	typeTime:"#typeTime",
	startDate:"#startDate",
	stopDate:"#stopDate",
	searchTable:"#search_table",
	searchSlipTable:"#search_slip_table",
	datatable:"#expense_datatable",
	datatable_slip:"#expense_slip_datatable",
	datatable_info:"#expense_info_datatable",
	datatable_modals:"#expense_modals_datatable",
	datatable_payment:"#expense_payment_datatable",
	datatable_billHis:"#expense_billHis_datatable",
	datatable_appointment:"#expense_appointment_datatable",
	modal_container:"#modal_container",
	modal_container_createxpens:"#modal_container_createxpens",
	myModalExpenseStockCut:"#myModalExpenseStockCut",
	typeTimeInfo:"#typeTimeInfo",
	
};

function numberWithCommas(x) {
	x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function startDatatable(){
	expense_table = $(expenseConfig.datatable).DataTable({
		"paging":true,
		"sPaginationType": "full_numbers",
		"pageLength": 25,
		"dom": ' tpi', 
		"order":[[0,"DESC"]],
		"columns": [
				{"width": "5%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
		 ],
        "serverSide": true,
		
        "ajax": {
			"url": expenseConfig.expense_url,
			"type": "POST",
			"data": function (d) {
				d.expensed_stock_bill_type_id = filtering.expensed_stock_bill_type_id;
				d.expensed_stock_bill_status_id = filtering.expensed_stock_bill_status_id;
				d.typeTime = filtering.typeTime;
				d.startDate = filtering.startDate;
				d.stopDate = filtering.stopDate;
				d.length = 25;
				
			}
		  },
		 "drawCallback":function(data){
		 	console.log(data);
			loadExpenseSum(filtering);
		 },


	});

	expense_info_table = $(expenseConfig.datatable_info).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
				{"width": "8%" },
		 ]
	});
	

	expense_billHis_table = $(expenseConfig.datatable_billHis).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "15%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "20%" },
				{"width": "10%" },
				{"width": "10%" },

		 ]
	});

	expense_appointment_table = $(expenseConfig.datatable_appointment).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "25%" },

		 ]
	});

}
function startDatatableModals(){
	expense_modals_table = $(expenseConfig.datatable_modals).DataTable({
			"sPaginationType": "full_numbers",
			"dom": ' tpi', 
			"columns": [
					{"width": "20%" },
					{"width": "20%" },
					{"width": "20%" },
					{"width": "20%" },
					{"width": "20%" },
			 ]
		});
}

function startDatatablePayment(){
	expense_payment_table = $(expenseConfig.datatable_payment).DataTable({
			"sPaginationType": "full_numbers",
			"dom": ' tpi', 
			"columns": [
					{"width": "5%" },
					{"width": "15%" },
					{"width": "15%" },
					{"width": "15%" },
					{"width": "15%" },
					{"width": "15%" },
					{"width": "15%" },
					{"width": "15%" },
			 ]
		});
}

function startDatatableSlip(){
	expense_slip_table = $(expenseConfig.datatable_slip).DataTable({
		"paging":true,
		"sPaginationType": "full_numbers",
		"pageLength": 25,
		"dom": ' tpi', 
		"order":[[0,"DESC"]],
		"columns": [
				{"width": "5%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
		 ],
        "serverSide": true,
		
        "ajax": {
			"url": expenseConfig.expense_slip_url,
			"type": "POST",
			"data": function (d) {
				d.expensed_stock_bill_type_id = filtering.expensed_stock_bill_type_id;
				d.expensed_stock_bill_status_id = filtering.expensed_stock_bill_status_id;
				d.typeTime = filtering.typeTime;
				d.startDate = filtering.startDate;
				d.stopDate = filtering.stopDate;
				d.length = 25;
				console.log(d);
			}
		  },
		 "drawCallback":function(data){
			 console.log("loaded");
			 loadExpenseSumSlip(filtering)
		 },


	});

	
}


$(expenseConfig.searchTable).on('keyup change', function () {
	expense_table.search(this.value).draw();
});
$(expenseConfig.searchTable).on('keyup change', function () {
	expense_info_table.search(this.value).draw();
});
$(expenseConfig.searchSlipTable).on('keyup change', function () {
	expense_slip_table.search(this.value).draw();
});


function loadExpense(filtering){
	 
	expense_table.ajax.reload();
	
	
}

function loadExpenseSlip(filtering){
	 
	expense_slip_table.ajax.reload();
	
	
	
	
}


function loadExpenseSumSlip(filtering){
	$.ajax({
		type: 'POST',
		data:filtering,
		url: expenseConfig.sum_expense_slip_url,
		success: function(json){
			
			var json = JSON.parse(json);
			
		 	var expense_total_net_price_sum = json.expense_total_net_price_sum;
		 	var expense_total_deposit_remaining_sum = json.expense_total_deposit_remaining_sum;
		 	var expense_total_remaining_sum = json.expense_total_remaining_sum;

		 	$(".expense_total_net_price_sum").empty();
		 	$(".expense_total_net_price_sum").text(numberWithCommas(expense_total_net_price_sum));

		 	$(".expense_total_deposit_remaining_sum").empty();
		 	$(".expense_total_deposit_remaining_sum").text(numberWithCommas(expense_total_deposit_remaining_sum));	

		 	$(".expense_total_remaining_sum").empty();
		 	$(".expense_total_remaining_sum").text(numberWithCommas(expense_total_remaining_sum));


		 	

		}
	});
}






function loadExpenseSum(filtering){
	$.ajax({
		type: 'POST',
		data:filtering,
		url: expenseConfig.sum_expense_url,
		success: function(json){
			
			var json = JSON.parse(json);
			
		 	var expense_total_net_price_sum = json.expense_total_net_price_sum;
		 	var expense_total_deposit_remaining_sum = json.expense_total_deposit_remaining_sum;
		 	var expense_total_remaining_sum = json.expense_total_remaining_sum;

		 	$(".expense_total_net_price_sum").empty();
		 	$(".expense_total_net_price_sum").text(numberWithCommas(expense_total_net_price_sum));

		 	$(".expense_total_deposit_remaining_sum").empty();
		 	$(".expense_total_deposit_remaining_sum").text(numberWithCommas(expense_total_deposit_remaining_sum));	

		 	$(".expense_total_remaining_sum").empty();
		 	$(".expense_total_remaining_sum").text(numberWithCommas(expense_total_remaining_sum));


		 	

		}
	});
}




function filteringOption(){
	
	var expensed_stock_bill_type_id = $(expenseConfig.expensed_stock_bill_type_id).val();
	var expensed_stock_bill_status_id = $(expenseConfig.expensed_stock_bill_status_id).val();
	var typeTime = $(expenseConfig.typeTime).val();
	var startDate = $(expenseConfig.startDate).val();
	var stopDate = $(expenseConfig.stopDate).val();
	
	filtering.expensed_stock_bill_type_id = expensed_stock_bill_type_id;
	filtering.expensed_stock_bill_status_id = expensed_stock_bill_status_id;
	filtering.typeTime = typeTime;
	filtering.startDate = startDate;
	filtering.stopDate = stopDate;

	
	loadExpense(filtering);
	

	
	
}


function filteringOptionSlip(){
	
	var expensed_stock_bill_type_id = $(expenseConfig.expensed_stock_bill_type_id).val();
	var expensed_stock_bill_status_id = $(expenseConfig.expensed_stock_bill_status_id).val();
	var typeTime = $(expenseConfig.typeTime).val();
	var startDate = $(expenseConfig.startDate).val();
	var stopDate = $(expenseConfig.stopDate).val();
	
	filtering.expensed_stock_bill_type_id = expensed_stock_bill_type_id;
	filtering.expensed_stock_bill_status_id = expensed_stock_bill_status_id;
	filtering.typeTime = typeTime;
	filtering.startDate = startDate;
	filtering.stopDate = stopDate;

	

	loadExpenseSlip(filtering);
	
	
}



function onChangeType(){
	var expensed_stock_bill_type_id = $(expenseConfig.expensed_stock_bill_type_id).val();
	hideType(expensed_stock_bill_type_id);
}
function hideType(expensed_stock_bill_type_id){
	for(i = -1;i<=3;i++){
		if(expensed_stock_bill_type_id == -1)expensed_stock_bill_type_id=3;
		if(i == expensed_stock_bill_type_id){
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



$("#del_expense").click(function(){
	var hasItemSelected = false;
	$(".checkexpense").each(function(index){
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
			$(".checkexpense").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					expense_table.rows(".selected").remove().draw();
					var expense_uid = $(this).attr("expense_uid");
					
					$.ajax({
						type: 'POST',
						data:{"expense_uid":expense_uid},
						url: expenseConfig.expense_delete_url,
						success: function(json){
							console.log("json : "+json);
						}
					});
					
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});



$("#del_slip_expense").click(function(){
	var hasItemSelected = false;
	$(".checkexpense").each(function(index){
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
			$(".checkexpense").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					expense_slip_table.rows(".selected").remove().draw();
					var expense_uid = $(this).attr("expense_uid");
					
					$.ajax({
						type: 'POST',
						data:{"expense_uid":expense_uid},
						url: expenseConfig.expense_delete_slip_url,
						success: function(json){
							console.log("json : "+json);
						}
					});
					
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});


$("#del_list_expense").click(function(){
	var hasItemSelected = false;
	var num_of_delete = 0;
	var num = 0;
	$(".checkexpenseInfo").each(function(index){
		if($(this).prop('checked')){
			hasItemSelected = true;
			num_of_delete++;
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
			$(".checkexpenseInfo").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					expense_info_table.rows(".selected").remove().draw();
					var payment_id = $(this).attr("payment_id");
					$.ajax({
						type: 'POST',
						data:{"payment_id":payment_id},
						url: expenseConfig.expense_delete_info_url,
						success: function(json){
							console.log("json : "+json);
						}
					});

					$.ajax({
						type: 'POST',
						data:{
							"payment_id":payment_id,
							"expense_uid":expense_uid,
						},
						url: config.base_url+"expense/setPriceWhenDeleted",
						success: function(json){
							console.log("json : "+json);
							num++;
							if(num >= num_of_delete){
								window.location = config.base_url+"expense/BillopdAdd/"+expense_uid;
							}
						}
					});

					
					
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
});


function loadExpenseInfo(expense_uid,typeTimeInfo = 0){
	 
	 
	var data = {'expense_uid':expense_uid,'typeTimeInfo':typeTimeInfo};
	$.ajax({
		type: 'POST',
		data:data,
		url: expenseConfig.expense_info_url,
		success: function(json){
			
			var json = JSON.parse(json);
			
			 if(json.data){
				var sumTotal_price = json.sumTotal_price.toFixed(2);
				var sumTotal_price_n = json.sumTotal_price;
				var sumTotal_price_by_status = json.sumTotal_price_by_status;
				expense_info_table.clear();
				for(var i = 0;i<json.data.length;i++){
					expense_info_table.row.add(json.data[i]);
				}
				expense_info_table.draw();
				$(".sumTotal_price").empty();
				$(".sumTotal_price").append(sumTotal_price);

				$(".sumTotal_price_n").empty();
				$(".sumTotal_price_n").append(sumTotal_price_n);

				$(".sumTotal_price_by_status").empty();
				$(".sumTotal_price_by_status").text(sumTotal_price_by_status);
				sumpriceExpense();
				disBtnPay();
				disBtnPayConfirme();
			}


		}
	});
}


function filteringOptionInfo(){
	
	var typeTimeInfo = $(expenseConfig.typeTimeInfo).val();
	filtering.typeTimeInfo = typeTimeInfo;
	
	
	
	loadExpenseInfo(expense_uid,typeTimeInfo);

}



function loadExpenseBill(expense_uid){
	var data = {'expense_uid':expense_uid};
	
	
	

	$.ajax({
		type: 'POST',
		data:data,
		url: expenseConfig.expense_billHis_url,
		success: function(json){
			
			var json = JSON.parse(json);
			if(json.data.length){
				var paid_price = json.paid_price.toFixed(2);
				var deposit_used_price = json.deposit_used_price.toFixed(2);

				expense_billHis_table.clear();
				for(var i = 0;i<json.data.length;i++){
					expense_billHis_table.row.add(json.data[i]);
				}
				expense_billHis_table.draw();
				
				$(".paid_price").empty();
				$(".deposit_used_price").empty();
				$(".paid_price").append(paid_price);
				$(".deposit_used_price").append(deposit_used_price);
				
			}
		}
	});
}

function loadExpenseAppointment(pet_uid){
	var data = {'pet_uid':pet_uid};
	
	$.ajax({
		type: 'POST',
		data:data,
		url: expenseConfig.expense_appointment_url,
		success: function(json){
			
			var json = JSON.parse(json);
			expense_appointment_table.clear();
			for(var i = 0;i<json.data.length;i++){
				expense_appointment_table.row.add(json.data[i]);
			}
			expense_appointment_table.draw();
		}
	});
}



function initAutocomplete(expense_uid){
	
	if($("#tags").length > 0){
		$("#tags").autocomplete({
			source: expenseConfig.expense_stock_url,
			select: function (event, ui) {
				var uid = ui.item.uid;
				var label = ui.item.label;
				var description = ui.item.description;
				var stock_type_id = ui.item.stock_type_id;
				
				openAddModal(uid,expense_uid);
				
			},
		 
	  
	  
	  
   
		}).data("ui-autocomplete")._renderItem = function (ul,item) {
			return $('<li class="filters filter-category-'+item.stock_type_id+'"></li>')
	        .data("item.autocomplete", item)
	        .append('<div href="javascript:void(0)"><div class="row d-flex justify-content-between"><div class="col-md-2"><div class="pl-3">'+item.label +'</div></div><div class="col-md-8"><div class="mdi mdi-needle">'+item.description+'</div></div><div class="col-md-2"><div class="mdi mdi-plus-circle text-success text-right"></div></div></div></div>')
	        .appendTo(ul);
		};
	}
}
$("div").click(function() {
        $("ul.ui-autocomplete").hide();
});
function openAddModal(uid,expense_uid){
	$(expenseConfig.modal_container).empty();
	$(expenseConfig.modal_container).load(config.base_url+"expense/expense_url/myModalExpenseStock/"+uid+"/"+expense_uid,function() {
		$(expenseConfig.myModalExpenseStockCut).modal("show");
		
	});
}


function filterTypesStock(){
    $("ul.ui-autocomplete").show();
    var re = new RegExp($(".filters:checkbox:checked").map(function() {
                          return this.value;
                      }).get().join("|") );

    $("li.filters").each(function() {
        var $this = $(this);
        if(re.source!= "(?:)" && re.test($this.attr("class"))){
            $this.addClass('show');
            $this.removeClass('hide');
        }else{
            $this.addClass('hide');
            $this.removeClass('show');
        }
    });
}


function loadExpenseModals(admit_history_id){
	var data = {'admit_history_id':admit_history_id};
	
	$.ajax({
		type: 'POST',
		data:data,
		url: expenseConfig.expense_modals_url,
		success: function(json){
			
			var json = JSON.parse(json);
			expense_modals_table.clear();
			for(var i = 0;i<json.data.length;i++){
				
				expense_modals_table.row.add(json.data[i]);
			}
			expense_modals_table.draw();
		}
	});
}



function loadExpensePayment(expense_uid){
	var data = {'expense_uid':expense_uid};
	
	$.ajax({
		type: 'POST',
		data:data,
		url: expenseConfig.expense_payment_url,
		success: function(json){
			
			var json = JSON.parse(json);
			expense_payment_table.clear();
			for(var i = 0;i<json.data.length;i++){
				
				expense_payment_table.row.add(json.data[i]);
			}
			expense_payment_table.draw();

			var payment_id_list_paid = [];
			$(".checkpay").each(function(index){
				var payment_id = $(this).attr("payment_id");
				payment_id_list_paid.push(payment_id);
			});
			$("#payment_id_list_paid").val(payment_id_list_paid.toString());


		}
	});
}



function loadModal(admit_history_id){
	
	var modal_admit = $("#modal_admit");
	modal_admit.empty();
	var link = config.base_url+"expense/api/expense_api/admitCheck/"+admit_history_id;
	modal_admit.load(link,function() {
		$("#myModalAdmitImport").modal("show");
	});
}


function loadModalDrug(expense_uid){
	$(".modal_labelDrug").empty();
	$(".modal_labelDrug").load(config.base_url+"expense/api/expense_api/labelDrug/"+expense_uid,function() {
		$("#myModalLabelDrug").modal("show");
		
		
	});
}


function loadModalPayment(expense_uid,cuid){
	$(".modal_Payment").empty();
	$(".modal_Payment").load(config.base_url+"expense/api/expense_api/payMentModals/"+expense_uid+"/"+cuid,function() {
		$("#myModalPayment").modal("show");
		
		
		
	});
}


function loadModalDeposit(expense_uid,cuid){
	$("#modal_deposit").empty();
	$("#modal_deposit").load(config.base_url+"expense/api/expense_api/depositModals/"+expense_uid+"/"+cuid,function() {
		$("#myModalDeposit").modal("show");
		
	});
}


$("#free_of_charge").click(function(){
	swal({   
		title: "ไม่คิดค่าใช้จ่าย ใช่หรือไม่ ?",   
		text: "เมื่อยืนยัน ค่าใช้จ่ายค้างชำระ จะเป็น 0.00 บาท (ไม่มีค่าใช้จ่ายเพิ่มเติม) และเงินมัดจำคงเหลือ(ถ้ามี) จะคืนให้ลูกค้า"+" \r\n \r\n"+"หลังจากยืนยันแล้ว ใบค่าใช้จ่ายนี้จะไม่สามารถเพิ่มเติมหรือเปลี่ยนแปลงรายการค่าใช้จ่ายได้อีก",   
		type: "warning",   
		showCancelButton: true, 
		cancelButtonText: "ยกเลิก",
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "ยืนยัน !",   
		closeOnConfirm: false,
		closeOnCancel: true 
	}, function(isConfirm){  
		
		if(isConfirm){
	      window.location = config.base_url+"expense/Freeofcharge/"+expense_uid+
	      "/"+expense_total_deposit_remaining+"/"+cuid;
	    }else {
	     
	    }

	});
});

function addEventCancel(uid,sum_paid_price,bill_id){
	var uid = uid;
	var sum_paid_price = sum_paid_price;
	var bill_id = bill_id;
	swal({   
		title: " ยกเลิกใบเสร็จ ใช่หรือไม่ ? ",   
		text: "คุณต้องการจะยกเลิก (Void) ใบเสร็จการชำระเงิน จำนวน "+sum_paid_price+" บาท \r\n ใบเสร็จเลขที่ "+bill_id,   
		type: "warning",   
		showCancelButton: true, 
		cancelButtonText: "ยกเลิก",
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "ยืนยัน !",   
		closeOnConfirm: true,
		closeOnCancel: true 
	}, function(isConfirm){  
		
		if(isConfirm){
	      window.location = config.base_url+"expense/BillVoid/"+expense_uid+"/"+uid;
	    }else {
	     
	    }

	});
	console.log("uid || "+uid);
	console.log("expense_uid || "+expense_uid);
	console.log("sum_paid_price || "+sum_paid_price);
	console.log("bill_id || "+bill_id);
}


$("#PayConfirme").click(function(){
	
	swal({   
		title: "ยืนยันการชำระเงิน ใช่หรือไม่?",   
		text: "หลังจากยืนยันแล้ว ใบค่าใช้จ่ายนี้จะไม่สามารถเพิ่มเติมหรือเปลี่ยนแปลงรายการค่าใช้จ่ายได้อีก",
		showCancelButton: true, 
		cancelButtonText: "ยกเลิก",
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "ยืนยัน !",   
		closeOnConfirm: false,
		closeOnCancel: true 
	}, function(isConfirm){  
		
		if(isConfirm){
	      window.location = config.base_url+"expense/setExpenStatus/"+expense_uid;
	    }else {
	     
	    }

	});
});

function loadModalAppoin(uid) {

	$("#modal_container_app").empty();
	$("#modal_container_app").load(expenseConfig.modal_appointment_url + uid, function () {
		$('#bs-example-modal').modal("show");
	});
}



$(".disBtnReturnMoney").click(function(){
	swal({   
		title: "คืนเงิน ใช่หรือไม่?",   
		text: "คุณต้องการจะยืนยันการคืนเงินให้ลูกค้า สำหรับใบค่าใช้จ่ายนี้ \r\n ใช่หรือไม่ ? \r\n  \r\n จำนวนเงิน "+return_money_to_customer+" บาท",   
		type: "warning",   
		showCancelButton: true, 
		cancelButtonText: "ยกเลิก",
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "ยืนยัน !",   
		closeOnConfirm: false,
		closeOnCancel: true 
	}, function(isConfirm){  
		
		if(isConfirm){
	      window.location = config.base_url+"expense/ReturnMoney/"+expense_uid+"/"+return_money_to_customer;
	    }else {
	     
	    }

	});
});



$(".setdispense").click(function(){
	swal({   
		title: "สั่งจ่ายยา !",   
		text: "คุณต้องการจะสั่งจ่ายยา ใช่หรือไม่ ? ",   
		type: "warning",   
		showCancelButton: true, 
		cancelButtonText: "ยกเลิก",
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "ยืนยัน !",   
		closeOnConfirm: false,
		closeOnCancel: true 
	}, function(isConfirm){  
		
		if(isConfirm){
	      window.location = config.base_url+"expense/setdispense/"+expense_uid;
	    }else {
	     
	    }

	});
});




startDatatable();
startDatatableSlip();
initAutocomplete(expense_uid);
loadExpenseInfo(expense_uid);




