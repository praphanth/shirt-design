var addItemConfig = {
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
    stock_url:config.base_url+"surgery/api/surgery_api/getStock",
    modeldrug_url:config.base_url+"surgery/api/surgery_modal/model_list_drug",
    modelother_url:config.base_url+"surgery/api/surgery_modal/model_list_other",
    editmodeldrug_url:config.base_url+"surgery/api/surgery_modal/edit_model_list_drug",
    editmodelother_url:config.base_url+"surgery/api/surgery_modal/edit_model_list_other",
    editmodelRelateddrug_url:config.base_url+"surgery/api/surgery_modal/edit_model_related_list_drug",
    saleitem_url:config.base_url+'surgery/api/surgery_api/saleitem',
    addpricing_url:config.base_url+'surgery/api/surgery_api/',
}

var addList = {
    'add':{'form':"add_form",'link':"addpricing"},
    'edit':{'form':"edit_form",'link':"addpricing"},
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

    form_data.append("surgery_uid", surgery_uid);
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
            selectAutocomplete(data['key']);
            if(data['add'][data['key']]['usefor'] == 1){
                $('#alert-category-1').remove();
                $(addItemConfig.liststock+data['datatype']+'-'+data['key']).appendTo($("#category-1"));
            }

            if(data['add'][data['key']]['usefor'] == 2){
                $('#alert-category-2').remove();
                $(addItemConfig.liststock+data['datatype']+'-'+data['key']).appendTo($("#category-2"));
            }
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

    form_data.append("surgery_uid", surgery_uid);
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
            console.log('data');
            console.log(data);
            if(data['add'][data['key']]['usefor'] == 1){
                $(addItemConfig.liststock+data['datatype']+'-'+data['key']).appendTo($("#category-1"));
            }

            if(data['add'][data['key']]['usefor'] == 2){
                $(addItemConfig.liststock+data['datatype']+'-'+data['key']).appendTo($("#category-2"));
            }

            $('#amount-'+data['datatype']+'-'+data['key']).empty();
            $('#amount-'+data['datatype']+'-'+data['key']).append('จำนวน '+data['add'][data['key']]['payment_amount']+' '+data['add'][data['key']]['unit_name']);
            checkAlertCategory();
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
                var w_name = e_w_cutting.options[e_w_cutting.selectedIndex].getAttribute('data-w-name');
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
        console.log($(addItemConfig.sale_id).val());
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
        console.log($(addItemConfig.sale_id).val());
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

function selectAutocomplete(uid){
    
     $.ajax({
        type: 'POST',
        url: itemUrl.saleitem_url,
        data: {
            'stock_uid': uid
        },
        success: function (data) {
            
            var data = JSON.parse(data);
            
            if(data.length > 0){
                for (var i = 0; i < data.length; i++) {
                    $('#alert-category-'+data[i].stock_category_id).remove();

                    if(data[i].type == 'main'){

                        selectbtn = '<div class="box-label">'+
                            '<button onclick="loadModaledititem('+data[i].stock_category_id+','+data[i].main_id+');" type="button" class="btn btn-warning btn-block mdi mdi-pencil text-light"> แก้ไข</button>'+
                        '</div>';
                        btnDelete = '<button onclick="deleteListStock('+data[i].main_id+');"  type="button" class="btn btn-danger btn-block mdi mdi-pencil text-light"> ลบ </button>';
                    }else{                                          
                        selectbtn = '<div class="box-label">'+
                           '<button onclick="loadModaleditRelated('+data[i].stock_category_id+','+data[i].main_id+');" type="button" class="btn btn-warning btn-block mdi mdi-pencil text-light"> แก้ไข</button>'+
                        '</div>';
                        btnDelete = '<button onclick="deleteListStockRelated('+data[i].main_id+');"  type="button" class="btn btn-danger btn-block mdi mdi-pencil text-light"> ลบ </button>';
                    }

                    var ckeck = document.getElementById("list-stock-"+data[i].type+"-"+data[i].main_id);
                    if(!ckeck){

                        if(data[i].usefor != 2){
                            $('#category-'+data[i].stock_category_id).append('<div id="list-stock-'+data[i].type+'-'+data[i].main_id+'" class="col-12 mt-2">'+
                                                                   
                                                                   '<input type="hidden" name="'+data[i].type+'_item_id[]" value="'+data[i].main_id+'">'+
                                                                    '<div class="row">'+
                                                                        '<div class="col-12 col-md-8 col-lg-9 align-self-center">'+
                                                                            '<div class="row">'+
                                                                                '<div class="col-12 col-md-8 col-lg-9 align-self-center">'+
                                                                                    data[i].stock_name+
                                                                                '</div>'+
                                                                                '<div id="amount-'+data[i].type+'-'+data[i].main_id+'" class="col-12 col-md-4 col-lg-3  text-right text-primary">'+
                                                                                    'จำนวน '+data[i].amount+' '+data[i].unit_name+
                                                                                '</div>'+
                                                                            '</div>'+
                                                                        '</div>'+
                                                                       '<div class="col-12 col-md-4 col-lg-3">'+
                                                                           '<div class="row">'+
                                                                                '<div class="col-lg-4"></div>'+
                                                                                '<div class="col-6 col-lg-4 pl-md-0">'+selectbtn+  
                                                                                '</div>'+
                                                                                '<div class="col-6 col-lg-4 pl-md-0">'+
                                                                                    '<div class="box-label">'+
                                                                                        btnDelete+
                                                                                    '</div>'+
                                                                                '</div>'+
                                                                            '</div>'+
                                                                        '</div>'+
                                                                    '</div>'+
                                                                '</div>');
                        }
                        if(data[i].usefor == 2){
                            $('#category-2').append('<div id="list-stock-'+data[i].type+'-'+data[i].main_id+'" class="col-12 mt-2">'+
                                                                   
                                                                   '<input type="hidden" name="'+data[i].type+'_item_id[]" value="'+data[i].main_id+'">'+
                                                                    '<div class="row">'+
                                                                        '<div class="col-12 col-md-8 col-lg-9 align-self-center">'+
                                                                            '<div class="row">'+
                                                                                '<div class="col-12 col-md-8 col-lg-9 align-self-center">'+
                                                                                    data[i].stock_name+
                                                                                '</div>'+
                                                                                '<div id="amount-'+data[i].type+'-'+data[i].main_id+'" class="col-12 col-md-4 col-lg-3  text-right text-primary">'+
                                                                                    'จำนวน '+data[i].amount+' '+data[i].unit_name+
                                                                                '</div>'+
                                                                            '</div>'+
                                                                        '</div>'+
                                                                       '<div class="col-12 col-md-4 col-lg-3">'+
                                                                           '<div class="row">'+
                                                                                '<div class="col-lg-4"></div>'+
                                                                                '<div class="col-6 col-lg-4 pl-md-0">'+selectbtn+  
                                                                                '</div>'+
                                                                                '<div class="col-6 col-lg-4 pl-md-0">'+
                                                                                    '<div class="box-label">'+
                                                                                        btnDelete+
                                                                                    '</div>'+
                                                                                '</div>'+
                                                                            '</div>'+
                                                                        '</div>'+
                                                                    '</div>'+
                                                                '</div>');
                        }
                    }else{
                        swal('ข้อความจากระบบ','สินค้า '+data[i].stock_name+' นี้มีอยู่ในรายการแล้ว');
                    }
                }
            }else{
               swal('ข้อความจากระบบ','รายการนี้ไม่มีการขายสินค้า');
            }
        }
    });
}

function deleteListStock(id){
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
             swal("ข้อความจากระบบ", "ลบข้อมูลเรียบร้อยแล้ว", "success");
           $(addItemConfig.liststock+'main-'+id).remove();
           checkAlertCategory();
        }
    }); 
}

