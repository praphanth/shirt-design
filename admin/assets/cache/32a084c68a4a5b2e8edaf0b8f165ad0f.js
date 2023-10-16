
var defaultData = new Array();
var filtering = new Object();
var animal_table;

var dataList = new Array();

var animalConfig = {
	animal_url:config.base_url+"medicalrecords/api/petowner_api/getCustomer",
	searchTable:"#search_table",
	datatable:"#pet_owner_table"	
};

animalURL = {
	modal_animal_url: config.base_url+"medicalrecords/api/medicalrecords_api/modal_animal",
};
function loadModalAnimal(uid){
	console.log(uid);
	$("#modal_container").empty();
	$("#modal_container").load(animalURL.modal_animal_url+"/"+uid, function () {
		$('#changePetOwner').modal("show");
	});
}

function startDatatableAnimal(){
	if($(animalConfig.datatable).length){
		animal_table = $(animalConfig.datatable).DataTable({
			"sPaginationType": "full_numbers",
			"dom": ' tpi', 
			"columns": [
					{"width": "5%" },
					{"width": "15%" },
					{"width": "10%" },
					{"width": "10%" },
					{"width": "10%" },
					{"width": "20%" },
			 ],
			"ajax": {
			"url": animalConfig.animal_url,
			"data": function ( d ) {
			}
		  }
		});
	}
}


$("#change_owner").click(function(){
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
		$(".check_owner").each(function(index){
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
						
					}
				});
			}
		});
	});
});





