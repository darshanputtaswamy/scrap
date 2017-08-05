// omnibox
/*
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    suggest([
      { content: "color-divs", description: "Make everything blue" }
    ]);
});
chrome.omnibox.onInputEntered.addListener(function (text) {
    if (text == "color-divs") colorDivs();
}); */

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
		case "genrep":
            genrep();
            break;
		case "escsyn":
           escsyn();
		   break;	
		case "sr_data":
			pushData(request);
			break;
		case "escsyn_data":
			escsynpushData(request);
			break;	
    }
    return true;
});

var pushData = function(request){

chrome.tabs.create({url: chrome.extension.getURL("srReport.html")},sendData(request));
}

var escsynpushData = function(request){

chrome.tabs.create({url: chrome.extension.getURL("escalation.html")},sendData(request));
}


function sendData(request){

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.status == 'complete') {
			chrome.tabs.sendMessage(tab.id, request);
		}
	});
}

var genrep = function () {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.sendMessage(tab.id, { type: "genrep"});
    });
}

var escsyn = function () {
    chrome.tabs.getSelected(null, function (tab) {
	       chrome.tabs.sendMessage(tab.id, { type: "escsyn"});
    });
}
