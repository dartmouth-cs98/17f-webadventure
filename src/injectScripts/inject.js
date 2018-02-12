import WikiGame from '../wikiGame';
import Player from '../player';

let wikiGame;
let curPlayer;

const onNewUrl = (newUrl, username, numClicks, finishTime = -1) => {
  const req = {
    message: 'new url',
    payload: {
      newUrl,
      username,
      finishTime,
      numClicks,
    },
  };
  // chrome.runtime.sendMessage(req);
};

chrome.runtime.onMessage.addListener((request) => {
  console.log(request);
  switch (request.message) {
    case 'new game':
      curPlayer = new Player(request.payload.username, { left: 100, top: 100 }, true);
      wikiGame = new WikiGame(onNewUrl, curPlayer);
      wikiGame.updateLeaderboard(request.payload.game);
      break;
    case 'game info':
      wikiGame.updateLeaderboard(request.payload.game);
      break;
    default:
  }
});
