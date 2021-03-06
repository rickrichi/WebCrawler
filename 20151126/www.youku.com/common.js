//hack console error
(function(){
	if(window['console']){ return; }
	window['console'] = {
		 log: function(){}
		,clear: function(){}
		,debug: function(){}
		,error: function(){}
		,info: function(){}
		,count: function(){}
		,time: function(){}
		,trace: function(){}
		,warn: function(){}
	}
})();

//for script include static
//global function: cdn_jsurl, cdn_cssurl, cdn_imgurl
(function(){
    var url = 'Bad url, watch browser console error.',
        Local = window.Local,
        err = function(msg){ if(console && console.error){  console.error('[cdn function error] '+ msg + '.'); } },
        cdn = function(path, type){
            //path rule
            if(path.charAt(0) != '/'){ err('@param path: relative to root start by /'); return url; }
            //global block
            if(!Local){ err('@see BETA-18932: template funciton {nova->globaJS}'); return url; }
            var key = 'RELEASE_TAG', version = Local[key];
            //version define
            if(!version){ err('@see local: ' + key + ' not defined'); return url; }
            //server define
            key = type.toUpperCase() + 'SERVER', server = Local[key];
            if(!server){ err('@see local: ' + key + ' not defined.'); return url; }
            //bad server define
            if(!server.match(/^(http|https)/)){ err('@see local: ' + key + ' is server, add protocol'); return url; }
            if(server.match(/\/$/)){ err('@see local: ' + key + ' is server, not ending by \/'); return url; }
            url = server+ '/' +  version + path;
            return url;
        };
        window.cdn_jsurl = function(path){ return cdn(path, 'js'); };
        window.cdn_cssurl = function(path){ return cdn(path, 'css'); };
        window.cdn_imgurl = function(path){ return cdn(path, 'img'); };
})();

//page load time for log
var logPageStartTime = (new Date()).getTime();//æ¯«ç§
window.uepflag = 1;//uepç»è®¡åéå¼å³

(function(){
    var scripts = document.getElementsByTagName('script');
    var currJssrc = scripts[scripts.length-1].src;
    window.currJs_domain_version = currJssrc.split('/')[2]+ '/'+ currJssrc.split('/')[3];
})(window)

if((window.location.href.indexOf("www.youku.com") !== -1 || window.location.href.indexOf("v.youku.com") !== -1) && Math.round(Math.random()*1000) > 100) {
	window.uepflag = 0;//æ½æ ·åé
}
//ç¨æ·è·¯å¾åæ°
(function(o){
	o.nova_init_hook_rpvid = function(){
		o.Event.observe(document, "mousedown",  function(ev){
			if(!ev) ev = o.event;
			var target = ev.target || ev.srcElement;
			if(!target) {return;}
			Nova.Cookie.set("rpvid", window.logPvid + "-" + (new Date()).getTime());//è®°å½ç¨æ·è·¯å¾
		});
		o.Event.observe(document, "touchend",  function(ev){
			if(!ev) ev = o.event;
			var target = ev.target || ev.srcElement;
			if(!target) {return;}
			Nova.Cookie.set("rpvid", window.logPvid + "-" + (new Date()).getTime());//è®°å½ç¨æ·è·¯å¾
		});
	}
})(window);

//çå¬å¨ç«çé¾æ¥ç¹å»äºä»¶ï¼æ£æ¥æ¯å¦å­å¨data-fromå±æ§,å¹¶æ·»å fromåæ°è³hrefå±æ§ä¸­
(function(o){
	if(!o) {return false;}
	if(!o.Event) {return false;}
	var checkFromDomain = function(href){
		var domain = ["youku.com/v_show/","youku.com/show_page/","youku.com/u/U"];
		for(var i=0,length=domain.length; i<length; i++){
			if(href.indexOf(domain[i]) !== -1) {
				return true;
			}
		}
	}
	o.nova_init_hook_data_from = function(){
		o.Event.observe(document, "click",  function(ev){
			if(!ev) ev = o.event;
			var target = ev.target || ev.srcElement;
			if(!target) {return;}
			if(target.tagName != 'A' && target.parentNode) {
				target = target.parentNode;
			}
			if(target.tagName == 'A') {
				var data_from = target.getAttribute("data-from");
				var from = data_from || window.pvDataFrom;
				var href = target.getAttribute("href");
				if(from && from != '') {
					if(href && href.indexOf('http') === 0 && href.indexOf('?from') === -1 && href.indexOf('&from') === -1 && checkFromDomain(href)) {
						from = encodeURIComponent(from);
						if(href.indexOf('?') !== -1){
							target.setAttribute("href", href+'&from='+from);
						}else{
							target.setAttribute("href", href+'?from='+from);
						}
					}
				}
			}
		});
	}
 })(window);



window["nova_init_hook_logpagetime"] = function(){
	var logPageEndTime = (new Date()).getTime();//æ¯«ç§
	var loadTime = logPageEndTime - window.logPageStartTime;
	if(loadTime <= 0 || isNaN(loadTime)) {
		loadTime = -1;
		var err = 1001;
	}
	if(loadTime >= 100 * 1000 || isNaN(loadTime)){
		loadTime = -1;
		var err = 1002;
	}
	var logParam = "pid="+window.logPvid+"&m=web&st="+window.logPageStartTime+"&s="+loadTime+"&et="+logPageEndTime+"&u="+encodeURIComponent(window.location.href);
	if(err){
		logParam += "&e="+err;
	}
	var type1 = '';
	var pagetype1 = '';
	if(new RegExp('^http:\/\/www.youku.com(\/)?$').test(window.location.href)){
		if(window.uepflag == 0) return false;
		type1 = 'homepage';//index
		pagetype1 = 1;
	}else if(new RegExp('^http:\/\/v.youku.com/v_show/.*$').test(window.location.href)){
		if(window.uepflag == 0) return false;//æ½æ ·åé
		type1 = 'playerpage';//video play page
		pagetype1 = 2;
		var vid = window.videoId || 0;
		var ct = window.cateStr || '';
		var cs = window.subCatId || '';
		logParam += "&ct="+ct+"&cs="+cs+"&v="+vid;
	}else if(new RegExp('^http:\/\/i.youku.com/u/home.*$').test(window.location.href)){
		type1 = 'usercenter';//user center page
		pagetype1 = 4;
		var ct = window.cateStr || '';
		logParam += "&ct="+ct;
	}else if(!new RegExp('^http:\/\/(www)|(v)|(i).youku.com/.*$').test(window.location.href)){
		type1 = 'channelpage';//channel
		pagetype1 = 3;
		var ct = window.cateStr || '';
		logParam += "&ct="+ct;
	}else{
		type1 = 'channelpage';//channel
		pagetype1 = 3;
		var ct = window.cateStr || '';
		logParam += "&ct="+ct;
	}
	logParam += "&t="+type1+"&p="+pagetype1+"&"+Math.random();
	var img = new Image();
	img.src = "http://v.l.youku.com/uep?"+logParam;
};


