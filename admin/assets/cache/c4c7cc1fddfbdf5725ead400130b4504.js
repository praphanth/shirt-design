var addItemConfig = {
    itemlists : '#item-lists',
    liststock : '#list-stock-',
    alertamount : '#alertamount',
    sale_id : '#sale_id',
    Drug_stock_sale_price : '#Drug_stock_sale_price',
    Drug_pay_stock_qty : '#Drug_pay_stock_qty',
    Drug_pricing : '#Drug_pricing',
    Drug_valunits : '#Drug_valunits',
    Drug_discount : '#Drug_discount',
    Drug_total : '#Drug_total',
    Drug_unit_name : '#Drug_unit_name',
    Other_stock_sale_price : '#Other_stock_sale_price',
    Other_pricing : '#Other_pricing',
    Other_valunits : '#Other_valunits',
    Other_total : '#Other_total',
    Other_unit_name : '#Other_unit_name',
    Other_discount : '#Other_discount',
    div_is_liquid : '#div_is_liquid',
    div_route : '#div_route',
    ml_price : '#ml_price',
    unit_name : '#unit_name',
    Drug_usefor : '#Drug_usefor',
    warehouse_cutting : '#warehouse_cutting',
    div_Drug_discount : '#div_Drug_discount',
    div_Other_discount : '#div_Other_discount',
    modalliststockdrug : '#modalliststockdrug',
    modalliststockother : '#modalliststockother',
}

var itemUrl = {
    stock_url:config.base_url+"admit/api/admit_api/getstock",
    modeldrug_url:config.base_url+"admit/api/admit_modal/model_list_drug",
    modelother_url:config.base_url+"admit/api/admit_modal/model_list_other",
    editmodeldrug_url:config.base_url+"admit/api/admit_modal/edit_model_list_drug",
    editmodelother_url:config.base_url+"admit/api/admit_modal/edit_model_list_other",
    editmodelRelateddrug_url:config.base_url+"admit/api/admit_modal/edit_model_related_list_drug",
    saleitem_url:config.base_url+'admit/api/admit_api/saleitem',
    addpricing_url:config.base_url+'admit/api/admit_api/',
}

var addList = {
    'add':{'form':"add_form",'link':"addpricing"},
    'edit':{'form':"edit_form",'link':"editpricing"},
};

function AddPricing(form){
    var e_w_cutting = el("warehouse_cutting");

    if(e_w_cutting != null){
        if(e_w_cutting.options.length){
            var w_unit = e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-unit');
            var w_qty= e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-qty');
            $(addItemConfig.Drug_pay_stock_qty).val('คลังจ่าย '+w_qty+' '+w_unit);
        }
    }
    
    var myform = document.getElementById(addList[form].form);
    var form_data = new FormData(myform);
 
    if(stock_is_liquid  == 1){  
        var is_liquid = document.querySelector('input[name="liquid"]:checked').value; 

        var  stock_sale_price = $(addItemConfig.Drug_stock_sale_price).val();
        var  valunits = $(addItemConfig.Drug_valunits).val();
        var  discount = $(addItemConfig.Drug_discount).val();

        var e = document.getElementById("ml_price");
        if(e.options.length){
            var mltext = e.options[e.selectedIndex].text;
            var mlprice = e.options[e.selectedIndex].value;
            var mlpricetype = e.options[e.selectedIndex].getAttribute('data-price-type');
            var mluse = e.options[e.selectedIndex].getAttribute('data-use');
            var mluseto = e.options[e.selectedIndex].getAttribute('data-use-to');
            var mlid = e.options[e.selectedIndex].getAttribute('data-ml-id');

            if(is_liquid == 1){
                if(mlpricetype == 1){
                    
                }
                if(mlpricetype == 2){
                   
                }
                if(mlpricetype == 3){
                    var result = (valunits / 100) * 10000;
                    var result_mluse = (mluse / 100) * 10000;
                    var result_mluseto = (mluseto / 100) * 10000;

                    if((result >= result_mluse) && result <= result_mluseto){
                        
                    }else{
                       swal('ข้อความจากระบบ','ปริมาณต้องอยู่ระหว่าง '+mltext+'.');
                       return false;
                    }   
                }
            }
        }
        form_data.append("add["+add_item_id+"][payment_amount]",valunits);
        form_data.append("add["+add_item_id+"][discount_percentage]",discount);

    }else{ 

    }

    form_data.append("admit_id", admit_id);
    $.ajax({    
        url: itemUrl.addpricing_url+addList[form].link,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: form_data,
           
        success: function (data) {
            var data = JSON.parse(data);

            selectAutocomplete(data['key']);

            setTimeout(function () {
                $('#amount-'+data['datatype']+'-'+data['key']+'-'+data['number']).empty();
                $('#amount-'+data['datatype']+'-'+data['key']+'-'+data['number']).append(data['add'][data['key']]['payment_amount']);
            }, 1000);
           
        }
    });
}

