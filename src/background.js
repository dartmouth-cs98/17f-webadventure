/* eslint no-undef: "off" */

let updatePage = false;
let url1 = null;

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete' && updatePage) {
    updatePage = false;
    chrome.tabs.executeScript(tabId, {
      file: 'dist/bundle.js',
    });
  }

  if (changeInfo.url !== undefined) {
    url1 = changeInfo.url;
  }

  if (changeInfo.status === 'complete') {
    //alert(url1);
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
  // redirect to new url
  chrome.tabs.update(sender.tab.id, { url: request });
  updatePage = true;
});

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.ib, {
    file: 'dist/bundle.js',
  });
});