//ucenter APT
(function(o){

	if(!o || o.QUcenter){ return; }

	var winsub = null;
	var uidsub = 0;//è®°å½å½åè¯·æ±è®¢éçuid
	var handle_fake = null;//å®ä½åèç¹
	o.QUcenter = {
		bindFollow: function(handle, uid, addtion, callback, config){
			if(!arguments[0] || !arguments[1]){ return this; }
			var callback = typeof(arguments[3]) == 'function' ?  callback : null;
			var config_default = { showwin: true };
			var config = arguments[3] ? arguments[3] : config_default;
			config.showwin = typeof(config.showwin) != 'undefined' ? Boolean(config.showwin) : config_default.showwin;
			var _this = this;
			if(document.domain != 'youku.com'){ document.domain = 'youku.com'; }
			handle.observe('click', function(e){
				if(typeof(window['passport'] == 'undefined')){ window.passport = '1'; }
				if(!window['islogin'] && !window['Qwindow']	){ return; }
				if(!islogin()){ loginregGuide({from: 'follow', callBack: function(){
						_this.follow(uid, addtion, function(rs){
							handle.removeAttribute('lock');
							if(config.showwin){ _this.showFollowWin(handle, rs, uid); }
							if(callback){
								if(winsub && uidsub == uid){
								winsub.setHideCallback(function(){
									callback(handle, rs, uid);
									winsub.setHideCallback(null);
								});}else{
									callback(handle, rs, uid);
							    }
							}
						});
						return;
					}
				}); return; }
				uidsub = uid;
				if(handle.getAttribute('lock')){ return; }//é²æ­¢éå¤ç¹å»éå®
				handle.setAttribute('lock', 'true');
				_this.follow(uid, addtion, function(rs){
					handle.removeAttribute('lock');
					if(config.showwin){ _this.showFollowWin(handle, rs, uid); }
					if(callback){
						if(winsub && uidsub == uid){
							winsub.setHideCallback(function(){
								callback(handle, rs, uid);
								winsub.setHideCallback(null);
							});
						}else{
							callback(handle, rs, uid);
						}
					}
				});
			});
			return this;
		},
		follow: function(uid, addtion, callback){
			if(document.domain != 'youku.com'){ document.domain = 'youku.com'; }
			var funcname = 'jsoncallback' + new Date().getTime();
			this[funcname] = function(rs){
				if(typeof(callback) == 'function'){
					callback(rs);
				}
				delete QUcenter[funcname];
			}
			if(typeof(addtion)!='undefined' && addtion!=''){
				var url = this.getUrlBase() + '/u/subToUpdates?follow=' + uid+ '&addtion='+addtion+'&callback=QUcenter.'+ funcname;
			}else{
				var url = this.getUrlBase() + '/u/subToUpdates?follow=' + uid+ '&callback=QUcenter.'+ funcname;
			}
			jsonp(url);
			return this;
		},
		unfollow: function(uid, callback){
			if(document.domain != 'youku.com'){ document.domain = 'youku.com'; }
			var funcname = 'jsoncallback' + new Date().getTime();
			this[funcname] = function(rs){
				if(typeof(callback) == 'function'){
					callback(rs);
				}
				delete QUcenter[funcname];
			}
			var url = this.getUrlBase() + '/u/subToUpdates?unfollow=' + uid + '&addtion=us-2&callback=QUcenter.'+ funcname;
			jsonp(url);

			return this;
		},
		showFollowWin: function(handle, rs, uid){
			if(!window['Qwindow'] || !handle){ return this; }
			var w = 360, h = 280, bw=10, poswin = {top: -bw, left: -bw};
			if(!winsub){
				var params = {
					size: {width: w, height: h}
					,posrefer: handle
					,pos: poswin
					,showmask: false
					,elements: ''
				}
				winsub = new Qwindow(params);
			}else{
				winsub.hide();
			}

			var lr = 'left';
			var pos = this._getOffsetPos(handle)
				,range = {
					'width'	: handle.offsetWidth,
					'height': handle.offsetHeight,
					'top'	: pos.top,
					'left'	: pos.left
				}
				, edge = this._getWindowREdge()

			if((w + bw*2) + range.left > edge){
				var l = range.width - (w + bw)
				poswin = {top: -bw, left: l }
			}

			winsub.setPosrefer(handle).setPos(poswin.top, poswin.left);
			if(!uidsub || uid == uidsub){//å¼æ­¥è¿åå¡«åæ­£ç¡®ççªå£
				var url = this.getUrlBase() + '/u/showSubResult?rs=' + rs + '&follow=' + uid;
				winsub.setContent('iframe', url).show();
			}
			return this;
		},
		hideFollowWin: function(){
			if(!winsub){ return; }
			winsub.hide();
			return this;
		},
		getUrlBase: function(){
			var domain = window['UC_DOMAIN'];
			if(!domain){ domain = 'i.youku.com'; }
			return 'http://' + domain;
		},
		_getOffsetPos: function(o) {
			if (o.getBoundingClientRect) {
				var x=0, y=0;
				try{
					var box = o.getBoundingClientRect();
					var D = document.documentElement;
					x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
					y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;
				}catch(e){}
				return {'top': y, 'left': x};
			}else{
				function pageX(o){ try {return o.offsetParent ? o.offsetLeft +  pageX(o.offsetParent) : o.offsetLeft; } catch(e){ return 0; } }
				function pageY(o){ try {return o.offsetParent ? o.offsetTop + pageY(o.offsetParent) : o.offsetTop; } catch(e){ return 0; } }
				return {'top': pageY(o), 'left': pageX(o)};
			}
		},
		//è·åå½åçªå£å³è¾¹ç¼xåæ 
		_getWindowREdge: function(){
			var l = document.documentElement.scrollLeft || document.body.scrollLeft;
			var w = document.documentElement.clientWidth || document.body.clientWidth;
			return l + w;
		}
	}


	var jsonp = function(src, callback){
		if(typeof(arguments[0]) != 'string'){ return; }
		var callback = typeof(arguments[1]) == 'function' ? callback : function(){};
		var head = document.getElementsByTagName('HEAD')[0];
		var script = document.createElement('SCRIPT');
		script.type = 'text/javascript';
		script.src = src;
		head.appendChild(script);
		if(!/*@cc_on!@*/0) {
			script.onload = function(){ callback(); this.parentNode.removeChild(this); }
		}else{
			script.onreadystatechange = function () {
				if (this.readyState == 'loaded' || this.readyState == 'complete') {
					callback();
					this.parentNode.removeChild(this);
				}
			}
		}
	}

})(window);

/*paycenter API*/
(function(o){

	if(!o){ return; }
	if(o.QFee){ return; }
	window['nova_init_hook_Fee_buyAutobind'] = function(){ o.Fee.buyAutobind(); }

	o.QFee = {

		buy: function(query, hzclick){
			if(!query){ return; }
			if(document.domain != 'youku.com'){ document.domain = 'youku.com'; }
			if(typeof(window['passport'] == 'undefined')){ window.passport = '1'; }
			if(!window['islogin'] &&!window['Qwindow']	){ return; }

			var baseurl = 'http://pay.youku.com/buy/redirect.html';
			var url = arguments[1]
					? hzclick + baseurl + '?' + query
					: baseurl + '?' + query;
			window.location = url;
			/**
			if(islogin()){ window.location = url; }
			else{
				login({type: 'fee',callBack: function(){ window.location = url; }});
			}

			return this;**/
		},

		buyAutobind: function(){
			var flag_query = 'buy_query';
			var flag_hzclick = 'buy_hzclick';

			var handles = $$('['+ flag_query +']');
			var _this = this;
			for(var i=0, len=handles.length; i<handles.length; i++){
				handles[i].observe('click', function(evt){
					var query = this.getAttribute(flag_query);
					var hzclick = this.getAttribute(flag_hzclick);
					if(query){
						if(!hzclick){ _this.buy(query); }
						else{ _this.buy(query, hzclick) }
					}
				});
			}

			return this;
		}

	}

})(window);


function ltrim(s){ return s.replace( /^(\s*|ã*)/, ""); }
function rtrim(s){ return s.replace( /(\s*|ã*)$/, ""); }
function trim(s){ return ltrim(rtrim(s));}
/**
 * å¤æ­åéæ¯å¦ç©ºå¼
 * undefined, null, '', false, 0, [], {} åè¿åtrueï¼å¦åè¿åfalse
 */
function empty(v){
    switch (typeof v){
        case 'undefined' : return true;
        case 'string'    : if(trim(v).length == 0) return true; break;
        case 'boolean'   : if(!v) return true; break;
        case 'number'    : if(0 === v) return true; break;
        case 'object'    :
            if(null === v) return true;
            if(undefined !== v.length && v.length==0) return true;
            for(var k in v){return false;} return true;
            break;
    }
    return false;
}

//check domain begin
// var dURL = window.location.href.toLowerCase();
// if(dURL.indexOf("youku") <0 && dURL.indexOf("yoqoo")<0 && dURL.indexOf("soku")<0){
// 	var path = document.location.pathname
// 	window.location.href = 'http://www.youku.com'+path;
// }
//check domain end