function editPricing(form){

    var e_w_cutting = el("warehouse_cutting");
    if(e_w_cutting != null){
        if(e_w_cutting.options.length){
            var w_unit = e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-unit');
            var w_qty= e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-qty');
            $(addItemConfig.Drug_pay_stock_qty).val('คลังจ่าย '+w_qty+' '+w_unit);
        }
    }
    
    var myform = document.getElementById(addList[form].form);
    var form_data = new FormData(myform);
 
    if(stock_is_liquid  == 1){  
        var is_liquid = document.querySelector('input[name="liquid"]:checked').value; 

        var  stock_sale_price = $(addItemConfig.Drug_stock_sale_price).val();
        var  valunits = $(addItemConfig.Drug_valunits).val();
        var  discount = $(addItemConfig.Drug_discount).val();

        var e = document.getElementById("ml_price");
        if(e.options.length){
            var mltext = e.options[e.selectedIndex].text;
            var mlprice = e.options[e.selectedIndex].value;
            var mlpricetype = e.options[e.selectedIndex].getAttribute('data-price-type');
            var mluse = e.options[e.selectedIndex].getAttribute('data-use');
            var mluseto = e.options[e.selectedIndex].getAttribute('data-use-to');
            var mlid = e.options[e.selectedIndex].getAttribute('data-ml-id');

            if(is_liquid == 1){
                if(mlpricetype == 1){
                    
                }
                if(mlpricetype == 2){
                   
                }
                if(mlpricetype == 3){
                    var result = (valunits / 100) * 10000;
                    var result_mluse = (mluse / 100) * 10000;
                    var result_mluseto = (mluseto / 100) * 10000;

                    if((result >= result_mluse) && result <= result_mluseto){
                        
                    }else{
                       swal('ข้อความจากระบบ','ปริมาณต้องอยู่ระหว่าง '+mltext+'.');
                       return false;
                    }   
                }
            }
        }
        form_data.append("add["+add_item_id+"][payment_amount]",valunits);
        form_data.append("add["+add_item_id+"][discount_percentage]",discount);

    }else{ 

    }

    form_data.append("admit_id", admit_id);
    $.ajax({    
        url: itemUrl.addpricing_url+addList[form].link,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: form_data,
           
        success: function (data) {
            var data = JSON.parse(data);
            console.log(data);
           $('#amount-'+data['datatype']+'-'+data['payment_id']).empty();
           $('#amount-'+data['datatype']+'-'+data['payment_id']).append(data['add'][data['key']]['payment_amount']);

        }
    });
}

function warehouseCutting(){
    $(addItemConfig.warehouse_cutting).on('change', function(){
        var e_w_cutting = el("warehouse_cutting");
        if(e_w_cutting != null){
            if(e_w_cutting.options.length){
                var w_unit = e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-unit');
                var w_qty= e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-qty');
                var w_name= e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-name');
                $(addItemConfig.Drug_pay_stock_qty).val(w_name+' '+w_qty+' '+w_unit);
            }
        }
    });
}

function setunitSale(){

    $(addItemConfig.Other_unit_name).on('change', function(){
        selectObject = el('Other_unit_name');
        setsaleprice = selectObject.options[selectObject.selectedIndex].getAttribute('data-price');
        setsaleid = selectObject.options[selectObject.selectedIndex].getAttribute('data-sale-id');
        $(addItemConfig.Other_stock_sale_price).val(setsaleprice);
        $(addItemConfig.sale_id).val(setsaleid);
        
        if($(addItemConfig.Other_pricing).is(':checked')){}else{
            calOtherTotal();
        }
    });

    $(addItemConfig.Drug_unit_name).on('change', function(){
        selectObject = el('Drug_unit_name');
        setsaleprice = selectObject.options[selectObject.selectedIndex].getAttribute('data-price');
        setsaleid = selectObject.options[selectObject.selectedIndex].getAttribute('data-sale-id');
        $(addItemConfig.Drug_stock_sale_price).val(setsaleprice);
        $(addItemConfig.sale_id).val(setsaleid);
        
        if($(addItemConfig.Drug_pricing).is(':checked')){}else{
            calDrugTotal();
        }
    });
    
}

