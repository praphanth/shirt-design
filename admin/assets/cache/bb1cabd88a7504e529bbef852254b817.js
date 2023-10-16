function el(id){return document.getElementById(id);} 

function sendFinance() {
  el('petdeposit_form').action = 'save/finance';
  el('petdeposit_form').submit();
}

petdepositConfig = {
	admit_since_date : '.admit_since_date',
	admit_since_time : '.admit_since_time',
    admit_price : '.admit_price',
	admit_per_time : '.admit_per_time',
    total_admit : '.total_admit',
	admit_per_night : '.admit_per_night',
	cage : '#cage',
	cage_cate : '.cage_cate',
	cage_name : '.cage_name',
    cage_size : '.cage_size',
    cage_id : '#cage_id',
    item_lists : '#item-lists',
	list : '#list-',
    labinhouse_link : '.labinhouse_link_',
    labinhouse_checkbox_category_ : '#labinhouse_checkbox_category_', 
    labinhouse_checkbox_stock_ : '#labinhouse_checkbox_stock_',
    inputradiolab : '.inputradiolab',
    inputradiolabsub : '.inputradiolabsub',
    labcategory_checkbox : '.labcategory_checkbox',
    labcategory_input : '.labcategory_input',
    outlab_link : '.outlab_link_',
    outlab_checkbox_category_ : '#outlab_checkbox_category_',  
    outlab_checkbox_stock_ : '#outlab_checkbox_stock_',
    modal_container : '#modal_container',
    modal_sub : '#modal_sub',
    Drug_usefor : '#Drug_usefor',
    monitor_time : '#monitor_time',
    row_monitor_ : '#row_monitor_',
    mock_row_monitor_ : '#mock_row_monitor_',
    row_monitor_ : '#row_monitor_',
    modalmonitor : '#modalmonitor',
    editmodelRelateddrug_url:config.base_url+"petdeposit/api/petdeposit_modal/edit_model_related_list_drug",
    petdeposit_delete_url:config.base_url+"petdeposit/deleteMonitor",
};

var modalPetdeposit = {
    modalcage : {'modalId':"#modalcage",'linkurl': Config.base_url+'petdeposit/api/petdeposit_modal/modal_cage'},
    modalinhouselab : {'modalId':"#myModal1",'linkurl': Config.base_url+'petdeposit/api/petdeposit_modal/modal_inhouselab'},
    modaloutlab : {'modalId':"#myModal2",'linkurl': Config.base_url+'petdeposit/api/petdeposit_modal/modal_outlab'},
    modalmonitor_eat : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'petdeposit/api/petdeposit_modal/modal_monitor/eat'},
    modalmonitor_general : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'petdeposit/api/petdeposit_modal/modal_monitor/general'},

};

function loadModal(obj,item = '',empty = true){

    var cage_name = $(petdepositConfig.cage_name).val();
    var cage_cate = $(petdepositConfig.cage_cate).val();
    var cage_size = $(petdepositConfig.cage_size).val();

    if(empty){
        $(petdepositConfig.modal_container).empty();
        div_modal = petdepositConfig.modal_container;
    }else{
        $(petdepositConfig.modal_sub).empty();
         div_modal = petdepositConfig.modal_sub;
    }
    $(div_modal).load(modalPetdeposit[obj].linkurl+'/'+item,function() {
        
        $(modalPetdeposit[obj].modalId).on('shown.bs.modal', function () {
            $(petdepositConfig.cage_name).val(cage_name);
            $(petdepositConfig.cage_cate).val(cage_cate);
            $(petdepositConfig.cage_size).val(cage_size);
        }); 
        
        $(modalPetdeposit[obj].modalId).modal("show");
    });
}


var submitmonitor = {
    monitor_eat : {'form':"monitor_eat_form",'type':"eat",'link':"savemonitor"},
    monitor_body : {'form':"monitor_body_form",'type':"body",'link':"savemonitor"},
    monitor_general : {'form':"monitor_general_form",'type':"general",'link':"savemonitor"},
    monitor_other :{'form':"monitor_other_form",'type':"other",'link':"savemonitor"},
    monitor_plan : {'form':"monitor_plan_form",'type':"plan",'link':"savemonitor"},
    monitor_talk : {'form':"monitor_talk_form",'type':"talk",'link':"savemonitor"},
};

