import GameSocket from './sockets/gameSocket';


let gameSocket;
let game; // {startPage, goalPage}
let curPlayerInfo; // {username, avatar, numClicks, curUrl, finishTime?}
let counter;
let interval;
let curTabId;
let audioOn = true;
const audioDiv = document.createElement('div');
const bgAudio = document.createElement('AUDIO'); // Persistent across redirects
const linkAudio = document.createElement('AUDIO'); // Whoosh sound on link clicked

const renderLobby = (tabId, username) => {
  chrome.tabs.executeScript(tabId, {
    file: 'dist/injectLobby.bundle.js',
  }, () => {
    const req = {
      message: 'render lobby',
      payload: { username },
    };
    chrome.tabs.sendMessage(tabId, req);
  });
};

const onGame = (newGame) => {
  game = newGame;
  chrome.tabs.sendMessage(curTabId, { message: 'game info', payload: { game } });
};

const endGame = () => {
  curPlayerInfo = null;
  curTabId = -1;
  clearInterval(interval);
  counter = 0;
  gameSocket.disconnect();
  gameSocket = null;

  // Stop music
  bgAudio.pause();
  audioDiv.removeChild(bgAudio);
};

const injectGame = (sender) => {
  if (sender.url === curPlayerInfo.curUrl) {
    chrome.tabs.executeScript(curTabId, {
      file: 'dist/inject.bundle.js',
    }, () => {
      chrome.tabs.sendMessage(curTabId, {
        message: 'new game',
        payload: {
          username: curPlayerInfo.username, avatar: curPlayerInfo.avatar, game, counter, audioOn,
        },
      });
    });
  } else {
    chrome.tabs.update(curTabId, { url: curPlayerInfo.curUrl });
    linkAudio.play();
  }
};

chrome.browserAction.onClicked.addListener((tab) => {
  if (!gameSocket && tab.url.includes('en.wikipedia.org')) {
    renderLobby(tab.id);
    // Background audio setup
    bgAudio.setAttribute('id', 'bgAudio');
    bgAudio.setAttribute('src', 'http://k003.kiwi6.com/hotlink/z3fy3bb3yr/nyan1.mp3');
    bgAudio.setAttribute('loop', 'true');
    audioDiv.appendChild(bgAudio);
    bgAudio.play();

    // Link whoosh sound setup
    linkAudio.setAttribute('id', 'linkAudio');
    linkAudio.setAttribute('src', 'https://k003.kiwi6.com/hotlink/6etyb9h8wr/swoosh.mp3');
    audioDiv.appendChild(linkAudio);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Process sound toggle request
  if (request.message === 'sound') {
    if (audioOn) {
      bgAudio.muted = true;
      linkAudio.muted = true;
    } else {
      bgAudio.muted = false;
      linkAudio.muted = false;
    }
    audioOn = !audioOn;
    sendResponse({ audioOn });
  } else if (request.message === 'start game') {
    const { username, avatar } = request.payload.user;
    ({ game } = request.payload);
    gameSocket = new GameSocket(onGame, game.id, username);
    curTabId = sender.tab.id;
    counter = 0;
    interval = setInterval(() => { counter += 1; }, 1000);
    curPlayerInfo = {
      username,
      avatar,
      finishTime: -1,
      numClicks: 0,
      curUrl: game.startPage,
    };
    injectGame(sender);
  } else if (request.message === 'close lobby') {
    // stop music
    bgAudio.pause();
    audioDiv.removeChild(bgAudio);
    audioDiv.removeChild(linkAudio);
  } else if (sender.tab.id === curTabId) {
    if (request.message === 'new url') {
      curPlayerInfo.numClicks += 1;
      curPlayerInfo.curUrl = request.payload.newUrl;
      injectGame(sender);
    } else if (request.message === 'quit game') {
      endGame();
    } else if (request.message === 'end to lobby') {
      const tabId = curTabId;
      const { username } = curPlayerInfo;
      endGame();
      renderLobby(tabId, username);
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading' && tabId === curTabId && changeInfo.url) {
    if (!changeInfo.url.includes(curPlayerInfo.curUrl)) {
      endGame();
      return;
    }
  }
  if (changeInfo.status === 'complete' && tabId === curTabId) {
    if (curPlayerInfo.curUrl === game.goalPage) {
      curPlayerInfo.finishTime = counter;
      gameSocket.updatePlayer(
        curPlayerInfo.finishTime,
        curPlayerInfo.numClicks,
        curPlayerInfo.curUrl,
      );
      chrome.tabs.executeScript({
        file: 'dist/injectEnd.bundle.js',
      }, () => {
        const req = {
          message: 'end game info',
          payload: {
            curPlayerInfo,
            game,
          },
        };
        chrome.tabs.sendMessage(tabId, req);
      });
      return;
    }
    gameSocket.updatePlayer(
      curPlayerInfo.finishTime,
      curPlayerInfo.numClicks,
      curPlayerInfo.curUrl,
    );
    if (!curPlayerInfo.curUrl.includes('#')) {
      chrome.tabs.executeScript(tabId, {
        file: 'dist/inject.bundle.js',
      }, () => {
        chrome.tabs.sendMessage(tabId, {
          message: 'new game',
          payload: {
            username: curPlayerInfo.username, avatar: curPlayerInfo.avatar, game, counter, audioOn,
          },
        });
      });
    }
  }
});
