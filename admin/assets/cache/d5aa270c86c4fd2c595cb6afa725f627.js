var categoryConfig = {
	stock_type_sub_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategory",
	stock_type_sub_other_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategoryOther",
	modal_add_product:"#myModalAddProductDrug .modal-body",
	category_id:"#add_product_stock_category_id",
	stock_type_id:"#product_stock_type_id",
	sub_category_1:"#sub_category_1",
	sub_category_2:"#sub_category_2"
};

function loadContentToProductModal(){
	var stock_type_id = $(categoryConfig.stock_type_id).val();
	var category = $(categoryConfig.stock_type_id).find('option:selected'); 
    var category_id = category.attr("stock_category_id"); 
	if(!category_id)category_id = 1;
	if(!stock_type_id)stock_type_id = 1;
	console.log("category_id : "+category_id);
	
	$(categoryConfig.modal_add_product).empty();
	$(categoryConfig.modal_add_product).load(config.base_url+"stock/addlist/modals/"+category_id,function() {
		
	  	$(categoryConfig.stock_type_id).val(stock_type_id);
		$(categoryConfig.category_id).val(category_id);
		
		loadProductStockTypeSubCategory(stock_type_id);
		
	});
}

function loadProductStockTypeSubCategory(stock_type_id){
	
	$.ajax({
		type: 'POST',
		url: categoryConfig.stock_type_sub_url,
		data:{"stock_type_id":stock_type_id},
		success: function(json){
			var json = JSON.parse(json);
			console.log(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				
				var option = '<option value="'+id+'">'+typename+'</option>';
				$(categoryConfig.sub_category_1).append(option);
			}
			$(categoryConfig.sub_category_1).change(function(){
				loadProductStockTypeSubCategoryOther($(this).val());						 
			});
		}
	});
}

function loadProductStockTypeSubCategoryOther(stock_sub_category_id){
	var option1 = '<option value="-1">ไม่ระบุ</option>';
	$(categoryConfig.sub_category_2).empty();
	$(categoryConfig.sub_category_2).append(option1);
	$.ajax({
		type: 'POST',
		url: categoryConfig.stock_type_sub_other_url,
		data:{"stock_sub_category_id":stock_sub_category_id},
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				var option2 = '<option value="'+id+'">'+typename+'</option>';
				$(categoryConfig.sub_category_2).append(option2);
			}
		}
	});
}

loadContentToProductModal();var drugConfig = {
	modal_name:"drugs",
	default_tab:1,
	drug_uid:"",
	drugs_container:"#container_view",
	drugs_child_container:"#child_container_view",
	current_modal:"#drugs_modal",
	drugs_edit_import_history_modal:"#myModalEditProductImportHistory",
	drugs_url:config.base_url+"stock/api/stock_api/getStockByID",
};


function loadModalDrug(uid,default_tab){
	drugConfig.drug_uid = uid;
	drugConfig.default_tab = default_tab;
	$(drugConfig.drugs_container).empty();
	
	$(drugConfig.drugs_container).load(config.base_url+"stock/"+drugConfig.modal_name+"/modals/"+drugConfig.drug_uid,function() {
		$(drugConfig.current_modal).modal("show");
		console.log("drugConfig.current_modal : "+drugConfig.current_modal);
		if(drugConfig.default_tab == 2){
			$(drugConfig.drugs_container+" .nav-link").each(function(index){
				if($(this).hasClass("active")){
					$(this).parent().hide();
				}
			});
			$(drugConfig.drugs_container+' .nav-tabs a[href="#tab'+default_tab+'"]').tab('show');
		}
		loadTabDrug(drugConfig.default_tab);
		initEventDrug();
	});
}
function loadTabDrug(tab){
	$("#tab"+tab).empty();
	$("#tab"+tab).load(config.base_url+"stock/"+drugConfig.modal_name+"/tab"+tab+"/"+drugConfig.drug_uid,function() {
		$(drugConfig.drugs_view).modal("show");
	});
}

function loadModalInTabDrug(view,modal_id,related_stock_uid,modal){
	if(!related_stock_uid)related_stock_uid = "";
	console.log("drugConfig.drug_uid : "+drugConfig.drug_uid);
	console.log("related_stock_uid : "+related_stock_uid);
	if(!modal)modal = serviceConfig.modal_name;
	var url = config.base_url+"stock/"+modal+"/"+view+"/"+drugConfig.drug_uid+"/"+related_stock_uid;
	console.log(url);
	$(drugConfig.drugs_child_container).empty();
	$(drugConfig.drugs_child_container).load(url,function() {
		$(modal_id).modal("show");
	});
}

function initEventDrug(){
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  var target = $(e.target).attr("href");
	  var tab = target.match(/\d+/g).map(Number);
	  loadTabDrug(parseInt(tab));
	});
}

var drugTab2Config = {
	stock_type_sub_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategory",
	stock_type_sub_other_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategoryOther",
	sub_category_1:"#sub_category_1_drug_tab_2",
	sub_category_2:"#sub_category_2_drug_tab_2",
	stock_sub_category_id:-1,
	stock_sub_category_id_2:-1
};

function loadProductStockTypeSubCategory_drug_tab2(stock_type_id,stock_sub_category_id,stock_sub_category_id_2){
	drugTab2Config.stock_sub_category_id = stock_sub_category_id;
	drugTab2Config.stock_sub_category_id_2 = stock_sub_category_id_2;
	$.ajax({
		type: 'POST',
		url: drugTab2Config.stock_type_sub_url,
		data:{"stock_type_id":stock_type_id},
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				
				var option = '<option value="'+id+'">'+typename+'</option>';
				$(drugTab2Config.sub_category_1).append(option);
			}
			$(drugTab2Config.sub_category_1).val(drugTab2Config.stock_sub_category_id);
			$(drugTab2Config.sub_category_1).change(function(){
				loadProductStockTypeSubCategoryOther_drug_tab2($(this).val());						 
			});
		}
	});
}

function loadProductStockTypeSubCategoryOther_drug_tab2(stock_sub_category_id){
	var option1 = '<option value="-1">ไม่ระบุ</option>';
	$(drugTab2Config.sub_category_2).empty();
	$(drugTab2Config.sub_category_2).append(option1);
	$.ajax({
		type: 'POST',
		url: drugTab2Config.stock_type_sub_other_url,
		data:{"stock_sub_category_id":stock_sub_category_id},
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				var option2 = '<option value="'+id+'">'+typename+'</option>';
				$(drugTab2Config.sub_category_2).append(option2);
			}
			if(json.length <= 0){
				drugTab2Config.stock_sub_category_id_2 = -1;
			}
			$(drugTab2Config.sub_category_2).val(drugTab2Config.stock_sub_category_id_2);
			console.log("stock_sub_category_id_2 : "+drugTab2Config.stock_sub_category_id_2);
		}
	});
}var remaining_table;
var main_price_table;
var second_price_table;

var drugTab3Config = {
	remaining_url:config.base_url+"stock/api/drugs_api/get_remaining_warehouse",
	main_price_url:config.base_url+"stock/api/drugs_api/get_main_item_info",
	second_price_url:config.base_url+"stock/api/drugs_api/get_second_item_info",
	update_number_price_url:config.base_url+"stock/api/drugs_api/updateNumberPrice",
	add_warehouse_url:config.base_url+"stock/api/drugs_api/addWarehouse",
	add_main_unit_url:config.base_url+"stock/api/drugs_api/addMainUnit",
	add_second_unit_url:config.base_url+"stock/api/drugs_api/addSecondUnit",
	del_main_item_info_url:config.base_url+"stock/api/drugs_api/del_main_item_info",
	del_second_item_info_url:config.base_url+"stock/api/drugs_api/del_second_item_info",
	del_warehouse_url:config.base_url+"stock/api/drugs_api/delWarehouse",
	remaining_product_table:"#remaining_product_table",
	main_price_table:"#main_price_table",
	second_price_table:"#second_price_table",
	myModalAddWarehouse:"#myModalAddWarehouse",
	myModalAddUnitSales:"#myModalAddUnitSales",
	myModalFixedPricePerFixedVolume:"#myModalFixedPricePerFixedVolume",
	
};

function startDatatableTab3(){
	remaining_table = $(drugTab3Config.remaining_product_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "20%" },
				{"width": "20%" },
				{"width": "20%" },
				{"width": "20%" }
		 ]
	});
	
	main_price_table = $(drugTab3Config.main_price_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "20%" },
				{"width": "20%" },
				{"width": "10%" },
				{"width": "20%" }
		 ]
	});
	
	second_price_table = $(drugTab3Config.second_price_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "40%" },
				{"width": "20%" }
		 ]
	});
}
function loadProductRemaining(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.remaining_url,
		success: function(json){
			
			var json = JSON.parse(json);
			remaining_table.clear();
			for(var i = 0;i<json.data.length;i++){
				remaining_table.row.add(json.data[i]);
			}
			remaining_table.draw();
		}
	});
}
function loadMainPriceTable(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.main_price_url,
		success: function(json){
			
			var json = JSON.parse(json);
			main_price_table.clear();
			for(var i = 0;i<json.data.length;i++){
				main_price_table.row.add(json.data[i]);
			}
			main_price_table.draw();
		}
	});
}
function loadSecondPriceTable(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.second_price_url,
		success: function(json){
			console.log("second_price_url : "+json);
			var json = JSON.parse(json);
			second_price_table.clear();
			for(var i = 0;i<json.data.length;i++){
				console.log(json.data[i]);
				second_price_table.row.add(json.data[i]);
			}
			second_price_table.draw();
		}
	});
}

function updateNumberPrice_drug(){
	var formdata = $("#save_number_price").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.update_number_price_url,
		success: function(json){
			var json = JSON.parse(json);
			if(json){
				swal("สำเร็จ","บันทึกข้อมูลเรียบร้อยแล้ว","","success");
				
				var duration_day_in_warehouse = parseFloat($("#duration_day_in_warehouse").val());
				var use_per_day_average = parseFloat($("#use_per_day_average").val());
				
				var duration_day_for_waiting = parseFloat($("#duration_day_for_waiting").val());
				var use_per_day_average = parseFloat($("#use_per_day_average").val());
				var safety_stock = parseFloat($("#safety_stock").val());
				
				console.log("duration_day_for_waiting : "+duration_day_for_waiting);
				console.log("use_per_day_average : "+use_per_day_average);
				$("#use_per_month_max").val(duration_day_in_warehouse*use_per_day_average);
				$("#recorder_point").val((duration_day_for_waiting*use_per_day_average)+safety_stock);
				
				
	
			}
		}
	});
}