var MonitorConfig = {
    monitor_eat_type : 'ชนิดอาหารที่กิน : ',
    monitor_eat_isme : 'กินเองหรือป้อน : ',
    monitor_eat_cc : 'ปริมาณที่กินหรือป้อน : ',
    monitor_body_f : 'อุณหภูมิ : ',
    monitor_body_hr : 'Hr : ',
    monitor_body_rr : 'Rr : ',
    monitor_body_ls : 'Ls : ',
    monitor_body_bp : 'Bp : ',
    monitor_body_mm : 'Mm : ',
    monitor_body_crt : 'CRT : ',
    monitor_body_uop : 'UOP : ',
    monitor_general_urine : 'สีปัสวะ : ',
    monitor_general_urine_cc : 'ปริมาณ : ',
    monitor_general_vomit : 'ลักษณะที่อาเจียนออกมา : ',
    monitor_general_vomit_cc  : 'ปริมาณ : ',
    monitor_general_oh : 'ลักษณะอุจระที่ออกมา : ',
    monitor_general_oh_cc : 'ปริมาณ : ',
    monitor_general_cough : 'ลักษณะไอ : ',
    monitor_general_whip : 'ลักษณะอาการที่ชัก : ',
    monitor_general_whip_long : 'ระยะเวลาที่ชักนาน : ',
    monitor_general_coma : 'Coma score : ',
    monitor_other_content : '',
    monitor_plan_content : '',
    monitor_talk_content : '',
};

var number_monitor = 0;
function submitMonitor(typeform,event = 'ADD'){
    var myform = document.getElementById(submitmonitor[typeform].form);
    var form_data = new FormData(myform);

    
    $.ajax({    
        url: Config.base_url+'petdeposit/api/petdeposit_api/'+submitmonitor[typeform].link+'/'+submitmonitor[typeform].type,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: form_data,
           
        success: function (data) {
            var data = JSON.parse(data);
            var content = '';
            var input = '';
            var time = '';
            var checkval = false;

            if(key == 'veterinary'){
                swal('ข้อความากระบบ','กรุณากรกอกข้อมูล');
                return false;
            }

            if(key == 'assistant'){
                swal('ข้อความากระบบ','กรุณากรกอกข้อมูล');
                return false;
            }

            for (var key in data) {
                if (!data.hasOwnProperty(key)) continue;
                var obj = data[key];   

                
                if(key != 'assistant'){
                    if(key != 'veterinary'){
                        if(!key.includes('time')){

                            if(obj != ''){
                                if(key != 'assistant_name'){
                                    if(key != 'veterinary_name'){
                                        content += MonitorConfig[key]+obj+'<br>';
                                        checkval = true;
                                    }
                                }
                            }
                            
                        }else{
                            if(obj != ''){
                                time += obj+'<br>';
                                if(key.includes('general')){
                                    if(!key.includes('cough')){
                                        if(!key.includes('long')){
                                            time += '<br>';
                                        } 
                                    }
                                }
                                checkval = true;
                            }
                        }
                    }
                }

                if(event == 'ADD'){ 
                    if(obj != ''){
                        if(key != 'assistant_name'){
                            if(key != 'veterinary_name'){
                                
                                input += '<input id="mock_'+key+'_'+number_monitor+'" type="hidden" data-name="'+key+'" name="monitor_'+submitmonitor[typeform].type+'['+number_monitor+']['+key+']" value="'+obj+'">';
                            }
                        }
                    }
                }

                if(event.includes('EDIT')){
                    event_arr = event.split("_");
                    edit_number_monitor = event_arr[1];
                    $('#mock_'+key+'_'+number_monitor).val(obj); 
                }

            }
            if(event == 'ADD'){        
                var add_row = '<div id="mock_row_monitor_'+submitmonitor[typeform].type+'_'+number_monitor+'" class="row">'+input+
                                '<div id="mock_time_'+number_monitor+'" class="col-2 text-center">'+time+'</div>'+
                                '<div id="mock_content_'+number_monitor+'" class="col-4 text-left">'+content+'</div>'+
                                '<div id="mock_content_assistant_'+number_monitor+'" class="col-2 text-center">'+data['assistant_name']+'</div>'+
                                '<div id="mock_content_veterinary_'+number_monitor+'" class="col-2 text-center">'+data['veterinary_name']+'</div>'+
                                '<div class="col-1 text-center"><button onclick="editMockRowMonitor(\'modalmonitor_'+submitmonitor[typeform].type+'\',\''+
                                number_monitor+'\',\''+submitmonitor[typeform].type+'\');" type="button" class="btn btn-warning btn-block"><i class="mdi mdi-pencil"></i></button><br></div>'+
                                '<div class="col-1 text-center"><button onclick="deleteMockRowMonitor('+number_monitor+',\''+submitmonitor[typeform].type
                                +'\');" type="button" class="btn btn-danger btn-block"><i class="mdi mdi-delete-empty"></i></button><br></div>'+
                            '</div>';
                if(checkval){
                    $('#monitor_'+submitmonitor[typeform].type).append(add_row);
                }else{
                    swal('ข้อความากระบบ','กรุณากรกอกข้อมูล');
                }  
                number_monitor++;
                
            }
            
            if(event.includes('EDIT')){
                $('#mock_time_'+edit_number_monitor).empty();
                $('#mock_content_'+edit_number_monitor).empty();
                $('#mock_content_assistant_'+edit_number_monitor).empty();
                $('#mock_content_veterinary_'+edit_number_monitor).empty();

                $('#mock_time_'+edit_number_monitor).append(time);
                $('#mock_content_'+edit_number_monitor).append(content);
                $('#mock_content_assistant_'+edit_number_monitor).append(data['assistant_name']);
                $('#mock_content_veterinary_'+edit_number_monitor).append(data['veterinary_name']);
            }
            checkvalueModal();
        }
    });
}