function is_liquid(main_sale = false){
    var is_liquid = document.querySelector('input[name="liquid"]:checked').value;

    $('.is_liquid').on('change', function(){

        console.log('working');
        var option = '';
        is_liquid = document.querySelector('input[name="liquid"]:checked').value;
        if(is_liquid == 0){
            $('#div_Drug_pricing').show();
            $(addItemConfig.div_is_liquid).hide();
            $(addItemConfig.div_route).hide();

            if(main_sale){

                for (var i = 0; i < main_sale.length; i++) {
                    if(i == 0){
                        selected = 'selected';
                    }else{
                        selected = '';
                    }
                    option += '<option data-sale-id="'+main_sale[i].id+'" data-price="'+main_sale[i].stock_sale_item_price+'" value="'+main_sale[i].price_unit_id+'" '+selected+'>'+main_sale[i].price_unit_name+'</option>';
                }
            }
            $(addItemConfig.Drug_unit_name).empty();
            $(addItemConfig.Drug_unit_name).append(option);
            $(addItemConfig.Drug_valunits).val(amount);
            $(addItemConfig.Drug_valunits).prop("disabled", false);  
            document.getElementById("Drug_unit_name").options[0].selected = true;
            $('#Drug_unit_name').trigger('change');
            
            calDrugTotal();
            $('#mlid').val('');
        }else{

            $(addItemConfig.div_route).show();
            $(addItemConfig.div_is_liquid).show();
            var stock_unit_name = $(addItemConfig.unit_name).val();

            $(addItemConfig.Drug_unit_name).empty();
            $(addItemConfig.Drug_unit_name).append('<option value="'+stock_number_rxtx_unit_id+'">'+stock_unit_name+'</option>');    
            checkmltype();
        }
    });
    if(is_liquid == 1){;
        $(".is_liquid").trigger('change');
    } 
}

function checkmltype(){
    $(addItemConfig.alertamount).empty();
    $('#div_Drug_pricing').show();

    var e = document.getElementById("ml_price");
    if(e.options.length){
        var mltext = e.options[e.selectedIndex].text;
        var mlprice = e.options[e.selectedIndex].value;
        var mlpricetype = e.options[e.selectedIndex].getAttribute('data-price-type');
        var mluse = e.options[e.selectedIndex].getAttribute('data-use');
        var mluseto = e.options[e.selectedIndex].getAttribute('data-use-to');
        var mlid = e.options[e.selectedIndex].getAttribute('data-ml-id');

        $(addItemConfig.Drug_stock_sale_price).val(mlprice);
        $('#mlid').val(mlid);
        console.log($('#mlid').val());
        if(mlpricetype == 1){
              $(addItemConfig.Drug_valunits).prop("disabled", false);  
        }

        if(mlpricetype == 2){

           $(addItemConfig.Drug_valunits).val(mluse);
           $(addItemConfig.Drug_valunits).prop("disabled", true);
           $('#div_Drug_pricing').hide();
        }

        if(mlpricetype == 3){
             $(addItemConfig.Drug_valunits).prop("disabled", false);  
            $(addItemConfig.Drug_valunits).val(mluse);
        }
        calDrugTotal();
    }
    
}

function Drugusefor(){
    var usefor = $(addItemConfig.Drug_usefor).val();
    if(usefor == 1){
        $('#Rxcheckbox').addClass('show');
        $('#Rxcheckbox').removeClass('hide');
    }else{
        $('#Rxcheckbox').addClass('hide');
        $('#Rxcheckbox').removeClass('show');
    }
}

function checkPricing(){
    $(addItemConfig.Drug_pricing).on('change', function() {
       if($(addItemConfig.Drug_pricing).is(':checked')){
            $(addItemConfig.Drug_total).prop('disabled', false);

            $(addItemConfig.div_Drug_discount).hide();
            $(addItemConfig.Drug_discount).prop('disabled', true);
       }else{
            calDrugTotal();
            $(addItemConfig.Drug_total).prop('disabled', true);
            $(addItemConfig.div_Drug_discount).show();
            $(addItemConfig.Drug_discount).prop('disabled', false);
       }
    });

    $(addItemConfig.Drug_valunits).on('change', function(){
        if($(addItemConfig.Drug_pricing).is(':checked')){

        }else{
             calDrugTotal();
        }  
    });
    $(addItemConfig.Drug_discount).on('change', function(){
         if($(addItemConfig.Drug_pricing).is(':checked')){

        }else{
             calDrugTotal();
        }
    });

    

    $(addItemConfig.Other_pricing).on('change', function() {
       if($(addItemConfig.Other_pricing).is(':checked')){
            $(addItemConfig.Other_total).prop('disabled', false);

            $(addItemConfig.div_Other_discount).hide();
            $(addItemConfig.Other_discount).prop('disabled', true);
       }else{
            calOtherTotal();
            $(addItemConfig.Other_total).prop('disabled', true);

            $(addItemConfig.div_Other_discount).show();
            $(addItemConfig.Other_discount).prop('disabled', false);
       }
    });

    
    $(addItemConfig.Other_valunits).on('change', function(){
        if($(addItemConfig.Other_pricing).is(':checked')){
            
        }else{
            calOtherTotal();
        }

    });
    $(addItemConfig.Other_discount).on('change', function(){
         if($(addItemConfig.Other_pricing).is(':checked')){
            
        }else{
            calOtherTotal();
        }
    });
}