function addWarehouse(){
	var formdata = $("#add_warehouse").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_warehouse_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalAddWarehouse).modal("hide");
				loadProductRemaining(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มคลังใหม่เรียบร้อยแล้ว","","success");
			}else{
				swal("มีบางอย่างผิดพลาด","มีคลังรับนี้อยู่ในระบบแล้ว","warning");
			}
		}
	});
}


function delWarehouse(){
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
		$(".checkwarehouse").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				remaining_table.rows(".selected").remove().draw();
				var id = $(this).attr("warehouse_info_id");
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_warehouse_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
	
}


function addMainSaleItemInfo(){
	var formdata = $("#addMainUnit").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
		dataObj[field.name] = field.value;
	});
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_main_unit_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalAddUnitSales).modal("hide");
				loadMainPriceTable(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มหน่วยขายหลักเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}

function delMainSaleItemInfo(){
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
		$(".checksale_item_info").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				main_price_table.rows(".selected").remove().draw();
				var id = $(this).attr("sale_item_info");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_main_item_info_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
	
}

function addSecondSaleItemInfo(){
	var formdata = $("#addSecondUnit").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	var ml_price_type_id = parseInt($("#ml_price_type_id").val());
	if(ml_price_type_id == 1){
		dataObj['ml_use'] = $("#ml_use_type1").val();
		dataObj['ml_price'] = $("#ml_price_type1").val();
	}else if(ml_price_type_id == 2){
		dataObj['ml_use'] = $("#ml_use_type2").val();
		dataObj['ml_price'] = $("#ml_price_type2").val();
	}else if(ml_price_type_id ===3){
		dataObj['ml_use'] = $("#ml_use_type3").val();
		dataObj['ml_price'] = $("#ml_price_type3").val();
	}
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_second_unit_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalFixedPricePerFixedVolume).modal("hide");
				loadSecondPriceTable(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มหน่วยขายย่อยเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}
function delSecondSaleItemInfo(){
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
		$(".checkitem_scheme").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				second_price_table.rows(".selected").remove().draw();
				var id = $(this).attr("item_scheme");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_second_item_info_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
	
}


function startTab3(stock_uid){
	startDatatableTab3();
	loadProductRemaining(stock_uid);
	loadMainPriceTable(stock_uid);
	loadSecondPriceTable(stock_uid);
}

var join_stock_table;

var drugTab4Config = {
	join_url:config.base_url+"stock/api/drugs_api/get_join_product",
	add_join_stock_url:config.base_url+"stock/api/drugs_api/add_join_stock_url",
	del_join_stock_url:config.base_url+"stock/drugs/delRelated",
	get_stock_url:config.base_url+"stock/api/drugs_api/getStock",
	join_stock_table:"#join_stock_table",
	searchTable:"#searchTable",
	modal_container:"#modal_container",
	myModalStockCutJoinProduct:"#myModalStockCutJoinProduct"
	
};

function startDatatableTab4_drug(){
	join_stock_table = $(drugTab4Config.join_stock_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "10%" },
				{"width": "30%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
	
}


function loadJoinProduct_drug(stock_uid){
	console.log(stock_uid);
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab4Config.join_url,
		success: function(json){
			
			var total_list = 0;
			var total_price = 0;
			
			var json = JSON.parse(json);
			join_stock_table.clear();
			for(var i = 0;i<json.data.length;i++){
				join_stock_table.row.add(json.data[i]);
				total_price += parseInt(json.data[i][4]); 
			}
			join_stock_table.draw();
			total_list = join_stock_table.rows().count();
			
			$("#total_list").text(total_list);
			$("#total_price").text(total_price);
		}
	});
}

function initAutocomplete_drug(){
	if($("#tags").length > 0 ){
		$("#tags").autocomplete({
			source: drugTab4Config.get_stock_url,
			select: function (event, ui) {
				var uid = ui.item.uid;
				var label = ui.item.label;
				var description = ui.item.description;
				var stock_category_id = ui.item.stock_category_id;
				var modal = "drugs";
				console.log("stock_category_id : "+stock_category_id);
				if(stock_category_id == 1){
					modal = "drugs";
				}else if(stock_category_id == 2){
					modal = "service";
				}else if(stock_category_id == 3){
					modal = "product";
				}else if(stock_category_id == 5){ 
					modal = "product";
				}else{
					modal = "drugs";
				}
				loadModalInTabDrug('addRelated','#myModalStockCutJoinProduct',uid,modal);
			}
		}).data("ui-autocomplete")._renderItem = function (ul,item) {
			return $('<li></li>')
			.data("item.autocomplete", item)
			.append('<div href="javascript:void(0)"><div class="row d-flex justify-content-between"><div class="col-md-2"><div class=" pl-3">'+item.label +'</div></div><div class="col-md-8"><div class="mdi mdi-needle">'+item.description+'</div></div><div class="col-md-2"><div class="mdi mdi-plus-circle text-success text-right"></div></div></div></div>')
			.appendTo(ul);
		};
	}
}

function openAddModal_drug(uid){
	$(drugTab4Config.modal_container).empty();
	$(drugTab4Config.modal_container).load(config.base_url+"stock/drugs/myModalStockCutProduct/"+uid,function() {
		$(drugTab4Config.myModalStockCutJoinProduct).modal("show");
	});
}

