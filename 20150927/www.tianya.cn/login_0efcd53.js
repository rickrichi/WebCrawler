!function(t){function n(n){t.ajax({url:n,cache:!0,dataType:"script",scriptCharset:"utf-8"})}function e(){var t=Math.random();n("http://passport.tianya.cn/online/registers.jsp?rd="+t),n("http://passport.tianya.cn/online/onlineusers.jsp?rd="+t),n("http://passport.tianya.cn/online/checkuseronline.jsp?callback=online&rd="+t)}function o(){var n="http://passport.tianya.cn/trackapi/sid.do?f=www";d||t.getScript(n,function(){"undefind"!=typeof sid&&(d=sid,t("#__sid").val(d))})}function r(){function n(){t.getScript("http://passport.tianya.cn/loginapi/qrload.do?var=qrCode",function(){qrCode&&qrCode.qrUrl&&qrCode.loadUrl&&qrCode.params&&(t("#tips").remove(),t(".qr-code").attr("src","http:"+qrCode.qrUrl+qrCode.params),t("#qrcode,.qrcode-scan").show());var n=this,e='<div class="tips" id="tips">									<i class="icon icon-tips"></i>									<div class="inner">										<h4></h4>										<p></p>									</div>								   </div>',o=function(){var o="http:"+qrCode.loadUrl+qrCode.params+"&var=result&";t.getScript(o,function(){1===result.success?(clearInterval(n.timer),window.location.href="http://www.tianya.cn/"+result.userId):0===result.success&&(clearInterval(n.timer),t("#qrcode").append(e),t("#tips").find("h4").html("äºç»´ç å¤±æ"),t("#tips").find("p").html('<a id="refrashQrcode" href="javascript:">å·æ°é¡µé¢æç¹å»é¾æ¥éæ°è·å</a>'))})};n.timer=window.setInterval(function(){o()},3e3),t("#qrcode,.qrcode-scan").hover(function(){},function(){t("#qrcode,.qrcode-scan").hide(),clearInterval(n.timer)})}),t("#refrashQrcode").live("click",function(){n()})}function e(){d.show()}function r(){d.hide()}t("#changeId").click(function(){s.show(),c.hide(),o(),t("#password1").hide(),t("[name='vpassword']").show(),t(".unlogin .text-ipt").css("width","180px"),"8.0"==t.browser.version&&(t("#password1").css("line-height","28px"),t(".unlogin .text-ipt").css("line-height","28px"))});var i=t("#clueto");t("#remindMe").hover(function(){i.show()},function(){i.hide()}),t(".qcode").hover(function(){n()},function(){t("#qrcode").hide()}),t("#qrcode,qrcode-scan").hover(function(){t("#qrcode,.qrcode-scan").show()},function(){t("#qrcode,.qrcode-scan").hide()});var a=t("#selectedSpan"),d=t("#optionsUl"),l=d.find("a"),p=t("#method");a.hover(e,r),d.hover(e,r),l.click(function(n){var e=t(n.srcElement||n.target);return val=e.attr("_value"),val&&(r(),a.html(e.html()),p.val(val)),!1}),t("#text1,#password1").hover(function(){this.style.backgroundColor="#E5F0FF"},function(){this.style.backgroundColor="#ffffff"});var u=t("#text1"),h=t("#password1"),f="https://passport.tianya.cn/login?from=index&_goto=login&returnURL=http://www.tianya.cn",w=t("#login");t("#button1").click(function(){return""==u.val()?(u.focus(),!1):""==h.val()?(h.focus(),!1):(w.attr({action:f}),void w.submit())}),t("#login").keydown(function(t){var t=t||event,n=t.which||t.keyCode;13==n&&(w.attr({action:f}),w.submit())}),t("#register_btn").click(function(){window.open("http://passport.tianya.cn/register/default.jsp?sourceURL="+encodeURIComponent("http://www.tianya.cn")+"&from=index&_goto=register")})}function i(){n("http://static.tianyaui.com/global/ty/stat/stat_20080313.js"),n("http://hm.baidu.com/h.js?80579b57bf1b16bdf88364b13221a8bd")}function a(){var n=new Date;n<=new Date(2015,0,4,0,0)&&(t("body").addClass("adv-bg"),t('<a href="http://www.tianya.cn/zt/20150101/m.html" target="_blank" class="adv-link"></a>').insertAfter(".wrap"))}var s=t("#pws_yes"),c=t("#wcback"),d=null;!t.browser.msie||"7.0"!=t.browser.version&&"8.0"!=t.browser.version&&"9.0"!=t.browser.version&&"6.0"!=t.browser.version||t("input, textarea").placeholder(),"8.0"==t.browser.version&&(t(".unlogin FORM").css("line-height","25px"),t("#password1").css("line-height","26px")),window.online=function(n,e){window.online=function(){},n?(t("#mytianya").attr("href","http://www.tianya.cn/"+__global.getUserId()),t("#strWriter").text(e),c.show()):(s.show(),o(),t("#text1").focus())},setTimeout(function(){window.online()},4e3),e(),r(),i(),a(),t("body").ready(function(){setTimeout(function(){jQuery.browser.msie&&jQuery.browser.version<7&&t.getScript("http://static.tianyaui.com/global/member/web/static/js/ieUpdate.js")},0)}),TY.loader("TY.util.userActionRl",function(){})}(TY);