function calDrugTotal(){
    $(addItemConfig.alertamount).empty();
    if(stock_is_liquid  == 1){
        var is_liquid = document.querySelector('input[name="liquid"]:checked').value;
    }else{
        var is_liquid = 0;
    }

    var  stock_sale_price = $(addItemConfig.Drug_stock_sale_price).val();
    var  valunits = $(addItemConfig.Drug_valunits).val();
    var  discount = $(addItemConfig.Drug_discount).val();

    if(is_liquid == 0){
        var  total = parseFloat(stock_sale_price)*parseFloat(valunits);
        if(discount == ''){
            discount = 0;
            $(addItemConfig.Drug_discount).val(0);
        }
        if(total == ''){
            total = 0;
        }

        var  total_discount = parseFloat(total)*(parseFloat(discount)/100);
        
        
        var  total = parseFloat(total)-parseFloat(total_discount);
    }

    if(is_liquid == 1){
        var e = document.getElementById("ml_price");
        if(e.options.length){
            var mltext = e.options[e.selectedIndex].text;
            var mlprice = e.options[e.selectedIndex].value;
            var mlunit = e.options[e.selectedIndex].getAttribute('data-ml-unit');
            var mlpricetype = e.options[e.selectedIndex].getAttribute('data-price-type');
            var mluse = e.options[e.selectedIndex].getAttribute('data-use');
            var mluseto = e.options[e.selectedIndex].getAttribute('data-use-to');

            if(mlpricetype == 1){
                total = Math.ceil(Math.ceil(valunits)*(mluse*stock_sale_price));
            }
            if(mlpricetype == 2){
                $(addItemConfig.Drug_valunits).val(mluse);
                $(addItemConfig.Drug_valunits).prop("disabled", true);
                total = mlprice;
            }
            if(mlpricetype == 3){
                var result = (valunits / 100) * 10000;
                var result_mluse = (mluse / 100) * 10000;
                var result_mluseto = (mluseto / 100) * 10000;

                if((result >= result_mluse) && result <= result_mluseto){
                    
                    total = mlprice;

                }else{
                    $(addItemConfig.alertamount).append('ปริมาณต้องอยู่ระหว่าง '+mltext+'.');
                }   
            }

            var  total_discount = parseFloat(total)*(parseFloat(discount)/100);
            var  total = parseFloat(total)-parseFloat(total_discount);
        }
    }

    if(isNaN(total)){
        total = 0;
    }

    $(addItemConfig.Drug_total).val(total);
}

function calOtherTotal(){
    var  stock_sale_price = $(addItemConfig.Other_stock_sale_price).val();
    var  valunits = $(addItemConfig.Other_valunits).val();
    var  discount = $(addItemConfig.Other_discount).val();

    var  total = parseFloat(stock_sale_price)*parseFloat(valunits);
    if(discount == ''){
        discount = 0;
        $(addItemConfig.Other_discount).val(0);
    }
    if(total == ''){
        total = 0;
    }

    var  total_discount = parseFloat(total)*(parseFloat(discount)/100);
    var  total = parseFloat(total)-parseFloat(total_discount);

    if(isNaN(total)){
        total = 0;
    }
    $(addItemConfig.Other_total).val(total);
}

