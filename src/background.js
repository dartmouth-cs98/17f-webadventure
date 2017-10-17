chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.ib, {
		file: 'lib/inject.js'
	});
});