costomerConfig = {
	modal_customer_url: config.base_url+"medicalrecords/api/customer_api/modal_customer",
};
function loadModalCustomer(cuid){
	console.log(cuid);
	$("#modal_container").empty();
	$("#modal_container").load(costomerConfig.modal_customer_url+"/"+cuid, function () {
		$('#bs-example-modal').modal("show");
	});
}
(function() {

    var debug = false;

    var root = this;

    var EXIF = function(obj) {
        if (obj instanceof EXIF) return obj;
        if (!(this instanceof EXIF)) return new EXIF(obj);
        this.EXIFwrapped = obj;
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = EXIF;
        }
        exports.EXIF = EXIF;
    } else {
        root.EXIF = EXIF;
    }

    var ExifTags = EXIF.Tags = {

        
        0x9000 : "ExifVersion",             
        0xA000 : "FlashpixVersion",         

        
        0xA001 : "ColorSpace",              

        
        0xA002 : "PixelXDimension",         
        0xA003 : "PixelYDimension",         
        0x9101 : "ComponentsConfiguration", 
        0x9102 : "CompressedBitsPerPixel",  

        
        0x927C : "MakerNote",               
        0x9286 : "UserComment",             

        
        0xA004 : "RelatedSoundFile",        

        
        0x9003 : "DateTimeOriginal",        
        0x9004 : "DateTimeDigitized",       
        0x9290 : "SubsecTime",              
        0x9291 : "SubsecTimeOriginal",      
        0x9292 : "SubsecTimeDigitized",     

        
        0x829A : "ExposureTime",            
        0x829D : "FNumber",                 
        0x8822 : "ExposureProgram",         
        0x8824 : "SpectralSensitivity",     
        0x8827 : "ISOSpeedRatings",         
        0x8828 : "OECF",                    
        0x9201 : "ShutterSpeedValue",       
        0x9202 : "ApertureValue",           
        0x9203 : "BrightnessValue",         
        0x9204 : "ExposureBias",            
        0x9205 : "MaxApertureValue",        
        0x9206 : "SubjectDistance",         
        0x9207 : "MeteringMode",            
        0x9208 : "LightSource",             
        0x9209 : "Flash",                   
        0x9214 : "SubjectArea",             
        0x920A : "FocalLength",             
        0xA20B : "FlashEnergy",             
        0xA20C : "SpatialFrequencyResponse",    
        0xA20E : "FocalPlaneXResolution",   
        0xA20F : "FocalPlaneYResolution",   
        0xA210 : "FocalPlaneResolutionUnit",    
        0xA214 : "SubjectLocation",         
        0xA215 : "ExposureIndex",           
        0xA217 : "SensingMethod",           
        0xA300 : "FileSource",              
        0xA301 : "SceneType",               
        0xA302 : "CFAPattern",              
        0xA401 : "CustomRendered",          
        0xA402 : "ExposureMode",            
        0xA403 : "WhiteBalance",            
        0xA404 : "DigitalZoomRation",       
        0xA405 : "FocalLengthIn35mmFilm",   
        0xA406 : "SceneCaptureType",        
        0xA407 : "GainControl",             
        0xA408 : "Contrast",                
        0xA409 : "Saturation",              
        0xA40A : "Sharpness",               
        0xA40B : "DeviceSettingDescription",    
        0xA40C : "SubjectDistanceRange",    

        
        0xA005 : "InteroperabilityIFDPointer",
        0xA420 : "ImageUniqueID"            
    };

    var TiffTags = EXIF.TiffTags = {
        0x0100 : "ImageWidth",
        0x0101 : "ImageHeight",
        0x8769 : "ExifIFDPointer",
        0x8825 : "GPSInfoIFDPointer",
        0xA005 : "InteroperabilityIFDPointer",
        0x0102 : "BitsPerSample",
        0x0103 : "Compression",
        0x0106 : "PhotometricInterpretation",
        0x0112 : "Orientation",
        0x0115 : "SamplesPerPixel",
        0x011C : "PlanarConfiguration",
        0x0212 : "YCbCrSubSampling",
        0x0213 : "YCbCrPositioning",
        0x011A : "XResolution",
        0x011B : "YResolution",
        0x0128 : "ResolutionUnit",
        0x0111 : "StripOffsets",
        0x0116 : "RowsPerStrip",
        0x0117 : "StripByteCounts",
        0x0201 : "JPEGInterchangeFormat",
        0x0202 : "JPEGInterchangeFormatLength",
        0x012D : "TransferFunction",
        0x013E : "WhitePoint",
        0x013F : "PrimaryChromaticities",
        0x0211 : "YCbCrCoefficients",
        0x0214 : "ReferenceBlackWhite",
        0x0132 : "DateTime",
        0x010E : "ImageDescription",
        0x010F : "Make",
        0x0110 : "Model",
        0x0131 : "Software",
        0x013B : "Artist",
        0x8298 : "Copyright"
    };

    var GPSTags = EXIF.GPSTags = {
        0x0000 : "GPSVersionID",
        0x0001 : "GPSLatitudeRef",
        0x0002 : "GPSLatitude",
        0x0003 : "GPSLongitudeRef",
        0x0004 : "GPSLongitude",
        0x0005 : "GPSAltitudeRef",
        0x0006 : "GPSAltitude",
        0x0007 : "GPSTimeStamp",
        0x0008 : "GPSSatellites",
        0x0009 : "GPSStatus",
        0x000A : "GPSMeasureMode",
        0x000B : "GPSDOP",
        0x000C : "GPSSpeedRef",
        0x000D : "GPSSpeed",
        0x000E : "GPSTrackRef",
        0x000F : "GPSTrack",
        0x0010 : "GPSImgDirectionRef",
        0x0011 : "GPSImgDirection",
        0x0012 : "GPSMapDatum",
        0x0013 : "GPSDestLatitudeRef",
        0x0014 : "GPSDestLatitude",
        0x0015 : "GPSDestLongitudeRef",
        0x0016 : "GPSDestLongitude",
        0x0017 : "GPSDestBearingRef",
        0x0018 : "GPSDestBearing",
        0x0019 : "GPSDestDistanceRef",
        0x001A : "GPSDestDistance",
        0x001B : "GPSProcessingMethod",
        0x001C : "GPSAreaInformation",
        0x001D : "GPSDateStamp",
        0x001E : "GPSDifferential"
    };

     
    var IFD1Tags = EXIF.IFD1Tags = {
        0x0100: "ImageWidth",
        0x0101: "ImageHeight",
        0x0102: "BitsPerSample",
        0x0103: "Compression",
        0x0106: "PhotometricInterpretation",
        0x0111: "StripOffsets",
        0x0112: "Orientation",
        0x0115: "SamplesPerPixel",
        0x0116: "RowsPerStrip",
        0x0117: "StripByteCounts",
        0x011A: "XResolution",
        0x011B: "YResolution",
        0x011C: "PlanarConfiguration",
        0x0128: "ResolutionUnit",
        0x0201: "JpegIFOffset",    
        0x0202: "JpegIFByteCount", 
        0x0211: "YCbCrCoefficients",
        0x0212: "YCbCrSubSampling",
        0x0213: "YCbCrPositioning",
        0x0214: "ReferenceBlackWhite"
    };

    var StringValues = EXIF.StringValues = {
        ExposureProgram : {
            0 : "Not defined",
            1 : "Manual",
            2 : "Normal program",
            3 : "Aperture priority",
            4 : "Shutter priority",
            5 : "Creative program",
            6 : "Action program",
            7 : "Portrait mode",
            8 : "Landscape mode"
        },
        MeteringMode : {
            0 : "Unknown",
            1 : "Average",
            2 : "CenterWeightedAverage",
            3 : "Spot",
            4 : "MultiSpot",
            5 : "Pattern",
            6 : "Partial",
            255 : "Other"
        },
        LightSource : {
            0 : "Unknown",
            1 : "Daylight",
            2 : "Fluorescent",
            3 : "Tungsten (incandescent light)",
            4 : "Flash",
            9 : "Fine weather",
            10 : "Cloudy weather",
            11 : "Shade",
            12 : "Daylight fluorescent (D 5700 - 7100K)",
            13 : "Day white fluorescent (N 4600 - 5400K)",
            14 : "Cool white fluorescent (W 3900 - 4500K)",
            15 : "White fluorescent (WW 3200 - 3700K)",
            17 : "Standard light A",
            18 : "Standard light B",
            19 : "Standard light C",
            20 : "D55",
            21 : "D65",
            22 : "D75",
            23 : "D50",
            24 : "ISO studio tungsten",
            255 : "Other"
        },
        Flash : {
            0x0000 : "Flash did not fire",
            0x0001 : "Flash fired",
            0x0005 : "Strobe return light not detected",
            0x0007 : "Strobe return light detected",
            0x0009 : "Flash fired, compulsory flash mode",
            0x000D : "Flash fired, compulsory flash mode, return light not detected",
            0x000F : "Flash fired, compulsory flash mode, return light detected",
            0x0010 : "Flash did not fire, compulsory flash mode",
            0x0018 : "Flash did not fire, auto mode",
            0x0019 : "Flash fired, auto mode",
            0x001D : "Flash fired, auto mode, return light not detected",
            0x001F : "Flash fired, auto mode, return light detected",
            0x0020 : "No flash function",
            0x0041 : "Flash fired, red-eye reduction mode",
            0x0045 : "Flash fired, red-eye reduction mode, return light not detected",
            0x0047 : "Flash fired, red-eye reduction mode, return light detected",
            0x0049 : "Flash fired, compulsory flash mode, red-eye reduction mode",
            0x004D : "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            0x004F : "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            0x0059 : "Flash fired, auto mode, red-eye reduction mode",
            0x005D : "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            0x005F : "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod : {
            1 : "Not defined",
            2 : "One-chip color area sensor",
            3 : "Two-chip color area sensor",
            4 : "Three-chip color area sensor",
            5 : "Color sequential area sensor",
            7 : "Trilinear sensor",
            8 : "Color sequential linear sensor"
        },
        SceneCaptureType : {
            0 : "Standard",
            1 : "Landscape",
            2 : "Portrait",
            3 : "Night scene"
        },
        SceneType : {
            1 : "Directly photographed"
        },
        CustomRendered : {
            0 : "Normal process",
            1 : "Custom process"
        },
        WhiteBalance : {
            0 : "Auto white balance",
            1 : "Manual white balance"
        },
        GainControl : {
            0 : "None",
            1 : "Low gain up",
            2 : "High gain up",
            3 : "Low gain down",
            4 : "High gain down"
        },
        Contrast : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        Saturation : {
            0 : "Normal",
            1 : "Low saturation",
            2 : "High saturation"
        },
        Sharpness : {
            0 : "Normal",
            1 : "Soft",
            2 : "Hard"
        },
        SubjectDistanceRange : {
            0 : "Unknown",
            1 : "Macro",
            2 : "Close view",
            3 : "Distant view"
        },
        FileSource : {
            3 : "DSC"
        },

        Components : {
            0 : "",
            1 : "Y",
            2 : "Cb",
            3 : "Cr",
            4 : "R",
            5 : "G",
            6 : "B"
        }
    };

    function addEvent(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, handler);
        }
    }

    function imageHasData(img) {
        return !!(img.exifdata);
    }


    function base64ToArrayBuffer(base64, contentType) {
        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; 
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        var binary = atob(base64);
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        return buffer;
    }

    function objectURLToBlob(url, callback) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.responseType = "blob";
        http.onload = function(e) {
            if (this.status == 200 || this.status === 0) {
                callback(this.response);
            }
        };
        http.send();
    }

    function getImageData(img, callback) {
        function handleBinaryFile(binFile) {
            var data = findEXIFinJPEG(binFile);
            img.exifdata = data || {};
            var iptcdata = findIPTCinJPEG(binFile);
            img.iptcdata = iptcdata || {};
            if (EXIF.isXmpEnabled) {
               var xmpdata= findXMPinJPEG(binFile);
               img.xmpdata = xmpdata || {};               
            }
            if (callback) {
                callback.call(img);
            }
        }

        if (img.src) {
            if (/^data\:/i.test(img.src)) { 
                var arrayBuffer = base64ToArrayBuffer(img.src);
                handleBinaryFile(arrayBuffer);

            } else if (/^blob\:/i.test(img.src)) { 
                var fileReader = new FileReader();
                fileReader.onload = function(e) {
                    handleBinaryFile(e.target.result);
                };
                objectURLToBlob(img.src, function (blob) {
                    fileReader.readAsArrayBuffer(blob);
                });
            } else {
                var http = new XMLHttpRequest();
                http.onload = function() {
                    if (this.status == 200 || this.status === 0) {
                        handleBinaryFile(http.response);
                    } else {
                        throw "Could not load image";
                    }
                    http = null;
                };
                http.open("GET", img.src, true);
                http.responseType = "arraybuffer";
                http.send(null);
            }
        } else if (self.FileReader && (img instanceof self.Blob || img instanceof self.File)) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                if (debug) console.log("Got file of length " + e.target.result.byteLength);
                handleBinaryFile(e.target.result);
            };

            fileReader.readAsArrayBuffer(img);
        }
    }

    function findEXIFinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; 
        }

        var offset = 2,
            length = file.byteLength,
            marker;

        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
                return false; 
            }

            marker = dataView.getUint8(offset + 1);
            if (debug) console.log(marker);

            
            

            if (marker == 225) {
                if (debug) console.log("Found 0xFFE1 marker");

                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

                

            } else {
                offset += 2 + dataView.getUint16(offset+2);
            }

        }

    }

    function findIPTCinJPEG(file) {
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            if (debug) console.log("Not a valid JPEG");
            return false; 
        }

        var offset = 2,
            length = file.byteLength;


        var isFieldSegmentStart = function(dataView, offset){
            return (
                dataView.getUint8(offset) === 0x38 &&
                dataView.getUint8(offset+1) === 0x42 &&
                dataView.getUint8(offset+2) === 0x49 &&
                dataView.getUint8(offset+3) === 0x4D &&
                dataView.getUint8(offset+4) === 0x04 &&
                dataView.getUint8(offset+5) === 0x04
            );
        };

        while (offset < length) {

            if ( isFieldSegmentStart(dataView, offset )){

                
                var nameHeaderLength = dataView.getUint8(offset+7);
                if(nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
                
                if(nameHeaderLength === 0) {
                    
                    nameHeaderLength = 4;
                }

                var startOffset = offset + 8 + nameHeaderLength;
                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

                return readIPTCData(file, startOffset, sectionLength);

                break;

            }


            
            offset++;

        }

    }
    var IptcFieldMap = {
        0x78 : 'caption',
        0x6E : 'credit',
        0x19 : 'keywords',
        0x37 : 'dateCreated',
        0x50 : 'byline',
        0x55 : 'bylineTitle',
        0x7A : 'captionWriter',
        0x69 : 'headline',
        0x74 : 'copyright',
        0x0F : 'category'
    };
    function readIPTCData(file, startOffset, sectionLength){
        var dataView = new DataView(file);
        var data = {};
        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
        var segmentStartPos = startOffset;
        while(segmentStartPos < startOffset+sectionLength) {
            if(dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos+1) === 0x02){
                segmentType = dataView.getUint8(segmentStartPos+2);
                if(segmentType in IptcFieldMap) {
                    dataSize = dataView.getInt16(segmentStartPos+3);
                    segmentSize = dataSize + 5;
                    fieldName = IptcFieldMap[segmentType];
                    fieldValue = getStringFromDB(dataView, segmentStartPos+5, dataSize);
                    
                    if(data.hasOwnProperty(fieldName)) {
                        
                        if(data[fieldName] instanceof Array) {
                            data[fieldName].push(fieldValue);
                        }
                        else {
                            data[fieldName] = [data[fieldName], fieldValue];
                        }
                    }
                    else {
                        data[fieldName] = fieldValue;
                    }
                }

            }
            segmentStartPos++;
        }
        return data;
    }



    function readTags(file, tiffStart, dirStart, strings, bigEnd) {
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;

        for (i=0;i<entries;i++) {
            entryOffset = dirStart + i*12 + 2;
            tag = strings[file.getUint16(entryOffset, !bigEnd)];
            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
        }
        return tags;
    }


    function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset+2, !bigEnd),
            numValues = file.getUint32(entryOffset+4, !bigEnd),
            valueOffset = file.getUint32(entryOffset+8, !bigEnd) + tiffStart,
            offset,
            vals, val, n,
            numerator, denominator;

        switch (type) {
            case 1: 
            case 7: 
                if (numValues == 1) {
                    return file.getUint8(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: 
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return getStringFromDB(file, offset, numValues-1);

            case 3: 
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint16(offset + 2*n, !bigEnd);
                    }
                    return vals;
                }

            case 4: 
                if (numValues == 1) {
                    return file.getUint32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getUint32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 5:    
                if (numValues == 1) {
                    numerator = file.getUint32(valueOffset, !bigEnd);
                    denominator = file.getUint32(valueOffset+4, !bigEnd);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        numerator = file.getUint32(valueOffset + 8*n, !bigEnd);
                        denominator = file.getUint32(valueOffset+4 + 8*n, !bigEnd);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: 
                if (numValues == 1) {
                    return file.getInt32(entryOffset + 8, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 4*n, !bigEnd);
                    }
                    return vals;
                }

            case 10: 
                if (numValues == 1) {
                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset+4, !bigEnd);
                } else {
                    vals = [];
                    for (n=0;n<numValues;n++) {
                        vals[n] = file.getInt32(valueOffset + 8*n, !bigEnd) / file.getInt32(valueOffset+4 + 8*n, !bigEnd);
                    }
                    return vals;
                }
        }
    }

    
    function getNextIFDOffset(dataView, dirStart, bigEnd){
        
        var entries = dataView.getUint16(dirStart, !bigEnd);

        
        
        

        return dataView.getUint32(dirStart + 2 + entries * 12, !bigEnd); 
    }

    function readThumbnailImage(dataView, tiffStart, firstIFDOffset, bigEnd){
        
        var IFD1OffsetPointer = getNextIFDOffset(dataView, tiffStart+firstIFDOffset, bigEnd);

        if (!IFD1OffsetPointer) {
            
            return {};
        }
        else if (IFD1OffsetPointer > dataView.byteLength) { 
            
            return {};
        }
        

        var thumbTags = readTags(dataView, tiffStart, tiffStart + IFD1OffsetPointer, IFD1Tags, bigEnd)

        

        
        
        
        
        

        if (thumbTags['Compression']) {
            

            switch (thumbTags['Compression']) {
                case 6:
                    
                    if (thumbTags.JpegIFOffset && thumbTags.JpegIFByteCount) {
                    
                        var tOffset = tiffStart + thumbTags.JpegIFOffset;
                        var tLength = thumbTags.JpegIFByteCount;
                        thumbTags['blob'] = new Blob([new Uint8Array(dataView.buffer, tOffset, tLength)], {
                            type: 'image/jpeg'
                        });
                    }
                break;

            case 1:
                console.log("Thumbnail image format is TIFF, which is not implemented.");
                break;
            default:
                console.log("Unknown thumbnail image format '%s'", thumbTags['Compression']);
            }
        }
        else if (thumbTags['PhotometricInterpretation'] == 2) {
            console.log("Thumbnail image format is RGB, which is not implemented.");
        }
        return thumbTags;
    }

    function getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (var n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }

    function readEXIFData(file, start) {
        if (getStringFromDB(file, start, 4) != "Exif") {
            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
            return false;
        }

        var bigEnd,
            tags, tag,
            exifData, gpsData,
            tiffOffset = start + 6;

        
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
            return false;
        }

        if (file.getUint16(tiffOffset+2, !bigEnd) != 0x002A) {
            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }

        var firstIFDOffset = file.getUint32(tiffOffset+4, !bigEnd);

        if (firstIFDOffset < 0x00000008) {
            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset+4, !bigEnd));
            return false;
        }

        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

        if (tags.ExifIFDPointer) {
            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
            for (tag in exifData) {
                switch (tag) {
                    case "LightSource" :
                    case "Flash" :
                    case "MeteringMode" :
                    case "ExposureProgram" :
                    case "SensingMethod" :
                    case "SceneCaptureType" :
                    case "SceneType" :
                    case "CustomRendered" :
                    case "WhiteBalance" :
                    case "GainControl" :
                    case "Contrast" :
                    case "Saturation" :
                    case "Sharpness" :
                    case "SubjectDistanceRange" :
                    case "FileSource" :
                        exifData[tag] = StringValues[tag][exifData[tag]];
                        break;

                    case "ExifVersion" :
                    case "FlashpixVersion" :
                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
                        break;

                    case "ComponentsConfiguration" :
                        exifData[tag] =
                            StringValues.Components[exifData[tag][0]] +
                            StringValues.Components[exifData[tag][1]] +
                            StringValues.Components[exifData[tag][2]] +
                            StringValues.Components[exifData[tag][3]];
                        break;
                }
                tags[tag] = exifData[tag];
            }
        }

        if (tags.GPSInfoIFDPointer) {
            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
            for (tag in gpsData) {
                switch (tag) {
                    case "GPSVersionID" :
                        gpsData[tag] = gpsData[tag][0] +
                            "." + gpsData[tag][1] +
                            "." + gpsData[tag][2] +
                            "." + gpsData[tag][3];
                        break;
                }
                tags[tag] = gpsData[tag];
            }
        }

        
        tags['thumbnail'] = readThumbnailImage(file, tiffOffset, firstIFDOffset, bigEnd);

        return tags;
    }

   function findXMPinJPEG(file) {

        if (!('DOMParser' in self)) {
            
            return;
        }
        var dataView = new DataView(file);

        if (debug) console.log("Got file of length " + file.byteLength);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
           if (debug) console.log("Not a valid JPEG");
           return false; 
        }

        var offset = 2,
            length = file.byteLength,
            dom = new DOMParser();

        while (offset < (length-4)) {
            if (getStringFromDB(dataView, offset, 4) == "http") {
                var startOffset = offset - 1;
                var sectionLength = dataView.getUint16(offset - 2) - 1;
                var xmpString = getStringFromDB(dataView, startOffset, sectionLength)
                var xmpEndIndex = xmpString.indexOf('xmpmeta>') + 8;
                xmpString = xmpString.substring( xmpString.indexOf( '<x:xmpmeta' ), xmpEndIndex );

                var indexOfXmp = xmpString.indexOf('x:xmpmeta') + 10
                
                
                xmpString = xmpString.slice(0, indexOfXmp)
                            + 'xmlns:Iptc4xmpCore="http:\/\/iptc.org/std/Iptc4xmpCore/1.0/xmlns/" '
                            + 'xmlns:xsi="http:\/\/www.w3.org/2001/XMLSchema-instance" '
                            + 'xmlns:tiff="http:\/\/ns.adobe.com/tiff/1.0/" '
                            + 'xmlns:plus="http:\/\/schemas.android.com/apk/lib/com.google.android.gms.plus" '
                            + 'xmlns:ext="http:\/\/www.gettyimages.com/xsltExtension/1.0" '
                            + 'xmlns:exif="http:cns.adobe.com/exif/1.0/" '
                            + 'xmlns:stEvt="http:\/\/ns.adobe.com/xap/1.0/sType/ResourceEvent#" '
                            + 'xmlns:stRef="http:\/\/ns.adobe.com/xap/1.0/sType/ResourceRef#" '
                            + 'xmlns:crs="http:\/\/ns.adobe.com/camera-raw-settings/1.0/" '
                            + 'xmlns:xapGImg="http:\/\/ns.adobe.com/xap/1.0/g/img/" '
                            + 'xmlns:Iptc4xmpExt="http:\/\/iptc.org/std/Iptc4xmpExt/2008-02-29/" '
                            + xmpString.slice(indexOfXmp)

                var domDocument = dom.parseFromString( xmpString, 'text/xml' );
                return xml2Object(domDocument);
            } else{
             offset++;
            }
        }
    }

    function xml2json(xml) {
        var json = {};
      
        if (xml.nodeType == 1) { 
          if (xml.attributes.length > 0) {
            json['@attributes'] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              json['@attributes'][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) { 
          return xml.nodeValue;
        }
      
        
        if (xml.hasChildNodes()) {
          for(var i = 0; i < xml.childNodes.length; i++) {
            var child = xml.childNodes.item(i);
            var nodeName = child.nodeName;
            if (json[nodeName] == null) {
              json[nodeName] = xml2json(child);
            } else {
              if (json[nodeName].push == null) {
                var old = json[nodeName];
                json[nodeName] = [];
                json[nodeName].push(old);
              }
              json[nodeName].push(xml2json(child));
            }
          }
        }
        
        return json;
    }

    function xml2Object(xml) {
        try {
            var obj = {};
            if (xml.children.length > 0) {
              for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var attributes = item.attributes;
                for(var idx in attributes) {
                    var itemAtt = attributes[idx];
                    var dataKey = itemAtt.nodeName;
                    var dataValue = itemAtt.nodeValue;

                    if(dataKey !== undefined) {
                        obj[dataKey] = dataValue;
                    }
                }
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                  obj[nodeName] = xml2json(item);
                } else {
                  if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];

                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                  }
                  obj[nodeName].push(xml2json(item));
                }
              }
            } else {
              obj = xml.textContent;
            }
            return obj;
          } catch (e) {
              console.log(e.message);
          }
    }

    EXIF.enableXmp = function() {
        EXIF.isXmpEnabled = true;
    }

    EXIF.disableXmp = function() {
        EXIF.isXmpEnabled = false;
    }

    EXIF.getData = function(img, callback) {
        if (((self.Image && img instanceof self.Image)
            || (self.HTMLImageElement && img instanceof self.HTMLImageElement))
            && !img.complete)
            return false;

        if (!imageHasData(img)) {
            getImageData(img, callback);
        } else {
            if (callback) {
                callback.call(img);
            }
        }
        return true;
    }

    EXIF.getTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.exifdata[tag];
    }
    
    EXIF.getIptcTag = function(img, tag) {
        if (!imageHasData(img)) return;
        return img.iptcdata[tag];
    }

    EXIF.getAllTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.exifdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }
    
    EXIF.getAllIptcTags = function(img) {
        if (!imageHasData(img)) return {};
        var a,
            data = img.iptcdata,
            tags = {};
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                tags[a] = data[a];
            }
        }
        return tags;
    }

    EXIF.pretty = function(img) {
        if (!imageHasData(img)) return "";
        var a,
            data = img.exifdata,
            strPretty = "";
        for (a in data) {
            if (data.hasOwnProperty(a)) {
                if (typeof data[a] == "object") {
                    if (data[a] instanceof Number) {
                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
                    } else {
                        strPretty += a + " : [" + data[a].length + " values]\r\n";
                    }
                } else {
                    strPretty += a + " : " + data[a] + "\r\n";
                }
            }
        }
        return strPretty;
    }

    EXIF.readFromBinaryFile = function(file) {
        return findEXIFinJPEG(file);
    }

    if (typeof define === 'function' && define.amd) {
        define('exif-js', [], function() {
            return EXIF;
        });
    }
}.call(this));
function el(id){return document.getElementById(id);} 