function selectAutocomplete(uid,formsubmit = 'ADDITEM'){
     $.ajax({
        type: 'POST',
        url: itemUrl.saleitem_url,
        data: {
            'stock_uid': uid,
            'admit_history_id': admit_id,
        },
        success: function (data) {
            
            var data = JSON.parse(data);
            
            if(data.length > 0){
                for (var i = 0; i < data.length; i++) {
                    $('#alert-category-'+data[i].stock_category_id).remove();

                    var check = $(".list-"+data[i].type+'-'+data[i].main_id);
                    if(check.length>0){
                        number = check.length;
                    }else{
                        number = 0;
                    }
                    if(data[i].type == 'main'){
                        selectbtn = '<div class="box-label">'+
                            '<button onclick="loadModaledititem('+data[i].main_id+');" type="button" class="btn btn-warning btn-block mdi mdi-pencil text-light"> แก้ไข</button>'+
                        '</div>';
                        btnDelete = '<button onclick="deleteItem('+data[i].main_id+');"  type="button" class="btn btn-danger btn-block mdi mdi-pencil text-light"> ลบ </button>';
                    }else{                                          
                        selectbtn = '<div class="box-label">'+
                           '<button onclick="loadModaleditRelated('+data[i].main_id+');" type="button" class="btn btn-warning btn-block mdi mdi-pencil text-light"> แก้ไข</button>'+
                        '</div>';
                        btnDelete = '<button onclick="deleteItem('+data[i].main_id+');"  type="button" class="btn btn-danger btn-block mdi mdi-pencil text-light"> ลบ </button>';
                    } 
                    
                    if((formsubmit == 'LAB' && check.length <= 0) ||  formsubmit == 'ADDITEM'){
                        var td_checkbox = '';
                        for (var n = 1; n < 25; n++) {

                            td_checkbox += '<td>'+
                                '<input name="checked_time_'+data[i].type+'_'+data[i].main_id+'[]" type="checkbox" id="checkbox-'+data[i].type+'-'+data[i].main_id+'-'+n+'" class="chk-col-indigo" value="'+n+'">'+
                                '<label for="checkbox-'+data[i].type+'-'+data[i].main_id+'-'+n+'" class="chk-mps"></label>'+
                            '</td>';
                        }
                        
                        if(check.length>0){
                            num = check.length-1;
                            $("#list-"+data[i].type+'-'+data[i].main_id).after('<tr class="list-'+data[i].type+'-'+data[i].main_id+'" id="list-'+data[i].type+'-'+data[i].main_id+'">'+
                                '<input type="hidden" name="admit_'+data[i].type+'_item_id[]" value="'+data[i].main_id+'">'+
                                '<td>'+data[i].stock_id+'</td>'+
                                '<td>'+data[i].stock_name+'</td>'+
                                '<td id="amount-'+data[i].type+'-'+data[i].main_id+'">'+data[i].amount+'</td>'+ 
                                '<td><input class="form-control" type="text" name="rate-'+data[i].type+'-'+data[i].main_id+'" style="width:100px;"></input></td>'+
                                '<td><input class="form-control" type="text" name="volume-'+data[i].type+'-'+data[i].main_id+'" style="width:100px;"></input></td>'+
                                '<td><input class="form-control" type="text" name="note-'+data[i].type+'-'+data[i].main_id+'" style="width:100px;"></input></td>'+td_checkbox+
                                '<td>'+selectbtn+'</td>'+
                                '<td>'+btnDelete+'</td>'+
                            '</tr>');
                        }else{ 
                            $(admitConfig.item_lists).append('<tr class="list-'+data[i].type+'-'+data[i].main_id+'" id="list-'+data[i].type+'-'+data[i].main_id+'">'+
                                '<input type="hidden" name="admit_'+data[i].type+'_item_id[]" value="'+data[i].main_id+'">'+
                                '<input type="hidden" name="number_'+data[i].type+'['+data[i].main_id+'][]" value="'+check.length+'">'+
                                '<td>'+data[i].stock_id+'</td>'+
                                '<td>'+data[i].stock_name+'</td>'+
                                '<td id="amount-'+data[i].type+'-'+data[i].main_id+'-0">'+data[i].amount+'</td>'+ 
                                '<td><input class="form-control" type="text" name="rate-'+data[i].type+'-0['+data[i].main_id+']" style="width:100px;"></input></td>'+
                                '<td><input class="form-control" type="text" name="volume-'+data[i].type+'-0['+data[i].main_id+']" style="width:100px;"></input></td>'+
                                '<td><input class="form-control" type="text" name="note-'+data[i].type+'-0['+data[i].main_id+']" style="width:100px;"></input></td>'+td_checkbox+
                                '<td>'+selectbtn+'</td>'+
                                '<td>'+btnDelete+'</td>'+
                            '</tr>');
                        }    
                    }
                }
            }else{
               swal('ข้อความจากระบบ','รายการนี้ไม่มีการขายสินค้า');
            }
        }
    });
}

function deleteItem(payment_id){
    swal({   
        title: "ข้อความจากระบบ",   
        text: "คุณต้องการลบรายการนี้",   
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "ยืนยัน",   
        cancelButtonText: "ยกเลิก",   
        closeOnConfirm: false,  
    }, function(isConfirm){   
        if (isConfirm) {
            $.ajax({
                type: 'POST',
                url: Config.base_url+'admit/api/admit_api/deleteitem',
                data: {
                    'payment_id': payment_id,
                },
                success: function (data) {
                    var data = JSON.parse(data);
                    
                    swal("ข้อความจากระบบ", "ลบข้อมูลเรียบร้อยแ้ว", "success");
                    $(admitConfig.list+data['type']+'-'+payment_id).remove();
                }
            });      
            
        }
    });
   
}


function initAutocomplete(){

 if($("#tags").length > 0 ){

  $("#tags").autocomplete({
   source: itemUrl.stock_url,
   select: function (event, ui) {
    var uid = ui.item.uid;
    var label = ui.item.stock_id;
    var description = ui.item.stock_name;
    var stock_category_id = ui.item.stock_category_id;
    var stock_generic_name = ui.item.stock_generic_name;
    var checksale = ui.item.checksale;

    if(checksale == 1){
        var check = $('.list-main-'+uid);
        if(check.length>0){
            number = check.length;
        }else{
            number = 0;
        }
         loadModaladditem(stock_category_id,uid,number);
     }else{
         selectAutocomplete(uid);
     }
   },
  }).data("ui-autocomplete")._renderItem = function (ul,item) {
        return $('<li class="filters filter-category-'+item.stock_type_id+'"></li>')
        .data("item.autocomplete", item)
        .append('<div href="javascript:void(0)"><div class="row d-flex justify-content-between"><div class="col-md-2"><div class="pl-3">'+item.stock_id +'</div></div><div class="col-md-8"><div class="mdi mdi-needle">'+item.stock_name+'</div></div><div class="col-md-2"><div class="mdi mdi-plus-circle text-success text-right"></div></div></div></div>')
        .appendTo(ul);
  };
 }
}
initAutocomplete();