// JavaScript Document
function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_changeProp(objName,x,theProp,theValue) { //v6.0
  var obj = MM_findObj(objName);
  if (obj && (theProp.indexOf("style.")==-1 || obj.style)){
    if (theValue == true || theValue == false)
      eval("obj."+theProp+"="+theValue);
    else eval("obj."+theProp+"='"+theValue+"'");
  }
}
function U8_16(_1) {
	var i, len, c;
	var char2, char3;
	var ary = [];
	len = _1.length;
	i = 0;
	while (i < len) {
		c = _1.charCodeAt(i++);
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			ary.push(_1.charAt(i - 1));
			break;
		case 12:
		case 13:
			// 110x xxxx   10xx xxxx
			char2 = _1.charCodeAt(i++);
			ary.push(String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)));
			break;
		case 14:
			// 1110 xxxx 10xx xxxx 10xx xxxx
			char2 = _1.charCodeAt(i++);
			char3 = _1.charCodeAt(i++);
			ary.push(String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0)));
			break;
		}
	}
	return ary.join('');
}
function decode64(_1) {
	if(!_1) return '';
	var _2 = "ABCDEFGHIJKLMNOP"+"QRSTUVWXYZabcdef"+"ghijklmnopqrstuv"+"wxyz0123456789+/"+"=";
	var _3 = "";
	var _4, _5, _6;
	var _7, _8, _9, _a;
	var i = 0;
	_1 = _1.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	do {
		_7 = _2.indexOf(_1.charAt(i++));
		_8 = _2.indexOf(_1.charAt(i++));
		_9 = _2.indexOf(_1.charAt(i++));
		_a = _2.indexOf(_1.charAt(i++));
		_4 = (_7 << 2) | (_8 >> 4);
		_5 = ((_8 & 15) << 4) | (_9 >> 2);
		_6 = ((_9 & 3) << 6) | _a;
		_3 = _3 + String.fromCharCode(_4);
		if (_9 != 64) {
			_3 = _3 + String.fromCharCode(_5);
		}
		if (_a != 64) {
			_3 = _3 + String.fromCharCode(_6);
		}
	} while (i < _1.length);
	return U8_16(_3);
}
function encode64(str)
{
	if(!str) return '';
	str = str.toString();
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var base64DecodeChars = new Array(
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
       52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
       -1, 0,   1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
       15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
       -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
       41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
	);
	var out, i, len;
	var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
	while(i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if(i == len)
		{
		    out += base64EncodeChars.charAt(c1 >> 2);
		    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
		    out += "==";
		    break;
		}
		c2 = str.charCodeAt(i++);
		if(i == len)
		{
		    out += base64EncodeChars.charAt(c1 >> 2);
		    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
		    out += "=";
		    break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}
function encodeUid(uid)
{
	if(!uid) return '';
	if(uid << 2 > 0){
		var enUid = 'U' + encode64(uid << 2);
	}else{
		//uidè¶è¿éå¶
		var enUid = 'U' + encode64(uid * 4);
	}
	return enUid;
}

//for search
function dosearch(f){
	if(trim( f.q.value.replace(/[\/_]/g,' ') )==''){
		location.href='http://www.soku.com/?inner';
		return false;
	}
	var q = encodeURIComponent(f.q.value.replace(/[\/_]/g,' '));//

	if(f.socondition && f.socondition[1].id=='outer' && f.socondition[1].checked){//å¨ç½æç´¢
		var url="http://www.soku.com/v?keyword="+q;
	}else{//ç«åæç´¢
		var innersearchdomain = f.searchdomain.value;
		if(!innersearchdomain)innersearchdomain="http://www.soku.com";
		var btype = f.sbts;//çå§æç´¢éé¡¹
		if(f.searchType.value == "bar" && btype != undefined && btype.value != ""){
			q = q+"_sbt_"+btype.value;
		}
		var url= innersearchdomain+"/search_"+f.searchType.value+"/q_"+q;
	}
	if(typeof(search_prompt_flag) != 'undefined' && search_prompt_flag){//ä½¿ç¨ä¸ææç¤ºç»è®¡ä»£ç 
		(new Image()).src="http://lstat.youku.com/sokuHintKeyword.php?keyword="+q;
	}

	location.href=url;
	return false;

}
function search_show(pos,searchType,href){
    document.getElementById(pos+"SearchType").value=searchType;
    document.getElementById(pos+"Sel").style.display="none";
    document.getElementById(pos+"Slected").innerHTML=href.innerHTML;
    document.getElementById(pos+'q').focus();

    var s2 = document.getElementById('soswitch');
	var sl = document.getElementById('sorelated');
    var s0 = document.getElementById("searchextend0");
    if(s0 != undefined && searchType == "bar" && pos=="head"){
    	s0.style.display="block";
		if(sl) sl.style.display = 'none';
		if(s2) s2.style.display="none";
    }else if(s0 != undefined && pos=="head"){
    	s0.style.display="none";
		if(sl) sl.style.display = '';
		if(s2) s2.style.display = '';
    }
    var s1 = document.getElementById("searchextend1");
    if(s1 != undefined && (searchType == "video" || searchType == "playlist") && pos=="head"){
    	s1.style.display="block";
		if(sl) sl.style.display = 'none';
    }else if(s1 != undefined && pos=="head"){
    	s1.style.display="none";
		if(sl) sl.style.display = '';
    }

    var s2 = document.getElementById("searchextend2");
    if(s1 != undefined && searchType == "user" && pos=="head"){
    	s2.style.display="block";
		if(sl) sl.style.display = 'none';
    }else if(s1 != undefined && pos=="head"){
    	s2.style.display="none";
		if(sl) sl.style.display = '';
    }

	try{window.clearTimeout(timer);}catch(e){}
	return false;
}
function csbt(sbt,sbts){
	if(sbt.value == sbts.value){
		sbt.checked = false;
		sbts.value='bar';
	}else{
		sbts.value=sbt.value;
	}
}
function advancedsearch(){
	var type=document.getElementById("headSearchType").value;
	if(type!=="video" && type!="playlist")type="video";
	var searchdomain = document.getElementById("searchdomain").value;
	if(!searchdomain)searchdomain="http://www.soku.com";
	var url=searchdomain+"/search_advanced"+type;
	if(document.getElementById("headq").value!=''){
		url+="/q_"+encodeURIComponent(document.getElementById("headq").value);
	}
	window.location=url;

}
function drop_mouseover(pos){
	try{window.clearTimeout(timer);}catch(e){}
}
function drop_mouseout(pos){
	var posSel=$(pos+"Sel").style.display;
	if(posSel=="block"){
		timer = setTimeout("drop_hide('"+pos+"')", 1000);
	}
}
function drop_hide(pos){
	$(pos+"Sel").style.display="none";
}

window.nova_init_hook_initsearch = function() {
	var fullPath = document.location.pathname.replace('_','/');
	var path = fullPath.split('/');
	var module='index';
	if(path[1]){module=path[1];}

    var search=module;
	if(path[1] && path[1].indexOf('_')>0){
		search =  path[1].split("_")[1];
	}else if(path[2] && path[2].indexOf('_')>0){
		search =  path[2];
	}else if(path[2] && module=="search"){
		search =  path[2];
	}
    switch (module) {
    	case 'search':
		    module=search;
		    break;
        case 'my':
			search = "user";
            if('bar'==path[2]) search = "bar";
            else if('friend'==path[2]) search = "user";
            else if('playlist'==path[2]) search = "playlist";
            break;
		case 'user':
			search = "user";
			if('v'==path[2]||'video'==path[2]) search = 'video';
			else if('friend'==path[2]) search = "user";
			else if('fav'==path[2]) search = "video";
			else if('playlist'==path[2]) search = "playlist";
			else if('bar'==path[2]) search = "bar";
			break;
		case 'v':
			search = "video";
            if('playlist'==path[2]) search = "playlist";
			break;
    }
    try{
    	initsearch(search);
    }catch(e){};
    loadAds(module);
}

function initsearch(m){
	if(m!="video" && m!="playlist" && m!="user" && m!="bar" ){return true;}
	var names={"video":"è§é¢","playlist":"ä¸è¾","user":"ç©ºé´","bar":"çå§"};
	$("headSearchType").value=m;
	$("headSlected").innerHTML=names[m];
	$("footSearchType").value=m;
	$("footSlected").innerHTML=names[m];
	return true;
}

//for search end

//åç­é®é¢???
function q_answer(){
	    if($('answer').value.length==0){
	    	alert("ç­æ¡ä¸è½ä¸ºç©º");
	    	return;
	    }
		new Ajax.Request(
         "/user/resetpwd/step/2/",
         {method: 'post',
          parameters: Form.serialize('form_resetpwd2'),
          onSuccess: function(o){
          	if(o.responseText=='0'){
			alert('ä½ ççæ¥ä¸å¯¹å§ï¼');
          	}else{
					$('resetpwd_content').innerHTML='<p >&nbsp;</p>\
					    <p >&nbsp;</p>\
					        <p>è¯·å¨ä½ æ³¨åçé®ç®±éï¼ææç¤ºä¿®æ¹ä½ çå¯ç </p>';

          	};
          }
          }
	    );
}
//æ¾åå¯ç æäº¤???
function change_bg(obj,x,theProp,theValue) {
  if (obj && (theProp.indexOf("style.")==-1 || obj.style)){
    if (theValue == true || theValue == false)
      eval("obj."+theProp+"="+theValue);
    else eval("obj."+theProp+"='"+theValue+"'");
  }
}
function loadAds(module) {
    /* Google */
    if(typeof VERSION =='undefined' || VERSION==null){VERSION="";}
	Nova.addScript("http://urchin.lstat.youku.com"+VERSION+"/index/js/urchin.js");
    setTimeout("run_google();", 500);
}
function run_google() {
    if (!window.urchinTracker) {
        setTimeout(run_google, 500);
        return;
    }
    _uacct = "UA-455269-3";
    var trackerParam = (typeof cateStr == 'undefined') ? false : cateStr;
    urchinTracker(trackerParam);
    Log.readLogCookie();
}
function checkLogin(func) {
       var args = new Array();
       if(arguments.length>1){
               args = Array.prototype.slice.call(arguments);
       }
       if(!islogin()){
               if(func && func!=''){
                       login.apply(login,args);
               }else{
                       login();
               }
       }else{
               if(func && func!=''){
                       if(args.length>0){
                               args.shift(); // å»æarguments[0] (func)
                       }
                       if(typeof func == 'string'){
                               func = eval(func);
                       }
                       if(typeof func == 'function'){
                               func.apply(func,args);
                       }
               }
       }
}
function MM_openBrWindow(theURL,winName,features) { //v2.0
	window.open(theURL,winName,features);
}
function sendVideoLink(videoId){
       var url = 'http://www.youku.com/contact/sendlink?obj=v&id='+videoId;
       checkLogin(MM_openBrWindow,url,'','scrollbars=yes,width=695,height=540,resizable=yes');
}
function sendPlayListLink(plid){
       var url = 'http://www.youku.com/contact/sendlink?obj=playlist&id='+plid;
       checkLogin(MM_openBrWindow,url,'','scrollbars=yes,width=695,height=540,resizable=yes');
}
function isEmail(mail){
	return(new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]{1,4}$/).test(mail));
}
// add by Peak for TJCNC
window.nova_init_hook_partner = function() {
	var partner = Nova.Cookie.get("PARTNER");
	if(partner == "tjcnc"){
		var allA = document.getElementsByTagName("a");
		for(var i=0;i<allA.length;i++){
			if(allA[i].target != "" && allA[i].target != "_self"){
				allA[i].target = "_self";
			}
		}
	}
}





var pop=null;
var login_callback_user = null;
var login_callback_fresh = false;
var login_callback_user_args = new Array();
var popwin = null;

/**
 * ç»å½å°çªå£
 * @param callBack Object
   {
	 type:'xxxx',//fromç»è®¡åæ°
	 callBack:function(){},//ç»éæåä¹åçåè°æ¹æ³
	 uaction: 'login',//å¼¹å±é»è®¤æ¾ç¤ºæ¨¡å ç»éå±:login æ³¨åå±:reg
     isrefresh: bool, //æ¯å¦å·æ°å½åé¡µé¢, å·æ°é¡µé¢ä¸å¨æ§è¡callBackï¼æ³¨ï¼ä¸è¦å¨å¬å¸é¨åä½¿ç¨è¯¥åæ°ï¼æ¯å¦head
   }
    login({type:'xxx', callBack:function, isrefresh:bool});
 */