function deleteListStockRelated(id){
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
            swal("ข้อความจากระบบ", "ลบข้อมูลเรียบร้อยแล้ว", "success");
           $(addItemConfig.liststock+'related-'+id).remove();
           checkAlertCategory();
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
         loadModaladditem(stock_category_id,uid);
     }else{
        selectAutocomplete(uid);
     }
    

   },
   open: function(e, ui) {
        
    },
    close : function(e,ui) {
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

function loadModaledititem(stock_category_id,id){
 $("#modal_container").empty();
    modelurl = itemUrl.editmodeldrug_url+'/'+surgery_uid+'/'+id;
    model_id = addItemConfig.modalliststockdrug;

 $("#modal_container").load(modelurl,function() {
    $(model_id).modal("show");
 });
}

function loadModaleditRelated(stock_category_id,id){
 $("#modal_container").empty();

    modelurl = itemUrl.editmodelRelateddrug_url+'/'+surgery_uid+'/'+id;
    model_id = addItemConfig.modalliststockdrug;

 $("#modal_container").load(modelurl,function() {
    $(model_id).modal("show");
 });
}

function loadModaladditem(stock_category_id,id){
 $("#modal_container").empty();

    modelurl = itemUrl.modeldrug_url+'/'+surgery_uid+'/'+id;
    model_id = addItemConfig.modalliststockdrug;

 $("#modal_container").load(modelurl,function() {
    $(model_id).modal("show");
 });
}

function checkAlertCategory(){
    var Mycategory1 = document.getElementById('category-1');
    var Mycategory2 = document.getElementById('category-2');
    var Mycategory3 = document.getElementById('category-3');
    var Mycategory4 = document.getElementById('category-4');
    var Mycategory5 = document.getElementById('category-5');
    if(Mycategory1.innerHTML.trim() == ''){
        $('#category-1').append('<div id="alert-category-2" class="col-12 mt-2">'+
            '<div class="row">'+
                '<div class="col-12 col-md-8 col-lg-9 align-self-center">&nbsp</div>'+
                '<div class="col-12 col-md-4 col-lg-3"></div>'+
        '</div>');
    }
    if(Mycategory2.innerHTML.trim() == ''){
        $('#category-2').append('<div id="alert-category-2" class="col-12 mt-2">'+
            '<div class="row">'+
                '<div class="col-12 col-md-8 col-lg-9 align-self-center">&nbsp</div>'+
                '<div class="col-12 col-md-4 col-lg-3"></div>'+
        '</div>');
    }
    if(Mycategory2.innerHTML.trim() == ''){
        $('#category-2').append('<div id="alert-category-3" class="col-12 mt-2">'+
            '<div class="row">'+
                '<div class="col-12 col-md-8 col-lg-9 align-self-center">&nbsp</div>'+
                '<div class="col-12 col-md-4 col-lg-3"></div>'+
        '</div>');
    }
     if(Mycategory4.innerHTML.trim() == ''){
        $('#category-4').append('<div id="alert-category-4" class="col-12 mt-2">'+
            '<div class="row">'+
                '<div class="col-12 col-md-8 col-lg-9 align-self-center">&nbsp</div>'+
                '<div class="col-12 col-md-4 col-lg-3"></div>'+
        '</div>');
    }
     if(Mycategory5.innerHTML.trim() == ''){
        $('#category-5').append('<div id="alert-category-5" class="col-12 mt-2">'+
            '<div class="row">'+
                '<div class="col-12 col-md-8 col-lg-9 align-self-center">&nbsp</div>'+
                '<div class="col-12 col-md-4 col-lg-3"></div>'+
        '</div>');
    }
}var surgeryConfig = {
	fileUpload : '#fileUpload',
	dataimage : '#dataimage',
    pre_time_1 : '#pre_time_1',
    pre_time_2 : '#pre_time_2',
    ane_time : '#ane_time',
    local_time : '#local_time',
    general_start : '#general_start',
    general_time : '#general_time',
}

var surgeryUrl = {
    saveimage :config.base_url+"surgery/api/surgery_api/saveimage",
}

function el(id){return document.getElementById(id);} 

var form = document.getElementById("form-id");

function sendFinance() {
  el('surgery_form').action = 'save/finance';
  el('surgery_form').submit();
}


$(surgeryConfig.pre_time_1+','+surgeryConfig.pre_time_2+','+surgeryConfig.ane_time+','+surgeryConfig.local_time+','+surgeryConfig.general_start+','+surgeryConfig.general_time).clockpicker({
        autoclose: true
});







var icon_url = Config.base_url+"assets/custom/";
var canvas;
var filStyleErase = "#ffffff";
var fillStyle = "#000000";
var fillSize = 5;
$(function () {
	
	 fabric.Object.prototype.customiseCornerIcons({	
		settings: {
            borderColor: 'black',
                cornerSize: 10,
                cornerBackgroundColor: 'black',
                cornerPadding: 10,
        }
	}, function() {
        canvas.renderAll();
    });


	canvas = window._canvas = new fabric.Canvas('canvas');
	canvas.backgroundColor = '#ffffff';
	canvas.isDrawingMode = 1;
	canvas.freeDrawingBrush.color = fillStyle;
	canvas.freeDrawingBrush.width = fillSize;
	
	canvas.renderAll();
	canvas.on('mouse:up', function () {
		saveCanvas();
	});
});

$("#trans_mode").change(function(){
	var drawing = $(this).prop("checked");	
	if(drawing){
		canvas.setActiveObject(canvas.item(0));
		canvas.isDrawingMode = 0;
	}else{
		canvas.discardActiveObject();
		canvas.isDrawingMode = 1;
	}
	canvas.renderAll();
});

$("#board_mode").change(function(){
	var erase = $(this).prop("checked");	
	if(erase){
		canvas.freeDrawingBrush.color = filStyleErase; 
	}else{
		canvas.freeDrawingBrush.color = fillStyle; 
	}
});
function loadImageToCanvas(url){
	if(url){
		fabric.Image.fromURL(url, function(image) {
		  
		   canvas.centerObject(image);
		   canvas.add(image);
		   canvas.renderAll();
		});
	}
}

$("#ex1").bootstrapSlider({tooltip: 'always',useCurrentValue: true}); 
$("#ex1").on("slide", function(slideEvt) {
	fillSize = slideEvt.value;
	canvas.freeDrawingBrush.width = fillSize; 
	$("#ex1_value").text(fillSize);
});


var brush_color = $('.brush_color .colorpickerplus-container');
brush_color.colorpickerembed();
brush_color.on('changeColor', function(e,color){
	var el = $('.color-fill-icon', $('#palette'));
	fillStyle = color;
	canvas.freeDrawingBrush.color = fillStyle;
	
	if(color==null) {
		el.addClass('colorpicker-color');
	} else {
		el.removeClass('colorpicker-color');
		el.css('background-color', color);
	}
});

function InputImage(){   
	$(surgeryConfig.fileUpload).click();
}
function readImage() {
	
	var reader = new FileReader();
	var ctx = canvas.getContext('2d');
	reader.onload = function (event){
		var imgObj = new Image();
		imgObj.src = event.target.result;
		imgObj.onload = function () {
			
			var image = new fabric.Image(imgObj);
			image.set({left: 300,top: 0});
			image.scaleToHeight(300);
			image.scaleToWidth(300);
			canvas.centerObject(image);
			canvas.add(image);
			canvas.renderAll();
		}
	}
	reader.readAsDataURL(event.target.files[0]);
}

var fileUpload  = el("fileUpload");
if(fileUpload){ 
    fileUpload.addEventListener("change", readImage, false);
}

function saveCanvas() {
    var img_b64 = canvas.toDataURL();
    var png = img_b64.split(',')[1];
   $(surgeryConfig.dataimage).val(png);
   console.log("save canvas successfully");
}