/* 
Oracle Internal Use ONLY. 
*/
var udata ={};
var tabid=0;
var url = '';

chrome.webNavigation.onCompleted.addListener(function(o) { 
  url = 'us.oracle.com';
  if(o.url.indexOf(url) > -1)
  {
  tabid=o.tabId;
  chrome.runtime.onConnect.addListener(function (port) {
        if (port.sender.url.indexOf(url) > -1)
        {
        port.onMessage.addListener(getUserOption);
        }
  });
  }
});

function getUserOption(msg) {
  console.log("background script received message : " + msg);
     var options_get = JSON.parse(JSON.stringify(msg));
     chrome.storage.local.get( options_get , function(items) {
                        chrome.tabs.sendMessage(tabid, items);
		  });
}


function handleClick() {
  chrome.runtime.openOptionsPage();
}

chrome.browserAction.onClicked.addListener(handleClick);