function login(callBack){
	var isNewLogin = loginSwitchToNew ? true : false;
    if( passport=='1' ){
		//add UI destroy, ä½æªå¯¹windowèµå¼null
		if(popwin==null || (popwin && popwin.isDestroy)) {
			popwin = new Qwindow({onhide: function(){
				popwin.destroy();
			}});
		}
		var isCustomer = (typeof callBack!='undefined' && typeof callBack.type!='undefined' && typeof callBack.callBack!='undefined') ? true : false;
		var url = '';
        if(isNewLogin){
            url = 'http://' + (!loginDomainNew ? '' : loginDomainNew) + '/user/login_win'
        }else{
            url = (!passport_url ? '' : passport_url) + '/index_login/'
		}
        var paramStr = [];
		if(isCustomer){
			if(callBack.type != undefined) paramStr.push('from='+callBack.type);
			if(callBack.uaction != undefined) paramStr.push('uaction='+callBack.uaction);
		}
		paramStr = paramStr.join("&");
		if(paramStr.length > 0){
			url += '?' + paramStr;
		}
        var w = isNewLogin ? 540 : 600, h = isNewLogin ? 430 : 515;
        popwin.setContent('iframe', url).setSize(w, h).show();
    }else{
		if(pop!=null) pop.close();
		pop = new Popup({contentType:1,isSupportDraging:false,isReloadOnClose:false,width:540,height:300});
		pop.setContents({'title':'ç»å½','contentUrl':'/index_login/'});
		pop.build().show();
	}
	login_callback_user = isCustomer ? callBack.callBack : callBack;

    //å·æ°å½åé¡µ
    if(typeof callBack!='undefined' && callBack.isrefresh != undefined){
        login_callback_fresh = (callBack.isrefresh===true)? true: false;
    }

	// åæ°
	if(arguments.length>1){
		login_callback_user_args = Array.prototype.slice.call(arguments);
		if(login_callback_user_args.length>0){
			login_callback_user_args.shift(); // å»æarguments[0] (callBack)
		}
	}
}

// obj = {from:xxxx, callBack:xxx}
function loginregGuide(obj){
/*    var isNewLogin = loginSwitchToNew ? true : false;
    if (isNewLogin){ //è·³è½¬å°æ°ç»å½æ¡
        var from = (typeof obj!='undefined'&&typeof obj.from!='undefined')? obj.from: '';
        var callback = (typeof obj!='undefined'&&typeof obj.callBack!='undefined')? obj.callBack: '';
        var cb;
        if (arguments.length > 1) {
            var luca = Array.prototype.slice.call(arguments);
            if (luca.length > 0) {
                luca.shift();
            }
            cb = (function() {
                return function() {
                    if (typeof callback == 'function') {
                        callback(luca);
                    } else if (typeof callback == 'string') {
                        if (callback.indexOf('.') >= 0) {
                            var tmp_cb = window,
                            tmp_ctx = window,
                            i = 1, len, o;
                            callback = callback.split('.');
                            len = callback.length;
                            while (o = callback.shift()) {
                                tmp_cb = tmp_cb[o];
                                i++;
                                if (i <= len - 1) {
                                    tmp_ctx = tmp_ctx[o];
                                }
                            }
                            tmp_cb.apply(tmp_ctx, luca);
                        } else {
                            window[callback](luca);
                        }
                    } else {
                        if (typeof(console.warn) == 'function') {
                            console.warn('Wrong typeof callback passed!');
                        }
                    }
                }
            })();
        } else {
                cb = callback;
        }

        login({type: from, callBack: cb});

        return;
    }*/

	if(popwin==null || (popwin && popwin.isDestroy)) {
        var player = document.getElementById('movie_player');
		popwin = new Qwindow({
            onshow: function(){
                if(player){
                    player.style.height = '0px';
                    player.style.width = '0px';
                }
            },
            onhide: function(){
                if(player){
                    player.style.height = '100%';
                    player.style.width = '100%';
                }
            }
        });
	}
    // æ¾ç¤ºç»å½å¼¹æ¡ï¼ä¸æ¾ç¤ºç»å½å¼å¯¼å¼¹æ¡
    if (popwin.getStatus() == 'show') return;

    var url = typeof passport_url=='undefined'? '': passport_url,
        from = (typeof obj!='undefined'&&typeof obj.from!='undefined')? obj.from: '';

    popwin.setContent('iframe', url+ '/index_loginregGuide/from_'+ from);

    if (typeof obj!='undefined'&&typeof obj.callBack!='undefined'){ // for callback
        login_callback_user = obj.callBack;
        if(arguments.length>1){
            login_callback_user_args = Array.prototype.slice.call(arguments);
            if(login_callback_user_args.length>0){
                login_callback_user_args.shift(); // å»æarguments[0] (callBack)
            }
        }
    } //if-callback
}

/**
 * äºç»´ç ç»å½.
 */
var qrcodeLogin = {
    qrObj: {},

    init: function(qrKey, params){
        if (typeof QRcodeLogin == 'undefined'){
            var src = 'http://'+ currJs_domain_version+ '/index/js/qrcodeLogin.js';
            this._addScript(src, function(){qrcodeLogin.qrObj[qrKey] = QRcodeLogin.init(params);});
        } else {
            qrcodeLogin.qrObj[qrKey] = QRcodeLogin.init(params);
        }
    },
    getObj: function(qrKey){
        return this.qrObj[qrKey];
    },
    _addScript: function(src, callback){
        if(typeof(arguments[0]) != 'string'){ return; }
        var callback = typeof(arguments[1]) == 'function' ? callback : function(){};
        var head = document.getElementsByTagName('HEAD')[0];
        var script = document.createElement('SCRIPT');
        script.type = 'text/javascript';
        script.src = src;
        head.appendChild(script);

        if(!/*@cc_on!@*/0) { //éIE
            script.onerror = script.onload = function(){ callback(); }
        }else{
            script.onreadystatechange = function () {
                if (this.readyState == 'loaded' || this.readyState == 'complete'){ callback(); }
            }
        }
    }
};

/**
 * æ¾åå¯ç 
 */
function findpwd(cp){
	if(pop!=null) pop.close();
	var popUrl = '/index_findpwd';
	if (typeof(cp) == 'number') {
		var img = new Image();
		img.src = 'http://hz.youku.com/red/click.php?tp=1&cp='+cp+'&cpp=1000427&url=';
	}
	pop=new Popup({contentType:1,isSupportDraging:false,isReloadOnClose:false,width:540,height:300});
	pop.setContents({"title":"å¿è®°å¯ç ",'contentUrl':popUrl});
	pop.build().show();
}

openLoginDialog=login;


/**
 * åæ¶ç»å½å¹¶è¿åå½åé¡µ
 */
var default_logout_callback = function(result){
	if(result){
		try{
            if (typeof window.yk_hpage_style!='undefined' && window.yk_hpage_style=='individual'){ //ä¸ªæ§åé¦é¡µç»åº
                top.location.href = 'http://www.youku.com';
            } else {
                top.location.reload();
            }
		}catch(e){
			location.reload();
		}
	}
};
var logout = function(callback){

	callback = callback || "default_logout_callback";

	var youkulogout = function(){
		//iframe logout request for redirect 302
		var callbackname = 'logout' + (+new Date()),
			iframe = document.createElement('iframe'),
			url = 'http://login.youku.com/user/logout?callback=' + callbackname;
		iframe.src = url;
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		//create function for callback
		window[callbackname] = function(rs){
			if(rs && rs.errno === 1){
				iframe.parentNode.removeChild(iframe);
				try{ delete window[callbackname]; } catch(e){ }
				if(typeof(callback) === 'function'){
					callback(rs);
				}else{
					default_logout_callback(rs);
				}
			}
		}
	}
	//use new passport:
	//from: https://account.youku.com/static-resources/js/loadFrame.js
	if(typeof getLoginFrame != 'undefined'){
		new getLoginFrame({
			loginOrLogout: 'logout',
			logoutSuccess: function(){
				youkulogout();
			}
		});
	}else{
		youkulogout();
	}
}
/**
 * æ ¹æ®cookieä¿¡æ¯å¤æ­ç¨æ·æ¯å¦ç»å½
 */
var islogin = function(){
	var username = '';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if(c.indexOf('yktk=') == 0){
			var u_info = decode64(decodeURIComponent(c).split("|")[3]);
			if(u_info.indexOf(",") > -1 && u_info.indexOf("nn:") > -1 && u_info.indexOf("id:") > -1){
				 username = u_info.split(",")[1].split(":")[1];
				 if(username != '') break;
			}
		}
	}

	return (username == '') ? false : true;
}
/**
 *è·åç¨æ·å,è¿ådecodeURIComponentè¿çusername
 */
var get_username = function(){
	var username = '';
	var ca = document.cookie.split(';');
	var len = arguments.length;
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf('u=') == 0 || c.indexOf('k=') == 0) var _c = c;
		if (c.indexOf('_l_lgi=') == 0) var _l = c;
		if(c.indexOf('yktk=') == 0){
			var u_info = decode64(decodeURIComponent(c).split("|")[3]);
			if(u_info.indexOf(",") > -1 && u_info.indexOf("nn:") > -1 && u_info.indexOf("id:") > -1){
				 var username = u_info.split(",")[1].split(":")[1];
				 var userid = u_info.split(",")[0].split(":")[1];
				 if(username != '') break;
			}
		}
	}
	if(username == '' || userid == ''){
		if(_c){
			var username = _c.substring(2,_c.length);
			if(username == '__LOGOUT__') username = '';
			else username = decodeURIComponent(username);
		}
		if(_l){
			var userid = _l.substring(7,_l.length);
		}
	}
	if(len == 0){
		return (username == '') ? '' : username;
	}else if(len == 1 && arguments[0] == 'all'){
		return {'username':username,'userid':userid};
	}
}
/**
 * Feed pubshli tips
 */
var FeedPublishTip = function(feedtype){
	if(!empty(pop)) pop.close();
	setTimeout(function(){
		pop=new Popup({contentType:1,isSupportDraging:false,isReloadOnClose:false,width:248,height:130,isBackgroundCanClick:true});
		pop.setContent("title","åæ­¥å°åä½æ¹ç½ç«");
		pop.setContent("contentUrl", "/partner_feedtips.html?type="+encodeURIComponent(feedtype));
		pop.build().show();
		document.domain = 'youku.com';
	},1000);
}
/**
 * åéç«åæ¶æ¯
 */
