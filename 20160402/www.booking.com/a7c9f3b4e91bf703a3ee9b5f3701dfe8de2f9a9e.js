B.define("click-out",function(d,c,f){_p=_o;_o="456:1";var e={},b=false;
function a(){_p=_o;_o="456:2";if(!b){b=true;
if(document.documentElement.addEventListener){document.documentElement.addEventListener("click",g)
}else{if(document.documentElement.attachEvent){document.documentElement.attachEvent("onclick",g)
}}}}function g(m){_p=_o;_o="456:4";var k=Object.keys(e),l={},j,i=false;
if(k.length){j=m.target||m.srcElement;
while(j){k.forEach(function(n){_p=_o;_o="456:5";if(e[n].element===j){l[n]=true;
if(k.length==1){i=true
}}});
if(i){break
}j=j.parentNode
}}k.forEach(function(n){_p=_o;_o="456:7";if(!l[n]&&e[n]){e[n].callback.call(false);
h(n)
}})
}function h(i){_p=_o;_o="456:10";if(e[i]){delete e[i]
}}c.addMonitor=function(i,k){_p=_o;_o="456:12";a();
var j=Math.random();
if(typeof i.jquery==="string"){i=i[0]
}setTimeout(function(){_p=_o;_o="456:13";e[j]={element:i,callback:k}
},4);
return j
};
c.removeMonitor=h
});
B.define("read-data-options",function(b,a,c){_p=_o;_o="456:17";c.exports=function(f,e){_p=_o;_o="456:18";var d={};
if(f.jquery){f=f[0]
}Object.keys(e).forEach(function(g){_p=_o;_o="456:19";var h=e[g];
var j="data-"+(h.name||g);
var i=null;
if(typeof h==="function"){h={type:h}
}if(!f.attributes[j]){if(h.hasOwnProperty("defaultValue")){d[g]=h.defaultValue
}else{if(h.hasOwnProperty("required")){throw new Error("read-data-options: missing required "+j+" attribute")
}}return
}var i=f.getAttribute(j);
if(h.type===Boolean){i=!(/^0|false|no|off$/.test(i))
}else{if(h.type===String){i=i||h.defaultValue
}else{if(h.type===Number){i=parseFloat(i,10);
if(isNaN(i)){i=h.defaultValue
}}else{throw new Error("data-options: Invalid option type for "+g)
}}}d[g]=i
});
return d
}
});
B.define("component/autocomplete-base",function(c,a,d){_p=_o;_o="456:23";var b=c("component");
var e=c("read-data-options");
d.exports=b.extend({init:function(){_p=_o;_o="456:24";this.highlightedIndex=-1;
this.isDeletion=false;
this.items=[];
this.keyDownCount=0;
this.keysDown={};
this.listHeight=0;
this.listVisible=false;
this.preventBlurClose=false;
this.selectedIndex=-1;
this.selectedValue=null;
this.valueBuffer=null;
this.clickOutController=c("click-out");
this.clickOutMonitorId=null;
this.$input=this.$el.find('[data-input=""]');
this.input=this.$input[0];
this.$list=this.$el.find('[data-list=""]');
this.$items=this.$list.children();
this.optionsSpec=this.optionsSpec||{};
this.optionsSpec=$.extend(this.optionsSpec,{openFocus:{name:"open-focus",type:Boolean},highlightFirst:{name:"highlight-first",type:Boolean}});
this.options=e(this.$el,this.optionsSpec);
this.supportsInputEvent=this.input&&"oninput" in this.input;
this.addInputEventListeners();
this.addListEventListeners();
this.addItemsEventListeners();
this.calculateListHeight();
this.$input.attr("autocomplete","off")
},addInputEventListeners:function(){_p=_o;_o="456:26";var f=this.$input.component("keyboard");
f.on("keydown:Escape",this.inputEscape.bind(this));
f.on("keydown:ArrowUp",this.inputArrowUp.bind(this));
f.on("keydown:ArrowDown",this.inputArrowDown.bind(this));
f.on("keydown:Enter",this.inputEnter.bind(this));
f.on("keydown:Tab",this.inputTab.bind(this));
this.$input.focus(this.inputFocus.bind(this));
this.$input.blur(this.inputBlur.bind(this));
this.$input.keydown(this.inputKeyDown.bind(this));
this.$input.bind("input",this.inputInput.bind(this));
this.$input.keyup(this.inputKeyUp.bind(this))
},addListEventListeners:function(){_p=_o;_o="456:28";this.$list.mousedown(this.listMouseDown.bind(this));
this.$list.mouseup(this.listMouseUp.bind(this));
this.$list.delegate('[data-list-item=""]',"click",this.listItemClick.bind(this))
},addItemsEventListeners:function(){_p=_o;_o="456:30";this.$items.click(this.listItemClick.bind(this))
},addClickOutEventListener:function(){_p=_o;_o="456:32";this.clickOutMonitorId=this.clickOutController.addMonitor(this.el,this.clickOut.bind(this))
},removeClickOutEventListener:function(){_p=_o;_o="456:34";this.clickOutController.removeMonitor(this.clickOutMonitorId)
},calculateListHeight:function(){_p=_o;_o="456:36";this.listHeight=this.$list.outerHeight()
},inputFocus:function(f){_p=_o;_o="456:38";if(this.options.openFocus){this.listShow();
this.autocomplete({fromFocus:true})
}},inputBlur:function(f){_p=_o;_o="456:40";setTimeout(this.inputBlurSync.bind(this),4)
},inputBlurSync:function(){_p=_o;_o="456:42";if(!this.preventBlurClose&&this.listVisible){this.highlightReset();
this.reset()
}},inputKeyDown:function(h){_p=_o;_o="456:44";var f=h.ctrlKey||h.metaKey||h.shiftKey||h.altKey,g=h.which==8||h.which==46;
this.isDeletion=g;
this.taintedKeyDown=f
},inputInput:function(f){_p=_o;_o="456:46";this.autocomplete()
},inputKeyUp:function(h){_p=_o;_o="456:48";var g=this.taintedKeyDown||h.ctrlKey||h.metaKey||h.shiftKey||h.altKey||(h.which>=16&&h.which<=18)||h.which==91,f=h.which==32||h.which>=48,i=h.which>=37&&h.which<=40;
if(!g){if(i||f){this.listShow()
}if((this.isDeletion||f)&&!this.supportsInputEvent){this.autocomplete()
}}},inputEscape:function(f){_p=_o;_o="456:50";if(this.listVisible){f.originalEvent.preventDefault();
this.highlightReset();
this.reset()
}},inputArrowUp:function(f){_p=_o;_o="456:52";f.originalEvent.preventDefault();
if(this.listVisible){this.highlightPrevious()
}else{this.listShow()
}},inputArrowDown:function(f){_p=_o;_o="456:54";f.originalEvent.preventDefault();
if(this.listVisible){this.highlightNext()
}else{this.listShow()
}},inputEnter:function(f){_p=_o;_o="456:56";if(this.listVisible&&this.highlightedIndex!=-1){f.originalEvent.preventDefault();
this.choose(this.highlightedIndex)
}},inputTab:function(f){_p=_o;_o="456:58";this.inputEnter.apply(this,arguments)
},listItemClick:function(g){_p=_o;_o="456:60";var f=$(g.currentTarget);
this.choose(f.data("i"))
},listMouseDown:function(f){_p=_o;_o="456:62";this.preventBlurClose=true
},listMouseUp:function(f){_p=_o;_o="456:64";this.preventBlurClose=false
},clickOut:function(){_p=_o;_o="456:66";if(this.listVisible){this.highlightReset();
this.reset()
}},setValue:function(f){_p=_o;_o="456:68";this.input.value=f
},listShow:function(){_p=_o;_o="456:70";if(!this.listVisible){this.$list.addClass("-visible");
this.listVisible=true;
this.addClickOutEventListener();
this.$list[0].scrollTop=1;
setTimeout(function(){_p=_o;_o="456:71";this.$list[0].scrollTop=0
}.bind(this),10)
}},listHide:function(){_p=_o;_o="456:74";if(this.listVisible){this.$list.removeClass("-visible");
this.resetFlags();
this.removeClickOutEventListener()
}},highlightPrevious:function(){_p=_o;_o="456:76";var f=this.highlightedIndex;
do{if(f==-1){f=this.items.length-1
}else{f--
}}while(f!=-1&&this.items[f].hidden);
this.highlightFromNavigation(f)
},highlightNext:function(){_p=_o;_o="456:78";var f=this.highlightedIndex;
do{if(f==this.items.length-1){f=-1
}else{f++
}}while(f!=-1&&this.items[f].hidden);
this.highlightFromNavigation(f)
},highlightFromNavigation:function(h,j){_p=_o;_o="456:80";if(this.highlightedIndex==-1||j){this.valueBuffer=this.input.value
}if(h==-1){this.highlightReset({preserveFocus:true})
}else{if(this.supportsInputEvent){if(this.valueBuffer&&this.items[h].valueLowerCase.indexOf(this.valueBuffer.toLowerCase())==0){var k=this.valueBuffer.length,f=this.items[h].value.length,i=this.valueBuffer+this.items[h].value.substring(k);
if(this.input.value!=i){this.setValue(i)
}if(this.input.setSelectionRange){this.input.setSelectionRange(k,f)
}else{if(this.input.createTextRange){var g=this.input.createTextRange();
g.collapse(true);
g.moveStart("character",k);
g.moveEnd("character",f);
g.select()
}else{if(this.input.selectionStart!==undefined){this.input.selectionStart=k;
this.input.selectionEnd=f
}}}}else{this.setValue(this.items[h].value);
this.fixIEFocusLoss()
}}}this.highlight(h)
},highlightFromAutocomplete:function(){_p=_o;_o="456:82";var g=this.input.value,f=this.getListFirstIndex();
if(f!==-1&&this.options.highlightFirst&&!this.isDeletion&&g&&this.items[f].valueLowerCase.indexOf(g.toLowerCase())===0){this.highlightFromNavigation(f,true)
}else{this.highlight(-1)
}},highlight:function(f){_p=_o;_o="456:84";this.listShow();
if(this.highlightedIndex!=-1){this.$items.eq(this.highlightedIndex).removeClass("-highlighted")
}if(f!=-1){this.$items.eq(f).addClass("-highlighted")
}this.highlightedIndex=f;
this.highlightScroll()
},highlightReset:function(f){_p=_o;_o="456:86";f=f||{};
if(this.valueBuffer!==null&&!f.preserveInputValue){this.setValue(this.valueBuffer);
if(f.preserveFocus){this.fixIEFocusLoss()
}}if(this.highlightedIndex!=-1){this.$items.eq(this.highlightedIndex).removeClass("-highlighted")
}this.highlightedIndex=-1
},highlightScroll:function(){_p=_o;_o="456:88";var f=false,h=this.$list[0].scrollTop;
if(this.highlightedIndex!=-1){var i=this.$items.eq(this.highlightedIndex),g=(i.length==1&&i.position().top)+h,j=i.outerHeight();
if(g+j>this.listHeight+h){f=g+j-this.listHeight
}else{if(g<h){f=g
}}}else{f=0
}if(f!==false&&f!=h){this.$list[0].scrollTop=f
}},getListLength:function(){_p=_o;_o="456:90";return this.items.length
},getListFirstIndex:function(){_p=_o;_o="456:92";if(this.items.length===0){return -1
}else{return 0
}},autocomplete:function(){_p=_o;_o="456:94";this.postAutocomplete()
},postAutocomplete:function(){_p=_o;_o="456:96";if(this.getListLength()===0){this.listHide()
}else{this.listShow();
this.calculateListHeight();
this.highlightFromAutocomplete()
}},choose:function(f){_p=_o;_o="456:98";this.selectedIndex=f;
this.selectedValue=this.items[f].value;
this.setValue(this.selectedValue);
this.reset()
},reset:function(f){_p=_o;_o="456:100";f=f||{};
if(this.highlightedIndex!=-1){this.$items.eq(this.highlightedIndex).removeClass("-highlighted")
}this.listHide();
if(f.hard){this.resetFlags();
this.selectedIndex=-1;
this.selectedValue=null;
this.setValue("")
}},resetFlags:function(){_p=_o;_o="456:102";this.highlightedIndex=-1;
this.isDeletion=false;
this.keyDownCount=0;
this.keysDown={};
this.listVisible=false;
this.preventBlurClose=false;
this.valueBuffer=null
},fixIEFocusLoss:function(){_p=_o;_o="456:104";if(this.input.createTextRange){var f=this.input.createTextRange();
f.moveStart("character",this.input.value.length);
f.collapse();
f.select()
}}})
});
B.define("component/core/input-placeholder",function(c,a,d){_p=_o;_o="456:107";var b=c("component");
var e=c("read-data-options");
return b.extend({init:function(){_p=_o;_o="456:108";if(this.browserSupported()){return
}this.options=e(this.$el,{placeholderClass:{name:"placeholder-class",type:String},placeholderColor:{name:"placeholder-color",type:String,defaultValue:"#7C90A6"}});
var g="input, textarea";
var f=this.$el.find(g);
if(this.$el.is(g)){f=f.add(this.$el)
}f.filter(function(h,i){_p=_o;_o="456:109";return !!$(i).attr("placeholder")
}).each(function(h,i){_p=_o;_o="456:111";this.setupPlaceholder($(i))
}.bind(this))
},browserSupported:function(){_p=_o;_o="456:114";var f=$('input[type="text"]')[0]||$('<input type="text">')[0];
return !!("placeholder" in f)
},setupPlaceholder:function(f){_p=_o;_o="456:116";var g=$("<label />").text(f.attr("placeholder")).css({width:f.width()+"px",height:f.height()+"px",paddingTop:f.css("padding-top"),paddingLeft:f.css("padding-left"),paddingRight:f.css("padding-right"),fontFamily:f.css("font-family"),fontSize:f.css("font-size"),color:this.options.placeholderColor,overflow:"hidden",cursor:"text",position:"absolute"});
if(this.options.placeholderClass){g.addClass(this.options.placeholderClass)
}g.insertBefore(f);
g.click(function(){_p=_o;_o="456:117";f.focus()
});
f.focus(function(){_p=_o;_o="456:119";g.hide()
}).blur(function(){_p=_o;_o="456:121";g[f.val().length?"hide":"show"]()
});
if(f.get(0)===document.activeElement){f.triggerHandler("focus")
}else{f.triggerHandler("blur")
}}})
});
B.define("component/keyboard",function(c,a,d){_p=_o;_o="456:125";var b=c("component"),e=c("event-emitter"),g={8:"Backspace",46:"Delete",9:"Tab",13:"Enter",32:"Space",27:"Escape",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z"};
function f(i,h){_p=_o;_o="456:126";return function(k){_p=_o;_o="456:127";var j="";
if(k.which&&g[k.which.toString()]!==undefined){if(k.originalEvent.altKey){j+=":alt"
}if(k.originalEvent.ctrlKey){j+=":ctrl"
}if(k.originalEvent.metaKey){j+=":meta"
}if(k.originalEvent.shiftKey){j+=":shift"
}j+=":"+g[k.which];
i.trigger(h+j,{keys:h+j,originalEvent:k})
}}
}d.exports=b.extend({init:function(){_p=_o;_o="456:130";e.extend(this);
this.$el.bind("keydown",f(this,"keydown")).bind("keyup",f(this,"keyup"))
}})
});
booking.jstmpl("search_destination_autocomplete_results",(function(){_p=_o;_o="456:133";var b=["\n\t","\n\n\t","\n\n\t\t","\n\t\t",'\n\n\t\t\n\n\t\t\u003cli \n\t\t\tclass="',"c-autocomplete__item sb-autocomplete__item ","sb-autocomplete__item--cjk ","sb-autocomplete__item--airport ","sb-autocomplete__item--city ","sb-autocomplete__item--country ","sb-autocomplete__item--district ","sb-autocomplete__item--hotel ","sb-autocomplete__item--landmark ","sb-autocomplete__item--region ","sb-autocomplete__item--theme ","sb-autocomplete__item--history ","sb-autocomplete__item--theme-expanded ","first_theme ","1","smaller_theme_wrapper ","sb-autocomplete__item--newstyle ",'"\n\t\t\tdata-list-item\n\t\t\tdata-i="','"\n\t\t\tdata-value="','"\u003e',"",'\u003cb class="sb-autocomplete__counter"\u003e',"\u003c/b\u003e","+",'\u003cdiv class="',"sb_passion_highlight_wrapper smaller_theme ",'"\u003e\n\t\t\t\t\t\u003cp class="sb_passion_highlight_inner"\u003e\t\t\t\t\t\n\t\t\t\t\t\t\u003ci class="sb_passion_icon dficon-','"\u003e\u003c/i\u003e','\u003cstrong class="sb_passion_highlight_heading"\u003e',"\u003c/strong\u003e","/private/sbox_passion_recommended_by/name","\u003c/p\u003e\n\t\t\t\t\u003c/div\u003e",",&nbsp;",'\u003cdiv class="sb-autocomplete__item--type"\u003e\n\t\t\t\t\t\t\t\t\t\u003cspan class="sb-autocomplete__item--type--label"\u003e',"/private/disambiguation_property/name","/destinationtype/{dest_type}/name","\u003c/span\u003e\n\t\t\t\t\t\t\t\t\u003c/div\u003e","sb-autocomplete__item__highlight--block"," cjk_style","&nbsp;(",")",'\u003cspan class="',"sb-autocomplete__badge sb-autocomplete__badge--popular","/private/search_top_50_badge/name","\u003c/span\u003e","\u003c/div\u003e",'\u003cspan class="sb-autocomplete__item__highlight"\u003e','\u003cspan class="sb-autocomplete__item__extra"\u003e','\u003cspan class="sb-autocomplete__badge sb-autocomplete__badge--cool"\u003e',"/private/search_badge_trending/name",'\u003cspan class="sb-autocomplete__badge sb-autocomplete__badge--popular"\u003e','\u003cspan class="sb-autocomplete__item__extra -straight"\u003e',"/private/search_sbox_note_today/name","/private/search_sbox_note_yesterday/name","/private/search_sbox_note_recent/name","\u003c/li\u003e\n\t",'\n\t\t\u003cli class="sb-autocomplete__google"\u003e\u003c/li\u003e\n\t',"\n"],a=["results","labels","lc","dest_type","flags","is_first_theme","index","value","result_counter","result_type","label_theme","dest_id","bold_start","bold_end","theme_name","label","num_recommendations","nr_dest","text","match","label_blocks","highlighted","label_highlighted","additional_label","is_powered_by_google"],e,d,c;
return function(f){_p=_o;_o="456:134";var g="",h=this.fn;
function i(m){_p=_o;_o="456:135";if(h.MD(a[0])){m+=b[1];
h.MN("index",0);
m+=b[1];
var p=(h.MC(a[0])||[]);
f.unshift(null);
for(var n=1,o=p.length;
n<=o;
n++){f[0]=p[n-1];
m+=b[2];
if(((h.MJ(h.MB(a[1]))&&(h.MJ(/zh|xt|ja|ko/.test(h.MB(a[2])))))&&h.MJ(h.track_experiment_stage("YdVSfPYPaEYZBMURET",1)))){}m+=b[3];
if(((h.MJ(h.MB(a[1]))&&(h.MJ(!/zh|xt|ja|ko/.test(h.MB(a[2])))))&&h.MJ(h.track_experiment_stage("YdVSfPYPaEYZBMURET",2)))){}m+=b[4];
m+=b[5];
if((h.MJ(/zh|xt|ja|ko/.test(h.MB(a[2]))))){m+=b[6]
}if((h.MJ(h.MB(a[3])+""==="airport"))){m+=b[7]
}else{if((h.MJ(h.MB(a[3])+""==="city"))){m+=b[8]
}else{if((h.MJ(h.MB(a[3])+""==="country"))){m+=b[9]
}else{if((h.MJ(h.MB(a[3])+""==="district"))){m+=b[10]
}else{if((h.MJ(h.MB(a[3])+""==="hotel"))){m+=b[11]
}else{if((h.MJ(h.MB(a[3])+""==="landmark"))){m+=b[12]
}else{if((h.MJ(h.MB(a[3])+""==="region"))){m+=b[13]
}else{if((h.MJ(h.MB(a[3])+""==="theme"))){m+=b[14]
}}}}}}}}if(((h.MJ(h.MC(a[4])["history_today"])||h.MJ(h.MC(a[4])["history_yesterday"]))||h.MJ(h.MC(a[4])["history_recent"]))){m+=b[15]
}if((h.MJ(h.MB(a[3])+""==="theme"))){m+=b[16];
if(!(h.MD(a[5]))){m+=b[17];
h.MN(a[5],b[18])
}m+=b[19]
}if((h.MJ(h.MB(a[1]))&&h.MJ(h.track_experiment("YdVSfPYPaEYZBMURET")))){m+=b[20]
}m+=[b[21],h.MC(a[6]),b[22],h.F.entities(h.MC(a[7])),b[23]].join("");
m+=b[24];
if((((h.MJ(h.MB(a[9])+""!=="combined_theme"))&&(h.MJ(h.MB(a[3])+""!=="theme")))&&h.MJ(h.track_experiment("PVdITfNZSTRe")))){m+=b[24];
h.MN(a[8],(h.MI(h.MB(a[8]))+h.MI(1)));
m+=[b[25],h.MC(a[8]),b[26]].join("")
}m+=b[24];
if((h.MJ(h.MB(a[9])+""==="combined_theme"))){m+=[b[27],h.MC(a[10]),b[24]].join("")
}else{if((h.MJ(h.MB(a[3])+""==="theme"))){m+=b[28];
m+=b[29];
m+=[b[30],h.F.entities(h.MC(a[11])),b[31]].join("");
if(h.MJ(h.track_experiment("PVdIOHHABWIccIKDACYO"))){m+=b[24];
h.MN(a[12],b[32]);
m+=b[24];
h.MN(a[13],b[33]);
m+=b[24];
h.MN(a[14],h.F.entities(h.MC(a[15])));
m+=b[24];
h.MN(a[16],h.MC(a[17]));
m+=[b[24],h.ME(b[34],h.MB,h.MN,null),b[24]].join("")
}else{m+=[b[32],h.F.entities(h.MC(a[15])),b[33]].join("")
}m+=b[35]
}else{m+=b[24];
if((h.MJ(h.MB(a[1]))&&h.MJ(h.track_experiment("YdVSfPYPaEYZBMURET")))){m+=b[24];
var l=n;
var j=p;
var k=o;
var p=(h.MC(a[1])||[]);
f.unshift(null);
for(var n=1,o=p.length;
n<=o;
n++){f[0]=p[n-1];
m+=b[24];
if((h.MJ(n>2))){m+=b[36]
}m+=b[24];
if((h.MJ(n==1))){m+=b[24];
if((h.MJ(h.track_experiment("YdVSfPYPaEYZBMURET")==2))){m+=b[37];
if((h.MJ(h.MB(a[3])+""==="hotel"))){m+=[b[24],h.ME(b[38],h.MB,h.MN,null),b[24]].join("")
}else{m+=[b[24],h.F.entities(h.ME(b[39],h.MB,h.MN,null)),b[24]].join("")
}m+=b[40]
}m+=b[28];
m+=b[41];
if((h.MJ(/zh|xt|ja|ko/.test(h.MB(a[2]))))){m+=b[42]
}m+=b[23]
}m+=[b[24],h.F.entities(h.MB(a[18])),b[24]].join("");
if(h.MD(a[19])){m+=[b[43],h.F.entities(h.MB(a[19])),b[44]].join("")
}m+=b[24];
if((h.MJ(n==1))){m+=b[24];
if(h.MJ(h.MG((h.MC(a[4])||{})["popular"]))){m+=b[24];
if(((h.MJ(/zh|xt|ja|ko/.test(h.MB(a[2]))))&&h.MJ(h.track_experiment_stage("PVdIGbGWZSXKbdRNYYdVTbLWZHOaO",1)))){}m+=b[45];
m+=b[46];
if((h.MJ(/zh|xt|ja|ko/.test(h.MB(a[2]))))){m+=b[42]
}m+=[b[23],h.F.entities(h.ME(b[47],h.MB,h.MN,null)),b[48]].join("")
}m+=b[49]
}m+=b[24]
}f.shift();
n=l;
p=j;
o=k;
m+=b[24]
}else{if(h.MD(a[20])){m+=b[24];
var l=n;
var j=p;
var k=o;
var p=(h.MC(a[20])||[]);
f.unshift(null);
for(var n=1,o=p.length;
n<=o;
n++){f[0]=p[n-1];
m+=b[24];
if(h.MD(a[21])){m+=b[50]
}m+=[b[24],h.F.entities(h.MC(a[18])),b[24]].join("");
if(h.MD(a[21])){m+=b[48]
}m+=b[24]
}f.shift();
n=l;
p=j;
o=k;
m+=b[24]
}else{if(h.MD(a[22])){m+=[b[24],h.MC(a[22]),b[24]].join("")
}else{if(h.MD(a[15])){m+=[b[24],h.F.entities(h.MC(a[15])),b[24]].join("")
}}}}m+=b[24];
if(h.MD(a[23])){m+=[b[51],h.MC(a[23]),b[48]].join("")
}m+=b[24];
if(!((h.MJ(h.MB(a[1]))&&h.MJ(h.track_experiment("YdVSfPYPaEYZBMURET"))))){m+=b[24];
if(h.MJ(h.MG((h.MC(a[4])||{})["trending"]))){m+=[b[52],h.F.entities(h.ME(b[53],h.MB,h.MN,null)),b[48]].join("")
}m+=b[24];
if(h.MJ(h.MG((h.MC(a[4])||{})["popular"]))){m+=b[24];
if(((h.MJ(/zh|xt|ja|ko/.test(h.MB(a[2]))))&&h.MJ(h.track_experiment_stage("PVdIGbGWZSXKbdRNYYdVTbLWZHOaO",1)))){}m+=[b[54],h.F.entities(h.ME(b[47],h.MB,h.MN,null)),b[48]].join("")
}m+=b[24];
if(h.MJ(h.MG((h.MC(a[4])||{})["history_today"]))){m+=[b[55],h.F.entities(h.ME(b[56],h.MB,h.MN,null)),b[48]].join("")
}else{if(h.MJ(h.MG((h.MC(a[4])||{})["history_yesterday"]))){m+=[b[55],h.F.entities(h.ME(b[57],h.MB,h.MN,null)),b[48]].join("")
}else{if(h.MJ(h.MG((h.MC(a[4])||{})["history_recent"]))){m+=[b[55],h.F.entities(h.ME(b[58],h.MB,h.MN,null)),b[48]].join("")
}}}m+=b[24]
}m+=b[24]
}}m+=b[24];
h.MN("index",(h.MI(h.MB(a[6]))+h.MI(1)));
m+=b[24];
m+=b[59]
}f.shift();
m+=b[1];
if(h.MD(a[24])){m+=b[60]
}m+=b[61]
}m+=b[61];
return m
}g+=b[0];
g=i(g);
g+=b[61];
return g
}
})());
B.define("component/search/destination/input",function(d,c,e){_p=_o;_o="456:139";var b=d("component/autocomplete-base");
var f=d("search/searchbox/model");
var a=d("search/searchbox/analytics");
e.exports=b.extend({init:function(){_p=_o;_o="456:140";this.optionsSpec={delay:{name:"delay",type:Number,defaultValue:300},modelId:{name:"sb-id",type:String,required:true},filterDestType:{name:"filter-dest-type",type:String},gpf:{name:"gpf",type:Boolean},gpOnly:{name:"gp-only",type:Boolean},minLength:{name:"minlength",type:Number,defaultValue:2},required:{name:"required",type:Boolean},multipleThemes:{name:"multiple-themes",type:Boolean},e_saasb:{name:"esaasb",type:Boolean},e_saas:{name:"esaas",type:Boolean},e_saaac:{name:"esaaac",type:Boolean}};
$.extend(this.optionsSpec,this.extendOptions());
this.$errors=this.$el.find("[data-error-id]");
this.$clear=this.$el.find('[data-clear=""]');
b.prototype.init.apply(this,arguments);
this.model=f.getInstance(this.options.modelId);
this.model.use("destination");
this.model.on("change",this.modelChange.bind(this));
this.model.on("validation",this.modelValidation.bind(this));
if(this.options.required){this.model.destination.configure({validate:true})
}if(this.options.gpOnly){this.model.destination.configurePredictions({gpo:1})
}if(this.options.e_saasb){this.model.destination.configurePredictions({gpab:1})
}if(this.options.e_saas){this.model.destination.configurePredictions({gpa:1})
}if(this.options.gpf){this.model.destination.configure({gpf:1})
}if(this.options.filterDestType){this.model.destination.configurePredictions({dest_type:this.options.filterDestType})
}if(this.$errors.filter(".-visible").length){this.model.destination.valid=false
}if(this.options.multipleThemes){this.model.destination.configurePredictions({multipleThemes:1})
}this.templateResults=B.jstmpl("search_destination_autocomplete_results");
this.toggleClear();
this.modelInit()
},addInputEventListeners:function(){_p=_o;_o="456:142";b.prototype.addInputEventListeners.apply(this,arguments);
if(this.$clear.length){this.$clear.on("click",this.clearClick.bind(this))
}},modelInit:function(){_p=_o;_o="456:144";var g={ss:this.input.value};
this.model.destination.init(g)
},modelChange:function(h){_p=_o;_o="456:146";if(h.group=="destination"){var g=this.model.destination.get();
if(g.ss!=this.input.value){this.setValue(g.ss)
}if(h.onlyCurrentCountry){this.$input.focus();
this.autocomplete()
}}},modelValidation:function(g){_p=_o;_o="456:148";if(g&&g.group=="destination"){this.$errors.filter(".-visible").removeClass("-visible");
if(!this.model.destination.valid){this.$errors.filter('[data-error-id="'+this.model.destination.validationError+'"]').addClass("-visible");
a.send("[error] destination: "+this.model.destination.validationError)
}}},inputInput:function(){_p=_o;_o="456:150";this.model.destination.setSearchString(this.input.value);
b.prototype.inputInput.apply(this,arguments)
},inputFocus:function(){_p=_o;_o="456:152";a.send("[interaction] search input focus");
b.prototype.inputFocus.apply(this,arguments)
},inputBlur:function(){_p=_o;_o="456:154";var g=this.model.destination.get().ss_raw;
if(g){var h=g.split(/\s+/).length;
a.sendOnce("[interaction] autocomplete tokens typed ["+h+"]")
}b.prototype.inputBlur.apply(this,arguments)
},inputEnter:function(){_p=_o;_o="456:156";a.send("[interaction] search input pressed enter");
b.prototype.inputEnter.apply(this,arguments)
},clearClick:function(g){_p=_o;_o="456:158";g.preventDefault();
this.reset({hard:true});
this.input.focus()
},setValue:function(g){_p=_o;_o="456:160";b.prototype.setValue.apply(this,arguments);
this.toggleClear()
},toggleClear:function(){_p=_o;_o="456:162";if(this.$clear.length){this.$clear.toggleClass("-visible",this.input.value!=="")
}},listShow:function(){_p=_o;_o="456:164";if(this.items.length>0&&this.input.value.length>=this.options.minLength){b.prototype.listShow.apply(this,arguments)
}},autocomplete:function(g){_p=_o;_o="456:166";g=g||{};
this.highlightReset({preserveInputValue:true});
clearTimeout(this.timer);
this.model.destination.abortPredictions();
this.toggleClear();
if(!g.fromFocus){if(this.isDeletion){this.model.destination.reset()
}else{this.postAutocomplete()
}if(this.input.value.length>=this.options.minLength){this._loading=true
}this.timer=setTimeout(function(){_p=_o;_o="456:167";if(this.input.value.length>=this.options.minLength){this.model.destination.getPredictions(this.query(),this.render.bind(this))
}}.bind(this),this.options.delay)
}},query:function(){_p=_o;_o="456:170";return this.input.value
},extendOptions:function(){_p=_o;_o="456:172";return{}
},render:function(g,h){_p=_o;_o="456:174";this.results=[];
this.items=[];
this.$items=$({});
this._loading=false;
if(g&&(g.toString()=="service-booking-no-results"||g.toString().indexOf("ZERO_RESULTS")!==-1)){a.send("[context] autocomplete zero results search")
}if(!g&&Array.isArray(h.results)){if(h.results.length>5){B.et.stage("PVdITUbERVUOKe",1)
}a.send("[context] autocomplete suggestions ["+h.results.length+"]");
if(h.is_powered_by_google){a.send("[context] autocomplete google place search")
}this.results=h.results;
this.items=h.results.map(function(i){_p=_o;_o="456:175";return{value:i.label,valueLowerCase:i.label.toLowerCase()}
});
this.$list.html(this.templateResults.render(h));
this.$items=this.$list.find('[data-list-item=""]')
}else{if(!g){this.$list.html(this.templateResults.render(h))
}}this.postAutocomplete()
},choose:function(g){_p=_o;_o="456:178";if(g>=5){B.et.customGoal("PVdITUbERVUOKe",1)
}a.send("[interaction] autocomplete click position ["+g+"]");
a.send("[interaction] autocomplete click ["+this.results[g].dest_type+"]");
B.et.stage("PVdIeHKBTOUEaWRHCUYBC",1);
if(this._loading){B.et.stage("PVdIeHKBTOUEaWRHCUYBC",2)
}if(this.options.e_saaac){clearTimeout(this.timer);
this.model.destination.abortPredictions()
}this.model.destination.set(this.results[g]);
b.prototype.choose.apply(this,arguments);
if(this.results[g].dest_type=="theme"||this.results[g].result_type=="theme_dest"){this.model.submit()
}},reset:function(){_p=_o;_o="456:180";if(!this.selectedValue){this.model.destination.reset()
}b.prototype.reset.apply(this,arguments)
}})
});
B.define("search/destination/model",function(c,b,d){_p=_o;_o="456:183";var a=c("search/destination/service");
function e(f){_p=_o;_o="456:184";this.model=f;
this.data={ss:""};
this.valid=true;
this.validationError="";
this.options={};
this.predicitonParameters={};
this.searchInstance=null
}$.extend(e.prototype,{init:function(f){_p=_o;_o="456:186";this.data=f;
this.emit("init")
},configure:function(f,g){_p=_o;_o="456:188";if(g!==undefined){this.options[f]=g
}else{if(typeof f=="object"){$.extend(this.options,f)
}}},getOption:function(f){_p=_o;_o="456:190";return this.options[f]
},get:function(){_p=_o;_o="456:192";return this.data
},set:function(f){_p=_o;_o="456:194";if(this.searchInstance&&this.searchInstance.getResultDetails&&!f._details){this.searchInstance.getResultDetails(f,function(h,g){_p=_o;_o="456:195";g=g||{};
g._details=true;
this.set(g);
if(window.ga){window.ga("send","event","ac_google_places",[g.place_types||"unknown",g.name].join("|"),this.data.ss_raw,f.position)
}}.bind(this));
return
}this.data.ss=f.ss;
this.data.dest_id=f.dest_id;
this.data.dest_type=f.dest_type;
if(f.place_id&&f.latitude&&f.longitude){this.data.place_id=f.place_id;
this.data.latitude=f.latitude;
this.data.longitude=f.longitude
}else{this.data.place_id="";
this.data.latitude="";
this.data.longitude=""
}if(f._fa){this.model.setFormAction(f._fa)
}f._ef=f._ef||[];
this.data.dest_id&&f._ef.push({name:"dest_id",value:this.data.dest_id});
this.data.dest_type&&f._ef.push({name:"dest_type",value:this.data.dest_type});
this.data.place_id&&f._ef.push({name:"place_id",value:this.data.place_id});
this.data.latitude&&f._ef.push({name:"place_id_lat",value:this.data.latitude});
this.data.longitude&&f._ef.push({name:"place_id_lon",value:this.data.longitude});
this.data.place_types&&f._ef.push({name:"place_types",value:this.data.place_types});
this.model.setFields("destinationNotSelected",[]);
this.model.setFields("destinationSelected",f._ef);
if(f._pd){this.model.use("dates");
this.model.dates.setPresets(f._pd)
}this.emit("change")
},setSearchString:function(f){_p=_o;_o="456:198";this.data.ss=f;
this.data.ss_raw=f;
if(!this.valid){this.validate()
}},reset:function(){_p=_o;_o="456:200";this.data.dest_id=null;
this.data.dest_type=null;
this.data.place_id=null;
this.data.latitude=null;
this.data.longitude=null;
this.model.setFormAction(null);
this.model.setFields("destination",[]);
this.model.setFields("destinationNotSelected",[]);
this.model.setFields("destinationSelected",[{name:"dest_id",value:""},{name:"dest_type",value:""}]);
this.emit("change")
},validate:function(){_p=_o;_o="456:202";var f=true;
var g="";
if(!this.options.validate){this.valid=f;
this.validationError=g;
return f
}if(this.data.ss===""){f=false;
g="search-string-empty"
}if(this.valid!=f){this.valid=f;
this.validationError=g;
this.emit("validation")
}return f
},initPredictions:function(){_p=_o;_o="456:204";if(this.options.gpf){var f=B.require("search/destination/service-atlas");
f.init()
}},configurePredictions:function(f){_p=_o;_o="456:206";$.extend(this.predicitonParameters,f)
},getPredictions:function(h,i){_p=_o;_o="456:208";var g=$.extend({},B.env.search_autocomplete_params,this.predicitonParameters);
if(this.searchInstance){this.searchInstance.abort()
}function f(j,k){_p=_o;_o="456:209";if(k){this.model.setFields("destination",k._ef);
this.model.setFields("destinationNotSelected",k._efd)
}i.apply(null,arguments)
}g.ss=h;
g.gpf=this.options.gpf;
if(this.options.onlyCurrentCountry){g.e_acf_i=B.env.b_country_id;
g.e_acf_t="country"
}this.searchInstance=a.search(g,f.bind(this));
this.model.setFields("destinationOriginal",[{name:"ss_raw",value:g.ss}]);
this.model.setFields("destinationSelected",[])
},abortPredictions:function(){_p=_o;_o="456:212";if(this.searchInstance){this.searchInstance.abort()
}},initOnlyCurrentCountry:function(f){_p=_o;_o="456:214";this.options.onlyCurrentCountry=!!f
},getOnlyCurrentCountry:function(){_p=_o;_o="456:216";return !!this.options.onlyCurrentCountry
},setOnlyCurrentCountry:function(f){_p=_o;_o="456:218";this.options.onlyCurrentCountry=!!f;
this.emit("change",{onlyCurrentCountry:true})
},emit:function(f,g){_p=_o;_o="456:220";g=g||{};
this.model.emit(f,$.extend(g,{group:"destination"}))
}});
d.exports=e
});
B.define("search/destination/service",function(b,d,a){_p=_o;_o="456:223";var k=b("search/destination/service-booking");
var l=b("search/destination/service-atlas");
function h(o,w,u){_p=_o;_o="456:224";var r,t,x;
var m=[];
var n=[];
var q=[];
var s=0;
var v=function(z,A,C){_p=_o;_o="456:225";s++;
if(m.length){if(A){n.push(A)
}else{q[z]=C
}if(s==m.length){if(n.length==m.length){u.call(null,n[0],null)
}else{var y=e(q);
u.call(null,null,y)
}}}};
var p=function(){_p=_o;_o="456:227";for(r=0;
r<m.length;
r++){m[r].abort()
}};
for(r=0;
r<o.length;
r++){t=o[r].search.call(o[r],$.extend({},w),v.bind(null,r));
if(t.getResultDetails){x=t.getResultDetails
}m.push(t)
}return{abort:p,getResultDetails:x}
}function e(p){_p=_o;_o="456:230";var n=6,o=3;
var m={results:[],_ef:[],_efd:[]};
p.forEach(function(q){_p=_o;_o="456:231";if(!q){return
}if(q.results){if(m.results.length){q.results=q.results.filter(i);
q.results.splice(o);
var r=n-q.results.length;
m.results.splice(r);
m.results=m.results.concat(q.results)
}else{m.results=q.results
}}["_ef","_efd"].forEach(function(s){_p=_o;_o="456:232";if(q[s]){m[s]=m[s].concat(q[s].filter(c(m[s])))
}});
m.is_powered_by_google=m.is_powered_by_google||(q.results.length&&q.is_powered_by_google)
});
m.results.forEach(function(q,r){_p=_o;_o="456:235";q._ef=j(q._ef,"ac_position",r)
});
m.city=m.results;
m.__js_upa__=m.is_powered_by_google;
return m
}function c(m){_p=_o;_o="456:238";var n={};
m.forEach(function(o){_p=_o;_o="456:239";n[o.name]=true
});
return function(o){_p=_o;_o="456:241";return !n[o.name]
}
}function j(m,n,o){_p=_o;_o="456:244";m=m.filter(function(p){_p=_o;_o="456:245";return p.name!==n
});
m.push({name:n,value:o});
return m
}function i(m){_p=_o;_o="456:248";return["route","postal_code","street_address"].indexOf(m.place_type)!=-1
}function g(n,m,t){_p=_o;_o="456:250";var o;
var s=[];
var q=[];
var p=function(u,v){_p=_o;_o="456:251";if(s.length){if(u){q.push(u);
if(q.length==s.length){t.call(null,u,v)
}}else{t.call(null,u,v);
for(o=0;
o<s.length;
o++){s[o].abort()
}}}};
var r=function(){_p=_o;_o="456:253";for(o=0;
o<s.length;
o++){s[o].abort()
}};
for(o=0;
o<n.length;
o++){s.push(n[o].search.call(n[o],$.extend({},m),p))
}return{abort:r}
}function f(o,n,t){_p=_o;_o="456:256";var m;
var s={};
var q=function(u,v){_p=_o;_o="456:257";setTimeout(function(){_p=_o;_o="456:258";if(u&&o.length){p()
}else{t.call(null,u,v)
}},0)
};
var p=function(){_p=_o;_o="456:261";var u=o.shift();
m=u.search.call(u,$.extend({},n),q);
s.getResultDetails=m.getResultDetails
};
var r=function(){_p=_o;_o="456:263";if(m){m.abort()
}};
p();
s.abort=r;
return s
}a.exports={search:function(m,n){_p=_o;_o="456:266";if(!m||!m.ss||typeof n!="function"){throw new Error("Invalid arguments")
}if(!m.gpo&&!m.fesp_acf_i&&!m.fesp_acf_i_regions&&!m.fesp_acf_i_cities&&m.gpab&&m.ss.match(/[0-9]/)){B.et.stage("PVdIZNSTcPXe",1);
if(B.env.b_is_bbtool_user){B.et.stage("PVdIZNSTcPXe",2)
}}if(!m.gpo&&!m.fesp_acf_i&&!m.fesp_acf_i_regions&&!m.fesp_acf_i_cities&&m.gpamb&&m.ss.match(/[0-9]/)){B.et.stage("PVBEdIZNSTcPXe",1)
}if(m.gpo){return l.search(m,n)
}else{if(m.fesp_acf_i||m.fesp_acf_i_regions||m.fesp_acf_i_cities){return k.search(m,n)
}else{if(m.gpa&&m.ss.match(/[0-9]/)){return h([k,l],m,n)
}else{if(m.gpr){return g([k,l],m,n)
}else{if(m.gpf){return f([k,l],m,n)
}else{return k.search(m,n)
}}}}}}}
});
B.define("search/destination/service-atlas",function(c,f,a){_p=_o;_o="456:269";var p=c("event-emitter");
var e=B.env.b_map_center_latitude||B.env.b_latitude||undefined;
var k=B.env.b_map_center_longitude||B.env.b_longitude||undefined;
var l=30000;
var n=["ChIJNy0jzGPMUQ4RWpboPw0ztMY","ChIJ2xJC2SwmsUcRBqiHnUEubtY","ChIJT-IyeGHurw0Rx89nUEaYTPM","ChIJk_Swujrurw0R7yS_X2BSuD4"];
var d={administrative_area_level_1:"region",administrative_area_level_2:"region",administrative_area_level_3:"region",administrative_area_level_4:"region",administrative_area_level_5:"region",airport:"airport",country:"country",locality:"city",point_of_interest:"landmark",route:"region",street_address:"region",postal_code:"region",sublocality:"district"};
function i(){_p=_o;_o="456:270";return !!B.atlas
}function j(q,s,t){_p=_o;_o="456:272";var r={city:[]};
r.__upa__=s.filter(m).slice(0,5).map(function(w,v){_p=_o;_o="456:273";w=w.get("data");
var u={upa:true,nr_hotels:0,nr_hotels_25:0,ss_raw:q.ss,dest_id:w.id,place_id:w.id,dest_type:d[w.types&&w.types[0]]||"landmark",place_type:w.types&&w.types[0],ss:w.description,label:w.description,label_blocks:b(w.description,w.matched_substrings),label_highlighted:g(w.description,w.matched_substrings,{encode:q.gpf_encode}),lc:B.env.b_lang,position:v,_ef:[],cjk:(B.env.b_lang==="zh"||B.env.b_lang==="xt"||B.env.b_lang==="ja"||B.env.b_lang==="ko")};
if(q.gpa){u.hotels=0;
u.label_multiline="<span><b>"+u.label+"</b></span>"
}u._ef.push({name:"ac_position",value:v});
return u
});
r.results=r.__upa__;
r._ef=[];
r._ef.push({name:"ac_pageview_id",value:B.env.pageview_id});
r.is_powered_by_google=r.results.length>0;
r.__js_upa__=r.is_powered_by_google;
t(null,r)
}function m(q){_p=_o;_o="456:276";var r=q.get("data");
return n.indexOf(r.id)===-1
}function h(q,r,s){_p=_o;_o="456:278";q=q||{};
q.id=r.id||r.place_id;
q.place_id=q.id;
q.name=r.name||r.formatted_address;
q.latitude=r.geometry.location.lat();
q.longitude=r.geometry.location.lng();
q.place_types=r.types;
q.dest_type=d[r.types&&r.types[0]]||"landmark",q._ef=q._ef||[];
q._ef.push({name:"ss_short",value:r.name});
s(null,q)
}function o(q,r){_p=_o;_o="456:280";if(!q.place_id){r(null,q);
return
}this.atlas.getGeocodeDetails({placeId:q.place_id},function(s){_p=_o;_o="456:281";h(q,s,r)
})
}function g(t,w,s){_p=_o;_o="456:284";var q="";
s=s||{};
if(!w||w.length===0){return t
}var v=w.map(function(x){_p=_o;_o="456:285";return x.offset
});
var r=w.map(function(x){_p=_o;_o="456:287";return x.offset+x.length-1
});
for(var u=0;
u<t.length;
u++){if(v.indexOf(u)!=-1){q+="<b>"
}q+=t.charAt(u);
if(r.indexOf(u)!=-1){q+="</b>"
}}if(s.encode){q=B.jstmpl.fn.FILTERS.entities(q);
q=q.replace(/&lt;b&gt;/g,"<b>");
q=q.replace(/&lt;&#47;b&gt;/g,"</b>")
}return q
}function b(r,s){_p=_o;_o="456:290";var q=[];
if(!s||s.length===0){return[{text:r}]
}s.forEach(function(v,w){_p=_o;_o="456:291";var u=v.offset+v.length,t=((s[w+1]&&s[w+1].offset)||r.length)-u;
q.push({highlighted:true,text:r.substr(v.offset,v.length)});
if(t){q.push({text:r.substr(u,t)})
}});
return q
}a.exports=p.extend({init:function(q,u){_p=_o;_o="456:294";q=q||{};
var r="booking-places";
if(!i()){return
}if(this.initialized){if(u){this.atlas.done(u)
}return
}this.initialized=true;
var t=B.atlas.require("atlas-places");
var s=document.createElement("div");
this.atlas=new t({provider:"provider-places",modules:["autocomplete","places"],options:{domNode:s,channel:r}});
if(u){this.atlas.done(u)
}},search:function(r,w){_p=_o;_o="456:296";if(!r||!r.ss||typeof w!="function"){throw new Error("service-atlas-invalid-arguments")
}if(!i()){setTimeout(function(){_p=_o;_o="456:297";w(new Error("service-atlas-no-atlas"),null)
},4);
return{getDetails:$.noop,abort:$.noop}
}var q=false;
var u={query:r.ss};
if(e&&k&&l){u.lat=e;
u.lon=k;
u.radius=l
}var t=function(x){_p=_o;_o="456:299";if(!q){if(!x||!Array.isArray(x)){w(new Error("service-atlas-invalid-results"),null)
}else{j(r,x,w)
}}};
var s=function(x){_p=_o;_o="456:301";if(!q){w(new Error("service-atlas-error "+x),null)
}};
this.init(r,function(){_p=_o;_o="456:303";this.atlas.autocomplete(u,t,s)
}.bind(this));
var v=function(){_p=_o;_o="456:305";q=true
};
return{getResultDetails:o.bind(this),abort:v}
}})
});
B.define("search/destination/service-booking",function(c,e,a){_p=_o;_o="456:309";var j=c("event-emitter");
var i=c("et");
var g=B.env.autocomplete_use_auth?"/autocomplete_with_auth":"/autocomplete_2";
function d(k){_p=_o;_o="456:310";k.term=k.ss;
delete k.ss;
return k
}function h(l,k,m){_p=_o;_o="456:312";if(!l||!l.city){m(new Error("service-booking-data-invalid"),null)
}else{if(!l.__upa__&&l.city.length===0&&(!l.bbtoollocations||l.bbtoollocations.length===0)&&(!l.theme||l.theme.length===0)){m(new Error("service-booking-no-results"),l)
}else{l.city=l.city.map(function(n,o){_p=_o;_o="456:313";if(!n.label&&n.labels){n.label=f(n.labels)
}if(n.labels&&(n.lc==="zh"||n.lc==="xt"||n.lc==="ja"||n.lc==="ko")){n.label_blocks=b(n.labels)
}n.ss=n.label;
n.label_highlighted=n.label_highlighted||n.label;
n.position=o;
n._ef=n._ef||[];
n._ef.push({name:"ac_position",value:o});
n._ef.push({name:"ac_langcode",value:n.lc});
if(l.__did_you_mean__){n._ef.push({name:"suggested_term",value:l.__did_you_mean__.suggestion});
n._ef.push({name:"suggestion_clicked",value:1})
}return n
});
l.results=l.city;
if(l.bbtoollocations){l.results=l.bbtoollocations.map(function(n,o){_p=_o;_o="456:315";delete n.label_highlighted;
n.label_blocks=[{highlighted:1,text:n.name},{text:", "},{text:n.address}];
n.ss=n.name;
n.latitude=n.place_id_lat;
n.longitude=n.place_id_lon;
n.position=o;
n._ef=n._ef||[];
n._ef.push({name:"bbtoollocation",value:"1"});
return n
}).concat(l.results)
}if(l.theme){l.theme=l.theme.map(function(n,o){_p=_o;_o="456:317";n.ss=n.label;
n._ef=n._ef||[];
n._ef.push({name:"ac_position",value:o+l.city.length});
return n
});
if(l.theme.length&&!k.multipleThemes){l.theme=[l.theme[0]]
}l.results=l.results.concat(l.theme)
}l._ef=l._ef||[];
l._ef.push({name:"ac_pageview_id",value:B.env.pageview_id});
l._ef.push({name:"ac_suggestion_list_length",value:l.city.length});
l._ef.push({name:"ac_suggestion_theme_list_length",value:(l.theme?l.theme.length:0)});
l._efd=l._efd||[];
m(null,l)
}}}function f(k){_p=_o;_o="456:320";return k.map(function(l){_p=_o;_o="456:321";return l.text
}).join(", ")
}function b(l){_p=_o;_o="456:324";var k=[];
l.forEach(function(m,n){_p=_o;_o="456:325";if(n>0){k.push({text:", "})
}k.push({highlighted:!!m.hl,text:m.text})
});
return k
}a.exports=j.extend({search:function(k,o){_p=_o;_o="456:328";if(!k||!k.ss||typeof o!="function"){throw new Error("Invalid arguments")
}var l=d(k);
this.emit("beforeajax",k,l);
if(g=="/autocomplete_2"&&B.et.track("PVdIMEHLNRfYO")){g="/autocomplete_nt"
}var m=$.ajax({type:"get",url:g,data:l,success:function(q,p,r){_p=_o;_o="456:329";this.emit("afterajax",k,q);
h(q,k,o)
}.bind(this),error:function(r,p,q){_p=_o;_o="456:331";if(p!=="abort"){o(new Error("service-booking-error "+q),null)
}}.bind(this)});
var n=function(){_p=_o;_o="456:333";if(m&&m.abort){m.abort()
}};
return{abort:n}
}})
});
B.define("morphdom",function(e,h,d){_p=_o;_o="456:337";var i;
var g=document.body||document.createElement("div");
var c;
if(g.hasAttribute){c=function c(p,o){_p=_o;_o="456:338";return p.hasAttribute(o)
}
}else{c=function c(p,o){_p=_o;_o="456:340";return p.getAttributeNode(o)
}
}function j(q){_p=_o;_o="456:342";for(var p in q){if(q.hasOwnProperty(p)){return false
}}return true
}function f(p){_p=_o;_o="456:344";if(!i&&document.createRange){i=document.createRange();
i.selectNode(document.body)
}var o;
if(i&&i.createContextualFragment){o=i.createContextualFragment(p)
}else{o=document.createElement("body");
o.innerHTML=p
}return o.childNodes[0]
}var b={OPTION:function(p,o){_p=_o;_o="456:346";if((p.selected=o.selected)){p.setAttribute("selected","")
}else{p.removeAttribute("selected","")
}},INPUT:function(p,o){_p=_o;_o="456:348";p.checked=o.checked;
if(p.value!=o.value){p.value=o.value
}if(!c(o,"checked")){p.removeAttribute("checked")
}if(!c(o,"value")){p.removeAttribute("value")
}},TEXTAREA:function(q,o){_p=_o;_o="456:350";var p=o.value;
if(q.value!=p){q.value=p
}if(q.firstChild){q.firstChild.nodeValue=p
}}};
function n(){_p=_o;_o="456:352";}function l(t,s){_p=_o;_o="456:354";var p=s.attributes;
var r;
var o;
var q;
var u;
var v={};
for(r=p.length-1;
r>=0;
r--){o=p[r];
if(o.specified!==false){q=o.name;
u=o.value;
v[q]=true;
if(t.getAttribute(q)!==u){t.setAttribute(q,u)
}}}p=t.attributes;
for(r=p.length-1;
r>=0;
r--){o=p[r];
if(o.specified!==false){q=o.name;
if(!v.hasOwnProperty(q)){t.removeAttribute(q)
}}}}function k(r,q){_p=_o;_o="456:356";var o=r.firstChild;
while(o){var p=o.nextSibling;
q.appendChild(o);
o=p
}return q
}function m(o){_p=_o;_o="456:358";return o.id
}function a(t,D,r){_p=_o;_o="456:360";if(!r){r={}
}if(typeof D==="string"){D=f(D)
}var J={};
var u={};
var H=r.getNodeKey||m;
var L=r.onNodeDiscarded||n;
var x=r.onBeforeMorphEl||n;
var o=r.onBeforeMorphElChildren||n;
var w=r.onBeforeNodeDiscarded||n;
var y=r.childrenOnly===true;
var M=[];
function A(O,Q){_p=_o;_o="456:361";var P=H(O);
if(P){J[P]=O
}else{if(!Q){L(O)
}}if(O.nodeType===1){var N=O.firstChild;
while(N){A(N,Q||P);
N=N.nextSibling
}}}function C(O){_p=_o;_o="456:363";if(O.nodeType===1){var N=O.firstChild;
while(N){if(!H(N)){L(N);
C(N)
}N=N.nextSibling
}}}function F(O,N,P){_p=_o;_o="456:365";if(w(O)===false){return
}N.removeChild(O);
if(P){if(!H(O)){L(O);
C(O)
}}else{A(O)
}}function I(V,R,Z,S){_p=_o;_o="456:367";var aa=H(R);
if(aa){delete J[aa]
}if(!S){if(x(V,R)===false){return
}l(V,R);
if(o(V,R)===false){return
}}if(V.tagName!="TEXTAREA"){var ab=R.firstChild;
var W=V.firstChild;
var ac;
var N;
var Y;
var X;
var T;
outer:while(ab){Y=ab.nextSibling;
ac=H(ab);
while(W){var O=H(W);
N=W.nextSibling;
if(!Z){if(O&&(T=u[O])){T.parentNode.replaceChild(W,T);
I(W,T,Z);
W=N;
continue
}}var P=W.nodeType;
if(P===ab.nodeType){var Q=false;
if(P===1){if(W.tagName===ab.tagName){if(O||ac){if(ac===O){Q=true
}}else{Q=true
}}if(Q){I(W,ab,Z)
}}else{if(P===3){Q=true;
W.nodeValue=ab.nodeValue
}}if(Q){ab=Y;
W=N;
continue outer
}}F(W,V,Z);
W=N
}if(ac){if((X=J[ac])){I(X,ab,true);
ab=X
}else{u[ac]=ab
}}V.appendChild(ab);
if(ab.nodeType===1&&(ac||ab.firstChild)){M.push(ab)
}ab=Y;
W=N
}while(W){N=W.nextSibling;
F(W,V,Z);
W=N
}}var U=b[V.tagName];
if(U){U(V,R)
}}var K=t;
var E=K.nodeType;
var z=D.nodeType;
if(!y){if(E===1){if(z===1){if(t.tagName!==D.tagName){L(t);
K=k(t,document.createElement(D.tagName))
}}else{K=D
}}else{if(E===3){if(z===3){K.nodeValue=D.nodeValue;
return K
}else{K=D
}}}}if(K===D){L(t)
}else{I(K,D,false,y);
var p=function(P){_p=_o;_o="456:369";var N=P.firstChild;
while(N){var Q=N.nextSibling;
var O=H(N);
if(O){var R=J[O];
if(R&&(N.tagName===R.tagName)){N.parentNode.replaceChild(R,N);
I(R,N,true);
N=Q;
if(j(J)){return false
}continue
}}if(N.nodeType===1){p(N)
}N=Q
}};
if(!j(J)){handleMovedElsLoop:while(M.length){var q=M;
M=[];
for(var G=0;
G<q.length;
G++){if(p(q[G])===false){break handleMovedElsLoop
}}}}for(var v in J){if(J.hasOwnProperty(v)){var s=J[v];
L(s);
C(s)
}}}if(!y&&K!==t&&t.parentNode){t.parentNode.replaceChild(K,t)
}return K
}d.exports=a
});
booking.jstmpl("search_dates_dates_los",(function(){_p=_o;_o="456:373";var b=["\n\t",'\n\t\u003cdiv class="sb-dates__los"\u003e\n\t\t\n\t\t',"\n\t\t\t","/private/sbox_num_nights_ar_1/name","\n\t\t","\n\t\t\n\t\t\t","/private/sbox_dates_num_nights_1/name","\n\t\u003c/div\u003e\n","\n"],a=["b_checkin_checkout_interval","b_lang"],e,d,c;
return function(f){_p=_o;_o="456:374";var h="",i=this.fn;
function g(j){_p=_o;_o="456:375";if(i.MJ(i.MC(a[0]))){j+=b[1];
if(((i.MJ(i.MC(a[1])+""==="ar"))&&i.MJ(i.track_experiment("YdAFBbLNUKJKCcHHT")))){j+=[b[2],(f.unshift({num_nights:i.MC(a[0])}),(c=i.ME(b[3],i.MB,i.MN,"b_checkin_checkout_interval")),f.shift(),c),b[4]].join("")
}else{j+=[b[5],(f.unshift({num_nights:i.MC(a[0])}),(c=i.ME(b[6],i.MB,i.MN,"b_checkin_checkout_interval")),f.shift(),c),b[4]].join("")
}j+=b[7]
}return j
}h+=b[0];
h=g(h);
h+=b[8];
return h
}
})());
B.define("calendar-base",function(b,a,c){_p=_o;_o="456:379";function d(e){_p=_o;_o="456:380";e=e||{};
this.startDate=e.startDate;
this.endDate=e.endDate;
this.siblingMonths=e.siblingMonths;
this.weekNumbers=e.weekNumbers;
this.weekStart=e.weekStart;
if(this.weekStart===undefined){this.weekStart=0
}this.date=new Date(1986,9,14,0,0,0)
}d.prototype.getCalendar=function(q,p){_p=_o;_o="456:382";this.date.setUTCFullYear(q);
this.date.setUTCMonth(p);
this.date.setUTCDate(1);
q=this.date.getUTCFullYear();
p=this.date.getUTCMonth();
var m=[],g=this.date.getUTCDay(),e=-(((7-this.weekStart)+g)%7),f=d.daysInMonth(q,p),s=((f-e)%7),n=d.daysInMonth(q,p-1),l=e,r=(f-l)+(s!=0?7-s:0)+e,o,h,u,k=null,j,t;
while(l<r){h=l+1;
o=((l<1?7+l:l)+g)%7;
if(h<1||h>f){if(this.siblingMonths){if(h<1){j=p-1;
t=q;
if(j<0){j=11;
t--
}h=n+h
}else{if(h>f){j=p+1;
t=q;
if(j>11){j=0;
t++
}h=l-f+1
}}u={day:h,weekDay:o,month:j,year:t,siblingMonth:true}
}else{u=false
}}else{u={day:h,weekDay:o,month:p,year:q}
}if(u&&this.weekNumbers){if(k===null){k=d.calculateWeekNumber(u)
}else{if(o==1&&k==52){k=1
}else{if(o==1){k++
}}}u.weekNumber=k
}if(u&&this.startDate){u.selected=this.isDateSelected(u)
}m.push(u);
l++
}return m
};
d.prototype.isDateSelected=function(e){_p=_o;_o="456:384";if(e.year==this.startDate.year&&e.month==this.startDate.month&&e.day==this.startDate.day){return true
}else{if(this.endDate){if(e.year==this.startDate.year&&e.month==this.startDate.month&&e.day<this.startDate.day){return false
}else{if(e.year==this.endDate.year&&e.month==this.endDate.month&&e.day>this.endDate.day){return false
}else{if(e.year==this.startDate.year&&e.month<this.startDate.month){return false
}else{if(e.year==this.endDate.year&&e.month>this.endDate.month){return false
}else{if(e.year<this.startDate.year){return false
}else{if(e.year>this.endDate.year){return false
}}}}}}return true
}}return false
};
d.prototype.setStartDate=function(e){_p=_o;_o="456:386";this.startDate=e
};
d.prototype.setEndDate=function(e){_p=_o;_o="456:388";this.endDate=e
};
d.prototype.setDate=d.prototype.setStartDate;
d.diff=function(h,g){_p=_o;_o="456:390";var f=new Date(1986,9,14,0,0,0),e=new Date(1986,9,14,0,0,0);
f.setUTCFullYear(h.year);
f.setUTCMonth(h.month);
f.setUTCDate(h.day);
e.setUTCFullYear(g.year);
e.setUTCMonth(g.month);
e.setUTCDate(g.day);
return Math.ceil((f.getTime()-e.getTime())/86400000)
};
d.interval=function(f,e){_p=_o;_o="456:392";return Math.abs(d.diff(f,e))+1
};
d.daysInMonth=function(e,f){_p=_o;_o="456:394";return new Date(e,f+1,0).getDate()
};
d.isLeapYear=function(e){_p=_o;_o="456:396";return((e%4==0)&&(e%100!=0))||(e%400==0)
};
d.calculateWeekNumber=function(e){_p=_o;_o="456:398";var g=new Date(1986,9,14,0,0,0);
g.setUTCFullYear(e.year);
g.setUTCMonth(e.month);
g.setUTCDate(e.day);
var f=new Date(g.valueOf());
var h=(g.getUTCDay()+6)%7;
f.setUTCDate(f.getUTCDate()-h+3);
var i=f.valueOf();
f.setUTCMonth(0,1);
if(f.getUTCDay()!=4){f.setUTCMonth(0,1+((4-f.getUTCDay())+7)%7)
}return 1+Math.ceil((i-f)/604800000)
};
c.exports={Calendar:d}
});
B.define("component/search/calendar/calendar",function(d,b,e){_p=_o;_o="456:401";var c=d("component");
var g=d("formatting/date");
var a=d("morphdom");
var f=d("read-data-options");
var h=d("search/searchbox/model");
e.exports=c.extend({init:function(){_p=_o;_o="456:402";this.options=f(this.$el,{modelId:{name:"sb-id",type:String,required:true},mode:{name:"mode",type:String,required:true}});
this.renderEl=this.$el.find('[data-render=""]')[0];
this.model=h.getInstance(this.options.modelId);
this.model.use("dates");
this.model.on("change",this.modelChange.bind(this));
this.model.dates.configure({noValidation:true,allowMaxLos:true});
this.state={};
this.template=B.jstmpl("search_dates_calendar_html");
this.modelInit()
},modelInit:function(){_p=_o;_o="456:404";var j=false;
if(this.options.mode=="check-in"){var i=this.$el.find("[name=checkin_monthday]").val();
var m=this.$el.find("[name=checkin_year_month]").val();
if(i&&m){m=m.split("-");
j=this.model.dates.setDate("check-in",{year:+m[0],month:+m[1]-1,day:+i})
}}else{if(this.options.mode=="check-out"){var k=this.$el.find("[name=checkout_monthday]").val();
var l=this.$el.find("[name=checkout_year_month]").val();
if(k&&l){l=l.split("-");
j=this.model.dates.setDate("check-out",{year:+l[0],month:+l[1]-1,day:+k})
}}}if(!j){this.render()
}},modelChange:function(i){_p=_o;_o="456:406";if(!i||i.group!="dates"){return
}this.render()
},render:function(){_p=_o;_o="456:408";var j=this.model.dates.get();
this.state.fe_mode=this.options.mode;
if(this.options.mode=="check-in"){this.state.fe_date=j.check_in;
this.state.fe_date_formatted=j.check_in?this.formatCheckInCheckOut(j.check_in):"";
this.state.fe_date_day=j.check_in?j.check_in.day:"";
this.state.fe_date_year_month=j.check_in?j.check_in.year+"-"+(j.check_in.month+1):""
}else{if(this.options.mode=="check-out"){this.state.fe_date=j.check_out;
this.state.fe_date_formatted=j.check_out?this.formatCheckInCheckOut(j.check_out):"";
this.state.fe_date_day=j.check_out?j.check_out.day:"";
this.state.fe_date_year_month=j.check_out?j.check_out.year+"-"+(j.check_out.month+1):""
}}this.state.fe_check_in=j.check_in;
this.state.fe_check_out=j.check_out;
var i=this.template.render(this.state).trim();
a(this.renderEl,i)
},formatCheckInCheckOut:function(i){_p=_o;_o="456:410";if(!i){return""
}return g.format(i,"date_with_year")
}})
});
booking.jstmpl("search_dates_calendar_html",(function(){_p=_o;_o="456:413";var b=["\n\t","\u003cdiv data-render\u003e\n\t",'\n\t\t\u003cinput type="hidden" name="checkin_monthday" value="','"\u003e\n\t\t\u003cinput type="hidden" name="checkin_year_month" value="','"\u003e\n\t','\n\t\t\u003cinput type="hidden" name="checkout_monthday" value="','"\u003e\n\t\t\u003cinput type="hidden" name="checkout_year_month" value="',"\n",'\n\t\u003cinput type="hidden" name="checkin_date" value="','"\u003e\n\t\u003cinput type="hidden" name="checkout_date" value="','"\u003e\n','\n\t\u003cdiv class="sb-calendar__dates sb-searchbox__clearfix -interactive -enabled -outside" data-calendar-toggle\u003e\n\t\t',"\n\n",'\n\n\u003ci class="b-sprite sb-calendar_icon"\u003e\u003cspan class="sb-calendar_icon__number'," -empty",'"\u003e','\u003c/span\u003e\u003c/i\u003e\n\n\u003cdiv class="sb-calendar__date',"\n\t\t","/private/sbox_dates_localised/name",'\n\u003c/div\u003e\n\n\u003cdiv class="sb-calendar__los"\u003e\n\t',"/private/search_box_cal_num_nights/name",'\n\u003c/div\u003e\n\n\u003ci class="sb-calendar__close bicon-downchevron"\u003e\u003c/i\u003e\n\u003ci class="sb-calendar__open bicon-upchevron"\u003e\u003c/i\u003e\n',"\n\t\u003c/div\u003e\n\u003c/div\u003e\n"],a=["fe_date_day","fe_date_year_month","fe_mode","b_checkin_date","b_checkout_date","fe_date","fe_has_date","fe_date_formatted","fe_length_of_stay","fe_inside"],e,d,c;
return function(f){_p=_o;_o="456:414";var i="",j=this.fn;
function k(l){_p=_o;_o="456:415";if(((j.MJ(j.MB(a[2]))&&j.MJ(j.MB(a[0])))&&j.MJ(j.MB(a[1])))){l+=b[0];
if((j.MJ(j.MB(a[2])+""==="check-in"))){l+=[b[2],j.MC(a[0]),b[3],j.MC(a[1]),b[4]].join("")
}else{if((j.MJ(j.MB(a[2])+""==="check-out"))){l+=[b[5],j.MC(a[0]),b[6],j.MC(a[1]),b[4]].join("")
}}l+=b[7]
}else{if((j.MJ(j.MC(a[3]))&&j.MJ(j.MC(a[4])))){l+=[b[8],j.MC(a[3]),b[9],j.MC(a[4]),b[10]].join("")
}}l+=b[7];
return l
}function h(l){_p=_o;_o="456:417";j.MN("fe_has_date",((j.MB(a[5])||((j.MJ(j.MB(a[2])+""==="check-in"))&&j.MC(a[3])))||((j.MJ(j.MB(a[2])+""==="check-out"))&&j.MC(a[4]))));
l+=b[12];
if(((j.MJ(j.MB(a[2])+""==="check-in"))&&j.MJ(j.MC(a[3])))){l+=b[0];
j.MN(a[0],j.DATE(j.MC(a[3]),"day_of_month_only","","",""));
l+=b[7]
}else{if(((j.MJ(j.MB(a[2])+""==="check-out"))&&j.MJ(j.MC(a[4])))){l+=b[0];
j.MN(a[0],j.DATE(j.MC(a[4]),"day_of_month_only","","",""));
l+=b[7]
}else{l+=b[0];
j.MN(a[0],(j.MC(a[5])?j.MC(a[5])["day"]:"+"));
l+=b[7]
}}l+=b[13];
if(j.MK(j.MB(a[6]))){l+=b[14]
}l+=[b[15],j.MC(a[0]),b[16]].join("");
if(j.MK(j.MB(a[6]))){l+=b[14]
}l+=b[4];
if(j.MD(a[7])){l+=[b[17],j.MC(a[7]),b[0]].join("")
}else{if(((j.MJ(j.MB(a[2])+""==="check-in"))&&j.MJ(j.MC(a[3])))){l+=[b[17],j.DATE(j.MC(a[3]),"date_with_year","","",""),b[0]].join("")
}else{if(((j.MJ(j.MB(a[2])+""==="check-out"))&&j.MJ(j.MC(a[4])))){l+=[b[17],j.DATE(j.MC(a[4]),"date_with_year","","",""),b[0]].join("")
}else{l+=[b[17],j.ME(b[18],j.MB,j.MN,null),b[0]].join("")
}}}l+=b[19];
if((j.MJ(j.MB(a[9]))&&j.MJ(j.MB(a[8])))){l+=[b[17],(f.unshift({num_nights:j.MB(a[8])}),(c=j.ME(b[20],j.MB,j.MN,"fe_length_of_stay")),f.shift(),c),b[0]].join("")
}l+=b[21];
return l
}function g(l){_p=_o;_o="456:419";l+=b[1];
l=k(l);
l+=b[11];
l=h(l);
l+=b[22];
return l
}i+=b[0];
i=g(i);
i+=b[7];
return i
}
})());
B.define("component/search/dates/dates-los",function(c,a,d){_p=_o;_o="456:423";var f=c("calendar-base").Calendar;
var b=c("component");
var e=c("read-data-options");
var g=c("search/searchbox/model");
d.exports=b.extend({init:function(){_p=_o;_o="456:424";this.options=e(this.$el,{modelId:{name:"sb-id",type:String,required:true}});
this.model=g.getInstance(this.options.modelId);
this.model.use("dates");
this.model.on("change",this.modelChange.bind(this));
this.state={};
this.template=B.jstmpl("search_dates_dates_los")
},modelChange:function(h){_p=_o;_o="456:426";if(!h||h.group!="dates"){return
}this.render()
},render:function(){_p=_o;_o="456:428";var h=this.model.dates.get();
this.state.b_checkin_checkout_interval=h.check_in&&h.check_out&&f.diff(h.check_out,h.check_in)>0?f.interval(h.check_in,h.check_out)-1:"";
this.state.b_lang=B.env.b_lang;
this.$el.html(this.template.render(this.state))
}})
});
B.define("search/dates/model",function(b,a,c){_p=_o;_o="456:431";var f=b("calendar-base").Calendar;
var d=b("formatting/date");
function e(h){_p=_o;_o="456:432";this.model=h;
this.data={check_in:null,check_out:null,presets:[]};
this.valid=true;
this.validationError="";
this.options={maxLos:30,maxMonths:13,syncLegacy:true};
var g=new Date((B.env.b_timestamp-11*3600)*1000);
this.data.today=this.makeDate(g.getUTCFullYear(),g.getUTCMonth(),g.getUTCDate());
this.data.week_start=B.env.sunday_first?0:1;
this.presets={};
if(this.options.syncLegacy){B.eventEmitter.on(B.Search.Events.DATE_CHANGED,this.legacyDateChange.bind(this))
}}$.extend(e.prototype,{init:function(g){_p=_o;_o="456:434";var h=this.validateDate("check-in",g.check_in).valid;
var i=this.validateDate("check-out",g.check_out,{check_in:g.check_in}).valid;
if(h&&i){this.setDate("check-in",g.check_in,{noEvent:true});
this.setDate("check-out",g.check_out,{noEvent:true});
this.emit("init")
}},configure:function(g,h){_p=_o;_o="456:436";if(h!==undefined){this.options[g]=h
}else{if(typeof g=="object"){$.extend(this.options,g)
}}},getOption:function(g){_p=_o;_o="456:438";return this.options[g]
},get:function(){_p=_o;_o="456:440";return this.data
},setDate:function(k,j,i){_p=_o;_o="456:442";i=i||{};
var m,h,g;
var l={};
j=this.makeDate(j);
if(!this.options.noValidation&&!this.validateDate(k,j,{loose:true}).valid){return false
}if(k=="check-in"){this.data.check_in=j;
h=true;
if(this.data.check_out){m=f.diff(this.data.check_out,j);
if(m<=0){this.data.check_out=this.makeDate(j.year,j.month,j.day+1);
g=true
}else{if(!this.options.allowMaxLos&&m>this.options.maxLos){this.data.check_out=this.makeDate(j.year,j.month,j.day+this.options.maxLos);
g=true
}}}else{this.data.check_out=this.makeDate(j.year,j.month,j.day+1);
g=true
}}else{if(k=="check-out"){this.data.check_out=j;
g=true;
if(!this.data.check_in){this.data.check_in=this.makeDate(j.year,j.month,j.day-1);
h=true
}}else{return false
}}if(h){if(this.options.syncLegacy){B.search.setDate_("checkin",this.makeStringFromDate(this.data.check_in),{referrer:"search/dates/model"})
}l.checkIn=true
}if(g){if(this.options.syncLegacy){B.search.setDate_("checkout",this.makeStringFromDate(this.data.check_out),{referrer:"search/dates/model"})
}l.checkOut=true
}if(h||g){this.data.length_of_stay=this.data.check_in&&this.data.check_out&&f.interval(this.data.check_in,this.data.check_out)-1
}if(!i.noEvent){this.emit("change",l)
}return true
},usePreset:function(j){_p=_o;_o="456:444";var g=new Date(B.env.b_timestamp*1000);
var i={year:g.getFullYear(),month:g.getMonth(),day:g.getDate()};
var h=1;
switch(j){case"tonight":break;
case"tomorrow":i.day+=1;
break;
case"3-nights":h=3;
break;
case"5-nights":h=5;
break;
case"7-nights":h=7;
break;
case"weekend":i.day=6-g.getDay()+g.getDate();
h=1;
break;
case"next-weekend":i.day=13-g.getDay()+g.getDate();
h=1;
break;
default:if(!this.presets[j]){return
}i=this.presets[j].check_in;
h=this.presets[j].los;
break
}this.setDate("check-in",this.makeDate(i),{noEvent:true});
this.setDate("check-out",this.makeDate(i.year,i.month,i.day+h))
},setPresets:function(g){_p=_o;_o="456:446";var h;
this.presets={};
this.data.presets=[];
g.forEach(function(i){_p=_o;_o="456:447";var j=Math.random();
this.presets[j]={check_in:i.check_in,los:i.los};
this.data.presets.push({name:i.name,id:j})
}.bind(this));
this.emit("change",{presets:true})
},validate:function(){_p=_o;_o="456:450";var h=true;
var i="";
if(h&&!this.data.check_in&&this.data.check_out){h=false;
i="missing-checkin"
}if(h&&this.data.check_in&&!this.data.check_out){h=false;
i="missing-checkout"
}if(h&&this.data.check_in){var g=this.validateDate("check-in",this.data.check_in);
if(!g.valid){h=g.valid;
i=g.validationError
}}if(h&&this.data.check_out){var g=this.validateDate("check-out",this.data.check_out);
if(!g.valid){h=g.valid;
i=g.validationError
}}if(this.valid!=h){this.valid=h;
this.validationError=i;
this.emit("validation")
}return h
},validateDate:function(i,h,g){_p=_o;_o="456:452";g=g||{};
g.check_in=g.check_in||this.data.check_in;
var j=null;
if(!i||(i!="check-in"&&i!="check-out")){return{valid:false,validationError:"invalid-data"}
}if(!h||h.year===undefined||h.month===undefined||h.day===undefined||isNaN(h.year)||isNaN(h.month)||isNaN(h.day)){return{valid:false,validationError:"invalid-data"}
}if((i=="check-in"&&this.compareDates(h,this.data.today)<0)||(i=="check-out"&&this.compareDates(h,this.data.today)==0)){return{valid:false,validationError:"past"}
}if(i=="check-out"&&g.check_in){j=f.diff(h,g.check_in)
}if(j!==null){if(j==0){return{valid:false,validationError:"more-than-one-day"}
}if(j<0){return{valid:false,validationError:"negative-period"}
}if(j>this.options.maxLos){return{valid:false,validationError:"exceeds-max-los"}
}}return{valid:true,validationError:""}
},legacyDateChange:function(i,j){_p=_o;_o="456:454";var h,g;
if(j.referrer=="search/dates/model"){return
}h=j.type=="checkin"?"check-in":"check-out";
g=this.makeDateFromString(j.value.toString());
this.setDate(h,g)
},makeDate:function(i,k,g){_p=_o;_o="456:456";var h,j;
if(i.year!==undefined&&i.month!==undefined&&i.day!==undefined){h={year:+i.year,month:+i.month,day:+i.day}
}else{h={year:+i,month:+k,day:+g}
}if(h.month<=11&&h.day<=28){return h
}j=new Date(Date.UTC(h.year,h.month,h.day,0,0,0,0));
if(isNaN(j)){throw new Error("dates-model: invalid date")
}return{year:j.getUTCFullYear(),month:j.getUTCMonth(),day:j.getUTCDate()}
},makeDateFromString:function(h){_p=_o;_o="456:458";var g=h.split("-");
return this.makeDate(+g[0],+g[1]-1,+g[2])
},makeStringFromDate:function(i,j,g){_p=_o;_o="456:460";var h=this.makeDate(i,j,g);
return h.year+"-"+(h.month+1)+"-"+h.day
},compareDates:function(h,g){_p=_o;_o="456:462";if(h.year<g.year){return -1
}if(h.year>g.year){return 1
}if(h.month<g.month){return -1
}if(h.month>g.month){return 1
}if(h.day<g.day){return -1
}if(h.day>g.day){return 1
}return 0
},emit:function(g,h){_p=_o;_o="456:464";h=h||{};
this.model.emit(g,$.extend(h,{group:"dates"}))
}});
c.exports=e
});
B.define("component/search/destination/country-only",function(c,a,d){_p=_o;_o="456:467";var b=c("component");
var f=c("search/searchbox/model");
var e=c("read-data-options");
d.exports=b.extend({init:function(){_p=_o;_o="456:468";this.options=e(this.$el,{modelId:{name:"sb-id",type:String,required:true}});
this.model=f.getInstance(this.options.modelId);
this.model.use("destination");
this.model.on("change",this.modelChange.bind(this));
this.$onlyCurrentCountry=this.$el.find("[data-input]");
this.$onlyCurrentCountry.bind("change",this.onlyCurrentCountryChange.bind(this));
this.modelInit()
},modelInit:function(){_p=_o;_o="456:470";var g=this.$onlyCurrentCountry.is(":checked");
this.model.destination.initOnlyCurrentCountry(g)
},modelChange:function(i){_p=_o;_o="456:472";if(!i||!i.onlyCurrentCountry){return
}var g=this.$onlyCurrentCountry.is(":checked"),h=this.model.destination.getOnlyCurrentCountry();
if(g!=h){this.$onlyCurrentCountry.prop("checked",h)
}},onlyCurrentCountryChange:function(){_p=_o;_o="456:474";this.model.destination.setOnlyCurrentCountry(this.$onlyCurrentCountry.is(":checked"))
}})
});
booking.jstmpl("search_group_group_html",(function(){_p=_o;_o="456:477";var b=["\n\t",'\u003cdiv class="sb-searchbox__clearfix" data-render\u003e\n\n\n',"\n","\n\n","\n\n\t","\n\t\t\n\t\t","\n\t\t","\n\t\t\t","\n\n\t\t",'\n\t\t\u003cinput type="hidden" name="room','" value="','"\u003e\n\t\t','\n\n\n\t\u003cdiv class="sb-group__field"\u003e\n\t\t\u003clabel class="sb-searchbox__label sb-group__field__label -inline -small" for="no_rooms"\u003e',"/private/sbox_rooms/name",'\u003c/label\u003e\n\t\t\u003cselect name="no_rooms" id="no_rooms" data-group-rooms-count\u003e\n\t\t\t','\n\t\t\t\t\u003coption value="','" ','selected="selected"',"\u003e","\u003c/option\u003e\n\t\t\t",'\n\t\t\u003c/select\u003e\n\t\u003c/div\u003e\n\n\t\u003cdiv class="sb-group__field"\u003e\n\t\t\u003clabel class="sb-searchbox__label sb-group__field__label -inline -small" for="group_adults"\u003e',"/private/sbox_adults/name",'\u003c/label\u003e\n\t\t\u003cselect name="group_adults" id="group_adults" data-group-adults-count\u003e\n\t\t\t','\n\t\t\u003c/select\u003e\n\t\u003c/div\u003e\n\n\t\u003cdiv class="sb-group__field"\u003e\n\t\t\u003clabel class="sb-searchbox__label sb-group__field__label -inline -small" for="group_children"\u003e',"/private/sbox_children/name",'\u003c/label\u003e\n\t\t\u003cselect name="group_children" id="group_children" data-group-children-count data-component-future="search/group/children-ages-tooltip"\u003e\n\t\t\t',"\n\t\t\u003c/select\u003e\n\t\u003c/div\u003e\n\n\t",'\n\t\t\u003cdiv class="sb-group__children__field"\u003e\n\t\t\t\u003clabel class="sb-searchbox__label -small sb-group__children__label"\u003e',"/private/loc_sbox_children_age_singular/name","/private/loc_sbox_children_age_plural/name","\u003c/label\u003e\n\t\t\t","\n\t\t\t\t",'\n\t\t\t\t\t\u003cselect name="age" data-group-child-age="','"\u003e\n\t\t\t\t\t\t\u003coption value="0"\u003e\u003c/option\u003e\n\t\t\t\t\t\t','\n\t\t\t\t\t\t\t\u003coption value="',"\u003c/option\u003e\n\t\t\t\t\t\t","\n\t\t\t\t\t\u003c/select\u003e\n\t\t\t\t\t","\n\t\t\u003c/div\u003e\n\t","\n\n\u003c/div\u003e"],a=["b_search_config","fe_sb_group_rooms","aux","fe_room_parameter","fe_room_parameter_counter","fe_sb_group_max_rooms","fe_sb_group_rooms_count","fe_sb_group_max_adults","fe_sb_group_adults_count","fe_sb_group_max_children","fe_sb_group_children_count","fe_child_i","fe_sb_group_max_children_age","fe_sb_group_has_children"],e,d,c;
return function(f){_p=_o;_o="456:478";var h="",i=this.fn;
function g(y){_p=_o;_o="456:479";y+=b[1];
i.MN("fe_sb_group_max_rooms",30);
y+=b[2];
i.MN("fe_sb_group_max_adults",30);
y+=b[2];
i.MN("fe_sb_group_max_children",10);
y+=b[2];
i.MN("fe_sb_group_max_children_age",17);
y+=b[3];
i.MN("fe_sb_group_rooms_count",1);
y+=b[2];
i.MN("fe_sb_group_adults_count",2);
y+=b[2];
i.MN("fe_sb_group_children_count",0);
y+=b[3];
if(i.MD(a[0])){y+=b[0];
i.MN("fe_sb_group_rooms_count",i.MC(a[0])["b_nr_rooms_needed"]);
y+=b[0];
i.MN("fe_sb_group_adults_count",i.MC(a[0])["b_adults_total"]);
y+=b[0];
i.MN("fe_sb_group_children_count",i.MC(a[0])["b_children_total"]);
y+=b[4];
i.MN("fe_sb_group_rooms",i.MC(a[0])["b_rooms"]);
y+=b[4];
i.MN("fe_sb_group_has_children",0);
y+=b[0];
i.MN("fe_room_parameter_counter",1);
y+=b[0];
var v=(i.MC(a[1])||[]);
f.unshift({fe_room:null});
for(var u=1,n=v.length,t;
u<=n;
u++){f[0]["fe_room"]=t=v[u-1];
y+=b[5];
i.MN("aux",t.b_children_ages);
y+=b[6];
if((i.MJ(i.MB(a[2]))&&(i.MJ((i.MB(a[2])).length>0)))){y+=b[7];
i.MN("fe_sb_group_has_children",1);
y+=b[6]
}y+=b[8];
i.MN("fe_room_parameter","");
y+=b[6];
var r=u;
var l=v;
var z=n;
var p=o;
var v=(i.seq(1,t.b_adults)||[]);
f.unshift({i:null});
for(var u=1,n=v.length,o;
u<=n;
u++){f[0]["i"]=o=v[u-1];
y+=b[7];
i.MN("fe_room_parameter",((i.MB(a[3])+""+(i.MB(a[3])?",":""))+"A"));
y+=b[6]
}f.shift();
u=r;
v=l;
n=z;
o=p;
y+=b[6];
var r=u;
var l=v;
var z=n;
var k=w;
var v=((t||{})["b_children_ages"]||[]);
f.unshift({fe_child_age:null});
for(var u=1,n=v.length,w;
u<=n;
u++){f[0]["fe_child_age"]=w=v[u-1];
y+=b[7];
i.MN("fe_room_parameter",((i.MB(a[3])+""+(i.MB(a[3])?",":""))+""+(w||"0")));
y+=b[6]
}f.shift();
u=r;
v=l;
n=z;
w=k;
y+=[b[9],i.F.entities(i.MC(a[4])),b[10],i.F.entities(i.MC(a[3])),b[11]].join("");
i.MN("fe_room_parameter_counter",(i.MI(i.MB(a[4]))+i.MI(1)));
y+=b[0]
}f.shift();
y+=b[2]
}y+=[b[12],i.ME(b[13],i.MB,i.MN,null),b[14]].join("");
var v=(i.seq(1,i.MB(a[5]))||[]);
f.unshift({i:null});
for(var u=1,n=v.length,o;
u<=n;
u++){f[0]["i"]=o=v[u-1];
y+=[b[15],i.F.entities(o.value),b[16]].join("");
if((i.MJ(i.MB(a[6])==o.value))){y+=b[17]
}y+=[b[18],o.value,b[19]].join("")
}f.shift();
y+=[b[20],i.ME(b[21],i.MB,i.MN,null),b[22]].join("");
var v=(i.seq(1,i.MB(a[7]))||[]);
f.unshift({i:null});
for(var u=1,n=v.length,o;
u<=n;
u++){f[0]["i"]=o=v[u-1];
y+=[b[15],i.F.entities(o.value),b[16]].join("");
if((i.MJ(i.MB(a[8])==o.value))){y+=b[17]
}y+=[b[18],o.value,b[19]].join("")
}f.shift();
y+=[b[23],i.ME(b[24],i.MB,i.MN,null),b[25]].join("");
var v=(i.seq(0,i.MB(a[9]))||[]);
f.unshift({i:null});
for(var u=1,n=v.length,o;
u<=n;
u++){f[0]["i"]=o=v[u-1];
y+=[b[15],i.F.entities(o.value),b[16]].join("");
if((i.MJ(i.MB(a[10])==o.value))){y+=b[17]
}y+=[b[18],o.value,b[19]].join("")
}f.shift();
y+=b[26];
if(i.MD(a[13])){y+=b[27];
if((i.MJ(i.MB(a[10])==1))){y+=i.ME(b[28],i.MB,i.MN,null)
}else{y+=i.ME(b[29],i.MB,i.MN,null)
}y+=b[30];
i.MN("fe_child_i",0);
y+=b[7];
var v=(i.MC(a[1])||[]);
f.unshift({fe_room:null});
for(var u=1,n=v.length,t;
u<=n;
u++){f[0]["fe_room"]=t=v[u-1];
y+=b[31];
var r=u;
var l=v;
var z=n;
var k=w;
var v=((t||{})["b_children_ages"]||[]);
f.unshift({fe_child_age:null});
for(var u=1,n=v.length,w;
u<=n;
u++){f[0]["fe_child_age"]=w=v[u-1];
y+=[b[32],i.F.entities(i.MC(a[11])),b[33]].join("");
var q=u;
var j=v;
var x=n;
var m=o;
var v=(i.seq(0,i.MB(a[12]))||[]);
f.unshift({i:null});
for(var u=1,n=v.length,o;
u<=n;
u++){f[0]["i"]=o=v[u-1];
y+=[b[34],i.F.entities(o.value),b[16]].join("");
if(((i.MJ(w+""!==""))&&(i.MJ(w==o.value)))){y+=b[17]
}y+=[b[18],o.value,b[35]].join("")
}f.shift();
u=q;
v=j;
n=x;
o=m;
y+=b[36];
i.MN("fe_child_i",(i.MI(i.MB(a[11]))+i.MI(1)));
y+=b[31]
}f.shift();
u=r;
v=l;
n=z;
w=k;
y+=b[7]
}f.shift();
y+=b[37]
}y+=b[38];
return y
}h+=b[0];
h=g(h);
h+=b[2];
return h
}
})());
B.define("component/search/group/group",function(e,c,f){_p=_o;_o="456:483";var d=e("component");
var b=e("morphdom");
var g=e("read-data-options");
var a=e("search-config");
var h=e("search/searchbox/model");
f.exports=d.extend({init:function(){_p=_o;_o="456:484";this.options=g(this.$el,{modelId:{name:"sb-id",type:String,required:true}});
this.model=h.getInstance(this.options.modelId);
this.model.use("group");
this.model.on("change",this.modelChange.bind(this));
a.on("change",this.searchConfigChange.bind(this));
this.$el.on("change",'[data-group-rooms-count=""]',this.groupRoomsChange.bind(this));
this.$el.on("change",'[data-group-adults-count=""]',this.groupAdultsChange.bind(this));
this.$el.on("change",'[data-group-children-count=""]',this.groupChildrenChange.bind(this));
this.$el.on("change","[data-group-child-age]",this.groupChildAgeChange.bind(this));
this.renderEl=this.$el.find('[data-render=""]')[0];
this.template=B.jstmpl("search_group_group_html");
this.modelInit()
},modelInit:function(){_p=_o;_o="456:486";var i={rooms_count:a.rooms?a.rooms.length:1,adults_count:a.adults||2,children_ages:a.childrenAges||[]};
this.model.group.init(i)
},modelChange:function(i){_p=_o;_o="456:488";if(!i||i.group!="group"){return
}this.render()
},searchConfigChange:function(){_p=_o;_o="456:490";this.model.group.set({key:"rooms_count",value:Array.isArray(a.rooms)?a.rooms.length:1});
this.model.group.set({key:"adults_count",value:a.adults});
this.model.group.set({key:"children_count",value:Array.isArray(a.childrenAges)?a.childrenAges.length:1});
Array.isArray(a.childrenAges)&&a.childrenAges.forEach(function(k,j){_p=_o;_o="456:491";this.model.group.set({key:"children_ages",i:j,value:k})
}.bind(this))
},groupRoomsChange:function(j){_p=_o;_o="456:494";var i=$(j.currentTarget);
this.model.group.set({key:"rooms_count",value:i.val()})
},groupAdultsChange:function(j){_p=_o;_o="456:496";var i=$(j.currentTarget);
this.model.group.set({key:"adults_count",value:i.val()})
},groupChildrenChange:function(j){_p=_o;_o="456:498";var i=$(j.currentTarget);
this.model.group.set({key:"children_count",value:i.val()})
},groupChildAgeChange:function(l){_p=_o;_o="456:500";var k=$(l.currentTarget);
var j=k.attr("data-group-child-age");
this.model.group.set({key:"children_ages",i:+j,value:k.val()})
},render:function(){_p=_o;_o="456:502";var j=this.model.group.get();
j={b_search_config:{b_nr_rooms_needed:j.rooms_count,b_adults_total:j.adults_count,b_children_total:j.children_ages.length,b_rooms:[{b_adults:j.adults_count,b_children:j.children_ages.length,b_children_ages:j.children_ages,b_room_order:1}]}};
var i=this.template.render(j).trim();
b(this.renderEl,i)
}})
});
B.define("search/group/model",function(c,a,d){_p=_o;_o="456:505";function b(e){_p=_o;_o="456:506";this.model=e;
this.data={preset:-1};
this.valid=true;
this.validationError="";
this.options={}
}$.extend(b.prototype,{init:function(e){_p=_o;_o="456:508";this.data=e
},configure:function(e,f){_p=_o;_o="456:510";if(f!==undefined){this.options[e]=f
}else{if(typeof e=="object"){$.extend(this.options,e)
}}},get:function(){_p=_o;_o="456:512";return this.data
},set:function(f){_p=_o;_o="456:514";if(!f||!f.key){return false
}if(f.key=="children_count"){if(!this.data.children_ages){this.data.children_ages=[]
}if(f.value==0){this.data.children_ages=[]
}else{if(this.data.children_ages.length<f.value){for(var e=this.data.children_ages.length;
e<f.value;
e++){this.data.children_ages.push("")
}}else{if(this.data.children_ages.length>f.value){this.data.children_ages.splice(f.value)
}}}}else{if(f.hasOwnProperty("i")){if(this.data[f.key]){this.data[f.key][f.i]=f.value
}else{this.data[f.key]=[];
this.data[f.key][f.i]=f.value
}}else{this.data[f.key]=f.value
}}this.emit("change");
return true
},validate:function(){_p=_o;_o="456:516";var e=true;
var f="";
if(this.valid!=e){this.valid=e;
this.validationError=f;
this.emit("validation")
}return e
},emit:function(e,f){_p=_o;_o="456:518";f=f||{};
this.model.emit(e,$.extend(f,{group:"group"}))
}});
d.exports=b
});
B.define("search/searchbox/analytics",function(c,a,d){_p=_o;_o="456:521";var b={};
a.send=function(f,e){_p=_o;_o="456:522";if(!window.ga||!B.et.track("PVSfPATXIebYaO")){return
}window.ga("send","event","Searchbox",B.env.b_action,f,e)
};
a.sendOnce=function(g,f){_p=_o;_o="456:524";var e=g+":"+f;
if(!b[e]){a.send(g,f);
b[e]=true
}}
});
B.define("search/searchbox/model",function(c,b,d){_p=_o;_o="456:527";var e=c("event-emitter");
var f={};
function a(g){_p=_o;_o="456:528";e.extend(this);
this.id=g;
this.formAction;
this.fieldGroups={track:[]};
this.validators=[]
}$.extend(a.prototype,{use:function(j){_p=_o;_o="456:530";if(this[j]){return
}switch(j){case"destination":var h=c("search/destination/model");
this[j]=new h(this);
break;
case"dates":var i=c("search/dates/model");
this[j]=new i(this);
break;
case"group":var g=c("search/group/model");
this[j]=new g(this);
break;
default:return
}if(typeof this[j].validate=="function"){this.validators.push(this[j].validate.bind(this[j]))
}},submit:function(){_p=_o;_o="456:532";this.emit("submit")
},getFormAction:function(){_p=_o;_o="456:534";return this.formAction
},setFormAction:function(g){_p=_o;_o="456:536";this.formAction=g
},getFields:function(){_p=_o;_o="456:538";var g=[];
Object.keys(this.fieldGroups).forEach(function(h){_p=_o;_o="456:539";if(Array.isArray(this.fieldGroups[h])){g=g.concat(this.fieldGroups[h])
}}.bind(this));
return g
},setFields:function(h,g){_p=_o;_o="456:542";this.fieldGroups[h]=g
},validate:function(){_p=_o;_o="456:544";var g=this.validators.filter(function(h){_p=_o;_o="456:545";return h.call()
});
return g.length==this.validators.length
}});
d.exports={getInstance:function(g){_p=_o;_o="456:548";if(!f[g]){f[g]=new a(g)
}return f[g]
}}
});
B.define("component/search/searchbox/searchbox",function(d,b,e){_p=_o;_o="456:551";var c=d("component");
var h=d("search/searchbox/model");
var g=B.require("search/destination/service-booking");
var f=d("read-data-options");
var a=["country","dest_id","dest_type","district","iata","landmark","latitude","longitude","place_id","place_id_lat","place_id_lon","region"];
e.exports=c.extend({init:function(){_p=_o;_o="456:552";this.hiddenFields=[];
this.options=f(this.$el,{modelId:{name:"sb-id",type:String,required:true}});
this.model=h.getInstance(this.options.modelId);
this.model.on("init",this.modelChange.bind(this));
this.model.on("change",this.modelChange.bind(this));
this.model.on("submit",this.modelSubmit.bind(this));
this.$form=this.$el.is("form")?this.$el:this.$el.find("form:eq(0)");
this.$form.submit(this.formSubmit.bind(this));
this.originalAction=this.$form.attr("action");
this.initCurrentCountryField();
g.on("beforeajax",function(i,j){_p=_o;_o="456:553";B.eventEmitter.trigger("AUTOCOMPLETE:beforeAjax",{params:j})
});
g.on("afterajax",function(i,j){_p=_o;_o="456:555";B.eventEmitter.trigger("AUTOCOMPLETE:afterAjax",{data:j})
})
},modelChange:function(){_p=_o;_o="456:558";this.updateHiddenFields()
},modelSubmit:function(){_p=_o;_o="456:560";this.$form.submit()
},initCurrentCountryField:function(){_p=_o;_o="456:562";var i=false;
this.$onlyCurrentCountry=this.$form.find("#limit-search-area");
if(this.$onlyCurrentCountry.length){i=this.$onlyCurrentCountry.is(":checked");
this.$onlyCurrentCountry.bind("change",this.onlyCurrentCountryChange.bind(this));
this.model.use("destination");
this.model.destination.initOnlyCurrentCountry(i)
}},onlyCurrentCountryChange:function(){_p=_o;_o="456:564";this.model.use("destination");
this.model.destination.setOnlyCurrentCountry(this.$onlyCurrentCountry.is(":checked"))
},updateHiddenFields:function(){_p=_o;_o="456:566";var j=this.model.getFormAction();
var l=this.$form.attr("action");
if(!j){j=this.originalAction
}if(l!=j){this.$form.attr("action",j)
}if(this.hiddenFields){this.hiddenFields.forEach(function(n){_p=_o;_o="456:567";n.$node.remove();
n.$node=null
})
}var m=this.model.getFields();
this.hiddenFields=[];
var k=[];
var i=false;
m.forEach(function(n){_p=_o;_o="456:569";this.hiddenFields.push({name:n.name,value:n.value});
k.push(n.name);
if(a.indexOf(n.name)!=-1){i=true
}}.bind(this));
this.$form.find("input").filter(function(){_p=_o;_o="456:571";return(i&&a.indexOf(this.name)!=-1)||k.indexOf(this.name)!=-1
}).remove();
this.hiddenFields.forEach(function(n){_p=_o;_o="456:573";var o=$("<input>");
o.attr("type","hidden");
o.attr("name",n.name);
o.attr("value",n.value);
n.$node=o;
this.$form.append(o)
}.bind(this))
},formSubmit:function(j){_p=_o;_o="456:576";var i=this.model.validate();
if(!i){j.preventDefault();
return
}}})
});
(function(a,b){_p=_o;_o="456:579";a(function(){_p=_o;_o="456:580";a(".ge-search-first-checkbox").change(function(){_p=_o;_o="456:581";var f="cQZJZadTQZGSRaPSWe";
var c=a(".b-searchbox-button-want-genius");
var d=booking.track.getVariant(f);
if(d===false){return
}if(d==1){var e=c.attr("data-genius-text");
var g=c.attr("data-original-text");
if(e&&g){c.find("span").html(this.checked?e:g).end()[this.checked?"addClass":"removeClass"]("b-searchbox-button-want-genius-toggled")
}}if(this.checked){booking.track.stage(f,1)
}})
})
})(jQuery,booking);
B.define("component/search/group/children-ages-tooltip",function(c,a,d){_p=_o;_o="456:585";var e=c("jstmpl");
var b=c("component");
d.exports=b.extend({init:function(){_p=_o;_o="456:586";this.dropdown=false;
this.$form=$("#frm");
this.isPopupAlreadyShown=false;
this.agesSelector='[name="age"]';
this.addEventListeners()
},addEventListeners:function(){_p=_o;_o="456:588";this.$el.change(this.showTooltip.bind(this));
this.$form.delegate(this.agesSelector,"click",this.hideTooltip.bind(this))
},showTooltip:function(g){_p=_o;_o="456:590";var f=parseInt(this.$el.val())>0;
if(f&&!this.isPopupAlreadyShown){setTimeout(function(){_p=_o;_o="456:591";this.dropdown=$.fly.dropdown.extend({defaults:{position:"bottom left",content:function(){_p=_o;_o="456:592";return e("searchbox_children_ages_tooltip").render({})
},extraClass:"searchbox_children_ages_tooltip"}}).create("#frm "+this.agesSelector);
this.dropdown.show();
this.isPopupAlreadyShown=true
}.bind(this),0)
}},hideTooltip:function(f){_p=_o;_o="456:596";if(this.dropdown){this.dropdown.hide();
this.dropdown.destroy()
}}})
});