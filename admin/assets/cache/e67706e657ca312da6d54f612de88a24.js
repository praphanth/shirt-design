
var defaultData = new Array();
var filtering = new Object();
var animal_table;

var dataList = new Array();

var animalConfig = {
	animal_url:config.base_url+"settings/api/animal_api/getAnimal",
	animal_delete_url:config.base_url+"settings/api/animal_api/deleteAnimal",
	animal_info_url:config.base_url+"settings/api/animal_api/getPaymentByID",
	searchTable:"#search_table",
	datatable:"#animal_datatable",
	datatable_info:"#animal_info_datatable",
	animal_container:"#animal_container",
	
};



function loadAnimalModal(_method){
	$(animalConfig.animal_container).empty();
	$(animalConfig.animal_container).load(config.base_url+"settings/"+_method,function() {
		$("#"+_method).modal("show");
	});
}
function loadAnimalModalEdit(id){
	$(animalConfig.animal_container).empty();
	$(animalConfig.animal_container).load(config.base_url+"settings/myModalEditAnimal/"+id,function() {
		$("#myModalEditAnimal").modal("show");
	});
}
function startDatatableAnimal(){
	animal_table = $(animalConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "10%" },
				{"width": "35%" },
				{"width": "35%" }
		 ],
		"ajax": {
		"url": animalConfig.animal_url,
		"data": function ( d ) {
		}
	  }
	});
	

}


$(animalConfig.searchTable).on('keyup change', function () {
	animal_table.search(this.value).draw();
});


$("#del_animal").click(function(){
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
		$(".del_animal").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				animal_table.rows(".selected").remove().draw();
				var id = $(this).val();
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: animalConfig.animal_delete_url,
					success: function(json){
						var json = JSON.parse(json);
						alert(json.success);
					}
				});
			}
		});
	});
});

function loadAnimalInfo(id){
	var data = {'id':id};
	$.ajax({
		type: 'POST',
		data:data,
		url: animalConfig.animal_info_url,
		success: function(json){
			console.log("json : "+json);
			var json = JSON.parse(json);
			animal_info_table.clear();
			for(var i = 0;i<json.data.length;i++){
				animal_info_table.row.add(json.data[i]);
			}
			animal_info_table.draw();
		}
	});
}








startDatatableAnimal();



var defaultData = new Array();
var filtering = new Object();
var cage_table;

var dataList = new Array();

var cageConfig = {
	cage_url:config.base_url+"settings/api/Cage_api/getCage",
	cage_delete_url:config.base_url+"settings/api/cage_api/deleteCage",
	cage_info_url:config.base_url+"settings/api/cage_api/getPaymentByID",
	searchTable:"#search_table",
	datatable:"#cage_datatable",
	datatable_info:"#Cage_info_datatable",
	hr_container:"#hr_container",
	
};



function loadCageModal(_method){
	$(cageConfig.hr_container).empty();
	$(cageConfig.hr_container).load(config.base_url+"settings/"+_method,function() {
		$("#"+_method).modal("show");
	});
}
function loadCageModalEdit(id){
	$(cageConfig.hr_container).empty();
	$(cageConfig.hr_container).load(config.base_url+"settings/myModalEditCage/"+id,function() {
		$("#myModalEditCage").modal("show");
	});
}
function startDatatableCage(){
	cage_table = $(cageConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "10%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" },
				{"width": "10%" }
		 ],
		"ajax": {
		"url": cageConfig.cage_url,
		"data": function ( d ) {
		}
	  }
	});

}


$(cageConfig.searchTable).on('keyup change', function () {
	cage_table.search(this.value).draw();
});


$("#del_cage").click(function(){
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
		$(".del_cage").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				cage_table.rows(".selected").remove().draw();
				var cage_id = $(this).val();
				
				$.ajax({
					type: 'POST',
					data:{"cage_id":cage_id},
					url: cageConfig.cage_delete_url,
					success: function(json){
						var json = JSON.parse(json);
						alert(json.success);
					}
				});
			}
		});
	});
});

function loadCageInfo(cage_id){
	var data = {'cage_id':cage_id};
	$.ajax({
		type: 'POST',
		data:data,
		url: cageConfig.cage_info_url,
		success: function(json){
			console.log("json : "+json);
			var json = JSON.parse(json);
			cage_info_table.clear();
			for(var i = 0;i<json.data.length;i++){
				cage_info_table.row.add(json.data[i]);
			}
			cage_info_table.draw();
		}
	});
}








startDatatableCage();



var defaultData = new Array();
var filtering = new Object();
var grooming_table;

var dataList = new Array();

var groomingConfig = {
	grooming_url:config.base_url+"settings/api/grooming_api/getGrooming",
	grooming_delete_url:config.base_url+"settings/api/grooming_api/deletegrooming",
	grooming_info_url:config.base_url+"settings/api/grooming_api/getPaymentByID",
	searchTable:"#search_table",
	datatable:"#grooming_datatable",
	datatable_info:"#grooming_info_datatable",
	grooming_container:"#grooming_container",
	
};



function loadGroomingModal(_method){
	$(groomingConfig.grooming_container).empty();
	$(groomingConfig.grooming_container).load(config.base_url+"settings/"+_method,function() {
		$("#"+_method).modal("show");
	});
}
function loadGroomingModalEdit(id){
	$(groomingConfig.grooming_container).empty();
	$(groomingConfig.grooming_container).load(config.base_url+"settings/myModalEditGrooming/"+id,function() {
		$("#myModalEditGrooming").modal("show");
	});
}
function startDatatableGrooming(){
	grooming_table = $(groomingConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "10%" },
				{"width": "35%" },
				{"width": "35%" },
				{"width": "5%" }
		 ],
		"ajax": {
		"url": groomingConfig.grooming_url,
		"data": function ( d ) {
		}
	  }
	});
	

}