function addJoinStock_drug(){
	var formdata = $("#join_stock").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
		console.log(field.name);
     	dataObj[field.name] = field.value;
    });
	
	
	var stock_sale_price = parseInt(dataObj['stock_sale_price']);
	var add_related_stock_price_flag = $("#add_related_stock_price_flag").prop("checked");
	
	var related_stock_total_price = parseInt(dataObj['related_stock_total_price']);
	if(add_related_stock_price_flag){
		related_stock_total_price = related_stock_total_price*parseInt(dataObj['related_cutting_stock_amount']);
	}else{
		related_stock_total_price = stock_sale_price*parseInt(dataObj['related_cutting_stock_amount']);
	}
	
	var related_drug_label_when_to_eat = "";
	$(".related_drug_label_when_to_eat").each(function(){
		if($(this).prop("checked")){
			related_drug_label_when_to_eat += $(this).val()+" ";	
		}
	});
	var related_drug_label_warning_list = "";
	$(".related_drug_label_warning_list").each(function(){
		if($(this).prop("checked")){
			related_drug_label_warning_list += $(this).val()+" ";	
		}
	});
	
	
	
	
	dataObj['related_stock_total_price'] = related_stock_total_price;
	dataObj['related_drug_label_when_to_eat'] = related_drug_label_when_to_eat;
	dataObj['related_drug_label_warning_list'] = related_drug_label_warning_list;
	
	if(!dataObj['related_cutting_stock_unit_id']){
		swal("มีบางอย่างผิดพลาด","กรุณาตั้งราคาขายหลักที่แท็บจำนวนสินค้าและราคา\nสินค้าที่จะสามารถตัดสต๊อกร่วมได้จะต้องมีการตั้งราคาขาย","","info");
		return false;
	}
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab4Config.add_join_stock_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab4Config.myModalStockCutJoinProduct).modal("hide");
				loadJoinProduct_drug(dataObj['main_stock_uid']);
				swal("สำเร็จ","เพิ่มการตัดสต๊อคร่วมเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}


function delJoinStock_drug(){
	var hasItemSelected = false;
	$(".checkitem_join").each(function(index){
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
			$(".checkitem_join").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					join_stock_table.rows(".selected").remove().draw();
					var related_stock_info_id = $(this).attr("related_stock_info_id")
					var main_stock_uid = $(this).attr("main_stock_uid")
					$.ajax({
						type: 'POST',
						data:{"related_stock_info_id":related_stock_info_id},
						url: drugTab4Config.del_join_stock_url,
						success: function(json){
							console.log("json : "+json);
							loadJoinProduct_drug(main_stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}

function startTab4_drug(stock_uid){
	initAutocomplete_drug();
	startDatatableTab4_drug();
	loadJoinProduct_drug(stock_uid);
}

var drugTab5Config = {
	drug_label_save:config.base_url+"stock/api/drugs_api/drug_label_save",
	myModalSampleLabelDrug:"#myModalSampleLabelDrug"
};

function drug_label_save(){
	var warning_list = "";
	var when_to_eat = "";
	$(".when_to_eat").each(function(){
		if($(this).prop("checked")){
			when_to_eat += $(this).val()+" ";	
			$("#when_to_eat").val(when_to_eat);
		}
	});
	
	$(".warning_list").each(function(){
		if($(this).prop("checked")){
			warning_list += $(this).val()+" ";
			$("#warning_list").val(warning_list);
		}
	});
	
	var formdata = $("#save_drug_label").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	
	
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab5Config.drug_label_save,
		success: function(json){
			
			var json = JSON.parse(json);
			if(json.success){
				switchEdit(false);
				swal("สำเร็จ","บันทึกฉลากยาเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}




var income_table;

var drugTab6Config = {
	income_url:config.base_url+"stock/api/drugs_api/get_incoming_by_id",
	del_income_url:config.base_url+"stock/drugs/del_incoming_by_id",
	income_table:"#income_table",
	commas:function(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
};

function startDatatableTab6(){
	income_table = $(drugTab6Config.income_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
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


function loadIncome(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab6Config.income_url,
		success: function(json){
			
			var json = JSON.parse(json);
			
			
			var total_price = 0;
			var amount = 0;
			income_table.clear();
			for(var i = 0;i<json.data.length;i++){
				income_table.row.add(json.data[i]);
				total_price += parseInt(json.data[i][5]);
				amount += parseInt(json.data[i][4]);
			}
			income_table.draw();
			console.log(total_price);
			var cost_average = Math.round(total_price/amount);
			total_price = drugTab6Config.commas(total_price);
			if(isNaN(cost_average))cost_average = 0;
			$("#cost_average").text(drugTab6Config.commas(cost_average));
			$("#total_price_tab6").text(total_price);
			
		}
	});
}

function delIncomeStock(){
	var hasItemSelected = false;
	$(".checkitem_income").each(function(index){
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
			$(".checkitem_income").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					income_table.rows(".selected").remove().draw();
					var income_id = $(this).attr("income_id");
					var stock_uid = $(this).attr("stock_uid")
					$.ajax({
						type: 'POST',
						data:{"id":income_id},
						url: drugTab6Config.del_income_url,
						success: function(json){
							console.log("json : "+json);
							loadIncome(stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}
function startTab6(stock_uid){
	startDatatableTab6();
	loadIncome(stock_uid);
}

var use_history_table;

var drugTab7Config = {
	use_history_url:config.base_url+"stock/api/drugs_api/get_use_history_by_id",
	del_history_url:config.base_url+"stock/drugs/del_use_history_by_id",
	use_history_table:"#use_history_table",
	commas:function(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
};


function startDatatableTab7(){
	use_history_table = $(drugTab7Config.use_history_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
}


function loadUseHistory(stock_uid,startDate,endDate){
	if(!startDate)startDate = 0;
	if(!endDate)endDate = 0;
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid,'startDate':startDate,'endDate':endDate},
		url: drugTab7Config.use_history_url,
		success: function(json){
			var json = JSON.parse(json);
			var total_number = 0;
			var total_price = 0;
			use_history_table.clear();
			for(var i = 0;i<json.data.length;i++){
				use_history_table.row.add(json.data[i]);
				total_number += parseInt(json.data[i][1]);
				total_price += parseInt(json.data[i][2]);
			}
			console.log(total_price);
			use_history_table.draw();
			total_price = (drugTab7Config.commas(total_price));
			$("#total_number").text(drugTab7Config.commas(total_number));
			$("#total_price_tab7").text(total_price);
		}
	});
}

function delUseHistoryStock(){
	var hasItemSelected = false;
	$(".checkitem_history").each(function(index){
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
			$(".checkitem_history").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					use_history_table.rows(".selected").remove().draw();
					var history_id = $(this).attr("history_id");
					var stock_uid = $(this).attr("stock_uid")
					$.ajax({
						type: 'POST',
						data:{"id":history_id},
						url: drugTab7Config.del_history_url,
						success: function(json){
							console.log("json : "+json);
							loadUseHistory(stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("กรุณาเลือกอย่างน้อย 1 รายการ");
	}
}
function startTab7(stock_uid){
	startDatatableTab7();
	loadUseHistory(stock_uid);
}

var drugTab8Config = {
	save_other_url:config.base_url+"stock/api/drugs_api/save_other"
};

function save_other(){
	
	var formdata = $("#save_other").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab8Config.save_other_url,
		success: function(json){
			
			var json = JSON.parse(json);
			if(json.success){
				swal("สำเร็จ","บันทึกข้อมูลเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}




var productConfig = {
	modal_name:"product",
	default_tab:1,
	drug_uid:"",
	drugs_container:"#container_view",
	drugs_child_container:"#child_container_view",
	current_modal:"#product_modal",
	drugs_edit_import_history_modal:"#myModalEditProductImportHistory",
	drugs_url:config.base_url+"stock/api/stock_api/getStockByID",
};


function loadModalProduct(uid,default_tab){
	productConfig.drug_uid = uid;
	productConfig.default_tab = default_tab;
	$(productConfig.drugs_container).empty();
	$(productConfig.drugs_container).load(config.base_url+"stock/"+productConfig.modal_name+"/modals/"+productConfig.drug_uid,function() {
		$(productConfig.current_modal).modal("show");
		console.log("productConfig.default_tab : "+productConfig.default_tab);
		if(productConfig.default_tab == 2){
			$(productConfig.drugs_container+" .nav-link").each(function(index){
				if($(this).hasClass("active")){
					$(this).parent().hide();
				}
			});
			$(productConfig.drugs_container+' .nav-tabs a[href="#tab'+default_tab+'"]').tab('show');
		}
		loadTabProduct(productConfig.default_tab);
		initEventProduct();
	});
}
function loadTabProduct(tab){
	$("#tab"+tab).empty();
	$("#tab"+tab).load(config.base_url+"stock/"+productConfig.modal_name+"/tab"+tab+"/"+productConfig.drug_uid,function() {
		$(productConfig.drugs_view).modal("show");
	});
}

function loadModalInTabProduct(view,modal_id,related_stock_uid,modal){
	if(!related_stock_uid)related_stock_uid = "";
	console.log("productConfig.drug_uid : "+productConfig.drug_uid);
	console.log("related_stock_uid : "+related_stock_uid);
	if(!modal)modal = serviceConfig.modal_name;
	var url = config.base_url+"stock/"+modal+"/"+view+"/"+productConfig.drug_uid+"/"+related_stock_uid;
	console.log(url);
	$(productConfig.drugs_child_container).empty();
	$(productConfig.drugs_child_container).load(url,function() {
		$(modal_id).modal("show");
	});
}

function initEventProduct(){
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  var target = $(e.target).attr("href");
	  var tab = target.match(/\d+/g).map(Number);
	  loadTabProduct(parseInt(tab));
	});
}

var drugTab2Config = {
	stock_type_sub_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategory",
	stock_type_sub_other_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategoryOther",
	sub_category_1:"#sub_category_1_drug_tab_2",
	sub_category_2:"#sub_category_2_drug_tab_2",
	stock_sub_category_id:-1,
	stock_sub_category_id_2:-1
};

function loadProductStockTypeSubCategory_drug_tab2(stock_type_id,stock_sub_category_id,stock_sub_category_id_2){
	drugTab2Config.stock_sub_category_id = stock_sub_category_id;
	drugTab2Config.stock_sub_category_id_2 = stock_sub_category_id_2;
	$.ajax({
		type: 'POST',
		url: drugTab2Config.stock_type_sub_url,
		data:{"stock_type_id":stock_type_id},
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				
				var option = '<option value="'+id+'">'+typename+'</option>';
				$(drugTab2Config.sub_category_1).append(option);
			}
			$(drugTab2Config.sub_category_1).val(drugTab2Config.stock_sub_category_id);
			$(drugTab2Config.sub_category_1).change(function(){
				loadProductStockTypeSubCategoryOther_drug_tab2($(this).val());						 
			});
		}
	});
}

function loadProductStockTypeSubCategoryOther_drug_tab2(stock_sub_category_id){
	var option1 = '<option value="-1">ไม่ระบุ</option>';
	$(drugTab2Config.sub_category_2).empty();
	$(drugTab2Config.sub_category_2).append(option1);
	$.ajax({
		type: 'POST',
		url: drugTab2Config.stock_type_sub_other_url,
		data:{"stock_sub_category_id":stock_sub_category_id},
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				var option2 = '<option value="'+id+'">'+typename+'</option>';
				$(drugTab2Config.sub_category_2).append(option2);
			}
			if(json.length <= 0){
				drugTab2Config.stock_sub_category_id_2 = -1;
			}
			$(drugTab2Config.sub_category_2).val(drugTab2Config.stock_sub_category_id_2);
			console.log("stock_sub_category_id_2 : "+drugTab2Config.stock_sub_category_id_2);
		}
	});
}var remaining_table;
var main_price_table;
var second_price_table;

var drugTab3Config = {
	remaining_url:config.base_url+"stock/api/drugs_api/get_remaining_warehouse",
	main_price_url:config.base_url+"stock/api/drugs_api/get_main_item_info",
	second_price_url:config.base_url+"stock/api/drugs_api/get_second_item_info",
	update_number_price_url:config.base_url+"stock/api/drugs_api/updateNumberPrice",
	add_warehouse_url:config.base_url+"stock/api/drugs_api/addWarehouse",
	add_main_unit_url:config.base_url+"stock/api/drugs_api/addMainUnit",
	add_second_unit_url:config.base_url+"stock/api/drugs_api/addSecondUnit",
	del_main_item_info_url:config.base_url+"stock/api/drugs_api/del_main_item_info",
	del_second_item_info_url:config.base_url+"stock/api/drugs_api/del_second_item_info",
	del_warehouse_url:config.base_url+"stock/api/drugs_api/delWarehouse",
	remaining_product_table:"#remaining_product_table",
	main_price_table:"#main_price_table",
	second_price_table:"#second_price_table",
	myModalAddWarehouse:"#myModalAddWarehouse",
	myModalAddUnitSales:"#myModalAddUnitSales",
	myModalFixedPricePerFixedVolume:"#myModalFixedPricePerFixedVolume",
	
};

function startDatatableTab3(){
	remaining_table = $(drugTab3Config.remaining_product_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				
				{"width": "20%" },
				{"width": "20%" },
				{"width": "20%" },
				{"width": "20%" }
		 ]
	});
	
	main_price_table = $(drugTab3Config.main_price_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "20%" },
				{"width": "20%" },
				{"width": "10%" },
				{"width": "20%" }
		 ]
	});
	
	second_price_table = $(drugTab3Config.second_price_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "40%" },
				{"width": "20%" }
		 ]
	});
}
function loadProductRemaining(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.remaining_url,
		success: function(json){
			
			var json = JSON.parse(json);
			remaining_table.clear();
			for(var i = 0;i<json.data.length;i++){
				remaining_table.row.add(json.data[i]);
			}
			remaining_table.draw();
		}
	});
}
function loadMainPriceTable(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.main_price_url,
		success: function(json){
			
			var json = JSON.parse(json);
			main_price_table.clear();
			for(var i = 0;i<json.data.length;i++){
				main_price_table.row.add(json.data[i]);
			}
			main_price_table.draw();
		}
	});
}
function loadSecondPriceTable(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.second_price_url,
		success: function(json){
			console.log("second_price_url : "+json);
			var json = JSON.parse(json);
			second_price_table.clear();
			for(var i = 0;i<json.data.length;i++){
				console.log(json.data[i]);
				second_price_table.row.add(json.data[i]);
			}
			second_price_table.draw();
		}
	});
}

function updateNumberPrice_product(){
	var formdata = $("#save_number_price").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.update_number_price_url,
		success: function(json){
			var json = JSON.parse(json);
			if(json){
				swal("สำเร็จ","บันทึกข้อมูลเรียบร้อยแล้ว","","success");
				var duration_day_in_warehouse = parseFloat($("#duration_day_in_warehouse").val());
				var use_per_day_average = parseFloat($("#use_per_day_average").val());
				
				var duration_day_for_waiting = parseFloat($("#duration_day_for_waiting").val());
				var use_per_day_average = parseFloat($("#use_per_day_average").val());
				var safety_stock = parseFloat($("#safety_stock").val());
				
				console.log("duration_day_for_waiting : "+duration_day_for_waiting);
				console.log("use_per_day_average : "+use_per_day_average);
				$("#use_per_month_max").val(duration_day_in_warehouse*use_per_day_average);
				$("#recorder_point").val((duration_day_for_waiting*use_per_day_average)+safety_stock);
			}
		}
	});
}

function addWarehouse(){
	var formdata = $("#add_warehouse").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_warehouse_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalAddWarehouse).modal("hide");
				loadProductRemaining(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มคลังใหม่เรียบร้อยแล้ว","","success");
			}else{
				swal("มีบางอย่างผิดพลาด","มีคลังรับนี้อยู่ในระบบแล้ว","warning");
			}
		}
	});
}


