<?php $this->load->view("templates/header"); ?>
<style type="text/css">

body {
background-image: url("https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkaSjRtQThYR1ZTRGs")
}
.hideOperations {
display: none;
}

.displayOperations {
display: block;
}

.editor-area {
overflow: hidden;
float: left;
}

.controls {
width: 100px;
overflow: hidden;
float: right;
position: relative;
}

.canvas-bg-wrapper {
position: relative;
width: 600px;
height: 560px;
}

.canvas-bg {
position: absolute;
}

.canvas-container {
width: 315px !important;
height: 400px !important;
top: 75px;
left: 155px;
border-style: solid;
border-width: 5px 5px 5px 5px;
-moz-border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
-webkit-border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
-o-border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
border-image: url(https://drive.google.com/uc?export=view&id=0B3ubyt3iIvkabEZhbkJseW5IZWc) 19 22 21 19 round;
}

#c {
position: relative;
}
</style>

	<div class="page-wrapper">
		<div class="row page-titles">
			<div class="col-md-5 align-self-center">
				<h3 class="text-themecolor">xxxx</h3>
			</div>
			<div class="col-md-7 align-self-center">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">xxxx</li>
					<li class="breadcrumb-item active">xxxx</li>
				</ol>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row pl-3 pr-3">
				<div class="col-lg-12 col-xlg-12 col-md-12">
					<div class="row">
						
						<div class="col-lg-12 mt-3">
							<div class="row padding-mps_product">
								<div class="col-lg-12">
									<div class="">
										
										<button onClick="insertText()" class="btn btn-info">insertText</button>

										<div id="textMenu" class="hideOperations">
											<button id="underline" class="btn btn-info">underline</button>
											<input type="range" min="5" max="150" value="40" id="size">
											<input type="range" min="0.1" max="5" value="0.1" id="height">
											<input type="color" id="color">
											<input type="color" id="bg-color">
											<button id="italic" class="btn btn-info">italic</button>
											<button id="centered" class="btn btn-info">centered</button>
											<button id="left" class="btn btn-info">left</button>
											<button id="right" class="btn btn-info">right</button>
										</div>
										<button onClick="insertShape()" class="btn btn-info">insertShape</button>
										<button onClick="deleteObjects()" class="btn btn-info">deleteObjects</button>
										<input type="file" id="imgLoader" class=""><br>
									</div>
								</div>
								<div class="col-lg-12">
									<div id="canvas-wrapper" class="editor-area">
										<div class="canvas-bg-wrapper">
											<img class="canvas-bg" alt="" src="https://i.imgur.com/28kU1bo.png">
											<canvas width="260" height="360" id="c"></canvas>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer"><?php echo $this->setting->getFooterTitle() ?></footer>
	</div>
</div>


<?php $this->load->view("templates/footer"); ?>
<?php $this->load->assets_by_name('home'); ?>
</body>
</html>

<script>

var canvas = new fabric.Canvas('c');

function insertShape() {
// create a rectangle with angle=45
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
});
canvas.add(rect);
}

function insertText() {
  var text = new fabric.IText('hello world', { left: 40, top: 100 });
  canvas.add(text);
}

function addHandler(id, fn, eventName) {
  document.getElementById(id)[eventName || 'onclick'] = function() {
    var el = this;
    if (obj = canvas.getActiveObject()) {
      fn.call(el, obj);
      canvas.renderAll();
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


addHandler('underline', function() {
  var isUnderline = getStyle(obj, 'textDecoration') === 'underline';
  setStyle(obj, 'textDecoration', isUnderline ? '' : 'underline');
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

addHandler('height', function(obj) {
  setStyle(obj, 'lineHeight', parseInt(this.value, 10));
}, 'onchange');

addHandler('color', function(obj) {
  setStyle(obj, 'fill', this.value);
}, 'onchange');

addHandler('bg-color', function(obj) {
  setStyle(obj, 'textBackgroundColor', this.value);
}, 'onchange');




function deleteObjects(){
	var activeObject = canvas.getActiveObject(),
    activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        if (confirm('คุณแน่ใจหรือว่าต้องการลบรายการที่เลือก;')) {
            canvas.remove(activeObject);
        }
    }
    else if (activeGroup) {
        if (confirm('คุณแน่ใจหรือว่าต้องการลบรายการที่เลือก;')) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
            canvas.remove(object);
            });
        }
    }
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


      canvas.centerObject(image);
      canvas.add(image);
      canvas.renderAll();
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
canvas.on('object:selected', onObjectSelected);

canvas.on('before:selection:cleared', function() {
  document.getElementById("textMenu").className = "hideOperations";
});


</script>