function loadModaledititem(payment_id){
 $("#modal_container").empty();

    modelurl = itemUrl.editmodeldrug_url+'/'+payment_id;
    model_id = addItemConfig.modalliststockdrug;

 $("#modal_container").load(modelurl,function() {
    $(model_id).modal("show");
 });
}

function loadModaleditRelated(payment_id){
 $("#modal_container").empty();

    modelurl = itemUrl.editmodelRelateddrug_url+'/'+payment_id;
    model_id = addItemConfig.modalliststockdrug;

 $("#modal_container").load(modelurl,function() {
    $(model_id).modal("show");
 });
}

function loadModaladditem(stock_category_id,id,number){
 $("#modal_container").empty();

    modelurl = itemUrl.modeldrug_url+'/'+admit_id+'/'+id+'/'+number;
    model_id = addItemConfig.modalliststockdrug;


 $("#modal_container").load(modelurl,function() {
    $(model_id).modal("show");
 });
}function el(id){return document.getElementById(id);} 

function sendFinance() {
  el('admit_form').action = 'save/finance';
  el('admit_form').submit();
}

admitConfig = {
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
    monitor_time : '#monitor_time',
    row_monitor_ : '#row_monitor_',
    mock_row_monitor_ : '#mock_row_monitor_',
    row_monitor_ : '#row_monitor_',
};

var modalAdmit = {
    modalcage : {'modalId':"#modalcage",'linkurl': Config.base_url+'admit/api/admit_modal/modal_cage'},
    modalinhouselab : {'modalId':"#myModal1",'linkurl': Config.base_url+'admit/api/admit_modal/modal_inhouselab'},
    modaloutlab : {'modalId':"#myModal2",'linkurl': Config.base_url+'admit/api/admit_modal/modal_outlab'},
    modalmonitor_eat : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'admit/api/admit_modal/modal_monitor/eat'},
    modalmonitor_body : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'admit/api/admit_modal/modal_monitor/body'},
    modalmonitor_other : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'admit/api/admit_modal/modal_monitor/other'},
    modalmonitor_general : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'admit/api/admit_modal/modal_monitor/general'},
    modalmonitor_plan : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'admit/api/admit_modal/modal_monitor/plan'},
    modalmonitor_talk : {'modalId':"#modalmonitor",'linkurl': Config.base_url+'admit/api/admit_modal/modal_monitor/talk'},
};

admiturl = {
    deleteMonitor : Config.base_url+'admit/api/admit_api/deletemonitor',
};

function loadModal(obj,item = '',empty = true){

    var cage_name = $(admitConfig.cage_name).val();
    var cage_cate = $(admitConfig.cage_cate).val();
    var cage_size = $(admitConfig.cage_size).val();

    if(empty){
        $(admitConfig.modal_container).empty();
        div_modal = admitConfig.modal_container;
    }else{
        $(admitConfig.modal_sub).empty();
         div_modal = admitConfig.modal_sub;
    }
    $(div_modal).load(modalAdmit[obj].linkurl+'/'+item,function() {
        
        $(modalAdmit[obj].modalId).on('shown.bs.modal', function () {
            $(admitConfig.cage_name).val(cage_name);
            $(admitConfig.cage_cate).val(cage_cate);
            $(admitConfig.cage_size).val(cage_size);
        }); 
        
        $(modalAdmit[obj].modalId).modal("show");
    });
}

var subLab = [
    {'form':"lab_inhouse_form",'link':"savelabinhouse"},
    {'form':"lab_outlab_form",'link':"saveoutlab"},
];

function submitLab(lab){

    var myform = document.getElementById(subLab[lab].form);
    var form_data = new FormData(myform);

    
    $.ajax({    
        url: Config.base_url+'admit/api/admit_api/'+subLab[lab].link,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: form_data,
           
        success: function (data) {
            var data = JSON.parse(data);
            
            if(data.length > 0){
                for (var i = 0; i < data.length; i++) {   
                    
                    selectAutocomplete(data[i],'LAB');
                }
            }

        }
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
        url: Config.base_url+'admit/api/admit_api/'+submitmonitor[typeform].link+'/'+submitmonitor[typeform].type,
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

                if(event.includes('EDIT')){
                    event_arr = event.split("_");
                    edit_number_monitor = event_arr[1];

                    $('#mock_'+key+'_'+edit_number_monitor).remove();

                    if(obj != ''){
                        if(key != 'assistant_name'){
                            if(key != 'veterinary_name'){
                                input += '<input id="mock_'+key+'_'+edit_number_monitor+'" type="hidden" data-name="'+key+'" name="monitor_'+submitmonitor[typeform].type+'['+number_monitor+']['+key+']" value="'+obj+'">';
                            }
                        }
                    }
                    $('#mock_row_monitor_'+submitmonitor[typeform].type+'_'+edit_number_monitor).append(input);
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

            }
            if(event == 'ADD'){        
                var add_row = '<div id="mock_row_monitor_'+submitmonitor[typeform].type+'_'+number_monitor+'" class="row">'+input+
                                '<div id="mock_time_'+number_monitor+'" class="col-2 text-center">'+time+'</div>'+
                                '<div id="mock_content_'+number_monitor+'" class="col-4 text-left">'+content+'</div>'+
                                '<div id="mock_content_assistant_'+number_monitor+'" class="col-2 text-center">'+data['assistant_name']+'</div>'+
                                '<div id="mock_content_veterinary_'+number_monitor+'" class="col-2 text-center">'+data['veterinary_name']+'</div>'+
                                '<div class="col-1 text-center"><button onclick="editMockRowMonitor(\'modalmonitor_'+submitmonitor[typeform].type+'\',\''+number_monitor+'\',\''+submitmonitor[typeform].type+'\');" type="button" class="btn btn-warning btn-block"><i class="mdi mdi-pencil"></i></button><br></div>'+
                                '<div class="col-1 text-center"><button onclick="deleteMockRowMonitor('+number_monitor+',\''+submitmonitor[typeform].type+'\');" type="button" class="btn btn-danger btn-block"><i class="mdi mdi-delete-empty"></i></button><br></div>'+
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
        }
    });
}