function delWarehouse(){
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
		$(".checkwarehouse").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				remaining_table.rows(".selected").remove().draw();
				var id = $(this).attr("warehouse_info_id");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_warehouse_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
}


function addMainSaleItemInfo(){
	var formdata = $("#addMainUnit").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_main_unit_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalAddUnitSales).modal("hide");
				loadMainPriceTable(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มหน่วยขายหลักเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}

function delMainSaleItemInfo(){
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
		$(".checksale_item_info").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				main_price_table.rows(".selected").remove().draw();
				var id = $(this).attr("sale_item_info");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_main_item_info_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
	
}

function addSecondSaleItemInfo(){
	var formdata = $("#addSecondUnit").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	var ml_price_type_id = parseInt($("#ml_price_type_id").val());
	if(ml_price_type_id == 1){
		dataObj['ml_use'] = $("#ml_use_type1").val();
		dataObj['ml_price'] = $("#ml_price_type1").val();
	}else if(ml_price_type_id == 2){
		dataObj['ml_use'] = $("#ml_use_type2").val();
		dataObj['ml_price'] = $("#ml_price_type2").val();
	}else if(ml_price_type_id ===3){
		dataObj['ml_use'] = $("#ml_use_type3").val();
		dataObj['ml_price'] = $("#ml_price_type3").val();
	}
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_second_unit_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalFixedPricePerFixedVolume).modal("hide");
				loadSecondPriceTable(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มหน่วยขายย่อยเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}
function delSecondSaleItemInfo(){
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
		$(".checkitem_scheme").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				second_price_table.rows(".selected").remove().draw();
				var id = $(this).attr("item_scheme");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_second_item_info_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
}


function startTab3(stock_uid){
	startDatatableTab3();
	loadProductRemaining(stock_uid);
	loadMainPriceTable(stock_uid);
	loadSecondPriceTable(stock_uid);
}

var join_stock_table;

var drugTab4Config = {
	join_url:config.base_url+"stock/api/drugs_api/get_join_product",
	add_join_stock_url:config.base_url+"stock/api/drugs_api/add_join_stock_url",
	del_join_stock_url:config.base_url+"stock/drugs/delRelated",
	get_stock_url:config.base_url+"stock/api/drugs_api/getStock",
	join_stock_table:"#join_stock_table",
	searchTable:"#searchTable",
	modal_container:"#modal_container",
	myModalStockCutJoinProduct:"#myModalStockCutJoinProduct"
	
};

function startDatatableTab4_product(){
	join_stock_table = $(drugTab4Config.join_stock_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "10%" },
				{"width": "30%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
	
}


function loadJoinProduct_product(stock_uid){
	console.log(stock_uid);
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab4Config.join_url,
		success: function(json){
			
			var total_list = 0;
			var total_price = 0;
			
			var json = JSON.parse(json);
			join_stock_table.clear();
			for(var i = 0;i<json.data.length;i++){
				join_stock_table.row.add(json.data[i]);
				total_price += parseInt(json.data[i][4]); 
			}
			join_stock_table.draw();
			total_list = join_stock_table.rows().count();
			
			$("#total_list").text(total_list);
			$("#total_price").text(total_price);
		}
	});
}

function initAutocomplete_product(){
	if($("#tags").length > 0 ){
		$("#tags").autocomplete({
			source: drugTab4Config.get_stock_url,
			select: function (event, ui) {
				var uid = ui.item.uid;
				var label = ui.item.label;
				var description = ui.item.description;
				var stock_category_id = ui.item.stock_category_id;
				var modal = "drugs";
				console.log("stock_category_id : "+stock_category_id);
				if(stock_category_id == 1){
					modal = "drugs";
				}else if(stock_category_id == 2){
					modal = "service";
				}else if(stock_category_id == 3){
					modal = "product";
				}else if(stock_category_id == 5){ 
					modal = "product";
				}else{
					modal = "drugs";
				}
				loadModalInTabProduct('addRelated','#myModalStockCutJoinProduct',uid,modal);
			}
		}).data("ui-autocomplete")._renderItem = function (ul,item) {
			return $('<li></li>')
			.data("item.autocomplete", item)
			.append('<div href="javascript:void(0)"><div class="row d-flex justify-content-between"><div class="col-md-2"><div class=" pl-3">'+item.label +'</div></div><div class="col-md-8"><div class="mdi mdi-needle">'+item.description+'</div></div><div class="col-md-2"><div class="mdi mdi-plus-circle text-success text-right"></div></div></div></div>')
			.appendTo(ul);
		};
	}
}

function openAddModal_product(uid){
	$(drugTab4Config.modal_container).empty();
	$(drugTab4Config.modal_container).load(config.base_url+"stock/drugs/myModalStockCutProduct/"+uid,function() {
		$(drugTab4Config.myModalStockCutJoinProduct).modal("show");
	});
}