var mailto = function(username){
    if(!islogin()) {
        login(mailto.bind(this, username));return;
    }
    window.open('/my_mail/type_mini_receive_'+encodeURIComponent(username),'','location=no,scrollbars=no,width=410,height=320');
}
/**
 * å¢å å¥½å
 */
function addFriend(friendId,module) {
    if(!islogin()){
        login(addFriend.bind(this, friendId, module));return;
    }
	var url = '/my_friend/type_addFriend';
    if(!empty(module)){
    	if(module=="bar"){
    		url = '/bar_friend/type_addFriend';
    	}else if(module=="search"){
    		url = '/search_friend/type_addFriend';
    	}
    }
	nova_request(function(result) {
			switch(result) {
			case 'error':
				alert('é¡µé¢è½½å¥éè¯¯ï¼è¯·å·æ°æ¬é¡µåéè¯ï¼');
				break;
			case 'self':
				alert('ä¸è½å°èªå·±å ä¸ºå¥½åï¼');
				break;
            case 'already':
                alert('å½åç¨æ·å·²ç»æ¯æ¨çå¥½åäºï¼');
                break;
			default:
				if($('groupDialog'))
					$('groupDialog').parentNode.removeChild($('groupDialog'));
                window.__addFriendFromModule = module;
				var dialog = document.createElement('div');
				dialog.innerHTML = result;
				dialog = dialog.firstChild;
				while(dialog.nodeType == 3)
					dialog = dialog.nextSibling;
                var winWidth;
                var winHeight;
                var scrollTop;
                //è·åçªå£å®½åº¦
                if (window.innerWidth)
                    winWidth = window.innerWidth;
                else if ((document.body) && (document.body.clientWidth))
                    winWidth = document.body.clientWidth;
                //è·åçªå£é«åº¦
                if (window.innerHeight)
                    winHeight = window.innerHeight;
                else if ((document.documentElement) && (document.documentElement.clientHeight))
                    winHeight = document.documentElement.clientHeight;
                if(document.documentElement.scrollTop)
                    scrollTop = document.documentElement.scrollTop;
                else if((document.body) && (document.body.scrollTop))
                    scrollTop = document.body.scrollTop;
				document.body.appendChild(dialog);
				if(!scrollTop) scrollTop = 0;
                $('groupDialog').style.top = winHeight/2 - $('groupDialog').clientHeight/2 + scrollTop + 'px';
                $('groupDialog').style.left = winWidth/2 - $('groupDialog').clientWidth/2 + 'px';
				$('groupDialog').style.zIndex = 100000;
				break;
			}
		}.bind(module), url, {'friendId': friendId}, 'get');
}

function _addFriend(event, friendId, groupId) {
	if(!event) event = window.event;
	Event.stop(event);
    var url = '/QMy/~ajax/addFriend';
	if(typeof window.__addFriendFromModule == 'undefined') var module = '';
	else module = window.__addFriendFromModule;
    if(!empty(module)){
    	if(module=="bar"){
    		url = '/QBar/~ajax/addFriend';
    	}
    }
    var AJAXAddFriend = function(param, callback, id) { return nova_call(url, param, callback, id); }
    var __call = function(result){
		if($('groupDialog'))
			$('groupDialog').parentNode.removeChild($('groupDialog'));
        switch(result){
            case 'ok'        : alert('æ·»å å¥½åæå'); return;
            case 'validate'  : alert('è¯¥ç¨æ·å·²è®¾ç½®å¥½åéªè¯ï¼å·²ç»æååéå¥½åè¯·æ±ï¼'); return;
            case 'unallowed' : alert('è¯¥ç¨æ·å·²è®¾ç½®ä¸åè®¸ä»»ä½äººå ä»ä¸ºå¥½åï¼'); return;
            case 'self'      : alert('ä¸è½å°èªå·±å ä¸ºå¥½åï¼'); return;
            case 'already'   : alert('å½åç¨æ·å·²ç»æ¯ä½ çå¥½åäºï¼');return;
            case false       : alert('å¢å å¥½åå¤±è´¥ï¼è¯·ä¸ç³»ç»ç®¡çåèç³»ï¼'); return;
            default          : alert('æªç¥çè¿åå¼ç±»åï¼è¯·ä¸ç³»ç»ç®¡çåèç³»ï¼'+result);
        }
    }
    AJAXAddFriend({'friendId':friendId, 'groupId': groupId},__call);
}
/**
 * ç»å½æµ®å¨å±åè°å½æ°
 */
function login_callback(){
    // yk-é¦é¡µï¼ç»å½æåå·æ°å½åé¡µé¢ï¼å¤æ­é¦é¡µçä¾æ®ï¼window.yk_hpage_style
    if ( typeof window.yk_hpage_style != 'undefined' || //é¦é¡µä½¿ç¨
        (typeof login_callback_fresh!='undefined' && login_callback_fresh===true) ){ //ä¸»å¨è°ç¨ç»å½æ¡ä½¿ç¨
        window.location.reload(); return;
    }

	// ç¨æ·èªå®ä¹åè°å½æ°
	if(login_callback_user && login_callback_user != 'mynull'){
		if(typeof login_callback_user == 'string'){
			login_callback_user = eval(login_callback_user);
		}
		if(typeof login_callback_user == 'function'){
			login_callback_user.apply(login_callback_user,login_callback_user_args);
		}
	}

	// æ´æ°ç»å½ç¶æ
	update_login_status();

    // ç»å½å¼å¯¼åè°
    if (typeof loginregguide_callbackhook != 'undefined'){
        if (typeof loginregguide_callbackhook.newpage!='undefined'&&!empty(loginregguide_callbackhook.newpage)){
            setTimeout(function(){
                if(popwin==null || (popwin && popwin.isDestroy)) {
                    popwin = new Qwindow();
                }
                var url = typeof passport_url=='undefined'? '': passport_url
                popwin.setContent('iframe', url+ '/index_loginregGuideToNewpage/tplname_'+ loginregguide_callbackhook.newpage).setSize(560,280).show();
                try{delete(loginregguide_callbackhook.newpage);}catch(e){}
            }, 300);

        }
    }
}


/**
 * æ´æ°ç¨æ·ç¶æï¼
 *
 */
function update_login_status(){
	for(var key in window){
		if(typeof window[key]=='function' && key.indexOf('update_login_status_hook_')!=-1){
			var o = window[key];
			o();
		}
	}
}

window.nova_init_hook_main_login_status = update_login_status;
//{{{subscribe function

var subscribe_obj=null;
function subscribe_callback(result){
	if(!subscribe_obj){return;}
	var obj = (subscribe_obj.subtype == '0') ? 'ç¨æ·' : (subscribe_obj.subtype == '1' ? 'æ ç­¾' : 'ä¸è¾');
	switch (result){
		case 'ok2'	 : FeedPublishTip('æ¶è' + obj);
        case 'ok'    : alert('å·²æ¶èï¼'); return;
	    case 'error' :
	        alert('æ°æ®åºæä½å¼å¸¸ï¼');return;
	    case -1 :
	        alert('åæ°æ ¡éªå¤±è´¥ï¼');return;
	    case 1 :
	        alert('æ¨æ¶èç'+obj+'ä¸å­å¨ï¼');return;
	    case 2 :
	        var msg = subscribe_obj.subtype == '0' ? 'ä¸è½æ¶èèªå·±ï¼' : 'ä¸è½æ¶èèªå·±çä¸è¾ï¼';
	        alert(msg);return;
	    case 3 :
	        alert('è¯¥'+obj+'å·²ç»æ¶èï¼',null,false,true);return;
	    case 4 :
	        alert('æ ç­¾å«æç¦å¿è¯ä¸è½è¢«æ¶èï¼');return;
	    default :
	        alert('æªç¥çéè¯¯ç±»åï¼');
	}
}
function subscribe(subtype,target){
    if(!islogin()){
        loginregGuide({from:'fav', callBack:subscribe.bind(this, subtype, target)});return;
    }
    var deviceId = '1';
	var channel = '';
	if(typeof(catStr)!='undefined'){
		channel = catStr;
	}
	var fid = '';
	try{
		var firstHref = $$('.panel .items .v')[0].down('a').getAttribute('href').match(/id_(\w+)\.html/);
		fid = firstHref[1];
	}catch(e){

	};
	subscribe_obj = {'subtype':subtype,'target':encodeURIComponent(target),'deviceId':deviceId,'channel':channel,'fid':fid};
	if(empty(udomain)) udomain = 'u.youku.com';
	var url = 'http://'+udomain+'/QMy/~ajax/addSubscribe';
    nova_call(url, subscribe_obj , "subscribe_callback", undefined,1);
}
//}}}
/**
 * è®¢éç¨æ·
 */
var subscribeUser = function(userName){
		subscribe(0,userName);
}

/**
 * æ½å¥
 * l = {id:æ½å¥id,source:æ¥æº}
 */
