labConfig = {
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


function checkInputRadioInhouseLab($uid){
    $(labConfig.labinhouse_checkbox_category_+$uid).change(function () {
        if(!this.checked) {
            $(labConfig.inputradiolab+$uid).addClass("disabled").prop("disabled", true);
            $(labConfig.inputradiolab+$uid).prop("checked", false);
            $(labConfig.inputradiolab+$uid).val('');

            $(labConfig.labcategory_checkbox+$uid).prop("checked", false);
            $(labConfig.labcategory_checkbox+$uid).prop("disabled", true);
            $(labConfig.labcategory_input+$uid).val('');
            $(labConfig.labcategory_input+$uid).prop("disabled", true);

            $(labConfig.labinhouse_link+$uid).prop("checked", false);
        }else{

            $(labConfig.inputradiolab+$uid).removeClass("disabled").prop("disabled", false);
            $(labConfig.labcategory_checkbox+$uid).prop("disabled", false);

            $(labConfig.labinhouse_link+$uid).prop("checked", true);
        }
    });
}

function checkInputRadioOutLab($uid){

    $(labConfig.outlab_checkbox_category_+$uid).change(function () {
 
        if(!this.checked) {
            $(labConfig.inputradiolab+$uid).addClass("disabled").prop("disabled", true);
            $(labConfig.inputradiolab+$uid).prop("checked", false);
            $(labConfig.inputradiolab+$uid).val('');

            $(labConfig.labcategory_checkbox+$uid).prop("checked", false);
            $(labConfig.labcategory_checkbox+$uid).prop("disabled", true);
            $(labConfig.labcategory_input+$uid).val('');
            $(labConfig.labcategory_input+$uid).prop("disabled", true);

            $(labConfig.outlab_link+$uid).prop("checked", false);
        }else{

            $(labConfig.inputradiolab+$uid).removeClass("disabled").prop("disabled", false);
            $(labConfig.labcategory_checkbox+$uid).prop("disabled", false);

            $(labConfig.outlab_link+$uid).prop("checked", true);
        }
    });
}

function checkInputRadiooutLabSub($uid){
    $(labConfig.outlab_checkbox_stock_+$uid).change(function () {
        if(!this.checked) {
            $(labConfig.inputradiolabsub+$uid).addClass("disabled").prop("disabled", true);
            $(labConfig.inputradiolabsub+$uid).prop("checked", false);
            $(labConfig.inputradiolabsub+$uid).val('');
        }else{
            $(labConfig.inputradiolabsub+$uid).removeClass("disabled").prop("disabled", false);
        }
    });
}

function checkInputRadioInhouseLabSub($uid){
    $(labConfig.labinhouse_checkbox_stock_+$uid).change(function () {
        if(!this.checked) {
            $(labConfig.inputradiolabsub+$uid).addClass("disabled").prop("disabled", true);
            $(labConfig.inputradiolabsub+$uid).prop("checked", false);
            $(labConfig.inputradiolabsub+$uid).val('');
        }else{
            $(labConfig.inputradiolabsub+$uid).removeClass("disabled").prop("disabled", false);
        }
    });
}