/* eslint no-undef: "off" */

let url1 = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url !== undefined) {
    url1 = changeInfo.url;
  }

  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { url: 'getURL' }, function(doc) {
    	console.log(doc);
    });
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.ib, {
    file: 'dist/bundle.js',
  });
});