var lottery = function(l){
	var lid = l.id;
	var source = l.source || 0;
	var v_domain = window.v_domain || 'v.youku.com';
	if(islogin() && lid != 'undefined'){
		//ç»éåè°è®°å½æ¥å¿
		if(l.log != 'undefined' && l.log != 'null'){
			Log.log(1,l.log);
		}
		if(window.popwin) popwin.hide();
		window.popwinLottery = new Qwindow();
		window.popwinLottery.
		setSize(485, 426).
		setContent('iframe', 'http://'+v_domain+'/v_lottery?id='+lid+'&source='+source).
		show();
		Log.log(1,"tp=1&cp=4009623&cpp=1000217");
	}else{
		if(window.popwin) popwin.hide();
		login({
			type:'lottery',
			uaction:'login',
			callBack:function(){
				lottery({id:lid});
				if($('lotteryPic')){
					$('lotteryPic').style.backgroundImage = 'url(http://static.youku.com/index/img/lottery/lottery_toolbar_01.png)';
				}
				Log.log(1,"tp=1&cp=4009629&cpp=1000217");
			}
		});
		Log.log(1,"tp=1&cp=4009621&cpp=1000217");
	}
	return false;
}

/**
 * ä»»å¡ç³»ç»
 * tid:ä»»å¡id   source: 0:å·¥å·æ¡ 1:ä»»å¡åè¡¨é¡µ
 */
var taskUpdateUserInfo = function(tid, source){
	if(!tid) return false;
	var source = source || 0;
	if(!islogin()){
		login({type:"tasksys", callBack: taskUpdateUserInfo}, tid, source);
		return false;
	}
	if(window.popwin) popwin.hide();
	window.popwin_task = new Qwindow({onhide:function(){
		Nova.addScript("http://hz.youku.com/red/click.php?tp=1&cp=4009772&cpp=1000494");
	}});
	window.popwin_task.
	setSize(428, 400).
	setContent('iframe', 'http://'+UC_DOMAIN+'/u/setMyMobilePhone?taskid='+tid+'&source='+source).
	show();
	return false;
}

/**
 * ä¸»å¨ä»»å¡
 * tid:ä»»å¡id   source: 0:å·¥å·æ¡ 1:ä»»å¡åè¡¨é¡µ
 */
var doInitiativeTask	= function(tid, source) {
	if(!islogin()){
		login({type:"tasksys", callBack: doInitiativeTask}, tid);
		return false;
	}

	var callback	= (source == 1) ? 'doInitiativeTaskCallback' : 'doInitiativeTaskCallbackFromToolbar';
	Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=doInitiativeTask&callback[]=' + callback + '&tid='+tid);
}

var doInitiativeTaskCallbackFromToolbar = function(data) {
	doInitiativeTaskCallback(data, 0);
}

var doInitiativeTaskCallback	= function(data, source) {
	var msg		= '',
		notice	= '';

	if(data && data['tid']) {
		msg	= 'é¢åä»»å¡æå!';
	}else if (typeof data === 'string') {
		msg	= data;
	} else {
		msg	= 'é¢åä»»å¡å¤±è´¥!';
	}
	notice	= '<div class="u-task-mask"><p>' + msg + '</p></div>';

	var tid	= data['tid'],
		is_ucenter	= (typeof source === 'undefined') || (source == 1),
		id_prefix	= is_ucenter ? 'ucenter_initiative_task_' : 'toolbar_initiative_task_',
		pid_prefis	= is_ucenter ? 'ucenter_task_list_' : 'task_list_',
		obj_task	= $(id_prefix + tid),
		obj_parent	= null;

	if (!obj_task) {
		alert(msg);
		return ;
	}

	obj_parent	= $(pid_prefis + tid);
	if (!obj_parent) {
		alert(msg);
		return ;
	}

	obj_parent.insert(notice);
	window.setTimeout(function() {
		var tourl	= obj_task.readAttribute('data-tourl');
		if (tourl && (tourl.substring(0, 7) === 'http://') && (tourl.length > 10)) {
			window.location.href	= tourl;
		} else {
			if (is_ucenter) {
				window.location.reload();
			} else if (QheaderModule && QheaderModule.getUserTaskList) {
				QheaderModule.getUserTaskList();
			}
		}
	}, 1000);
}

var popChannelListTimer = null;
/* pop miniHeader channelList */
function mhPopChannelList(listId, event, clearTimerOnly) {
	try{window.clearTimeout(popChannelListTimer);}catch(e){};

	if(Position.within($(listId), Event.pointerX(event), Event.pointerY(event))) return;
	if(typeof clearTimerOnly == undefined || !clearTimerOnly)
		popChannelListTimer = window.setTimeout('_mhPopChannelList("'+listId+'")', 700);
}
function _mhPopChannelList(listId) {
	var elList = $(listId);
	if(elList && elList.style.display != 'block')
		elList.style.display = 'block';
	else
		elList.style.display = 'none';
}

function func_referrer(){
	return document.referrer;
}

//ç¹æ®å­ç¬¦è½¬æ¢æè½¬ä¹ç¬¦
function html2Escape(sHtml) {
    if( typeof (sHtml) == "undefined" || sHtml== null || sHtml == 'null'|| sHtml.length == 0) return '';
    return sHtml.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
}

//è½¬ä¹ç¬¦æ¢æç¹æ®å­ç¬¦
function escape2Html(str) {
    if( typeof (str) == "undefined" || str== null || str == 'null'|| str.length == 0) return '';
    var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
}

if (!window.Log)
    window.Log={};
Log.logCookieKey="logCookieKey";
Log._addScript=function(src) {
	var g = document.createElement("script");
	g.type = "text/javascript";
	g.src = src;
	document.getElementsByTagName('head')[0].appendChild(g);
};
Log.addScript=function(src){//æ­¤æ¹æ³è§£ææ°å­ä»£è¡¨çurl
	var reg1=new RegExp("@"+1+"@","g"); //åå»ºæ­£åRegExpå¯¹è±¡
	var reg2=new RegExp("@"+2+"@","g");
	var reg3=new RegExp("@"+3+"@","g");
	var reg4=new RegExp("@"+4+"@","g");
	var reg5=new RegExp("@"+5+"@","g");
	var reg6=new RegExp("@"+6+"@","g");
	var reg7=new RegExp("@"+7+"@","g");
	src=src.replace(reg1,"http://hz.youku.com/red/click.php").replace(reg2,"http://hz.youku.com/red/relatedVideoClick.php").replace(reg3,"http://lstat.youku.com/nstay.php").replace(reg4,"http://e.stat.youku.com/hot/click").replace(reg5,"http://r.l.youku.com/recclick").replace(reg6,"http://p.l.youku.com/ugctagclick").replace(reg7,"http://r.l.youku.com/rec_at_click");
	src+="&="+Math.floor(Math.random()*1000000);
	Log._addScript(src);
}
Log.log=function(category,args,sendType){  
	if(typeof category!="number"){
		return;
	}
	var type=sendType?sendType:0//è¯·æ±å¤ççæ¹å¼,0ä¸ºcookie,1ä¸ºç´æ¥åéè¯·æ±,é»è®¤ä¸º0
	var url="";
	
	if(type==0){
		var strCookie=document.cookie;
		var arrCookie=strCookie.split("; ");
		for(var i=0;i<arrCookie.length;i++){
			var arr=arrCookie[i].split("=");
			if(Log.logCookieKey==arr[0]){
				if(arr[1]!='invalid'){
					url=unescape(arrCookie[i].substring(Log.logCookieKey.length+1,arrCookie[i].length));
				}
				break;
			}
		}
	}
	
	url+="@"+category+"@";

	if(typeof args=='object'){  
		argUrl="";
		for (arg in args){
			argUrl+="&"+arg+"="+args[arg]
		}
		if(category==4){
			document.cookie="__utmarea="+args.charset+";path=/;domain=youku.com";
		}
		url+="?"+argUrl.substring(1,argUrl.length)+"^";
	}else{
		if(category==4){
			document.cookie="__utmarea="+args.substring(8,args.length)+";path=/;domain=youku.com";
		}
		url+="?"+args+"^";
	}
	if(type==0){
		document.cookie=Log.logCookieKey+"="+escape(url)+";path=/;domain=youku.com";
	}else{
		Log.addScript(url);  //ç´æ¥åéçä»£ç 
	}
}
Log.readLogCookie=function()
{
	var strCookie=document.cookie;
	var arrCookie=strCookie.split("; ");
	var url="";

	found=0;
	for(var i=0;i<arrCookie.length;i++){
		var arr=arrCookie[i].split("=");

		if(Log.logCookieKey==arr[0]){
			found=1;
			if(arr[1]=='invalid'){
				break;
			}

			url=unescape(arrCookie[i].substring(Log.logCookieKey.length+1,arrCookie[i].length));

			requestUrl=url.substring(0,url.length-1).split("^");
			for(var i=0;i<requestUrl.length;i++){
				Log.addScript(requestUrl[i]);
			}

			document.cookie=Log.logCookieKey+"=invalid"+";path=/;domain=youku.com";
			break;
		}
	}
}
var logUnCookie=0;
var logFrame=0;
var logpvid="";
var logExt = '';
var logRPvid="";
if (!navigator.cookieEnabled){
		   logUnCookie=1;
}
if (top.location != self.location){
		   logFrame=1;
}
var getPvid = function(len){
		var randchar=["0","1","2","3","4","5","6","7","8","9",
			"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
			"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
					];
		var i=0;
		var r="";
		var d=new Date();
		for (i=0;i<len;i++){
				         var index=parseInt(Math.random()*Math.pow(10,6))%randchar.length;
						          r+=randchar[index];
		}
		return d.getTime()+r;
}
var getRPvid = function(){
	try{
		var logRPvid = Nova.Cookie.get("rpvid") || "";
		if(logRPvid == ""){
			return "";
		}
		logRPvid = logRPvid.split("-");
		if((new Date()).getTime() - parseInt(logRPvid[1]) > 10*1000){
			return "";
		}
		return logRPvid[0] || "";
	}catch(ex){
		return "";
	}
}
logPvid=getPvid(6);
logRPvid = getRPvid();
if(navigator.userAgent.indexOf("Android") !== -1) logExt = "mtype=adr";
else if(navigator.userAgent.indexOf("iPad") !== -1) logExt = "mtype=ipa";
else if(navigator.userAgent.indexOf("iPhone") !== -1) logExt = "mtype=iph";
else if(navigator.userAgent.indexOf("iPod") !== -1) logExt = "mtype=ipo";
else logExt = "mtype=oth";
//pabtestè·¯å¾åæ°
(function(o){
	o.nova_init_hook_rpabtest = function(){
		if(!window.pabtest) return;
		o.Event.observe(document, "mousedown",  function(ev){
			if(!ev) ev = o.event;
			var target = ev.target || ev.srcElement;
			if(!target) {return;}
			Nova.Cookie.set("rpabtest", window.pabtest + "-" + (new Date()).getTime());
		});
		o.Event.observe(document, "touchend",  function(ev){
			if(!ev) ev = o.event;
			var target = ev.target || ev.srcElement;
			if(!target) {return;}
			Nova.Cookie.set("rpabtest", window.pabtest + "-" + (new Date()).getTime());
		});
	}
})(window);
var getRpabtest = function(){
	try{
		var logRpabtest = Nova.Cookie.get("rpabtest") || "";
		if(logRpabtest == ""){
			return "";
		}
		logRpabtest = logRpabtest.split("-");
		if((new Date()).getTime() - parseInt(logRpabtest[1]) > 10*1000){
			return "";
		}
		return logRpabtest[0] || "";
	}catch(ex){
		return "";
	}
}
var logRpabtest = getRpabtest();
if(logRpabtest) logExt += "&rpabtest="+logRpabtest;