function addJoinStock_product(){
	var formdata = $("#join_stock").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	console.log(field.name);
		dataObj[field.name] = field.value;
    });
	
	
	
	var stock_sale_price = parseInt(dataObj['stock_sale_price']);
	var add_related_stock_price_flag = $("#add_related_stock_price_flag").prop("checked");
	
	var related_stock_total_price = parseInt(dataObj['related_stock_total_price']);
	if(add_related_stock_price_flag){
		related_stock_total_price = related_stock_total_price*parseInt(dataObj['related_cutting_stock_amount']);
	}else{
		related_stock_total_price = stock_sale_price*parseInt(dataObj['related_cutting_stock_amount']);
	}
	
	
	
	var related_drug_label_when_to_eat = "";
	$(".related_drug_label_when_to_eat").each(function(){
		if($(this).prop("checked")){
			related_drug_label_when_to_eat += $(this).val()+" ";	
		}
	});
	var related_drug_label_warning_list = "";
	$(".related_drug_label_warning_list").each(function(){
		if($(this).prop("checked")){
			related_drug_label_warning_list += $(this).val()+" ";	
		}
	});
	
	dataObj['related_stock_total_price'] = related_stock_total_price;
	dataObj['related_drug_label_when_to_eat'] = related_drug_label_when_to_eat;
	dataObj['related_drug_label_warning_list'] = related_drug_label_warning_list;
	
	console.log(dataObj);
	if(!dataObj['related_cutting_stock_unit_id']){
		swal("มีบางอย่างผิดพลาด","กรุณาตั้งราคาขายหลักที่แท็บจำนวนสินค้าและราคา\nสินค้าที่จะสามารถตัดสต๊อกร่วมได้จะต้องมีการตั้งราคาขาย","","info");
		return false;
	}
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab4Config.add_join_stock_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab4Config.myModalStockCutJoinProduct).modal("hide");
				loadJoinProduct_product(dataObj['main_stock_uid']);
				swal("สำเร็จ","เพิ่มการตัดสต๊อคร่วมเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}


function delJoinStock_product(){
	var hasItemSelected = false;
	$(".checkitem_join").each(function(index){
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
			$(".checkitem_join").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					join_stock_table.rows(".selected").remove().draw();
					var related_stock_info_id = $(this).attr("related_stock_info_id")
					var main_stock_uid = $(this).attr("main_stock_uid")
					$.ajax({
						type: 'POST',
						data:{"related_stock_info_id":related_stock_info_id},
						url: drugTab4Config.del_join_stock_url,
						success: function(json){
							console.log("json : "+json);
							loadJoinProduct_product(main_stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}

function startTab4_product(stock_uid){
	initAutocomplete_product();
	startDatatableTab4_product();
	loadJoinProduct_product(stock_uid);
}

var drugTab5Config = {
	drug_label_save:config.base_url+"stock/api/drugs_api/drug_label_save",
	myModalSampleLabelDrug:"#myModalSampleLabelDrug"
};

function drug_label_save(){
	var warning_list = "";
	var when_to_eat = "";
	$(".when_to_eat").each(function(){
		if($(this).prop("checked")){
			when_to_eat += $(this).val()+" ";	
			$("#when_to_eat").val(when_to_eat);
		}
	});
	
	$(".warning_list").each(function(){
		if($(this).prop("checked")){
			warning_list += $(this).val()+" ";
			$("#warning_list").val(warning_list);
		}
	});
	
	var formdata = $("#save_drug_label").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	
	
	

	console.log(dataObj);
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab5Config.drug_label_save,
		success: function(json){
			
			var json = JSON.parse(json);
			if(json.success){
				switchEdit(false);
				swal("สำเร็จ","บันทึกฉลากยาเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}




var income_table;

var drugTab6Config = {
	income_url:config.base_url+"stock/api/drugs_api/get_incoming_by_id",
	del_income_url:config.base_url+"stock/drugs/del_incoming_by_id",
	income_table:"#income_table",
	commas:function(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
};

function startDatatableTab6(){
	income_table = $(drugTab6Config.income_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
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


function loadIncome(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab6Config.income_url,
		success: function(json){
			
			var json = JSON.parse(json);
			
			
			var total_price = 0;
			var amount = 0;
			income_table.clear();
			for(var i = 0;i<json.data.length;i++){
				income_table.row.add(json.data[i]);
				total_price += parseInt(json.data[i][5]);
				amount += parseInt(json.data[i][4]);
			}
			income_table.draw();
			console.log(total_price);
			var cost_average = Math.round(total_price/amount);
			total_price = drugTab6Config.commas(total_price);
			if(isNaN(cost_average))cost_average = 0;
			$("#cost_average").text(drugTab6Config.commas(cost_average));
			$("#total_price_tab6").text(total_price);
			
		}
	});
}

function delIncomeStock(){
	var hasItemSelected = false;
	$(".checkitem_income").each(function(index){
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
			$(".checkitem_income").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					income_table.rows(".selected").remove().draw();
					var income_id = $(this).attr("income_id");
					var stock_uid = $(this).attr("stock_uid")
					$.ajax({
						type: 'POST',
						data:{"id":income_id},
						url: drugTab6Config.del_income_url,
						success: function(json){
							console.log("json : "+json);
							loadIncome(stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}
function startTab6(stock_uid){
	startDatatableTab6();
	loadIncome(stock_uid);
}

var use_history_table;

var drugTab7Config = {
	use_history_url:config.base_url+"stock/api/drugs_api/get_use_history_by_id",
	del_history_url:config.base_url+"stock/drugs/del_use_history_by_id",
	use_history_table:"#use_history_table",
	commas:function(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
};


function startDatatableTab7(){
	use_history_table = $(drugTab7Config.use_history_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
}


function loadUseHistory(stock_uid,startDate,endDate){
	if(!startDate)startDate = 0;
	if(!endDate)endDate = 0;
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid,'startDate':startDate,'endDate':endDate},
		url: drugTab7Config.use_history_url,
		success: function(json){
			var json = JSON.parse(json);
			var total_number = 0;
			var total_price = 0;
			use_history_table.clear();
			for(var i = 0;i<json.data.length;i++){
				use_history_table.row.add(json.data[i]);
				total_number += parseInt(json.data[i][1]);
				total_price += parseInt(json.data[i][2]);
			}
			console.log(total_price);
			use_history_table.draw();
			total_price = (drugTab7Config.commas(total_price));
			$("#total_number").text(drugTab7Config.commas(total_number));
			$("#total_price_tab7").text(total_price);
		}
	});
}

function delUseHistoryStock(){
	var hasItemSelected = false;
	$(".checkitem_history").each(function(index){
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
			$(".checkitem_history").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					use_history_table.rows(".selected").remove().draw();
					var history_id = $(this).attr("history_id");
					var stock_uid = $(this).attr("stock_uid")
					$.ajax({
						type: 'POST',
						data:{"id":history_id},
						url: drugTab7Config.del_history_url,
						success: function(json){
							console.log("json : "+json);
							loadUseHistory(stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("กรุณาเลือกอย่างน้อย 1 รายการ");
	}
}
function startTab7(stock_uid){
	startDatatableTab7();
	loadUseHistory(stock_uid);
}

var drugTab8Config = {
	save_other_url:config.base_url+"stock/api/drugs_api/save_other"
};

function save_other(){
	
	var formdata = $("#save_other").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab8Config.save_other_url,
		success: function(json){
			
			var json = JSON.parse(json);
			if(json.success){
				swal("สำเร็จ","บันทึกข้อมูลเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}




var serviceConfig = {
	modal_name:"service",
	default_tab:1,
	drug_uid:"",
	drugs_container:"#container_view",
	drugs_child_container:"#child_container_view",
	current_modal:"#service_modal",
	drugs_edit_import_history_modal:"#myModalEditProductImportHistory",
	drugs_url:config.base_url+"stock/api/stock_api/getStockByID",
};


function loadModalService(uid,default_tab){
	serviceConfig.drug_uid = uid;
	serviceConfig.default_tab = default_tab;
	$(serviceConfig.drugs_container).empty();
	$(serviceConfig.drugs_container).load(config.base_url+"stock/"+serviceConfig.modal_name+"/modals/"+serviceConfig.drug_uid,function() {
		$(serviceConfig.current_modal).modal("show");
		console.log("serviceConfig.default_tab : "+serviceConfig.default_tab);
		if(serviceConfig.default_tab == 2){
			$(serviceConfig.drugs_container+" .nav-link").each(function(index){
				if($(this).hasClass("active")){
					$(this).parent().hide();
				}
			});
			$(serviceConfig.drugs_container+' .nav-tabs a[href="#tab'+default_tab+'"]').tab('show');
		}
		loadTabService(serviceConfig.default_tab);
		initEventSevice();
	});
}
function loadTabService(tab){
	$("#tab"+tab).empty();
	$("#tab"+tab).load(config.base_url+"stock/"+serviceConfig.modal_name+"/tab"+tab+"/"+serviceConfig.drug_uid,function() {
		$(serviceConfig.drugs_view).modal("show");
	});
}

function loadModalInTabService(view,modal_id,related_stock_uid,modal){
	if(!related_stock_uid)related_stock_uid = "";
	console.log("serviceConfig.drug_uid : "+serviceConfig.drug_uid);
	console.log("related_stock_uid : "+related_stock_uid);
	if(!modal)modal = serviceConfig.modal_name;
	var url = config.base_url+"stock/"+modal+"/"+view+"/"+serviceConfig.drug_uid+"/"+related_stock_uid;
	console.log(url);
	$(serviceConfig.drugs_child_container).empty();
	$(serviceConfig.drugs_child_container).load(url,function() {
		$(modal_id).modal("show");
	});
}

function initEventSevice(){
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  var target = $(e.target).attr("href");
	  var tab = target.match(/\d+/g).map(Number);
	  loadTabService(parseInt(tab));
	});
}

var drugTab2Config = {
	stock_type_sub_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategory",
	stock_type_sub_other_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategoryOther",
	sub_category_1:"#sub_category_1_drug_tab_2",
	sub_category_2:"#sub_category_2_drug_tab_2",
	stock_sub_category_id:-1,
	stock_sub_category_id_2:-1
};

function loadProductStockTypeSubCategory_drug_tab2(stock_type_id,stock_sub_category_id,stock_sub_category_id_2){
	drugTab2Config.stock_sub_category_id = stock_sub_category_id;
	drugTab2Config.stock_sub_category_id_2 = stock_sub_category_id_2;
	$.ajax({
		type: 'POST',
		url: drugTab2Config.stock_type_sub_url,
		data:{"stock_type_id":stock_type_id},
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				
				var option = '<option value="'+id+'">'+typename+'</option>';
				$(drugTab2Config.sub_category_1).append(option);
			}
			$(drugTab2Config.sub_category_1).val(drugTab2Config.stock_sub_category_id);
			$(drugTab2Config.sub_category_1).change(function(){
				loadProductStockTypeSubCategoryOther_drug_tab2($(this).val());						 
			});
		}
	});
}

function loadProductStockTypeSubCategoryOther_drug_tab2(stock_sub_category_id){
	var option1 = '<option value="-1">ไม่ระบุ</option>';
	$(drugTab2Config.sub_category_2).empty();
	$(drugTab2Config.sub_category_2).append(option1);
	$.ajax({
		type: 'POST',
		url: drugTab2Config.stock_type_sub_other_url,
		data:{"stock_sub_category_id":stock_sub_category_id},
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;
				var option2 = '<option value="'+id+'">'+typename+'</option>';
				$(drugTab2Config.sub_category_2).append(option2);
			}
			if(json.length <= 0){
				drugTab2Config.stock_sub_category_id_2 = -1;
			}
			$(drugTab2Config.sub_category_2).val(drugTab2Config.stock_sub_category_id_2);
			console.log("stock_sub_category_id_2 : "+drugTab2Config.stock_sub_category_id_2);
		}
	});
}var remaining_table;
var main_price_table;
var second_price_table;

var drugTab3Config = {
	remaining_url:config.base_url+"stock/api/drugs_api/get_remaining_warehouse",
	main_price_url:config.base_url+"stock/api/drugs_api/get_main_item_info",
	second_price_url:config.base_url+"stock/api/drugs_api/get_second_item_info",
	update_number_price_url:config.base_url+"stock/api/drugs_api/updateNumberPrice",
	add_warehouse_url:config.base_url+"stock/api/drugs_api/addWarehouse",
	add_main_unit_url:config.base_url+"stock/api/drugs_api/addMainUnit",
	add_second_unit_url:config.base_url+"stock/api/drugs_api/addSecondUnit",
	del_main_item_info_url:config.base_url+"stock/api/drugs_api/del_main_item_info",
	del_second_item_info_url:config.base_url+"stock/api/drugs_api/del_second_item_info",
	del_warehouse_url:config.base_url+"stock/api/drugs_api/delWarehouse",
	remaining_product_table:"#remaining_product_table",
	main_price_table:"#main_price_table",
	second_price_table:"#second_price_table",
	myModalAddWarehouse:"#myModalAddWarehouse",
	myModalAddUnitSales:"#myModalAddUnitSales",
	myModalFixedPricePerFixedVolume:"#myModalFixedPricePerFixedVolume",
	
};

function startDatatableTab3(){
	remaining_table = $(drugTab3Config.remaining_product_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				
				{"width": "20%" },
				{"width": "20%" },
				{"width": "20%" },
				{"width": "20%" }
		 ]
	});
	
	main_price_table = $(drugTab3Config.main_price_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "20%" },
				{"width": "20%" },
				{"width": "10%" },
				{"width": "20%" }
		 ]
	});
	
	second_price_table = $(drugTab3Config.second_price_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "40%" },
				{"width": "20%" }
		 ]
	});
}
function loadProductRemaining(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.remaining_url,
		success: function(json){
			
			var json = JSON.parse(json);
			remaining_table.clear();
			for(var i = 0;i<json.data.length;i++){
				remaining_table.row.add(json.data[i]);
			}
			remaining_table.draw();
		}
	});
}
function loadMainPriceTable(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.main_price_url,
		success: function(json){
			
			var json = JSON.parse(json);
			main_price_table.clear();
			for(var i = 0;i<json.data.length;i++){
				main_price_table.row.add(json.data[i]);
			}
			main_price_table.draw();
		}
	});
}
function loadSecondPriceTable(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab3Config.second_price_url,
		success: function(json){
			console.log("second_price_url : "+json);
			var json = JSON.parse(json);
			second_price_table.clear();
			for(var i = 0;i<json.data.length;i++){
				console.log(json.data[i]);
				second_price_table.row.add(json.data[i]);
			}
			second_price_table.draw();
		}
	});
}

function updateNumberPrice(){
	var formdata = $("#save_number_price").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.update_number_price_url,
		success: function(json){
			var json = JSON.parse(json);
			if(json){
				swal("สำเร็จ","บันทึกข้อมูลเรียบร้อยแล้ว","","success");
			}
		}
	});
}

function addWarehouse(){
	var formdata = $("#add_warehouse").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_warehouse_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalAddWarehouse).modal("hide");
				loadProductRemaining(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มคลังใหม่เรียบร้อยแล้ว","","success");
			}else{
				swal("มีบางอย่างผิดพลาด","มีคลังรับนี้อยู่ในระบบแล้ว","warning");
			}
		}
	});
}


