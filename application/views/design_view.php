<?php $this->load->view("templates/header"); ?>

<link href="http://bgrins.github.io/spectrum/spectrum.css" rel="stylesheet" type="text/css">


<style type="text/css">

.displayOperations {
	display: block;
}
.hideOperations {
  display: none;
}

.controls {
	width: 100px;
	overflow: hidden;
	float: right;
	position: relative;
}

.canvas-bg {
	position: absolute;
}


.canvas-bg-wrapper {
	position: relative;
	width: 600px;
	height: 560px;
}


.canvas-container {
	width: 315px !important;
	height: 444px !important;
	top: 40px;
	left: 90px;
	/* border-style: dotted; */
	border-width: 5px 5px 5px 5px;
	-moz-border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
	-webkit-border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
	-o-border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
	border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
}

#canvas_shirt {
	position: relative;
}

div.ex3 {
  height: 300px;
  overflow: auto;
}

</style>
    <!-- Hero Section Begin -->
    <section class="hero-section" id="img-canva">
        <div class="container">
            <div class="row">
				<div class="col-lg-6">
					<div id="canvas-wrapper">
						<div class="canvas-bg-wrapper" id="change_colorchirt">
							<input type="hidden" name="change_shirt_val" class="change_shirt_val" value="0">
							<input type="hidden" name="ck_side" class="ck_side" value="1">
							<img class="canvas-bg" id="change_shirt" style="">
							<canvas width="275" height="410" id="canvas_shirt"></canvas>
						</div>
					</div>
					<div class="row pt-4">
						<div class="col-lg-12 text-center">
							<button class="btn btn-info w-25" onclick="printContent('canvas-wrapper')"><i class="fa fa-print"></i> Print</button>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="row text-center">
						<div class="col-lg-12 text-left mb-5">
							<h4>รูปแบบสินค้า</h4>
						</div>
						<div class="col-lg-3 col-md-6 pr-1 pl-1">
							<a onclick="changeShirt(1);">
								<img class="zoom" src="<?php echo base_url('assets/custom/images/Shirt/all/Shirt_1_1.png')?>">
								<p class="mt-3">คอกลมแขนสั้น</p>
							</a>
						</div>
						<div class="col-lg-3 col-md-6 pr-1 pl-1">
							<a onclick="changeShirt(2);">
								<img class="zoom" src="<?php echo base_url('assets/custom/images/Shirt/all/Shirt_2_1.png')?>">
								<p class="mt-3">คอวีแขนสั้น</p>
							</a>
						</div>
						<div class="col-lg-3 col-md-6 pr-1 pl-1">
							<a onclick="changeShirt(3);">
								<img class="zoom" src="<?php echo base_url('assets/custom/images/Shirt/all/Shirt_3_1.png')?>">
								<p class="mt-3">คอกลมแขนสั้นหญิง</p>
							</a>
						</div>
						<div class="col-lg-3 col-md-6 pr-1 pl-1">
							<a onclick="changeShirt(4);">
								<img class="zoom" src="<?php echo base_url('assets/custom/images/Shirt/all/Shirt_4_1.png')?>">
								<p class="mt-3">คอกลมแขนสั้นเด็ก</p>
							</a>
						</div>
					</div>
					
					<div class="row pt-4">
						<div class="form-group col-lg-4 col-md-4">
							<label>สีเสื้อ : &nbsp;</label>
							<input type="text" class="color_shirt" value="rgb(255, 255, 255)" onchange="changeColorShirt();">
						</div>
						<div class="form-group col-lg-4 col-md-4">
							<button onclick="deleteObjects();" class="btn btn-danger btn-block"><i class="fa fa-trash"></i> ลบวัตถุที่เลือก</button>
						</div>
						<div class="form-group col-lg-4 col-md-4">
							<button class="btn btn-info btn-block" onclick="turnOver();"><i class="fa fa-repeat"></i> กลับด้าน</button>
                        </div>
					</div>
					<div class="row pt-4">
						<div class="col-lg-12 text-left pb-4">
							<h4>ปรับแต่งสินค้า</h4>
						</div>
						<div class="col-lg-12">
							<nav>
								<div class="nav nav-tabs text-center" id="nav-tab" role="tablist">
									<a class="nav-item nav-link active" id="nav-text-tab" data-toggle="tab" href="#nav-text" role="tab" aria-controls="nav-text" aria-selected="true"><i class="fa fa-font"></i> ข้อความ</a>

									<a class="nav-item nav-link" id="nav-upload-tab" data-toggle="tab" href="#nav-upload" role="tab" aria-controls="nav-upload" aria-selected="false"><i class="fa fa-cloud-upload"></i> อัพโหลดรูป</a>

									<a class="nav-item nav-link" id="nav-objects-tab" data-toggle="tab" href="#nav-objects" role="tab" aria-controls="nav-objects" aria-selected="false"><i class="fa fa-tree"></i> เพิ่มรูปร่าง</a>
								</div>
							</nav>
							
							<div class="tab-content" id="nav-tabContent">
								<div class="tab-pane fade show active" id="nav-text" role="tabpanel" aria-labelledby="nav-text-tab">
									<div class="form-group pt-4">
									<textarea name="text_val" class="form-control text_val" rows="4"></textarea>
									</div>
									<div class="form-group">
										<button onclick="insertText();" class="btn btn-info">แทรกข้อความ</button>
									</div>
									<div id="textMenu" class="hideOperations">
										<div class="form-group pt-2">
											<label>สีข้อความ : &nbsp;</label>
											<input type="color" id="color">

										</div>
										<div class="form-group">
											<label>ขนาดข้อความ : &nbsp;</label>
											<input type="range" min="5" max="150" value="40" id="size">
										</div>
										<button id="bold" class="btn btn-info"><i class="fa fa-bold"></i></button>
										<button id="underline" class="btn btn-info"><i class="fa fa-underline"></i></button>
										<button id="italic" class="btn btn-info"><i class="fa fa-italic"></i></button>
										<button id="centered" class="btn btn-info"><i class="fa fa-align-center"></i></button>
										<button id="left" class="btn btn-info"><i class="fa fa-align-left"></i></button>
										<button id="right" class="btn btn-info"><i class="fa fa-align-right"></i></button>
									</div>
								</div>
								<div class="tab-pane fade" id="nav-upload" role="tabpanel" aria-labelledby="nav-upload-tab">
									<br>
									<div class="form-group">
										<label for="imgLoader" class="form-control custom-file-upload">
											<i class="fa fa-cloud-upload"></i> อัพโหลดไฟล์
										</label>
										<input id="imgLoader" type="file" name="imgLoader" class="form-control">
									</div>
									<p class="text-danger">หมายเหตุ : รูปภาพที่จะ Upload ใช้ Print บนเสื้อ จะต้องมีความละเอียดไม่ต่ำกว่า 400 DPI ทางร้านอาจจะไม่สามารถตรวจสอบทุกตัวได้อย่างถี่ถ้วน ดังนั้น ขอความกรุณาลูกค้าช่วยดูคุณภาพรูปให้ละเอียดก่อนสั่งซื้อ เพื่อไม่ก่อให้เกิดความผิดพลาดในการสั่งซื้อสินค้า </p>
								</div>
								<div class="tab-pane fade" id="nav-objects" role="tabpanel" aria-labelledby="nav-objects-tab">
									<div class="row pt-4">
										<div class="form-group col-lg-4 col-md-4">
											<label>สีรูปร่าง : &nbsp;</label>
											<input type='text' id="colorShape" value="rgb(220, 53, 69)" class="form-control" />
										</div>
										<div class="form-group col-lg-4 col-md-4">
											<select id="shape_style" class="w-100">
												<option value="rect" selected>สีเหลี่ยม</option>
												<option value="triangle">สามเหลี่ยม</option>
												<option value="circle">วงกลม</option>
											</select>
										</div>
										<div class="form-group col-lg-4 col-md-4">
											<button onclick="insertShape();" class="btn btn-info btn-block">เพิ่มรูปร่าง</button>
										</div>
										<div class="form-group col-lg-12 col-md-12 text-center ex3 pt-3">
											<?php
											$link_art = "";
											$img_art = "";
											for ($i=0; $i < 20; $i++) { 
												$link_art = base_url('assets/custom/images/clipart/art_'.$i.'.png');
												$img_art = '<img onclick="addClipart('.$i.')" class="zoom" width="130" src="'.$link_art.'">';
												echo $img_art;
											}
											?>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
            </div>
        </div>
    </section>
    <!-- Hero Section End -->