var expense_table;
var appointment_table;

Configmedicalrecords = {
    typewarn : "#typewarn",
    petwarning : "#pet-warning",
    warning : "#warning_",
    cardwarning : "#cardwarning",
    warningDetail : "#warningDetail",
    alerttype : ".alerttype",
    alertwarning : ".alert-warning",
    alertdanger : ".alert-danger",
    alertinfo : ".alert-info",
    iconcircle : 'fa-exclamation-circle',
    icontriangle : 'fa-exclamation-triangle',
    expense_url:config.base_url+"medicalrecords/api/medicalrecords_api/getexpense",
    appointment_url:config.base_url+"medicalrecords/api/medicalrecords_api/getappointment",
    admit_url:config.base_url+"medicalrecords/api/medicalrecords_api/getadmit",
    cusexpense_url:config.base_url+"medicalrecords/api/medicalrecords_api/getexpensecustommer",
    datatableexpense:"#expense_datatable",
    datatableappointment:"#appointment_datatable",
    datatableadmit:"#admit_datatable",
    datatablecusexpense:"#cusexpense_datatable",
};


var formpet = [
    {'form':"warning_form",'link':"savewarninglist"},
];

function DeleteWarning(warning_id){
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
            swal("ข้อความจากระบบ", "ลบข้อมูลเรียบร้อยแ้ว", "success");

            $.ajax({
                type: 'POST',
                url: Config.base_url+'pet/api/pet_api/deleteWarning',
                data: {
                    'warning_id': warning_id
                },
                success: function (data) {
                    
                    var data = JSON.parse(data);
                    console.log(data.warning_id);

                    $(Configmedicalrecords.warning+data.warning_id).remove();

                    if(data.num <= 0){
                        $(Configmedicalrecords.cardwarning).append('<div class="d-flex align-items-center alert alert-info alerttype">'+ 
                            '<div class="col-lg-12">'+
                                '<i class="fa fa-exclamation-triangle"></i> ไม่มีข้อมูลการแพ้ยา หรือ ข้อควรระวังสำหรับสัตว์เลี้ยง'+
                            '</div>'+
                        '</div>');
                    }
                }
            });
        }
    });

}