function delWarehouse(){
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
		$(".checkwarehouse").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				remaining_table.rows(".selected").remove().draw();
				var id = $(this).attr("warehouse_info_id");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_warehouse_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
}


function addMainSaleItemInfo(){
	var formdata = $("#addMainUnit").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_main_unit_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalAddUnitSales).modal("hide");
				loadMainPriceTable(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มหน่วยขายหลักเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}

function delMainSaleItemInfo(){
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
		$(".checksale_item_info").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				main_price_table.rows(".selected").remove().draw();
				var id = $(this).attr("sale_item_info");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_main_item_info_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
	
}

function addSecondSaleItemInfo(){
	var formdata = $("#addSecondUnit").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	var ml_price_type_id = parseInt($("#ml_price_type_id").val());
	if(ml_price_type_id == 1){
		dataObj['ml_use'] = $("#ml_use_type1").val();
		dataObj['ml_price'] = $("#ml_price_type1").val();
	}else if(ml_price_type_id == 2){
		dataObj['ml_use'] = $("#ml_use_type2").val();
		dataObj['ml_price'] = $("#ml_price_type2").val();
	}else if(ml_price_type_id ===3){
		dataObj['ml_use'] = $("#ml_use_type3").val();
		dataObj['ml_price'] = $("#ml_price_type3").val();
	}
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab3Config.add_second_unit_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab3Config.myModalFixedPricePerFixedVolume).modal("hide");
				loadSecondPriceTable(dataObj['stock_uid']);
				swal("สำเร็จ","เพิ่มหน่วยขายย่อยเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}
function delSecondSaleItemInfo(){
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
		$(".checkitem_scheme").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				second_price_table.rows(".selected").remove().draw();
				var id = $(this).attr("item_scheme");
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: drugTab3Config.del_second_item_info_url,
					success: function(json){
						console.log("json : "+json);
						var json = JSON.parse(json);
					}
				});
				
			}
		});
	});
	
}


function startTab3(stock_uid){
	startDatatableTab3();
	loadProductRemaining(stock_uid);
	loadMainPriceTable(stock_uid);
	loadSecondPriceTable(stock_uid);
}

var join_stock_table;

var drugTab4Config = {
	join_url:config.base_url+"stock/api/drugs_api/get_join_product",
	add_join_stock_url:config.base_url+"stock/api/drugs_api/add_join_stock_url",
	del_join_stock_url:config.base_url+"stock/drugs/delRelated",
	get_stock_url:config.base_url+"stock/api/drugs_api/getStock",
	join_stock_table:"#join_stock_table",
	searchTable:"#searchTable",
	modal_container:"#modal_container",
	myModalStockCutJoinProduct:"#myModalStockCutJoinProduct"
	
};

function startDatatableTab4_service(){
	join_stock_table = $(drugTab4Config.join_stock_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "10%" },
				{"width": "10%" },
				{"width": "30%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
	
}


function loadJoinProduct_service(stock_uid){
	console.log(stock_uid);
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab4Config.join_url,
		success: function(json){
			
			var total_list = 0;
			var total_price = 0;
			
			var json = JSON.parse(json);
			join_stock_table.clear();
			for(var i = 0;i<json.data.length;i++){
				join_stock_table.row.add(json.data[i]);
				total_price += parseInt(json.data[i][4]); 
			}
			join_stock_table.draw();
			total_list = join_stock_table.rows().count();
			
			$("#total_list").text(total_list);
			$("#total_price").text(total_price);
		}
	});
}

function initAutocomplete_service(){
	if($("#tags").length > 0 ){
		$("#tags").autocomplete({
			source: drugTab4Config.get_stock_url,
			select: function (event, ui) {
				var uid = ui.item.uid;
				var label = ui.item.label;
				var description = ui.item.description;
				var stock_category_id = ui.item.stock_category_id;
				
				var modal = "drugs";
				console.log("stock_category_id : "+stock_category_id);
				if(stock_category_id == 1){
					modal = "drugs";
				}else if(stock_category_id == 2){
					modal = "service";
				}else if(stock_category_id == 3){
					modal = "product";
				}else if(stock_category_id == 5){ 
					modal = "product";
				}else{
					modal = "drugs";
				}
				loadModalInTabService('addRelated','#myModalStockCutJoinProduct',uid,modal);
			}
		}).data("ui-autocomplete")._renderItem = function (ul,item) {
			return $('<li></li>')
			.data("item.autocomplete", item)
			.append('<div href="javascript:void(0)"><div class="row d-flex justify-content-between"><div class="col-md-2"><div class=" pl-3">'+item.label +'</div></div><div class="col-md-8"><div class="mdi mdi-needle">'+item.description+'</div></div><div class="col-md-2"><div class="mdi mdi-plus-circle text-success text-right"></div></div></div></div>')
			.appendTo(ul);
		};
	}
}

function openAddModal_service(uid){
	$(drugTab4Config.modal_container).empty();
	$(drugTab4Config.modal_container).load(config.base_url+"stock/drugs/myModalStockCutProduct/"+uid,function() {
		$(drugTab4Config.myModalStockCutJoinProduct).modal("show");
	});
}