<?php $this->load->view("templates/footer"); ?>
<script src='http://bgrins.github.io/spectrum/spectrum.js'></script>

<script>

var canvas_shirt = new fabric.Canvas('canvas_shirt');
var art_base_url = '<?php echo base_url('assets/custom/images/clipart/art_')?>';

var img_1_1 = url_root+"assets/custom/images/Shirt/all/Shirt_1_1.png";
var img_2_1 = url_root+"assets/custom/images/Shirt/all/Shirt_2_1.png";
var img_3_1 = url_root+"assets/custom/images/Shirt/all/Shirt_3_1.png";
var img_4_1 = url_root+"assets/custom/images/Shirt/all/Shirt_4_1.png";

var img_1_2 = url_root+"assets/custom/images/Shirt/all/Shirt_2_2.png";
var img_2_2 = url_root+"assets/custom/images/Shirt/all/Shirt_2_2.png";
var img_3_2 = url_root+"assets/custom/images/Shirt/all/Shirt_3_2.png";
var img_4_2 = url_root+"assets/custom/images/Shirt/all/Shirt_4_2.png";

function changeShirt(style_shirt){
	if(style_shirt == 1){
		document.getElementById("change_shirt").src = img_1_1;
		$(".change_shirt_val").val(1);
		$(".ck_side").val(1);
	}else if(style_shirt == 2){
		document.getElementById("change_shirt").src = img_2_1;
		$(".change_shirt_val").val(2);
		$(".ck_side").val(1);
	}else if(style_shirt == 3){
		document.getElementById("change_shirt").src = img_3_1;
		$(".change_shirt_val").val(3);
		$(".ck_side").val(1);
	}else if(style_shirt == 4){
		document.getElementById("change_shirt").src = img_4_1;
		$(".change_shirt_val").val(4);
		$(".ck_side").val(1);
	}else{
		document.getElementById("change_shirt").src = img_1_1;
		$(".change_shirt_val").val(1);
		$(".ck_side").val(1);
	}
}
changeShirt(0);