//BETA-16688,from google_*.js
document.observe("dom:loaded",function(){var f={HTMLEvents:/^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,MouseEvents:/^(?:click|mouse(?:down|up|over|move|out))$/},g={pointerX:0,pointerY:0,button:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,bubbles:!0,cancelable:!0};Event.simulate=function(a,d,b){var b=Object.extend(g,b||{}),c,e=null,a=$(a);for(c in f)if(f[c].test(d)){e=c;break}if(!e)return!1;document.createEvent?(c=document.createEvent(e),"HTMLEvents"==e?c.initEvent(d,
b.bubbles,b.cancelable):c.initMouseEvent(d,b.bubbles,b.cancelable,document.defaultView,b.button,b.pointerX,b.pointerY,b.pointerX,b.pointerY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,a),a.dispatchEvent(c)):(b.clientX=b.pointerX,b.clientY=b.pointerY,c=Object.extend(document.createEventObject(),b),a.fireEvent("on"+d,c));return a};Element.addMethods({simulate:Event.simulate});var a=navigator.language||navigator.userLanguage;if(a&&-1==a.indexOf("zh")&&(window.google_close=function(){$("id_google_tr").hide();
Nova.Cookie.set("googtrans_flag",1,7);google_hz(4009238)},window.google_hz=function(a){if("number"==typeof a)(new Image).src="http://hz.youku.com/red/click.php?tp=1&cp="+a+"&cpp=1000808&url="},window.google_tr=function(){Nova.Cookie.get("googtrans")?google_hz(4009239):($("id_google_tr").show(),window.google_hz(4009236));new google.translate.TranslateElement({pageLanguage:"zh-CN",includedLanguages:"en,ja,ko,de,fr,ru,th,es,it,zh-CN,zh-TW",layout:google.translate.TranslateElement.InlineLayout.HORIZONTAL},
"google_translate_element");$$("#google_translate_element .goog-te-combo")[0].observe("change",function(){google_hz(4009237);google_hz(4009239);$("id_google_tr").hide()})},a=$("copyright_tips"),!(a&&0<a.innerHTML.length)))google_hz(4009240),Nova.Cookie.get("googtrans_flag")?google_hz(4009241):(a=document.createElement("meta"),a.name="google-translate-customization",a.content="ec4dbd1adf345c14-e795922c2f356fc4-gfa7ef90fd12bc111-d",document.getElementsByTagName("head")[0].appendChild(a),a=document.createElement("meta"),
a.name="google",a.content="notranslate",document.getElementsByTagName("head")[0].appendChild(a),a=document.createElement("div"),a.innerHTML='<div style="position:relative;height:32px;margin:0;background:#ffffe5;border:1px solid #ecdda8"><div id="google_translate_element" style="padding:2px 0;text-align:center;font:12px/28px arial;color:#555"></div><div  onclick="google_close()" style="position:absolute;top:0;right:0;width:32px;height:32px;cursor:pointer;background:url(http://static.youku.com/index/img/master.png) no-repeat -287px -318px"></div></div>',
a.id="id_google_tr",a.style.display="none",r_panel=$$("body")[0],r_panel.insertBefore(a,r_panel.firstChild),Nova.addScript("//translate.google.com/translate_a/element.js?cb=window.google_tr"))});

//æéç¨æ·éªè¯ææº
var remindPopWin = {
	winHandle: null,
	init: function(){
		if(!islogin()){
			return;
		}else{
			var hasOpen = Nova.Cookie.get('YK_UCBM');
			if (hasOpen != 1){
				var remote = remindPopWin.getUrlBase() + '/u/~ajax/remindUser.html';
				var callback = 'remindPopWin.remindCallback';
				nova_call(remote, {}, callback, undefined, 1);
			}
		}
	},
	remindCallback: function(o){
    	if (o.succ == 1){
    		Nova.Cookie.set('YK_UCBM', 1, 1);
			var _ifmUrl = this.getUrlBase() + '/u/remindBindMobile';
			this.winHandle = new Qwindow();
			this.winHandle.setSize(460,230).setContent('iframe',_ifmUrl).show();
    	}
	},
	getUrlBase: function(){
		var domain = window['UC_DOMAIN'];
		if(!domain){ domain = 'i.youku.com'; }
		return 'http://' + domain;
	},
	closeWin: function(){
		if (this.winHandle) this.winHandle.destroy();
	}
};

(function(o){
	if(new RegExp('^http:\/\/www.youku.com(\/)?$').test(window.location.href)){
		return false;
	}
	o.update_login_status_hook_UcMobile = remindPopWin.init;
})(window);

