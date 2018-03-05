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
  console.log('just got to injectGame');
  if (sender.url === curPlayerInfo.curUrl) {
    chrome.tabs.executeScript(curTabId, {
      file: 'dist/inject.bundle.js',
    }, () => {
      console.log('injectGame');
      console.log(game);
      chrome.tabs.sendMessage(curTabId, {
        message: 'new game',
        payload: {
          username: curPlayerInfo.username, avatar: curPlayerInfo.avatar, game, counter, audioOn,
        },
      });
    });
  } else {
    console.log('goes to here instead');
    console.log(game);
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
    console.log('start game listener');
    console.log(request.payload);

    const { username, avatar } = request.payload.user;
    ({ game } = request.payload);
    console.log(game);
    gameSocket = new GameSocket(onGame, game.id, username);
    curTabId = sender.tab.id;
    counter = 0;
    interval = setInterval(() => { counter += 1; }, 1000);
    // const fullUrl = 'https://en.' + game.startPage;
    curPlayerInfo = {
      username,
      avatar,
      finishTime: -1,
      numClicks: 0,
      curUrl: `https://en.${game.startPage}`,
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
  console.log('just got to the changeInfo listener');
  console.log(game);
  if (changeInfo.status === 'loading' && tabId === curTabId && changeInfo.url) {
    if (!changeInfo.url.includes(curPlayerInfo.curUrl)) {
      // endGame();
      console.log('loading in the listener');
      console.log(changeInfo.url);
      console.log(curPlayerInfo.curUrl);
      return;
    }
  }
  if (changeInfo.status === 'complete' && tabId === curTabId) {
    console.log('changeInfo status completed');
    console.log(game);
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
      console.log('UPDATE PLAYER LISTENER');
      console.log(game);
      chrome.tabs.executeScript(tabId, {
        file: 'dist/inject.bundle.js',
      }, () => {
        console.log('PREPARING TO SEND');
        console.log(game);
        chrome.tabs.sendMessage(tabId, {
          message: 'new game',
          payload: {
            counter, username: curPlayerInfo.username, avatar: curPlayerInfo.avatar, game, audioOn,
          },
        });
      });
    }
  }
});
