var isIE = (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;

var isIE6 = isIE && (navigator.userAgent.indexOf('MSIE 6.0') != -1);

//var $ = function (id) {
//    return "string" == typeof id ? document.getElementById(id) : id;
//};

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

//判断是否PC/移动端浏览器
function IsPC(){
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
	}
	return flag;
}

/*
var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

Object.extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
	return destination;
}


function Event(e){
	var oEvent = isIE ? window.event : e;
	if (isIE) {
		oEvent.target = oEvent.srcElement;
		oEvent.pageX = oEvent.clientX + document.documentElement.scrollLeft;
		oEvent.pageY = oEvent.clientY + document.documentElement.scrollTop;
		oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
		oEvent.preventDefault = function () { this.returnValue = false; };
		oEvent.detail = oEvent.wheelDelta / (-40);
		oEvent.stopPropagation = function(){ this.cancelBubble = true; }; 
		
		if(oEvent.type == "mouseout") {
			oEvent.relatedTarget = oEvent.toElement;
		}else if(oEvent.type == "mouseover") {
			oEvent.relatedTarget = oEvent.fromElement;
		}
	}
	return oEvent;
}


function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};
*/

//数据检测
//检测空值
function IsEmpty(value) {
	return /^\s*$/g.test(value);
}

//检测数字
function IsNumber(value) {
	if(value=="" || value==null) return(false);
	return (!isNaN(value));
}

//检测空值或数字
function IsEmptyOrNumber(value) {
	return (IsEmpty(value) || IsNumber(value));
}

//按键检测
function CheckKeyPress(e, ActionFlag){

	var key = Event(e).charCode;
	
	switch (ActionFlag){
		case 1 ://允许小数
			return (key>=48&&key<=57||key==46||key==8||key==0);
		case 2 ://允许负数
			return (key>=48&&key<=57||key==45||key==8||key==0);
		case 3 ://只允许正整数
			return (key>=48&&key<=57||key==8||key==0);
		default :
			return true;
	}  
}

//检测email格式
function IsEmail(value) {
	return (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,15}$/).test(value);
}

//检测手机格式
function IsMobile(value) {
	//return (/^1[3|5|7|8|][0-9]{9}$/).test(value);	//中国的
	return (/^[0-9]{8,11}$/).test(value);
}

//检测固定电话，3-4位区号，7-8位直播号码
function IsPhone(value) {
	return (/^(\d{3,4})(-)(\d{7,8})$/).test(value);
}

//检测邮编格式
function IsPostcode(value) {
	//return (/^[0-9]{6}$/).test(value);	//中国的
	return (/^[0-9]{4,6}$/).test(value);
}

