// Quick feature detection
function isTouchEnabled() {
	return (('ontouchstart' in window)
		|| (navigator.MaxTouchPoints > 0)
		|| (navigator.msMaxTouchPoints > 0));
}

$(function(){
	addEvent('organ_1');
	addEvent('organ_2');
	addEvent('organ_3');
	addEvent('organ_4');
	addEvent('organ_5');
	addEvent('organ_6');
	addEvent('organ_7');
	addEvent('organ_8');
	addEvent('organ_9');
	addEvent('organ_10');
	addEvent('organ_11');
	addEvent('organ_12');
	addEvent('organ_13');
	addEvent('organ_14');
	addEvent('organ_15');
	addEvent('organ_16');
	addEvent('organ_17');
	addEvent('organ_18');
})


function addEvent(id,relationId){
	var _obj = $('#'+id);
	_obj.attr({'fill':organs_config[id]['upColor'],'fill-opacity':organs_config[id]['upOpacity'],'stroke':organs_config[id]['outlineUpColor'],'stroke-opacity':organs_config[id]['outlineUpOpacity']});
	_obj.attr({'cursor':'default'});
	if(organs_config[id]['enable'] == true){
		if (isTouchEnabled()) {
			_obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#organs-tip').outerWidth(), tiph=$('#organs-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':organs_config[id]['overColor'],'fill-opacity':organs_config[id]['downOpacity'],'stroke':organs_config[id]['outlineDownColor'],'stroke-opacity':organs_config[id]['outlineDownOpacity']});
				$('#organs-tip').show().html(organs_config[id]['hover']);
				$('#organs-tip').css({left:x, top:y})
			})
			_obj.on('touchend', function(){
				$('#'+id).css({'fill':organs_config[id]['upColor'],'fill-opacity':organs_config[id]['upOpacity'],'stroke':organs_config[id]['outlineUpColor'],'stroke-opacity':organs_config[id]['outlineUpOpacity']});
				if(organs_config[id]['target'] == 'new_window'){
					window.open(organs_config[id]['url']);	
				}else if(organs_config[id]['target'] == 'same_window'){
					window.parent.location.href=organs_config[id]['url'];
				}
			})
		}
		_obj.attr({'cursor':'pointer'});
		_obj.hover(function(){
			$('#organs-tip').show().html(organs_config[id]['hover']);
			_obj.css({'fill':organs_config[id]['overColor'],'fill-opacity':organs_config[id]['overOpacity'],'stroke':organs_config[id]['outlineOverColor'],'stroke-opacity':organs_config[id]['outlineOverOpacity']})
		},function(){
			$('#organs-tip').hide();
			$('#'+id).css({'fill':organs_config[id]['upColor'],'fill-opacity':organs_config[id]['upOpacity'],'stroke':organs_config[id]['outlineUpColor'],'stroke-opacity':organs_config[id]['outlineUpOpacity']});
		})
		_obj.mousedown(function(){
			$('#'+id).css({'fill':organs_config[id]['downColor'],'fill-opacity':organs_config[id]['downOpacity'],'stroke':organs_config[id]['outlineDownColor'],'stroke-opacity':organs_config[id]['outlineDownOpacity']});
		})
		_obj.mouseup(function(){
			$('#'+id).css({'fill':organs_config[id]['overColor'],'fill-opacity':organs_config[id]['overOpacity'],'stroke':organs_config[id]['outlineOverColor'],'stroke-opacity':organs_config[id]['outlineOverOpacity']});
			if(organs_config[id]['target'] == 'new_window'){
				window.open(organs_config[id]['url']);	
			}else if(organs_config[id]['target'] == 'same_window'){
				window.parent.location.href=organs_config[id]['url'];
			}
		})
		_obj.mousemove(function(e){
			var x=e.pageX+10, y=e.pageY+15;
			var tipw=$('#organs-tip').outerWidth(), tiph=$('#organs-tip').outerHeight(), 
			x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
			y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
			$('#organs-tip').css({left:x, top:y})
		})
	}	
}

