let updatePage = false;
let leaderboard;

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.ib, {
    file: 'dist/injectLobby.bundle.js',
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'complete' && updatePage) {
    updatePage = false;
    chrome.tabs.executeScript(tabId, {
      file: 'dist/inject.bundle.js',
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, leaderboard);
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender) => {
  // save current game info in curGame
  leaderboard = request;

  // redirect to new url
  chrome.tabs.update(sender.tab.id, { url: request.url });
  updatePage = true;
});
