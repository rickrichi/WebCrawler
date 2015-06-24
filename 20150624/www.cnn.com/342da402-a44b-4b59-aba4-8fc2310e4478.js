// Copyright 2006-2015 ClickTale Ltd., US Patent Pending
// Generated on: 6/18/2015 10:46:14 AM (UTC 6/18/2015 3:46:14 PM)

if (typeof(ct_dispatcher) == 'undefined')
{
	ct_dispatcher = {
		configName : null,
		cookieName : "ct_configName",
		getParameterByName : function (name)
		{
			 name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			 var regexS = "[\\?&]" + name + "=([^&#]*)";
			 var regex = new RegExp(regexS, "i");
			 var results = regex.exec(window.location.search);
			 if(results == null)
			   return "";
			 else
			   return decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		createCookie: function (name,value,days) 
		{
			if (days) 
			{
				var date = new Date();
				date.setTime(date.getTime( )+( days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString( );
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		},
		readCookie : function (name) 
		{
			var nameEQ = name + "=";
			var ca = document.cookie.split( ';');
			for( var i=0;i < ca.length;i++) 
			{
				var c = ca[i];
				while ( c.charAt( 0)==' ') c = c.substring( 1,c.length);
				if ( c.indexOf( nameEQ) == 0) return c.substring( nameEQ.length,c.length);
			}
			return null;
		}
	};
		
	// Read from querystring
	var ct_pdc_qs_val = ct_dispatcher.getParameterByName(ct_dispatcher.cookieName);
	if (ct_pdc_qs_val)
	{
		// Override/create cookie
		ct_dispatcher.createCookie(ct_dispatcher.cookieName, ct_pdc_qs_val, 14);
		ct_dispatcher.configName = ct_pdc_qs_val;
	}
	else
	{
		// Read from cookie
		ct_dispatcher.configName = ct_dispatcher.readCookie(ct_dispatcher.cookieName);
	}

	
}

	if (typeof (ClickTaleCreateDOMElement) != "function")
{
	ClickTaleCreateDOMElement = function(tagName)
	{
		if (document.createElementNS)
		{
			return document.createElementNS('http://www.w3.org/1999/xhtml', tagName);
		}
		return document.createElement(tagName);
	}
}

if (typeof (ClickTaleAppendInHead) != "function")
{
	ClickTaleAppendInHead = function(element)
	{
		var parent = document.getElementsByTagName('head').item(0) || document.documentElement;
		parent.appendChild(element);
	}
}

if (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != "function")
{
	ClickTaleXHTMLCompliantScriptTagCreate = function(code)
	{
		var script = ClickTaleCreateDOMElement('script');
		script.setAttribute("type", "text/javascript");
		script.text = code;
		return script;
	}
}	
		var configFoundPTC = false;
	
if (ct_dispatcher.configName == 'Release_21042015')
{
	configFoundPTC = true;
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2015 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 49\r\n\/\/ WR destination: www04\r\n\/\/ WR version: 14.21\r\n\/\/ Recording ratio: 0.005\r\n\/\/ Generated on: 6\/18\/2015 10:46:14 AM (UTC 6\/18\/2015 3:46:14 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_21042015\u0026Version=20\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_21042015\u0026Version=20\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleCookieDomain = \"cnn.com\";\r\nvar ct_Date = (new Date()).toISOString().slice(0, 10).replace(\/-\/g, \u0027\u0027);\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\n\r\nClickTaleSettings.Transport = {\r\n\tLegacy: false\r\n};\r\nClickTaleSettings.Compression = {\r\n\tMethod: function () { return \"deflate\"; }\r\n};\r\nClickTaleSettings.RewriteRules = {\r\n\tOnBeforeRewrite: function (rewriteApi) {\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t    pattern: new RegExp(\u0027(href=\")(\/\\..*?\\.css)\u0027, \u0027gim\u0027),\r\n\t\t    replace: \"$1http:\/\/dummytest.clicktale-samples.com\/CNN\/\" + ct_Date + \"$2\"\r\n\t\t});\r\n\t}\r\n}\r\nClickTaleSettings.ctIsTrans = true;\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=49, \r\n\t\tRatio=0.005, \r\n\t\tPartitionPrefix=\"www04\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive === \u0027function\u0027) {\r\n    ClickTaleSetAllSensitive();\r\n}\r\n\r\nvar ct_UA = ClickTaleDetectAgent();\r\nif ((ct_UA.m \u0026\u0026 ct_UA.Sa != ct_UA.t) || (!ct_UA.m \u0026\u0026 ct_UA.Ch != ct_UA.t )) {\r\n    return;\r\n}\r\n\r\n\r\n\r\n\r\nif (typeof ClickTaleUploadPage === \u0027function\u0027 \u0026\u0026 ClickTaleSettings.ctIsTrans) {\r\n\t\r\n  \tClickTaleUploadPage();\r\n\r\n}\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe21.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe21.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}
			
	
if (ct_dispatcher.configName == 'Release_19052015')
{
	configFoundPTC = true;
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2015 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 49\r\n\/\/ WR destination: www04\r\n\/\/ WR version: 14.21\r\n\/\/ Recording ratio: 0.005\r\n\/\/ Generated on: 6\/18\/2015 10:46:14 AM (UTC 6\/18\/2015 3:46:14 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_19052015\u0026Version=2\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_19052015\u0026Version=2\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleCookieDomain = \"cnn.com\";\r\nvar ct_Date = (new Date()).toISOString().slice(0, 10).replace(\/-\/g, \u0027\u0027);\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\n\r\nClickTaleSettings.Transport = {\r\n\tLegacy: false\r\n};\r\nClickTaleSettings.Compression = {\r\n\tMethod: function () { return \"deflate\"; }\r\n};\r\nClickTaleSettings.RewriteRules = {\r\n\tOnBeforeRewrite: function (rewriteApi) {\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t    pattern: new RegExp(\u0027(href=\")(\/\\..*?\\.css)\u0027, \u0027gim\u0027),\r\n\t\t    replace: \"$1http:\/\/dummytest.clicktale-samples.com\/CNN\/\" + ct_Date + \"$2\"\r\n\t\t});\r\n\t}\r\n}\r\nClickTaleSettings.ctIsTrans = true;\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=49, \r\n\t\tRatio=0.005, \r\n\t\tPartitionPrefix=\"www04\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive === \u0027function\u0027) {\r\n    ClickTaleSetAllSensitive();\r\n}\r\n\r\nvar ct_UA = ClickTaleDetectAgent();\r\nif ((ct_UA.m \u0026\u0026 ct_UA.Sa != ct_UA.t) || (!ct_UA.m \u0026\u0026 ct_UA.Ch != ct_UA.t )) {\r\n    return;\r\n}\r\n\r\n\r\n\r\n\r\nif (typeof ClickTaleUploadPage === \u0027function\u0027 \u0026\u0026 ClickTaleSettings.ctIsTrans) {\r\n\t\r\n  \tvar up_Counter = 0;\r\n\r\n\tfunction uploadDelay() {\r\n\t\tvar countInterVal = 0;\r\n\t\tvar wrDelay = setInterval(function () {\r\n\t\t\tif (jQuery(\u0027[id^=\"ad_rect\"]\u0027).length \u003c= jQuery(\u0027[id^=\"ad_rect\"] iframe\u0027).length) {\r\n\t\t\t\tclearInterval(wrDelay);\r\n\t\t\t\twindow.ClickTaleIncludedOnWindowLoad  = true;\r\n\t\t\t\twindow.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\t\tClickTaleUploadPage();\r\n\t\t\t\twindow.ClickTaleSSL = 1;\r\n\t\t\t\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\telse if (countInterVal \u003e 20) {\r\n\t\t\t\tclearInterval(wrDelay);\r\n\t\t\t\twindow.ClickTaleIncludedOnWindowLoad  = true;\r\n\t\t\t\twindow.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\t\tClickTaleUploadPage();\r\n\t\t\t\twindow.ClickTaleSSL = 1;\r\n\t\t\t\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tcountInterVal++;\r\n\t\t}, 500);\r\n\t}\r\n\r\n\t\/\/CNNF-18\r\n\tif ((typeof jQuery == \u0027function\u0027) \u0026\u0026 (jQuery(\u0027[id^=\"ad_rect\"]\u0027).length)) {\r\n\t\tif(typeof uploadDelay == \u0027function\u0027){\r\n\t\t\tuploadDelay();\r\n\t\t\treturn;\r\n\t\t}\r\n\t}\r\n\telse {\r\n\t\tClickTaleUploadPage();\r\n\t}\r\n\r\n}\r\n\r\n\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe21.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe21.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}
			
	
if (ct_dispatcher.configName == 'Release_21052015')
{
	configFoundPTC = true;
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2015 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 49\r\n\/\/ WR destination: www04\r\n\/\/ WR version: 14.21\r\n\/\/ Recording ratio: 0.005\r\n\/\/ Generated on: 6\/18\/2015 10:46:14 AM (UTC 6\/18\/2015 3:46:14 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_21052015\u0026Version=1\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_21052015\u0026Version=1\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nvar ct_Date = (new Date()).toISOString().slice(0, 10).replace(\/-\/g, \u0027\u0027);\r\nwindow.ClickTaleIncludedOnDOMReady = true;\r\nwindow.bEnableChangeMonitor = false;\r\nwindow.UseTransport = true;\r\nwindow.ClickTaleCookieDomain = \"cnn.com\"\r\n\r\nwindow.ClickTaleSettings.CheckAgentSupport = function (f, v) {\r\n    if (v.t == v.IE \u0026\u0026 v.v \u003c= 8) {\r\n        return false;\r\n    }\r\n    else {\r\n        if (!(v.m || v.t == v.IE \u0026\u0026 v.v \u003c= 10)) {\r\n           window.bEnableChangeMonitor = true;\r\n\t\t\tEnableTransport();\r\n        }\r\n        return f(v);\r\n    }\r\n}\r\n\r\nfunction EnableTransport() {\r\n\r\n\tif (window.bEnableChangeMonitor){\r\n\t\twindow.ClickTaleSettings.XHRWrapper = {\r\n\t\t\tEnable: false\r\n\t\t};\r\n\t\r\n        var script = document.createElement(\"SCRIPT\");\r\n        script.src = (document.location.protocol === \"https:\" ? \"https:\/\/cdnssl.\" : \"http:\/\/cdn.\")+\"clicktale.net\/www\/ChangeMonitor-latest.js\";\r\n        document.body.appendChild(script);\r\n\r\n        window.ClickTaleSettings.ChangeMonitor = {\r\n            Enable: true,\r\n\t\t\tLiveExclude : true,\r\n\t\t\tAddressingMode: \"id\",\r\n            OnReadyHandler: function (changeMonitor) {\r\n                changeMonitor.observe();\r\n\t\t\t},\r\n            OnBeforeReadyHandler: function (settings) {\r\n                settings.Enable = window.ClickTaleGetUID ? !!ClickTaleGetUID() : false;\r\n                return settings;\r\n            },\r\n\t\t\tFilters: {\r\n\t\t\t\t\tMaxBufferSize: 300000,\r\n\t\t\t\t\tMaxElementCount: 3000\r\n\t\t\t}\r\n        }\r\n\t}\r\n}\r\n\r\nwindow.ClickTaleSettings.Compression = {\r\n\tMethod: function () {\r\n\t\treturn \"deflate\";\r\n\t}\r\n};\r\n\r\nwindow.ClickTaleSettings.Transport = {\r\n\tLegacy: false,\r\n\tMaxConcurrentRequests: 5\r\n};\r\n\r\nwindow.ClickTaleSettings.RewriteRules = {\r\n\tOnBeforeRewrite: function (rewriteApi) {\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t    pattern: new RegExp(\u0027(href=\")(\/\\..*?\\.css)\u0027, \u0027gim\u0027),\r\n\t\t    replace: \"$1http:\/\/dummytest.clicktale-samples.com\/CNN\/\" + ct_Date + \"$2\"\r\n\t\t});\r\n\t}\r\n}\r\n\r\nfunction getURLParam( name ) {\r\n\tvar url = window.location.href;\r\n\tvar query_string = url.split(\"?\");\r\n\tvar params = query_string[1].split(\"\u0026\");\r\n\r\n\tvar i = 0;\r\n\twhile (i \u003c params.length) {\r\n\t\tvar param_item = params[i].split(\"=\");\r\n\t\tif (param_item[0] == name) {\r\n\t\t\treturn param_item[1];\r\n\t\t}\r\n\t\ti++;\r\n\t}\r\n\treturn \"\";\r\n}\r\n\r\nif (window.location.search){\t\t\r\n\tvar recordingTime = getURLParam(\"MaxRecordingTime\");\r\n\tif(recordingTime!=\"\"){\r\n\t\twindow.ClickTaleSettings.RecordingTime = { \r\n\t\t\tMaxRecordingTime: parseInt(recordingTime) \r\n\t\t};\r\n\t};\r\n}\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=49, \r\n\t\tRatio=0.005, \r\n\t\tPartitionPrefix=\"www04\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive === \u0027function\u0027) {\r\n    ClickTaleSetAllSensitive();\r\n}\r\n\r\nvar ct_UA = ClickTaleDetectAgent();\r\nif ((ct_UA.m \u0026\u0026 ct_UA.Sa != ct_UA.t) || (!ct_UA.m \u0026\u0026 ct_UA.Ch != ct_UA.t )) {\r\n    return;\r\n}\r\n\r\n\r\n\r\n\r\nif (typeof ClickTaleUploadPage === \u0027function\u0027 \u0026\u0026 window.UseTransport) {\r\n\t\r\n  \tvar up_Counter = 0;\r\n\r\n\tfunction uploadDelay() {\r\n\t\tvar countInterVal = 0;\r\n\t\tvar wrDelay = setInterval(function () {\r\n\t\t\tif (jQuery(\u0027[id^=\"ad_rect\"]\u0027).length \u003c= jQuery(\u0027[id^=\"ad_rect\"] iframe\u0027).length) {\r\n\t\t\t\tclearInterval(wrDelay);\r\n\t\t\t\twindow.ClickTaleIncludedOnWindowLoad  = true;\r\n\t\t\t\twindow.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\t\tClickTaleUploadPage();\r\n\t\t\t\twindow.ClickTaleSSL = 1;\r\n\t\t\t\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\telse if (countInterVal \u003e 20) {\r\n\t\t\t\tclearInterval(wrDelay);\r\n\t\t\t\twindow.ClickTaleIncludedOnWindowLoad  = true;\r\n\t\t\t\twindow.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\t\tClickTaleUploadPage();\r\n\t\t\t\twindow.ClickTaleSSL = 1;\r\n\t\t\t\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tcountInterVal++;\r\n\t\t}, 500);\r\n\t}\r\n\r\n\t\/\/CNNF-18\r\n\tif ((typeof jQuery == \u0027function\u0027) \u0026\u0026 (jQuery(\u0027[id^=\"ad_rect\"]\u0027).length)) {\r\n\t\tif(typeof uploadDelay == \u0027function\u0027){\r\n\t\t\tuploadDelay();\r\n\t\t\treturn;\r\n\t\t}\r\n\t}\r\n\telse {\r\n\t\tClickTaleUploadPage();\r\n\t}\r\n\r\n}\r\n\r\n\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe21.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe21.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}
			
	

	// Default configuration
if (!configFoundPTC)
{
			(function(){
	var script = ClickTaleXHTMLCompliantScriptTagCreate("\/\/ Copyright 2006-2015 ClickTale Ltd., US Patent Pending\r\n\/\/ PID: 49\r\n\/\/ WR destination: www04\r\n\/\/ WR version: 14.21\r\n\/\/ Recording ratio: 0.005\r\n\/\/ Generated on: 6\/18\/2015 10:46:14 AM (UTC 6\/18\/2015 3:46:14 PM)\r\n\r\n\r\nfunction ClickTaleCDNHTTPSRewrite(u)\r\n{\r\n\ttry\r\n\t{\r\n\t\tvar scripts = document.getElementsByTagName(\u0027script\u0027);\r\n\t\tif(scripts.length)\r\n\t\t{\r\n\t\t\tvar script = scripts[ scripts.length - 1 ], s=\u0027https:\/\/clicktalecdn.sslcs.cdngc.net\/\u0027;\r\n\t\t\tif(script.src \u0026\u0026 script.src.substr(0,s.length)==s )\r\n\t\t\t\treturn u.replace(\u0027https:\/\/cdnssl.clicktale.net\/\u0027,s);\r\n\t\t}\r\n\t}\r\n\tcatch(e)\r\n\t{\r\n\t}\r\n\treturn u;\r\n} \r\n\r\nvar ClickTaleIsXHTMLCompliant = true;\r\nif (typeof (ClickTaleCreateDOMElement) != \"function\")\r\n{\r\n\tClickTaleCreateDOMElement = function(tagName)\r\n\t{\r\n\t\tif (document.createElementNS)\r\n\t\t{\r\n\t\t\treturn document.createElementNS(\u0027http:\/\/www.w3.org\/1999\/xhtml\u0027, tagName);\r\n\t\t}\r\n\t\treturn document.createElement(tagName);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleAppendInHead) != \"function\")\r\n{\r\n\tClickTaleAppendInHead = function(element)\r\n\t{\r\n\t\tvar parent = document.getElementsByTagName(\u0027head\u0027).item(0) || document.documentElement;\r\n\t\tparent.appendChild(element);\r\n\t}\r\n}\r\n\r\nif (typeof (ClickTaleXHTMLCompliantScriptTagCreate) != \"function\")\r\n{\r\n\tClickTaleXHTMLCompliantScriptTagCreate = function(code)\r\n\t{\r\n\t\tvar script = ClickTaleCreateDOMElement(\u0027script\u0027);\r\n\t\tscript.setAttribute(\"type\", \"text\/javascript\");\r\n\t\tscript.text = code;\r\n\t\treturn script;\r\n\t}\r\n}\t\r\n\r\nvar pccScriptElement = ClickTaleCreateDOMElement(\u0027script\u0027);\r\npccScriptElement.type = \"text\/javascript\";\r\npccScriptElement.src = (document.location.protocol==\u0027https:\u0027?\r\nClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_17062015\u0026Version=4\u0027):\r\n\u0027http:\/\/cdn.clicktale.net\/www04\/pcc\/342da402-a44b-4b59-aba4-8fc2310e4478.js?DeploymentConfigName=Release_17062015\u0026Version=4\u0027);\r\ndocument.body.appendChild(pccScriptElement);\r\n\t\r\nvar ClickTalePrevOnReady;\r\nif(typeof ClickTaleOnReady == \u0027function\u0027)\r\n{\r\n\tClickTalePrevOnReady=ClickTaleOnReady;\r\n\tClickTaleOnReady=undefined;\r\n}\r\n\r\nif (typeof window.ClickTaleScriptSource == \u0027undefined\u0027)\r\n{\r\n\twindow.ClickTaleScriptSource=(document.location.protocol==\u0027https:\u0027\r\n\t\t?ClickTaleCDNHTTPSRewrite(\u0027https:\/\/cdnssl.clicktale.net\/www\/\u0027)\r\n\t\t:\u0027http:\/\/cdn.clicktale.net\/www\/\u0027);\r\n}\r\n\r\n\r\n\/\/ Start of user-defined pre WR code (PreLoad)b\r\nwindow.ClickTaleSettings = window.ClickTaleSettings || {};\r\nvar ct_Date = (new Date()).toISOString().slice(0, 10).replace(\/-\/g, \u0027\u0027);\r\nwindow.ClickTaleIncludedOnDOMReady = true;\r\nwindow.bEnableChangeMonitor = false;\r\nwindow.UseTransport = true;\r\nwindow.ClickTaleCookieDomain = \"cnn.com\"\r\n\r\nwindow.ClickTaleSettings.CheckAgentSupport = function (f, v) {\r\n    if (v.t == v.IE \u0026\u0026 v.v \u003c= 8) {\r\n        return false;\r\n    }\r\n    else {\r\n        if (!(v.m || v.t == v.IE \u0026\u0026 v.v \u003c= 10)) {\r\n           window.bEnableChangeMonitor = true;\r\n\t\t\tEnableTransport();\r\n        }\r\n        return f(v);\r\n    }\r\n}\r\n\r\nfunction EnableTransport() {\r\n\r\n\tif (window.bEnableChangeMonitor){\r\n\t\twindow.ClickTaleSettings.XHRWrapper = {\r\n\t\t\tEnable: false\r\n\t\t};\r\n\t\r\n        var script = document.createElement(\"SCRIPT\");\r\n        script.src = (document.location.protocol === \"https:\" ? \"https:\/\/cdnssl.\" : \"http:\/\/cdn.\")+\"clicktale.net\/www\/ChangeMonitor-latest.js\";\r\n        document.body.appendChild(script);\r\n\r\n        window.ClickTaleSettings.ChangeMonitor = {\r\n            Enable: true,\r\n\t\t\tLiveExclude : true,\r\n\t\t\tAddressingMode: \"id\",\r\n            OnReadyHandler: function (changeMonitor) {\r\n                changeMonitor.observe();\r\n\t\t\t},\r\n            OnBeforeReadyHandler: function (settings) {\r\n                settings.Enable = window.ClickTaleGetUID ? !!ClickTaleGetUID() : false;\r\n                return settings;\r\n            },\r\n\t\t\tFilters: {\r\n\t\t\t\t\tMaxBufferSize: 300000,\r\n\t\t\t\t\tMaxElementCount: 3000\r\n\t\t\t}\r\n        }\r\n\t}\r\n}\r\n\r\nwindow.ClickTaleSettings.Compression = {\r\n\tMethod: function () {\r\n\t\treturn \"deflate\";\r\n\t}\r\n};\r\n\r\nwindow.ClickTaleSettings.Transport = {\r\n\tLegacy: false,\r\n\tMaxConcurrentRequests: 5\r\n};\r\n\r\nwindow.ClickTaleSettings.RewriteRules = {\r\n\tOnBeforeRewrite: function (rewriteApi) {\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*type=\"text\"\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t\tpattern: new RegExp(\u0027(\u003cinput[^\u003e]*type=\"text\"[^\u003e]*value=\")([^\"]+)(\"[^\u003e]*\u003e)\u0027, \u0027gim\u0027),\r\n\t\t\treplace: \"$1-----$3\"\r\n\t\t});\r\n\t\trewriteApi.add({\r\n\t\t    pattern: new RegExp(\u0027(href=\")(\/\\..*?\\.css)\u0027, \u0027gim\u0027),\r\n\t\t    replace: \"$1http:\/\/dummytest.clicktale-samples.com\/CNN\/\" + ct_Date + \"$2\"\r\n\t\t});\r\n\t}\r\n}\r\n\r\nfunction getURLParam( name ) {\r\n\tvar url = window.location.href;\r\n\tvar query_string = url.split(\"?\");\r\n\tvar params = query_string[1].split(\"\u0026\");\r\n\r\n\tvar i = 0;\r\n\twhile (i \u003c params.length) {\r\n\t\tvar param_item = params[i].split(\"=\");\r\n\t\tif (param_item[0] == name) {\r\n\t\t\treturn param_item[1];\r\n\t\t}\r\n\t\ti++;\r\n\t}\r\n\treturn \"\";\r\n}\r\n\r\nif (window.location.search){\t\t\r\n\tvar recordingTime = getURLParam(\"MaxRecordingTime\");\r\n\tif(recordingTime!=\"\"){\r\n\t\twindow.ClickTaleSettings.RecordingTime = { \r\n\t\t\tMaxRecordingTime: parseInt(recordingTime) \r\n\t\t};\r\n\t};\r\n}\r\n\/\/ End of user-defined pre WR code\r\n\r\n\r\nvar ClickTaleOnReady = function()\r\n{\r\n\tvar PID=49, \r\n\t\tRatio=0.005, \r\n\t\tPartitionPrefix=\"www04\";\r\n\t\r\n\tif (window.navigator \u0026\u0026 window.navigator.loadPurpose === \"preview\") {\r\n       return; \/\/in preview\r\n\t   };\r\n\t\t\r\n\t\r\n\t\/\/ Start of user-defined header code (PreInitialize)\r\n\tif (typeof ClickTaleSetAllSensitive === \u0027function\u0027) {\r\n    ClickTaleSetAllSensitive();\r\n}\r\n\r\nvar ct_UA = ClickTaleDetectAgent();\r\nif (ct_UA.t==ct_UA.IE \u0026\u0026 ct_UA.v\u003c11) {\r\n    return;\r\n}\r\n\r\n\r\n\r\n\r\nif (typeof ClickTaleUploadPage === \u0027function\u0027 \u0026\u0026 window.UseTransport) {\r\n\t\r\n  \tvar up_Counter = 0;\r\n\r\n\tfunction uploadDelay() {\r\n\t\tvar countInterVal = 0;\r\n\t\tvar wrDelay = setInterval(function () {\r\n\t\t\tif (jQuery(\u0027[id^=\"ad_rect\"]\u0027).length \u003c= jQuery(\u0027[id^=\"ad_rect\"] iframe\u0027).length) {\r\n\t\t\t\tclearInterval(wrDelay);\r\n\t\t\t\twindow.ClickTaleIncludedOnWindowLoad  = true;\r\n\t\t\t\twindow.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\t\tClickTaleUploadPage();\r\n\t\t\t\twindow.ClickTaleSSL = 1;\r\n\t\t\t\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\telse if (countInterVal \u003e 20) {\r\n\t\t\t\tclearInterval(wrDelay);\r\n\t\t\t\twindow.ClickTaleIncludedOnWindowLoad  = true;\r\n\t\t\t\twindow.ClickTaleIncludedOnDOMReady = true;\r\n\t\t\t\tClickTaleUploadPage();\r\n\t\t\t\twindow.ClickTaleSSL = 1;\r\n\t\t\t\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tcountInterVal++;\r\n\t\t}, 500);\r\n\t}\r\n\r\n\t\/\/CNNF-18\r\n\tif ((typeof jQuery == \u0027function\u0027) \u0026\u0026 (jQuery(\u0027[id^=\"ad_rect\"]\u0027).length)) {\r\n\t\tif(typeof uploadDelay == \u0027function\u0027){\r\n\t\t\tuploadDelay();\r\n\t\t\treturn;\r\n\t\t}\r\n\t}\r\n\telse {\r\n\t\tClickTaleUploadPage();\r\n\t}\r\n\r\n}\r\n\r\n\r\n\t\/\/ End of user-defined header code (PreInitialize)\r\n    \r\n\t\r\n\twindow.ClickTaleIncludedOnDOMReady=true;\r\n\twindow.ClickTaleSSL=1;\r\n\t\r\n\tClickTale(PID, Ratio, PartitionPrefix);\r\n\t\r\n\tif((typeof ClickTalePrevOnReady == \u0027function\u0027) \u0026\u0026 (ClickTaleOnReady.toString() != ClickTalePrevOnReady.toString()))\r\n\t{\r\n    \tClickTalePrevOnReady();\r\n\t}\r\n\t\r\n\t\r\n\t\/\/ Start of user-defined footer code\r\n\t\r\n\t\/\/ End of user-defined footer code\r\n\t\r\n}; \r\n(function() {\r\n\tvar div = ClickTaleCreateDOMElement(\"div\");\r\n\tdiv.id = \"ClickTaleDiv\";\r\n\tdiv.style.display = \"none\";\r\n\tdocument.body.appendChild(div);\r\n\r\n\tvar externalScript = ClickTaleCreateDOMElement(\"script\");\r\n\tvar src = document.location.protocol==\u0027https:\u0027?\r\n\t  \u0027https:\/\/cdnssl.clicktale.net\/www\/tc\/WRe21.js\u0027:\r\n\t  \u0027http:\/\/cdn.clicktale.net\/www\/tc\/WRe21.js\u0027;\r\n\texternalScript.src = (window.ClickTaleCDNHTTPSRewrite?ClickTaleCDNHTTPSRewrite(src):src);\r\n\texternalScript.type = \u0027text\/javascript\u0027;\r\n\tdocument.body.appendChild(externalScript);\r\n})();\r\n\r\n\r\n\r\n");
	document.body.appendChild(script);	})();
	}