//The hotspots code
/*$(function(){
	var points_len = hotspots_config['hotspots'].length;
	if( points_len > 0){
		var xmlns = "http://www.w3.org/2000/svg";
		var tsvg_obj = document.getElementById("organs_hotspots");
		var svg_circle;
		for(var i=0;i<points_len;i++){
			svg_circle = document.createElementNS(xmlns, "circle");
			svg_circle.setAttributeNS(null, "cx", hotspots_config['hotspots'][i]['pos_X']);
			svg_circle.setAttributeNS(null, "cy", hotspots_config['hotspots'][i]['pos_Y']);
			svg_circle.setAttributeNS(null, "r", hotspots_config['hotspots'][i]['diameter']/2);
			svg_circle.setAttributeNS(null, "fill", hotspots_config['hotspots'][i]['upColor']);
			svg_circle.setAttributeNS(null, "fill-opacity", hotspots_config['hotspots'][i]['upOpacity']);
			svg_circle.setAttributeNS(null, "stroke",hotspots_config['hotspots'][i]['outlineUpColor']);
			svg_circle.setAttributeNS(null, "stroke-opacity",hotspots_config['hotspots'][i]['outlineUpOpacity']);
			svg_circle.setAttributeNS(null, "id",'organs_hotspots_'+i);
			tsvg_obj.appendChild(svg_circle);
			dynamicAddEvent(i);
		}
	}
});

function dynamicAddEvent(id){
	var obj = $('#organs_hotspots_'+id);

	if(hotspots_config['hotspots'][id]['enable'] == true){
		if (isTouchEnabled()) {
			obj.on('touchstart', function(e){
				var touch = e.originalEvent.touches[0];
				var x=touch.pageX+10, y=touch.pageY+15;
				var tipw=$('#organs-tip').outerWidth(), tiph=$('#organs-tip').outerHeight(),
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#'+id).css({'fill':hotspots_config['hotspots'][id]['downColor'],'fill-opacity':hotspots_config['hotspots'][id]['downOpacity'],'stroke':hotspots_config['hotspots'][id]['outlineDownColor'],'stroke-opacity':hotspots_config['hotspots'][id]['outlineDownOpacity']});
				$('#organs-tip').show().html(hotspots_config['hotspots'][id]['hover']);
				$('#organs-tip').css({left:x, top:y})
			})
			obj.on('touchend', function(){
				$('#'+id).css({'fill':hotspots_config['hotspots'][id]['upColor'],'fill-opacity':hotspots_config['hotspots'][id]['upOpacity'],'stroke':hotspots_config['hotspots'][id]['outlineUpColor'],'stroke-opacity':hotspots_config['hotspots'][id]['outlineUpOpacity']});
				if(hotspots_config['hotspots'][id]['target'] == 'new_window'){
					window.open(hotspots_config['hotspots'][id]['url']);
				}else if(hotspots_config['hotspots'][id]['target'] == 'same_window'){
					window.parent.location.href=hotspots_config['hotspots'][id]['url'];
				}
			})
		}
		obj.attr({'cursor':'pointer'});
		obj.hover(function(){
			$('#organs-tip').show().html(hotspots_config['hotspots'][id]['hover']);
			obj.css({'fill':hotspots_config['hotspots'][id]['overColor'],'fill-opacity':hotspots_config['hotspots'][id]['overOpacity'],'stroke':hotspots_config['hotspots'][id]['outlineOverColor'],'stroke-opacity':hotspots_config['hotspots'][id]['outlineOverOpacity']})
		},function(){
			$('#organs-tip').hide();
			obj.css({'fill':hotspots_config['hotspots'][id]['upColor'],'fill-opacity':hotspots_config['hotspots'][id]['upOpacity'],'stroke':hotspots_config['hotspots'][id]['outlineUpColor'],'stroke-opacity':hotspots_config['hotspots'][id]['outlineUpOpacity']});
		})
		obj.mousedown(function(){
			obj.css({'fill':hotspots_config['hotspots'][id]['downColor'],'fill-opacity':hotspots_config['hotspots'][id]['downOpacity'],'stroke':hotspots_config['hotspots'][id]['outlineDownColor'],'stroke-opacity':hotspots_config['hotspots'][id]['outlineDownOpacity']});
		})
		obj.mouseup(function(){
			obj.css({'fill':hotspots_config['hotspots'][id]['overColor'],'fill-opacity':hotspots_config['hotspots'][id]['overOpacity'],'stroke':hotspots_config['hotspots'][id]['outlineOverColor'],'stroke-opacity':hotspots_config['hotspots'][id]['outlineOverOpacity']});
			if(hotspots_config['hotspots'][id]['target'] == 'new_window'){
				window.open(hotspots_config['hotspots'][id]['url']);	
			}else if(hotspots_config['hotspots'][id]['target'] == 'same_window'){
				window.parent.location.href=hotspots_config['hotspots'][id]['url'];
			}
		})
		obj.mousemove(function(e){
				var x=e.pageX+10, y=e.pageY+15;
				var tipw=$('#organs-tip').outerWidth(), tiph=$('#organs-tip').outerHeight(), 
				x=(x+tipw>$(document).scrollLeft()+$(window).width())? x-tipw-(20*2) : x
				y=(y+tiph>$(document).scrollTop()+$(window).height())? $(document).scrollTop()+$(window).height()-tiph-10 : y
				$('#organs-tip').css({left:x, top:y})
		})
	}	
}*/
