/* eslint no-undef: "off" */

var url1 = null;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if (changeInfo.url != undefined) {
		url1 = changeInfo.url;
	}

	if (changeInfo.status === 'complete') {
		alert(url1);
	}

	//url1 = changeInfo.url;

});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.ib, {
    file: 'dist/bundle.js',
  });
});
