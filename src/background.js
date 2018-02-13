import GameSocket from './sockets/gameSocket';

chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, {
    file: 'dist/injectLobby.bundle.js',
  });
});

let gameSocket;
let game;
let tabId;

const onGame = (newGame) => {
  game = newGame;
  chrome.tabs.sendMessage(tabId, { message: 'game info', payload: { game } });
};

const endGame = () => {
  console.log('end page reached');
  gameSocket.disconnect();
};


chrome.runtime.onMessage.addListener((request, sender) => {
  // check tab and request info and final page reached
  if (request.message === 'start game') {
    const { roomhost, gameId, username } = request.payload;
    gameSocket = new GameSocket(onGame, roomhost, gameId, username);
    tabId = sender.tab.id;
  } else if (sender.tab.id !== tabId || request.message !== 'new url') { return; }
  const { newUrl } = request.payload;
  chrome.tabs.update(sender.tab.id, { url: newUrl }, (tab) => {
    console.log(tab);
    if (newUrl === 'https://en.wikipedia.org/wiki/Paul_Kruger') {
      chrome.tabs.executeScript({
        file: 'dist/injectEnd.bundle.js',
      });
      endGame();
      return;
    }
    // const { finishTime, numClicks, username } = request.payload;
    // gameSocket.updatePlayer(finishTime, numClicks, username);
    const username = 'almawang';
    chrome.tabs.executeScript(tab.id, {
      file: 'dist/inject.bundle.js',
    }, () => {
      console.log('executed here');
      chrome.tabs.sendMessage(tab.id, { message: 'new game', payload: { username, game } });
    });
  });
});
