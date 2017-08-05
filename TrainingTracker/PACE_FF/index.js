/* 
Oracle Internal Use ONLY. 
*/
var preferences= '';
var options_get ={};
var udata ={};
var msg ={};
var lock = true;
loadOptions();

function main (){
	try
	{
                get_options();
                // Connect to the background page.
                var port = chrome.runtime.connect();
                msg = JSON.parse(JSON.stringify(options_get)); 
                port.postMessage(msg);
                // Handle messages from the add-on background page (only in top level iframes)
                if (window.parent == window) {
                  chrome.runtime.onMessage.addListener(function(msg) {
                    udata = msg;
                    lock = false;
                  });
                }
		/*
                chrome.storage.local.get(options_get, function(items) {
                        udata = items;
                        lock = false;
                  });
                  */
                 
                waitForUserOptionLoad(controller);	
	} 
	catch (err)
	{
                alert(err.message);
	}   
}
function controller()
{	
        // do dynamic loading based on the user preference.
        //alert(JSON.stringify(udata, null, 4));
        setCookie("useroptions", JSON.stringify(udata) , 30);
        loadScript('https://proactivesupport.oraclecorp.com/psc/pace/CDN/V1-0/AppRouter/Router.js');  
        //alert("Loaded..." + preferences );
}

function waitForUserOptionLoad (doAction ){
	try
	{
		if (lock == false)
		{
			doAction();
		}
		else
		{
			setTimeout( function () {waitForUserOptionLoad (doAction);},500);
		}	
	} 
	catch (err)
	{
	}   
}

function loadStyle(url) {
        var style = document.createElement("style");
        style.href = url;
       document.head.appendChild(style);
    };
    
function loadScript(url) {
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
    }; 
    
function get_options()
{
  try{
        var obj = JSON.parse(preferences); 
        for(var i=0; i<obj.options.length; i++)
        {
             options_get[obj.options[i].name] =  obj.options[i].value;
        }
    }
    catch (err)
		{
			alert("get_options : "+err.message);
		} 
}   

function loadOptions() {
    try{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      preferences = xhttp.responseText;
      main();
    }
  };
  xhttp.open("GET", "https://proactivesupport.oraclecorp.com/psc/pace/CDN/V1-0/Option/options.json", true);
  xhttp.send();
  

    }
	catch (err)
	{
		alert(err.message);
	} 
} 
    
function setCookie(cname,cvalue,exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}