function insertShape() {
	var colorShape = $("#colorShape").val();
	var shape_style = $("#shape_style").val();
	var rect = new fabric.Rect({  top: 100, left: 100, fill: colorShape, width: 120, height: 90, });
	var circle = new fabric.Circle({ top: 100, left: 100, radius: 75, fill: colorShape });
	var triangle = new fabric.Triangle({ top: 100, left: 100, width: 100, height: 100, fill: colorShape });
	if(shape_style == "triangle"){
		canvas_shirt.add(triangle);
	}else if(shape_style == "circle"){
		canvas_shirt.add(circle);
	}else{
		canvas_shirt.add(rect);
	}
}

function insertText() {
	var text_val = $('.text_val').val();
	if(text_val != ""){
		var text_name = text_val;
	}else{
		var text_name = 'hello world';
	}
	var text = new fabric.IText(text_name, { left: 40, top: 100 });
	canvas_shirt.add(text);
}

function turnOver(){
	var change_shirt_val = $(".change_shirt_val").val();
	var ck_side_val = $(".ck_side").val();
	if(change_shirt_val == 1){
		if(ck_side_val == 1){
			document.getElementById("change_shirt").src = img_1_2;
			$(".ck_side").val(2);
		}else{
			document.getElementById("change_shirt").src = img_1_1;
			$(".ck_side").val(1);
		}
	}else if(change_shirt_val == 2){
		if(ck_side_val == 1){
			document.getElementById("change_shirt").src = img_2_2;
			$(".ck_side").val(2);
		}else{
			document.getElementById("change_shirt").src = img_2_1;
			$(".ck_side").val(1);
		}
	}else if(change_shirt_val == 3){
		if(ck_side_val == 1){
			document.getElementById("change_shirt").src = img_3_2;
			$(".ck_side").val(2);
		}else{
			document.getElementById("change_shirt").src = img_3_1;
			$(".ck_side").val(1);
		}
	}else if(change_shirt_val == 4){
		if(ck_side_val == 1){
			document.getElementById("change_shirt").src = img_4_2;
			$(".ck_side").val(2);
		}else{
			document.getElementById("change_shirt").src = img_4_1;
			$(".ck_side").val(1);
		}
	}
}

function changeColorShirt(){
	var color_shirt = $(".color_shirt").val();
	var style_color = 'width: 500px; height: 540px; position: relative; background-color: '+color_shirt+';';
	document.getElementById("change_colorchirt").style = style_color;
}

function deleteObjects(){
	var activeObject = canvas_shirt.getActiveObject();
	canvas_shirt.remove(activeObject);
}