function deleteMockRowMonitor(number_monitor,type){
    $(petdepositConfig.mock_row_monitor_+type+'_'+number_monitor).remove();
}

function editMockRowMonitor(obj,number_monitor,type){
    var input = $(petdepositConfig.mock_row_monitor_+type+'_'+number_monitor+' input');
    
    for (var i = 0; i < input.length; i++) {
        key = input[i].getAttribute('data-name');
        item = input[i].getAttribute('value');
        $('#'+key).val(item);
    }

    $("#modal_container").load(modalPetdeposit[obj].linkurl+'/'+queue_uid+'/EDIT_'+number_monitor,function(){
        $(modalPetdeposit[obj].modalId).on('shown.bs.modal', function () {

            for (var i = 0; i < input.length; i++) {
                key = input[i].getAttribute('data-name');
                item = input[i].getAttribute('value');
                $('#'+key).val(item);
            }

        });

        $(modalPetdeposit[obj].modalId).modal('show');
        
    });
}


var id = document.getElementsByClassName("admit_price");

function priceTotalmain(){
   
	var admit_price = id[0].value;
    if(id.length > 1 ){
        id[1].value = admit_price;
    }
    
    var admit_since_date = $(petdepositConfig.admit_since_date).val();
    console.log(admit_since_date);
    date_arr = admit_since_date.split("-");
    admit_since_date = date_arr[2]+'-'+date_arr[1]+'-'+date_arr[0];

    var admit_since_time = $(petdepositConfig.admit_since_time).val();
    console.log(admit_since_time);
    var date1 = new Date(admit_since_date+' '+admit_since_time);
    var date2 = new Date();
    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    

    diffDays = Math.floor(diffTime/1000/60/60/24);  
    diffTime -= diffDays*1000*60*60*24;

    diffHour = Math.floor(diffTime/1000/60/60);  
    diffTime -= diffHour*1000*60*60;

    diffMin = Math.floor(diffTime/1000/60); 
    diffTime -= diffMin*1000*60;

    diffSec = Math.floor(diffTime/1000);  

    diffHour = diffHour < 10 ? '0'+diffHour : diffHour; 
    diffMin = diffMin < 10 ? '0'+diffMin : diffMin;
    diffSec = diffSec < 10 ? '0'+diffSec : diffSec;

    curr_time = diffHour+':'+diffMin+':'+diffSec;
    console.log(curr_time);

    var total = parseInt(admit_price)*parseInt(diffDays);
    $(petdepositConfig.total_admit).val(total);
    $(petdepositConfig.admit_per_time).val(curr_time);
}
priceTotalmain();

function checkvalue(){
    var check_total_admit = document.getElementsByClassName("total_admit");
    id[1].value = id[0].value; 
    check_total_admit[1].value = check_total_admit[0].value;

    var check_per_night = document.getElementsByClassName("admit_per_night");
    check_per_night[1].value = check_per_night[0].value; 
    var check_per_time = document.getElementsByClassName("admit_per_time");
    check_per_time[1].value = check_per_time[0].value;

    var check_petfollow = document.getElementsByClassName("petfollow");
    check_petfollow[1].value = check_petfollow[0].value;

    var check_pettemperature = document.getElementsByClassName("pet_temperature");
    check_pettemperature[1].value = check_pettemperature[0].value;

    var check_petweight = document.getElementsByClassName("pet_weight");
    check_petweight[1].value = check_petweight[0].value;

    var check_petnote = document.getElementsByClassName("petnote");
    check_petnote[1].value = check_petnote[0].value;

    var check_ward_type = document.getElementsByClassName("ward_type");
    check_ward_type[1].value = check_ward_type[0].options[check_ward_type[0].selectedIndex].value;

    var check_admit_doctor_name = document.getElementsByClassName("admit_doctor_name");
    check_admit_doctor_name[1].value = check_admit_doctor_name[0].value;
}