function deleteMockRowMonitor(number_monitor,type){
    $(admitConfig.mock_row_monitor_+type+'_'+number_monitor).remove();
}

var admitUrl = {
    modalmonitorUrl : Config.base_url+'admit/api/admit_modal/edit_modal_monitor'
};
function editRowMonitor(type,uid){
    $("#modal_container").load(admitUrl.modalmonitorUrl+'/'+type+'/'+queue_uid+'/'+uid,function(){
        $(modalAdmit['modalmonitor_'+type].modalId).modal('show');       
    }); 
}

function deleteRowMonitor(type,uid){
    swal({   
        title: "แน่ใจหรือ ?",   
        text: "ท่านแน่ใจหรือว่าต้องการลบข้อมูล !",   
        type: "warning",   
        showCancelButton: true, 
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#DD6B55",   
        confirmButtonText: "ไช่, ต้องการลบ !",   
        closeOnConfirm: true 
    },function(){         
        $.ajax({
            type: 'POST',
            data:{
                "uid":uid,
                "type":type,
            },
            url: admiturl.deleteMonitor,
            success: function(data){
                var data = JSON.parse(data);
                
                if(data == true){
                    $(admitConfig.row_monitor_+type+'_'+uid).remove();
                } 
            }
        });
    });
}

function editMockRowMonitor(obj,number_monitor,type){
    var input = $(admitConfig.mock_row_monitor_+type+'_'+number_monitor+' input');
    
    for (var i = 0; i < input.length; i++) {
        key = input[i].getAttribute('data-name');
        item = input[i].getAttribute('value');
        $('#'+key).val(item);
        
    }

    $("#modal_container").load(modalAdmit[obj].linkurl+'/'+queue_uid+'/EDIT_'+number_monitor,function(){
        $(modalAdmit[obj].modalId).on('shown.bs.modal', function () {

            for (var i = 0; i < input.length; i++) {
                key = input[i].getAttribute('data-name');
                item = input[i].getAttribute('value');
                $('#'+key).val(item);
                
            }

        });

        $(modalAdmit[obj].modalId).modal('show');
        
    });
}

function AddCage(cageid){
	var cage = el('cage'+cageid);
	cage_cate = cage.getAttribute('data-cage-cate');
    cage_name = cage.getAttribute('data-cage-name');
	cage_price = cage.getAttribute('data-cage-price');
    cage_size = cage.getAttribute('data-cage-size');
	cage_id = cage.getAttribute('data-cage-id');

	$(admitConfig.cage_cate).val(cage_cate);
	$(admitConfig.cage_name).val(cage_name);
    $(admitConfig.cage_size).val(cage_size);
	$(admitConfig.cage_id).val(cage_id);
    $(admitConfig.admit_price).val(cage_price);
    $(admitConfig.admit_price).trigger('change');
	$(modalAdmit.modalcage.modalId).modal("hide");

}

var id = document.getElementsByClassName("admit_price");

function priceTotalmain(){
    var admit_price = id[0].value;
    if(id.length > 1 ){
        id[1].value = admit_price;
    }
    
    var admit_since_date = $(admitConfig.admit_since_date).val();
    date_arr = admit_since_date.split("-");
    admit_since_date = date_arr[2]+'-'+date_arr[1]+'-'+date_arr[0];
    var admit_since_time = $(admitConfig.admit_since_time).val();
    var date1 = new Date(admit_since_date+' '+admit_since_time);
    var date2 = new Date();

    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    var diffDays_price = Math.ceil(diffTime / (1000 * 3600 * 24));

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

    var total = parseInt(admit_price)*parseInt(diffDays_price);
    $(admitConfig.total_admit).val(total);
    $(admitConfig.admit_per_time).val(curr_time);
    
}
priceTotalmain();

