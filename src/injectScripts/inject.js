import WikiGame from '../wikiGame';
import Player from '../player';

let wikiGame;

const onNewUrl = (newUrl) => {
  const req = {
    message: 'new url',
    payload: {
      newUrl,
    },
  };
  chrome.runtime.sendMessage(req);
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'new game') {
    const { counter, username } = request.payload;
    const curPlayer = new Player(username, { left: 100, top: 100 }, true);
    wikiGame = new WikiGame(onNewUrl, curPlayer, counter);
    wikiGame.updateLeaderboard(request.payload.game);
  } else if (request.message === 'game info') {
    wikiGame.updateLeaderboard(request.payload.game);
  }
});