function addJoinStock_service(){
	var formdata = $("#join_stock").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
		console.log(field.name);					  
     	dataObj[field.name] = field.value;
    });
	
	
	
	var stock_sale_price = parseInt(dataObj['stock_sale_price']);
	var add_related_stock_price_flag = $("#add_related_stock_price_flag").prop("checked");
	
	var related_stock_total_price = parseInt(dataObj['related_stock_total_price']);
	if(add_related_stock_price_flag){
		related_stock_total_price = related_stock_total_price*parseInt(dataObj['related_cutting_stock_amount']);
	}else{
		related_stock_total_price = stock_sale_price*parseInt(dataObj['related_cutting_stock_amount']);
	}
	
	var related_drug_label_when_to_eat = "";
	$(".related_drug_label_when_to_eat").each(function(){
		if($(this).prop("checked")){
			related_drug_label_when_to_eat += $(this).val()+" ";	
		}
	});
	var related_drug_label_warning_list = "";
	$(".related_drug_label_warning_list").each(function(){
		if($(this).prop("checked")){
			related_drug_label_warning_list += $(this).val()+" ";	
		}
	});
	
	dataObj['related_stock_total_price'] = related_stock_total_price;
	dataObj['related_drug_label_when_to_eat'] = related_drug_label_when_to_eat;
	dataObj['related_drug_label_warning_list'] = related_drug_label_warning_list;
	
	console.log(dataObj);
	if(!dataObj['related_cutting_stock_unit_id']){
		swal("มีบางอย่างผิดพลาด","กรุณาตั้งราคาขายหลักที่แท็บจำนวนสินค้าและราคา\nสินค้าที่จะสามารถตัดสต๊อกร่วมได้จะต้องมีการตั้งราคาขาย","","info");
		return false;
	}
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab4Config.add_join_stock_url,
		success: function(json){
			console.log(json);
			var json = JSON.parse(json);
			if(json.success){
				$(drugTab4Config.myModalStockCutJoinProduct).modal("hide");
				loadJoinProduct_service(dataObj['main_stock_uid']);
				swal("สำเร็จ","เพิ่มการตัดสต๊อคร่วมเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}


function delJoinStock_service(){
	var hasItemSelected = false;
	$(".checkitem_join").each(function(index){
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
			$(".checkitem_join").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					join_stock_table.rows(".selected").remove().draw();
					var related_stock_info_id = $(this).attr("related_stock_info_id")
					var main_stock_uid = $(this).attr("main_stock_uid")
					$.ajax({
						type: 'POST',
						data:{"related_stock_info_id":related_stock_info_id},
						url: drugTab4Config.del_join_stock_url,
						success: function(json){
							console.log("json : "+json);
							loadJoinProduct_service(main_stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}

function startTab4_service(stock_uid){
	initAutocomplete_service();
	startDatatableTab4_service();
	loadJoinProduct_service(stock_uid);
}

var drugTab5Config = {
	drug_label_save:config.base_url+"stock/api/drugs_api/drug_label_save",
	myModalSampleLabelDrug:"#myModalSampleLabelDrug"
};

function drug_label_save(){
	var warning_list = "";
	var when_to_eat = "";
	$(".when_to_eat").each(function(){
		if($(this).prop("checked")){
			when_to_eat += $(this).val()+" ";	
			$("#when_to_eat").val(when_to_eat);
		}
	});
	
	$(".warning_list").each(function(){
		if($(this).prop("checked")){
			warning_list += $(this).val()+" ";
			$("#warning_list").val(warning_list);
		}
	});
	
	var formdata = $("#save_drug_label").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	
	
	

	console.log(dataObj);
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab5Config.drug_label_save,
		success: function(json){
			
			var json = JSON.parse(json);
			if(json.success){
				switchEdit(false);
				swal("สำเร็จ","บันทึกฉลากยาเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}




var income_table;

var drugTab6Config = {
	income_url:config.base_url+"stock/api/drugs_api/get_incoming_by_id",
	del_income_url:config.base_url+"stock/drugs/del_incoming_by_id",
	income_table:"#income_table",
	commas:function(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
};

function startDatatableTab6(){
	income_table = $(drugTab6Config.income_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
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


function loadIncome(stock_uid){
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid},
		url: drugTab6Config.income_url,
		success: function(json){
			
			var json = JSON.parse(json);
			
			
			var total_price = 0;
			var amount = 0;
			income_table.clear();
			for(var i = 0;i<json.data.length;i++){
				income_table.row.add(json.data[i]);
				total_price += parseInt(json.data[i][5]);
				amount += parseInt(json.data[i][4]);
			}
			income_table.draw();
			console.log(total_price);
			var cost_average = Math.round(total_price/amount);
			total_price = drugTab6Config.commas(total_price);
			if(isNaN(cost_average))cost_average = 0;
			$("#cost_average").text(drugTab6Config.commas(cost_average));
			$("#total_price_tab6").text(total_price);
			
		}
	});
}

function delIncomeStock(){
	var hasItemSelected = false;
	$(".checkitem_income").each(function(index){
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
			$(".checkitem_income").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					income_table.rows(".selected").remove().draw();
					var income_id = $(this).attr("income_id");
					var stock_uid = $(this).attr("stock_uid")
					$.ajax({
						type: 'POST',
						data:{"id":income_id},
						url: drugTab6Config.del_income_url,
						success: function(json){
							console.log("json : "+json);
							loadIncome(stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}
function startTab6(stock_uid){
	startDatatableTab6();
	loadIncome(stock_uid);
}

var use_history_table;

var drugTab7Config = {
	use_history_url:config.base_url+"stock/api/drugs_api/get_use_history_by_id",
	del_history_url:config.base_url+"stock/drugs/del_use_history_by_id",
	use_history_table:"#use_history_table",
	commas:function(value) {
			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
};


function startDatatableTab7(){
	use_history_table = $(drugTab7Config.use_history_table).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 5,
		"dom": ' tpi', 
		"order": [],
		"columns": [
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
		 ]
	});
}


function loadUseHistory(stock_uid,startDate,endDate){
	if(!startDate)startDate = 0;
	if(!endDate)endDate = 0;
	$.ajax({
		type: 'POST',
		data:{'stock_uid':stock_uid,'startDate':startDate,'endDate':endDate},
		url: drugTab7Config.use_history_url,
		success: function(json){
			var json = JSON.parse(json);
			var total_number = 0;
			var total_price = 0;
			use_history_table.clear();
			for(var i = 0;i<json.data.length;i++){
				use_history_table.row.add(json.data[i]);
				total_number += parseInt(json.data[i][1]);
				total_price += parseInt(json.data[i][2]);
			}
			console.log(total_price);
			use_history_table.draw();
			total_price = (drugTab7Config.commas(total_price));
			$("#total_number").text(drugTab7Config.commas(total_number));
			$("#total_price_tab7").text(total_price);
		}
	});
}

function delUseHistoryStock(){
	var hasItemSelected = false;
	$(".checkitem_history").each(function(index){
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
			$(".checkitem_history").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					use_history_table.rows(".selected").remove().draw();
					var history_id = $(this).attr("history_id");
					var stock_uid = $(this).attr("stock_uid")
					$.ajax({
						type: 'POST',
						data:{"id":history_id},
						url: drugTab7Config.del_history_url,
						success: function(json){
							console.log("json : "+json);
							loadUseHistory(stock_uid);
						}
					});
				}
			});
		});
	}else{
		swal("กรุณาเลือกอย่างน้อย 1 รายการ");
	}
}
function startTab7(stock_uid){
	startDatatableTab7();
	loadUseHistory(stock_uid);
}

var drugTab8Config = {
	save_other_url:config.base_url+"stock/api/drugs_api/save_other"
};

function save_other(){
	
	var formdata = $("#save_other").serializeArray();
	var dataObj = new Object();
	$(formdata).each(function(i, field){
     	dataObj[field.name] = field.value;
    });
	
	
	$.ajax({
		type: 'POST',
		data:dataObj,
		url: drugTab8Config.save_other_url,
		success: function(json){
			
			var json = JSON.parse(json);
			if(json.success){
				swal("สำเร็จ","บันทึกข้อมูลเรียบร้อยแล้ว","","success");
			}else{
				
			}
		}
	});
}





var defaultData = new Array();
var filtering = new Object();
var stock_table;

var stockConfig = {
	isShowContextMenu:true,
	test_url:config.base_url+"stock/api/stock_api/test",
	transfer_url:config.base_url+"stock/api/stock_api/transfer",
	stock_url:config.base_url+"stock/api/stock_api/getStock",
	stock_type_url:config.base_url+"stock/api/stock_api/getStockType",
	stock_type_sub_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategory",
	stock_type_sub_other_url:config.base_url+"stock/api/stock_api/getStockTypeSubCategoryOther",
	stock_edit_cate_url:config.base_url+"stock/api/stock_api/getStockTypeByID",
	stock_edit_subcate_url:config.base_url+"stock/api/stock_api/getSubCategoryByID",
	del_item_list:config.base_url+"stock/api/stock_api/del_item_list",
	modal_cate_id:"#myModalEditCategoryAndService",
	modal_transfer_id:"#tranfer_modal",
	modal_transfer_category_id:"#tranfer_category_modal",
	del_category_url:config.base_url+"stock/delCategory",
	del_subcategory_url:config.base_url+"stock/delSubCategory",
	modal_sub_cate_id:"#myModalAdd_sub",
	modal_edit_subcat_id:"#myModalEdit_sub",
	modal_add_product:"#myModalAddProductDrug",
	modal_container:"#modal_container",
	warehouse_id:"#warehouse_id", 
	type_id:"#type_id",
	status_id:"#status_id",
	used_id:"#used_id",
	price_id:"#price_id",
	treeview:"#treeview",
	searchTable:"#search_table",
	datatable:"#stock_datatable",
	listGroup:".list-group-item"
};

function startDatatable(){
	stock_table = $(stockConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"pageLength": 25,
		"dom": ' tpi', 
		"buttons": [
            'print'
        ],
		"columns": [
				{"width": "5%" },
				{"width": "15%" },
				{"width": "40%" },
				{"width": "20%" },
				{"width": "20%" }
		 ],
		
        
        
		
		"ajax": {
			"url": stockConfig.stock_url,
			"type": "POST",
			"data": function ( d ) {
				
			}
		  }
	});
}



loadStockType();
startDatatable();

function loadStock(filtering){
	$.ajax({
		type: 'POST',
		data:filtering,
		url: stockConfig.stock_url,
		success: function(json){
			
			var json = JSON.parse(json);
			
			stock_table.clear();
			for(var i = 0;i<json.data.length;i++){
				stock_table.row.add(json.data[i]);
			}
			stock_table.draw();
		}
	});
}


function loadStockType(){
	$.ajax({
		type: 'POST',
		url: stockConfig.stock_type_url,
		success: function(json){
			var json = JSON.parse(json);
			for(var i = 0;i < json.length;i++){
				
				var id = json[i].id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_category_id;	
				var typename = json[i].typename;
				
				var obj = new Object();
				obj.db_id = id;
				obj.text = typename;
				obj.href =  '#'+encodeURIComponent(typename);
				obj.tags = ['0'];
				obj.level = 1;
				obj.state = {
					checked: false,
					disabled: false,
					expanded: false,
					selected: false
			  	};
				defaultData.push(obj);
				
				loadStockTypeSubCategory(obj,id);
				initTreeview(defaultData);
			}
		}
	});
}

function loadStockTypeSubCategory(category,stock_type_id){
	$.ajax({
		type: 'POST',
		url: stockConfig.stock_type_sub_url,
		data:{"stock_type_id":stock_type_id},
		success: function(json){
			var json = JSON.parse(json);
			if(json.length){
				category.nodes = new Array();
			}
				
			for(var i = 0;i < json.length;i++){
				
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;

				var obj = new Object();
				obj.db_id = id;
				obj.stock_sub_category_id = id;
				obj.text = typename;
				obj.href =  '#'+encodeURIComponent(typename);
				obj.tags = ['0'];
				obj.level = 2;
				category.nodes.push(obj);
				loadStockTypeSubCategoryOther(obj,id);
				initTreeview(defaultData);
			}
			
		}
	});
}

function loadStockTypeSubCategoryOther(category,stock_sub_category_id){
	$.ajax({
		type: 'POST',
		url: stockConfig.stock_type_sub_other_url,
		data:{"stock_sub_category_id":stock_sub_category_id},
		success: function(json){
			var json = JSON.parse(json);
			if(json.length){
				category.nodes = new Array();
			}
			for(var i = 0;i < json.length;i++){
				
				var id = json[i].stock_sub_category_id;
				var icon_path = json[i].icon_path;	
				var other_stock_main_category_id = json[i].other_stock_main_category_id;	
				var stock_category_id = json[i].stock_sub_category_id;	
				var typename = json[i].stock_sub_category_name_th;

				var obj = new Object();
				obj.db_id = id;
				obj.stock_sub_category_id = id;
				obj.text = typename;
				obj.href =  '#'+encodeURIComponent(typename);
				obj.tags = ['0'];
				obj.level = 3;
				category.nodes.push(obj);
				
				
			}
			initTreeview(defaultData);
			fntreeview();
			
		}
	});
	
}


function initTreeview(data){
	$(stockConfig.treeview).treeview({
	  selectedBackColor: "#03a9f3",
	  onhoverColor: "rgba(0, 0, 0, 0.05)",
	  expandIcon: 'ti-plus',
	  collapseIcon: 'ti-minus',
	  nodeIcon: 'fa fa-folder',
	  enableLinks: true,
	  data: data,
	  onNodeSelected:function(event, node){
		  var level = node.level;
		  var db_id = node.db_id;
		  var parentId = node.parentId;
		  $(stockConfig.type_id).val(0);
		  if(level == 1){
			  $(stockConfig.type_id).val(db_id);
			  filtering.stock_sub_category_id = 0;
			  filteringOption();
		  }else{
			  $(stockConfig.listGroup).each(function(){
					if($(this).attr("data-nodeid") == parentId){
						$(stockConfig.type_id).val(parseInt($(this).attr('db_id')));
					}
		  	  });
			  filtering.stock_sub_category_id = db_id;
			  filteringOption();
		  }
		  stockConfig.timeout_id = setTimeout(fntreeview,100);
	  }
	});
}

var isShowing = false;
function fntreeview(){
	clearTimeout(stockConfig.timeout_id);
	$(stockConfig.listGroup).mousedown(function(event) {
												
	  var level = $(this).attr("data-level");
	  var db_id = $(this).attr("db_id");
	  var isShowAddSubcategory = "display:auto";
	  if(level > 2)isShowAddSubcategory = "display:none";
	  
	  if(event.which == 3){
		$(stockConfig.listGroup).removeClass('show');
		$(stockConfig.listGroup+'.dropright .dropdown-toggle').attr("aria-expanded",true);
		$(stockConfig.listGroup+'.dropright .dropdown-menu').remove();
		console.log("db_id : "+db_id);
		var dropdownmenulevel1 = '<div class="dropdown-menu r-0 t-0" style="z-index: 1;">'+
		  '<button onClick="editCategory('+db_id+');" class="dropdown-item" type="button" data-target="'+stockConfig.modal_cate_id+'">แก้ไขข้อมูล</button>'+
		  '<div class="dropdown-divider"></div>'+
		  '<button onClick="addSubCategory('+db_id+','+level+');" class="dropdown-item" type="button" data-target="'+stockConfig.modal_sub_cate_id+'">เพิ่มหมวดหมู่ย่อย</button>'+
		  '<div class="dropdown-divider"></div>'+
		  '<a href="'+stockConfig.del_category_url+'/'+db_id+'" class="dropdown-item" >ลบ</a>'+
		'</div>';
		
		var dropdownmenulevel2 = '<div class="dropdown-menu r-0 t-0">'+
		  '<button onClick="editSubCategory('+db_id+');" class="dropdown-item" type="button" data-target="'+stockConfig.modal_edit_subcat_id+'">แก้ไขข้อมูล</button>'+
		  '<div class="dropdown-divider" style="'+isShowAddSubcategory+'"></div>'+
		  '<button onClick="addSubCategory('+db_id+','+level+');" style="'+isShowAddSubcategory+'" class="dropdown-item" type="button" data-target="'+stockConfig.modal_sub_cate_id+'">เพิ่มหมวดหมู่ย่อย</button>'+
		  '<div class="dropdown-divider"></div>'+
		  '<a href="'+stockConfig.del_subcategory_url+'/'+db_id+'" class="dropdown-item" >ลบ</a>'+
		'</div>';
		
		if(level == 1){
		  $(this).append(dropdownmenulevel1);
		}else{
		 
		  $(this).append(dropdownmenulevel2);
		}
		
		$(this).addClass('show');  
		$(stockConfig.listGroup+'.dropright.show .dropdown-toggle').attr("aria-expanded",true);
		$(stockConfig.listGroup+'.dropright.show .dropdown-menu').addClass('show');
	  }
	  isShowing = true;
	  
	  
	});
}


$(stockConfig.searchTable).on('keyup change', function () {
	
	
	stock_table.search(this.value).draw();
});

function editCategory(stock_type_id){
	
	$(stockConfig.modal_cate_id).modal('show');
	$.ajax({
		type: 'POST',
		url: stockConfig.stock_edit_cate_url,
		data: {'stock_type_id':stock_type_id},
		success: function(json){
			
			var json = JSON.parse(json);
			
			var id = json[0].id;
			var stock_type_id = json[0].stock_type_id;
			var typename = json[0].typename;
			var typename_en = json[0].typename_en;
			var stock_type_code = json[0].stock_type_code;
			var stock_category_id = json[0].stock_category_id;
			var stock_type_bill_th_1 = json[0].stock_type_bill_th_1;
			var stock_type_bill_en_1 = json[0].stock_type_bill_en_1;
			var is_short_label = json[0].is_short_label;
			
			$("#id").val(id);
			$("#stock_type_id").val(id);
			$("#typename").val(typename);
			$("#typename_en").val(typename_en);
			$("#stock_type_code").val(stock_type_code);
			$("#current_stock_category_id").val(stock_category_id);
			$("#stock_category_id").val(stock_category_id);
			$("#stock_type_bill_th_1").val(stock_type_bill_th_1);
			$("#stock_type_bill_en_1").val(stock_type_bill_en_1);
			$("#is_short_label").prop('checked', is_short_label);
		}
	});
}

function addSubCategory(stock_type_id,category_level){
	
	if(category_level == 1){
		$(stockConfig.modal_sub_cate_id).modal('show');
		$("#myModalAdd_sub #stock_type_id").val(stock_type_id);
	}else{
		$.ajax({
			type: 'POST',
			url: stockConfig.stock_edit_subcate_url,
			data: {'stock_sub_category_id':stock_type_id},
			success: function(json){
				$(stockConfig.modal_sub_cate_id).modal('show');
				var json = JSON.parse(json);
				var stock_sub_category_root_id = json[0].stock_sub_category_id;
				var stock_type_id = json[0].stock_type_id;
				
				$(stockConfig.modal_sub_cate_id+" #stock_sub_category_root_id").val(stock_sub_category_root_id);
				$(stockConfig.modal_sub_cate_id+" #stock_type_id").val(stock_type_id);
				
			}
		});
	}
}
function editSubCategory(stock_sub_category_id){
	$(stockConfig.modal_edit_subcat_id).modal('show');
	$.ajax({
		type: 'POST',
		url: stockConfig.stock_edit_subcate_url,
		data: {'stock_sub_category_id':stock_sub_category_id},
		success: function(json){
			var json = JSON.parse(json);
			
			var stock_sub_category_name_en = json[0].stock_sub_category_name_en;
			var stock_sub_category_name_th = json[0].stock_sub_category_name_th;
			var stock_sub_category_root_id = json[0].stock_sub_category_root_id;
			var stock_sub_category_id = json[0].stock_sub_category_id;
			var stock_type_id = json[0].stock_type_id;
			var bill_info_th = json[0].bill_info_th;
			var labs_type = json[0].labs_type;
			var show_bill_info_flag = json[0].show_bill_info_flag;
			
			
			$(stockConfig.modal_edit_subcat_id+" #labs_type").val(labs_type);
			$(stockConfig.modal_edit_subcat_id+" #stock_sub_category_name_en").val(stock_sub_category_name_en);
			$(stockConfig.modal_edit_subcat_id+" #stock_sub_category_name_th").val(stock_sub_category_name_th);
			$(stockConfig.modal_edit_subcat_id+" #stock_sub_category_root_id").val(stock_sub_category_root_id);
			$(stockConfig.modal_edit_subcat_id+" #stock_sub_category_id").val(stock_sub_category_id);
			$(stockConfig.modal_edit_subcat_id+" #bill_info_th").val(bill_info_th);
			$(stockConfig.modal_edit_subcat_id+" #stock_type_id").val(stock_type_id);
			$(stockConfig.modal_edit_subcat_id+" #show_bill_info_flag").prop("checked",show_bill_info_flag);
		}
	});
}

function filteringOption(){
	
	var warehouse_id = $(stockConfig.warehouse_id).val();
	var type_id = $(stockConfig.type_id).val();
	var status_id = $(stockConfig.status_id).val();
	var used_id = $(stockConfig.used_id).val();
	var price_id = $(stockConfig.price_id).val();
	
	
	
	
	
	filtering.warehouse_id = warehouse_id;
	filtering.type_id = type_id;
	filtering.status_id = status_id;
	filtering.used_id = used_id;
	filtering.price_id = price_id;
	
	
	loadStock(filtering);
	console.log(warehouse_id+" | "+type_id+" | "+status_id+" | "+used_id+" | "+price_id+" | "+filtering.stock_sub_category_id);	
}


function delItem(){
	var hasItemSelected = false;
	$(".checkitemlist").each(function(index){
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
			$(".checkitemlist").each(function(index){
				if($(this).prop('checked')){
					$(this).parent().parent().addClass("selected");
					stock_table.rows(".selected").remove().draw();
					var uid = $(this).attr("uid");
					$.ajax({
						type: 'POST',
						data:{"uid":uid},
						url: stockConfig.del_item_list,
						success: function(json){
							
							loadUseHistory(uid);
						}
					});
				}
			});
		});
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}



function transferItemCategory(){
	var hasItemSelected = false;
	$(".checkitemlist").each(function(index){
		if($(this).prop('checked')){
			hasItemSelected = true;
		}
	});
	if(hasItemSelected){
		var stock_uid_list = new Array();
		$(".checkitemlist").each(function(index){
			if($(this).prop('checked')){
				var uid = $(this).attr("uid");
				stock_uid_list.push(uid);
			}
		});
		loadTransferCategoryModal(stock_uid_list);
	
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}



function loadTransferCategoryModal(stock_uid_list){
	$(stockConfig.modal_container).empty();
	$(stockConfig.modal_container).load(config.base_url+"stock/transfer_category_modal/",{ 'stock_uid_list':stock_uid_list },function() {
		$(stockConfig.modal_transfer_category_id).modal("show");
	});
}

function transferItem(){
	var hasItemSelected = false;
	$(".checkitemlist").each(function(index){
		if($(this).prop('checked')){
			hasItemSelected = true;
		}
	});
	if(hasItemSelected){
		var stock_uid_list = new Array();
		$(".checkitemlist").each(function(index){
			if($(this).prop('checked')){
				var uid = $(this).attr("uid");
				stock_uid_list.push(uid);
			}
		});
		loadTransferModal(stock_uid_list);
	
	}else{
		swal("มีบางอย่างผิดพลาด","กรุณาเลือกอย่างน้อย 1 รายการ","info");
	}
}



function loadTransferModal(stock_uid_list){
	$(stockConfig.modal_container).empty();
	$(stockConfig.modal_container).load(config.base_url+"stock/transfer_modal/",{ 'stock_uid_list':stock_uid_list },function() {
		$(stockConfig.modal_transfer_id).modal("show");
	});
}





this.addEventListener('mousedown',function(e){
	
});
$(stockConfig.modal_sub_cate_id).on('hidden.bs.modal', function (){
    fntreeview();
});
$(stockConfig.modal_edit_subcat_id).on('hidden.bs.modal', function (){
    fntreeview();
});
this.addEventListener('contextmenu', function(e) {
	if(!stockConfig.isShowContextMenu)e.preventDefault();
    fntreeview();		
    return false;
}, false);


       