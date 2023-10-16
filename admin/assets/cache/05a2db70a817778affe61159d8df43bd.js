function el(id){return document.getElementById(id);} 

treansConfig = {
    modelItem: '#myModalAddStock',
    transferamount: '#transfer_amount',
    tabletransfer: '#table_transfer',
    additem :{'form':"additem_form",'link':"saveitem"},
}

var itemUrl = {
    stock_url:config.base_url+"transfer/api/transfer_api/getstock",
    item_url:config.base_url+"transfer/api/transfer_api/getItem",
    deleteitem_url:config.base_url+"transfer/api/transfer_api/deleteitem",
    deletetransfer_url:config.base_url+"transfer/api/transfer_api/deletetransfer",
    submitfransfer_url:config.base_url+"transfer/transferitem",
}

var modalUrl = {
    addItem:config.base_url+"transfer/api/transfer_modal/addItem",
}

function submitItem(){
  var amount = $(treansConfig.transferamount).val();
  var from_stock_warehouse_info = el("from_stock_warehouse_info");
  if(from_stock_warehouse_info != null){
      if(from_stock_warehouse_info.options.length){
          var stock_qty = from_stock_warehouse_info.options[from_stock_warehouse_info.selectedIndex].getAttribute('data-stock-qty');
          if(stock_qty == '' || stock_qty == 0){
              swal('ข้อความจากระบบ','สินค้าในคลังนี้ไม่มีอยู่  ไม่สามาร๔โอนสินค้าได้');
              return false;
          }
      }else{
        swal('ข้อความจากระบบ','สินค้าในคลังนี้ไม่มีอยู่  ไม่สามารถโอนสินค้าได้');
        return false;
      }
  }
  if(amount == '' || amount == 0){
    swal('ข้อความจากระบบ','กรุณาระบุจำนวนสินค้าที่โอน');
    return false;
  }

  $(treansConfig.modelItem).modal('hide');
  
  var myform = document.getElementById(treansConfig.additem.form);
  var form_data = new FormData(myform);
  form_data.append("transfer_uid", transfer_uid);

  $.ajax({    
      url: Config.base_url+'transfer/api/transfer_api/'+treansConfig.additem.link,
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      data: form_data,
         
      success: function (data) {
          var data = JSON.parse(data);
          console.log(data);
          transfer_table.ajax.reload();

      }
  });
}

function loadModalAddItem(uid){
  $("#modal_container").empty();
    modelurl = modalUrl.addItem+'/'+uid;

  $("#modal_container").load(modelurl,function() {
    $(treansConfig.modelItem).modal("show");
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

    loadModalAddItem(uid);
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

function startDatatable(){
    if($(treansConfig.tabletransfer).length){
        transfer_table = $(treansConfig.tabletransfer).DataTable({
            "sPaginationType": "full_numbers",
            "dom": ' tpi', 
            "columns": [
                    {"width": "15%" },
                    {"width": "15%",},
                    {"width": "20%" },
                    {"width": "20%" },
                    {"width": "15%" },
                    {"width": "15%" },
             ],
            "ajax": {
            "url": itemUrl.item_url+'/'+transfer_uid,
            "data": function ( d ) {
              
            }
          }
        });
    }
}
startDatatable();

function submitTransfer(){
  swal({   
      title: "ข้อความจากระบบ",   
      text: "ยืนยันการโอนย้ายสินค้า",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "ยืนยัน",   
      cancelButtonText: "ยกเลิก",   
      closeOnConfirm: false,  
  },function(isConfirm){   
      if (isConfirm) {    
        window.location = itemUrl.submitfransfer_url+'/'+transfer_uid;  
      }
  });
}

function cancelTransfer(){
  swal({   
      title: "ข้อความจากระบบ",   
      text: "คุณต้องการยกเลิกใบโอนสินค้านี้",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "ยืนยัน",   
      cancelButtonText: "ยกเลิก",   
      closeOnConfirm: false,  
  },function(isConfirm){   
      if (isConfirm) {  
        $.ajax({
            type: 'POST',
            url: itemUrl.deletetransfer_url,
            data: {
                'transfer_uid': transfer_uid,
            },
            success: function (data) {
                var data = JSON.parse(data);
                console.log(data);
                if(data){
                  window.location = config.base_url+"stock";
                }
            }
        });
      }
  });
}

function deleteItem(){
  checkedid = [];
  $('.warehouse-info:checkbox').each(function(i, item){
      if($(item).is(':checked'))
      {
        checkedid.push($(item).val()); 
      }
  });
  if(checkedid.length <= 0){
    swal('ข้อความจากระบบ','กรุณาเลือกสินค้าที่ต้องการลบ');
    return false;
  }
  swal({   
      title: "ข้อความจากระบบ",   
      text: "คุณต้องการลบรายการเหล่านี้",   
      type: "warning",   
      showCancelButton: true,   
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: "ยืนยัน",   
      cancelButtonText: "ยกเลิก",   
      closeOnConfirm: false,  
  },function(isConfirm){   
      if (isConfirm) {  
        $.ajax({
            type: 'POST',
            url: itemUrl.deleteitem_url,
            data: {
                'id_arr': checkedid,
            },
            success: function (data) {
                
                var data = JSON.parse(data);
                transfer_table.ajax.reload();
                swal("ข้อความจากระบบ", "ลบข้อมูลเรียบร้อยแล้ว", "success");
            }
        });
      }
  });
}