function submitWarning(){
    var typeid = $(Configmedicalrecords.typewarn).val();

    if(typeid == 0){
        swal("ข้อความจากระบบ","กรุณาเลือกประเภทหัวข้อ");
        return false;
    }

   var warningDetail = $(Configmedicalrecords.warningDetail).val();

    if(warningDetail.length <= 0){
        swal("ข้อความจากระบบ","กรุณากรอกข้อมูล");
        return false;
    }

    if(typeid == 1){
        var icon = Configmedicalrecords.iconcircle;
        var color = Configmedicalrecords.alertdanger.replace('.','');
    }

    if(typeid == 2){
        var icon = Configmedicalrecords.icontriangle;
        var color = Configmedicalrecords.alertwarning.replace('.','');
    }

    var myform  = el(formpet[0].form);
    var form_data = new FormData(myform);
    console.log(pet_uid);
    form_data.append("pet_uid", pet_uid);

    $.ajax({    
        url: Config.base_url+'pet/api/pet_api/'+formpet[0].link,
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: form_data,
           
        success: function (data) {
            var data = JSON.parse(data);
            console.log(data);
            $(Configmedicalrecords.alertinfo).remove();

            $(Configmedicalrecords.cardwarning).append('<div id="warning_'+data+'" class="d-flex align-items-center alert '+color+' alerttype">'+
                '<div class="col-lg-11"> '+
                    '<i class="fa '+icon+'"></i> '+warningDetail+'</div>'+
                '<div class="col-lg-1">'+
                    '<button onclick="DeleteWarning('+data+');" type="button" class="btn btn-danger"><i class="fa fa-times"></i> </button>'+
                '</div>'+
            '</div>');

            swal("ข้อความจากระบบ","บันทึกข้อมูลเรีบยร้อยแล้ว");

            
             
        }
    }); 
}

