/* eslint no-undef: "off" */

let url1 = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url !== undefined) {
    url1 = changeInfo.url;
  }

  if (changeInfo.status === 'complete') {
    alert(url1);
  }
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.ib, {
    file: 'dist/bundle.js',
  });
});
