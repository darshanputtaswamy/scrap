function showIndex() {
       var index_url = "http://www.google.com";
       chrome.tabs.create({
       url: index_url
    });
 }

document.getElementById('index').addEventListener("click", showIndex);