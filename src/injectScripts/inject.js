import WikiGame from '../wikiGame';
import Player from '../player';

let wikiGame;
let curPlayer;

chrome.runtime.onMessage.addListener((request) => {
  switch (request.message) {
    case 'new game':
      curPlayer = new Player(request.payload.username, { left: 100, top: 100 }, true);
      wikiGame = new WikiGame(curPlayer);
      wikiGame.updateLeaderboard(request.payload.game);
      break;
    case 'game info':
      wikiGame.updateLeaderboard(request.payload.game);
      break;
    default:
  }
});
