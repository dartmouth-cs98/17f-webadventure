/* eslint no-undef: "off" */

var updatePage = false;

chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {

		console.log("onUpdated called");
		
		if(changeInfo.status === "complete" && updatePage) {
			console.log("printing changeinfo");
			console.log(changeInfo);
			console.log(changeInfo);

			updatePage = false;

			chrome.tabs.executeScript(tabId, {
		    	file: 'dist/bundle.js',
			});
		}
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// redirect to new url
		chrome.tabs.update(sender.tab.id, {url: request});
		updatePage = true;

  		// alert("in onMessage listener of background!");
  		// sendResponse({farewell: sender.tab.url});
  		// console.log("that came from background.js");
  		// return true;
	}
);

	// chrome.tabs.getSelected(null, function(tab){

    // chrome.tabs.getCurrent(function (tab) {
      //Your code below...
      // var tabUrl = encodeURIComponent(tab.url);
      // var tabTitle = encodeURIComponent(tab.title);
      // var myNewUrl = "https://www.mipanga.com/Content/Submit?url=" + tabUrl + "&title=" + tabTitle;
      // var myNewUrl = "https://en.wikipedia.org/wiki/Cerebrum";

      //Update the url here.
      // chrome.tabs.update(tab.id, {url: myNewUrl});
    // });
// };

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.ib, {
    file: 'dist/bundle.js',
  });
  console.log("yo background");
});

console.log("waaah background");