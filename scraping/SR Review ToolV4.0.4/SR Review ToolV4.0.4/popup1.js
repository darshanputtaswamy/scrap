window.onload = function () {
	document.getElementById("genrep").onclick = function () {
        chrome.extension.sendMessage({
            type: "genrep"
        });
    }
   
   document.getElementById("escsyn").onclick = function () {
        chrome.extension.sendMessage({
            type: "escsyn"
        });
    }

}