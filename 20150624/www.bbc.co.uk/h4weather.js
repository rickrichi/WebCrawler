require(["h4base","h4weather/weather"],function(b,c){if(!b.isJavascriptEnabled()){return}var a=function(){c.init()};require(["domReady"],function(d){d(a)})});