import GameSocket from './sockets/gameSocket';

// <<<<<<< HEAD
// chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
//   if (changeInfo.status === 'complete' && updatePage) {
//     updatePage = false;
//     chrome.tabs.executeScript(tabId, {
//       file: 'dist/injectLobby.bundle.js',
//       // file: 'dist/inject.bundle.js',
//     });
// =======
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, {
    file: 'dist/injectLobby.bundle.js',
  });
});
// >>>>>>> f8ce2127bc082776ff984790f6c993aec11994a2

let gameSocket;
let game; // {startPage, goalPage}
let curPlayerInfo; // {username, numClicks, curUrl, finishTime?}
let counter;
let interval;
let curTabId;

const onGame = (newGame) => {
  game = newGame;
  chrome.tabs.sendMessage(curTabId, { message: 'game info', payload: { newGame } });
};

const endGame = () => {
  console.log('end reached');
  curPlayerInfo = null;
  curTabId = -1;
  clearInterval(interval);
  gameSocket.disconnect();
};

// <<<<<<< HEAD
//   console.log('on message');
//   console.log(request);

//   // redirect to new url
//   chrome.tabs.update(sender.tab.id, { url: request.url });
//   updatePage = true;
// });

// chrome.browserAction.onClicked.addListener((tab) => {
//   chrome.tabs.executeScript(tab.ib, {
//     file: 'dist/injectLobby.bundle.js',
//     // file: 'dist/inject.bundle.js',
//   });
// =======

chrome.runtime.onMessage.addListener((request, sender) => {
  // check tab and request info and final page reached
  if (request.message === 'start game') {
    const { username } = request.payload;
    ({ game } = request.payload);
    gameSocket = new GameSocket(onGame, game.host, game.id, username);
    curTabId = sender.tab.id;
    interval = setInterval(() => { counter += 1; }, 1000);
    curPlayerInfo = {
      username,
      finishTime: -1,
      numClicks: -1,
      curUrl: game.startPage,
    };
  } else if (sender.tab.id !== curTabId || request.message !== 'new url') { return; } else {
    curPlayerInfo.numClicks += 1;
    curPlayerInfo.curUrl = request.payload.newUrl;
  }
  chrome.tabs.update(curTabId, { url: curPlayerInfo.curUrl });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading' && tabId === curTabId && changeInfo.url !== curPlayerInfo.curUrl) {
    endGame();
    return;
  }
  if (changeInfo.status === 'complete' && tabId === curTabId) {
    if (curPlayerInfo.curUrl === game.goalPage) {
      curPlayerInfo.finishTime = counter;
      chrome.tabs.executeScript({
        file: 'dist/injectEnd.bundle.js',
      });
      // update backend
      gameSocket.updatePlayer(
        curPlayerInfo.finishTime,
        curPlayerInfo.numClicks, curPlayerInfo.curUrl,
      );
      return;
    }
    gameSocket.updatePlayer(
      curPlayerInfo.finishTime,
      curPlayerInfo.numClicks, curPlayerInfo.curUrl,
    );
    chrome.tabs.executeScript(tabId, {
      file: 'dist/inject.bundle.js',
    }, () => {
      chrome.tabs.sendMessage(tabId, {
        message: 'new game',
        payload: { username: curPlayerInfo.username, game, counter },
      });
    });
  }
// >>>>>>> f8ce2127bc082776ff984790f6c993aec11994a2
});