function checkvalueModal(){
    var check_total_admit = document.getElementsByClassName("total_admit");
    id[0].value = id[1].value; 
    check_total_admit[0].value = check_total_admit[1].value;

    var check_per_night = document.getElementsByClassName("admit_per_night");
    check_per_night[0].value = check_per_night[1].value; 
    var check_per_time = document.getElementsByClassName("admit_per_time");
    check_per_time[0].value = check_per_time[1].value;

    var check_petfollow = document.getElementsByClassName("petfollow");
    check_petfollow[0].value = check_petfollow[1].value;

    var check_petnote = document.getElementsByClassName("petnote");
    check_petnote[0].value = check_petnote[1].value;

    var check_ward_type = document.getElementsByClassName("ward_type");
    check_ward_type[0].value = check_ward_type[1].options[check_ward_type[1].selectedIndex].value;
}

function priceTotalmodal(){
    var admit_price = id[1].value;
    if(id.length > 1 ){
        id[0].value = admit_price;
    }
    var admit_since_date = $(petdepositConfig.admit_since_date).val();
     date_arr = admit_since_date.split("-");
    admit_since_date = date_arr[2]+'-'+date_arr[1]+'-'+date_arr[0];
    var admit_since_time = $(petdepositConfig.admit_since_time).val();

    var date1 = new Date(admit_since_date+' '+admit_since_time);
    var date2 = new Date();
    var diffTime = Math.abs(date2.getTime() - date1.getTime()); 
    
    diffDays = Math.floor(diffTime/1000/60/60/24);  
    diffTime -= diffDays*1000*60*60*24;

    diffHour = Math.floor(diffTime/1000/60/60);  
    diffTime -= diffHour*1000*60*60;

    diffMin = Math.floor(diffTime/1000/60); 
    diffTime -= diffMin*1000*60;

    diffSec = Math.floor(diffTime/1000);  

    diffHour = diffHour < 10 ? '0'+diffHour : diffHour; 
    diffMin = diffMin < 10 ? '0'+diffMin : diffMin;
    diffSec = diffSec < 10 ? '0'+diffSec : diffSec;

    curr_time = diffHour+':'+diffMin+':'+diffSec;

    var total = parseInt(admit_price)*parseInt(diffDays);
    $(petdepositConfig.total_admit).val(total);
}

function calDayDeposit(){
    var admit_since_date = $(petdepositConfig.admit_since_date).val();
    date_arr = admit_since_date.split("-");
    admit_since_date = date_arr[2]+'-'+date_arr[1]+'-'+date_arr[0];

    var admit_since_time = $(petdepositConfig.admit_since_time).val();

    var date1 = new Date(admit_since_date+' '+admit_since_time);
    var date2 = new Date();
    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    

    diffDays = Math.floor(diffTime/1000/60/60/24);  

    $(petdepositConfig.admit_per_night).val(diffDays);
    $(petdepositConfig.admit_per_time).val(curr_time);
}

calDayDeposit();


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
$(petdepositConfig.admit_since_date).datepicker({
		format: 'yyyy-m-d',
		language:"th-th",
		todayHighlight:true,
		ignoreReadonly: true
});

$(petdepositConfig.admit_since_time+' , '+petdepositConfig.monitor_time).clockpicker({
    autoclose: true
});

function AddCage(cageid){
	var cage = el('cage'+cageid);
	cage_cate = cage.getAttribute('data-cage-cate');
	cage_name = cage.getAttribute('data-cage-name');
    cage_size = cage.getAttribute('data-cage-size');
	cage_id = cage.getAttribute('data-cage-id');

	$(petdepositConfig.cage_cate).val(cage_cate);
	$(petdepositConfig.cage_name).val(cage_name);
    $(petdepositConfig.cage_size).val(cage_size);
	$(petdepositConfig.cage_id).val(cage_id);
	$(modalPetdeposit.modalcage.modalId).modal("hide");
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
function deleteitemRowMonitor(type,uid){
    
    swal({   
        title: "แน่ใจหรือ ?",   
        text: "ท่านแน่ใจหรือว่าต้องการลบข้อมูล !",   
        type: "warning",   
        showCancelButton: true, 
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "ไช่, ต้องการลบ !",   
        closeOnConfirm: true 
    }, function(isConfirm){   
        if(isConfirm){
          $.ajax({
                type: 'POST',
                data:{
                    "uid":uid,
                    "type" : type,
                },
                url: petdepositConfig.petdeposit_delete_url,
                success: function(json){
                    $(petdepositConfig.row_monitor_+type+'_'+uid).remove();
                }
            }); 
        }else {
          
        }
    });
}
function editRowMonitor(type,uid,queue_uid){
  

    $("#edit_modal_container").empty();
    $("#edit_modal_container").load(config.base_url+"petdeposit/api/petdeposit_modal/editMonitor/"+uid+'/'+type+'/'+queue_uid,function() {
        $("#modalmonitor").modal("show");
    });
    
    
}