//检测密码，数字、字母大小写等符号
function IsPassword(value) {
	return (/^[\w\`\~\-\:\;\[\]\{\}\=\+\(\)\!\@\#\$\%\^\&\*\|]{6,20}$/).test(value);
}

//判断输入框中输入的日期格式为yyyy-mm-dd和正确的日期    
function IsDate(mystring) {  
	return (new Date(mystring).getDate()==mystring.substring(mystring.length-2));
}  

//判断长时间
function IsDateTime(str){
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	var r = str.match(reg); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}

//日期加减，days为正即增为负即减
function addDate(date,days){
	var d=new Date(date);
	d.setDate(d.getDate()+days);
	var m=d.getMonth()+1;
	return d.getFullYear()+'-'+m+'-'+d.getDate();
}

//当前日期
function getToday(){
	var d=new Date();
	d.setDate(d.getDate());
	var m=d.getMonth()+1;
	return new Date((d.getFullYear()+'-'+m+'-'+d.getDate()).replace(/-/g,"/"));
}

//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  
Date.prototype.format = function(format){ 
	var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
	} 
	
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
}

//读写cookie函数
function GetCookie(name)
{
  var cookieValue = "";
  var search = name + "=";
  if(document.cookie.length > 0)
  { 
    offset = document.cookie.indexOf(search);
    if (offset != -1)
    { 
      offset += search.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}

function SetCookie(name, value, hours)
{
  var expire = "";
  if(hours != null)
  {
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire + "; path=/";
}

function trim(value) {
	value += "";
    return value.replace(/(^\s*)|(\s*$)/g, "");
}

//去掉html标签及其内容
function CleanHtmlTag(str) {
	return str.replace(/<[^>]+>/g,"");
//	return str.replace(/<[^>]*?>.*?<\/[^>]*?>/g,"");
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}



//ie兼容html5
(function() {
	if (! /*@cc_on!@*/ 0) return;
	var e = "abbr, article, aside, audio, canvas, datalist, details, dialog, eventsource, figure, footer, header, hgroup, mark, menu, meter, nav, output, progress, section, time, video".split(', ');
	var i= e.length;
	while (i--){
		document.createElement(e[i])
	} 
})();


//光标移动至输入框末尾
function MoveEnd(obj) {
	obj[0].createTextRange?(
	d=obj[0].createTextRange(),d.moveEnd("character",obj.val().length),d.moveStart("character",obj.val().length),d.select()
	):(
	obj[0].setSelectionRange(obj.val().length,obj.val().length),obj.focus()
	);
}

//判断单字节或双字节
byteLength=function(a){
	var c=a.match(/[^\x00-\x80]/g);
	return a.length+(!c?0:c.length)
}

//计算文本长度（2个半角为1）
getMsgLength=function(a){
	var c=a.length;
	if(c>0){
		for(var b=a,a=a.match(/http[s]?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/\/,:;@&=\?\~\#\%]*)*/gi)||[],d=0,f=0,c=a.length;f<c;f++){
			var g=byteLength(a[f]);
			/^(http:\/\/skgskg.com)/.test(a[f])||(d+=/^(http:\/\/)+(skgskg.com|skgskg.com)/.test(a[f])?g<=41?g:g<=140?24:g-140+24:g<=140?24:g-140+24,b=b.replace(a[f],""))
		}
		return Math.ceil((d+byteLength(b))/2)
	}
	else return 0
}

//阻止冒泡
function getEvent() {
    if (document.all) {
        return window.event; //如果是ie
    }
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}
//用于重叠层点击事件，在上面层的点击事件函数中加上stopevt()，即可阻止下面层的点击事件
function stopevt() {
	var ev = getEvent();
    if (ev.stopPropagation) {
        ev.stopPropagation();
    } else if (window.ev) {
        window.ev.cancelBubble = true;
    }
}

/*
//复制到剪切板js代码
function copyToClipBoard(s) {
	//alert(s);
	if (window.clipboardData) {
		window.clipboardData.setData("Text", s);
		alert("已经复制到剪切板！"+ "\n" + s);
	} else if (navigator.userAgent.indexOf("Opera") != -1) {
		window.alert("本浏览器不支持自动复制，请手动复制。");
	} else if (navigator.userAgent.indexOf("Chrome") != -1) {
		window.alert("本浏览器不支持自动复制，请手动复制。");
	} else if (window.netscape) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
			return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans)
			return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext = s;
		str.data = copytext;
		trans.setTransferData("text/unicode", str, copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
			return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
		alert("已经复制到剪切板！" + "\n" + s)
	}
}
*/
//jqui，信息提示，相当于alert。信息内容，弹出窗标题，按钮文字
function DialogAlert(msg, title, button){
	var temp = document.getElementById("dialog")
	if(temp) temp.dialog("destroy");
	if(title==null || title=="") title = "提示信息";
	if(button==null || button=="") button = "确定";
	var temp = $("<div id=''></div>")
		.html(msg)
		.dialog({
			autoOpen: false,
			title: title,
			modal: true,
			buttons: [{
				text: button,
				click: function() {
					$( this ).dialog( "close" );
				}
			}]
		});
	temp.dialog("open");
}
//jqui，信息确认，相当于confirm
function DialogConfirm(msg, action, title){
	var temp = document.getElementById("dialog")
	if(temp) temp.dialog("destroy");
	if(title==null || title=="") title = "确认信息";
	var temp = $("<div id=''></div>")
		.html(msg)
		.dialog({
			autoOpen: false,
			title: title,
			modal: true,
			buttons: {
				'确定': function() {
					$(this).dialog('close');
					eval(action);
				},
				'取消': function() {
					$(this).dialog('close');
				}
			}
		});
	temp.dialog("open");
}
//$( ".selector" ).dialog( "option", "buttons", [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ] );
//http://api.jqueryui.com/dialog/#option-buttons

//绑定回车
function BindEnter() {
 if (event.keyCode == 13) {
     event.cancelBubble = true;
     event.returnValue = false;
         document.getElementById('bindEnter').click();
   }
}

//全选容器内容
function selectText(element) {
    var text = document.getElementById(element);
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        /*if(selection.setBaseAndExtent){
            selection.setBaseAndExtent(text, 0, text, 1);
        }*/
    } else {
        alert("none");
    }
}

//得出显示中的所有层最大z-index值
function GetMaxZindex(){
	var maxZ = Math.max.apply(null, $.map($('body *'), function (e, n) {
		if ($(e).css('position') == 'absolute' || $(e).css('position') == 'fixed')
			return parseInt($(e).css('z-index')) || 1;
		})
	);
	return(maxZ);
}
//创建遮罩层
function MaskBuild(id){	//id为字符串
	$("body").append('<div class="mask" id="' + id + '"></div>');
	$("#" + id).css({"z-index":GetMaxZindex()+1}).show();
//	console.log(id);
}
//销毁遮罩层
function MaskDestory(id){	//id为字符串
	$("#" + id).hide().remove();
}


	/*************************弹窗公共函数***************************/
	function updateTips( t , tips) {
	  tips
		.text( t )
		.addClass( "ui-state-highlight" );
	  setTimeout(function() {
		tips.removeClass( "ui-state-highlight", 1500 );
	  }, 500 );
	}

	function checkLength( o, n, min, max, tips ) {
	  if ( o.val().length > max || o.val().length < min ) {
		o.addClass( "ui-state-error" );
		layer.tips( n + "的长度须在" + min + "至" + max + "字之间", o, {tips: [2, "orange"]});
		//updateTips( n + "的长度须在" + min + "至" + max + "字之间", tips );
		return false;
	  } else {
		return true;
	  }
	}

	function checkRegexp( o, regexp, n, tips ) {
	  if ( !( regexp.test( o.val() ) ) ) {
		o.addClass( "ui-state-error" );
		layer.tips( n , o, {tips: [2, "orange"]});
		//updateTips( n, tips );
		return false;
	  } else {
		return true;
	  }
	}


/*jq鼠标右键插件*/ 
(function($) { 
	$.fn.extend({ 
	//定义鼠标右键方法，接收一个函数参数 
	"rightClick":function(fn){ 
		//调用这个方法后将禁止系统的右键菜单 
		$(document).bind('contextmenu',function(e){ 
		return false; 
		}); 
	//为这个对象绑定鼠标按下事件 
	$(this).mousedown(function(e){ 
		//如果按下的是右键，则执行函数 
		if(3 == e.which) fn();
		}); 
	} 
}); 
})(jQuery); 

/*jq扩展动画easing*/ 
jQuery.extend( jQuery.easing,  
{  
	easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},
});  

//页面浮出提示块
function PopTips(txt, type){	//显示内容文字；类型（right,wrong）
	//建立提示块
	if($(".pop_tips").size()>0){
		$(".pop_tips").detach();
	}
	$("body").append('<div class="pop_tips clearfix"><span></span><p></p></div>');

	if(type==undefined){
		type = "right";
	}else{
		if(type.toLowerCase() != "wrong") type = "right";
	}
	if(txt==undefined){
		txt = "操作成功";
	}else if(txt == ""){
		(type == "right")?(txt = "操作成功"):(txt = "操作失败");
	}
	$( ".pop_tips p" ).removeClass().addClass(type).html(txt);
	$( ".pop_tips span" ).removeClass().addClass(type);
	$( ".pop_tips" ).fadeIn( 500,  function(){
		setTimeout(function() {
				$( ".pop_tips:visible" ).fadeOut(500);
			}, 1000 )
		}
	);
}


//chart export, See: http://goo.gl/qlg5dd
function toBlob(base64, type) {
	var rawData = base64.substring(base64.indexOf("base64,") + 7);
	var data = atob(rawData);
	var arr = new Uint8Array(data.length);
	
	for (var i = 0; i < data.length; ++i) {
		arr[i] = data.charCodeAt(i);
	}
	
	return new Blob([ arr.buffer ], { type: type });
}
//jquery=====================================================================
//var jq=jQuery.noConflict();



















function custom_input(){
	$('input[type="checkbox"]').each(function(){
		if(!$(this).parent('i').parent('div').hasClass('check-box')){
			$(this).wrap('<div class="check-box"><i></i></div>');
			$(this).hide();
			if($(this).prop('checked')){
				$(this).parent('i').addClass('checkedBox');
			}
			var _obj = this;
			$(this).parent('i').click(function(){
				if($(this).parents('label').length<=0 && event.target==this){
					$(_obj).click();
				}
				if($(this).parents('label').length<=0){
					if($(this).hasClass('checkedBox')){
						$(this).removeClass('checkedBox');
						$(this).find('input:checkbox').prop('checked', false);
					}else{
						$(this).addClass('checkedBox');
						$(this).find('input:checkbox').prop('checked', true);
					}
				}
			});
			$(this).click(function(event){
				if($(this).prop('checked') && event.target==this){
					$(this).parent('i').addClass('checkedBox');
				}else if(event.target==this){
					$(this).parent('i').removeClass('checkedBox');	
				}else{
					return false;	
				}
				
			});
		}	
	});
	
	$('input[type="radio"]').each(function(){
		if(!$(this).parent('i').parent('div').hasClass('radio-box')){
			$(this).wrap('<div class="radio-box"><i></i></div>');
			$(this).hide();
			if($(this).prop('checked')){
				$(this).parents('.radio-box').addClass('checkedRadio');
			}
			var _obj = this;
			
			$(this).parents('.radio-box').click(function(event){
				if($(this).parents('label').length<=0){
					$(this).find('input[type="radio"]').prop('checked',true);
					radio_refresh();
				}
			});
			$(this).click(function(event){
				radio_refresh();
			});
		}
		function radio_refresh(){
			$(".radio-box").each(function(){
				if($(this).find('input[type="radio"]').prop('checked')){
					$(this).addClass('checkedRadio');
				}else{
					$(this).removeClass('checkedRadio');
				}
			});
		}
		
	});
	
	$('select:not(.ui-datepicker-year, .ui-datepicker-month)').each(function(){
		var _obj = this;
		if(!$(this).parent('div').hasClass('select-box')){
			$(this).wrap('<div class="select-box"></div>');
			if($(this).attr('data-width')>0){
				boxWidth = $(this).attr('data-width');
			}else{
				boxWidth = $(this).width();
			}
			if(boxWidth!=0){
				$(this).parent('.select-box').width(boxWidth);
			}
			//boxHeight = $(this).height();
			
			//$(this).parent('.select-box').height(boxHeight);
			$(this).hide();
			$(this).before('<div class="select-txt"><span>'+$(this).find('option:selected').html()+'</span><i></i></div>');
			var select_pop =$(this).parents('.select-box').find('.select-pop');

		}
	});
	
	
	$(document).on('click','.select-box .select-txt',function(e){
		var optionss=$(this).parents('.select-box').find('select option');
		var is_multiple = $(this).parents('.select-box').find('select').prop("multiple");	//是否允许多选，目前在课题分析的配置中出现多选
		var _this =this;
		if(!$(this).hasClass("on")){
			$('.select-pop').detach();
			$('.select-box .select-txt').removeClass('on');
			var addhtml2 = '';
			$(this).parents('.select-box').find('select option').each(function(){
				if($(this).prop('selected')){
					if($(this).hasClass("custom")){
						addhtml2+='<li class="on custom">'+$(this).html()+'</li>';	
					}else{
						addhtml2+='<li class="on">'+$(this).html()+'</li>';	
					}
				}else{
					if($(this).hasClass("custom")){
						addhtml2+='<li class="custom">'+$(this).html()+'</li>';	
					}else{
						addhtml2+='<li>'+$(this).html()+'</li>';	
					}
				}
			});
			addhtml3 = $('<div class="select-pop"></div>').append('<div' + (is_multiple?' class="multiple"':'') + '><ul class="select-list">'+addhtml2+'</ul></div>');
			
			//$(this).parents('.select-box').find('.select-list').html(addhtml2);
			$(addhtml3).find('.select-list li').each(function(i){
				$(this).mousemove(function(){
					if(!$(this).hasClass('hover')){
						$(this).addClass('hover');
					}
				}).mouseout(function(){
					$(this).removeClass('hover');
				}).click(function(){
					if( optionss.eq(i).val()==-1 ){	//点击“导入更多”项，隐藏原有
						ColumnMore($(_this).parents(".select-box"));	//定义在课题分析js里，因为只有那里用
						$(this).parents('.select-pop').hide();
						$(".mask_multiple").hide();
						return;
					}
					if(is_multiple){	//多选
						if($(this).index()==0) return;	//不能点“请选择”
						if($(this).hasClass("on")){
							$(this).removeClass('on');
							optionss.eq(i).prop('selected',false);
							if($(this).siblings(".on").length==0){	//都没有选中的，则选中第1个（请选择）
								$(optionss).parents('.select-box').find('.select-txt span').html($(this).siblings("li:first").html());
							}
						}else{
							$(this).addClass('on');
							optionss.eq(i).prop('selected',true);
						}
						//$(optionss).parent('select').change();
						select_refresh();
					}else{
						$(this).parent().find('li').removeClass('on');
						$(this).addClass('on');
						optionss.eq(i).prop('selected',true);
						$(optionss).parents('.select-box').find('.select-txt span').html(optionss.eq(i).html());
						$(optionss).parent('select').change();
						//非多选select，点击任意项可关闭select控件
						$(this).parents('.select-pop').detach();
						$(_this).removeClass('on');
						$(".mask_multiple").remove();
					}
				});
			});
			
			
			$(document.body).append(addhtml3);
			$('.select-pop').css({'min-width':$(this).width()});
			ptop = $(this).offset().top+$(this).height()+5;
 			pleft = $(this).offset().left+$(this).width()-$('.select-pop').width();
			$('.select-pop').css({'top':ptop,'left':pleft});
			$(this).addClass('on');
			//var select_pop =$(this).parents('.select-box').find('.select-pop');
			
			//select_pop.css({'width':$(this).parents('.select-box').width()});
			if($(".mask_multiple").length==0){
				$(document.body).append('<div class="mask_multiple"></div>');
			}
			$(".mask_multiple").width(document.body.scrollWidth).height($(document).height()).css("z-index", $(".select-pop").css("z-index")-1).show();
			//console.log(is_multiple);
			$(".mask_multiple").click(function(){
				if($(_this).hasClass("on")){
					$(_this).removeClass('on');
					$('.select-pop').detach();
				}
				$(this).remove();
			})
			//点屏幕任何地方可关闭select控件
/*			$(document).click(function(e){
				if($(_this).hasClass("on")){
					$(_this).removeClass('on');
					$('.select-pop').detach();
				}
			});
*/
			e.stopPropagation();
		}
	});
	

	$('input.J_date').each(function(){
		if(!$(this).parent('div').hasClass('date-box')){
			$(this).wrap('<div class="date-box"></div>');
			$(this).after('<i class="clear"></i>');
			//$(this).width($(this).width()-32);
			if($(this).hasClass('J_date_full')){
				$(this).datetimepicker({
//					showMonthAfterYear: true,
					minDate:'1900-01-01',
					maxDate:(new Date()).getDate(),
					changeMonth: true, 
					changeYear: true, 
					showSecond: true, 
					monthNamesShort: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
					timeFormat: 'HH:mm:ss'
				}); // 日期+时分秒  
			}else{
				$(this).datepicker({
					minDate:'1900-01-01',
					maxDate:(new Date()).getDate(),
					changeMonth: true, 
					changeYear: true, 
					monthNamesShort: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
//					showButtonPanel: true,         // 显示按钮面板  
//					showMonthAfterYear: true,  // 月份显示在年后面  
//					currentText: "本月",         // 当前日期按钮提示文字  
//					closeText: "关闭",           // 关闭按钮提示文字  
					format: 'yyyy-mm-dd'
				});
			}
		}
	})
}

//刷新所有select的值
function select_refresh(){
	$('.select-box').each(function(){
		var is_multiple = $(this).find('select').prop("multiple");	//是否多选
		if(is_multiple){
			var temp_select = "";
			$(this).find('select option:selected').each(function(index, element) {
				temp_select += ","+$(this).html();
			});
			if(temp_select==""){	//没选中任何项，则显示第一个（请选择）
				$(this).find('.select-txt span').html($(this).find('select option:first').html());
			}else{
				$(this).find('.select-txt span').html(temp_select.substr(1));
			}
		}else{
			$(this).find('.select-txt span').html($(this).find('select option:selected').html());
		}
	});
}


//刷新所有checkbox的值
function checkbox_refresh(){
	$(".check-box i").each(function(){
		if($(this).find('input[type="checkbox"]').prop('checked')){
			$(this).addClass('checkedBox');
		}else{
			$(this).removeClass('checkedBox');
		}
	});
}
//
var my_msg={
	title:'消息',	
	yes_btn:'确定',
	no_btn:'取消',
	class:'',
	position:'down',	//up或down
	tipsconfirm:function(msg,obj,fn1,fn2){	//内容文本，对象，确定，取消
		var _this = this.class?$('<div class="'+this.class+'"></div>'):$('<div></div>');
		btn = '<a href="javascript:;" class="yes">'+this.yes_btn+'</a>';
		btn += '<a href="javascript:;" class="no">'+this.no_btn+'</a>';
		html = '<div class="msg_transparent"></div><div class="msg_pop"><div class="msg_pop_div">';
		//html+='<div class="msg_title">'+this.title+'</div>';
    	html+='<div class="msg_txt">'+msg+'</div>';
		html+='<div class="msg_btn">'+btn+'</div>';
		html += '</div></div>';
		$(_this).append(html);
		$(_this).find('.no,.msg_transparent').click(function(){
			$(_this).find('.msg_pop').fadeOut(300,function(){
				_this.detach();
			});
		});
		
		if(fn1){
			$(_this).find('.yes').click(function(){
				fn1();		
				$(_this).find('.msg_pop').fadeOut(300,function(){
					_this.detach();
				});
			})
		}
		
		if(fn2){
			$(_this).find('.no,.msg_transparent').click(function(){
				fn2();
				$(_this).find('.msg_pop').fadeOut(300,function(){
					_this.detach();
				});
			});
		}
		
		$('body').append(_this);
		//获取位置
		if(this.position=='up'){
			$(_this).find('.msg_pop').addClass('up');
			tips_top = $(obj).offset().top-$(_this).find('.msg_pop').outerHeight();
			tips_left = $(obj).offset().left+$(obj).outerWidth()-$(_this).find('.msg_pop').outerWidth();
		}else{
			tips_top = $(obj).offset().top+$(obj).height();
			tips_left = $(obj).offset().left+$(obj).outerWidth()-$(_this).find('.msg_pop').outerWidth();	
		}
		$(_this).find('.msg_pop').css({'top':tips_top,'left':tips_left});
		$(_this).find('.msg_pop').hide();
		$(_this).find('.msg_pop').fadeIn(500);
	},
	tips:function(msg,obj){
		var _this = this.class?$('<div class="'+this.class+'"></div>'):$('<div></div>');
		html = '<div class="msg_transparent"></div><div class="msg_pop"><div class="msg_pop_div">';
		html += '</div></div>';
		$(_this).append(html);
		$(_this).find('.msg_pop_div').append(msg);
		
		$(_this).find('.msg_transparent').click(function(){
			$(_this).find('.msg_pop').fadeOut(300,function(){
				_this.detach();
			});
		});
		
		$('body').append(_this);
		//获取位置
		if(this.position=='up'){
			$(_this).find('.msg_pop').addClass('up');
			tips_top = $(obj).offset().top-$(_this).find('.msg_pop').outerHeight();
			tips_left = $(obj).offset().left+$(obj).outerWidth()-$(_this).find('.msg_pop').outerWidth();
		}else{
			tips_top = $(obj).offset().top+$(obj).height();
			tips_left = $(obj).offset().left+$(obj).outerWidth()-$(_this).find('.msg_pop').outerWidth();	
		}
		$(_this).find('.msg_pop').css({'top':tips_top,'left':tips_left});
		$(_this).find('.msg_pop').hide();
		$(_this).find('.msg_pop').fadeIn(500);
	}
}