//å è½½ikuæä¾p2pç¶æï¼å·²ç»å¤èµ·ikuæ¹æ³çjs
(function(o){
	if(!o) {return false;}
	if(!o.Event) {return false;}
	
	o.nova_init_hook_iku_loadjs = function(){
		loadIkuJs();
	}
	
	/**
	 *ä¼é·PCWebä¸è½½IKUå®¢æ·ç«¯å¬å±æ¹æ³
	 *obj {from:'xxx',action:'xxx',secne:'xxx',callback:'xxx',sid:'xxx'}
	 *	from é¡µé¢æ¥æº video æ­æ¾é¡µï¼show èç®é¡µï¼index é¦é¡µ
	 *	action å·ä½æä½ï¼video åè§é¢ä¸è½½ï¼show å¨éä¸è½½ï¼play æ­æ¾ï¼ikudown ikuä¸è½½ï¼adddesktop æ¾å°æ¡é¢ï¼
	 *  secne ç»è®¡åç±»ï¼
	 *  	  å®ä¹è§åï¼ikuæä¾çä¸è½½å°åURLæåä¸ä¸ª"/"åçå­ç¬¦ä¸²
	 *		  å·ä½å®ä¹ï¼"ywebplayererror" - æ­æ¾å¨éè¯¯çé¢;"ywebplayerbottom" - æ­æ¾å¨åºé¨ä¸è½½;"ywebplayerlist" - æ­æ¾å³ä¾§åè¡¨;"ywebposter" - ç¹æµ·æ¥ä¸è½½;"ywebshow" - èç®é¡µä¸è½½;"ywebplaylistad" - æ­æ¾å³ä¾§åè¡¨åºé¨å¹¿å;"ywebrecommend" - æ­æ¾é¡µå³ä¾§ugcæ¨è;"ywebadddesktop" - æ­æ¾å³ä¾§åè¡¨æ¾å°æ¡é¢; 
	 *	sid èµæºidãåè§é¢ä¸è½½ææ­æ¾æ¶ï¼ä¼ è§é¢idï¼æ­æ¾é¡µå¯ä¸ä¼ ï¼ï¼èç®å¨éä¸è½½æ¶ï¼ä¼ èç®idï¼æ­æ¾é¡µãèç®é¡µåå¯ä¸ä¼ ï¼
	 *	callback åè°æ¹æ³
	 *è¿åå¼å®ä¹
	 *	false åæ°éè¯¯ï¼1 okï¼æ­£å¸¸å¤èµ·å®¢æ·ç«¯ï¼-1 æªå®è£ï¼æç¤ºä¸è½½
	 */
	o.ikuExecuteFrompc = function(obj) {
		var rs = true;
		if(!obj.from || !obj.action || (obj.from != 'video' && obj.action == 'video' && !obj.sid) || ((obj.from != 'video' && obj.from != 'show') && obj.action == 'show' && !obj.sid)){
			rs = 0;
			if(typeof(callback) === 'function'){
				callback(rs);
				return false;
			}else{
				return rs;
			}
		}
		if(typeof(ikuNewExecute) == "undefined"){
			if(typeof VERSION =='undefined' || VERSION==null){
				VERSION="";
			}
			loadIkuJs();
		}
	    setTimeout(function(){
	    	var rs = 0;
			var callback = !obj.callback ? '' : obj.callback;
	    	var secne = !obj.secne ? '' : obj.secne;
	    	var from = obj.from;
	    	var action = obj.action;
	    	var href = "";
	        var ykss = !Nova.Cookie.get('ykss') ? "" : Nova.Cookie.get('ykss');
	        if(action == "video"){
	        	 var videoIdNow = "";
	             var quality = "";
	             if(from == 'video'){
	            	 if(_player() && typeof(_player().getNsData) == "function"){
	                     var playInfo = _player().getNsData();
	                     if(playInfo){
	                         videoIdNow = playInfo.langVid != null ? playInfo.langVid : playInfo.vidEncoded;
	                         quality = !playInfo.quality ? "mp4" : playInfo.quality;
	                     }
	                 }
	            	 videoIdNow = videoIdNow != "" ? videoIdNow : window.videoId2;
	             }
	             if(!videoIdNow && obj.sid){
	            	 videoIdNow = obj.sid;
	             }
	             if(videoIdNow){
	            	 quality = !quality ? "mp4" : quality;
	                 var url = "http://v.youku.com/v_show/id_"+ videoIdNow +".html";
	                 href = "iku://|video|" + url + "|quality=" + quality + "|ykss=" + ykss + '|';
	             }else{
	            	 rs = 0;
	             }
	        }else if(action == "show"){
	        	var showid = "";
	        	var quality = "";
	        	if(from == 'video'){
	        		if(_player() && typeof(_player().getNsData) == "function"){
	                    var playInfo = _player().getNsData();
	                    if(playInfo){
	                        quality = !playInfo.quality ? "mp4" : playInfo.quality;
	                    }
	                }
	        		showid = typeof(window.showid_en) != "undefined" ? ("z" + window.showid_en) : "";
	            }else if(from == 'show'){
	            	showid = typeof(window.g_config.id) != "undefined" ? window.g_config.id : "";
	            }
	        	if( obj.sid){
	            	showid = obj.sid;
	            }
	        	if(showid){
	        		quality = !quality ? "mp4" : quality;
	            	href = "iku://|vshow|download|"+showid+"|quality="+quality+"|ykss="+ykss+"|";
	        	}else{
	        		rs = 0;
	        	}
	        }else if(action == "play"){
	        	var videoIdNow = "";
	        	if(from == 'video'){
					if(_player() && typeof(_player().getNsData) == "function"){
						var playInfo = _player().getNsData();
						if(playInfo){
							videoIdNow = playInfo.langVid != null ? playInfo.langVid : playInfo.vidEncoded;
						}
					}
					videoIdNow = videoIdNow != "" ? videoIdNow : window.videoId2;
	            }
	        	if(obj.sid){
	        		videoIdNow = obj.sid;
	            }
				if(videoIdNow){
		        	href = "iku://|play|web|videoid|playerror|"+videoIdNow+"|ykss="+ykss+"|";
				}else{
					rs = 0;
				}
	        }else if(action == "adddesktop"){//æ·»å å°æ¡é¢
	        	var showid = "";
	        	var quality = "";
	        	if(from == 'video'){
	        		if(_player() && typeof(_player().getNsData) == "function"){
	                    var playInfo = _player().getNsData();
	                    if(playInfo){
	                        quality = !playInfo.quality ? "mp4" : playInfo.quality;
	                    }
	                }
	        		showid = typeof(window.showid_en) != "undefined" ? ("z" + window.showid_en) : "";
	            }
	        	if( obj.sid){
	            	showid = obj.sid;
	            }
	        	if(showid){
	        		quality = !quality ? "mp4" : quality;
	            	href = "iku://|vshow|shortcut|"+showid+"|quality="+quality+"|ykss="+ykss+"|";
	        	}else{
	        		rs = 0;
	        	}
	        }
	        
	        var r_fail = function(r){
	        	rs = -1;
	            //é»è®¤æç¤ºä¸è½½é¡µ
	            var ikuUrlDef = "http://iku.youku.com/pc/index?tp=v&ori=ykplay&id="+window.videoId2;
	            if(quality){
	                ikuUrlDef += "&q=" + quality;
	            }
	            var ikuUrl = "";
	            if(typeof(r) == "undefined" || r==false || r=="" || r.indexOf("http://iku.youku.com") == -1){
	                ikuUrl = ikuUrlDef;
	            }else{
	                ikuUrl = r;
	            }
	            var iframe = document.createElement("iframe");
	            iframe.width = 0;
	            iframe.height = 0;
	            iframe.src = ikuUrl;
	            document.body.appendChild(iframe);
	            setTimeout(function(){
	                document.body.removeChild(iframe);
	            }, 2000);
	        }
	        var r_succ = function(r){
	        	rs = 1;
	        }
	        
	        if(window.navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.match(/MSIE 6./i)=="MSIE 6." || navigator.appVersion.match(/MSIE 7./i)=="MSIE 7.")){
	        	ikuNewExecute(href , secne , r_succ , r_fail);
	        }else{
	        	var r = ikuNewExecute(href , secne);
	        	if(r != "ok"){//5.0çé»è¾
	        		r_fail(r);
	            }else{
	            	r_succ(r);
	            }
	        }
	        
	        if(typeof(callback) === 'function'){
				callback(rs);
			}else{
				return rs;
			}
	    }, 200);
	}
	
	var loadIkuJs = function(){
		addScriptCommon("http://static.youku.com"+VERSION+"/index/js/ikuAdapterNew.js");
	}
 })(window);

function addScriptCommon(src, callback){
    if(typeof(arguments[0]) != 'string'){ return; }
    var callback = typeof(arguments[1]) == 'function' ? callback : function(){};
    var head = document.getElementsByTagName('HEAD')[0];
    var script = document.createElement('SCRIPT');
    script.type = 'text/javascript';
    script.src = src;
    head.appendChild(script);

    if(!/*@cc_on!@*/0) { //éIE
        script.onerror = script.onload = function(){ callback(); }
    }else{
        script.onreadystatechange = function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete'){ callback(); }
        }
    }
}

/**
 * éç¨è·³è½¬é¡µé¢æå®é¢æ¿æ¹æ³
 * tag ä¸ºè¦è·³è½¬çæ å¿
 * <div class="scroll-a"></div>
 * æ¯å¦è¦è·³è½¬å°è¿ä¸ªè¯¥ç¤ºä¾çdiv,tagï¼aå³å¯ã
 */
var smoothScroll={
	speed:400,
	init:function(tag){
		if(jQuery){
			var self = this;
            var $url=jQuery('.scroll-'+tag);
            var distance=parseInt($url.offset().top)-65;//åå»å¤´é¨é«åº¦
            if ($url.length) {
	        	jQuery('html, body').stop().animate({ 'scrollTop':distance }, self.speed, function() {
	                    location.hash = tag;
	        	});
            }
		}
    }
};

/*
 * æ»å¨æ§ä»¶
 *  2015-08-12
 *  init æ¹æ³ä¼ å¥å¯¹è±¡
 *  obj{body, æ´ä¸ªæ»å¨æ¨¡åçåå®¹ ç±»å
 *  page, æ»å¨åå®¹æå¨åºå ç±»å
 *  prev, å¯ç¹å»ä¸ä¸é¡µ ç±»å
 *  next, å¯ç¹å»ä¸ä¸é¡µ ç±»å
 *  item  æ»å¨item ç±»å
 *  }
 */
var ShowSlide = function(){
    this.totalePage = 0;
    this.iWidth = 0;
    this.iW = 0;
    this.slideWidth = 0;
    this.$page = null;
    this.$next = null;
    this.$prev = null;
    this.$item = null;
    this.cur_i = 0;
    this.init = function(obj){
        var $body=jQuery("."+obj.body);
        this.$page = jQuery($body.find("."+obj.page)[0]);
        this.$prev = jQuery($body.find("."+obj.prev)[0]);
        this.$next = jQuery($body.find("."+obj.next)[0]);
        var $items = $body.find("."+obj.item);
        this.$item = jQuery($items[0]);

        var itemWidth = this.$item.outerWidth(true);
        this.iWidth =  $items.length * itemWidth;
        this.slideWidth = $body.width();
        this.iW = Math.floor(this.slideWidth/itemWidth) * itemWidth; //è®¡ç®æ¯ä¸æ¬¡æ»å¨å¤å°
        this.totalPage = Math.ceil(this.iWidth/this.iW);
       	// å¦æä¸å¤ä¸å±ï¼åéèç¿»é¡µæé®
        if ( this.iWidth > this.iW ){
            this.$prev.css('display','none');
            this.$next.css('display','block');
        }else{
        	this.$prev.css('display','none');
        	this.$next.css('display','none');
        }
       this.bindClick();
    };
    this.bindClick = function(){
        // ç»å®ä¸ä¸é¡µï¼ä¸ä¸é¡µçç¹å»äºä»¶
        _this = this;
        _this.$prev.click(function(){//å·¦è¾¹çæé®
        	if(_this.cur_i == _this.totalPage){
        		--_this.cur_i;
        	}                
                if ( _this.cur_i > 1 ) {
                        var rightpos = -_this.iWidth + _this.iW * (_this.totalPage - _this.cur_i + 1 ); 
                        _this.$page.animate({left:rightpos});
                       	_this.$next.css('display','block');
                       	--_this.cur_i;
                } else {
                      	_this.$page.animate({left:0});
                       	_this.$prev.css('display','none');
                       	_this.$next.css('display','block');
                        _this.cur_i = 0;
                }
        });

      	_this.$next.click(function(){//å³è¾¹
                ++_this.cur_i;
                if(_this.cur_i+1 < _this.totalPage){
                        var leftpos = -_this.iW * _this.cur_i;
                        _this.$page.animate({left:leftpos});
                        _this.$prev.css('display','block');
                }else{                	
                        var leftlast = -(_this.iWidth - _this.slideWidth - 2*parseInt(_this.$item.css("margin-left")));
                        _this.$page.animate({left:leftlast});
                        _this.$next.css('display','none');
                        _this.$prev.css('display','block');
                        _this.cur_i = _this.totalPage;
                }
        });
    };
};