function incrementSeconds() {
    var admit_since_date = $(admitConfig.admit_since_date).val();
    date_arr = admit_since_date.split("-");
    admit_since_date = date_arr[2]+'-'+date_arr[1]+'-'+date_arr[0];
    var admit_since_time = $(admitConfig.admit_since_time).val();
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
    $(admitConfig.admit_per_time).val(curr_time);

    setInterval(incrementSeconds, 1000);
}

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

    var check_pettemperature = document.getElementsByClassName("pet_temperature");
    check_pettemperature[0].value = check_pettemperature[1].value;
    
     var check_petweight = document.getElementsByClassName("pet_weight");
    check_petweight[0].value = check_petweight[1].value;

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
    var admit_since_date = $(admitConfig.admit_since_date).val();
     date_arr = admit_since_date.split("-");
    admit_since_date = date_arr[2]+'-'+date_arr[1]+'-'+date_arr[0];
    var admit_since_time = $(admitConfig.admit_since_time).val();

    var date1 = new Date(admit_since_date+' '+admit_since_time);
    var date2 = new Date();
    
    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    var diffDays_price = Math.ceil(diffTime / (1000 * 3600 * 24));
    
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

    var total = parseInt(admit_price)*parseInt(diffDays_price);
    $(admitConfig.total_admit).val(total);
}

function calDayDeposit(){
    var admit_since_date = $(admitConfig.admit_since_date).val();
    date_arr = admit_since_date.split("-");
    admit_since_date = date_arr[2]+'-'+date_arr[1]+'-'+date_arr[0];

    var admit_since_time = $(admitConfig.admit_since_time).val();

    var date1 = new Date(admit_since_date+' '+admit_since_time);
    var date2 = new Date();
    var diffTime = Math.abs(date2.getTime() - date1.getTime());
    

    diffDays = Math.floor(diffTime/1000/60/60/24);  

    $(admitConfig.admit_per_night).val(diffDays);
    $(admitConfig.admit_per_time).val(curr_time);
}

calDayDeposit();


function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


function checkInputRadioInhouseLab($uid){
    $(admitConfig.labinhouse_checkbox_category_+$uid).change(function () {
        if(!this.checked) {
            $(admitConfig.inputradiolab+$uid).addClass("disabled").prop("disabled", true);
            $(admitConfig.inputradiolab+$uid).prop("checked", false);
            $(admitConfig.inputradiolab+$uid).val('');

            $(admitConfig.labcategory_checkbox+$uid).prop("checked", false);
            $(admitConfig.labcategory_checkbox+$uid).prop("disabled", true);
            $(admitConfig.labcategory_input+$uid).val('');
            $(admitConfig.labcategory_input+$uid).prop("disabled", true);

            $(admitConfig.labinhouse_link+$uid).prop("checked", false);
        }else{

            $(admitConfig.inputradiolab+$uid).removeClass("disabled").prop("disabled", false);
            $(admitConfig.labcategory_checkbox+$uid).prop("disabled", false);

            $(admitConfig.labinhouse_link+$uid).prop("checked", true);
        }
    });
}

function checkInputRadioOutLab($uid){

    $(admitConfig.outlab_checkbox_category_+$uid).change(function () {
 
        if(!this.checked) {
            $(admitConfig.inputradiolab+$uid).addClass("disabled").prop("disabled", true);
            $(admitConfig.inputradiolab+$uid).prop("checked", false);
            $(admitConfig.inputradiolab+$uid).val('');

            $(admitConfig.labcategory_checkbox+$uid).prop("checked", false);
            $(admitConfig.labcategory_checkbox+$uid).prop("disabled", true);
            $(admitConfig.labcategory_input+$uid).val('');
            $(admitConfig.labcategory_input+$uid).prop("disabled", true);

            $(admitConfig.outlab_link+$uid).prop("checked", false);
        }else{

            $(admitConfig.inputradiolab+$uid).removeClass("disabled").prop("disabled", false);
            $(admitConfig.labcategory_checkbox+$uid).prop("disabled", false);

            $(admitConfig.outlab_link+$uid).prop("checked", true);
        }
    });
}

function checkInputRadiooutLabSub($uid){
    $(admitConfig.outlab_checkbox_stock_+$uid).change(function () {
        if(!this.checked) {
            $(admitConfig.inputradiolabsub+$uid).addClass("disabled").prop("disabled", true);
            $(admitConfig.inputradiolabsub+$uid).prop("checked", false);
            $(admitConfig.inputradiolabsub+$uid).val('');
        }else{
            $(admitConfig.inputradiolabsub+$uid).removeClass("disabled").prop("disabled", false);
        }
    });
}

function checkInputRadioInhouseLabSub($uid){
    $(admitConfig.labinhouse_checkbox_stock_+$uid).change(function () {
        if(!this.checked) {
            $(admitConfig.inputradiolabsub+$uid).addClass("disabled").prop("disabled", true);
            $(admitConfig.inputradiolabsub+$uid).prop("checked", false);
            $(admitConfig.inputradiolabsub+$uid).val('');
        }else{
            $(admitConfig.inputradiolabsub+$uid).removeClass("disabled").prop("disabled", false);
        }
    });
}