//upload image
document.getElementById('imgLoader').onchange = function handleImage(e) {
	var reader = new FileReader();
	reader.onload = function (event){
		var imgObj = new Image();
		imgObj.src = event.target.result;
		imgObj.onload = function () {
		var image = new fabric.Image(imgObj);
			image.set({
				angle: 0,
				padding: 10,
				cornersize:10,
				scaleX: 0.3,
				scaleY: 0.3,
			});
			canvas_shirt.centerObject(image);
			canvas_shirt.add(image);
			canvas_shirt.renderAll();
		}
	}
	reader.readAsDataURL(e.target.files[0]);
}

function onObjectSelected(e) {
	if ((e.target.get('type')) === "i-text") {
		document.getElementById("textMenu").className = "displayOperations";
	} else {
	// do nothing.
	}
}
canvas_shirt.on('object:selected', onObjectSelected);
document.getElementById("textMenu").className = "hideOperations";


// ##################################




// ##################################


function addClipart(id) {
	var myClipart = art_base_url+id+'.png';
	fabric.Image.fromURL(myClipart, function(myImg) {
	 var imgClipart = myImg.set({
		angle: 0,
		padding: 10,
		cornersize:10,
		scaleX: 0.05,
		scaleY: 0.05,
	});
	 canvas_shirt.add(imgClipart); 
	});
}

function addHandler(id, fn, eventName) {
	document.getElementById(id)[eventName || 'onclick'] = function() {
	var el = this;
	if (obj = canvas_shirt.getActiveObject()) {
		fn.call(el, obj);
			canvas_shirt.renderAll();
		}
	};
}

function setStyle(object, styleName, value) {
	if (object.setSelectionStyles && object.isEditing) {
		var style = { };
		style[styleName] = value;
		object.setSelectionStyles(style);
	}
	else {
		object[styleName] = value;
	}
}

function getStyle(object, styleName) {
	return (object.getSelectionStyles && object.isEditing)
	? object.getSelectionStyles()[styleName]
	: object[styleName];
}


function printContent(el) {
	var mywindow = window.open('', 'PRINT', 'height=800,width=600');

	mywindow.document.write('<html><head><title>' + document.title  + '</title>');
	mywindow.document.write('</head><body >');
	mywindow.document.write('<h1>' + document.title  + '</h1>');
	mywindow.document.write(document.getElementById(el).innerHTML);
	mywindow.document.write('</body></html>');

	mywindow.document.close(); 
	mywindow.focus(); 

	mywindow.print();
	mywindow.close();

	return true;

}



function convertCanvasToImage(aaa) {
    something = aaa[0].toDataURL("image/png");
}



addHandler('underline', function() {
	var isUnderline = getStyle(obj, 'textDecoration') === 'underline';
	setStyle(obj, 'textDecoration', isUnderline ? '' : 'underline');
});

addHandler('bold', function() {
	var isBold = getStyle(obj, 'fontStyle') === 'bold';
	setStyle(obj, 'fontStyle', isBold ? '' : 'bold');
});

addHandler('italic', function() {
	var isItalic = getStyle(obj, 'fontStyle') === 'italic';
	setStyle(obj, 'fontStyle', isItalic ? '' : 'italic');
});

addHandler('centered', function() {
	var isCentered = getStyle(obj, 'textAlign') === 'center';
	setStyle(obj, 'textAlign', isCentered ? '' : 'center');
});

addHandler('left', function() {
	var isLeft = getStyle(obj, 'textAlign') === 'left';
	setStyle(obj, 'textAlign', isLeft ? '' : 'left');
});

addHandler('right', function() {
	var isRight = getStyle(obj, 'textAlign') === 'right';
	setStyle(obj, 'textAlign', isRight ? '' : 'right');
});

addHandler('size', function(obj) {
	setStyle(obj, 'fontSize', parseInt(this.value, 10));
}, 'onchange');

addHandler('color', function(obj) {
	setStyle(obj, 'fill', this.value);
}, 'onchange');


$("#colorShape").spectrum({
    showPaletteOnly: true,
    togglePaletteOnly: true,
    togglePaletteMoreText: 'more',
    togglePaletteLessText: 'less',
    color: '#dc3545',
    palette: [
        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ]
});

$(".color_shirt").spectrum({
    showPaletteOnly: true,
    togglePaletteOnly: true,
    togglePaletteMoreText: 'more',
    togglePaletteLessText: 'less',
    color: '#fff',
    palette: [
        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ]
});
     
</script>