$(groomingConfig.searchTable).on('keyup change', function () {
	grooming_table.search(this.value).draw();
});


$("#del_grooming").click(function(){
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
		$(".del_grooming").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				grooming_table.rows(".selected").remove().draw();
				var grooming_style_id = $(this).val();
				
				$.ajax({
					type: 'POST',
					data:{"grooming_style_id":grooming_style_id},
					url: groomingConfig.grooming_delete_url,
					success: function(json){
						var json = JSON.parse(json);
						alert(json.success);
					}
				});
			}
		});
	});
});








startDatatableGrooming();



var defaultData = new Array();
var filtering = new Object();
var settings_table;

var dataList = new Array();

var settingsConfig = {
	settings_url:config.base_url+"settings/api/settings_api/getsettings",
	settings_delete_url:config.base_url+"settings/api/settings_api/deletesettings",
	settings_info_url:config.base_url+"settings/api/settings_api/getPaymentByID",
	searchTable:"#search_table",
	datatable:"#settings_datatable",
	datatable_info:"#settings_info_datatable",
	hr_container:"#hr_container",
	
};



function loadModal(_method){
	$(settingsConfig.hr_container).empty();
	$(settingsConfig.hr_container).load(config.base_url+"settings/"+_method,function() {
		$("#"+_method).modal("show");
	});
}
function loadModalEdit(user_id){
	$(settingsConfig.hr_container).empty();
	$(settingsConfig.hr_container).load(config.base_url+"settings/myModalEditmember/"+user_id,function() {
		$("#myModalEditmember").modal("show");
	});
}
function startDatatable(){
	settings_table = $(settingsConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "5%" },
				{"width": "15%" },
				{"width": "15%" },
				{"width": "10%" },
				{"width": "30%" },
				{"width": "5%" }
		 ],
		"ajax": {
		"url": settingsConfig.settings_url,
		"data": function ( d ) {
		}
	  }
	});

}


$(settingsConfig.searchTable).on('keyup change', function () {
	settings_table.search(this.value).draw();
});


$("#del_member").click(function(){
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
		$(".del_member").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				settings_table.rows(".selected").remove().draw();
				var user_id = $(this).val();
				$.ajax({
					type: 'POST',
					data:{"user_id":user_id},
					url: settingsConfig.settings_delete_url,
					success: function(json){
						console.log(json);
						var json = JSON.parse(json);
						
					}
				});
			}
		});
	});
});

function loadsettingsInfo(settings_uid){
	var data = {'settings_uid':settings_uid};
	$.ajax({
		type: 'POST',
		data:data,
		url: settingsConfig.settings_info_url,
		success: function(json){
			console.log("json : "+json);
			var json = JSON.parse(json);
			settings_info_table.clear();
			for(var i = 0;i<json.data.length;i++){
				settings_info_table.row.add(json.data[i]);
			}
			settings_info_table.draw();
		}
	});
}








startDatatable();



var defaultData = new Array();
var filtering = new Object();
var unit_table;

var dataList = new Array();

var unitConfig = {
	unit_url:config.base_url+"settings/api/unit_api/getUnit",
	unit_delete_url:config.base_url+"settings/api/unit_api/deleteUnit",
	unit_info_url:config.base_url+"settings/api/unit_api/getPaymentByID",
	searchTable:"#search_table",
	datatable:"#unit_datatable",
	datatable_info:"#unit_info_datatable",
	hr_container:"#hr_container",
	
};



function loadUnitModal(_method){
	$(unitConfig.hr_container).empty();
	$(unitConfig.hr_container).load(config.base_url+"settings/"+_method,function() {
		$("#"+_method).modal("show");
	});
}
function loadUnitModalEdit(id){
	$(unitConfig.hr_container).empty();
	$(unitConfig.hr_container).load(config.base_url+"settings/myModalEditUnit/"+id,function() {
		$("#myModalEditUnit").modal("show");
	});
}
function startDatatableUnit(){
	console.log(unitConfig.datatable);
	unit_table = $(unitConfig.datatable).DataTable({
		"sPaginationType": "full_numbers",
		"dom": ' tpi', 
		"columns": [
				{"width": "10%" },
				{"width": "35%" },
				{"width": "35%" },
				{"width": "10%" }
		 ],
		"ajax": {
		"url": unitConfig.unit_url,
		"data": function ( d ) {
		}
	  }
	});
	

}


$(unitConfig.searchTable).on('keyup change', function () {
	unit_table.search(this.value).draw();
});


$("#del_unit").click(function(){
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
		$(".del_unit").each(function(index){
			if($(this).prop('checked')){
				$(this).parent().parent().addClass("selected");
				unit_table.rows(".selected").remove().draw();
				var id = $(this).val();
				
				$.ajax({
					type: 'POST',
					data:{"id":id},
					url: unitConfig.unit_delete_url,
					success: function(json){
						var json = JSON.parse(json);
						alert(json.success);
					}
				});
			}
		});
	});
});

function loadUnitInfo(unit_uid){
	var data = {'settings_uid':unit_uid};
	$.ajax({
		type: 'POST',
		data:data,
		url: unitConfig.unit_info_url,
		success: function(json){
			console.log("json : "+json);
			var json = JSON.parse(json);
			unit_info_table.clear();
			for(var i = 0;i<json.data.length;i++){
				unit_info_table.row.add(json.data[i]);
			}
			unit_info_table.draw();
		}
	});
}








startDatatableUnit();