function startDatatable(){
    if($(Configmedicalrecords.datatableexpense).length){
        expense_table = $(Configmedicalrecords.datatableexpense).DataTable({
            "sPaginationType": "full_numbers",
             order: [[0, 'DESC']],
            "dom": ' tpi', 
            "columns": [
                    {"width": "15%",data: {
                        _:    "datetime.display",
                        sort: "datetime.timestamp"
                    }},
                    {"width": "15%",data: "name" },
                    {"width": "15%",data: "expense_id" },
                    {"width": "10%",data: "typename" },
                    {"width": "10%",data: "total" },
                    {"width": "10%",data: "deposit" },
                    {"width": "10%",data: "remaining" },
                    {"width": "10%",data: "status" }
             ],
            "ajax": {
            "url": Configmedicalrecords.expense_url+'/'+pet_uid,
            "data": function ( d ) {
              
            }
          }
        });
    }
    
    if($(Configmedicalrecords.datatableappointment).length){
        appointment_table = $(Configmedicalrecords.datatableappointment).DataTable({
            "sPaginationType": "full_numbers",
            "dom": ' tpi', 
            "ordering": false,
            "columns": [
                    {"width": "15%",data: {
                        _:    "datetime.display",
                        sort: "datetime.timestamp"
                    } },
                    {"width": "15%",data: "pet_id" },
                    {"width": "10%",data: "name" },
                    {"width": "10%",data: "tel" },
                    {"width": "10%",data: "lineid" },
                    {"width": "10%",data: "modename" },
                    {"width": "10%",data: "more_info" },
                    {"width": "10%",data: "doctor" },
                    {"width": "10%",data: "user" }
             ],
            "ajax": {
            "url": Configmedicalrecords.appointment_url+'/'+pet_uid,
            "data": function ( d ) {
              
            }
          }
        });
    }

    if($(Configmedicalrecords.datatableadmit).length){

        admit_table = $(Configmedicalrecords.datatableadmit).DataTable({
            "sPaginationType": "full_numbers",
            "dom": ' tpi', 
            "columns": [
                    {"width": "15%" },
                    {"width": "15%" },
                    {"width": "10%" },
                    {"width": "10%" },
                    {"width": "10%" },
             ],
            "ajax": {
            "url": Configmedicalrecords.admit_url+'/'+pet_uid,
            "data": function ( d ) {
              
            }
          }
        });

    }

    if($(Configmedicalrecords.datatablecusexpense).length){

        $(Configmedicalrecords.datatablecusexpense).DataTable({
            "sPaginationType": "full_numbers",
            "dom": ' tpi', 
            order: [[0, 'DESC']],
            "columns": [
                    {"width":"15%",data: {
                        _:    "datetime.display",
                        sort: "datetime.timestamp"
                    }},
                    {"width": "15%",data: "name" },
                    {"width": "10%",data: "expense_id"},
                    {"width": "10%",data: "typename" },
                    {"width": "10%",data: "total" },
                    {"width": "10%",data: "deposit" },
                    {"width": "10%",data: "remaining" },
                    {"width": "10%",data: "status" }
             ],
            "ajax": {
            "url": Configmedicalrecords.cusexpense_url+'/'+cuid,
            "data": function ( d ) {
              
            }
          }
        });
    }
}

startDatatable();